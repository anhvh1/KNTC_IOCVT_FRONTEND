import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';
import customRoutes from '../../customApp/router';
import {noRole} from '../../customApp/sidebar';

import {store} from '../../redux/store';
import {
  getConfigValueByKey,
  getRoleByKey,
  getValueConfigLocalByKey,
} from '../../helpers/utility';
import {Redirect} from 'react-router-dom';
const routes = [...customRoutes];
import NotFound from '../../customApp/containers/HeThong/NotFound';
class AppRouter extends Component {
  render() {
    const {url, style} = this.props;
    //get list routes ---------########
    let role = store.getState().Auth.role;
    if (!role) {
      let roleStore = localStorage.getItem('role');
      role = JSON.parse(roleStore);
    }
    let listRoutes = [];

    routes.forEach((value) => {
      if (
        !value.path ||
        (role && role[value.path] && role[value.path].view) ||
        value.isDetail ||
        noRole.includes(value.path)
      ) {
        listRoutes.push(value);
      }
    });

    //Kiểm tra tổng hợp toàn huyện 24/11/2021
    const listRoles = getValueConfigLocalByKey('role');
    return (
      <div style={{...style, height: '100%'}} className="wrapper-app_router">
        <Switch>
          {listRoutes.map((singleRoute) => {
            const {path, exact, ...otherProps} = singleRoute;
            const role = getRoleByKey(listRoles, path);
            return (
              <Route
                url={url}
                exact={!(exact === false)}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                role={role}
                {...otherProps}
              />
            );
          })}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
