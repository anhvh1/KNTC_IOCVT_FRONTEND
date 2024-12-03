import actions from './actions';
const initialData = {
  DanhSachThiHanh: [],
  DanhSachHuongXuLy: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.THIHANH_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.THIHANH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThiHanh: payload.DanhSachThiHanh,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.THIHANH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThiHanh: [],
        DanhSachHuongXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
