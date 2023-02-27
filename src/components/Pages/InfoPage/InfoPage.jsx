import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InfoPage.css";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

function InfoPage() {
  const publicusers = useSelector((store) => store.publicUser);
   
  const stories = useSelector((store) => store.publicStory);
  console.log("in public stories useSelector" , stories)
  console.log("in public users useSelector" , publicusers)

 
  
  const [comments, setComments] = useState("");
  const [likes, setLikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [claps, setClaps] = useState(0);

  const dispatch = useDispatch();

  const params = useParams();
  //const storyId = params.storyid;
  const userId = params.userid;


  console.log("in USSERID",userId)

  //console.log("in STORYID",storyId)

 

  const story = stories.find((story) => Number(userId) === Number(story.user_id));
  console.log("in story", story)
  const user = publicusers.find((user) => user.id ===  Number(userId));
  console.log("in user", user)

  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY" });
    dispatch({ type: "FETCHPUBLIC_USER" });
  }, []);

  const handleLike = (id) => {
    const story = stories.find((story) => story.id === id);
    const updatedLikes = story.likes + 1;
    dispatch({
      type: "UPDATE_LIKES",
      payload: { id: id, likes: updatedLikes },
    });
    setLikes(updatedLikes);
  };

  const handleLove = (id) => {
    const story = stories.find((story) => story.id === id);
    const updatedLoves = story.loves + 1;
    dispatch({
      type: "UPDATE_LOVES",
      payload: { id: id, loves: updatedLoves },
    });
    setLoves(updatedLoves);
  };

  const handleClaps = (id) => {
    const story = stories.find((story) => story.id === id);
    const updatedClaps = story.claps + 1;
    dispatch({
      type: "UPDATE_CLAPS",
      payload: { id: id, claps: updatedClaps },
    });
    setClaps(updatedClaps);
  };

 


  return (
    <>
      <Grid container spacing={20} >
        <Grid
          item
          xs={6}
          md={4}
          key={user?.id}
        
          style={{ textAlign: "center" }}
        >
          <h3>{user?.username}</h3>
          <img src={user?.profile_picture} alt="profile picture" />
          
          <>
        <div >
            <h5>{story?.title}</h5>
            <p>{story?.body}</p>
            <button onClick={() => handleLike(story.id)}>❤️</button>
            <button onClick={() => handleLove(story.id)}>👍🏾</button>
            <button onClick={() => handleClaps(story.id)}>🙌🏾</button>
            <br />
            <span className="number">{story?.likes}</span>
            <span className="number">{story?.loves}</span>
            <span className="number">{story?.claps}</span>
            <br />
            <div>
              </div>
              <label htmlFor="comments">
                Comments:
                <input
                  className="comment-textbox"
                  type="text"
                  name="comments"
                  value={comments}
                  placeholder="Show Some Love and Drop a comment!"
                  onChange={(event) => setComments(event.target.value)}
                
                />
                <button>Add Comment</button>
              </label>
            </div>
          </>
        </Grid>
      </Grid>
    </>
  );
  }

export default InfoPage;
