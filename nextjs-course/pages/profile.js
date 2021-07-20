import handleLogin from "../helpers/auth";
import Profile from "../components/user/profile";

export default function ProfilePage() {
    return <Profile />
}

// We can check if user is logged on server-side
export async function getServerSideProps(context) {
    const result = await handleLogin(context, 'block', '/profile');
    
    return result;
}