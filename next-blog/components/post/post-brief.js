// dependences
import Link from 'next/link';
import Image from 'next/image';

// components
import IconDate from '../ui/icons/icon-date';

// styles
import styled from 'styled-components';
const PostDiv = styled.div`
    background-color: #f9f9f9;
    width: clamp(400px, 30%, 600px);
    margin: 20px 20px 0 0;
    padding: 10px;
    border: solid 1px #ddd;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    }
    
    & * {
        text-align: center;
    }

    & h3 {
        color: black;
        cursor: pointer;
    }

    & img {
        width: 100%; max-width: 500px;
        aspect-ratio: 1/1;
        max-height: 500px;
        border-radius: 5px;
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
const DetailsButtonDiv = styled.div` // Align button [Details] docks at the bottom
    width: 100%;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & button {
        width: 100%;
    }
`;

export default function PostBrief(props) {
    const { alias, meta, content } = props.data;
    const { title, date, image, excerpt } = meta;

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

    return <PostDiv>
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

        <p>{excerpt}</p>

        <DetailsButtonDiv>
            <Link href={link} passHref>
                <button className="btn-secondary">View details</button>
            </Link>
        </DetailsButtonDiv>
    </PostDiv>
}