import actions from './actions';
const initialData = {
  DanhSachHoSoDonThu: [],
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
    case actions.HOSODONTHU_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.HOSODONTHU_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.HOSODONTHU_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachCoQuan: [],
      };
    case actions.HOSODONTHU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
        DanhSachHoSoDonThu: [],
      };
    case actions.HOSODONTHU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHoSoDonThu: payload.DanhSachHoSoDonThu,
        DanhSachExcel: payload.DanhSachExcel,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.HOSODONTHU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHoSoDonThu: [],
        DanhSachExcel: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
