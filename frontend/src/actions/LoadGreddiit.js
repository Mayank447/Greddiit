import axios from 'axios'

export default async function LoadGreddiit(id) {

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
        const res=await axios.get(`/api/greddiit/greddiitpage/${id}`,config)
        if(res.status!==200){
            return false;
        }
        const greddiit=res.data
        //console.log(res.data)
        sessionStorage.setItem('greddiit-status',"true")
        sessionStorage.setItem('greddiit',JSON.stringify(greddiit));
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
