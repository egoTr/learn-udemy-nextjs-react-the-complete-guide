import { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";

import Hr from '../../components/ui/hr';

// notification
import { NotificationContext } from "../../hooks/context-notification";

// styles
import styled from 'styled-components';
const FormDiv = styled.form`
    width: clamp(400px, 90%, 600px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h2 {
        color: var(--color-app-primary);
    }

    & input {
        width: 100%;
        margin-bottom: 10px;
        padding: 10px;
    }

    & button {
        width: 100%;
        margin-top: 5px;
        padding: 10px;
    }

    & textarea {
        width: 100%; min-width: 100%; max-width: 100%;
        height: 100px; min-height: 50px; max-height: 200px;
        padding: 10px;
    }
`;

export default function ContactForm() {
    const { notify } = useContext(NotificationContext);

    const [status, setStatus] = useState();

    const refName = useRef();
    const refEmail = useRef();
    const refText = useRef();

    useEffect(() => {
        if (status === 'success')
            notify(status, status.toUpperCase(), 'Thank you !')
        else if (status === 'error')
            notify(status, status.toUpperCase(), 'Something went wrong :((')
    }, [status]);

    async function submitHandler(event) {
        event.preventDefault();

        // post request
        const contactData = {
            time: Date.now(),
            name: refName.current.value,
            email: refEmail.current.value,
            text: refText.current.value
        }
        try {
            const response = await axios.post(
                '/api/contact',
                JSON.stringify(contactData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ); // axios.post

            setStatus('success');
        } catch (err) {
            setStatus('error')
        } // catch
    }

    return <>
        <FormDiv onSubmit={submitHandler}>
            <h2>CONTACT EGO TRẦN</h2>
            <Hr />

            <p style={{ marginTop: '5px' }}>Your name:</p>
            <input
                name="name"
                ref={refName}
                type="text"
                disabled={status==='success'}
                required
                autoFocus
            />

            <p>Your email address:</p>
            <input
                name="email"
                ref={refEmail}
                type="email"
                disabled={status==='success'}
                required
            />

            <p>Your message:</p>
            <textarea
                name="text"
                ref={refText}
                disabled={status==='success'}
                required
            >
            </textarea>

            <button className="btn-secondary" disabled={status==='success'}>
                {status==='success' ? 'Submitted' : 'Submit'}
            </button>
        </FormDiv>
    </>
}