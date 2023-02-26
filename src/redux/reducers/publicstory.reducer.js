const publicStoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SETPUBLIC_STORY":
        return action.payload;
        case "UPDATE_PUBLIC_STORY_LIKES":
      return state.map(story => {
        if (story.id === action.payload.id) {
          return {
            ...story,
            likes: action.payload.likes
          }
        } else {
          return story;
        }
      });
        
      default:
        return state;
    }
  };
  
  
  export default publicStoryReducer;