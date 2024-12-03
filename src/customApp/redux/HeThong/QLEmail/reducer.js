import actions from './actions';
const initialData = {
  DanhSachEmail: [],
  DanhSachLoaiEmail: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYEMAIL_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QUANLYEMAIL_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachEmail: payload.DanhSachEmail,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.QUANLYEMAIL_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachEmail: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.QUANLYEMAIL_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUANLYEMAIL_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiEmail: payload.DanhSachLoaiEmail,
      };
    case actions.QUANLYEMAIL_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiEmail: [],
      };
    default:
      return state;
  }
};

export default reducer;
