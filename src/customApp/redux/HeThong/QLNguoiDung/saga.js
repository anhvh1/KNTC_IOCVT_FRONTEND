import { call, all, takeEvery, put } from "redux-saga/effects";
import actions from "./actions";
import api from "../../../containers/HeThong/UserManagement/config";
import apiCoQuan from "../../../containers/DanhMuc/DMCoQuan/config";
import {
  formatDataTreeSelect,
  formatTreeDataCoQuan,
} from "../../../../helpers/utility";
function* getList({ payload }) {
  try {
    const response = yield call(api.GetListUserManagement, payload.filterData);
    yield put({
      type: actions.USERMANAGERMENT_GET_LIST_REQUEST_SUCCESS,
      payload: {
        TotalRow: response.data.TotalRow,
        ListNguoiDung: response.data.Data,
      },
    });
  } catch (error) {
    yield put({
      type: actions.USERMANAGERMENT_GET_LIST_REQUEST_ERROR,
    });
  }
}
function* getInit({ payload }) {
  try {
    const response = yield call(apiCoQuan.danhSachCoQuan, payload.filterData);
    const response2 = yield call(api.GetAllChucVu, payload.filterData);

    const data = formatDataTreeSelect(response.data.Data);

    yield put({
      type: actions.USERMANAGERMENT_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: data || [],
        DanhSachChucVu: response2.data.Data,
      },
    });
  } catch (error) {
    console.log(error, "Error");
    yield put({
      type: actions.USERMANAGERMENT_GET_INIT_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga(params) {
  yield all([
    yield takeEvery(actions.USERMANAGERMENT_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.USERMANAGERMENT_GET_INIT_REQUEST, getInit),
  ]);
}
