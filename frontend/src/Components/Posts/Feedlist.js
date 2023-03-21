import React,{useState, useContext} from 'react'
import GreddiitContext from '../../Context/GreddiitContext'
import Feed from './Feed'
import GreddiitLogo from '../../Image/Greddiit.jpeg'
import NewPostModal from './NewPostModal'

export default function Feedlist() {

    const [newPost,openNewPost]=useState(false)
    const closeNewPost=()=>{openNewPost(false)}

    const {GreddiitDetails}=useContext(GreddiitContext)
    
    return (
        <>
        <div className='flex sticky'>
        <div className='w-3/12 items-center flex flex-col flex-grow border-l border-r'>
            <img src={GreddiitLogo} alt='random pic' className="border-4 flex-shrink-0 mt-14 w-40 h-40 bg-gray-400 rounded-full" />
            <h1 className="text-2xl mt-4 font-semibold ">{GreddiitDetails.name}</h1>
            <p className='text-justify mt-4 mx-4 max-h-56 overflow-y-hidden hover:overflow-y-scroll'>
                {GreddiitDetails.description} 
            </p>
        </div>
        
        <div className="flex flex-col flex-grow border-l border-r border-gray-300 w-9/12 ">
            <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300 sticky">
                <h1 className="text-xl font-semibold">POSTS</h1>
                <button onClick={()=>{openNewPost(true)}} className="flex items-center h-8 px-2 text-sm bg-gray-300 rounded-sm hover:bg-gray-400">New post</button>
            </div>
            <div className="flex-grow content-start max-h-screen  overflow-y-hidden hover:overflow-y-scroll">
                <NewPostModal visible={newPost} onClose={closeNewPost} id={GreddiitDetails._id}/>
                
                {GreddiitDetails.post?GreddiitDetails.post.map((post)=>
                    <Feed key={post._id} id={post._id}
                    name={post.name}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    creator={post.creator}
                    username={post.username}
                    text={post.text}
                    comments_={post.comments}
                    />
                ): null
                }
                </div>
        </div>
        </div>
        </>
    )
}
