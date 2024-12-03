import actions from './actions';

const initState = {
  DanhSachAnhXa: [],
  DanhSachDonThu: [],
  DanhSachLichSuDongBo: [],
  DanhSachMappingKNTCQuocGia: [],
  DanhSachMapping2: [],
  TotalRow: 0,
  TotalRowMapping: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    case actions.DONGBODULIEU_GET_INIT_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DONGBODULIEU_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachAnhXa: payload.DanhSachAnhXa,
        TableLoading: false,
      };
    case actions.DONGBODULIEU_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachAnhXa: [],
        TotalRow: 0,
        TableLoading: false,
      };

    case actions.DONGBODULIEU_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DONGBODULIEU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDonThu: payload.DanhSachDonThu,
        DanhSachLichSuDongBo: payload.DanhSachLichSuDongBo,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DONGBODULIEU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDonThu: [],
        DanhSachLichSuDongBo: [],
        TotalRow: 0,
        TableLoading: false,
      };

    case actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachMappingKNTCQuocGia: payload.DanhSachMappingKNTCQuocGia,
        DanhSachMapping2: payload.DanhSachMapping2,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachMappingKNTCQuocGia: [],
        DanhSachMapping2: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
