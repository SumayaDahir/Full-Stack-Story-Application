import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchStory() {
  try {
    const response = yield axios.get("/api/story");
    const story = response.data;
    console.log("Get all:", story);

    yield put({ type: "SET_STORY", payload: story });
  } catch (error) {
    console.log("User get story failed", error);
  }
}

function* addStory(action) {
  try {
    yield axios.post("/api/story", action.payload);
    yield put({
      type: "FETCH_STORY",
    });
  } catch (error) {
    console.log("User adding story failed", error);
  }
}

function* deleteStory(action) {
  try { 
    yield axios.delete(`/api/story/${action.payload.id}`);
    console.log("in action", action)
    yield put ({
      type: "FETCH_STORY",
    });
  } catch (error) {
      console.log("User adding story failed", error);
  }
}

function* updateStory(action) {
  try{
   
    yield axios.put(`api/story/${action.payload.id}`, {body:action.payload.body});
    console.log("this is id" , action.payload.id)

    yield put({
      type:"FETCH_STORY",
    })
  } catch(error) {
    console.log("Error updating story", error)
  }
}

function* storySaga() {
  yield takeLatest("FETCH_STORY", fetchStory);
  yield takeLatest("ADD_STORY",   addStory);
  yield takeLatest("DELETE_STORY", deleteStory);
  yield takeLatest("UPDATE_STORY", updateStory)

};

export default storySaga;
