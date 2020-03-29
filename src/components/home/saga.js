import { fetchData } from './routines';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
const axios = require('axios');

function* requestWatcherSaga() {
  // run fetchDataFromServer on every trigger action
  yield takeEvery(fetchData.TRIGGER, fetchDataFromServer)
}

function* fetchDataFromServer() {
  try {
    // trigger request action
    yield put(fetchData.request());
    // perform request to '/some_url' to fetch some data
    const response = yield call(axios.get, 'https://dog.ceo/api/breeds/list/all');
    // if request successfully finished
    yield put(fetchData.success(response.data));
  } catch (error) {
    // if request failed
    yield put(fetchData.failure(error.message));
  } finally {
    // trigger fulfill action
    yield put(fetchData.fulfill());
  }
}

export default requestWatcherSaga;
