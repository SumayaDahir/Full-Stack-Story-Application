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
  const stories = useSelector((store) => store.story);
  const dispatch = useDispatch();
  const history = useHistory() 

  useEffect(() => {
    dispatch({ type: "FETCH_STORY" });
  }, []);


  return (
     
    <div>
      <h3> {user.username}</h3>
        <img src={user.profile_picture} alt="profile picture" onClick={() => history.push("/info")} />

      <h5> Click on {user.username}'s to read more! </h5>

      {stories.map((story) => (
        <div key={story.id}>
     
          <h6>{story.title}</h6>
          <p>{story.body.substring(0, 100)}...</p>
          
        </div>
      ))}

    
    </div>
  );
}

export default AboutPage;
