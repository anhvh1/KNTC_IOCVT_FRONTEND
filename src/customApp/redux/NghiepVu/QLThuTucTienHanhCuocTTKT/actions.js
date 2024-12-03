import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  TIENHANH_GET_INIT_DATA_REQUEST: 'TIENHANH_GET_INIT_DATA_REQUEST',
  TIENHANH_GET_INIT_DATA_REQUEST_SUCCESS: 'TIENHANH_GET_INIT_DATA_REQUEST_SUCCESS',
  TIENHANH_GET_INIT_DATA_REQUEST_ERROR: 'TIENHANH_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'quan-ly-thu-tuc');
      //-------
      disPatch({
        type: actions.TIENHANH_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  TIENHANH_GET_LIST_REQUEST: 'TIENHANH_GET_LIST_REQUEST',
  TIENHANH_GET_LIST_REQUEST_SUCCESS: 'TIENHANH_GET_LIST_REQUEST_SUCCESS',
  TIENHANH_GET_LIST_REQUEST_ERROR: 'TIENHANH_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.TIENHANH_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
