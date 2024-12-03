const actions = {
  QLCHUCNANG_GET_LIST_REQUEST: "QLCHUCNANG_GET_LIST_REQUEST",
  QLCHUCNANG_GET_LIST_SUCCESS: "QLCHUCNANG_GET_LIST_SUCCESS",
  QLCHUCNANG_GET_LIST_ERROR: "QLCHUCNANG_GET_LIST_ERROR",
  getListData: (filterData) => ({
    type: actions.QLCHUCNANG_GET_LIST_REQUEST,
    payload: filterData,
  }),
};

export default actions;
