import Head from 'next/head';

import PostBrief from '../components/post/post-brief';

// styles
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

import { getAllPosts } from '../helpers/markdown';

export default function AllPosts({ allPosts }) {
    return <>
        <Head>
            <title>All posts</title>
        </Head>

        <Container>
            {allPosts.map(post =>
                <PostBrief key={post.alias} data={post} />
            )}
        </Container>
    </>
}

export async function getStaticProps(context) {
    const allPosts = getAllPosts();
  
    return {
      props: {
        allPosts
      },
      revalidate: 86400 // 1 day
    }
  }