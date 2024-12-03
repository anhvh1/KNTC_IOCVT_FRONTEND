import {call,all,takeEvery,put} from 'redux-saga/effects'
import actions from './actions'
import api from '../../../containers/HeThong/UserManagement/config'
function* getList({payload}){
    try {
        const response = yield call(api.GetListUserManagement,payload.filterData)
        yield put({
            type : actions.USERMANAGERMENT_GET_LIST_REQUEST_SUCCESS,
            payload : {
                TotalRow : response.data.TotalRow,
                ListNguoiDung : response.data.Data
            }   
        })
    } catch (error) {
        yield put({
            type : actions.USERMANAGERMENT_GET_LIST_REQUEST_ERROR
        })
    }   
    
}





export default function* rootSaga(params) {
    yield all([yield takeEvery(actions.USERMANAGERMENT_GET_LIST_REQUEST,getList)])
}