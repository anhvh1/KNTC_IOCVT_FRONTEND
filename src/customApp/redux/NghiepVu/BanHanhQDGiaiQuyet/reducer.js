import actions from './actions';
const initialData = {
  DanhSachQDThiHanh: [],
  DanhSachHuongXuLy: [],
  DanhSachCoQuan: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QDTHIHANH_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QDTHIHANH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQDThiHanh: payload.DanhSachQDThiHanh,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.QDTHIHANH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQDThiHanh: [],
        DanhSachHuongXuLy: [],
        DanhSachCoQuan: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
