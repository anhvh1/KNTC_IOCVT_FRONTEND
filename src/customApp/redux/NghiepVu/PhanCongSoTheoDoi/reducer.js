import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachTaoCuoc: [],
  DanhSachBaoTang:[],
  ListHinhThuc: [],
  ListFields: [],
  //   AllHuongDan: [],
  TotalRow: 0,
  TotalUnit:0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTang: payload.DanhSachBaoTang,
        ListHinhThuc: payload.ListHinhThuc,
        ListFields: payload.ListFields,
        TotalRow: payload.TotalRow,
        TotalUnit:payload.TotalUnit,
        TableLoading: false,
      };
    case actions.PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTang: [],
        ListHinhThuc: [],
        ListFields: [],
        TotalRow: 0,
        TotalUnit:0,
        TableLoading: false,
      };
    //get list
    case actions.PHANCONGSOTHEODOI_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.PHANCONGSOTHEODOI_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTaoCuoc: payload.DanhSachTaoCuoc,
        TotalRow: payload.TotalRow,
        TotalUnit:payload.TotalUnit,
        TableLoading: false,
      };
    case actions.PHANCONGSOTHEODOI_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTaoCuoc: [],
        TotalRow: 0,
        TotalUnit:0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
