import React from 'react'

export default function BlockedUser({number, firstname, lastname, age, username, email}) {
  return (
    <>
    <li className="py-3 sm:py-4">
        <div className="flex items-center text-red-800 space-x-4">{number+'. '}
            <div className="ml-2 flex-shrink-0 bg-white">
                <svg className="w-8 h-8 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <small className="text-xl font-medium text-red-800 truncate">
                    {firstname} {lastname}, <small className='text-xl text-red-800'>{age}</small>
                </small>
                <small className="ml-10 text-xl text-red-800 truncate">
                    {username}
                </small>
                <small className="ml-10 text-xl text-red-800 truncate">
                    {email}
                </small>
            </div>
        </div>
    </li>
    </>
  )
}