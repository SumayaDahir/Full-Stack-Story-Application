import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import './UserPage.css'
//import storySaga from '../../../redisux/sagas/story.saga';
import categorySaga from '../../../redux/sagas/category.saga';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const stories = useSelector((store) => store.story)
  const categories = useSelector((store) => store.category)
  console.log("in categories" , categories)
  const [title, setTitle ]= useState('')
  const [body, setBody] = useState('')


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_STORY'});
    dispatch({type: 'FETCH_CATEGORY'});
  }, []);
 
  const handleSubmit = () => {
    dispatch({
      type: 'ADD_STORY',
      payload: {
        title,
        body
      }
    });
    // setTitle('')
    // setBody('')
  }


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h3> {user.username}'s story page.</h3>
      <div>
          <label htmlFor="Title">
        Title:
       </label>
       <input 
       type="text" 
       name='title'
       value={title}
       required
       onChange={(event)=> setTitle(event.target.value)}/>

       <br />
       <br />

       <label htmlFor="story">
        Story:
        <input 
        className='story-body'
        type="text" 
        name='story'
        value={body}
        required
        onChange={(event)=> setBody(event.target.value)}/>
       </label>

      
       <br />
       <label htmlFor="category">#categories</label>
       <select name="category" onChange={(event) => (event.target.value)} id="category">
       <option value="">Select Category</option>
       {categories.map((category) => (
        <option key={category.id}> {category.name} </option>
       ))}
       </select>
      
       <button type='button' onClick={handleSubmit}>Add Story</button> 
       <button>Delete Story</button>
        
          </div>
       <br />
       <br />
       <br />
      {stories.map((story) => (
        <div key={story.id}>
          <img src={story.profile_picture} alt="profile picture" />
          <h6>{story.title}</h6>
          <p>{story.body}</p>
          <button>❤️</button>   <button>👍🏾</button>     <button>🙌🏾</button>
          <br />
          {story.likes} {story.loves} {story.claps}
          <br />
          <br />
       

        </div>
      ))}

      <br />
      <br />
      <br />

      <LogOutButton className="btn" />
    </div>
  );
      }
  

// this allows us to use <App /> in index.js
export default UserPage;
