// dependences
import Link from 'next/link';

// styles
import styled from 'styled-components';
const Nav = styled.div`
    background-color: var(--color-app-primary);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
`;
const NavApp = styled.div`
    color: white;
    font-size: 120%;
    font-weight: bold;
    cursor: pointer;
`;
const NavMain = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    & * {
        margin-left: 10px;
    }

    & a {
        color: white;
    }
`;

export default function NavTop() {
    return <Nav>
        <Link href="/" passHref>
            <NavApp>EGO' BLOG</NavApp>
        </Link>

        <NavMain>
            <Link href="/all-posts">All posts</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </NavMain>
    </Nav>
}