import { useRouter } from "next/dist/client/router";
import Head from 'next/head';

import PostDetails from "../components/post/post-details";
import { getLatestPosts, getPostData } from "../helpers/markdown";

export default function PostDetailsPage({ post }) {
    const { isFallback } = useRouter();
        
    return <>
        <Head>
            <title>{ isFallback ? 'Loading...' : post.meta.title }</title>
        </Head>

        { isFallback ? <p>Loading</p> : <PostDetails data={post}/> }
    </>
}

export async function getStaticPaths() {
    const posts = getLatestPosts();
    const paths = posts.map(post => {
        return {
            params: { postAlias: post.alias }
        }
    });

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params, query } = context;
    const post = getPostData(`${params.postAlias}.md`);

    if (!post) {
        console.log('!post');
        return { notFound: true }
    } // if

    return {
        props: {
            post,
        },
        revalidate: 3600 // 1 hour
    }
}