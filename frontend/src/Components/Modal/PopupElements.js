import React from 'react'

export default function PopupElements({Username, remove, id, handleClick}) {
  return (
    <>
    <div className="modal-footer flex flex-shrink-0 flex-wrap justify-between items-center p-2 border-gray-200 rounded-b-md">
        <a>{Username}</a>
        <button type="button" className="inline-block px-2 py-2 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal"
        id={id} onClick={handleClick}>
        {remove}
        </button>
    </div>
    </>
  )
}
