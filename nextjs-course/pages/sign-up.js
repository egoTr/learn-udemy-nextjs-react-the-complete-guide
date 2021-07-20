// authentication guard
import handleLogin from "../helpers/auth";
import SignUpForm from "../components/user/sign-up-form";

export default function SignUpPage() {
    return <>
        <SignUpForm />
    </>
}

// We can check if user is logged on server-side
export async function getServerSideProps(context) {
    const result = await handleLogin(context, 'bypass');
    
    return result;
}