// dependences
import Link from 'next/link';
import Image from 'next/image';

// components
import IconDate from './ui/icon-date';

// styles
import styled from 'styled-components';
const PostDiv = styled.div`
    background-color: ${props => props.details ? 'rgba(var(--color-app-primary-rgb), 0.05)' : '#f9f9f9'};
    width: ${props => props.details ? '100%' : 'clamp(300px, 30%, 500px)'};
    margin: 20px 20px 0 0;
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
        color: ${props => props.details ? 'var(--color-app-primary)' : 'black'};
        cursor: pointer;
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

export default function PostItem(props) {
    const { id, alias, title, date, image, excerpt } = props.data;
    const link = `/${alias}`;
    const imageParsed = `/images/posts/${alias}/${image}`;
    let dateFormatted = new Date(date);
    dateFormatted = dateFormatted.toLocaleDateString(
        'en-US',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    )

    return <PostDiv details={props.details}>
        <Link href={link}>
            <a><h3>{title}</h3></a>
        </Link>

        <div className="flex-row-vertical-center" style={{ marginBottom: '5px' }}>
            <IconDate />
            <address>&nbsp;<i>{dateFormatted}</i></address>
        </div>

        <Link href={link}>
            <a>
                <Image
                    src={imageParsed}
                    alt={title}
                    title={title}
                    width={500}
                    height={500}
                />
            </a>
        </Link>

        {!props.details &&
            <>
                <p>{excerpt}</p>
                <Link href={link} passHref>
                    <button className="btn-secondary">View details</button>
                </Link>
            </>
        }
    </PostDiv>
}