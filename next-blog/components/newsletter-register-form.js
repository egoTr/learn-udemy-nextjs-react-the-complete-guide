// context
import { NotificationContext } from '../hooks/context-notification';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

// styles
import styled from 'styled-components';
const Form = styled.form`
    width: clamp(300px, 50%, 400px);
    display: flex;
    flex-direction: column;

    & b {
        color: var(--color-app-primary);
    }

    & input {
        margin: 5px 0;
        padding: 10px;
    }

    & button {
        background-color: transparent;
        color: var(--color-app-secondary);
        text-align: left !important;
        font-weight: bold;
    }
`;

export default function NewsLetterRegisterForm() {
    const { notify } = useContext(NotificationContext);

    const [status, setStatus] = useState();

    const refEmail = useRef();

    useEffect(() => {
        if (status === 'success')
            notify(status, status.toUpperCase(), 'Thanks for subscribing me !')
        else if (status === 'info')
            notify(status, status.toUpperCase(), `You've already subscribed me !`)
        else if (status === 'error')
            notify(status, status.toUpperCase(), 'Something went wrong :((')
    }, [status]);

    async function submitHandler(event) {
        event.preventDefault();

        // post request
        const registrationData = {
            id: Date.now(),
            email: refEmail.current.value
        }
        try {
            const response = await axios.post(
                '/api/newsletter',
                JSON.stringify(registrationData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ); // axios.post

            setStatus('success');
        } catch (err) {
            if (err.response && err.response.status == 422) // email existed
                setStatus('info');
            else
                setStatus('error')
        } // catch
    }
    return <>
        <Form onSubmit={submitHandler}>
            {status === 'success' && <p>You've subscribed successfully.</p>}
            {status !== 'success' &&
                <>
                    <p>Join the newsletter</p>
                    <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        ref={refEmail}
                    />
                    <button>Subscribe</button>
                </>
            }
        </Form>
    </>
}