import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    <div className="form-container">
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />

        <br />
        <br />

        <label htmlFor="story">
          Story:
          <input
            className="story-body"
            type="text"
            name="story"
            value={body}
            required
            onChange={(event) => setBody(event.target.value)}
          />
        </label>

        <br />
        <label htmlFor="category">#categories</label>
        <select
          name="category"
          onChange={(event) => setSelectedCategoryId(event.target.value)}
          id="category">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {" "}
              {category.name}{" "}
            </option>
          ))}
        </select>

        {editing ? (
          <button type="button" onClick={handleUpdate}>
            Update Story
          </button>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Share Story
          </button>
        )}
      </div>
      <br />
      <br />
      <br />
      {stories.map((story) => (
        <div key={story.id}>
         
          <h6>{story.title}</h6>
          <p>{story.body}</p>
          <button onClick={() => handleEdit(story)}>Edit Story</button>
         <br />
          <br />
          <button onClick={() => handleDelete(story.id)}>Delete Story</button>
        </div>
      ))}

      <br />
      <br />
      <br />
    </div>
  );
}

export default AddStory;
