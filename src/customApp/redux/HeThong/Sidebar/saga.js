import {put, takeEvery, call, all} from 'redux-saga/effects';
import actions from './actions';
import api from '../../../../containers/Sidebar/config';
function* getList() {
  try {
    const response = yield call(api.getListChucNang);
    yield put({
      type: actions.SIDEBAR_GET_LIST_SUCCESS,
      payload: {
        ListSideBar: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SIDEBAR_GET_LIST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all[yield takeEvery(actions.SIDEBAR_GET_LIST_REQUEST, getList)];
}
