import actions from './action';

const initState = {
  DuLieuChart: {},
  DanhSachCanhBao: [],
  DanhSachPhanLoaiVuViec: [],
  SoLieuCanhBao: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  loadingChart: false,
  loadingCanhBao: false,
};

const reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DASHBOARD_GET_LIST:
      return {
        ...state,
        loadingChart: true,
      };
    case actions.DASHBOARD_GET_LIST_SUCCESS:
      return {
        ...state,
        DuLieuChart: payload.DuLieuChart,
        DanhSachCanhBao: payload.DanhSachCanhBao,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        TotalRow: payload.TotalRow,
        loadingChart: false,
      };
    case actions.DASHBOARD_GET_LIST_ERROR:
      return {
        ...state,
        DuLieuChart: {},
        DanhSachCanhBao: [],
        TotalRow: 0,
        loadingChart: false,
      };
    case actions.DASHBOARD_GET_INIT:
      return {
        ...state,
      };
    case actions.DASHBOARD_GET_INIT_SUCCESS:
      return {
        ...state,
        DanhSachPhanLoaiVuViec: payload.DanhSachPhanLoaiVuViec,
      };
    case actions.DASHBOARD_GET_INIT_ERROR:
      return {
        ...state,
        DanhSachPhanLoaiVuViec: [],
      };
    case actions.SOLIEUCANHBAO_GET_LIST:
      return {
        ...state,
        loadingCanhBao: true,
      };
    case actions.SOLIEUCANHBAO_GET_LIST_SUCCESS:
      return {
        ...state,
        SoLieuCanhBao: payload.SoLieuCanhBao,
        loadingCanhBao: false,
      };
    case actions.SOLIEUCANHBAO_GET_LIST_ERROR:
      return {
        ...state,
        SoLieuCanhBao: [],
        loadingCanhBao: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
