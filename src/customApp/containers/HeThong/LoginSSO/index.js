import React, {Component} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Input} from '../../../../components/uielements/exportComponent';
import authAction from '../../../../redux/auth/actions';
import appAction from '../../../../redux/app/actions';
import {Row, Col, Tooltip, Modal, message, Checkbox} from 'antd';
// import dangImage from '../../../../image/dang.png';
// import iconGo from "../../../../image/logo_gosol.png";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import api, {apiUrl} from './config';
import {isFullLocalStorage} from '../../../../helpers/utility';
import SignInWrapper from './styled';
import teamview from '../../../../image/teamview-icon.png';
import ultraview from '../../../../image/ultraview-icon.png';
import {getConfigLocal} from '../../../../helpers/utility';
import queryString from 'query-string';
import axios from 'axios';
import {ThongTinChung} from '../../../../settings/constants';

const {login} = authAction;
const {clearMenu, getNotifications, getHuongDan, checkIframeSuccess} =
  appAction;
const date = new Date();
const currentYear = date.getFullYear();

class SignIn extends Component {
  state = {
    confirmLoading: false,
    username: '',
    password: '',
    messageError: '',
    client_id: '',
    client_secret: '',
    redirect_uri: '',
    urlSend: '',
    TenDonVi: '',
    isLogginSSO: false,
    address: {
      phoneNumber: '----.----.---',
      fax: '----.----.---',
      email: '----@gosol.com.vn',
    },
    luuThongTin: false,
  };

  //Get initData---------------------------------------------
  componentDidMount = async () => {
    this.getThongTinHoTro();
    const value =
      this.props.location?.state?.from?.search || this.props.location.search;
    const searchUrl = queryString.parse(value);
  };

  getThongTinHoTro = async () => {
    try {
      const ThongTinHoTro = ThongTinChung.ThongTinHoTro;
      const TenDonVi = ThongTinChung.TenDonVi;
      const SSO_LOGIN = ThongTinChung.SSO_LOGIN;
      const SSO_LOGIN_URL = ThongTinChung.SSO_LOGIN_URL;
      let ssoArray = SSO_LOGIN.split(';', 3);
      const client_id = ssoArray[0];
      const client_secret = ssoArray[1];
      const redirect_uri = ssoArray[2];
      let addressArray = ThongTinHoTro.split(';', 3);
      this.setState({
        client_id,
        client_secret,
        redirect_uri,
        urlSend: SSO_LOGIN_URL,
        TenDonVi: TenDonVi,
        address: {
          phoneNumber: addressArray[0] ? addressArray[0] : '----.----.---',
          fax: addressArray[1] ? addressArray[1] : '----.----.---',
          email: addressArray[2] ? addressArray[2] : '----@gosol.com.vn',
        },
      });
    } catch (e) {
      message.error(e.toString());
    }
  };

  handleLogin = () => {
    this.setState({confirmLoading: true}, () => {
      setTimeout(() => {
        const username = this.state.username;
        const password = this.state.password;
        //check api
        if (username && password) {
          const data = {
            UserName: username,
            Password: password,
          };
          api
            .dangNhap(data)
            .then((response) => {
              if (response.data.Status > 0) {
                const {luuThongTin} = this.state;
                luuThongTin && this.luuThongTinDangNhap();
                this.setState(
                  {
                    confirmLoading: false,
                    username: '',
                    password: '',
                    messageError: '',
                  },
                  () => {
                    const {login, clearMenu, getNotifications, getHuongDan} =
                      this.props;
                    login(response.data);
                    clearMenu();
                    // getNotifications();
                    // getHuongDan();
                    //this.props.history.push("/dashboard");
                  },
                );
              } else {
                this.setState({
                  confirmLoading: false,
                  messageError: response.data.Message,
                });
              }
            })
            .catch((error) => {
              this.systemError();
            });
        } else {
          this.setState({
            confirmLoading: false,
            messageError: 'Vui lòng nhập đầy đủ thông tin!',
          });
        }
      }, 500);
    });
  };

