import { useRouter } from 'next/router';
import Head from 'next/head'

export default function FilteredEvents() {
    const router = useRouter();
    console.log(router.query);

    return <>
        <Head>
            <title>Search results - Next Events</title>
        </Head>
        <h3>Search results</h3>
    </>
}
