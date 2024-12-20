const actions = {
  TRACUUQUYETDINHGQ_GET_LIST_REQUEST: 'TRACUUQUYETDINHGQ_GET_LIST_REQUEST',
  TRACUUQUYETDINHGQ_GET_LIST_REQUEST_SUCCESS:
    'TRACUUQUYETDINHGQ_GET_LIST_REQUEST_SUCCESS',
  TRACUUQUYETDINHGQ_GET_LIST_REQUEST_ERROR:
    'TRACUUQUYETDINHGQ_GET_LIST_REQUEST_ERROR',
  TRACUUQUYETDINHGQ_GET_INIT_REQUEST: 'TRACUUQUYETDINHGQ_GET_INIT_REQUEST',
  TRACUUQUYETDINHGQ_GET_INIT_REQUEST_SUCCESS:
    'TRACUUQUYETDINHGQ_GET_INIT_REQUEST_SUCCESS',
  TRACUUQUYETDINHGQ_GET_INIT_REQUEST_ERROR:
    'TRACUUQUYETDINHGQ_GET_INIT_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.TRACUUQUYETDINHGQ_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  getInit: (filterData) => ({
    type: actions.TRACUUQUYETDINHGQ_GET_INIT_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
