import actions from './actions';

const initState = {
    role: {view: 0, add: 0, edit: 0, delete: 0},
    DanhSachCoQuan: [],
    DanhSachDiaGioi: [],
    expandedKeys: [],
    TableLoading: false,
    data: []
};

export default function Reducer(state = initState, action){
    const {type, payload} = action;
    switch (type) {
        //get initData
        case actions.COQUAN_GET_INIT_DATA_REQUEST:
            return {
                ...state,
                role: payload.role,
                TableLoading: true
            };
        case actions.COQUAN_GET_INIT_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                DanhSachCoQuan: payload.DanhSachCoQuan,
                DanhSachDiaGioi: payload.DanhSachDiaGioi,
                expandedKeys: payload.expandedKeys,
                TableLoading: false
            };
        case actions.COQUAN_GET_INIT_DATA_REQUEST_ERROR:
            return {
                ...state,
                DanhSachCoQuan: [],
                expandedKeys: [],
                TableLoading: false
            };
        //get list
        case actions.COQUAN_GET_LIST_REQUEST:
            return {
                ...state,
                TableLoading: true
            };
        case actions.COQUAN_GET_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                DanhSachCoQuan: payload.DanhSachCoQuan,
                expandedKeys: payload.expandedKeys,
                TableLoading: false
            };
        case actions.COQUAN_GET_LIST_REQUEST_ERROR:
            return {
                ...state,
                DanhSachCoQuan: [],
                expandedKeys: [],
                TableLoading: false
            };
        default:
            return state;
    }
}