const storyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STORY':
        return action.payload;
      case 'ADD_STORY':
        return [...state, action.payload];
      case 'UPDATE_STORY':
        const updatedStory = action.payload;
        return state.map(story => {
          if (story.id === updatedStory.id) {
            return updatedStory;
          } else {
            return story;
          }
        });
      default:
        return state;
    }
  };
  
// const addStory = (state = [], action) => {
//     switch (action.payload) {
//         case 'ADD_STORY':
//         return action.payload
//         default: 
//         return state;
//     }
// }

export default storyReducer; 