const actions = {
  QLHDSD_GET_INIT_DATA_REQUEST: "QLHDSD_GET_INIT_DATA_REQUEST",
  QLHDSD_GET_INIT_DATA_REQUEST_SUCCESS: "QLHDSD_GET_INIT_DATA_REQUEST_SUCCESS",
  QLHDSD_GET_INIT_DATA_REQUEST_ERROR: "QLHDSD_GET_INIT_DATA_REQUEST_ERROR",
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //-------
      disPatch({
        type: actions.QLHDSD_GET_INIT_DATA_REQUEST,
        payload: { filterData },
      });
    };
  },

  QLHDSD_GET_LIST_REQUEST: "QLHDSD_GET_LIST_REQUEST",
  QLHDSD_GET_LIST_REQUEST_SUCCESS: "QLHDSD_GET_LIST_REQUEST_SUCCESS",
  QLHDSD_GET_LIST_REQUEST_ERROR: "QLHDSD_GET_LIST_REQUEST_ERROR",
  getList: (filterData) => ({
    type: actions.QLHDSD_GET_LIST_REQUEST,
    payload: { filterData },
  }),
  //get notification
  getGuild: () => ({ type: "GET_NOTIFICATION_REQUEST_TO_APP_SAGA" }),
};
export default actions;
