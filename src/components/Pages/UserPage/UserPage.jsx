import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import AddStory from '../AddStory/AddStory';
import './UserPage.css'
//import storySaga from '../../../redisux/sagas/story.saga';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h3> {user.username}'s story page.</h3>
   
<AddStory/>
      <LogOutButton className="btn" />
    </div>
  );
      }
  

// this allows us to use <App /> in index.js
export default UserPage;
