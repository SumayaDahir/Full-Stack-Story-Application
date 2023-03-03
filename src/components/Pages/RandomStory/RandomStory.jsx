import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Card, CardContent, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";

function RandomStory() {
    const params = useParams();
    const userId = params.userid;
    console.log("in USSERID",userId)

  const publicusers = useSelector((store) => store.publicUser);
  const stories = useSelector((store) => store.publicStory);
console.log("in users", publicusers)
const user = publicusers.find((user) => user.id ===  Number(userId));
console.log("in user random story", user)

//const storyId = params.storyid;
//const userId = params.userid;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY" });
    dispatch({ type: "FETCHPUBLIC_USER" });
    
  }, []);
//   const story = stories.find((story) => Number(userId) === Number(story.user_id));
//   console.log("in story", story)
//   const user = publicusers.find((user) => user.id ===  Number(userId));

  //const [storyOfDay, setStoryOfDay] = useState(null);
  const randomStory = Math.floor(Math.random() * stories.length);
  const newstoryOfDay = stories[randomStory];

//   useEffect(() => {
//     let interval = setInterval(() => {
//         const randomStory = Math.floor(Math.random() * stories.length);
//         const newstoryOfDay = stories[randomStory];
//         console.log("in randomStory", randomStory);
//         console.log("in Story of Day", randomStory);
//         setStoryOfDay(newstoryOfDay);

//     }, 1000 * 60 * 60 * 24);

//     return () => clearInterval(interval)
//   }, [stories])


  return (
    <div className="aboutpage-container">
      <h1 className="aboutpage-title">Explore Stories</h1>
{stories.length > 0 ? (
    <>
        <Grid item xs={1} md={4}  style={{textAlign: 'center'}}>
      <Card className="aboutpage-card">
        <CardContent>
          <h2 className='aboutpage-cardtitle'>Story of the Day</h2>
          <h3>{user?.username}</h3>
          <h4>{newstoryOfDay?.title}</h4>
          <p>{ newstoryOfDay?.body}</p>
        </CardContent>
      </Card>
      </Grid> 
      

      
      </>
      
) : (
    <p>Loading stories...</p>
    
)}

    </div>
    
  );

}

export default RandomStory;
