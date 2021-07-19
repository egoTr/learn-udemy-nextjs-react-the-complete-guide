/*
    Authentication guard
    !!! NOT implemented for the /login page

    action = 'block'    => navigate to /login page if user NOT logged in yet
    action = 'bypass'   => navigate to home (/) if user ALREADY logged in
*/

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export default function Auther({ children, action }) {
    const router = useRouter();

    // Be careful about the order !!!
    const [session, loading] = useSession();

    const isLoggedIn = session && (session.user.name || session.user.email);

    if (loading)
        return <></>;
    else if (action === "block" && !isLoggedIn) {
        router.replace('/login');

        return <></> // It takes time to calculate the login state :((((
    } // else
    else if (action === "bypass" && isLoggedIn) {
        router.replace('/');

        return <></> // It takes time to calculate the login state :((((
    } // else

    // console.log('RENDERING {children}')

    return <>{children}</>
}