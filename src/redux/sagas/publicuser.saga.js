import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPublicUser() {
  try {
const response = yield axios.get('/api/publicuser');
const user = response.data
    yield put({ type: 'SETPUBLIC_USER', payload: user});
  } catch (error) {
    console.log('User get  failed', error);
  }
}

function* publicUserSaga() {
  yield takeLatest('FETCHPUBLIC_USER', fetchPublicUser);
}

export default publicUserSaga;
