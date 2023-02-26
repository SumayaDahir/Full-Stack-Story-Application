import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPublicUser() {
  try {
const response = yield axios.get('/api/publicuser', config);
const user = response.data
    yield put({ type: 'SETPUBLIC_USER', payload: user});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* publicUserSaga() {
  yield takeLatest('FETCH_PUBLICUSER', fetchPublicUser);
}

export default publicUserSaga;
