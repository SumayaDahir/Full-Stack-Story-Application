import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, Card, CardContent, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";
import "./RandomStory.css";

function RandomStory() {
  const params = useParams();
  const userId = params.userid;
  console.log("in USSERID", userId);

  const publicusers = useSelector((store) => store.publicUser);
  const stories = useSelector((store) => store.publicStory);
  console.log("in users", publicusers);
  const user = publicusers.find((user) => user.id === Number(userId));
  console.log("in user random story", user);

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
    <div className="randomstory-container">
      <h1 className="randomstory-title">
        Experience the diversity through Human Stories
      </h1>
      {stories.length > 0 ? (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} style={{ textAlign: "center" }}>
              <Card className="randomstory-card" sx={{ borderRadius: "25px" }}>
                <CardContent>
                  <h2 className="randomstory-cardtitle">Story of the Day</h2>
                  <h3 className="randomstory-carduser">{user?.username}</h3>
                  <h4 className="randomstory-storytitle">
                    {newstoryOfDay?.title}
                  </h4>
                  <p className="randomstory-storybody">
                    {" "}
                    {newstoryOfDay?.body}
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <p>Loading stories...</p>
      )}
    </div>
  );
}

export default RandomStory;
