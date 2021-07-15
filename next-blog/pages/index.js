import Head from 'next/head';

import PostBrief from '../components/post-brief';

// styles
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

import { getLatestPosts } from '../dummy-data';

export default function Home() {
  const latestPosts = getLatestPosts();

  return (
    <>
      <Head>
        <title>Home - Ego Trần</title>
      </Head>

      <Container>
        {latestPosts.map(post =>
          <PostBrief key={post.alias} data={post} />
        )}
      </Container>
    </>
  )
}
