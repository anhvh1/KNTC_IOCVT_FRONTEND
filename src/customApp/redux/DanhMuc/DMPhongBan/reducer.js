import actions from './actions';
const initialData = {
    DanhSachPhongBan: [],
    TotalRow: 0,
    tableLoading: true,
};

const reducer = (state = initialData, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.DANHMUCPHONGBAN_GET_LIST_REQUEST:
            return {
                ...state,
                tableLoading: true,
            };
        case actions.DANHMUCPHONGBAN_GET_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                DanhSachPhongBan: payload.DanhSachPhongBan,
                TotalRow: payload.TotalRow,
                tableLoading: true,
            };
        case actions.DANHMUCPHONGBAN_GET_LIST_REQUEST_ERROR:
            return {
                ...state,
                DanhSachPhongBan: [],
                TotalRow: 0,
                tableLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
