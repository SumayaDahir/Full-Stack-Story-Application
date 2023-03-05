import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, CardActions, TextField, Button, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material'
import { MdDelete } from "react-icons/md";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import './AddStory.css'

function AddStory() {
  const user = useSelector((store) => store.user);
  const stories = useSelector((store) => store.story);
  const categories = useSelector((store) => store.category);
  //console.log("in categories" , categories)
 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_STORY" });
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  const handleSubmit = () => {
    dispatch({
      type: "ADD_STORY",
      payload: {
        title,
        body,
        category_id: selectedCategoryId,
      },
    });
    setTitle("");
    setBody("");
  };

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_STORY",
      payload: { id },
    });
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setBody(story.body);
    setEditing(true);
  };

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_STORY",
      payload: {
        id: editingStory.id,
        body,
      },
    });
    setEditing(false);
    setEditingStory(null);
    setBody("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Grid  justifyContent="center" sx={{ marginTop: "50px" }}>
      <Grid item xs={12} md={10}>
    <Card  sx={{ borderRadius: "25px" }}>
    <CardContent> 
    <h2>Welcome, {user.username}!</h2>
      <h3> {user.username}'s story page.</h3>
    <TextField label="Title"
 
 type="text"
 name="title"
 value={title}
 required
 onChange={(event) => setTitle(event.target.value)}
 sx={{ marginBottom: "10px" , width: "rem" }}>
</TextField>
</CardContent>
<CardContent>
<TextField label='Story'
            className="story-body"
            type="text"
            name="story"
            value={body}
            required
            multiline
            rows={8}
  
            onChange={(event) => setBody(event.target.value)}
            sx={{ marginBottom: "-20px", width:"50%", height: "-30px"}}>
        
       </TextField>
        </CardContent>
        <br />
        <br />
        <CardActions>
        <label htmlFor="category"  sx={{ marginBottom: "20px" }}></label>
        <div className="select-container">
        <select
        className="category-dropdown"
          name="category"
          onChange={(event) => setSelectedCategoryId(event.target.value)}
          id="category">
          <option  className="category-option" value="">Select #Category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              
              {category.name}
            </option>
          ))}
        </select>
        </div>
        </CardActions>
       
        <CardActions>
        {editing ? (
          <Button 
          sx={{
            borderRadius: 50,
            color: "white"
          }}
          className='card-button' 
          type="button" onClick={handleUpdate}>
            Update Story
          </Button>
        ) : (
          <Button  
          sx={{
            borderRadius: 50,
            color: "white"
          }}
          className='card-button' type="button" onClick={handleSubmit}>
            Share Story
          </Button>
        )} </CardActions>
    <CardContent>
      {stories.map((story) => (
        <div key={story.id}>
          <h6>{story.title}</h6>
          <p>{story.body}</p>
          <Button 
           sx={{
            borderRadius: 50,
            color: "white"
          }}
          className='card-button' onClick={() => handleEdit(story)}>Edit Story</Button>
         <br />
          <br />
          <Button  
           className='delete-button'
          
          sx={{
           borderRadius: 50,
           color: '#B71C1C'
           }}
          onClick={() => { if ( 
            confirm("Are you sure you want to delete the story?")
      ) {
        handleDelete(story.id)}}}>Delete 
          <  MdDelete/>
          </Button>
        
        </div>
      ))}
        <LogOutButton/>
      </CardContent>

   </Card>
   </Grid>
   </Grid>
    </div>
  );
}

export default AddStory;
