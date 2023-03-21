import React from 'react'

export default function UserListComponent({number, firstname, lastname, age, username, email}) {
  return (
    <>
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">{number+'. '}
            <div className="ml-2 flex-shrink-0 bg-white">
                <svg className="w-8 h-8 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <small className="text-xl font-medium text-gray-900 truncate">
                    {firstname} {lastname}, <span className='text-gray-700'>{age}</span>
                </small>
                <small className="ml-10 text-xl text-gray-700 truncate">
                    {username}
                </small>
                <small className="ml-10 text-xl text-gray-700 truncate">
                    {email}
                </small>
            </div>
        </div>
    </li>
    </>
  )
}