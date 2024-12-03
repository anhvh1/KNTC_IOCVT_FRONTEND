import {getDefaultPath, getDeufaultOpenSideKey} from '../../helpers/urlSync';
import actions, {getView} from './actions';

const preKeys = getDefaultPath();

const defaultOpenKey = getDeufaultOpenSideKey();

console.log(preKeys, 'preKeys');
console.log(defaultOpenKey, 'defaultOpenkeys');

const initState = {
  collapsed: window.innerWidth <= 1220,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  width: window.innerWidth,
  openDrawer: false,
  openKeys: defaultOpenKey ? defaultOpenKey : [],
  current: preKeys,
  notifications: [],
  DanhSachHuongDan: [],
  CheckKeKhai: {},
  isViewIframe: false,
  ListMenuActive: [],
  ListChild: [],
  MaMenuActive: '',
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.COLLPSE_CHANGE:
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    case actions.CHANGE_MAMENU_ACTIVE:
      return {
        ...state,
        MaMenuActive: action.MaMenuActive,
      };
    case actions.CHANGE_LISTCHILD_ACTIVE:
      return {
        ...state,
        ListChild: action.ListChild ? action.ListChild : [],
      };
    case actions.COLLPSE_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    case actions.TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        const width = action.width ? action.width : state.width;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height,
          width,
        };
      }
      break;
    case actions.CHANGE_OPEN_KEYS:
      return {
        ...state,
        openKeys: action.openKeys,
      };
    case actions.CHANGE_CURRENT:
      return {
        ...state,
        current: action.current,
      };
    case actions.CLEAR_MENU:
      return {
        ...state,
        openKeys: [],
        current: [],
      };
    case actions.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case actions.CHECK_KE_KHAI_SUCCESS:
      return {
        ...state,
        CheckKeKhai: action.CheckKeKhai,
      };
    case actions.CHANGE_MENU_ACTIVE:
      return {
        ...state,
        ListMenuActive: action.ListMenuActive,
      };
    case actions.CHECK_IFRAME_SUCCESS:
      return {
        ...state,
        isViewIframe: true,
      };
    default:
      return state;
  }
  return state;
}
