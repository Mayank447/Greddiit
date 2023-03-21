const express=require('express')
const router=express.Router()
const {check, validationResult}=require('express-validator')
const auth=require('../../middleware/auth')
const User=require('../../models/user')
const Greddiit=require('../../models/greddiit')
const Report=require('../../models/report')
const Post=require('../../models/post')


//@route   POST/api/greddiit
//@desc    Create a greddiit
//@access  Private
router.post('/',[auth,[
    check('name',"Name can't be empty").isLength({min:1}),
    check('description',"Description can't be empty").isLength({min:1})
]],
async(req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, description, tags, banned_keywords}=req.body
    const creator=req.user.id;

    try{
        //Checking if a Greddiit with same name already exists
        let greddiit=await Greddiit.findOne({name})
        if(greddiit){
            return res.status(400).json({msg:"A Sub-Greddiit with the same name already exists"})
        }

        greddiit=new Greddiit({
            name, creator, description, tags, banned_keywords, people: creator, growth_of_member: {member:1}, visitor:{count:1}
        })

        await greddiit.save()

        let user=await User.findById(creator)
        user.sub_greddiit.push(greddiit.id);
        await user.save()
        res.status(200).json({msg:'Sub Greddiit was created'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


//@route   GET/api/greddiit
//@desc    Get all the greddiits
//@access  Public
router.get('/',auth,async (req,res)=>{
    try{
        const moderator=await User.findById(req.user.id).select('sub_greddiit').populate({path:'sub_greddiit',select:'_id name description number_of_people number_of_posts banned_keywords'})
        const joined=await User.findById({_id:req.user.id}).select('greddiit').populate({path:'greddiit',select:'_id name description number_of_people number_of_posts banned_keywords'})
        const greddiits=await Greddiit.find({$and:[{_id:{$nin:moderator.sub_greddiit}},{_id:{$nin:joined.greddiit}}]}).select('_id name number_of_people number_of_posts description banned_keywords')
        res.status(200).json({greddiits,joined,moderator}) 
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/moderator/:id
//@desc    Get the greddiit details by id (for moderator)
//@access  Private
router.get('/moderator/:id',auth,async (req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id).select('creator poeple blocked_users joining_request reports growth_of_member visitor deleted_posts_count reported_post_count post_vs_date')
        .populate([{path:'people', select:'_id firstname lastname username email age'},{path:'blocked_users', select:'_id firstname lastname username email age'}, {path:'joining_request',select:'_id firstname lastname username email age'},
        {path:'reports', select:'reported_by reported concern post text'}])

        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(404).json({msg:'Unauthorized access'})
        }
        res.status(200).json({greddiit:greddiit, msg:'Successful'}) 
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/:id
//@desc    Get the greddiit and its posts by id
//@access  Private (Only for members)
router.get('/greddiitpage/:id',auth,async (req,res)=>{
    try{
        let greddiit=await Greddiit.findById(req.params.id).select('_id name post description')
                        .populate({path:'post', select:'_id name username text upvotes downvotes comments creator'})
        
        if(!greddiit){
            return res.status(404).json({msg:'Greddiit not found'})
        }

        // if(!greddiit.people.includes(req.user.id)){
        //     return res.status(404).json({msg:'Unauthorized access'})
        // }

        const response=greddiit
        greddiit=await Greddiit.findById(req.params.id)

        //Increasing visitor count
        const todaysDate = new Date();
        let flag=false
        //console.log(greddiit.visitor)

        if(greddiit.visitor!==undefined){
            greddiit.visitor.map((p)=>{
                if(p.date.getDate()===todaysDate.getDate() && p.date.getMonth()===todaysDate.getMonth() && p.date.getFullYear()===todaysDate.getFullYear()) {
                    p.count+=1;
                    flag=true;
                }
            })
    
            if(!flag){
                greddiit.visitor.push({count:1})
            }
        }
        else greddiit.visitor=[{count:1, date: new Date()}]
        
        await greddiit.save()
        res.status(200).json(response) 
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   DELETE/api/greddiit/:id
//@desc    Delete the greddiit by id
//@access  Private
router.delete('/:id',auth,async(req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id)
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }
        
        //Checking if the user is the creator
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json('User not authorized')
        }

        User.updateMany({$pullAll:{saved_posts:greddiit.post}})
        Post.updateMany({$pullAll:{_id:greddiit.post}})
        Report.updateMany({$pull:{greddiit:greddiit.id}})
        User.updateOne({$pull:{sub_greddiit:greddiit.id}})

        await greddiit.remove()
        res.status(200).json({msg:'Sub Greddiit was removed'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/join/:id&:requester_id
//@desc    Send a join request a greddiit
//@access  Private
router.get('/join/:id',auth,async(req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id)
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }

        //Checking if the requester is not an existing user
        if(greddiit.people.includes(req.user.id)){
            return res.status(200).json({msg:'You already are a member of this SubGreddiit'})
        }

        //Checking if the join request is still pending
        if(greddiit.joining_request.includes(req.user.id)){
            return res.status(200).json({msg:'Join request already pending'})
        }

        //Checking if the user left
        if(greddiit.users_left.includes(req.user.id)){
            return res.status(200).json({msg:'You have previously left this SubGreddiit'})
        }

        greddiit.joining_request.push(req.user.id)
        await greddiit.save()
        res.status(200).json({msg:'Join request sent'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/join/:id&:requester_id
//@desc    Accept a join a greddiit
//@access  Private
router.get('/accept/:id/:requester_id',auth,async (req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id)
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }
        
        //Checking if the join request is still pending
        if(!greddiit.joining_request.includes(req.params.requester_id)){
            return res.status(200).json({msg:'Join request not pending'})
        }

        //Checking if the user is the creator
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You are not authorized'})
        }

        await greddiit.updateOne({$pull:{joining_request:req.params.requester_id}});
        greddiit.people.push(req.params.requester_id);
        greddiit.number_of_people+=1;
        
        //Increasing member count by 1 for today's date
        const todaysDate = new Date()
        let flag=false
        greddiit.growth_of_member.map((p)=>{
            if(p.date.getDate()===todaysDate.getDate() && p.date.getMonth()===todaysDate.getMonth() && p.date.getFullYear()===todaysDate.getFullYear()) {
                p.member+=1;
                flag=true;
            }
        })
        if(!flag){
            greddiit.growth_of_member.push({member:1})
        }
        await greddiit.save()

        const user=await User.findById(req.user.id)
        user.greddiit.push(req.params.id)
        await user.save()
        res.status(200).json({msg:'Join request was accepted!'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   PUT/api/greddiit/join/:id&:requester_id
//@desc    Reject a join request on greddiit
//@access  Private
router.get('/reject/:id/:requester_id',auth,async (req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id)
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }

        //Checking if the join request is in the queue
        if(!greddiit.joining_request.includes(req.params.requester_id)){
            return res.status(200).json({msg:'Join request not pending'})
        }

        //Checking if the user is the creator
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You are not authorized'})
        }

        await greddiit.updateOne({$pull:{joining_request:req.params.requester_id}});
        await greddiit.save()
        res.status(200).json({msg:'Join request was removed!'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/leave/:id
//@desc    Leave a Greddiit
//@access  Private
router.get('/leave/:id',auth,async (req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id)
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }

        //Checking if the user is the creator
        if(greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:"Moderator can't leave a Greddiit"})
        }

        //Checking if you're in the Greddiit
        if(!greddiit.people.includes(req.user.id) && !greddiit.blocked_users.includes(req.user.id)){
            return res.status(400).json({msg:"You are not a member of this Greddiit"})
        }

        await greddiit.updateOne({$pull:{people:req.user.id}});
        greddiit.number_of_people=greddiit.number_of_people-1;
        
        //Update the growth of members
        const todaysDate = new Date()
        let flag=false
        greddiit.growth_of_member.map((p)=>{
            if(p.date.getDate()===todaysDate.getDate() && p.date.getMonth()===todaysDate.getMonth() && p.date.getFullYear()===todaysDate.getFullYear()) {
                p.member-=1;
                flag=true;
            }
        })
        if(!flag){
            greddiit.growth_of_member.push({member:-1})
        }
        greddiit.users_left.push(req.user.id)
        await greddiit.save()

        const user=await User.findById(req.user.id)
        await user.updateOne({$pull:{greddiit:req.params.id}})
        await user.save()
        res.status(200).json({msg:'You left the Sub Greddiit.'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/join/:id
//@desc    Get all the join requests
//@access  Private
router.get('/joinrequests',auth,async(req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id).select('creator join_request')
                .populate([{path:'join_request', select:'_id username'}])
        
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }

        //Checking if the user is the creator
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You are not authorized'})
        }

        const users={}
        greddiit.joining_request.forEach(async (user_id)=>{
            let user=await User.findById(user_id)
            users[user_id]=user
        });
        res.status(200).json(users)
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/greddiit/users/:id
//@desc    Get all the users of a Sub Greddiit
//@access  Private
router.get('/users/:id',auth,async (req,res)=>{
    try{
        const greddiit=await Greddiit.findById(req.params.id).select('creator people blocked_users')
            .populate([{path:'people', select:'username _id'},
                        {path:'blocked_users', select:'_id username'}])
        
        if(!greddiit){
            return res.status(404).json({msg:'Sub Greddiit not found'})
        }

        //Checking if the user is the creator
        if(!greddiit.creator.equals(req.user.id)){
            return res.status(400).json({msg:'You are not authorized'})
        }

        res.status(200).json(greddiit)
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Greddiit not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});

module.exports=router;