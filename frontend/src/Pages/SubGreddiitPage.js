import {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Tabs from '../Components/SubGreddiit/Tabs'
import UserList from '../Components/SubGreddiit/UserList'
import JoiningRequests from '../Components/SubGreddiit/JoiningRequests'
import ReportList from '../Components/SubGreddiit/Report/ReportList'
import SubGreddiitContext from '../Context/SubGreddiitContext'
import LoadSubGreddiit from '../actions/LoadSubGrediit'
import Statistics from '../Components/SubGreddiit/Statistics/Statistics'
//import Report from '../Components/SubGreddiit/Report/Report'

export default function SubGreddiitPage() {
  const [SubGreddiitDetails,updateSubGreddiitDetails]=useState({})
  const [loading,changeLoading]=useState(true)

  const [users,clickedUsers]=useState(true);
  const [joinRequests,clickedJoinRequests]=useState(false);
  const [statistics,clickedStatistics]=useState(false);
  const [reports,clickedReports]=useState(false);

  const func = async () => {
    if(sessionStorage.getItem("subGreddiit-id-status")==="true"){
      LoadSubGreddiit(sessionStorage.getItem("subGreddiit-id"))
      updateSubGreddiitDetails(JSON.parse(sessionStorage.getItem("subgreddiit")));
      changeLoading(false);
    }
};

  useEffect(()=>{
    func();
  },[])
  
  // useEffect(() => {
  //   console.log("SG details changed:", SubGreddiitDetails);
  // }, [SubGreddiitDetails]);

  if (loading) return <div>Loading...</div>

  return (
    <>
        <Navbar />
        <SubGreddiitContext.Provider value={{SubGreddiitDetails, updateSubGreddiitDetails, 
        users,clickedUsers, reports,clickedReports, statistics,clickedStatistics, joinRequests,clickedJoinRequests}}>
          <Tabs />
          <UserList visible={users}/>
          <JoiningRequests visible={joinRequests}/>
          <Statistics visible={statistics}/>
          <ReportList visible={reports}/>
        </SubGreddiitContext.Provider>
    </>
  )
}
