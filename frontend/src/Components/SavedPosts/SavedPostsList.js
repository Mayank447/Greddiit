import React,{useContext,useEffect} from 'react'
import SavedPostContext from '../../Context/SavedPostContext'
import SavedPostComponent from './SavedPostComponent'

export default function SavedPostslist() {
    const {PostsSaved}=useContext(SavedPostContext)
    const User=JSON.parse(localStorage.getItem("profile"))

    useEffect(() => {
        console.log("from the list: ", PostsSaved);
    }, [PostsSaved])
    
    return (
        <>
        <div className='flex sticky'>
        <div className='w-3/12 items-center flex flex-col flex-grow border-l border-r'>
                <div className='rounded-full w-40 h-40 bg-indigo-100 absolute mt-14 flex text-indigo-500 items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-32 w-32 " viewBox="0 0 20 20" fill="currentColor">  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                </div>
            <h1 className="text-2xl mt-4 font-semibold ">{User.firstname} {User.lastname}</h1>
        </div>
        
        <div className="flex flex-col flex-grow border-l border-r border-gray-300 w-9/12 ">
            <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300 sticky">
                <h1 className="text-xl font-semibold">SAVED POSTS</h1>
            </div>
            <div className="flex-grow content-start max-h-screen  overflow-y-hidden hover:overflow-y-scroll">
                {PostsSaved.posts_saved ?PostsSaved.posts_saved.map((post)=>
                    <SavedPostComponent key={post._id} id={post._id}
                    name={post.name}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    username={post.username}
                    text={post.text}
                    greddiit={post.greddiit}
                    />
                ):null
                }
                </div>
        </div>
        </div>
        </>
    )
}
