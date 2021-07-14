// context
import { NotificationContext } from '../hooks/context-notification';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

// styles
import styled from 'styled-components';
const Form = styled.form`
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
            notify(status, 'Next Events', 'Thanks for registering us !')
        else if (status === 'info')
            notify(status, 'Next Events', `You've already registered Next Events !`)
        else if (status === 'error')
            notify(status, 'Next Events', 'Something went wrong :((')
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
                '/api/register',
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
            {status === 'success' && <p>You've registered to <b>Next Event</b> successfully.</p>}
            {status !== 'success' &&
                <>
                    <p>Register to stay updated with <b>Next Event</b></p>
                    <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        ref={refEmail}
                    />
                    <button>Register</button>
                </>
            }
        </Form>
    </>
}