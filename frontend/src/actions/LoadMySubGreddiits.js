import axios from 'axios'

export default async function LoadMySubGreddiits() {
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
        const res=await axios.get("/api/user/subgreddiit",config)
        if(res.data.msg==='Server error'){
            return false;
        }
        //console.log(res.data)
        sessionStorage.setItem('mysubgreddiit-status',"true")
        sessionStorage.setItem('mysubgreddiit',JSON.stringify(res.data));
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
