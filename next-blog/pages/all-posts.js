import Head from 'next/head';

import PostItem from '../components/post-item';

// styles
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

import { getAllPosts } from '../dummy-data';

export default function AllPosts() {
    const allPosts = getAllPosts();

    return <>
        <Head>
            <title>All posts</title>
        </Head>

        <Container>
            {allPosts.map(post =>
                <PostItem key={post.alias} data={post} />
            )}
        </Container>
    </>
}