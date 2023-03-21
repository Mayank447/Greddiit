import {Link} from 'react-router-dom';
import LoginNavbar from '../Navbar/LoginNavbar';
import { useState } from 'react';
import { headerLoginFields, headerSignupFields } from '../../constants/HeaderFields';
import LoginTemplate from './LoginTemplate.js';
import SignupTemplate from './SignupTemplate.js';

export default function Header({login_signup_state, heading, paragraph, linkName}){
    const [login_signup, setLogin_Signup] = useState(login_signup_state);
    const [headingState, setHeadingState] =useState(heading);
    const [paragraphState, setParagraphState] =useState(paragraph);
    const [linkNameState, setLinkNameState] =useState(linkName);

    const Alternate=()=>{
        if(login_signup==='0'){
            setLogin_Signup('1');
            setHeadingState(headerSignupFields.heading);
            setParagraphState(headerSignupFields.paragraph);
            setLinkNameState(headerSignupFields.linkName);
        }
        else{
            setLogin_Signup('0');
            setHeadingState(headerLoginFields.heading);
            setParagraphState(headerLoginFields.paragraph);
            setLinkNameState(headerLoginFields.linkName);
        }
    }

    return(
        <>
        <LoginNavbar/>
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {headingState}
            </h2>
            <p className="mt-5 text-center text-sm text-gray-600">
            {paragraphState} {' '}
            {/* <a onClick="alternate()" className="font-medium text-purple-600 hover:text-purple-500">{linkName}</a> */}
            {<Link onClick={Alternate} className="font-medium text-purple-600 hover:text-purple-500">
                {linkNameState}
            </Link>}
            </p>
        </div>
        <div>
        {login_signup==='0'? <LoginTemplate /> : <SignupTemplate />}
        </div>
        </>
    )
}

/*function OldHeader({heading, paragraph, linkName, linkUrl='#'}){
    return(
        <>
        <Navbar/>
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-5 text-center text-sm text-gray-600">
            {paragraph} {' '}
            {<Link className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>}
            </p>
        </div>
        </>
    )
}

export {OldHeader}*/