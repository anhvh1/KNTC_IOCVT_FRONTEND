export function getView(width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}
const actions = {
  COLLPSE_CHANGE: 'COLLPSE_CHANGE',
  COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  CLEAR_MENU: 'CLEAR_MENU',
  GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
  CHECK_KE_KHAI_SUCCESS: 'CHECK_KE_KHAI_SUCCESS',
  CHECK_IFRAME_SUCCESS: 'CHECK_IFRAME_SUCCESS',
  CHANGE_MENU_ACTIVE: 'CHANGE_MENU_ACTIVE',
  CHANGE_LISTCHILD_ACTIVE: 'CHANGE_LISTCHILD_ACTIVE',
  CHANGE_MAMENU_ACTIVE: 'CHANGE_MAMENU_ACTIVE',
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE,
  }),
  changeMaMenuActive: (MaMenuActive) => {
    return {
      type: actions.CHANGE_MAMENU_ACTIVE,
      MaMenuActive: MaMenuActive,
    };
  },
  changeListChild: (ListChild) => {
    return {
      type: actions.CHANGE_LISTCHILD_ACTIVE,
      ListChild: ListChild,
    };
  },
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== 'DesktopView';
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height,
      width,
    };
  },
  toggleOpenDrawer: () => ({
    type: actions.COLLPSE_OPEN_DRAWER,
  }),
  changeOpenKeys: (openKeys) => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys,
  }),
  changeCurrent: (current) => ({
    type: actions.CHANGE_CURRENT,
    current,
  }),
  changeListMenuActive: (ListMenuActive) => ({
    type: actions.CHANGE_MENU_ACTIVE,
    ListMenuActive,
  }),
  clearMenu: () => ({type: actions.CLEAR_MENU}),
  getNotifications: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
  getHuongDan: () => ({type: 'GET_HUONGDAN_REQUEST_TO_APP_SAGA'}),
  checkKeKhai: () => ({type: 'CHECK_KE_KHAI'}),
  checkIframeSuccess: () => {
    return {type: 'CHECK_IFRAME_SUCCESS'};
  },
};
export default actions;
