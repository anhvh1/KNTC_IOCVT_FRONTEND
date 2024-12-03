import {store} from './store';
import authActions from './auth/actions';
import queryString from 'query-string';

export default (props, store) => {
  const valueFilter =
    props.location?.search || props.location?.state?.from?.search;
  const filterState = queryString.parse(valueFilter);
  return new Promise(() => {
    if (!filterState.isDangXuat) {
      store.dispatch(authActions.checkAuthorization());
    }
  });
};
