// dependences
import Link from 'next/link';

// icons
import IconDate from './icons/icon-date';
import IconLocation from './icons/icon-location';

// styles
import styled from 'styled-components';
const EventDiv = styled.div`
    background-color: ${props => props.details ? 'rgba(var(--color-app-primary-rgb), 0.05)' : '#f9f9f9'};
    width: ${props => props.details ? '100%' : 'clamp(300px, 30%, 500px)'};
    margin: 10px 10px 0 0;
    padding: 10px;
    border: ${props => props.details ? 'solid 5px var(--color-app-primary)': 'solid 1px #ddd'};
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
        margin: 5px 0;
        aspect-ratio: 1/1;
        max-height: 500px;
        border-radius: ${props => props.details ? '50%' : '5px'};
    }

    & p {
        margin: 5px 0;
    }

    & button {
        width: 100%;
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

        <div className="flex-row-vertical-center">
            <IconLocation />
            <address>&nbsp;<i>{location}</i></address>
        </div>

        <img
            src={image}
            alt={title}
            title={title}
        />
        {props.details && <p>{description}</p>}

        {!props.details &&
            <Link href={`/events/${id}`}>
                <button className="btn-secondary">View details</button>
            </Link>
        }
    </EventDiv>        
}