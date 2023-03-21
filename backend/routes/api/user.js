const express=require('express');
const router=express.Router();
const User=require('../../models/user');
const auth=require('../../middleware/auth');
const { route } = require('./profile');


//@route  GET/api/follow/user:id
//@desc   Removing a person from the followers list
//@accees Private
router.get('/remove/user/:id',auth, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        
        //Checking if the user request being followed is a valid user or not
        const follower=await User.findById(req.params.id);
        if(!follower){
            return res.status(400).json({msg:'Follower not found'})
        }

        if(!user.follower_list.includes(follower.id)){
            return res.status(400).json({msg:'Follower not found'})
        }

        user.follower=user.follower-1;
        await user.updateOne({$pull:{follower_list:follower.id}});
        await user.save()
        
        follower.following=follower.following-1;
        await follower.updateOne({$pull:{following_list:user.id}});
        await follower.save()
        res.status(200).json('User was removed from the follower list')
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route  GET/api/follow/unfollow/user:id
//@desc   Unfollow a user
//@accees Private
router.get('/unfollow/user/:id',auth, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        
        //Checking if the user request being followed is a valid user or not
        const following=await User.findById(req.params.id);
        if(!following){
            return res.status(400).json({msg:'Follower not found'})
        }

        if(!user.following_list.includes(following.id)){
            return res.status(400).json({msg:'Following not found'})
        }

        user.following=user.following-1;
        await user.updateOne({$pull:{following_list:following.id}});
        await user.save()
        
        following.follower=following.follower-1;
        await following.updateOne({$pull:{follower_list:user.id}});
        await following.save()
        res.status(200).json('User was removed from the followings list')
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route GET/api/follow/followers
//@desc  Get all the followers
//@access Private
router.get('/followers',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        res.status(200).json(user.follower_list.populate())
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route GET/api/follow/following
//@desc  Get all the following for an user
//@access Private
router.get('/following',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        res.status(200).json(user.follower_list.populate())
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});

//@route   GET/api/user/subgreddiit
//@desc    Get all the Sub Greddiit of an user
//@access  Private
router.get('/subgreddiit',auth, async(req,res)=>{
    try{
        const subgreddiits=await User.findById(req.user.id).select('sub_greddiit').populate({path:'sub_greddiit',select:'_id name description number_of_people number_of_posts banned_keywords tags'})
        console.log(subgreddiits)
        res.status(200).json(subgreddiits.sub_greddiit)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});

//@route   GET/api/user/savedposts
//@desc    Get all the Saved posts of an user
//@access  Private
router.get('/savedposts',auth, async(req,res)=>{
    try{
        const saved_posts=await User.findById(req.user.id).select('posts_saved').populate([{path:'posts_saved', select:'_id name greddiit upvotes downvotes text username creator'}])
        res.status(200).json(saved_posts)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route   GET/api/user/savedposts
//@desc    Remove a saved posts of an user
//@access  Private
router.get('/remove_savedpost/:id',auth, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        if(!user.posts_saved.includes(req.params.id)){
            return res.status(400).json({msg:'Bad request'})
        }
        await user.updateOne({$pull:{posts_saved:req.params.id}})
        res.status(200).json({msg:'Saved post was removed'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});


//@route  POST/api/follow/:id
//@desc   Send a follow request after seeing the post
//@accees Private
router.get('/:id',auth, async(req,res)=>{
    try{
        //Checking if the user request being followed is a valid user or not
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }

        const follower=await User.findById(req.user.id);
        if(user.id===follower.id){
            return res.status(200).json({msg:'You cannot follow yourself'})
        }

        if(user.follower_list.includes(follower.id)){
            return res.status(200).json({msg:'You already follow this user'})
        }

        follower.following=follower.following+1;
        follower.following_list.push(user);
        await follower.save()

        user.follower=user.follower+1;
        user.follower_list.push(follower);
        await user.save()
        res.status(200).json('Follow request was successful!')
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server error'})
    }
});

module.exports = router;