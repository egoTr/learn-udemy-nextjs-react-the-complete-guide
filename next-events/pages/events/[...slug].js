// dependences
import { useRouter } from 'next/router';
import Head from 'next/head'

// data, components
import { getFilteredEvents } from '../../dummy-data';
import Search from '../../components/search';
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

export default function FilteredEvents() {
    const router = useRouter();

    // this sucks
    let slug = router.query.slug;
    if (!slug)
        return <p>Loading...</p>

    const [year, month] = slug;
    const results = getFilteredEvents(year, month);

    let content = <p>No events found.</p>;
    if (results.length > 0)
        content = (<div style={eventsContainer}>
            {results.map((item, i) =>
                <EventItem key={item.id} data={item} details={false} />
            )}
        </div>);

    return <>
        <Head>
            <title>Search results - Next Events</title>
        </Head>

        <Search />

        {content}
    </>
}
