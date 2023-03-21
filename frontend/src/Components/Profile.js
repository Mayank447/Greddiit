import React,{useState,useContext} from 'react'
import ProfileContext from '../Context/ProfileContext'
import FollowersModal from './Modal/FollowersModal'
import FollowingModal from './Modal/FollowingModal'
import EditProfileModal from './Modal/EditProfileModal'

export default function Profile() {

    const {user}=useContext(ProfileContext)

    const [followingPopup,clickedFollowing]=useState(false);
    const handleFollowingOnClose=()=>clickedFollowing(false)

    const [followersPopup,clickedFollowers]=useState(false);
    const handleFollowersOnClose=()=>clickedFollowers(false)

    const [editProfile,clickedEditProfile]=useState(false);
    const handleEditProfileOnClose=()=>clickedEditProfile(false)
  
    return (
    <>
    <div className="p-16" id='Profilebg'>
        <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                    <button onClick={()=>{clickedFollowing(true)}} type="button" className="font-bold text-gray-700 text-xl">{user.following}</button>        
                    <p className="text-gray-400">Following</p>      
                </div>     
                <div>  
                <button onClick={()=>{clickedFollowers(true)}} type="button" className="font-bold text-gray-700 text-xl">{user.follower}</button>        
                    <p className="text-gray-400">Followers</p>            
                </div>   
            </div>    
            <div className="relative">      
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">      
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                </div>    
            </div>    
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <button onClick={()=>{clickedEditProfile(true)}} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Edit Details</button>    
            </div>  
            </div>  
        <div className="mt-20 text-center border-b pb-12">    
            <h1 className="text-4xl font-medium text-gray-700">{user.firstname} {user.lastname}, 
                <span className="font-light text-gray-500"> {user.age}</span>
            </h1>    
            <p className="font-light text-gray-600 mt-3">Hyderabad, India</p>
            {/* <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
            <p className="mt-2 text-gray-500">University of Computer Science</p> */}
        </div>  
        {/* <div className="mt-12 flex flex-col justify-center">    
            <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>    
            <button  className="text-indigo-500 py-2 px-4  font-medium mt-4">  Show more</button>  
        </div> */}
        </div>
        </div>

        <FollowingModal onClose={handleFollowingOnClose} visible={followingPopup} Modal_title="Following"/>
        <FollowersModal onClose={handleFollowersOnClose} visible={followersPopup} Modal_title="Followers"/>
        <EditProfileModal onClose={handleEditProfileOnClose} visible={editProfile} Modal_title="Edit profile"/>
    </>
  )
}
