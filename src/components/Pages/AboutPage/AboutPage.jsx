import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const user = useSelector((store) => store.user);
  const stories = useSelector((store) => store.publicStory);
  const dispatch = useDispatch();
  const history = useHistory() 

  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY" });
  }, []);


  return (
     
    <div>
      <h3> {user.username}</h3>
        <img src={user.profile_picture} alt="profile picture" onClick={() => history.push("/info")} />

      <h5> Click on {user.username}'s to read more! </h5>

      {stories.map((publicStory) => (
        <div key={publicStory.id}>
     
          <h6>{publicStory.title}</h6>
          <p>{publicStory.body.substring(0, 100)}...</p>
          
        </div>
      ))}

    
    </div>
  );
}

export default AboutPage;
