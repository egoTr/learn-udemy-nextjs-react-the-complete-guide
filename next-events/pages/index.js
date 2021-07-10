// dependences
import { useRouter } from 'next/router';
import Head from 'next/head';

// components
import EventItem from '../components/event-item';

// config, data
import { getFeaturedEvents } from '../helpers/firebase';

// styles
const eventsContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

export default function Home({ featuredEvents }) {
  const router = useRouter;
  if (router.isFallback)
    return <p>Loading...</p>;

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

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents
    },
    revalidate: 1800 // 30 minutes
  }
}