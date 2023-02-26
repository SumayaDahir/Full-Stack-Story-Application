const publicUserReducer = (state = [], action) => {
    switch (action.type) {
      case 'SETPUBLIC_USER':
        return action.payload;
      default:
        return state;
    }
  };
 
  export default publicUserReducer;
  