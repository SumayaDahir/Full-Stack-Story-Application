import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './InfoPage.css'

function InfoPage() {


  const user = useSelector((store) => store.user);
  const stories = useSelector((store) => store.story);

  const [comments, setComments] = useState('')
  
  //console.log("in categories" , categories)
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_STORY" });
  }, []);

  // const handleSelectImage = () => {
  //   dispatch({
  //     type: "ADD_STORY",
  //     payload: {
  //       title,
  //       body
  //     },
  //   });
  // };



  return (
  
    <div>
      <h3> {user.username}</h3>
      <img src={user.profile_picture} alt="profile picture" />
      
      

      {stories.map((story) => (
        <div key={story.id}>
          <h6>{story.title}</h6>
          <p>{story.body}</p>
          <button>❤️</button> <button>👍🏾</button> <button>🙌🏾</button>
          <br />
          {story.likes} {story.loves} {story.claps}
          <br />

          <div>
            <label htmlFor="comments">
              Comments:
              <input 
              className='comment-textbox'
              type="text" 
              name='comments'
              value={comments}
              placeholder='Show Some Love and Drop a comment!'
              onChange={(event) => setComments(event.target.value)}/>
        
            </label>

          </div>
        </div>
      ))}

    </div>

  );
}

export default InfoPage;
