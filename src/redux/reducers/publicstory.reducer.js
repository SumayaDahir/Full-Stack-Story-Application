const publicStoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SETPUBLIC_STORY":
        return action.payload;
        case "UPDATE_PUBLIC_STORY_LIKES":
          const updatedLikes = action.payload;

      return state.map((story) => {
        if (story.id === updatedLikes.id) {
          return updatedLikes;
        } else {
          return story;
        }
      })
      case "UPDATE_PUBLIC_STORY_LOVES":
        const { id: storyId, loves } = action.payload;
        return state.map((story) => {
          if (story.id === storyId) {
            return { ...story, loves };
          } else {
            return story;
          }
        });
        
      default:
        return state;
    }
  };
  
  
  export default publicStoryReducer;