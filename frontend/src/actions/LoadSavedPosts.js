import axios from 'axios'

export default async function LoadSavedPosts() {
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
        const res=await axios.get(`/api/user/savedposts`,config)
        if(res.status!==200){
            return false;
        }
        const savedPosts=res.data
        //console.log(res.data)
        sessionStorage.setItem('savedposts-status',"true")
        sessionStorage.setItem('savedposts',JSON.stringify(savedPosts));
    }
    catch(err){
        console.log("error here",err.messgae)
    }
}
