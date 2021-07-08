// dependencies
import { useRef } from "react";
import { useHistory } from "react-router";

// config
import Firebase from "../config";

// styles
import styled from "styled-components";
const FormContainer = styled.div`
    background-color: white;
    width: clamp(400px, 50%, 600px);
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;

    & * {
        width: 100%;
        margin-top: 5px;
    }

    & input, & button, & textarea {
        padding: 5px 10px;
    }

    & textarea {
        min-width: 100%; max-width: 100%;
        height: 100px; min-height: 100px; max-height: 200px;
    }
`;

function NewMeetupPage(props) {
    const history = useHistory();

    // refs for inputs
    const refTitle = useRef();
    const refAddress = useRef();
    const refDescription = useRef();
    const refImage = useRef();

    const addMeetup = (meetup) => {
        // add to firebase
        fetch(
            Firebase.tableMeetups,
            {
                method: 'POST',
                body: JSON.stringify(meetup),
                headers: {
                    'Content-Type': 'application/json'
                } // headers
            } // options
        ).then(() => {
            history.replace('/');
        }) // fetch
    } // addMeetup

    const submitHandler = (event) => {
        event.preventDefault();

        // add new meetup
        const meetup = {
            id: Date.now(),
            title: refTitle.current.value,
            address: refAddress.current.value,
            description: refDescription.current.value,
            image: refImage.current.value,
        };

        addMeetup(meetup);
    } // submitHandler

    return (
        <FormContainer>
            <h3 className="color-secondary">Add new Meetup</h3>
            <Form onSubmit={submitHandler}>
                <input
                    name="title" type="text" placeholder="Title (required)" required
                    autoFocus
                    ref={refTitle}
                />
                <input
                    name="address" type="text" placeholder="Address (required)" required
                    ref={refAddress}
                />
                <textarea
                    name="description" placeholder="Description (required)" required
                    ref={refDescription}
                />
                <input
                    name="image" type="text" placeholder="Image's url"
                    ref={refImage}
                />

                <button className="btn-secondary">Submit</button>
            </Form>
        </FormContainer>
    )
}

export default NewMeetupPage;