import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import appAction from '../../redux/app/actions';
import SignInStyleWrapper from './signin.style';
import {Row, Col, Tooltip, Modal, Input, message} from 'antd';
import dangImage from '../../image/dang.png';
import iconGo from '../../image/logo_gosol.png';
import api from './config';
import {isFullLocalStorage} from '../../helpers/utility';

const {login} = authAction;
const {clearMenu, getNotifications, getHuongDan} = appAction;
const date = new Date();
const currentYear = date.getFullYear();

class SignIn extends Component {
  state = {
    confirmLoading: false,
    username: '',
    password: '',
    messageError: '',
    TenDonVi: '',
    address: {
      phoneNumber: '----.----.---',
      fax: '----.----.---',
      email: '----@gosol.com.vn',
    },
  };

  //Get initData---------------------------------------------
  componentDidMount = async () => {
    document.title = 'Khiếu nại tố cáo';
    // let ticket = window.location.href.split('=')[1];
    // let email = window.location.href.split('=')[2];
    let url = new URL(window.location.href);
    let ticket = url.searchParams.get('ticket');
    let email = url.searchParams.get('email');
    this.setState({confirmLoading: true}, () => {
      if (email != null && email != '') {
        const data = {
          UserName: '',
          Password: '',
          Email: email,
          Ticket: ticket,
        };
        api
          .dangNhap(data)
          .then((response) => {
            if (response.data.Status > 0) {
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
                  login(data);
                  clearMenu();
                  getNotifications();
                  getHuongDan();
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
        });
      }
    });
    try {
      const ThongTinHoTro = await api.getDataConfig({
        ConfigKey: 'Thong_Tin_Ho_Tro',
      });
      const TenDonVi = await api.getDataConfig({ConfigKey: 'Ten_Don_Vi'});
      if (ThongTinHoTro.data.Status > 0 && TenDonVi.data.Status > 0) {
        let addressArray = ThongTinHoTro.data.Data.ConfigValue.split(';', 3);
        this.setState({
          TenDonVi: TenDonVi.data.Data.ConfigValue,
          address: {
            phoneNumber: addressArray[0] ? addressArray[0] : '----.----.---',
            fax: addressArray[1] ? addressArray[1] : '----.----.---',
            email: addressArray[2] ? addressArray[2] : '----@gosol.com.vn',
          },
        });
      }
    } catch (e) {
      message.error(e.toString());
    }

    // api.getDataConfig({ConfigKey: "Thong_Tin_Ho_Tro"})
    //   .then(response => {
    //     if (response.data.Status > 0 && response.data.Data.ConfigValue) {
    //       //addressString -> sdt;fax;email
    //       let addressArray = response.data.Data.ConfigValue.split(";", 3);
    //       api.getDataConfig({ConfigKey: "Ten_Don_Vi"})
    //         .then(response2 => {
    //           if (response2.data.Status > 0) {
    //             this.setState({
    //               TenDonVi: response2.data.Data.ConfigValue,
    //               address: {
    //                 phoneNumber: addressArray[0] ? addressArray[0] : "----.----.---",
    //                 fax: addressArray[1] ? addressArray[1] : "----.----.---",
    //                 email: addressArray[2] ? addressArray[2] : "----@gosol.com.vn",
    //               }
    //             });
    //           }
    //         });
    //     }
    //   });
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

  handleCAS = () => {
    window.location =
      'https://cas.baria-vungtau.gov.vn/cas/login?service=https%3a%2f%2fcasclient%3a9008%2fRestricted%2fAuthenticatedUsersOnly%2f&renew=true';
    // window.location="https://cas.baria-vungtau.gov.vn/cas/login?service=https%3a%2f%2flocalhost%3a44337%2fRestricted%2fAuthenticatedUsersOnly%2f&renew=true";
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

  systemError = () => {
    this.setState({
      confirmLoading: false,
    });
    Modal.error({
      title: 'Không thể đăng nhập',
      content: 'Đã có lỗi xảy ra ...',
    });
  };

  render() {
    const from = {pathname: '/dashboard'};
    //reduxStorage data -> this.props.reducerToken
    const reduxStorageNotNull = this.props.reducerToken !== null;
    const localStorageNotNull = isFullLocalStorage();
    const isLoggedIn = reduxStorageNotNull || localStorageNotNull;
    if (isLoggedIn) {
      return <Redirect to={from} />;
    } else {
      localStorage.clear();
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <Row style={{width: '100%', height: '100%'}} type="flex" align="middle">
          <Col
            xs={0}
            sm={0}
            lg={13}
            style={{height: '100%'}}
            className="colInfo"
          >
            <div className="divInfo">
              <img src={dangImage} alt="" />
              <h3>{this.state.TenDonVi.toUpperCase()}</h3>
              <br />
              <h2>PHẦN MỀM</h2>
              <h2>
                PHẦN MỀM QUẢN LÝ CÔNG TÁC TIẾP DÂN, XỬ LÝ ĐƠN VÀ GIẢI QUYẾT
                KHIẾU NẠI, TỐ CÁO
              </h2>
              <br />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button className="buttonIcon" shape="circle" />
                  <Button className="buttonContent" style={{width: '121px'}}>
                    <div>ĐIỆN THOẠI</div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: 'white',
                        marginTop: '-5px',
                      }}
                    >
                      {this.state.address.phoneNumber}
                    </div>
                  </Button>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button className="buttonIcon" shape="circle" />
                  <Button className="buttonContent" style={{width: '121px'}}>
                    <div>FAX</div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: 'white',
                        marginTop: '-5px',
                      }}
                    >
                      {this.state.address.fax}
                    </div>
                  </Button>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <Button className="buttonIcon" shape="circle" />
                <Button className="buttonContent" style={{width: '277px'}}>
                  <div>Email</div>
                  <div
                    style={{
                      fontSize: '15px',
                      color: 'white',
                      marginTop: '-5px',
                    }}
                  >
                    {this.state.address.email}
                  </div>
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} lg={11} className="colLogin">
            <div className="isoLoginContentWrapper">
              <div className="isoLoginContent">
                <div className="isoSignInForm">
                  {this.state.messageError ? (
                    <div className="divMessage">{this.state.messageError}</div>
                  ) : (
                    ''
                  )}
                  <div className="isoInputWrapper">
                    <label>Tài khoản</label>
                    <Input
                      size="large"
                      placeholder="Tên đăng nhập"
                      name="username"
                      autocomplete="off"
                      autoFocus
                      defaultValue={this.state.username}
                      value={this.state.username}
                      onChange={(input) => this.setUsername(input.target.value)}
                      onKeyDown={this._handleKeyDown}
                      suffix={
                        <Tooltip title="">
                          {/* <Icon type="user" style={{color: 'rgba(0,0,0,.45)'}}/> */}
                        </Tooltip>
                      }
                    />
                  </div>