  handleLoginSSO = (data) => {
    this.setState({
      isLogginSSO: true,
    });
    this.setState({confirmLoading: true}, () => {
      setTimeout(() => {
        //check api
        if (data) {
          api
            .dangNhapSSO(data)
            .then((response) => {
              if (response.data.Status > 0) {
                const {luuThongTin} = this.state;
                luuThongTin && this.luuThongTinDangNhap();
                this.setState(
                  {
                    confirmLoading: false,
                    username: '',
                    password: '',
                    messageError: '',
                  },
                  () => {
                    const {login, clearMenu, getNotifications, getHuongDan} =
                      this.props;
                    login(response.data);
                    clearMenu();
                  },
                );
              } else {
                this.setState({
                  confirmLoading: false,
                  messageError: response.data.Message,
                });
              }
            })
            .catch((error) => {
              this.systemError();
            });
        } else {
          this.setState({
            confirmLoading: false,
            messageError: 'Vui lòng nhập đầy đủ thông tin!',
          });
        }
      }, 500);
    });
  };

  handleCAS = () => {
    window.location =
      'https://cas.baria-vungtau.gov.vn/cas/login?service=https%3a%2f%2fcasclient%3a9008%2fRestricted%2fAuthenticatedUsersOnly%2f&renew=true';
  };

  setUsername = (value) => {
    this.setState({username: value});
  };

  setPassword = (value) => {
    this.setState({password: value});
  };

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  handleCheckLoginIframe = (searchUrl) => {
    if (searchUrl && searchUrl?.UserName && searchUrl.TicKet) {
      const Username = searchUrl?.UserName;
      const TicKet = searchUrl.TicKet;
      const HrefLink = searchUrl.HrefLink;
      const data = {Username, TicKet};
      api
        .dangNhap(data)
        .then((response) => {
          if (response.data.Status > 0) {
            const {luuThongTin} = this.state;
            luuThongTin && this.luuThongTinDangNhap();
            this.setState(
              {
                confirmLoading: false,
                username: '',
                password: '',
                messageError: '',
              },
              () => {
                const {
                  login,
                  clearMenu,
                  getNotifications,
                  getHuongDan,
                  checkIframeSuccess,
                } = this.props;
                checkIframeSuccess();
                login({
                  ...response.data,
                  isIframe: true,
                  HrefLink: HrefLink,
                });
                // clearMenu();
                // getNotifications();
                // getHuongDan();
                //this.props.history.push("/dashboard");
              },
            );
          } else {
            this.setState({
              confirmLoading: false,
              messageError: response.data.Message,
            });
            // message
          }
        })
        .catch((error) => {
          this.systemError();
        });
    }
  };

  systemError = () => {
    this.setState({
      confirmLoading: false,
    });
    Modal.error({
      title: 'Không thể đăng nhập',
      content:
        'Hệ thống đang trong quá trình bảo trì, vui lòng quay lại sau 17h30 ngày 09/06/2022!',
    });
  };

  luuThongTinDangNhap = () => {};

  handleGetToken = async (params) => {
    let res = await api.getToken_SSO(params);
  };

