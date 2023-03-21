import PopupElements from "./PopupElements"
import axios from 'axios'
import {useContext} from 'react'
import ProfileContext from "../../Context/ProfileContext"

export default function FollowingModal({visible=true, onClose, Modal_title}){
    
    const {user,changeUser}=useContext(ProfileContext)
    
    if(!visible) return null

    // const handleOnClose=(e)=>{
    //     if(e.target.id==='Profilebg') onClose()
    // }

    const handleClick=async(event)=>{
        const id=event.target.id
        const token=localStorage.getItem("x-auth-token")

        const config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            }
        }

        try{
            await axios.get(`/api/follow/unfollow/user/${id}`, config)
            let temp=user.following_list
            const temp2=temp.filter((p)=>{return p._id!==id})
            temp=user
            temp.following_list=temp2
            changeUser({...temp})
        }
        catch(err){
            console.error("error here", err.messgae);
        }
    }

    return(
        <>
        <div className="inset-0  bg-black bg-opacity-10 backdrop-blur-sm fixed w-full h-full outline-none justify-center items-center overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable top-1/4 left-1/3 relative w-2/5 h-3/5 pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        {Modal_title}
                        </h5>
                        <button onClick={onClose} type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">X</button>
                    </div>
                <div className="modal-body relative p-4">
                {user.following_list.map(following => 
                    <PopupElements Username={following.username} remove="UNFOLLOW" id={following._id} handleClick={handleClick} />
                )}
                </div>
            </div>
        </div>
        </div>
        </>
    )
}