// dependences
import Link from 'next/link';

// styles
import styled from 'styled-components';
const Nav = styled.div`
    background-color: #f9f9f9;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
`;
const NavApp = styled.div`
    color: var(--color-app-primary);
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
`;

export default function NavTop() {
    return <Nav>
        <Link href="/">
            <NavApp>Next Events</NavApp>
        </Link>

        <NavMain>
            <Link href="/events">All Events</Link>
            <Link href="/events/year/month/etc">Search</Link>
        </NavMain>
    </Nav>
}