const actions = {
  CapNhatQDTLToXacMinh_GET_INIT_REQUEST:
    'CapNhatQDTLToXacMinh_GET_INIT_REQUEST',
  CapNhatQDTLToXacMinh_GET_INIT_REQUEST_SUCCESS:
    'CapNhatQDTLToXacMinh_GET_INIT_REQUEST_SUCCESS',
  CapNhatQDTLToXacMinh_GET_INIT_REQUEST_ERROR:
    'CapNhatQDTLToXacMinh_GET_INIT_REQUEST_ERROR',
  getData: (filterData) => ({
    type: actions.CapNhatQDTLToXacMinh_GET_INIT_REQUEST,
    payload: {filterData},
  }),
  CapNhatQDTLToXacMinh_GET_LIST_REQUEST:
    'CapNhatQDTLToXacMinh_GET_LIST_REQUEST',
  CapNhatQDTLToXacMinh_GET_LIST_REQUEST_SUCCESS:
    'CapNhatQDTLToXacMinh_GET_LIST_REQUEST_SUCCESS',
  CapNhatQDTLToXacMinh_GET_LIST_REQUEST_ERROR:
    'CapNhatQDTLToXacMinh_GET_LIST_REQUEST_ERROR',
  getInitData: (filterData) => ({
    type: actions.CapNhatQDTLToXacMinh_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
