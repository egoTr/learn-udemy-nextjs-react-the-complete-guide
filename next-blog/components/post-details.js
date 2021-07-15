// dependences
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

// components
import IconDate from './ui/icon-date';
import Hr from '../components/ui/hr';

// styles
import styled from 'styled-components';
const PostDiv = styled.div`
    width: clamp(400px, 90%, 768px);
    margin: 0 auto;
    padding: 10px;

    & h3 {
        color: var(--color-app-primary);
    }

    & img {
        max-width: 100%;
    }
`;
const PostHeader = styled.div``;

export default function PostDetails(props) {
    if (!props.data)
        return <p>Loading...</p>;

    const { alias, title, date, image, content } = props.data;
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

    return <>
        <Head>
            <title>{title}</title>
        </Head>

        <PostDiv>
            <PostHeader>
                <h3>{title}</h3>
                <div style={{ display: 'flex' }}>
                    <IconDate className="stroke-primary" />
                    <address>&nbsp;<i>{dateFormatted}</i></address>
                </div>
                <Hr />
            </PostHeader>
            
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </PostDiv>
    </>
}