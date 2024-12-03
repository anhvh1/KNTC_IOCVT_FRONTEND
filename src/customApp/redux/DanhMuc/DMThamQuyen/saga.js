import {all, takeEvery, put, call} from "redux-saga/effects";
import api from '../../../containers/DanhMuc/DMThamQuyen/config';
import actions from './actions'
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachThamQuyen,payload.filterData)
    yield put({
      type : actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachThamQuyen : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST_ERROR
    })
  }
}
export default function* rootSaga() {
  yield all([yield takeEvery(actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST, getList)]);
}
