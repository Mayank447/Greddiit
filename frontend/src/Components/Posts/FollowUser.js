import axios from 'axios'
import TelegramIcon from '@mui/icons-material/Telegram';

export default function FollowUser({creator}) {

    async function followUser(){
        const config={
            headers:{
                'x-auth-token':localStorage.getItem("x-auth-token")
            }
        }
        try{
            const res=await axios.get(`/api/follow/${creator}`,config)
            alert(res.data.msg)
        }
        catch(err){
            console.error(err)
        }
    }
    
    return (
        <button onClick={followUser} className="text-sm font-semibold ml-4"><TelegramIcon />Follow the user</button>
    )
}
