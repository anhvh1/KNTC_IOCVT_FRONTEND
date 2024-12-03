import actions from './actions';
const initialData = {
  DanhSachQDGiaoXacMinh: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuan: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachCoQuan: payload.DanhSachCoQuan,
      };
    case actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachCoQuan: [],
        DanhSachLoaiKhieuTo: [],
      };
    case actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQDGiaoXacMinh: payload.DanhSachQDGiaoXacMinh,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQDGiaoXacMinh: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
