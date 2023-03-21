import React,{useState, useEffect} from 'react'
import GreddiitsContext from '../Context/GreddiitContext'
import LoadAllGreddiits from '../actions/LoadAllGreddiits';
import SearchNavbar from '../Components/Navbar/SearchNavbar';
import AllGreddiitList from '../Components/AllGreddiit/AllGreddiitList';

export default function Greddiits() {
    
    const [Greddiits,setGreddiits]=useState({})
    const [Search,setSearch]=useState('')
    const [loading,changeLoading]=useState(true)

    const func = async () => {
        await LoadAllGreddiits()
        setGreddiits(JSON.parse(sessionStorage.getItem("all-greddiits")))
        changeLoading(false);
    };
    
    useEffect(()=>{
        func();
    },[])


    if(loading) return <div>Loading...</div>

    return (
    <>
        <GreddiitsContext.Provider value={{Greddiits,setGreddiits}}>
            <SearchNavbar />
            <AllGreddiitList />
        </GreddiitsContext.Provider>        
    </>
    )
}
