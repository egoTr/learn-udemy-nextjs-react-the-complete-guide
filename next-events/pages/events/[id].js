import { useRouter } from 'next/router';
import Head from 'next/head';

// components
import CommentForm from '../../components/comment/comment-form';
import CommentList from '../../components/comment/comment-list';
import EventItem from '../../components/event-item';
import Hr from '../../components/layout/hr';

import { getFeaturedEventsPath, getEventById } from '../../helpers/firebase';

// styles
import styled from 'styled-components';
const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function EventDetails({ event }) {
    const router = useRouter();
    if (router.isFallback)
        return (<p>Loading...</p>);

    return <>
        <Head>
            <title>{event.title}</title>
        </Head>
        
        <EventItem data={event} details={true} />

        <Hr />

        <CommentContainer>
            <CommentForm eventId={event.id} />
            <CommentList eventId={event.id} />
        </CommentContainer>
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