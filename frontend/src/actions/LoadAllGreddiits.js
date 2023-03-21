import axios from 'axios'

export default async function LoadAllGreddiits() {

    const status=localStorage.getItem("status")
    if(status==='false'){
        return false
    }

    const token=localStorage.getItem("x-auth-token");
    const config={
        headers:{
            'x-auth-token':token
        }
    }

    try{
        const res=await axios.get(`/api/greddiit/`,config)
        if(res.status!==200){
            return false;
        }
        const greddiit=res.data
        //console.log(res.data)
        sessionStorage.setItem('all-greddiits-status',"true")
        sessionStorage.setItem('all-greddiits',JSON.stringify(greddiit));
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
