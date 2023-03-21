import React from 'react'

export default function CommentComponent({username,text, time}) {
  return (
    <>
    <div className="space-y-4 mb-2">
    <div className="flex">
      <div className="flex-shrink-0 mr-3 mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 flex items-center justify-center text-indigo-500">      
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">  
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
        </svg>
      </div>

      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{username}</strong> <span className="text-xs text-gray-400">{time.substr(0,10)+' '+time.substr(11,8)}</span>
        <p className="text-sm">
          {text}
        </p>
      </div>
    </div>
    </div>
    </>
  )
}
