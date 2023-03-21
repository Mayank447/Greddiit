import React from 'react'
import RemovePost from './RemoveSavedPost';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

export default function SavedPostComponent({id, name, username, greddiit, text, upvotes, downvotes}) {
    
  return (
    <>
    <div align='left' className="flex w-full p-8 border-b border-gray-300">
        <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
        <div className="flex flex-col flex-grow ml-4">
            <div className="flex">
                <span className="font-semibold">{name}</span>
                <span className="ml-1">@{username}</span>
                <span className="ml-1">, {greddiit}</span>
            </div>
            <p className="mt-1 text-justify">{text}</p>
            <div className="flex mt-3">
                <ThumbUpOutlinedIcon />{upvotes}
                <ThumbDownOutlinedIcon />{downvotes}
                <RemovePost id={id}/>
            </div>
        </div>
    </div>
    </>
  )
}
