import axios from 'axios'

export default async function LeaveGreddiit({id}) {

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
        const res=await axios.get(`/api/greddiit/leave/${id}`,config)
        alert(res.data.msg)
    }
    catch(err){
        console.log("error here",err.messgae)
        alert('Server error')
    }
}
