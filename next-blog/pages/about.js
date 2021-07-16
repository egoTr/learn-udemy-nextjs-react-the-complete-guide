import Head from 'next/head';
import Image from 'next/image';

// styles
import styled from 'styled-components';
const Container = styled.div`
    width: clamp(200px, 50%, 300px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & * {
        text-align: center;
    }

    & code {
        background-color: #f9f9f9;
        color: var(--color-app-primary);
        padding: 5px;
        border: solid 1px #ddd;
        border-radius: 5px;
    }
`;
export default function About() {
    return <>
        <Head>
            <title>About Ego Trần</title>
        </Head>

        <Container>
            <Image
                title="Ego Tran"
                alt="Ego Tran"
                src="/favicon.png"
                width={300}
                height={300}
            />

            <h1>I'M EGO TRẦN</h1>
            <div>A developer who loves to <code>sing</code>.</div>
        </Container>
    </>
}