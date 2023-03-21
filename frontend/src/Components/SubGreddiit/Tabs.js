import React,{useContext} from 'react'
import SubGreddiitContext from '../../Context/SubGreddiitContext';

export default function Tabs() {
    const { clickedUsers, clickedJoinRequests, clickedStatistics, clickedReports } = useContext(SubGreddiitContext);
    const handleUsers=()=>{
        clickedUsers(true);
        clickedJoinRequests(false)
        clickedStatistics(false)
        clickedReports(false)
    }
    
    const handleJoinRequests=()=>{
        clickedUsers(false);
        clickedJoinRequests(true)
        clickedStatistics(false)
        clickedReports(false)
    }
    
    const handleStatistics=()=>{
        clickedUsers(false);
        clickedJoinRequests(false)
        clickedStatistics(true)
        clickedReports(false)
      }
    
    const handleReport=()=>{
        clickedUsers(false);
        clickedJoinRequests(false)
        clickedStatistics(false)
        clickedReports(true)
    }
    
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap-mb-px">
            <li className="mr-5">
                <button onClick={handleUsers} className="mx-16 inline-block p-4 border-b-2  focus:text-blue-600 focus:border-blue-600 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 active:shadow-lg transition duration-150 ease-in-out data-tab-target=">
                    Users
                </button>
            </li>
            <li className="mr-2">
                <button onClick={handleJoinRequests} className="mx-16 inline-block p-4 border-b-2  focus:text-blue-600 focus:border-blue-600 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 active:shadow-lg transition duration-150 ease-in-out data-tab-target=">
                    Joining Requests
                </button>
            </li>
            <li className="mr-2">
                <button onClick={handleStatistics} className="mx-16 inline-block p-4 border-b-2  focus:text-blue-600 focus:border-blue-600 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 active:shadow-lg transition duration-150 ease-in-out data-tab-target=" role="tab" aria-selected="true">
                    Statistics
                </button>
            </li>
            <li onClick={handleReport} className="mr-2">
                <button className="mx-16 inline-block p-4 border-b-2  focus:text-blue-600 focus:border-blue-600 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 active:shadow-lg transition duration-150 ease-in-out data-tab-target=" role="tab" aria-selected="true">
                    Reports
                </button>
            </li>
        </ul>
    </div>
  )
}
