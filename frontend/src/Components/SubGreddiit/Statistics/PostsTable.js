import React,{useContext} from 'react'
import SubGreddiitContext from '../../../Context/SubGreddiitContext'
import DataRows from './DataRows'

export default function PostsTable() {
  
  const{SubGreddiitDetails}=useContext(SubGreddiitContext)
  let i=0;

  return (
    <>
    <center>
    <div className="relative mt-5 overflow-x-auto items-center">
        <table className="w-8/12 text-sm text-left overflow-y-scroll max-h-56 text-gray-500">
            <thead className="text-xsuppercase bg-blue-600 text-gray-200">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        No. of posts
                    </th>
                </tr>
            </thead>
            {SubGreddiitDetails.post_vs_date.map((p)=>
                <DataRows key={++i} date={p.date.substr(0,10)}
                count={p.count}/>
            )}
        </table>
    </div>
    </center>
    </>
  )
}
