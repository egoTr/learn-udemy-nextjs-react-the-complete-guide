import { useRouter } from "next/router";
import { useRef, useState } from "react";
import axios from "axios";

// styles
import styled from 'styled-components';
const FormDiv = styled.form`
    width: clamp(400px, 700px, 90%);
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    & * {
        width: 100%;
    }

    & input, & button {
        padding: 5px;
    } 
`;
const Error = styled.p`
    font-size: 90%;
    color: red;
`;

export default function ChangePasswordForm() {
    const router = useRouter();

    const [error, setError] = useState('');

    const refPasswordCurrent = useRef();
    const refPassword = useRef();
    const refPasswordConfirm = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        // Check if new passwords match
        const password = refPassword.current.value;
        const passwordConfirm = refPasswordConfirm.current.value;
        if (password !== passwordConfirm) {
            setError('Passwords mismatch.')

            return;
        } // if

        // Sign up the user
        const credData = {
            passwordCurrent: refPasswordCurrent.current.value,
            password,
            passwordConfirm
        }

        try {
            const response = await axios.patch(
                '/api/user/change-password',
                JSON.stringify(credData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setError('');
                
            // Go to /profile page
            router.replace('/profile');
        } catch (err) {
            if (err.response && err.response.status === 400)
                setError(err.response.data);
            else
                setError('Something went wrong :(((')
        } // catch
    }

    return <>
        <FormDiv onSubmit={submitHandler}>
            <p>Current password:</p>
            <input
                type="password"
                required
                autoFocus
                ref={refPasswordCurrent}
            />

            <p>New password:</p>
            <input
                type="password"
                required
                ref={refPassword}
            />
            <p>Confirm new password:</p>
            <input
                type="password"
                required
                ref={refPasswordConfirm}
            />
            {error.length > 0 && <Error>{error}</Error>}

            <button>Submit</button>
        </FormDiv>
    </>
}