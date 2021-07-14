// dependences
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// data, components
import { FIREBASE_URL, getFilteredEventsSync, getYearsFromEvents } from '../../helpers/firebase';
import Search from '../../components/ui/search';
import EventItem from '../../components/event-item';

// styles
import styled from 'styled-components';
const Hr = styled.div`
    background-color: var(--color-app-secondary);
    width: 100%;
    height: 2px;
    margin: 10px 0 5px 0;
`;

const eventsContainer = {
    display: 'flex',
    flexWrap: 'wrap'
};

export default function FilteredEvents() { // FilteredEvents({ filteredEvents, years })
    let filteredEvents;
    let year, month;
    const router = useRouter();

    const [events, setEvents] = useState();
    const [years, setYears] = useState();

    const { data, error } = useSWR(FIREBASE_URL);
    useEffect(() => {
        if (data) {
            let results = [];

            for (const key in data)
                results.push({ id: key, ...data[key] });

            setYears( getYearsFromEvents(results) );
            setEvents(results);
        } // if

        return () => {
            // cleanup codes
        }
    }, [data]);

    const slug = router.query.slug;
    if (slug) // this sucks
        [year, month] = slug;

    if (events) // this also sucks
        filteredEvents = getFilteredEventsSync(events, year, month);
    
    let content = (<>
        <p>Loading...</p>
    </>);

    if (events && filteredEvents.length === 0)
        content = (<>
            <p>No events found.</p>
        </>);
    
    if (events && filteredEvents.length > 0)
        content = (<>
            <div style={eventsContainer}>
                {filteredEvents.map((item, i) =>
                    <EventItem key={item.id} data={item} details={false} />
                )}
            </div>
        </>);

    return <>
        <Head>
            <title>Search results - Next Events</title>
        </Head>

        <Search years={years} />

        {content}
    </>
}

/* export async function getServerSideProps(context) {
    const { params, query, req, res } = context;
    const [year, month] = params.slug;

    const allEvents = await getAllEvents();
    const filteredEvents = getFilteredEventsSync(allEvents, year, month);
    const years = getYearsFromEvents(allEvents);

    return {
        props: {
            filteredEvents,
            years
        }
    }
} */