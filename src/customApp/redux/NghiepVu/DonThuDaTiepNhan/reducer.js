import actions from './actions';
const initialData = {
  DanhSachTiepDan: [],
  DanhSachLanhDaoTiep: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachTenFile: [],
  DanhSachTiepDanAll: [],

  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachCanBoLanhDao: payload.DanhSachCanBoLanhDao,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachTenFile: payload.DanhSachTenFile,
        // TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
        DanhSachCoQuan: [],
        DanhSachCanBoXuLy: [],
        DanhSachTenFile: [],
        tableLoading: false,
      };
    case actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
        // DanhSachTiepDan: [],
      };
    case actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTiepDan: payload.DanhSachTiepDan,
        DanhSachTiepDanAll: payload.DanhSachTiepDanAll,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTiepDan: [],
        DanhSachTiepDanAll: [],
        DanhSachHuongXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
