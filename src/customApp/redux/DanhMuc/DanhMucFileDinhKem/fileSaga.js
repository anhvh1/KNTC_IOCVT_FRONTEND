import {all, takeEvery, put, call} from "redux-saga/effects";
import api from '../../../containers/DanhMuc/DanhMucFileDinhKem/fileConfig';
import actions from './fileActions'
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachFile,payload.filterData)
    yield put({
      type : actions.DANHMUCFILE_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachFile : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCFILE_GET_LIST_REQUEST_ERROR
    })
  }
}

function* getListChucNang({payload}) {
  try {
    const response = yield call(api.DanhSachChucNang,payload.filterData)
    yield put({
      type : actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST_SUCCESS,
      payload : {
        DanhSachChucNangFile : response.data.Data,
        TotalRow : response.data.TotalRow
      }
    })
  }
  catch (e) {
    yield put({
      type : actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST_ERROR
    })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.DANHMUCFILE_GET_LIST_REQUEST, getList)]);
  yield all([yield takeEvery(actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST, getListChucNang)]);
}