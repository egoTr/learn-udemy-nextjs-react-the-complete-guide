// context
import { useContext } from 'react';
import { FavoritesContext } from '../../hooks/favorites-context';

import { Link } from 'react-router-dom';

// styles
import styled from 'styled-components';
const Header = styled.div`
    background-color: #f9f9f9;
    margin-bottom: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
    display: flex;
    align-items: center;

    & > a {
        color: var(--color-app-primary);
        font-size: 120%;
        font-weight: bold;
    }
`;

const Nav = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    & a {
        margin-left: 10px;
    }
`;

const FavoriteCount = styled.sup`
    margin-left: 2px;
    color: var(--color-app-primary);
    font-weight: bold;
`;

function MainNavigation() {
    const { favoritesCount } = useContext(FavoritesContext);

    return (
        <Header>
            <Link to="/">React Meetups</Link>
            <Nav>
                <Link to="/">All Meetups</Link>
                <Link to="/new-meetup">New Meetup</Link>
                <Link to="/favorites">My Favorites</Link>
                <FavoriteCount>{favoritesCount}</FavoriteCount>
            </Nav>
        </Header>
    )
}

export default MainNavigation;