import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InfoPage.css";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@mui/material";

function InfoPage() {
  const publicusers = useSelector((store) => store.publicUser);
  const comment = useSelector((store) => store.comments);
  const stories = useSelector((store) => store.publicStory);

  //console.log("in public stories useSelector" , stories)
  //console.log("in public users useSelector" , publicusers)
  console.log("in comments useSelector", comment);

  const [commentsText, setCommentsText] = useState("");
  const [likes, setLikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [claps, setClaps] = useState(0);

  const dispatch = useDispatch();

  const params = useParams();
  //const storyId = params.storyid;
  const userId = params.userid;

  console.log("in USSERID", userId);

  //console.log("in STORYID",storyId)

  const story = stories.find(
    (story) => Number(userId) === Number(story.user_id)
  );
  console.log("in story", story);
  const user = publicusers.find((user) => user.id === Number(userId));
  console.log("in user", user);
  const usercomments = comment.find(
    (usercomments) => Number(userId) === usercomments.user_id
  );

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
      type: "ADDSTORY_COMMENT",
      payload: {
        user_id: user.id,
        story_id: story.id,
        body: commentsText,
      },
    });
    setCommentsText("");
  };

  return (
    <>
      <Grid container spacing={20} justifyContent="center" alignItems="center">
        <Grid
          item
          sx={{  marginBottom:"-50px" }}
          xs={12}
          md={6}
          sm={8}
          key={user?.id}
          style={{ textAlign: "center" }}>
          <Card sx={{marginTop:"50px", borderRadius:"25px"}}>
            <CardContent>
              <h3>{user?.username}</h3>
              <img src={user?.profile_picture} alt="profile picture" />

              <h5>{story?.title}</h5>
              <p>{story?.body}</p>
            </CardContent>
            <CardActions sx={{marginLeft: "170px"}}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  className="numberbutton"
                  onClick={() => handleLike(story.id)}>
                  ⬆️
                </Button>
                <span className="number">{story?.likes}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  className="numberbutton"
                  onClick={() => handleLove(story.id)}>
                  ❤️
                </Button>
                <span className="number">{story?.loves}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => handleClaps(story.id)}>🙌🏾</Button>
                <span className="number">{story?.claps}</span>
              </div>
            </CardActions>
              <TextField
              sx={{marginBottom:"50px"}}
                label="Comments"
                margin="normal"
                className="comment-textbox"
                type="text"
                name="comments"
                value={commentsText}
                multiline
            rows={5}
                placeholder="Show Some Love & Drop a comment!"
                onChange={(event) => setCommentsText(event.target.value)}
              />
           <Card>
            <CardContent>
            {comment
              .filter((comment) => comment.story_id === story.id)
              .map((comment) => (
                <div key={comment.id}
                style={{ display: "flex", 
                alignItems: "center"
              }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
      
                    <div>
                      <h5>{comment?.username}</h5>
                    <img src={comment?.profile_picture}  style={{ width: "40px", height: "40px" }}/>
                  </div>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                  
                  <p>{comment.body}</p>
                </div>
                </div>
              ))}
            <CardActions >
              <Button sx={{ 
                borderRadius:"25px",
                backgroundColor: "#3E2723",
                marginTop: "20px",
            color:"#fff",
            '&:hover': {
              backgroundColor: "#D7CCC8"
            }}} onClick={handleComment}>Post</Button>
            
            </CardActions>
            
            </CardContent>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default InfoPage;
