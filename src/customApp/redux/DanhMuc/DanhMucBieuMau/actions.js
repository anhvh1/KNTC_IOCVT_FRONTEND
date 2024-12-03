const actions = {
  DANHMUCBIEUMAU_GET_LIST_REQUEST: 'DANHMUCBIEUMAU_GET_LIST_REQUEST',
  DANHMUCBIEUMAU_GET_LIST_REQUEST_SUCCESS:
    'DANHMUCBIEUMAU_GET_LIST_REQUEST_SUCCESS',
  DANHMUCBIEUMAU_GET_LIST_REQUEST_ERROR:
    'DANHMUCBIEUMAU_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DANHMUCBIEUMAU_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  DANHMUCBIEUMAU_GET_INIT_REQUEST: 'DANHMUCBIEUMAU_GET_INIT_REQUEST',
  DANHMUCBIEUMAU_GET_INIT_REQUEST_SUCCESS:
    'DANHMUCBIEUMAU_GET_INIT_REQUEST_SUCCESS',
  DANHMUCBIEUMAU_GET_INIT_REQUEST_ERROR:
    'DANHMUCBIEUMAU_GET_INIT_REQUEST_ERROR',
  getInit: (filterData) => ({
    type: actions.DANHMUCBIEUMAU_GET_INIT_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
