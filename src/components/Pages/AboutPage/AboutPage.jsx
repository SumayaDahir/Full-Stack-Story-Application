import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Grid} from '@mui/material'
import { useState } from 'react';
import InfoPage from '../InfoPage/InfoPage';


function AboutPage() {
  const publicusers = useSelector((store) => store.publicUser);
  const stories = useSelector((store) => store.publicStory);
  console.log("this is public user", publicusers)

  const dispatch = useDispatch();
  const history = useHistory() 

 
  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY"});
    dispatch({type: "FETCHPUBLIC_USER"});
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (publicUser) => {
    setSelectedUser(publicUser);
  }


  return (
    <>
    {selectedUser ? (
      <InfoPage user={selectedUser} />
    ) : (

    <Grid container spacing={2}>
      {publicusers.map((publicUser) => (
        <Grid item xs={6} md={4} key={publicUser.id}  style={{textAlign: 'center'}}>
          <img src={publicUser.profile_picture} alt="profile picture" onClick={() => handleUserClick(publicUser)} />
          <h5>Click on {publicUser.username}'s story to read more!</h5>
          {stories
            .filter((publicStory) => publicStory.user_id === publicUser.id)
            .map((publicStory) => (
              <div key={publicStory.id}>
                <h6>{publicStory.title}</h6>
                <p>{publicStory.body.substring(0, 100)}...</p>
              </div>
            ))}
        </Grid>
      ))}
    </Grid>
  )}
  </>
  )
}

export default AboutPage;
