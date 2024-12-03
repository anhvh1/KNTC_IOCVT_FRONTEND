import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DOANHNGHIEP_GET_INIT_DATA_REQUEST: 'DOANHNGHIEP_GET_INIT_DATA_REQUEST',
  DOANHNGHIEP_GET_INIT_DATA_REQUEST_SUCCESS: 'DOANHNGHIEP_GET_INIT_DATA_REQUEST_SUCCESS',
  DOANHNGHIEP_GET_INIT_DATA_REQUEST_ERROR: 'DOANHNGHIEP_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-doanh-nghiep');
      //-------
      disPatch({
        type: actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  DOANHNGHIEP_GET_LIST_REQUEST: 'DOANHNGHIEP_GET_LIST_REQUEST',
  DOANHNGHIEP_GET_LIST_REQUEST_SUCCESS: 'DOANHNGHIEP_GET_LIST_REQUEST_SUCCESS',
  DOANHNGHIEP_GET_LIST_REQUEST_ERROR: 'DOANHNGHIEP_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DOANHNGHIEP_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
