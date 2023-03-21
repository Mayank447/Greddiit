import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
//import PropTypes from "prop-types";

import {signupFields} from "../../constants/FormFields.js"
import Input from "./Input.js"
//import RememberMe_ForgotPassword from "./RememberMeForgotPassword.js"
import FormButton from "./FormButton.js"
import AutoSignIn from "../../actions/autoLogin.js";


let fields=signupFields
let fieldsState={};
fields.forEach(field=>fieldsState[field.id]='');

export default function SignupTemplate(){
    const navigate=useNavigate();
    const [signupState,setSignupState]=useState(fieldsState);
    
    useEffect(()=>{AutoSignIn()},[])

    //Handling change, submit
    const handleChange=(event)=>setSignupState({
        ...signupState,[event.target.id]:event.target.value
    });

    const handleSubmit=(event)=>{
        event.preventDefault();

        if(signupState.password!==signupState.confirmpassword){
            //props.setAlert('Passwords do not match','danger')
            console.log('Password do not match')
        }
        else createAccount()
    }

    //Handle Login API Integration here
    const createAccount = async() =>{
        const body_=JSON.stringify({
            firstname:signupState["firstName"],
            lastname:signupState["lastName"],
            username:signupState["username"],
            email:signupState["email-address"],
            password:signupState["password"],
            age:signupState["age"],
            contactnumber:signupState["contactNumber"],
        })

        const config={
            headers:{'Content-Type':'application/json'}
        }

        try{
            const res=await axios.post("/api/signup/",body_, config)
            if(res.data.msg==='Account created')navigate("/login")
        }
        catch(err){
            console.error("error here", err.messgae);
        }
    }

    return(
        <center>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="p-1.3">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
        <FormButton onClick={handleSubmit} text="Signup" />
        </form>
        </center>
    )
}