const actions = {
  QUANLYHOSODONTHU_GET_INIT_REQUEST: 'QUANLYHOSODONTHU_GET_INIT_REQUEST',
  QUANLYHOSODONTHU_GET_INIT_REQUEST_SUCCESS:
    'QUANLYHOSODONTHU_GET_INIT_REQUEST_SUCCESS',
  QUANLYHOSODONTHU_GET_INIT_REQUEST_ERROR:
    'QUANLYHOSODONTHU_GET_INIT_REQUEST_ERROR',
  getData: (filterData) => ({
    type: actions.QUANLYHOSODONTHU_GET_INIT_REQUEST,
    payload: {filterData},
  }),
  QUANLYHOSODONTHU_GET_LIST_REQUEST: 'QUANLYHOSODONTHU_GET_LIST_REQUEST',
  QUANLYHOSODONTHU_GET_LIST_REQUEST_SUCCESS:
    'QUANLYHOSODONTHU_GET_LIST_REQUEST_SUCCESS',
  QUANLYHOSODONTHU_GET_LIST_REQUEST_ERROR:
    'QUANLYHOSODONTHU_GET_LIST_REQUEST_ERROR',
  getInitData: (filterData) => ({
    type: actions.QUANLYHOSODONTHU_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
