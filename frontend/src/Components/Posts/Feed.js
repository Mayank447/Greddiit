import React,{useState} from 'react'
import UpDownvotes from './UpDownvotes';
import SavePost from './SavePost';
import FollowUser from './FollowUser';
import ReportUser from './ReportUser';
import Comments from './Comments'

export default function Feed({id, name, username, text, upvotes, downvotes, comments_, creator}) {
  
  const [report,setReport]=useState(false)
  const [comments,openComments]=useState(false)
  
  const onClose=()=>{
    setReport(false)
  }

  const showComments=()=>{
    if(comments) openComments(false)
    else openComments(true)
  }

  return (
    <>
    <div align='left' className="flex w-full p-8 border-b border-gray-300">
        <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
        <div className="flex flex-col flex-grow ml-4">
            <div className="flex">
                <span className="font-semibold">{name}</span>
                <span className="ml-1">@{username}</span>
            </div>
            <p className="mt-1 text-justify">{text}</p>
            <div className="flex mt-3">
                <UpDownvotes upvotes_={upvotes} downvotes_={downvotes} id={id}/>
                <SavePost id={id}/>
                <FollowUser creator={creator}/>
                <span className='text-end texl-xs ml-10'>
                  <button onClick={()=>{setReport(true)}} className='underline mr-4'>Report</button>
                </span>
                <ReportUser id={id} visible={report} onClose={onClose}/>
                <span className='text-end texl-xs ml-10'>
                  <button onClick={showComments} className='underline mr-4'>Comment</button>
                </span>
            </div>
            <Comments id={id} visible={comments} onClick={showComments} commentList={comments_}/>
        </div>
    </div>
    </>
  )
}
