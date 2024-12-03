import React, { Component } from "react";
import Nprogress from "nprogress";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";
import "react-placeholder/lib/reactPlaceholder.css";
import {
  getInfoByAccessToken,
  getInfoFromToken,
  getLocalKey,
  getPath,
  getRoleByKey,
} from "./utility";
export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }
    componentWillMount() {
      Nprogress.start();
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    async componentDidMount() {
      this.mounted = true;
      const { default: Component } = await importComponent();
      Nprogress.done();
      if (this.mounted) {
        const path = getPath(this.props.location.pathname);
        const role = getLocalKey("role");
        this.setState({
          component: (
            <Component {...this.props} role={getRoleByKey(role, path)} />
          ),
        });
      }
    }

    render() {
      const Component = this.state.component || <div />;
      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
    }
  }
  return AsyncFunc;
}
