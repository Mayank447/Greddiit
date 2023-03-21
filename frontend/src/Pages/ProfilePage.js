import Navbar from "../Components/Navbar/Navbar";
import Profile from "../Components/Profile";
import SaveProfile from "../actions/NavigateToProfile";

import {useEffect, useState} from "react";
import ProfileContext from '../Context/ProfileContext'

export default function ProfilePage(){
    
    const [user,changeUser]=useState({})
    const [loading,changeLoading]=useState(true)

    useEffect(()=>{
        const func = async () => {
            await SaveProfile();
            changeUser(JSON.parse(localStorage.getItem("profile")))
            changeLoading(false);            
        };
        func();
        changeUser(JSON.parse(localStorage.getItem("profile")))
    },[])

    if (loading) return <>Loading...</>

    return(
        <>
        <Navbar />
        <ProfileContext.Provider value={{user,changeUser}}>
            <Profile /> 
        </ProfileContext.Provider>
        </>
    )
}