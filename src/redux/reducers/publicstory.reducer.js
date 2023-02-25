const publicStoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SETPUBLIC_STORY":
        return action.payload;
      default:
        return state;
    }
  };
  
  
  export default publicStoryReducer;