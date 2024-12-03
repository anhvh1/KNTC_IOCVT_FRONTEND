const actions = {
  LOOKUP_GET_INIT_REQUEST: "LOOKUP_GET_INIT_REQUEST",
  LOOKUP_GET_INIT_REQUEST_SUCCESS: "LOOKUP_GET_INIT_REQUEST_SUCCESS",
  LOOKUP_GET_INIT_REQUEST_ERROR: "LOOKUP_GET_INIT_REQUEST_ERROR",
  getInit: (filterData) => ({
    type: actions.LOOKUP_GET_INIT_REQUEST,
    payload: { filterData },
  }),

  LOOKUP_GET_LIST_REQUEST: "LOOKUP_GET_LIST_REQUEST",
  LOOKUP_GET_LIST_REQUEST_SUCCESS: "LOOKUP_GET_LIST_REQUEST_SUCCESS",
  LOOKUP_GET_LIST_REQUEST_ERROR: "LOOKUP_GET_LIST_REQUEST_ERROR",
  getList: (filterData) => ({
    type: actions.LOOKUP_GET_LIST_REQUEST,
    payload: { filterData },
  }),
};

export default actions;
