import { all, takeEvery, put, call } from 'redux-saga/effects';
import api from '../../../containers/HeThong/QuanLyThamSoHeThong/config';
import actions from './actions';
function* getList({ payload }) {
    try {
        const response = yield call(api.DanhSachThamSoHeThong, payload.filterData);
        yield put({
            type: actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST_SUCCESS,
            payload: {
                DanhSachThamSoHeThong: response.data.Data,
                TotalRow: response.data.TotalRow,
            },
        });
    } catch (e) {
        yield put({
            type: actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST_ERROR,
        });
    }
}
export default function* rootSaga() {
    yield all([yield takeEvery(actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST, getList)]);
}
