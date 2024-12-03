import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachLoaiKhieuTo: [],
  DanhSachDiaGioi: [],
  expandedKeys: [],
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.KHIEUTO_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        role: payload.role,
        TableLoading: true,
      };
    case actions.KHIEUTO_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachDiaGioi: payload.DanhSachDiaGioi,
        expandedKeys: payload.expandedKeys,
        TableLoading: false,
      };
    case actions.KHIEUTO_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
        expandedKeys: [],
        TableLoading: false,
      };
    //get list
    case actions.KHIEUTO_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.KHIEUTO_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        expandedKeys: payload.expandedKeys,
        TableLoading: false,
      };
    case actions.KHIEUTO_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
        expandedKeys: [],
        TableLoading: false,
      };
    default:
      return state;
  }
}
