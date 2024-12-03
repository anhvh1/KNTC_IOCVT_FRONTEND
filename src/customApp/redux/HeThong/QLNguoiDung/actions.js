const actions = {
  USERMANAGERMENT_GET_LIST_REQUEST: 'USERMANAGERMENT_GET_LIST_REQUEST',
  USERMANAGERMENT_GET_LIST_REQUEST_SUCCESS:
    'USERMANAGERMENT_GET_LIST_REQUEST_SUCCESS',
  USERMANAGERMENT_GET_LIST_REQUEST_ERROR:
    'USERMANAGERMENT_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.USERMANAGERMENT_GET_LIST_REQUEST,
    payload: {filterData},
  }),

  USERMANAGERMENT_GET_INIT_REQUEST: 'USERMANAGERMENT_GET_INIT_REQUEST',
  USERMANAGERMENT_GET_INIT_REQUEST_SUCCESS:
    'USERMANAGERMENT_GET_INIT_REQUEST_SUCCESS',
  USERMANAGERMENT_GET_INIT_REQUEST_ERROR:
    'USERMANAGERMENT_GET_INIT_REQUEST_ERROR',
  getInit: (filterData) => ({
    type: actions.USERMANAGERMENT_GET_INIT_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
