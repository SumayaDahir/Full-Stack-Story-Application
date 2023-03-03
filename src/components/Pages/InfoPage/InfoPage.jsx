import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InfoPage.css";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, CardActions,  TextField, Button } from "@mui/material";


function InfoPage() {
  const publicusers = useSelector((store) => store.publicUser);
  const comment = useSelector((store) => store.comments);
  const stories = useSelector((store) => store.publicStory);

  //console.log("in public stories useSelector" , stories)
  //console.log("in public users useSelector" , publicusers)
  console.log("in comments useSelector", comment)

 
  
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
    dispatch({ type: "FETCH_COMMENT" });
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

  const handleComment = () => {
    dispatch({
      type:"ADD_COMMENT",
      payload: { 
        comments,
      },
    });
    setComments("");
  };

  

  return (
    <>
      <Grid container spacing={20} justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sm={8}
          key={user?.id}
        
          style={{ textAlign: "center" }}
        >

          <Card>
            <CardContent>
          <h3>{user?.username}</h3>
          <img src={user?.profile_picture} alt="profile picture" />
      
            <h5>{story?.title}</h5>
            <p>{story?.body}</p>
            </CardContent>
            <CardActions>
            <Button className="numberbutton" onClick={() => handleLike(story.id)}>❤️</Button>
            <Button  classname="numberbutton" onClick={() => handleLove(story.id)}>👍🏾</Button>
            <Button onClick={() => handleClaps(story.id)}>🙌🏾</Button>
            </CardActions>
            <CardContent>
            <span className="number">{story?.likes}</span>
            <span className="number">{story?.loves}</span>
            <span className="number">{story?.claps}</span>
            </CardContent>
            <CardContent>

             <TextField 
             label="Comments"
             margin="normal"
                 className="comment-textbox"
                  type="text"
                  name="comments"
                  value={comments}
                  placeholder="Show Some Love & Drop a comment!"
                  onChange={(event) => setComments(event.target.value)}
                  />
                  
              </CardContent>
              {comment.map((comments) => 
              <div> 
                <h5>{comments.body}</h5>
              </div>)}
              <CardActions>
              <Button onClick={{handleComment}}>Post Comment</Button>
              </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

export default InfoPage;
