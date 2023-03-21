import Header from "../Components/Login_Signup/Header";

export default function LoginPage(){
    return(
        <>
        <Header 
            heading="Login to your account" 
            login_signup_state = '0'
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
        />
        </>
    )
}