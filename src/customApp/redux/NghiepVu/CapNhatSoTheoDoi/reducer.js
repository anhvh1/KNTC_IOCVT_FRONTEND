import actions from "./actions";

const initState = {
  ListHinhThuc: [],
  ListSyntheticPlan: [],
  ListFields: [],
  InfoSyntheticPlan: {},
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.CAPNHATSOTHEODOI_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.CAPNHATSOTHEODOI_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ListSyntheticPlan: payload.ListSyntheticPlan,
        ListHinhThuc: payload.ListHinhThuc,
        ListFields: payload.ListFields,
        InfoSyntheticPlan: payload.InfoSyntheticPlan,
      };
    case actions.CAPNHATSOTHEODOI_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        ListHinhThuc: [],
        ListFields: [],
        ListSyntheticPlan:[],
        InfoSyntheticPlan: {},
      };

    case actions.CAPNHATSOTHEODOI_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.CAPNHATSOTHEODOI_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        ListSyntheticPlan: payload.ListSyntheticPlan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.CAPNHATSOTHEODOI_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        ListSyntheticPlan: [],
        TotalRow: 0,
        TableLoading: false,
      };

    default:
      return state;
  }
}
