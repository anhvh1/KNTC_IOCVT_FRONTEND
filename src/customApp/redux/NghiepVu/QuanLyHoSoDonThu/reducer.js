import actions from './actions';
const initialData = {
  DanhSachHoSoDonThu: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuanChuyenDon: [],
  DanhSachCoQuan: [],
  DanhSachLanhDao: [],
  DanhSachBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYHOSODONTHU_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUANLYHOSODONTHU_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachCoQuanChuyenDon: payload.DanhSachCoQuanChuyenDon,
      };
    case actions.QUANLYHOSODONTHU_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachBieuMau: [],
      };
    case actions.QUANLYHOSODONTHU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QUANLYHOSODONTHU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHoSoDonThu: payload.DanhSachHoSoDonThu,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.QUANLYHOSODONTHU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHoSoDonThu: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
