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
  DanhSachCanBoXuLy: [],
  DanhSachTenFile: [],
  DanhSachCoQuan: [],
  DanhSachCap: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachQuocTich: payload.DanhSachQuocTich,
        DanhSachDanToc: payload.DanhSachDanToc,
        DanhSachTinh: payload.DanhSachTinh,
        tableLoading: false,
      };
    case actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
        DanhSachQuocTich: [],
        DanhSachDanToc: [],
        DanhSachTinh: [],
        tableLoading: false,
      };
    case actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST:
      return {
        ...state,
      };
    case actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTiepDan: payload.DanhSachTiepDan,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        TotalRow: payload.TotalRow,
      };
    case actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTiepDan: [],
        DanhSachHuongXuLy: [],
        TotalRow: 0,
      };
    default:
      return state;
  }
};

export default reducer;
