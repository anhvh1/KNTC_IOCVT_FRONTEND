import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DONDOC_GET_INIT_DATA_REQUEST: 'DONDOC_GET_INIT_DATA_REQUEST',
  DONDOC_GET_INIT_DATA_REQUEST_SUCCESS: 'DONDOC_GET_INIT_DATA_REQUEST_SUCCESS',
  DONDOC_GET_INIT_DATA_REQUEST_ERROR: 'DONDOC_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-linh-vuc');
      //-------
      disPatch({
        type: actions.DONDOC_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  DONDOC_GET_LIST_REQUEST: 'DONDOC_GET_LIST_REQUEST',
  DONDOC_GET_LIST_REQUEST_SUCCESS: 'DONDOC_GET_LIST_REQUEST_SUCCESS',
  DONDOC_GET_LIST_REQUEST_ERROR: 'DONDOC_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DONDOC_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
