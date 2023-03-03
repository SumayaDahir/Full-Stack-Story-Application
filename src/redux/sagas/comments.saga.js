import axios from "axios"; 
import { put, takeLatest } from "redux-saga/effects";

function* fetchComment() { 
    try {
        const response = yield axios.get("/api/comments/");
        const comment = response.data;
        console.log("in fetch comments", comment);
    
    yield put ({ type: "SET_COMMENT", payload: comment});
    } catch (error) { 
        console.log("user get comments failed" , error);
    }
}

function* addComment(action) { 
    try {
        yield axios.post("/api/comments/", action.payload);
        yield put ({
            type: "FETCH_COMMENT",
        });
    } catch (error) {
        console.log("user adding comements failed", error);
    }
}

function* commentSaga() {
    yield takeLatest("FETCH_COMMENT", fetchComment);
    yield takeLatest("ADD_COMMENT", addComment);
}

export default commentSaga;