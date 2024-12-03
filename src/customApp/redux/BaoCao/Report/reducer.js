import actions from "./action";

const initState = {
  DanhSachTenFile: [],
  DanhSachLoaiKhieuTo : []
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.REPORT_GET_DATA_INIT:
      return {
        ...state,
      };
    case actions.REPORT_GET_DATA_INIT_SUCCESS:
      return {
        ...state,
        DanhSachTenFile: payload.DanhSachTenFile,
        DanhSachLoaiKhieuTo : payload.DanhSachLoaiKhieuTo
      };
    case actions.REPORT_GET_DATA_INIT_ERROR:
      return {
        ...state,
        DanhSachTenFile: [],
        DanhSachLoaiKhieuTo : []
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
