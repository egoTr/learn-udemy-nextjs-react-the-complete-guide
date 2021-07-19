import { useRef } from "react";
import axios from "axios";

// authentication guard
import Auther from "./auther";
 
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

export default function SignUpForm() {
    const refUsername = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const refPasswordConfirm = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        // Sign up the user
        const userData = {
            time: Date.now(),
            username: refUsername.current.value,
            email: refEmail.current.value,
            password: refPassword.current.value
        }

        try {
            const response = await axios.post(
                '/api/auth/sign-up',
                JSON.stringify(userData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (err) {
            console.log(err.message);
        } // catch
    }

    return <Auther action="bypass">
        <FormDiv onSubmit={submitHandler}>
            <p>Your name:</p>
            <input
                name="username"
                type="text"
                required
                autoFocus
                ref={refUsername}
            />

            <p>Your email:</p>
            <input
                name="email"
                type="text"
                required
                ref={refEmail}
            />

            <p>Password:</p>
            <input
                name="password"
                type="password"
                required
                ref={refPassword}
            />

            <p>Confirm password:</p>
            <input
                type="password"
                required
                ref={refPasswordConfirm}
            />

            <button>Submit</button>
        </FormDiv>
    </Auther>
}