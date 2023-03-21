import axios from 'axios'

//Auto-authentication only when the page first renders
export default async function AutoSignIn() {
    const status=localStorage.getItem("status")

    if(status==='false'){
        return false
    }

    const token=localStorage.getItem("token");
    const config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':token
        }
    }

    try{
        const res=await axios.get("/api/auth/",config)
        if(res.data.msg!=='Valid'){
            return false;
        }
        return true;
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}