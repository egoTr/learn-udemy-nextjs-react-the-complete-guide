import PostDetails from "../components/post/post-details";
import { getLatestPosts, getPostData } from "../helpers/markdown";

export default function PostDetailsPage({ post }) {
    return <PostDetails data={post} />
}

export async function getStaticPaths() {
    const latestPosts = getLatestPosts();
    const paths = latestPosts.map(post => {
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

    return {
        props: {
            post,
        },
        revalidate: 3600 // 1 hour
    }
}