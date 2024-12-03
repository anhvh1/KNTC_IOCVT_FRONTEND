import actions from "./actions";

const initState = {
  ListHinhThuc: [],
  ListSyntheticPlan: [],
  ListSyntheticPlanAll: [],
  ListFields: [],
  InfoSyntheticPlan: {},
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SYNCTHETIC_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.SYNCTHETIC_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ListHinhThuc: payload.ListHinhThuc,
        ListFields: payload.ListFields,
      };
    case actions.SYNCTHETIC_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        ListHinhThuc: [],
        ListFields: [],
      };

    case actions.SYNCTHETIC_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
        ListSyntheticPlan: [],
      };
    case actions.SYNCTHETIC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        ListSyntheticPlan: payload.ListSyntheticPlan,
        ListSyntheticPlanAll: payload.ListSyntheticPlanAll,
        TotalRow: payload.TotalRow,
        TableLoading: false,
        InfoSyntheticPlan: payload.InfoSyntheticPlan,
      };
    case actions.SYNCTHETIC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        ListSyntheticPlan: [],
        ListSyntheticPlanAll: [],
        TotalRow: 0,
        TableLoading: false,
        InfoSyntheticPlan: {},
      };

    default:
      return state;
  }
}
