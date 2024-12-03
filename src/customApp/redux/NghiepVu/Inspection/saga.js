import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/LapKeHoachDuKienThanhTra/config";
import apiCoQuan from "../../../containers/DanhMuc/DMCoQuan/config";
import { formatDataTreeSelect } from "../../../../helpers/utility";
import actions from "./actions";

function* getInit({ payload }) {
  try {
    const response = yield call(api.GetListForm, payload.filterData);
    const responseFields = yield call(api.GetListField, payload.filterData);
    const reponseAgenCyTW = payload.filterData?.isTTTrungUong
      ? yield call(apiCoQuan.AllCoQuanTW, payload.filterData)
      : {
          data: {
            Data: [],
          },
        };
    const dataTw = yield formatDataTreeSelect(reponseAgenCyTW.data.Data);

    yield put({
      type: actions.INSPECTION_GET_INIT_REQUEST_SUCCESS,
      payload: {
        ListAgencyTw: dataTw,
        ListHinhThuc: response.data.Data,
        ListFields: responseFields.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.INSPECTION_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const responseInfoKeHoach = yield call(api.GetInfo, payload.filterData);
    const response = payload.filterData?.isTTTrungUong
      ? yield call(api.GetListInspectionTW, payload.filterData)
      : yield call(api.GetListInspection, payload.filterData);

    const responseAll = payload.filterData?.isTTTrungUong
      ? yield call(api.GetListInspectionTW, {
          ...payload.filterData,
          PageSize: 99999,
        })
      : yield call(api.GetListInspection, {
          ...payload.filterData,
          PageSize: 99999,
        });

    yield put({
      type: actions.INSPECTION_GET_LIST_REQUEST_SUCCESS,
      payload: {
        ListInspection: response.data.Data,
        ListInspectionAll: responseAll.data.Data,
        InfoPlan: responseInfoKeHoach.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.INSPECTION_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.INSPECTION_GET_INIT_REQUEST, getInit)]);
  yield all([yield takeEvery(actions.INSPECTION_GET_LIST_REQUEST, getList)]);
}
