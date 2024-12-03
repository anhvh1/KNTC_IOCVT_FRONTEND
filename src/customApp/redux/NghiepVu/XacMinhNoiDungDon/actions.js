const actions = {
  XACMINHNOIDUNGDON_GET_INIT_REQUEST: 'XACMINHNOIDUNGDON_GET_INIT_REQUEST',
  XACMINHNOIDUNGDON_GET_INIT_REQUEST_SUCCESS:
    'XACMINHNOIDUNGDON_GET_INIT_REQUEST_SUCCESS',
  XACMINHNOIDUNGDON_GET_INIT_REQUEST_ERROR:
    'XACMINHNOIDUNGDON_GET_INIT_REQUEST_ERROR',
  getData: (filterData) => ({
    type: actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST,
    payload: {filterData},
  }),
  XACMINHNOIDUNGDON_GET_LIST_REQUEST: 'XACMINHNOIDUNGDON_GET_LIST_REQUEST',
  XACMINHNOIDUNGDON_GET_LIST_REQUEST_SUCCESS:
    'XACMINHNOIDUNGDON_GET_LIST_REQUEST_SUCCESS',
  XACMINHNOIDUNGDON_GET_LIST_REQUEST_ERROR:
    'XACMINHNOIDUNGDON_GET_LIST_REQUEST_ERROR',
  getInitData: (filterData) => ({
    type: actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};

export default actions;