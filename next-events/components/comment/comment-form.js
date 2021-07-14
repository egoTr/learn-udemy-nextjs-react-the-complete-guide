import { NotificationContext } from '../../hooks/context-notification';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

// components
import Hr from '../ui/hr';

// styles
import styled from 'styled-components';
const Container = styled.div`
    width: clamp(400px, 50%, 600px);
    display: flex;
    flex-direction: column;
`;
const Form = styled.form`
    width: 100%;
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
    const { notify } = useContext(NotificationContext);

    const [status, setStatus] = useState();

    const refName = useRef();
    const refEmail = useRef();
    const refComment = useRef();

    useEffect(() => {
        if (status === 'info')
            notify(status, 'Next Events', `Your comment has been submitted successfully.`)
        else if (status === 'error')
            notify(status, 'Next Events', 'Something went wrong :((')
    }, [status]);

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
        try {
            const response = await axios.post(
                `/api/comments/${eventId}`,
                JSON.stringify(commentData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ); // axios.post

            setStatus('info');
        } catch (err) {
            setStatus('error');
        } // catch
    }

    if (status)
        return <></>;

    return <Container>
        <Form onSubmit={submitHandler}>
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

        <Hr />
    </Container>
}