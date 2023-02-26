import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './InfoPage.css'

function InfoPage() {


  const publicusers = useSelector((store) => store.publicUser);
  const stories = useSelector((store) => store.publicStory);

  const [comments, setComments] = useState('')
  
  //console.log("in categories" , categories)
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY"});
    dispatch({type: "FETCHPUBLIC_USER"});
  }, []);

  return (
    <div>
     {publicusers.map((publicUser) => (
               <div key={publicUser.id}>
                  <img src={publicUser.profile_picture} alt="profile picture" onClick={() => history.push("/info")} />
                 
                  </div>
        ))} 
      
      {stories.map((publicStory) => (
        <div key={publicStory.id}>
          <h6>{publicStory.title}</h6>
          <p>{publicStory.body}</p>
          <button>❤️</button> <button>👍🏾</button> <button>🙌🏾</button>
          <br />
          {publicStory.likes} {publicStory.loves} {publicStory.claps}
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
