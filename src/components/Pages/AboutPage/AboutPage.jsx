import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Grid, Card, CardContent, CardActions} from '@mui/material'


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
    <>
    <Grid container spacing={2}>
      {publicusers.map((publicUser) => (
        <Grid item xs={1} md={4} key={publicUser.id}  style={{textAlign: 'center'}}>
<Card>
  <CardContent>
          <h4>{publicUser.username}</h4>
          </CardContent>
          <CardContent>
          <img src={publicUser.profile_picture} alt="profile picture" onClick={() => history.push(`/info/${publicUser.id}`)} />
          </CardContent>
          


          {stories
            .filter((publicStory) => publicStory.user_id === publicUser.id)
            .map((publicStory) => (
              <CardContent key={publicStory.id}>
                          <h5>Click on {publicUser.username}'s story to read more!</h5>
                <h6>{publicStory.title}</h6>
                <p>{publicStory.body.substring(0,80)}...</p>
                </CardContent>
            ))}
            </Card>
        </Grid>
      ))}
    </Grid>

  </>
  )
}

export default AboutPage;
