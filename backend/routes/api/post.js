const express=require('express')
const router=express.Router()
const {check, validationResult}=require('express-validator')
//const mongoose=require('mongoose')
const auth=require('../../middleware/auth')
const User=require('../../models/user')
const Post=require('../../models/post')
const Greddiit=require('../../models/greddiit')
const { route } = require('./profile')


//@route   POST/api/posts
//@desc    Create a post
//@access  Private
router.post('/:id',[auth,[
    check('text',"Text of the post can't be blank").exists(),
    check('name','Name cannot be empty').exists(),
]],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const{name,text}=req.body;
    const greddiit=req.params.id

    try{
        const creator=await User.findById(req.user.id)
        const post=new Post({
            name,text,creator,username:creator.username,greddiit
        })

        await post.save()

        const reddit=await Greddiit.findById(greddiit)
        reddit.number_of_posts=reddit.number_of_posts + 1
        reddit.post.push(post.id)

        //Post vs date count by 1
        const todaysDate = new Date();
        let flag=false

        if(reddit.post_vs_date!==undefined){
            reddit.post_vs_date.map((p)=>{
                if(p.date.getDate()===todaysDate.getDate() && p.date.getMonth()===todaysDate.getMonth() && p.date.getFullYear()===todaysDate.getFullYear()) {
                    p.count+=1;
                    flag=true;
                }
            })
            if(!flag){
                reddit.post_vs_date.push({count:1})
            }
        }
        else reddit.post_vs_date=[{count:1, date: new Date()}]

        await reddit.save()
        res.status(200).json({msg:'Post created',id:reddit.id, follow_id:req.user.id, username:creator.username})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


//@route   GET/api/posts
//@desc    Get all posts for the sub_greddiit
//@access  Private
router.get('/:id',auth, async (req,res)=>{
    try{
        const postMap={};
        const posts=await Post.find({}).select('_id name username text upvotes downvotes comments')

        posts.forEach((post)=>{
            if(post.greddiit.equals(id)){
                postMap[post.id]=post
            }
        });
        
        res.status(200).json(postMap)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/post:id
//@desc    Get post by ID
//@access  Private
router.get('/:id',auth, async (req, res)=>{
    try{
        let post = await Post.findById(req.params.id).select('_id name username text upvotes downvotes comments')
        res.status(200).json(post)
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
        res.status(500).json({msg:'Server error'})
    }
});


//@route   PUT/api/post/save:id
//@desc    Save a post to the user
//@access  Private
router.get('/save/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }

        const user=await User.findById(req.user.id)
        if(user.posts_saved.includes(post.id)){
            return res.status(200).json({msg:'Post has been already saved'})
        }

        user.posts_saved.push(post.id)
        await user.save()
        res.status(200).json({msg:'Post was saved'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
        res.status(500).json({msg:'Server error'}) 
    }
});


//@route   DELETE/api/post:id
//@desc    Delete post by id
//@access  Private
router.delete('/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }

        if(post.creator.toString()!==req.user.id.toString()){
            return res.status(400).json({msg:'User not authorized'})
        }
        await post.remove();

        //Removing from post in Sub_reddiit
        const reddit=await Greddiit.findById(post.greddiit)
        reddit.number_of_posts=reddit.number_of_posts-1;
        await reddit.updateOne({$pull:{post:post.id}})
        await reddit.save()

        //Removing from the saved Post of the users
        await User.updateMany({$pull:{posts_saved:post.id}})
        res.status(200).json({msg:'Post removed'})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
        res.status(500).json({msg:'Server error'}) 
    }
});


//@route   PUT/api/posts/upvote/:id
//@desc    Upvote a post
//@access  Private
router.get('/upvote/:id',auth, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }

        let flag=false

        //Checking if the user has already downvoted the post
        if(post.downvoted_by.includes(req.user.id)){
            post.downvotes=post.downvotes-1;
            await post.updateOne({$pull:{downvoted_by:req.user.id}})
            await post.save()
            flag=true
        }

        //Checking if the user has already upvoted the post
        if(post.upvoted_by.includes(req.user.id)){
            post.upvotes=post.upvotes-1;
            await post.updateOne({$pull:{upvoted_by:req.user.id}})
            await post.save()
            return res.status(200).json({msg:'Upvote was removed'})
        }

        post.upvotes=post.upvotes+1;
        post.upvoted_by.push(req.user.id)
        await post.save()

        if(flag) return res.status(200).json({msg:'Post was upvoted',msg2:'Downvote was removed'})
        res.status(200).json({msg:'Post was upvoted',msg2:''})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
        res.status(500).json({msg:'Server error'}) 
    }
});


//@route   PUT/api/posts/downvote:id
//@desc    Downvote a post
//@access  Private
router.get('/downvote/:id',auth, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }

        let flag=false

        //Checking if the user has already upvoted the post
        if(post.upvoted_by.includes(req.user.id)){
            post.upvotes=post.upvotes-1;
            await post.updateOne({$pull:{upvoted_by:req.user.id}})
            await post.save()
            flag=true;
        }

        //Checking if the user has already downvoted the post
        if(post.downvoted_by.includes(req.user.id)){
            post.downvotes=post.downvotes-1;
            await post.updateOne({$pull:{downvoted_by:req.user.id}})
            await post.save()
            return res.status(200).json({msg:'Downvote was removed'})
        }

        post.downvotes=post.downvotes+1;
        post.downvoted_by.push(req.user.id)
        await post.save()
        if(flag) return res.status(200).json({msg:'Post was downvoted',msg2:'Upvote was removed'})
        res.status(200).json({msg:'Post was downvoted',msg2:''})
    }
    catch(err){
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'})
        }
        res.status(500).json({msg:'Server error'}) 
    }
});


//@route   POST/api/posts/comment:id
//@desc    Comment on the post
//@access  Private
router.post('/comments/:id',[auth,[
    check('text',"The comment can't be empty").isLength({min:1})
]], async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try{
        const post = await Post.findById(req.params.id);
        const user=await User.findById(req.user.id)
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }

        post.comments.push({author:req.user.id, text: req.body.text, username_: user.username})
        await post.save()
        res.status(200).json({msg:'You just commented on the post'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


//@route  DELETE/api/posts/comment:id
//@desc   Delete the comment
//@access Private
//router.delete('/comment/:id',)

module.exports=router;