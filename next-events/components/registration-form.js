import { useState, useRef } from 'react';
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

export default function RegistrationForm() {
    const [registed, setRegisted] = useState(false);
    const refEmail = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        // post request
        const registrationData = {
            id: Date.now(),
            email: refEmail.current.value
        }
        const response = await axios.post(
            '/api/register',
            JSON.stringify(registrationData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); // axios.post

        setRegisted(true);
    }
    return <>
        <Form onSubmit={submitHandler}>
            {registed && <p>You've registered to <b>Next Event</b> successfully.</p>}
            {!registed &&
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