const actions = {
  GETBAOCAO2A_INIT_REQUEST: "GETBAOCAO2A_INIT_REQUEST",
  GETBAOCAO2A_INIT_REQUEST_SUCCESS: "GETBAOCAO2A_INIT_REQUEST_SUCCESS",
  GETBAOCAO2A_INIT_REQUEST_ERROR: "GETBAOCAO2A_INIT_REQUEST_ERROR",

  CLEAR_DATA_BAOCAO: "CLEAR_DATA_BAOCAO",
  getData: (filterData) => ({
    type: actions.GETBAOCAO2A_INIT_REQUEST,
    payload: { filterData },
  }),

  clearData: () => ({
    type: actions.CLEAR_DATA_BAOCAO,
  }),

};

export default actions;
