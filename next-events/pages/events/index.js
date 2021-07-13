// dependences
import Head from 'next/head'

// components
import Search from '../../components/search';
import EventItem from '../../components/event-item';

// data
import { getAllEvents, getYearsFromEvents } from '../../helpers/firebase';

const eventsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

export default function AllEvents({ allEvents, years }) {
  return <>
    <Head>
      <title>All events</title>
    </Head>

    <Search years={years}/>

    <div style={eventsContainer}>
      {allEvents.map((item, i) =>
        <EventItem key={item.id} data={item} details={false} />
      )}
    </div>
  </>
}

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();
  const years = getYearsFromEvents(allEvents);

  return {
    props: {
      allEvents,
      years
    },
    revalidate: 60 // 1 minutes
  }
}