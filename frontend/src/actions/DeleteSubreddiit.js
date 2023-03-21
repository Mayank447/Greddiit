import axios from 'axios'

export default async function DeleteSubGreddiit(id) {

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
        const res=await axios.delete(`/api/greddiit/${id}`,config)
        if(res.data.msg!=='Sub Greddiit was removed'){
            return false;
        }
        alert('SubGreddiit was deleted');
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
