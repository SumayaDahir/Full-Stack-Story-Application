import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchPublicStory() {
  try {
    const response = yield axios.get("/api/publicstory");
    const story = response.data;
    console.log("Get all:", story);

    yield put({ type: "SETPUBLIC_STORY", payload: story });
  } catch (error) {
    console.log("User get story failed", error);
  }
}

function* publicStorySaga() {
    yield takeLatest("FETCHPUBLIC_STORY", fetchPublicStory);
  
  };
  
  export default publicStorySaga;