                  <div className="isoInputWrapper">
                    <label>Mật khẩu</label>
                    <Input
                      size="large"
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      visibilityToggle="true"
                      defaultValue={this.state.password}
                      value={this.state.password}
                      onChange={(input) => this.setPassword(input.target.value)}
                      onKeyDown={this._handleKeyDown}
                      suffix={
                        <Tooltip title="">
                          {/* <Icon type="lock" style={{color: 'rgba(0,0,0,.45)'}}/> */}
                        </Tooltip>
                      }
                    />
                  </div>

                  <div className="isoInputWrapper isoButtonLogin">
                    <Button
                      type="primary"
                      onClick={this.handleLogin}
                      loading={this.state.confirmLoading}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                  {/*<div className="isoInputWrapper isoButtonLogin">*/}
                  {/*  <Button type="primary" onClick={this.handleCAS} loading={this.state.confirmLoading}>*/}
                  {/*    CAS*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                  <div className="addressOther">
                    <p>
                      Điện thoại: {this.state.address.phoneNumber} - Fax:{' '}
                      {this.state.address.fax}
                    </p>
                    <p>Email: {this.state.address.email}</p>
                  </div>
                  <div className="isoInputWrapper isoLeftRightComponent">
                    <span>
                      <a
                        href="https://www.teamviewer.com/"
                        target="_blank"
                        className="linkDownload"
                      >
                        <i>Tải phần mềm Teamview</i>
                      </a>
                      <br />
                      <a
                        href="https://ultraviewer.net/vi/download.html"
                        target="_blank"
                        className="linkDownload"
                      >
                        <i>Tải phần mềm Ultraview</i>
                      </a>
                    </span>
                    <Link to="/quen-mat-khau" className="isoForgotPass">
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="footer">
          <img src={iconGo} alt="" width={40} />
          <i>Copyright © {currentYear} GO SOLUTIONS. All rights</i>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  (state) => ({
    reducerToken: state.Auth.user,
    //da dang nhap khi co reduce idToken hoac co localStore
  }),
  {login, clearMenu, getNotifications, getHuongDan},
)(SignIn);
