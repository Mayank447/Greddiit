import {useContext} from 'react'
import SubGreddiitContext from "../../../Context/SubGreddiitContext"
import Report from "./Report"

export default function ReportList({visible}) {
  const {SubGreddiitDetails}=useContext(SubGreddiitContext)

  if(!visible) return null

  return (
    <>
    {SubGreddiitDetails.reports? SubGreddiitDetails.reports.map((report)=>
      <Report key={report._id}
        id={report._id}
        reported={report.reported}
        reported_by={report.reported_by} 
        concern={report.concern}
        text={report.post.text}
      />
    ):null}
    </>
  )
}
