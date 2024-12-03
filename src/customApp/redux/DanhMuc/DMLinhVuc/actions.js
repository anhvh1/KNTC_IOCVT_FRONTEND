import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  LINHVUC_GET_INIT_DATA_REQUEST: 'LINHVUC_GET_INIT_DATA_REQUEST',
  LINHVUC_GET_INIT_DATA_REQUEST_SUCCESS: 'LINHVUC_GET_INIT_DATA_REQUEST_SUCCESS',
  LINHVUC_GET_INIT_DATA_REQUEST_ERROR: 'LINHVUC_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-linh-vuc');
      //-------
      disPatch({
        type: actions.LINHVUC_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  LINHVUC_GET_LIST_REQUEST: 'LINHVUC_GET_LIST_REQUEST',
  LINHVUC_GET_LIST_REQUEST_SUCCESS: 'LINHVUC_GET_LIST_REQUEST_SUCCESS',
  LINHVUC_GET_LIST_REQUEST_ERROR: 'LINHVUC_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.LINHVUC_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
