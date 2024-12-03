import {all, takeEvery, put, call} from "redux-saga/effects";
import api from '../../../containers/DanhMuc/DanhMucFileDinhKem/nhomFileConfig';
import actions from './nhomFileActions'
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachNhomFile,payload.filterData)
    yield put({
      type : actions.DANHMUCNHOMFILE_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachNhomFile : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCNHOMFILE_GET_LIST_REQUEST_ERROR
    })
  }
}
export default function* rootSaga() {
  yield all([yield takeEvery(actions.DANHMUCNHOMFILE_GET_LIST_REQUEST, getList)]);
}