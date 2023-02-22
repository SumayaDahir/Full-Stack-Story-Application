const storyReducer = (state = [], action) => {
switch (action.type) {
    case 'SET_STORY':
    return action.payload

default: 
return state;
}
}

export default storyReducer; 