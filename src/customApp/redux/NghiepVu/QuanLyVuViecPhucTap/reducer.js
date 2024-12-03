import actions from './actions';
const initialData = {
  DanhSachVuViec: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuan: [],
  DanhSachExcel: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachCoQuan: [],
      };
    case actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
        DanhSachVuViec: [],
      };
    case actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachVuViec: payload.DanhSachVuViec,
        DanhSachExcel: payload.DanhSachExcel,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachVuViec: [],
        DanhSachExcel: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
