// dependences
import Link from 'next/link';
import Image from 'next/image'

// styles
import styled from 'styled-components';
const EventDiv = styled.div`
    background-color: #f9f9f9;
    width: clamp(300px, 20%, 500px);
    margin: 10px 10px 0 0;
    padding: 10px;
    border: solid 1px #ddd;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
        border-radius: 5px;
    }

    & p {
        text-align: center;
    }

    & button {
        padding: 5px 10px;
    }
`;

export default function EventItem(props) {
    const { id, title, date, location, image, description } = props.data;
    let dateFormatted = new Date(date);
    dateFormatted = dateFormatted.toLocaleDateString(
        'en-US',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    )

    return <EventDiv>
        <h3>{title}</h3>
        <p><i>{dateFormatted}</i></p>
        <p><i>{location}</i></p>
        <Image
            src={image}
            width={300} height={300}
            alt={title}
            title={title}
        />
        <p>{description}</p>
        <Link href={`/events/${id}`}>
            <button className="btn-secondary">View details</button>
        </Link>
    </EventDiv>        
}