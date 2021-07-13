import useSWR from 'swr';
import { useState, useEffect } from "react";
import axios from "axios";

import Hr from "../layout/hr";

// styles
import styled from "styled-components";
const CommentsDiv = styled.div`
    width: clamp(400px, 50%, 600px);
    display: flex;
    flex-direction: column;

    & span, & i {
        font-size: 90%;
    }
`;
const Title = styled.p`
    font-weight: bold;
    color: var(--color-app-secondary);
`;
const Comment = styled.div`
    width: 100%;
    margin-bottom: 5px;
    padding: 5px 10px 10px 0;
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px #ddd;
`;

export default function CommentList({ eventId }) {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState();

    const { data, error } = useSWR(`/api/comments/${eventId}`);
    useEffect(() => {
        if (data) {
            setLoading(false);
            setComments(data.comments);
        } // if
    }, [data]);

    /*     
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/comments/${eventId}`);

            setLoading(false);
            setComments(result.data.comments);
        };

        fetchData();
    }, [eventId]); 
    */

    let content;
    if (!comments || loading)
        content = <span>Loading comments...</span>;
    else if (comments && comments.length === 0)
        content = <span>No comments.</span>;
    else
        content = (
            <>
                <Title>Comments</Title>

                {comments.map(comment =>
                    <Comment key={comment.id}>
                        <span>{comment.comment}</span>
                        <i>{comment.name}</i>
                    </Comment>)}
            </>
        );

    return <CommentsDiv>
        <Hr />

        {content}
    </CommentsDiv>
}