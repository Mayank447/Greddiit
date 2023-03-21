import {useState} from 'react'
import GreddiitForm from './GreddiitForm'

export default function CreateGreddiitButton() {
    const [visible,changeVisible]=useState(false)
    const closeForm=()=>{
        changeVisible(false)
    }
    
return (
  <>
    <center>
    <button onClick={()=>{changeVisible(true)}} className="mt-5 w-11/12 flex justify-center text-center bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 border border-blue-500 hover:border-transparent rounded">
    CREATE YOUR OWN GREDDIIT
    </button>
    </center>
    <GreddiitForm visible={visible} onClose={closeForm}/>
  </>
  )
}
