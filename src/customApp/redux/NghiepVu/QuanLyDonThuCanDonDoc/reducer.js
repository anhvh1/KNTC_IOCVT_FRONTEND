import actions from './actions';
const initialData = {
  DanhSachDonThuCanDonDoc: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuanChuyenDon: [],
  DanhSachExcel: [],
  DanhSachCoQuan: [],
  DanhSachLanhDao: [],
  DanhSachBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachCoQuanChuyenDon: payload.DanhSachCoQuanChuyenDon,
      };
    case actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachBieuMau: [],
      };
    case actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDonThuCanDonDoc: payload.DanhSachDonThuCanDonDoc,
        DanhSachExcel: payload.DanhSachExcel,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDonThuCanDonDoc: [],
        DanhSachExcel: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
