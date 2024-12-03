import actions from './actions';
const initialData = {
  DanhSachTiepNhanDon: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachQuocTich: [],
  DanhSachDanToc: [],
  DanhSachTinh: [],
  DanhSachHuyen: [],
  DanhSachXa: [],
  DanhSachChucVu: [],
  DanhSachCap: [],
  DanhSachHinhThucDaGiaiQuyet: [],
  DanhSachCoQuan: [],
  DanhSachCanBoXuLy: [],
  DanhSachCanBoLanhDao: [],
  DanhSachTenFile: [],
  TotalRow: 0,
  tableLoading: true,
  isDone: false,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.TIEPNHANDON_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.TIEPNHANDON_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachQuocTich: payload.DanhSachQuocTich,
        DanhSachDanToc: payload.DanhSachDanToc,
        DanhSachTinh: payload.DanhSachTinh,
        DanhSachHuyen: payload.DanhSachHuyen,
        DanhSachXa: payload.DanhSachXa,
        DanhSachCap: payload.DanhSachCap,
        DanhSachChucVu: payload.DanhSachChucVu,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachHinhThucDaGiaiQuyet: payload.DanhSachHinhThucDaGiaiQuyet,
        DanhSachCanBoLanhDao: payload.DanhSachCanBoLanhDao,
        DanhSachCanBoXuLy: payload.DanhSachCanBoXuLy,
        DanhSachTenFile: payload.DanhSachTenFile,
        tableLoading: false,
        isDone: true,
      };
    case actions.TIEPNHANDON_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
        DanhSachQuocTich: [],
        DanhSachDanToc: [],
        DanhSachTinh: [],
        DanhSachHuyen: [],
        DanhSachXa: [],
        DanhSachChucVu: [],
        DanhSachCap: [],
        DanhSachHinhThucDaGiaiQuyet: [],
        DanhSachCoQuan: [],
        DanhSachCanBoXuLy: [],
        DanhSachCanBoLanhDao: [],
        DanhSachTenFile: [],
        tableLoading: false,
        isDone: true,
      };
    case actions.TIEPNHANDON_GET_LIST_REQUEST:
      return {
        ...state,
      };
    case actions.TIEPNHANDON_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTiepNhanDon: payload.DanhSachTiepNhanDon,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        TotalRow: payload.TotalRow,
      };
    case actions.TIEPNHANDON_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTiepNhanDon: [],
        DanhSachHuongXuLy: [],
        TotalRow: 0,
      };
    default:
      return state;
  }
};

export default reducer;
