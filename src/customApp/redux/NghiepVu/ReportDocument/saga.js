import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/CapNhatHoSoTaiLieu/config";
import apiCoQuan from "../../../containers/DanhMuc/DMCoQuan/config";
import { formatDataTreeSelect } from "../../../../helpers/utility";
import actions from "./actions";

function* getInit({ payload }) {
  try {
    const response = yield call(api.GetListForm, payload.filterData);
    const responseTruongPhong = yield call(api.GetDanhSachCanBo, { Type: 1 });
    const responseThanhVien = yield call(api.GetDanhSachCanBo, { Type: 0 });
    yield put({
      type: actions.REPORTDOCUMENT_GET_INIT_REQUEST_SUCCESS,
      payload: {
        ListHinhThuc: response.data.Data,
        ListTruongPhong: responseTruongPhong.data.Data,
        ListThanhVien: responseThanhVien.data.Data,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.REPORTDOCUMENT_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.GetListInspection, payload.filterData);
    yield put({
      type: actions.REPORTDOCUMENT_GET_LIST_REQUEST_SUCCESS,
      payload: {
        ListInspection: response.data.Data,

        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.REPORTDOCUMENT_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.REPORTDOCUMENT_GET_INIT_REQUEST, getInit),
  ]);
  yield all([
    yield takeEvery(actions.REPORTDOCUMENT_GET_LIST_REQUEST, getList),
  ]);
}
