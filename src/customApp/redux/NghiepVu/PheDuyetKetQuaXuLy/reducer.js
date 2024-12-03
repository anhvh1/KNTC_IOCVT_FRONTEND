import actions from './actions';
const initialData = {
  DanhSachPheDuyetKetQuaXuLy: [],
  DanhSachHuongXuLy: [],
  DanhSachCoQuanChuyenDon: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachLanhDao: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPheDuyetKetQuaXuLy: payload.DanhSachPheDuyetKetQuaXuLy
          ? payload.DanhSachPheDuyetKetQuaXuLy
          : [],
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachPheDuyetKetQuaXuLy: [],
        DanhSachHuongXuLy: [],
        DanhSachLanhDao: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCoQuanChuyenDon: payload.DanhSachCoQuanChuyenDon,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCoQuanChuyenDon: [],
        DanhSachLoaiKhieuTo: [],
      };
    default:
      return state;
  }
};

export default reducer;
