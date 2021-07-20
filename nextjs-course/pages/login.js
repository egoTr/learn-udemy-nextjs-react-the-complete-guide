// authentication guard
import handleLogin from "../helpers/auth";
import LoginForm from "../components/user/login-form";

export default function LoginPage() {
    return <>
        <LoginForm />
    </>
}

// We can check if user is logged on server-side
export async function getServerSideProps(context) {
    const result = await handleLogin(context, 'bypass');
    
    return result;
}