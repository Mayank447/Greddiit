import React,{useContext} from 'react'
import MembersTable from './MembersTable'
import VisitorsTable from './VisitorsTable'
import PostsTable from './PostsTable'
import SubGreddiitContext from '../../../Context/SubGreddiitContext'

export default function Statistics({visible}) {
  const {SubGreddiitDetails}=useContext(SubGreddiitContext)
  if(!visible) return null;
  
  return (
    <>

    <div className="items-center">
      <h2 align="center" className="text-3xl my-4 font-bold underline">Growth of Greddiit in terms of Members over time:</h2>
    </div>
    <MembersTable />

    <div className="items-center mt-10">
      <h2 align="center" className="text-3xl my-4 font-bold underline">Visitors over time:</h2>
    </div>
    <VisitorsTable />

    <div className="items-center mt-10">
      <h2 align="center" className="text-3xl my-4 font-bold underline">No. of Posts over time:</h2>
    </div>
    <PostsTable />

    <div className="ml-48 mt-20 items-center">
      <h2 className="text-2xl mt-4 mb-2 font-bold italic">No. of Reported Posts: {SubGreddiitDetails.reported_post_count}</h2>
      <h2 className="text-2xl mt-2 mb-10 font-bold italic">No. of Deleted Posts: {SubGreddiitDetails.deleted_posts_count}</h2>
    </div>
    </>
  )
}
