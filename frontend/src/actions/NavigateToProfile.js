import {Navigate} from 'react-router-dom'
import axios from 'axios';


export default async function SaveProfile() {
    const status=localStorage.getItem("status")

    if(status==='false'){
        return false;
    }
    const token=localStorage.getItem("x-auth-token");

    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':token
        }
    }

    try{
        const res=await axios.get("/api/profile",config)
        if(res.status===200){
            const profile=res.data.profile
            localStorage.setItem("profile",JSON.stringify(profile))
            localStorage.setItem("profile-status",true)
            //console.log(profile)
            return true;
        }
        <Navigate to='/' />
        return false;
    }
    catch(err){
        console.error("error here",err.message);
        <Navigate to='/' />
        return false;
    }
}
