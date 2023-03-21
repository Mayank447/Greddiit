import React,{useState} from 'react';
import axios from 'axios'
import ForumInput from './GreddiitForumInput'

export default function GreddiitForm({visible, onClose}) {
  
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [tags,setTags]=useState('')
  const [banned_keywords,setBanned_keywords]=useState('')

  if(!visible) return false;
  const handleNameChange=(event)=>{setName(event.target.value)}
  const handleTagsChange=(event)=>{setTags(event.target.value)}
  const handleDescriptionChange=(event)=>{setDescription(event.target.value)}
  const handleBannedKeywordsChange=(event)=>{setBanned_keywords(event.target.value)}

  async function createGreddiit(){
    const config={
      headers:{
        'x-auth-token':localStorage.getItem("x-auth-token"),
        'Content-type':'application/json'
      }
    }

    const body_={
      'name':name,
      'description':description
    }

    try{
      const res=await axios.post('/api/greddiit',body_,config)
      if(res.data.msg==='Sub Greddiit was created') {alert(res.json.msg)}
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="inset-0  bg-gray-300 bg-opacity-80 backdrop-blur-sm fixed w-full h-full outline-none justify-center items-center overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-scrollable top-20 left-1/4 relative w-3/5 h-3/5 pointer-events-none">            
    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none">    
    <div className="block rounded-lg bg-grey-600 p-6 shadow-lg">
    
    <form>
    <ForumInput label="Name:" id={'name'} type="text" value={name} placeholder="Name" handleChange={handleNameChange} isRequired={true} />
    <ForumInput label="Tags:" id={'tags'} type="text" value={tags} placeholder="Tags should be comma separated" handleChange={handleTagsChange} isRequired={false}/>
    <ForumInput label="Banned Keywords:" id={'banned_keywords'} value={banned_keywords} type="text" placeholder="Banned words should be comma separated" handleChange={handleBannedKeywordsChange} isRequired={false}/>
    <div className="relative mb-5" data-te-input-wrapper-init>
      Description: 
      <textarea type="text" value={description} className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-60"
      id={'description'} onChange={handleDescriptionChange} aria-describedby="emailHelp" placeholder="Description" required={true}/>
    </div>

    {/* <label className="block pb-4">
    <span className="sr-only">Choose profile photo</span>
    <input type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
    </label> */}

    <button
      type="submit" onClick={createGreddiit}
      className="rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
      data-te-ripple-init>
      Submit
    </button>
    <button
      type="button" onClick={onClose}
      className="rounded bg-primary ml-4 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
      data-te-ripple-init>
      Cancel
    </button>
  </form>
</div>
</div>
</div>
</div>
  )
}
