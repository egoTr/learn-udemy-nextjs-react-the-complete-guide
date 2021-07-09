import { useRouter } from 'next/router';
import Head from 'next/head';

import EventItem from '../../components/event-item';

import { getEventById } from '../../dummy-data';

export default function AllEvents() {
    const router = useRouter();
    const { id } = router.query;
    const event = getEventById(id);

    if (!event)
        return (<p>Event not found.</p>);
    
    return <>
        <Head>
            <title>{event.title}</title>
        </Head>

        <EventItem data={event} details={true} />
    </>
}
