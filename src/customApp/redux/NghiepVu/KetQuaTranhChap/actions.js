const actions = {
  KETQUATRANHCHAP_GET_INIT_REQUEST: 'KETQUATRANHCHAP_GET_INIT_REQUEST',
  KETQUATRANHCHAP_GET_INIT_REQUEST_SUCCESS:
    'KETQUATRANHCHAP_GET_INIT_REQUEST_SUCCESS',
  KETQUATRANHCHAP_GET_INIT_REQUEST_ERROR:
    'KETQUATRANHCHAP_GET_INIT_REQUEST_ERROR',
  getData: (filterData) => ({
    type: actions.KETQUATRANHCHAP_GET_INIT_REQUEST,
    payload: {filterData},
  }),
  KETQUATRANHCHAP_GET_LIST_REQUEST: 'KETQUATRANHCHAP_GET_LIST_REQUEST',
  KETQUATRANHCHAP_GET_LIST_REQUEST_SUCCESS:
    'KETQUATRANHCHAP_GET_LIST_REQUEST_SUCCESS',
  KETQUATRANHCHAP_GET_LIST_REQUEST_ERROR:
    'KETQUATRANHCHAP_GET_LIST_REQUEST_ERROR',
  getInitData: (filterData) => ({
    type: actions.KETQUATRANHCHAP_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};

export default actions;