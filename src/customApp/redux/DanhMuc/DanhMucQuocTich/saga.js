import {all, takeEvery, put, call} from "redux-saga/effects";
import api from '../../../containers/DanhMuc/DanhMucQuocTich/config';
import actions from './actions'
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachQuocTich,payload.filterData)
    yield put({
      type : actions.DANHMUCQUOCTICH_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachQuocTich : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCQUOCTICH_GET_LIST_REQUEST_ERROR
    })
  }
}
export default function* rootSaga() {
  yield all([yield takeEvery(actions.DANHMUCQUOCTICH_GET_LIST_REQUEST, getList)]);
}