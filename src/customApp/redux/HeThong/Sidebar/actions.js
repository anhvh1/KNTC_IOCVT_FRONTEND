const actions = {
  SIDEBAR_GET_LIST_REQUEST : 'SIDEBAR_GET_LIST_REQUEST',
  SIDEBAR_GET_LIST_SUCCESS : 'SIDEBAR_GET_LIST_SUCCESS',
  SIDEBAR_GET_LIST_ERROR : 'SIDEBAR_GET_LIST_ERROR',
  getList : filterData => ({
    type : actions.SIDEBAR_GET_LIST_REQUEST,
    // payload : {filterData}
  })
}

export default actions