import {useState, useContext} from 'react'
import axios from 'axios'
import GreddiitContext from '../../Context/GreddiitContext'

export default function NewPostModal({visible, onClose, id}) {

    const [postName,setPostName]=useState('')
    const [postText,setPostText]=useState('')
    const {GreddiitDetails, updateGreddiitDetails}=useContext(GreddiitContext)
    if(!visible) return null

    const handleChange=(event)=>{
        setPostName(event.target.value)
    }

    const handleChange2=(event)=>{
        setPostText(event.target.value)
    }

    const Submit=async(id)=>{
        const body_=JSON.stringify({
            name:postName,
            text:postText
        })

        const config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem("x-auth-token")
            }
        }

        try{
            const res=await axios.post(`/api/post/${id}`,body_,config)
            if(res.status===200){
                const temp=GreddiitDetails;
                temp.post.unshift({_id:res.data.id, name:postName, username:res.data.username, text: postText, creator:res.data.follow_id, upvotes:0, downvotes:0, comments:[]})
                await updateGreddiitDetails(temp);
                onClose();
            }
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <>
        <div className="inset-0  bg-white bg-opacity-30 backdrop-blur-sm fixed w-full h-full outline-none justify-center items-center overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable top-1/4 left-1/4 relative w-6/12 h-8/12 pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
            <span align='right' className='items-end'><button onClick={onClose} type="button" className="mr-6 mt-1 float-right btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-100 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">X</button></span>
            
            <form>
            <div className="flex w-full p-4 border-b-4 border-gray-300">
                <div className="flex flex-col flex-grow mx-4">
                    <input type="text" onChange={handleChange} required value={postName} className="peer p-3 m-3 bg-transparent border border-gray-500 rounded-sm" placeholder="Post Title"></input>
                    <textarea id='textArea' value={postText} required onChange={handleChange2} className="peer p-3 m-3 bg-transparent border border-gray-500 rounded-sm"  rows="6" placeholder="What's happening?"></textarea>
                    <div className="flex justify-end mt-2">
                        <button type='submit' onClick={()=>{Submit(id)}} className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
                    </div>
                </div>
            </div>
            </form>

            </div>
            </div>
        </div>
        </>
    )
}