  render() {
    // Login with SSO
    let url = new URL(window.location.href);
    const {client_id, client_secret, urlSend, redirect_uri} = this.state;
    const isLogginSSO = this.state.isLogginSSO;
    if (!isLogginSSO) {
      let code = url?.searchParams?.get('code');
      let session_state = url?.searchParams?.get('session_state');
      if (code && session_state) {
        const data = {
          code,
          session_state,
        };
        this.handleLoginSSO(data);

        localStorage.setItem(
          'SSO_DATA',
          JSON.stringify({
            code,
            session_state,
          }),
        );
      } else if (urlSend) {
        let params = {
          client_id,
          client_secret,
          redirect_uri,
          response_type: 'code',
          scope: 'openid',
        };
        let queryString = Object.keys(params)
          .reduce((result, current) => {
            return (result += `${current}=${params[current]}&`);
          }, '')
          .slice(0, -1);
        window.location.href = `${urlSend}?${queryString}`;
      }
    }

    // Login normal
    const from = {pathname: '/dashboard'};
    //reduxStorage data -> this.props.reducerToken
    const reduxStorageNotNull = this.props.reducerToken !== null;
    const localStorageNotNull = isFullLocalStorage();
    let isLoggedIn;
    const value =
      this.props.location?.state?.from?.search || this.props.location.search;
    const searchUrl = queryString.parse(value);
    const refUrl = document.referrer;
    // if (refUrl === 'http://kntc-vinhphucv2.gosol.com.vn/') {
    //   isLoggedIn =
    //     (reduxStorageNotNull || localStorageNotNull) && searchUrl?.HrefLink;
    // } else {
    // }
    isLoggedIn = reduxStorageNotNull || localStorageNotNull;
    if (isLoggedIn) {
      return <Redirect to={from} />;
    } else {
      // localStorage.clear();
    }

    const isDisabledLoggin =
      searchUrl && searchUrl?.UserName && searchUrl.TicKet ? true : false;

    const {TenDonVi, address, luuThongTin, messageError} = this.state;

    return !isDisabledLoggin && isLogginSSO ? (
      <SignInWrapper>
        <div className={'col-center title'}>
          render Phần mềm quản lý kê khai tài sản, thu nhập
        </div>
        <div className={'col-left'}>
          {/*<div className={'head-text'}>*/}
          {/*  /!*{TenDonVi}*!/*/}
          {/*  Phần mềm quản lý kê khai tài sản*/}
          {/*</div>*/}
          <div className={'main-login'}>
            <div className={'main-icon'}>{/* <Icon type={'team'}/> */}</div>
            <div className={'input'}>
              <Input
                prefix={<UserOutlined />}
                placeholder={'Tài khoản'}
                onChange={(input) => this.setUsername(input.target.value)}
                onKeyUp={this._handleKeyDown}
                value={this.state.username}
                autoFocus
              />
              {/*       */}
              <Input
                prefix={<LockOutlined />}
                placeholder={'Mật khẩu'}
                type="password"
                value={this.state.password}
                onChange={(input) => this.setPassword(input.target.value)}
                onKeyUp={this._handleKeyDown}
              />
            </div>
            <div className={'button'}>
              <Button
                type="primary"
                onClick={this.handleLogin}
                loading={this.state.confirmLoading}
              >
                Đăng nhập
              </Button>
            </div>
            <div className={'text-error'}>{messageError}</div>
          </div>
          <div className={'sub-login'}>
            {/*<Checkbox checked={luuThongTin} onChange={e => this.setState({luuThongTin: e.target.checked})}>*/}
            {/*  Lưu thông tin đăng nhập*/}
            {/*</Checkbox>*/}
            <div className={'forgot'}>
              <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
            </div>
          </div>
        </div>
        <div className={'col-right'}>
          {/*<div class={'head-text'}>*/}
          {/*  {TenDonVi}*/}
          {/*</div>*/}
          <div className={'helper'}>
            <div class={'help-title'}>Hỗ trợ</div>
            <div className={'help-row'}>
              {/* <Icon type="phone" theme="filled"/> {address.phoneNumber} */}
            </div>
            <div className={'help-row'}>
              {/* <Icon type="mail" theme="filled"/> {address.email} */}
            </div>
            <div className={'help-row'}>
              <img src={teamview} />
              <a
                href="https://dl.teamviewer.com/download/version_15x/TeamViewer_Setup_x64.exe"
                target="_blank"
              >
                Tải phần mềm Teamview
              </a>
            </div>
            <div className={'help-row'}>
              <img src={ultraview} />
              <a
                href="https://dl2.ultraviewer.net/UltraViewer_setup_6.4_vi.exe"
                target="_blank"
              >
                Tải phần mềm Ultraview
              </a>
            </div>
          </div>
        </div>
      </SignInWrapper>
    ) : null;
  }
}

export default connect(
  (state) => ({
    reducerToken: state.Auth.user,
    //da dang nhap khi co reduce idToken hoac co localStore
  }),
  {login, clearMenu, getNotifications, getHuongDan, checkIframeSuccess},
)(SignIn);
