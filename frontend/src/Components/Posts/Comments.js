import axios from 'axios'
import React,{useState} from 'react'
import CommentComponent from './CommentComponent'

export default function Comments({id,visible,commentList}) {
    
    const [commentText,setCommentText]=useState('')

    if(!visible) return null

    const handleChange=(event)=>{
        setCommentText(event.target.value)
    }

    async function addComment(){

        const config={
            headers:{
                'x-auth-token':localStorage.getItem("x-auth-token"),
                'Content-Type':'application/json'
            }
        }

        const body_=JSON.stringify({text:commentText})

        try{
            const res=await axios.post(`/api/post/comments/${id}`,body_,config)
            alert('Comment added')
        }
        catch(err){
            console.error(err)
            alert('Server error')
        }
    }

    return (
    <>
    <div className="max-w">
    <form className="w-full mt-3 p-1">
        <div className="mb-2">
        <input type="text" className="peer p-1 w-10/12 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            required name="comment" onChange={handleChange} value={commentText} placeholder="Comment..."></input>
        <button type="submit" onClick={addComment} className="mx-3 p-1 text-sm text-blue-100 bg-black rounded">Comment</button>
        </div>
    </form>
    </div>
    
    {}
    <div className="antialiased">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Comments
        </h3>
        {commentList.map((p)=><CommentComponent key={p._id}
            username={p.username_} text={p.text} time={p.date}
        />
        )}
    </div>
    </>
  )
}
