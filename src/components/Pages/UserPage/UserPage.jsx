import React from 'react';
import { useEffect } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import storySaga from '../../../redux/sagas/story.saga';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const stories = useSelector((store) => store.story)
  console.log(stories)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_STORY'});
  }, []);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h3>This is Maya's Page</h3>
 
      {stories.map((story) => (
        <div key={story.id}>
          <h6>{story.title}</h6>
          <p>{story.body}</p>
        </div>
      ))}
      <LogOutButton className="btn" />
    </div>
  );
      }
  

// this allows us to use <App /> in index.js
export default UserPage;
