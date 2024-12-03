import actions from './actions';

const initState = {
    role: {view: 0, add: 0, edit: 0, delete: 0},
    DanhSachDiaGioi: [],
    TableLoading: false,
};

export default function Reducer(state = initState, action){
    const {type, payload} = action;
    switch (type) {
        //get initData
        case actions.DIAGIOI_GET_INIT_DATA_REQUEST:
            return {
                ...state,
                TableLoading: true,
                role: payload.role
            };
        case actions.DIAGIOI_GET_INIT_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                DanhSachDiaGioi: payload.DanhSachDiaGioi,
                TableLoading: false
            };
        case actions.DIAGIOI_GET_INIT_DATA_REQUEST_ERROR:
            return {
                ...state,
                DanhSachDiaGioi: [],
                TableLoading: false
            };
        //get list
        case actions.DIAGIOI_GET_LIST_REQUEST:
            return {
                ...state,
                TableLoading: true
            };
        case actions.DIAGIOI_GET_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                DanhSachDiaGioi: payload.DanhSachDiaGioi,
                TableLoading: false
            };
        case actions.DIAGIOI_GET_LIST_REQUEST_ERROR:
            return {
                ...state,
                DanhSachDiaGioi: [],
                TableLoading: false
            };
        default:
            return state;
    }
}