import handleLogin from "../helpers/auth";
import ChangePasswordForm from "../components/user/change-password-form";

export default function ChangePasswordPage() {
    return <ChangePasswordForm />
}

// We can check if user is logged on server-side
export async function getServerSideProps(context) {
    const result = await handleLogin(context, 'block', '/change-password');
    
    return result;
}