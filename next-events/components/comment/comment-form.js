import { useState, useRef } from 'react';
import axios from 'axios';

// styles
import styled from 'styled-components';
const Form = styled.form`
    width: clamp(400px, 50%, 600px);
    display: flex;
    flex-direction: column;

    & * {
        width: 100%;
        margin-bottom: 5px;
    }

    & input, & textarea, & button {
        padding: 5px;
    }

    & textarea {
        width: 100%; min-width: 100%; max-width: 100%;
        height: 100px; min-height: 50px; max-height: 150px;
    }
`;
const Title = styled.p`
    font-weight: bold;
    color: var(--color-app-secondary);
`;

export default function CommentForm({ eventId }) {
    const [submitted, setSubmitted] = useState(false);

    const refName = useRef();
    const refEmail = useRef();
    const refComment = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        // post request
        const commentData = {
            id: Date.now(),
            event: eventId,
            name: refName.current.value,
            email: refEmail.current.value,
            comment: refComment.current.value
        }
        const response = await axios.post(
            `/api/comments/${eventId}`,
            JSON.stringify(commentData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); // axios.post

        setSubmitted(true);
    }

    if (submitted)
        return <p>Your comment has been submitted successfully.</p>;

    return <Form onSubmit={submitHandler}>
        <Title>Leave a comment</Title>
        <input
            name="name"
            type="text"
            placeholder="Your name (required)"
            required
            ref={refName}
        />
        <input
            name="email"
            type="email"
            placeholder="Your email"
            ref={refEmail}
        />
        <textarea
            name="comment"
            placeholder="Comment goes here (required)"
            required
            ref={refComment}
        >
        </textarea>
        <button className="btn-secondary">Submit</button>
    </Form>
}