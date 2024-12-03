import actions from './actions';
const initialData = {
  DanhSachKetQuaTranhChap: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuanChuyenDon: [],
  DanhSachCoQuan: [],
  DanhSachCanBo: [],
  DanhSachLanhDao: [],
  DanhSachBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.KETQUATRANHCHAP_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.KETQUATRANHCHAP_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachCoQuanChuyenDon: payload.DanhSachCoQuanChuyenDon,
      };
    case actions.KETQUATRANHCHAP_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachBieuMau: [],
      };
    case actions.KETQUATRANHCHAP_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.KETQUATRANHCHAP_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachKetQuaTranhChap: payload.DanhSachKetQuaTranhChap,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.KETQUATRANHCHAP_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachKetQuaTranhChap: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
