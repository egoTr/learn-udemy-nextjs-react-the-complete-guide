import { useSession } from 'next-auth/client';
import Link from 'next/link';

// action="block" next={router.asPath}
export default function Profile() {
    const [session, loading] = useSession();
    if (!session)
        return <>Loading...</>;

    const { name, email, image } = session.user;

    return <>
        <h1>Profile Page</h1>
        <p>{name}</p>
        <p><i>{email}</i></p>

        <hr/>
        <Link href="/change-password">
            <a><button>Change password</button></a>
        </Link>
    </>
}