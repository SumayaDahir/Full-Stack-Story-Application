import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchCategory() {
    try {
      const response = yield axios.get("/api/category");
      const category = response.data;
      console.log("Get all:", category);
  
      yield put({ type: "SET_CATEGORY", payload: category });
    } catch (error) {
      console.log("User get category failed", error);
    }
  }

  function* categorySaga() {
    yield takeLatest("FETCH_CATEGORY", fetchCategory);

  };
  
  export default categorySaga;