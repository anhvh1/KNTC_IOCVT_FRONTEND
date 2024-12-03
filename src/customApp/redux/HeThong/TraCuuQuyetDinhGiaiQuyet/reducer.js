import actions from './actions';
const initialData = {
  DanhSachQuyetDinhGQ: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.TRACUUQUYETDINHGQ_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.TRACUUQUYETDINHGQ_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.TRACUUQUYETDINHGQ_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
      };
    case actions.TRACUUQUYETDINHGQ_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.TRACUUQUYETDINHGQ_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQuyetDinhGQ: payload.DanhSachQuyetDinhGQ,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.TRACUUQUYETDINHGQ_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQuyetDinhGQ: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
