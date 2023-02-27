import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchPublicStory(action) {
  try {
    const response = yield axios.get(`/api/publicstory/`);
    const story = response.data;
    console.log("Get all:", story);

    yield put({ type: "SETPUBLIC_STORY", payload: story });
  } catch (error) {
    console.log("User get story failed", error);
  }
}


function* updatePublicStoryLikes(action) {
  try {
    
    yield axios.put(`/api/publicstory/${action.payload.id}`, {likes:action.payload.likes});

    yield put({
      type: "FETCHPUBLIC_STORY", 
    })
  } catch (error) { 
    console.log("User update public story likes failed", error);


  }
}

function* updatePublicStoryLoves(action) {
  try {
    yield axios.put(`/api/publicstory/${action.payload.id}/loves`, {
      loves: action.payload.loves,
    });
    yield put({
      type: "FETCHPUBLIC_STORY",
    });
  } catch (error) {
    console.log("User update public story loves failed",error)
  }
}


function* updatePublicStoryClaps(action) {
  try{
    
    yield axios.put(`/api/publicstory/${action.payload.id}/claps`, {
      claps: action.payload.claps,
    });
    yield put({
      type: "FETCHPUBLIC_STORY",
    });
  } catch (error) {
    console.log("User update public story claps failed",error)
  }
    
}



function* publicStorySaga() {
    yield takeLatest("FETCHPUBLIC_STORY", fetchPublicStory);
    yield takeLatest("UPDATE_LIKES", updatePublicStoryLikes);
    yield takeLatest("UPDATE_LOVES", updatePublicStoryLoves);
    yield takeLatest("UPDATE_CLAPS", updatePublicStoryClaps);
  };
  
  export default publicStorySaga;