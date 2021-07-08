// context
import { useContext } from 'react';
import { FavoritesContext } from '../hooks/favorites-context';

import styled from 'styled-components';
const MeetupDiv = styled.div`
    background-color: white;
    width: clamp(250px, 20%, 400px);
    padding: 10px;
    margin: 10px 10px 0 0;
    border: solid 1px #ddd;
    border-radius: 10px;

    & img {
        margin-top: 5px;
        max-width: 100%;
        border-radius: 5px;
    }

    & button {
        margin: 5px 5px 0 0;
        padding: 5px 10px;
    }
`;
const Title = styled.p`
    font-weight: bold;
    text-align: center;
`;
const Address = styled.p`
    font-style: italic;
    font-size: 85%;
    text-align: center;
`;

function MeetupItem(props) {
    const
        { favorites, addFavorite, removeFavorite } 
        = useContext(FavoritesContext);

    const { id, title, address, image, description, home } = props.data;

    function isFavorite(meetupId) {
        return favorites.some(meetup => meetup.id === meetupId);
    }

    const editHandler = () => {

    }

    const deleteHandler = () => {
    }

    return (
        <MeetupDiv>
            <Title>{title}</Title>
            <Address>{address}</Address>
            <img src={image} alt={title} title={title} />
            <p>{description}</p>
            
            {!isFavorite(id) && <button onClick={ () => addFavorite(props.data) } className="btn-primary">Favorite</button>}
            {isFavorite(id) && <button onClick={ () => removeFavorite(id) } className="btn-primary">Unfavorite</button>}
            
            {home && <button onClick={editHandler} className="btn-secondary">Edit</button>}
            {home && <button onClick={deleteHandler} className="btn-danger">Delete</button>}
        </MeetupDiv>
    )
}

export default MeetupItem;