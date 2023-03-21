import React,{useState, useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Feedlist from '../Components/Posts/Feedlist';
import LoadGreddiit from '../actions/LoadGreddiit';
import GreddiitContext from '../Context/GreddiitContext'

export default function GreddiitPage() {
  
    const [GreddiitDetails,updateGreddiitDetails]=useState({})
    const [loading,changeLoading]=useState(true)

    useEffect(()=>{
        const func = async () => {
            if(sessionStorage.getItem("greddiit-id-status")==='true'){
                await LoadGreddiit(sessionStorage.getItem("greddiit-id"))
                updateGreddiitDetails(JSON.parse(sessionStorage.getItem("greddiit")))
                changeLoading(false);            
            }
        };
        func();
    },[])

    // useEffect(()=>{
    //     console.log(GreddiitDetails)
    // },[GreddiitDetails])

    if(loading) return <div>Loading...</div>

    return (
    <>
        <Navbar />
        <GreddiitContext.Provider value={{GreddiitDetails, updateGreddiitDetails}}>
            <Feedlist />
        </GreddiitContext.Provider>
    </>
    )
}
