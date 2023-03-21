import axios from 'axios'
import {useContext} from 'react'
import SubGreddiitContext from '../../Context/SubGreddiitContext'

export default function JoiningRequestComponent({number, firstname, lastname, age, username, email, id}) {

    const {SubGreddiitDetails, updateSubGreddiitDetails}=useContext(SubGreddiitContext)

    async function acceptRequest(){
        try{
            const greddiit_id=sessionStorage.getItem("subGreddiit-id")
            const config={
                headers:{
                    'x-auth-token':localStorage.getItem("x-auth-token")
                }
            }
            await axios.get(`/api/greddiit/accept/${greddiit_id}/${id}`,config)
            
            const temp=SubGreddiitDetails
            temp.people.push({_id:id, firstname: firstname, lastname:lastname, username:username, email:email, age:age})
            temp.joining_request.splice(number-1,1)
            updateSubGreddiitDetails({...temp})
        }
        catch(err){
            console.log(err.message)
            console.log('Server error')
        }
    }

    async function rejectRequest(){
        try{
            const greddiit_id=sessionStorage.getItem("subGreddiit-id")
            const config={
                headers:{
                    'x-auth-token':localStorage.getItem("x-auth-token")
                }
            }
            await axios.get(`/api/greddiit/reject/${greddiit_id}/${id}`,config)
            
            const temp=SubGreddiitDetails
            temp.joining_request.splice(number-1,1)
            updateSubGreddiitDetails({...temp})
        }
        catch(err){
            console.log(err.message)
            console.log('Server error')
        }
    }
  
    return (
    <>
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">{number+'. '}
            <div className="ml-2 flex-shrink-0 bg-white">
                <svg className="w-8 h-8 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <small className="text-xl font-medium text-gray-900 truncate">
                    {firstname} {lastname}, <small className='text-xl text-gray-700'>{age}</small>
                </small>
                <small className="ml-10 text-xl text-gray-700 truncate">
                    {username}
                </small>
                <small className="ml-10 text-xl text-gray-700 truncate">
                    {email}
                </small>
            </div>
            <button onClick={acceptRequest} type="button" className="inline-block rounded mr-5 bg-lime-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                ACCEPT
            </button>
            <button onClick={rejectRequest} type="button" className="inline-block rounded mr-5 bg-red-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                REJECT
            </button>
        </div>
    </li>
    </>
  )
}