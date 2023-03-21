import axios from 'axios'
import {useState,useContext} from 'react'
import ProfileContext from '../../Context/ProfileContext'
import EditProfileElement from "./EditProfileElement"
import SaveProfile from '../../actions/NavigateToProfile'

export default function EditProfileModal({visible=true, onClose, Modal_title, firstname, lastname, age, email, contactnumber, username}){
    const {user,changeUser}=useContext(ProfileContext)
    const [temp,changeTemp]=useState({firstname:'',lastname:'',age:'',email:'',username:'',password:'',confirmpassword:'',contactnumber:''})

    if(!visible) {return null;}

    const handleChange=(event)=>{
        changeTemp({...temp,[event.target.id]:event.target.value})
    }

    const SaveChanges=(event)=>{
        event.preventDefault();

        if(user.password===user.confirmpassword){
            updateAccount();    
        }
        else alert("Passwords do not match")
    }

    const updateAccount = async() =>{
        const body_=JSON.stringify({
            firstname:temp["firstname"],
            lastname:temp["lastname"],
            username:temp["username"],
            email:temp["email"],
            password:temp["password"],
            age:temp["age"],
            contactnumber:temp["contactnumber"],
        })

        const token=localStorage.getItem("x-auth-token")

        const config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':token
            }
        }

        try{
            const res=await axios.put("/api/profile/",body_, config)
            if(res.data.msg==='Your profile was updated') {
                alert("Profile was updted")
                SaveProfile()
                changeUser(temp)
                onClose();
            }
        }
        catch(err){
            console.error("error here", err.messgae);
            alert('Server Error')
        }
    }

    return(
        <>
        <div className="inset-0  bg-black bg-opacity-10 backdrop-blur-sm fixed w-full h-full outline-none justify-center items-center overflow-x-hidden overflow-y-auto" id="exampleModalScrollable" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable top-1/4 left-1/3 relative w-2/5 h-3/5 pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        {Modal_title}
                        </h5>
                        <button onClick={onClose} type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">X</button>
                    </div>

                <form>
                <div className="modal-body relative p-4">
                    <EditProfileElement Label="First Name" id="firstname" placeholder={user.firstname} value={temp.firstname} handleChange={handleChange} type="text"/>
                    <EditProfileElement Label="Last Name" id="lastname" placeholder={user.lastname} value={temp.lastname} handleChange={handleChange} type="text"/>
                    <EditProfileElement Label="Username" id="username" placeholder={user.username} value={temp.username} handleChange={handleChange} type="text"/>
                    <EditProfileElement Label="Email ID" id="email" placeholder={user.email} value={temp.email} handleChange={handleChange} type="email"/>
                    <EditProfileElement Label="Age" id="age" placeholder={user.age} value={temp.age} handleChange={handleChange} type="number"/>
                    <EditProfileElement Label="Contact Number" id="contactnumber" placeholder={user.contactnumber} value={temp.contactnumber} handleChange={handleChange} type="number"/>
                    <EditProfileElement Label="Password" id="password" placeholder="********" value={temp.password} handleChange={handleChange} type="password"/>
                    <EditProfileElement Label="Confirm Password" id="confirmpassword" placeholder="********" value={temp.confirmpassword} handleChange={handleChange} type="password"/>
                </div>

                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button type="submit" onClick={SaveChanges} className="inline-block px-2 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1 mx-3">
                    Save changes
                    </button>
                    <button type="button" onClick={onClose} className="inline-block px-2 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-3" data-bs-dismiss="modal">
                    Cancel
                    </button>
                </div>
                </form>

            </div>
        </div>
        </div>
        </>
    )
}