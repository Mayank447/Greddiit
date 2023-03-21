import React from 'react'

export default function SearchBar() {
  return (
    <>
    <form>
    <div className="relative w-full">
        <input type="search" id="default-search" className="p-2 pl-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for Greddiits.." required />
        <svg className="w-6 h-6 absolute left-1 bottom-1 pb-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>
        {/* <button type="submit" className="text-white absolute right-2.5 bottom-1.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1">Search</button> */}
    </div>
    </form>
    </>
  )
}
