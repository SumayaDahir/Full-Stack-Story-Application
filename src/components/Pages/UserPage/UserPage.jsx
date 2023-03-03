import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import './UserPage.css'
import AddStory from '../AddStory/AddStory'
import { Card, CardContent, Grid} from '@mui/material';
//import storySaga from '../../../redisux/sagas/story.saga';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
 
  return (
    <>
    <Grid container justifyContent={"center"} sx={{marginTop: "50px"}}>
    <Grid item xs={12} md={6}>
    <Card sx={{borderRadius: "25px"}}>
      <CardContent>
  
      </CardContent>
      <CardContent>
      <img src={user.profile_picture} alt="profile picture" />

      <AddStory/>
      <LogOutButton className="btn" />
      </CardContent>
   
    </Card>
    </Grid>
    </Grid>
  </>
  );
      }
  

// this allows us to use <App /> in index.js
export default UserPage;
