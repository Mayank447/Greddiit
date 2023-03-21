import React,{useState} from 'react'
import axios from 'axios'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';


export default function UpDownvotes({upvotes_,downvotes_,id}) {

    const [upvote,setUpvote]=useState(false);
    const [upvotes,updateUpvotes]=useState(upvotes_);
    const [downvote,setDownvote]=useState(false)
    const [downvotes,updateDownvotes]=useState(downvotes_);
    const token=localStorage.getItem("x-auth-token")

    const config={
        headers:{
            'x-auth-token':token
        }
    }

    async function UpvotePost(){
        try{
            const res=await axios.get(`/api/post/upvote/${id}`,config)
            if(res.data.msg==='Post was upvoted') {
                setUpvote(true);
                updateUpvotes(upvotes+1)
                if(res.data.msg2!==''){
                    setDownvote(false);
                    updateDownvotes(downvotes-1)
                }
            }
            else if(res.data.msg==='Upvote was removed') {
                setUpvote(false);
                updateUpvotes(upvotes-1)
            }
        }
        catch(err){
            console.error(err);
        }
    }


    async function DownvotePost(){
        try{
            const res=await axios.get(`/api/post/downvote/${id}`,config)
            if(res.data.msg==='Post was downvoted') {
                setDownvote(true);
                updateDownvotes(downvotes+1)
                if(res.data.msg2!==''){
                    setUpvote(false);
                    updateUpvotes(upvotes-1)
                }
            }
            else if(res.data.msg==='Downvote was removed') {
                setDownvote(false);
                updateDownvotes(downvotes-1)
            }
        }
        catch(err){
            console.error(err);
        }
    }

    if(upvote && downvote) {
        return( 
        <>
            <button onClick={UpvotePost} className="text-sm font-semibold"><ThumbUpRoundedIcon />{upvotes}</button>
            <button onClick={DownvotePost} className="text-sm font-semibold ml-4"><ThumbDownRoundedIcon />{downvotes}</button>
        </>
    )}

    else if(!upvote && downvote){
        return (
        <>
            <button onClick={UpvotePost} className="text-sm font-semibold"><ThumbUpOutlinedIcon />{upvotes}</button>
            <button onClick={DownvotePost} className="text-sm font-semibold ml-4"><ThumbDownRoundedIcon />{downvotes}</button>
        </>
    )}

    else if(upvote && !downvote){
        return (
        <>
            <button onClick={UpvotePost} className="text-sm font-semibold"><ThumbUpRoundedIcon />{upvotes}</button>
            <button onClick={DownvotePost} className="text-sm font-semibold ml-4"><ThumbDownOutlinedIcon />{downvotes}</button>
        </>
    )}

    else if(!upvote && !downvote){
        return (
        <>
            <button onClick={UpvotePost} className="text-sm font-semibold"><ThumbUpOutlinedIcon />{upvotes}</button>
            <button onClick={DownvotePost} className="text-sm font-semibold ml-4"><ThumbDownOutlinedIcon />{downvotes}</button>
        </>
    )}

    else return null
}
