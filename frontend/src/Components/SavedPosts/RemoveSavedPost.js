import React,{useContext} from 'react'
import axios from 'axios'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SavedPostContext from '../../Context/SavedPostContext';

export default function RemovePost({id}) {
    const {PostsSaved, updatePostsSaved}=useContext(SavedPostContext)

    async function SavePost(){
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("x-auth-token")
            }
        }

        try{
            const res=await axios.get(`/api/user/remove_savedpost/${id}`,config)
            const post_saved=PostsSaved
            const temp=post_saved.posts_saved.filter((p)=>p._id!==id)
            post_saved.posts_saved=temp
            updatePostsSaved({...post_saved})
            alert(res.data.msg)
        }
        catch(err){
            console.error(err)
        }
    }

    return <button onClick={SavePost} className="text-sm font-semibold ml-5"><BookmarkAddedIcon />Remove Post</button>
}