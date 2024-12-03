import {all, takeEvery, put, call} from "redux-saga/effects";
import api from '../../../containers/DanhMuc/DanhMucNguonDonDen/config';
import actions from './actions'
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachNguonDonDen,payload.filterData)
    yield put({
      type : actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachNguonDonDen : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST_ERROR
    })
  }
}
export default function* rootSaga() {
  yield all([yield takeEvery(actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST, getList)]);
}