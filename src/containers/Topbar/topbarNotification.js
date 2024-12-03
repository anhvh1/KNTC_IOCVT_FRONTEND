import React, {Component} from 'react';
import {message, Modal, Popover} from 'antd';
import {connect} from 'react-redux';
import TopbarDropdownWrapper from './topbarDropdown.style';
import {getToken} from '../../helpers/utility';
import api from './config';
import actions from '../../redux/app/actions';
import {store} from '../../redux/store';
import {Redirect} from 'react-router-dom';

class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.intervalNoti = null;
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const userJson = localStorage?.getItem('user');
    if (userJson) {
      this.props.getNotifications();
      clearInterval(this.intervalNoti);
      this.intervalNoti = setInterval(() => {
        const userId = getToken().get('userId');
        if (userId) {
          this.props.getNotifications();
        }
      }, 30 * 60 * 1000); //300s
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalNoti);
  }

  hide() {
    this.setState({visible: false});
  }

  handleVisibleChange() {
    this.setState({visible: !this.state.visible});
  }

  getRouterNotification = (notification) => {
    if (notification.Key === 'ke-khai-tai-san') {
      return `/dashboard/ke-khai-tai-san/ke-khai`;
    }
    return `/dashboard/${notification.Key}`;
  };

  render() {
    const {customizedTheme, notifications} = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>THÔNG BÁO</h3>
        </div>
        <div className="isoDropdownBody">
          {notifications && notifications.length ? (
            <div>
              {notifications.map((notification, index) => (
                <a
                  className="isoDropdownListItem"
                  href={this.getRouterNotification(notification)}
                  key={index}
                  onClick={this.handleVisibleChange}
                >
                  <h4 style={{color: '#4287f5'}}>{notification.TieuDe}</h4>
                  <h5>{notification.Name}</h5>
                  {/*<p>{notification.notification}</p>*/}
                </a>
              ))}
            </div>
          ) : (
            <div style={{padding: 10, textAlign: 'center', color: 'grey'}}>
              Không có thông báo nhắc việc
            </div>
          )}
        </div>
        {/*<a className="isoViewAllBtn">View All</a>*/}
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        open={this.state.visible}
        onOpenChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper" style={{width: 28}}>
          <i className="ion-android-notifications" />
          {notifications && notifications.length ? (
            <span style={{background: 'crimson'}}>{notifications.length}</span>
          ) : null}
        </div>
      </Popover>
    );
  }
}

export default connect(
  (state) => ({
    ...state.App,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  actions,
)(TopbarNotification);
