import actions from './actions';
const initialData = {
  DanhSachXuLyDon: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuanChuyenDon: [],
  DanhSachLanhDao: [],
  DanhSachBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.XULYDON_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.XULYDON_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachCoQuanChuyenDon: payload.DanhSachCoQuanChuyenDon,
      };
    case actions.XULYDON_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachBieuMau: [],
      };
    case actions.XULYDON_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.XULYDON_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachXuLyDon: payload.DanhSachXuLyDon,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.XULYDON_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachXuLyDon: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
