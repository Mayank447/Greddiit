import axios from 'axios'
import {useState,useContext} from 'react'
import ReportSingleLineComponent from "./ReportSingleLineComponent"
import ReportDescriptionComponent from "./ReportDescriptionComponent"
import SubGreddiitContext from '../../../Context/SubGreddiitContext'

export default function Report({id, reported, reported_by, concern, text}) {
  
  const {SubGreddiitDetails,updateSubGreddiitDetails}=useContext(SubGreddiitContext)
  const [isDisabled,DisableButton]=useState(false);

  const blockUser=async()=>{
    const status=localStorage.getItem("status")
    if(status==='false') return false

    const token=localStorage.getItem("x-auth-token");
    const config={
        headers:{'x-auth-token':token}
    }
    
    try{
      const res=await axios.get(`/api/report/blockuser/${id}`,config)
      if(res.data.msg==='User blocked') alert('User blocked')
      
      let temp=SubGreddiitDetails.reports
      const temp2=temp.filter((p)=>p._id!==id)
      temp=SubGreddiitDetails
      temp.reports=temp2
      updateSubGreddiitDetails({...SubGreddiitDetails})
    }
    catch(err){
      console.error(err.message)
      console.log('Server Error')
    }
  }

  const deletePost=async()=>{
    const status=localStorage.getItem("status")
    if(status==='false') return false

    const token=localStorage.getItem("x-auth-token");
    const config={
        headers:{'x-auth-token':token}
    }
    
    try{
      const res=await axios.get(`/api/report/deletepost/${id}`,config)
      if(res.data.msg==='Post deleted') alert('User blocked')
    
      let temp=SubGreddiitDetails.reports
      const temp2=temp.filter((p)=>p._id!==id)
      temp=SubGreddiitDetails
      temp.reports=temp2
      updateSubGreddiitDetails({...SubGreddiitDetails})
    }
    catch(err){
      console.error(err.message)
      console.log('Server Error')
    }
  }

  const Ignore=()=>{
    DisableButton(true)
  }

  return (
    <>
        <div className="flex  justify-center mx-4 my-8">
        <div className="block border border-gray-400 w-11/12 rounded-lg shadow-lg bg-white">
            

          <div className="p-3">
            <ReportSingleLineComponent header="Reported: " text={reported} />
            <ReportSingleLineComponent header="Reported by: " text={reported_by} />
            <ReportDescriptionComponent header="Concern: "
            text={concern}/>
            <ReportDescriptionComponent header="Text of the post: "
            text={text}/>
          </div>
          
          <div className="justify-left border-t-2 border-neutral-200 py-2 px-6">
            <button disabled={isDisabled} onClick={blockUser} type="button" className="inline-block rounded mr-5 bg-amber-900 text-gray-200 px-2 pt-1.5 pb-1.5 text-m font-medium uppercase leading-normalshadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                BLOCK USER
            </button>
            <button disabled={isDisabled} onClick={deletePost} type="button" className="inline-block rounded mr-5 bg-red-500 px-2 pt-1.5 pb-1.5 text-m font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                DELETE POST
            </button>
            <button onClick={Ignore} type="button" className="inline-block rounded mr-5 bg-gray-300 px-4 pt-1.5 pb-1.5 text-m font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                IGNORE
            </button>
          </div>
        </div>
        </div>

    </>
  )
}
