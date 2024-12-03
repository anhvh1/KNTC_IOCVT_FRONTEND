import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/DanhMuc/DanhMucDanToc/config";
import actions from "./action";

function* getDataDantoc({ payload }) {
  try {
    const response = yield call(api.DanhSachDanToc, payload.filterData);
    yield put({
      type: actions.GET_DATA_DANTOC_SUCCESS,
      payload: {
        DanhSachDanToc: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_DANTOC_ERROR,
    });
  }
}

export default function* dantocAll() {
  yield all([yield takeEvery(actions.GET_DATA_DANTOC, getDataDantoc)]);
}
