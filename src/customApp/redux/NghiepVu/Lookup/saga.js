import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/TraCuu/config";
import apiCoQuan from "../../../containers/DanhMuc/DMCoQuan/config";
import { formatDataTreeSelect } from "../../../../helpers/utility";
import actions from "./actions";

function* getInit({ payload }) {
  try {
    const response = yield call(api.GetListForm, payload.filterData);
    const reponseAgenCyTW = yield call(
      apiCoQuan.ListCoQuanThanhtra,
      payload.filterData
    );
    const responseFields = yield call(api.GetListField, payload.filterData);
    yield put({
      type: actions.LOOKUP_GET_INIT_REQUEST_SUCCESS,
      payload: {
        ListAgencyTw: reponseAgenCyTW.data.Data,
        ListHinhThuc: response.data.Data,
        ListFields: responseFields.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.LOOKUP_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.GetListLookup, payload.filterData);

    const responseAll = yield call(api.GetListLookup, {
      ...payload.filterData,
      PageSize: 99999,
    });

    yield put({
      type: actions.LOOKUP_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DataLookup: response.data.Data,
        DataLookupAll: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.LOOKUP_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.LOOKUP_GET_INIT_REQUEST, getInit)]);
  yield all([yield takeEvery(actions.LOOKUP_GET_LIST_REQUEST, getList)]);
}
