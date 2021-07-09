// dependences
import Head from 'next/head'

// components
import EventItem from '../components/event-item';

// data
import { getFeaturedEvents } from '../dummy-data';

// styles
const eventsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  let content = (<h3>No featured events.</h3>);
  if (featuredEvents.length > 0)
    content = (<><h3>Featured events</h3>

      <div style={eventsContainer}>
        {featuredEvents.map((item, i) =>
          <EventItem key={item.id} data={item} />
        )}
      </div></>);

  return <>
    <Head>
      <title>Home - Next Events</title>
    </Head>

    {content}
  </>
}
