// dependences
import { useState, useEffect } from 'react';

// components
import MeetupItem from '../components/meetup-item';

// config, dummy data
import Firebase from '../config';

// styles
import styled from 'styled-components';
const MeetupContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

function AllMeetupsPage(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect( () => {
      fetch(Firebase.tableMeetups)
        .then( (res) => {
          return res.json();
        }).then( data => {
          let meetups = [];
          
          for (const key in data) {
            const meetup = { key, ...data[key] };
            meetups.push(meetup);
          } // for
  
          setLoading(false);
          setData(meetups); 
        }) // fetch
    }, [loading] );

    const removeMeetupHandler = (meetupId) => {
        props.onDeleteMeetup(meetupId);
    }

    if (loading)
        return <p>Loading...</p>;

    return(
        <div>
            <h3 className="color-secondary">All Meetups</h3>

            <MeetupContainer>
                { data.map( (item, i) =>
                    <MeetupItem
                        key={item.id}
                        data={ {...item, home: true} }
                        onDeleteMeetup={removeMeetupHandler}
                    />
                 )}
            </MeetupContainer>
        </div>
    )
}

export default AllMeetupsPage;