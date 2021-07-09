// dependences
import Head from 'next/head'

// components
import Search from '../../components/search';
import EventItem from '../../components/event-item';

// data
import { getAllEvents } from '../../dummy-data';

const eventsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

export default function Home() {
  const AllEvents = getAllEvents();

  return <>
    <Head>
      <title>All events</title>
    </Head>

    <Search />

    <div style={eventsContainer}>
      {AllEvents.map((item, i) =>
        <EventItem key={item.id} data={item} details={false} />
      )}
    </div>
  </>
}
