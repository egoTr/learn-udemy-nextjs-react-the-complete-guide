import fs from 'fs';
import path from 'path';

import { useState, useRef, useEffect } from "react";
import axios from 'axios';

export default function Page({ initEvents }) {
    const [events, setEvents] = useState(initEvents);
    const [details, setDetails] = useState();

    /* useEffect(() => {
        const fetchData = async () => {
            const result = await axios('/api/events');

            setEvents(result.data.data);
        };

        fetchData();
    }, []); */

    const refTitle = useRef();
    const refLocation = useRef();
    const refDescription = useRef();

    async function submitHandler(event) {
        // prevent browser's default trigger (refresh the page)
        event.preventDefault();

        const postData = {
            id: Date.now(),
            title: refTitle.current.value,
            location: refLocation.current.value,
            description: refDescription.current.value
        }

        const response = await axios.post(
            '/api/events',
            JSON.stringify(postData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ); // axios.post
    }

    async function getEvents() {
        const events = await axios.get('/api/events');
        setEvents(events.data.data);
    }

    async function showDetailsHandler(id) {
        const response = await axios.get(`/api/events/${id}`);
        setDetails(response.data.event);
    }

    return <>
        <form onSubmit={submitHandler}>
            <input name="title" ref={refTitle} type="text" placeholder="Event title" />
            <input name="location" ref={refLocation} type="text" placeholder="Location" />
            <textarea name="description" ref={refDescription} placeholder="Description" />

            <button>Submit</button>
        </form>

        <hr />

        <button onClick={getEvents}>Get events</button>
        <br/>
        {details && <i>{details.description}</i>}
        <ul>
            {events.map(event =>
                <li key={event.id}>
                    <span>{event.title}</span>
                    <button onClick={ () => showDetailsHandler(event.id) }>Show details</button>
                </li>
            )}
        </ul>
    </>
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'db', 'events.json');
    const fileData = fs.readFileSync(filePath);

    return {
        props: {
            initEvents: JSON.parse(fileData)
        }
    }
}