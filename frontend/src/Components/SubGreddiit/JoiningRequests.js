import {useContext} from 'react'
import SubGreddiitContext from '../../Context/SubGreddiitContext'
import JoiningRequestComponent from './JoiningRequestComponent'

export default function JoiningRequests({visible}) {
  const {SubGreddiitDetails}=useContext(SubGreddiitContext)
  let i=0;
  if(!visible) return null

  if(SubGreddiitDetails.joining_request.length<1) return null

  return (
    <>
        <div className="pt-8 flex items-center max-w-10/12 mx-auto justify-center">
        <div className="p-4 w-10/12 bg-sky-100 rounded-lg border shadow-md sm:p-8border-gray-700">
        <div className="flow-root">
            <ul className="divide-y divide-gray-700">
                {SubGreddiitDetails.joining_request? SubGreddiitDetails.joining_request.map((user)=>
                  <JoiningRequestComponent key={user.username} number={++i} 
                    firstname={user.firstname} lastname={user.lastname} 
                    age={user.age}
                    username={user.username}
                    email={user.email} 
                    id={user._id}/>    
                ):null}
            </ul>
        </div>
        </div>
        </div>
    </>
  )
}
