const actions = {
  TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST:
    'TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST',
  TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_SUCCESS:
    'TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_SUCCESS',
  TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_ERROR:
    'TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_ERROR',
  getData: (filterData) => ({
    type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST,
    payload: {filterData},
  }),
  TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST:
    'TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST',
  TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_SUCCESS:
    'TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_SUCCESS',
  TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_ERROR:
    'TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_ERROR',
  getInitData: (filterData) => ({
    type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST,
    payload: {filterData},
  }),
};

export default actions;
