import { useRouter } from 'next/router';
import { useRef } from "react";
import { signIn } from 'next-auth/client';

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

export default function LoginForm() {
    const router = useRouter();

    const refUsernameOrEmail = useRef();
    const refPassword = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const result = await signIn(
            'credentials',
            {
                redirect: false,
                usernameOrEmail: refUsernameOrEmail.current.value,
                password: refPassword.current.value
            }
        ) // signIn
        
        if (!result.error && true)
            router.replace('/');
    }

    return <>
        <FormDiv onSubmit={submitHandler}>
            <p>Username or email:</p>
            <input
                name="usernameOrEmail"
                type="text"
                required
                autoFocus
                ref={refUsernameOrEmail}
            />

            <p>Password:</p>
            <input
                name="password"
                type="password"
                required
                ref={refPassword}
            />

            <button>Login</button>
        </FormDiv>
    </>
}