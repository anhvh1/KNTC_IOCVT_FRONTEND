import actions from "./actions";

const initState = {
  ListHinhThuc: [],
  ListInspection: [],
  ListInspectionAll: [],
  ListAgencyTw: [],
  ListFields: [],
  InfoPlan: {},
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.INSPECTION_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.INSPECTION_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ListHinhThuc: payload.ListHinhThuc,
        ListFields: payload.ListFields,
        ListAgencyTw: payload.ListAgencyTw,
      };
    case actions.INSPECTION_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        ListHinhThuc: [],
        ListAgencyTw: [],
        ListFields: [],
      };

    case actions.INSPECTION_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.INSPECTION_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        ListInspection: payload.ListInspection,
        TotalRow: payload.TotalRow,
        TableLoading: false,
        InfoPlan: payload.InfoPlan,
        ListInspectionAll: payload.ListInspectionAll,
      };
    case actions.INSPECTION_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        ListInspection: [],
        TotalRow: 0,
        TableLoading: false,
        InfoPlan: {},
        ListInspectionAll: [],
      };

    default:
      return state;
  }
}
