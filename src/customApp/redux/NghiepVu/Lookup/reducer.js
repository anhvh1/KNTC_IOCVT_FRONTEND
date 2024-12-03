import actions from "./actions";

const initState = {
  ListHinhThuc: [],
  ListFields: [],
  DataLookup: {},
  DataLookupAll: {},
  ListAgencyTw: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.LOOKUP_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.LOOKUP_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ListHinhThuc: payload.ListHinhThuc,
        ListFields: payload.ListFields,
        ListAgencyTw: payload.ListAgencyTw,
      };
    case actions.LOOKUP_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        ListHinhThuc: [],
        ListAgencyTw: [],
        ListFields: [],
      };

    case actions.LOOKUP_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.LOOKUP_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DataLookup: payload.DataLookup,
        TotalRow: payload.TotalRow,
        TableLoading: false,
        DataLookupAll: payload.DataLookupAll,
      };
    case actions.LOOKUP_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DataLookup: {},
        TotalRow: 0,
        TableLoading: false,
        DataLookupAll: {},
      };

    default:
      return state;
  }
}
