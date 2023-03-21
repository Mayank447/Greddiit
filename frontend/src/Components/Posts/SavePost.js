import React,{useState} from 'react'
import axios from 'axios'
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';


export default function SavePost({id}) {
    const [savePost,setSavePost]=useState(false)

    async function SavePost(){
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("x-auth-token")
            }
        }

        try{
            const res=await axios.get(`/api/post/save/${id}`,config)
            setSavePost(true)
            alert(res.data.msg)
        }
        catch(err){
            console.error(err)
        }
    }

    if(savePost) return <button onClick={SavePost} className="text-sm font-semibold ml-5"><BookmarkAddedIcon />Save Post</button>
    else return <button onClick={SavePost} className="text-sm font-semibold ml-5"><BookmarkAddRoundedIcon />Save Post</button>
}
