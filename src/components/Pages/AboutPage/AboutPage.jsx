import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


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

  return (
     
    <div>
    
    {publicusers.map((publicUser) => (
               <div key={publicUser.id}>
                  <img src={publicUser.profile_picture} alt="profile picture" onClick={() => history.push("/info")} />
                  <h5> Click on {publicUser.username}'s to read more! </h5>
                  </div>
        ))} 
      
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
