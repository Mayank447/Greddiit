import Header from "../Components/Login_Signup/Header";

export default function SignUpPage(){
    return(
        <>
        <Header
            heading="Create a new account"
            login_signup_state = '1'
            paragraph="Already have an account. "
            linkName="Login"
            linkUrl="/Login"
        />
        </>
    )
}