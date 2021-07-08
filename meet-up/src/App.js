// dependences
import { Route, Switch } from 'react-router-dom';

// context
import FavoritesContextProvider from './hooks/favorites-context';

// styles, components
import './app.css';
import Layout from './components/layout/layout';
import AllMeetupsPage from './pages/all-meetups';
import NewMeetupPage from './pages/new-meetup';
import FavoritesPage from './pages/favorites';

function App() {
  return (
    <FavoritesContextProvider>
      <Layout>
          <Switch>
            <Route exact path="/">
              <AllMeetupsPage/>
            </Route>
            <Route path="/new-meetup">
              <NewMeetupPage/>
            </Route>
            <Route path="/favorites">
              <FavoritesPage/>
            </Route>
          </Switch>
      </Layout>
    </FavoritesContextProvider>
  );
}

export default App;
