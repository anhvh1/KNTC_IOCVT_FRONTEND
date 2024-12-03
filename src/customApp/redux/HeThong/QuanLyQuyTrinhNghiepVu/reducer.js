import actions from './actions';
const initialData = {
  DanhSachEmail: [],
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
    default:
      return state;
  }
};

export default reducer;
