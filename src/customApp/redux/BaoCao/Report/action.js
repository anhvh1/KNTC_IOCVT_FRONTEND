const actions = {
  REPORT_GET_DATA_INIT: "REPORT_GET_DATA_INIT",
  REPORT_GET_DATA_INIT_SUCCESS: "REPORT_GET_DATA_INIT_SUCCESS",
  REPORT_GET_DATA_INIT_ERROR: "REPORT_GET_DATA_INIT_ERROR",

  getData: (filterData) => ({
    type: actions.REPORT_GET_DATA_INIT,
    payload: { filterData },
  }),
};

export default actions;
