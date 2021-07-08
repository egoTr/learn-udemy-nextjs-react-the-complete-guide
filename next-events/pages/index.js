// dependences
import Head from 'next/head'

// components
import EventItem from '../components/event-item';

// data
import { getFeaturedEvents } from '../dummy-data';

// styles
const eventsContainer = {
  display: 'flex'
};

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return <>
    <Head>
      <title>Home - Next Events</title>
    </Head>

    <h3>Featured Events</h3>

    <div style={eventsContainer}>
      {featuredEvents.map((item, i) =>
        <EventItem key={item.id} data={item} />
      )}
    </div>
  </>
}
