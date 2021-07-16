import Head from 'next/head';

import PostBrief from '../components/post/post-brief';

// styles
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

import { getLatestPosts } from '../helpers/markdown';

export default function Home({ latestPosts }) {
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

export async function getStaticProps(context) {
  const latestPosts = getLatestPosts();

  return {
    props: {
      latestPosts
    },
    revalidate: 86400 // 1 day
  }
}