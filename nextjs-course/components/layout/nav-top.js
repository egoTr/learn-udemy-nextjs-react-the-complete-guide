import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import styled from 'styled-components';
const NavFuck = styled.div`
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
    display: flex;
    justify-content: center;

    & * {
        margin-right: 10px;
    }
`;

export default function NavTop() {
    const router = useRouter();

    // Be careful about the order !!!
    const [session, loading] = useSession();

    const isLoggedIn = session && (session.user.name || session.user.email);

    async function signOutHandler() {
        const data = await signOut(
            {
                redirect: false,
                callbackUrl: "/"
            }
        )

        router.replace(data.url);
    }

    return <NavFuck>
        <Link href="/">Home</Link>

        {/* If session is NOT loading & user is ALREADY logged in  */}
        {
            (!loading && isLoggedIn) &&
            <>
                <Link href="/profile">Profile</Link>
                <button onClick={signOutHandler}>Log out</button>
            </>
        }

        {/* If session is NOT loading & user is NOT logged in  */}
        {
            (!loading && !isLoggedIn) &&
            <>
                <Link href="/login">Log in</Link>
                <Link href="/sign-up">Sign up</Link>
            </>
        }
    </NavFuck>
}