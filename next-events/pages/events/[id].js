import { useRouter } from 'next/router';
import Head from 'next/head'

export default function AllEvents() {
    const router = useRouter();
    const { id } = router.query;

    return <>
        <Head>
            <title>{id} - All Events</title>
        </Head>
        <h1>Events Details</h1>
        <p>{id}</p>
    </>
}
