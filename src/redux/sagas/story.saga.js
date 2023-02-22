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

function* storySaga() {
  yield takeLatest("FETCH_STORY", fetchStory);
  yield takeLatest("ADD_STORY", addStory);
};

export default storySaga;
