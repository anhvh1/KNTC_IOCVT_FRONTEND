import actions from './actions';
const initialData = {
  DanhSachTiepDan: [],
  DanhSachLanhDaoTiep: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachQuocTich: [],
  DanhSachDanToc: [],
  DanhSachTinh: [],
  DanhSachHuyen: [],
  DanhSachXa: [],
  DanhSachChucVu: [],
  DanhSachHinhThucDaGiaiQuyet: [],
  DanhSachCanBoLanhDao: [],
  DanhSachCanBoXuLy: [],
  DanhSachTenFile: [],
  DanhSachTiepDanAll: [],
  DanhSachCoQuan: [],
  DanhSachCap: [],
  DanhSachBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.SOTIEPDAN_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.SOTIEPDAN_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,

        DanhSachCap: payload.DanhSachCap,
        DanhSachChucVu: payload.DanhSachChucVu,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachHinhThucDaGiaiQuyet: payload.DanhSachHinhThucDaGiaiQuyet,
        DanhSachCanBoXuLy: payload.DanhSachCanBoXuLy,
        // DanhSachTiepDanAll: payload.DanhSachTiepDanAll,
        DanhSachCanBoLanhDao: payload.DanhSachCanBoLanhDao,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachBieuMau: payload.DanhSachBieuMau,
        DanhSachTenFile: payload.DanhSachTenFile,
        // TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.SOTIEPDAN_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],

        DanhSachChucVu: [],
        DanhSachCap: [],
        DanhSachHinhThucDaGiaiQuyet: [],
        DanhSachCanBoLanhDao: [],
        DanhSachBieuMau: [],
        // DanhSachTiepDanAll: [],
        DanhSachCoQuan: [],
        DanhSachCanBoXuLy: [],
        DanhSachTenFile: [],
        tableLoading: false,
      };
    case actions.SOTIEPDAN_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
        // DanhSachTiepDan: [],
      };
    case actions.SOTIEPDAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTiepDan: payload.DanhSachTiepDan,
        DanhSachTiepDanAll: payload.DanhSachTiepDanAll,

        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.SOTIEPDAN_GET_LIST_REQUEST_ERROR:
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
