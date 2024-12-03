import actions from './actions';
const initialData = {
  DanhSachGiaoXacMinh: [],
  DanhSachHuongXuLy: [],
  DanhSachCoQuan: [],
  DanhSachTruongPhong: [],
  DanhSachCanBoGQ: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCanBo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.GIAOXACMINH_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.GIAOXACMINH_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        // DanhSachGiaoXacMinh: payload.DanhSachGiaoXacMinh,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachTruongPhong: payload.DanhSachTruongPhong,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachCanBoGQ: payload.DanhSachCanBoGQ,
        DanhSachCanBo: payload.DanhSachCanBo,
        // TotalRow: payload.TotalRow,
      };
    case actions.GIAOXACMINH_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCoQuan: [],
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        TotalRow: 0,
      };
    case actions.GIAOXACMINH_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GIAOXACMINH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachGiaoXacMinh: payload.DanhSachGiaoXacMinh,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GIAOXACMINH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachGiaoXacMinh: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
