import { useContext } from 'react';
import { FavoritesContext } from '../hooks/favorites-context';
import MeetupItem from '../components/meetup-item';

// styles
import styled from 'styled-components';
const MeetupContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

function FavoritesPage() {
    const {favorites} = useContext(FavoritesContext);

    if (favorites.length === 0)
        return <p>No favorite Meetups.</p>;
    return(
        <MeetupContainer>
            { favorites.map( (item, i) =>
                <MeetupItem
                    key={item.id}
                    data={ {...item, home: false} }
                    home={false}
                />
            )}
        </MeetupContainer>
    )
}

export default FavoritesPage;