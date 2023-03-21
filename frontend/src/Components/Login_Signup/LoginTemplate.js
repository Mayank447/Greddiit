import { useState, useEffect} from "react"
import {useNavigate, Navigate} from 'react-router-dom'
import axios from 'axios';
import {loginFields} from "../../constants/FormFields.js"
import Input from "./Input.js"
import FormButton from "./FormButton.js"
import AutoSignIn from "../../actions/autoLogin.js";
import SaveProfile from "../../actions/NavigateToProfile.js";

let fields=loginFields
let fieldsState={};
fields.forEach(field=>fieldsState[field.id]='');

export default function LoginTemplate(){
    const navigate=useNavigate()
    const[loginState,setLoginState]=useState(fieldsState);
    const[SubmitState,setSubmitState]=useState(false);

    useEffect(()=>{
        if(AutoSignIn()){
            <Navigate to='/profilepage' />
        }
    },[])

    //Handling change, submit
    const handleChange=(event)=>{
        setLoginState({...loginState,[event.target.id]:event.target.value})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        Login()
    }

    //Logging in the user
    const Login=()=>{
        const username=loginState["email-address"]
        const password=loginState["password"]

        if(username!=='' && password!=='') {
            setSubmitState(false)
            loginUser(username,password);
        }
        else {
            setSubmitState(true)
            setSubmitState(false)
        }
    }

    //Handle Login API Integration here
    const loginUser = async (username_,password_) => {
        const body_=JSON.stringify({
            email:username_,
            password:password_
        })

        const config={
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'Content-Type':'application/json'
            }
        }

        try{
            const res=await axios.post('/api/auth/login/',body_, config)
            const token=res.data.token
            localStorage.setItem("x-auth-token",token)
            localStorage.setItem("status","true")
            SaveProfile()
            setTimeout(()=>{navigate("/profilepage")},500)
        }
        catch(err){
            console.error("error here", err.messgae);
            localStorage.setItem("status","false")
        }
    }

    return(
        <center>
        <form className="mt-8 space-y-6">
        <div className="space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>
        <FormButton handleSubmit={handleSubmit} isDisabled={SubmitState} text="Login" />
        </form>
        </center>
    )
}