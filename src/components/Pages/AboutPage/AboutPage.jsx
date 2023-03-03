import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Grid, Card, CardContent, CardActions} from '@mui/material'
import './AboutPage.css'


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
    <div className='aboutpage-container'>
      <h1 className='aboutpage-title'>Explore Stories</h1>
    <Grid container spacing={3}>
      {publicusers.map((publicUser) => (
        <Grid item xs={1} md={4} key={publicUser.id}  style={{textAlign: 'center'}}>
<Card className='aboutpage-card'>
  <CardContent>
          <h4 className='aboutpage-cardtitle'>{publicUser.username}</h4>
          <img 
          className='aboutpage-cardimage' 
          src={publicUser.profile_picture} 
          alt="profile picture" onClick={() => history.push(`/info/${publicUser.id}`)} />
          </CardContent>
<CardContent>
          {stories
            .filter((publicStory) => publicStory.user_id === publicUser.id)
            .map((publicStory) => (
              <div className='aboutpage-cardstory' key={publicStory.id}>
                          <button className='card-button' onClick={() => history.push(`/info/${publicUser.id}`)} > Read More </button >
                <h4 className='aboutpage-cardtitle'>{publicStory.title}</h4>
                <p className='aboutpage-cardbody'>{publicStory.body.substring(0,80)}...</p>
                </div>
            ))}
            </CardContent>
            </Card>
        </Grid>
      ))}
    </Grid>
  
  </div>
  )
}

export default AboutPage;
