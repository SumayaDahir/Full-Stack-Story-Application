import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, CardActions, TextField, TextArea, Button} from '@mui/material'
import { color } from "@mui/system";
import { MdDelete } from "react-icons/md";

function AddStory() {
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
    <>
    <Grid >
    <Card className="addstoryform-container">
    <CardContent> 
    <TextField label="Title"
 
 type="text"
 name="title"
 value={title}
 required
 onChange={(event) => setTitle(event.target.value)}>
</TextField>
</CardContent>
<CardContent>
<TextField label='Story'
            className="story-body"
            type="text"
            name="story"
            value={body}
            required
            onChange={(event) => setBody(event.target.value)}>
        
       </TextField>
        </CardContent>
        <CardActions>
        <label htmlFor="category">#categories</label>
        <select
          name="category"
          onChange={(event) => setSelectedCategoryId(event.target.value)}
          id="category">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              
              {category.name}
            </option>
          ))}
        </select>
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
          onClick={() => handleDelete(story.id)}>Delete Story  
          <  MdDelete/>
          </Button>
        
        </div>
      ))}
      </CardContent>

   </Card>
   </Grid>
    </>
  );
}

export default AddStory;
