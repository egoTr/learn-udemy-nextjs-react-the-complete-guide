// dependences
import Link from 'next/link';
import Image from 'next/image';

// components
import IconDate from './ui/icon-date';
import IconLocation from './ui/icon-location';

// styles
import styled from 'styled-components';
const EventDiv = styled.div`
    background-color: ${props => props.details ? 'rgba(var(--color-app-primary-rgb), 0.05)' : '#f9f9f9'};
    width: ${props => props.details ? '100%' : 'clamp(300px, 30%, 500px)'};
    margin: 10px 10px 0 0;
    padding: 10px;
    border: ${props => props.details ? 'solid 5px var(--color-app-primary)' : 'solid 1px #ddd'};
    border-radius: ${props => props.details ? '10px' : '5px'};

    display: flex;
    flex-direction: column;
    align-items: center;

    & * {
        text-align: center;
    }

    & h3 {
        color: ${props => props.details ? 'var(--color-app-primary)' : 'black'}
    }

    & img {
        width: 100%; max-width: 500px;
        aspect-ratio: 1/1;
        max-height: 500px;
        border-radius: ${props => props.details ? '50%' : '5px'};
    }

    & p {
        margin: 5px 0;
    }

    & button {
        width: 100%;
        margin: 5px 0 0 0;
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

    return <EventDiv details={props.details}>
        <h3>{title}</h3>

        <div className="flex-row-vertical-center">
            <IconDate />
            <address>&nbsp;<i>{dateFormatted}</i></address>
        </div>

        <div className="flex-row-vertical-center" style={{ marginBottom: '5px' }}>
            <IconLocation />
            <address>&nbsp;<i>{location}</i></address>
        </div>

        <Image
            src={image}
            alt={title}
            title={title}
            width={500}
            height={500}
        />

        {props.details && <p>{description}</p>}

        {!props.details &&
            <Link href={`/events/${id}`} passHref>
                <button className="btn-secondary">View details</button>
            </Link>
        }
    </EventDiv>
}