import actions from "./actions";

const initState = {
  ListHinhThuc: [],
  ListInspection: [],
  LisTruongPhong: [],
  ListThanhVien: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.REPORTDOCUMENT_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.REPORTDOCUMENT_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ListHinhThuc: payload.ListHinhThuc,
        ListTruongPhong: payload.ListTruongPhong,
        ListThanhVien: payload.ListThanhVien,
      };
    case actions.REPORTDOCUMENT_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        ListHinhThuc: [],
      };

    case actions.REPORTDOCUMENT_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.REPORTDOCUMENT_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        ListInspection: payload.ListInspection,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.REPORTDOCUMENT_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        ListInspection: [],
        TotalRow: 0,
        TableLoading: false,
      };

    default:
      return state;
  }
}
