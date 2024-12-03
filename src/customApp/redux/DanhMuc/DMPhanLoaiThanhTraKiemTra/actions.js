import { getRoleByKey } from '../../../../helpers/utility';

const actions = {
  PHANLOAI_GET_INIT_DATA_REQUEST: 'PHANLOAI_GET_INIT_DATA_REQUEST',
  PHANLOAI_GET_INIT_DATA_REQUEST_SUCCESS: 'PHANLOAI_GET_INIT_DATA_REQUEST_SUCCESS',
  PHANLOAI_GET_INIT_DATA_REQUEST_ERROR: 'PHANLOAI_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-phan-loai-thanh-tra-kiem-tra');
      //-------
      disPatch({
        type: actions.PHANLOAI_GET_INIT_DATA_REQUEST,
        payload: { filterData, role },
      });
    };
  },

  PHANLOAI_GET_LIST_REQUEST: 'PHANLOAI_GET_LIST_REQUEST',
  PHANLOAI_GET_LIST_REQUEST_SUCCESS: 'PHANLOAI_GET_LIST_REQUEST_SUCCESS',
  PHANLOAI_GET_LIST_REQUEST_ERROR: 'PHANLOAI_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.PHANLOAI_GET_LIST_REQUEST,
    payload: { filterData },
  }),
  //get notification
  getGuild: () => ({ type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA' }),
};
export default actions;
