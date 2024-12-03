const actions = {
  GET_DATA_DANTOC: "GET_DATA_DANTOC",
  GET_DATA_DANTOC_SUCCESS: "GET_DATA_DANTOC_SUCCESS",
  GET_DATA_DANTOC_ERROR: "GET_DATA_DANTOC_ERROR",

  getData: (filterData) => ({
    type: actions.GET_DATA_DANTOC,
    payload: { filterData },
  }),
};

export default actions;
