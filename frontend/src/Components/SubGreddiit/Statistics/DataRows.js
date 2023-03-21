import React from 'react'

export default function DataRows({date,count}) {
  return (
    <tbody>
        <tr className="bg-white border-b ">
        <td className="px-6 py-4">
                {date}
            </td>
            <td className="px-6 py-4">
                {count}
            </td>
        </tr>
    </tbody>
  )
}
