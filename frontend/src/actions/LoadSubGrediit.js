import axios from 'axios'

export default async function LoadSubGreddiit(id) {

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
        const res=await axios.get(`/api/greddiit/moderator/${id}`,config)
        if(res.data.msg!=='Successful'){
            return false;
        }
        const sub_greddiit=res.data.greddiit
        // console.log(res.data)
        sessionStorage.setItem('subgreddiit-status',"true")
        sessionStorage.setItem('subgreddiit',JSON.stringify(sub_greddiit));
        //navigate("/SubGreddiitPage")
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
