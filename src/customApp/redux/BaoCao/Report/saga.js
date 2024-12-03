import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/BaoCao/ReportOrigin/config";
import actions from "./action";

function* getThongTinBaoCao({ payload }) {
  try {
    const response = yield call(api.GetAllDanhMucTenFile, payload.filterData);
    const responseLoaiKhieuTo = yield call(api.GetAllDanhMucLoaiKhieuTo, payload.filterData);
    yield put({
      type: actions.REPORT_GET_DATA_INIT_SUCCESS,
      payload: {
        DanhSachTenFile: response.data.Data,
        DanhSachLoaiKhieuTo: responseLoaiKhieuTo.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.REPORT_GET_DATA_INIT_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.REPORT_GET_DATA_INIT, getThongTinBaoCao)]);
}
