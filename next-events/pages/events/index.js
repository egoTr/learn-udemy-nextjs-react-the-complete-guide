// dependences
import Head from 'next/head'

// components
import EventItem from '../../components/event-item';

// data
import { getAllEvents } from '../../dummy-data';

// styles
const eventsContainer = {
  display: 'flex'
};

export default function Home() {
  const AllEvents = getAllEvents();

  return <>
    <Head>
      <title>All Events</title>
    </Head>

    <h3>All Events</h3>

    <div style={eventsContainer}>
      {AllEvents.map((item, i) =>
        <EventItem key={item.id} data={item} />
      )}
    </div>
  </>
}
