const express=require('express');
const router=express.Router();
const {check, validationResult}=require('express-validator');
const User=require('../../models/user');
const Post=require('../../models/post');
const Greddiit=require('../../models/greddiit')
const Report=require('../../models/report')
const auth=require('../../middleware/auth')

//@route   POST/api/report
//@desc    Create a report
//@access  Private
router.post('/:id',[auth,[
    check('concern',"Concern cannot be empty").isLength({min:1})
]],
async(req,res)=>{ //post id is being sent
    try{
        const post=await Post.findById(req.params.id)
        const reddiit=await Greddiit.findById(post.greddiit)

        // if(!reddiit.people.includes(req.user.id)){
        //     return res.status(400).json({msg:'Unauthorized request'})
        // }
        
        const report=new Report({reported_by:req.user.id, reported:post.creator, text:post.text, concern:req.body.concern, post:post.id, greddiit:post.greddiit})
        await report.save()
        reddiit.reported_post_count=reddiit.reported_post_count+1

        reddiit.reports.push(report.id);
        await reddiit.save()
        res.status(200).json({msg:'The post was reported'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/report/blockuser/:id
//@desc    Block the user based on report
//@access  Private
router.get('/blockuser/:id',auth,async(req,res)=>{
    try{
        const report=await Report.findById(req.params.id)
        const post=await Post.findById(report.post)
        const reddiit=await Greddiit.findById(report.greddiit)

        if(reddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You cannot block the moderator'})
        }

        post.username="Blocked user"
        await post.save()

        await reddiit.updateOne({$pull:{reports:req.params.id}})
        reddiit.blocked_users.push(post.creator)
        await reddiit.save()
        
        report.status=true;
        report.outcome='Block User';
        await report.save()
        res.status(200).json({msg:'User blocked'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Bad request'})
    }
});


//@route   GET/api/report/deletepost/:id
//@desc    Delete the post
//@access  Private
router.get('/deletepost/:id',auth,async(req,res)=>{
    try{
        const report=await Report.findById(req.params.id)
        const greddiit=await Greddiit.findById(report.greddiit)
        //console.log("Here")
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You are not authorized'})
        }
        //console.log("Here")

        const post=await Post.findById(report.post)
        await post.remove()

        //Deleting the post
        await User.updateMany({$pull:{posts_saved:post.id}})
        await Report.remove({post:post.id})
        report.status=true;
        report.outcome='Delete Post';
        await report.save();

        greddiit.post-=1
        await greddiit.updateOne({$pull:{post:post.id}})
        await greddiit.save()
        
        res.status(200).json({msg:'Post deleted'})
    }
    catch(err){
        console.error(err.message)
        res.status(400).json({msg:'Server error'})
    }
});


//@route   GET/api/report
//@desc    All the reports for a greddiit
//@access  Private
router.get('/:id',auth,async(req,res)=>{
    try{
        const days=10;
        const reports=await Greddiit.findById(req.params.id).select('reports')
        .populate([{path:'reports', select:'_id reported_by reported concern post'}]).populate({path:'post',select:'text'})
        //console.log(reports)

        const reportMap={}
        const currDate=new Date().getDate()
        reports.forEach((report)=>{
            if(currDate-report.createdAt.getDate()<=days)
                reportMap[report._id]=report;
        }) 
        res.status(200).json(reportMap)
    }
    catch(err){
        console.error(err.message)
        res.status(400).json({msg:'Bad request'})
    }
});

module.exports=router