import React from 'react'

export default function SubGreddiitNumberComponent({header, text}) {
  return (
    <>
        <h5 className="mb-2 pt-1 font-medium leading-tight text-neutral-800">
            {header+':'}
            <span className="mb-2 ml-3 max-h-24 overflow-y-scroll text-base text-neutral-600">
            {text}
            </span>
        </h5>
    </>
  )
}
