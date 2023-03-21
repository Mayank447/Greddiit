import {useContext} from 'react'
import BlockedUser from './BlockedUser'
import UserListComponent from './UserListComponent'
import SubGreddiitContext from '../../Context/SubGreddiitContext'

export default function UserList({visible}) {
  const {SubGreddiitDetails}=useContext(SubGreddiitContext)
  let i=0;
  if(!visible) return null

  return (
    <>
        <div className="pt-8 flex items-center max-w-10/12 mx-auto justify-center">
        <div className="p-4 w-10/12 bg-gray-200 rounded-lg border shadow-md sm:p-8border-gray-700">
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-700">
                {SubGreddiitDetails.people? SubGreddiitDetails.people.map((user)=>
                  <UserListComponent key={user.username} number={++i} 
                    firstname={user.firstname} lastname={user.lastname} 
                    age={user.age}
                    username={user.username}
                    email={user.email} />    
                ):null} 

                {SubGreddiitDetails.blocked_users?SubGreddiitDetails.blocked_users.map((user)=>
                  <BlockedUser key={user.username} number={++i} 
                    firstname={user.firstname} lastname={user.lastname} 
                    age={user.age}
                    username={user.username}
                    email={user.email} />    
                ):null} 
                
            </ul>
        </div>
        </div>
        </div>
    </>
  )
}
