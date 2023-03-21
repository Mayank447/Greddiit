import React,{useState} from 'react'
import axios from 'axios'

export default function ReportUser({id, visible, onClose}) {

    const [ReportText,setReportText]=useState('')
    if(!visible) return null

    async function reportUser(){
        if(ReportText===''){
            alert(`Report can't be empty`)
            return null
        }
        try{
            const body_={
                concern:ReportText
            }
            const config={
                headers:{
                    'x-auth-token':localStorage.getItem("x-auth-token"),
                    'Content-Type':'application/json'
                }
            }
            const res=await axios.post(`/api/report/${id}`,body_,config)
            console.log(res.data.msg)
        }
        catch(err){
            console.error(err)
        }
        onClose()
    }

    const handleChange2=(event)=>{
        setReportText(event.target.value)
    }
  
    return (
        <div className="inset-0  bg-white bg-opacity-30 backdrop-blur-sm fixed w-full h-full outline-none justify-center items-center overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable top-1/4 left-1/4 relative w-6/12 h-8/12 pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
        <span align='right' className='items-end'><button onClick={onClose} type="button" className="mr-6 mt-1 float-right btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-100 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">X</button></span>
        
        <form>
        <div className="flex w-full p-4 border-b-4 border-gray-300">
            <div className="flex flex-col flex-grow mx-4">
                <textarea type='/text' id='textArea' value={ReportText} required={true} onChange={handleChange2} className="peer p-3 m-3 bg-transparent border border-gray-500 rounded-sm"  rows="6" placeholder="Please tell you concern.."></textarea>
                <div className="flex justify-end mt-2">
                    <button type='submit' onClick={reportUser} className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Report</button>
                </div>
            </div>
        </div>
        </form>

        </div>
        </div>
    </div>
  )
}
