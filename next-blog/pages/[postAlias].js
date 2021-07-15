import { useRouter } from "next/dist/client/router";

import PostDetails from "../components/post-details";
import { getPostByAlias } from '../dummy-data';

export default function PostDetailsPage() {
    const router = useRouter();
    const { postAlias } = router.query;
    const post = getPostByAlias(postAlias);

    return <PostDetails data={post}/>
}