import { useRouter } from 'next/router';
import Head from 'next/head';

import EventItem from '../../components/event-item';

import { getFeaturedEventsPath, getEventById } from '../../helpers/firebase';

export default function AllEvents({ event }) {
    const router = useRouter();
    if (router.isFallback)
        return (<p>Loading...</p>);

    return <>
        <Head>
            <title>{event.title}</title>
        </Head>

        <EventItem data={event} details={true} />
    </>
}

export async function getStaticPaths() {
    const paths = await getFeaturedEventsPath();

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;

    const event = await getEventById(params.id);

    if (!event)
        return { notFound: true };

    return {
        props: { event },
        revalidate: 30
    };
}