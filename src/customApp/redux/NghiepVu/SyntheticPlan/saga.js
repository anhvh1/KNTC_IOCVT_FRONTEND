import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/TongHopRaSoatChongCheo/config";
import actions from "./actions";
import apiKeHoachTHanhTra from "../../../containers/NghiepVu/LapKeHoachDuKienThanhTra/config";
function* getInit({ payload }) {
  try {
    const response = yield call(api.GetListForm, payload.filterData);
    const responseFields = yield call(api.GetListField, payload.filterData);
    yield put({
      type: actions.SYNCTHETIC_GET_INIT_REQUEST_SUCCESS,
      payload: {
        ListHinhThuc: response.data.Data,
        ListFields: responseFields.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SYNCTHETIC_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.GetListSyntheticPlan, payload.filterData);
    const responseAll = yield call(api.GetListSyntheticPlan, {
      ...payload.filterData,
      PageSize: 99999,
    });
    const responseInfo = yield call(api.GetInfo, payload.filterData);
    yield put({
      type: actions.SYNCTHETIC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        ListSyntheticPlan: response.data.Data,
        ListSyntheticPlanAll: responseAll.data.Data,
        InfoSyntheticPlan: responseInfo.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SYNCTHETIC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.SYNCTHETIC_GET_INIT_REQUEST, getInit)]);
  yield all([yield takeEvery(actions.SYNCTHETIC_GET_LIST_REQUEST, getList)]);
}
