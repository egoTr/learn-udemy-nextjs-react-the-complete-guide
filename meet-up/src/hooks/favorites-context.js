import { createContext, useState, useMemo } from "react";

export const FavoritesContext = createContext(null);
function FavoritesContextProvider(props) {
    const [favorites, setFavorites] = useState([]);

    function addFavorite(meetup) {
        setFavorites(existing => [...existing, meetup]);
    }

    function removeFavorite(meetupId) {
        setFavorites( existing => existing.filter(meetup => meetup.id !== meetupId) );
    }

    const context = useMemo( () => ({
        favorites,
        favoritesCount: favorites.length,
        addFavorite,
        removeFavorite,
    }), [favorites] );

    return<FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContextProvider;