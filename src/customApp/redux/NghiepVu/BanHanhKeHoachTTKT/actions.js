import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  BANHANH_GET_INIT_DATA_REQUEST: 'BANHANH_GET_INIT_DATA_REQUEST',
  BANHANH_GET_INIT_DATA_REQUEST_SUCCESS: 'BANHANH_GET_INIT_DATA_REQUEST_SUCCESS',
  BANHANH_GET_INIT_DATA_REQUEST_ERROR: 'BANHANH_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-vat-quoc-gia');
      //-------
      disPatch({
        type: actions.BANHANH_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  BANHANH_GET_LIST_REQUEST: 'BANHANH_GET_LIST_REQUEST',
  BANHANH_GET_LIST_REQUEST_SUCCESS: 'BANHANH_GET_LIST_REQUEST_SUCCESS',
  BANHANH_GET_LIST_REQUEST_ERROR: 'BANHANH_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.BANHANH_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
