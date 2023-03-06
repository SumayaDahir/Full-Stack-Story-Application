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
    <div style={{ display: "flex", justifyContent: "center" , flexDirection: "column"}}>
        <div className="addstory-header"></div>
    <Grid  container spacing={3} justifyContent="center" sx={{ marginTop: "40px", marginBottom:"-10px" }}>
      <Grid item xs={12} md={13}>
    <Card  sx={{ borderRadius: "25px", width:"400px",  marginLeft:"175px" }}>
    <CardContent> 
    <TextField 
 label="Title"
 type="text"
 name="title"
 value={title}
 required
 onChange={(event) => setTitle(event.target.value)}
 sx={{ marginBottom: "10px", width: "50%" }}/>

<TextField 
            label='Story'
            className="story-body"
            type="text"
            name="story"
            value={body}
            required
            multiline
            rows={8}
            onChange={(event) => setBody(event.target.value)}
            sx={{ marginBottom: "40px", width:"100%"}}/>
        <div className="select-container">
        <select
        className="category-dropdown"
          name="category"
          onChange={(event) => setSelectedCategoryId(event.target.value)}
          id="category"
          value={selectedCategoryId}>
          <option  className="category-option" value="">Select #Category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        </div>
        </CardContent>
       
        <CardActions>
        {editing ? (
          <Button 
          className='card-button' 
          type="button"
          onClick={handleUpdate}
          sx={{
            borderRadius: 50,
            color: "#fff",
            fontWeight:"bold",
            backgroundColor: "#3E2723",
            color:"#fff",
            '&:hover': {
              backgroundColor: "#3E2723"
            }
          }}
          >
            Update Story
          </Button>
        ) : (
          <Button  
          className='card-button' 
          type="button" 
          onClick={handleSubmit}
          sx={{
            borderRadius: 50,
            color: "#fff",
            fontWeight:"bold",
            backgroundColor: "#D7CCC8",
            color:"#fff",
            '&:hover': {
              backgroundColor: "#3E2723"
            }
          }}
         >
            Share Story
          </Button>
        )} 
        </CardActions>

    <CardContent>
      <Grid>
      {stories.map((story) => (
        <div key={story.id}>
          <h3>{story.title}</h3>
          <p>{story.body}</p>
          <div className="story-actions">
          <Button 
          className='edit-button'
          onClick={() => handleEdit(story)}
           sx={{
            borderRadius: 50,
            backgroundColor: "#3E2723",
            color: "#fff",
            '&:hover': {
              backgroundColor: "#D7CCC8"
            },
            marginRight: "20px",
            marginLeft: "70px"
          }}
          >
          Edit Story
          </Button>
         
          <Button  
           className='delete-button'
          sx={{
           borderRadius: 50,
           color: '#B71C1C',
           '&:hover': {
            backgroundColor: "#E57373"
          },
           }}
          onClick={() => { if ( 
            confirm("Are you sure you want to delete this story?")
      ) {
        handleDelete(story.id)}}}>
          Delete 
          <  MdDelete/>
          </Button>
        </div>
        </div>
      ))}

        </Grid>
      </CardContent>
   </Card>
   </Grid>
   </Grid>
    </div>
  );
}

export default AddStory;
