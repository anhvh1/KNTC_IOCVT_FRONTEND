import React, {Component, useRef} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Input} from '../../../../components/uielements/exportComponent';
import authAction from '../../../../redux/auth/actions';
import appAction from '../../../../redux/app/actions';
import {Row, Col, Tooltip, Modal, message, Checkbox} from 'antd';
// import dangImage from '../../../../image/dang.png';
// import iconGo from "../../../../image/logo_gosol.png";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import api from './config';
import {isFullLocalStorage} from '../../../../helpers/utility';
import SignInWrapper from './styled';
import teamview from '../../../../image/teamview-icon.png';
import ultraview from '../../../../image/ultraview-icon.png';
import {getConfigLocal} from '../../../../helpers/utility';
import queryString from 'query-string';
import {ThongTinChung} from '../../../../settings/constants';
import {ReloadOutlined} from '@ant-design/icons';
const {login} = authAction;
import Logo from '../../../../image/thanhtra.png';
const {clearMenu, getNotifications, getHuongDan, checkIframeSuccess} =
  appAction;
const date = new Date();
const currentYear = date.getFullYear();

class SignIn extends Component {
  constructor(props) {
    super(props);
    document.title = 'Đăng nhập';
    this.canvasRef = React.createRef();
    const filterData = queryString.parse(this.props.location.search);
    this.state = {
      confirmLoading: false,
      checkCapCha: false,
      username: '',
      password: '',
      messageError: '',
      TenDonVi: '',
      capcha: '',
      srcCapcha: '',
      email: '',
      capchainput: '',
      address: {
        phoneNumber: '----.----.---',
        fax: '----.----.---',
        email: '----@gosol.com.vn',
      },
      luuThongTin: false,
    };
  }

  //Get initData---------------------------------------------
  componentDidMount = async () => {
    document.title = 'Khiếu nại tố cáo';
    this.RegCapCha();
    this.getThongTinHoTro();

    let url = new URL(window.location.href);
    const {client_id, client_secret, urlSend, redirect_uri, checkCapCha} =
      this.state;
    const isLogginSSO = this.state.isLogginSSO;
    console.log(isLogginSSO, 'isLogginSSO');
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
  };

  getThongTinHoTro = async () => {
    try {
      const ThongTinHoTro = ThongTinChung.ThongTinHoTro;
      const TenDonVi = ThongTinChung.TenDonVi;
      let addressArray = ThongTinHoTro.split(';', 3);
      this.setState({
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
    const {capchainput, capcha, checkCapCha} = this.state;
    this.setState({confirmLoading: true}, () => {
      if (capchainput === '' && checkCapCha) {
        this.setState({
          confirmLoading: false,
        });
        message.destroy();
        message.warning('Chưa nhập mã xác thực');
        return;
      }
      if (capcha !== capchainput && checkCapCha) {
        this.setState({
          confirmLoading: false,
        });
        message.destroy();
        message.warning('Mã xác thực không chính xác');
        return;
      }
      setTimeout(() => {
        const username = this.state.username;
        const password = this.state.password;
        //check api
        if (username && password) {
          const data = {
            UserName: username,
            Password: password,
            Capcha: capcha,
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
                  },
                );
              } else {
                message.destroy();
                message.warning(response.data.Message);
                this.setState({
                  confirmLoading: false,
                  messageError: response.data.Message,
                });
                const checkCapCha = response.data.Captcha;
                if (checkCapCha) {
                  this.setState({checkCapCha: true});
                  this.RegCapCha();
                }
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
                login({...response.data, isIframe: true, HrefLink: HrefLink});
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
      content: 'Hệ thống đang trong quá trình bảo trì, vui lòng quay lại sau!',
    });
  };

  luuThongTinDangNhap = () => {};

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
              console.log('call SSO api');
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
                message.destroy();
                message.warning(response.data.Message);
              }
            })
            .catch((error) => {
              this.systemError();
            });
        } else {
          message.destroy();
          message.warning('Vui lòng nhập đầy đủ thông tin!');
        }
      }, 500);
    });
  };

  RegCapCha = () => {
    if (this.canvasRef.current) {
      let capcha = '';
      const capchaLength = 6;
      for (let i = 0; i < capchaLength; i++) {
        let letter = 0;
        let numorchar = Math.floor(Math.random() * 3);
        if (numorchar === 1 || numorchar === 2) {
          letter = Math.floor(Math.random() * (91 - 65)) + 65;
        }
        if (numorchar === 0) {
          letter = Math.floor(Math.random() * (58 - 48)) + 48;
        }
        letter = String.fromCharCode(letter);
        let uporlow = Math.floor(Math.random() * 2);
        if (uporlow === 1) {
          letter = letter.toString().toLowerCase();
        } else {
          letter = letter.toString();
        }
        capcha += letter;
      }
      const letterSpacing = 5;
      const tCtx = this.canvasRef.current.getContext('2d');
      tCtx.canvas.width = tCtx.measureText(capcha).width + 30;
      tCtx.canvas.height = 12;
      tCtx.fillStyle = '#fff';
      tCtx.font = '10px';
      for (let i = 0; i < capcha.length; i++) {
        tCtx.font = '12px Arial'; // Đặt font và kích thước chữ
        tCtx.fillText(capcha[i], i * (5 + letterSpacing), 10); // Vẽ chữ với khoảng cách
      }
      // tCtx.fillText(capcha, 20, 8);
      const srcCapcha = tCtx.canvas.toDataURL();
      this.setState({capcha, srcCapcha});
    }
  };
  changeCapcha = (e) => {
    const capchainput = e.target.value;
    this.setState({capchainput});
  };

  render() {
    // let url = new URL(window.location.href);
    const {client_id, client_secret, urlSend, redirect_uri, checkCapCha} =
      this.state;
    // const isLogginSSO = this.state.isLogginSSO;
    // if (!isLogginSSO) {
    //   let code = url?.searchParams?.get('code');
    //   let session_state = url?.searchParams?.get('session_state');
    //   if (code && session_state) {
    //     const data = {
    //       code,
    //       session_state,
    //     };
    //     this.handleLoginSSO(data);

    //     localStorage.setItem(
    //       'SSO_DATA',
    //       JSON.stringify({
    //         code,
    //         session_state,
    //       }),
    //     );
    //   } else if (urlSend) {
    //     let params = {
    //       client_id,
    //       client_secret,
    //       redirect_uri,
    //       response_type: 'code',
    //       scope: 'openid',
    //     };
    //     let queryString = Object.keys(params)
    //       .reduce((result, current) => {
    //         return (result += `${current}=${params[current]}&`);
    //       }, '')
    //       .slice(0, -1);
    //     window.location.href = `${urlSend}?${queryString}`;
    //   }
    // }
    const from = {pathname: '/dashboard'};
    //reduxStorage data -> this.props.reducerToken
    const reduxStorageNotNull = this.props.reducerToken !== null;
    const localStorageNotNull = isFullLocalStorage();
    let isLoggedIn;
    const value =
      this.props.location?.state?.from?.search || this.props.location.search;
    const searchUrl = queryString.parse(value);
    const refUrl = document.referrer;
    isLoggedIn = reduxStorageNotNull || localStorageNotNull;
    if (isLoggedIn) {
      return <Redirect to={from} />;
    } else {
      localStorage.clear();
    }

    const isDisabledLoggin =
      searchUrl && searchUrl?.UserName && searchUrl.TicKet ? true : false;

    const {TenDonVi, address, luuThongTin, messageError, stateCapCha} =
      this.state;
    const {capcha, capchainput, srcCapcha} = this.state;

    const isLogginSSO = this.state.isLogginSSO;
    console.log(isLogginSSO, 'isLogginSSO');
    return (
      <SignInWrapper>
        <Row>
          <Col style={{height: '100%'}} xs={24}>
            <div className={'header'}>
              <div className="header-top">
                <div className="header-logo">
                  <img src={Logo} alt="logo" />
                  <div className="desc-logo">
                    <p>UBND TỈNH VĨNH PHÚC</p>
                    <p>THANH TRA TỈNH</p>
                  </div>
                </div>
                <div className="header-wrapper">
                  <div className={'header-title'}>
                    <div className="wrapper-top__title">
                      <p>
                        PHẦN MỀM QUẢN LÝ CÔNG TÁC TIẾP DÂN, XỬ LÝ ĐƠN
                        <br /> VÀ GIẢI QUYẾT KHIẾU NẠI, TỐ CÁO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-background"></div>
              <div className="tabs-right">
                <div className="wrap">
                  <Link to={'/tra-cuu'}>
                    <Button>Tra cứu</Button>
                  </Link>
                  <div className="wrapp-img">
                    <a
                      href="https://tinnhiemmang.vn/danh-ba-tinnhiem/kntcvinhphucgovvn-1700545022hsltvinhlonggovvn-1699588324"
                      title="Chung nhan Tin Nhiem Mang"
                      target="_blank"
                    >
                      <img
                        src="https://tinnhiemmang.vn/handle_cert?id=kntc.vinhphuc.gov.vn"
                        alt="Chung nhan Tin Nhiem Mang"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className={'main-wrapper'}>
          <div className="main-content">
            <div className={'main-login'}>
              <div className="main-login__title">
                <div class={'title'}>
                  <UserOutlined style={{fontSize: '30px'}} />
                  Đăng nhập
                </div>
              </div>
              <div className="main-login__form">
                <div className={'main-icon'}>{/* <Icon type={'team'}/> */}</div>
                <div className={'input '}>
                  <div className="account_input">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder={'Tài khoản'}
                      onChange={(input) => this.setUsername(input.target.value)}
                      onKeyUp={this._handleKeyDown}
                      value={this.state.username}
                      autoFocus
                    />
                  </div>
                  <div className="password_input">
                    <Input
                      prefix={<LockOutlined />}
                      placeholder={'Mật khẩu'}
                      type="password"
                      value={this.state.password}
                      onChange={(input) => {
                        this.setPassword(input.target.value);
                      }}
                      onKeyUp={this._handleKeyDown}
                      className="password_input"
                    />
                  </div>
                  <canvas ref={this.canvasRef} style={{display: 'none'}} />
                  {checkCapCha ? (
                    <div className="confirm">
                      <div className={'input'}>
                        <div className={'group'}>
                          <Input
                            prefix={<LockOutlined />}
                            placeholder={'Mã xác thực'}
                            onChange={this.changeCapcha}
                            value={capchainput}
                          />

                          <img src={srcCapcha} className={'capcha-img'} />
                          <ReloadOutlined onClick={this.RegCapCha} />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className={'button btn-login'}>
                  <Button
                    onClick={this.handleLogin}
                    loading={this.state.confirmLoading}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className={'sub-login'}>
                  {/* <div className={'forgot'}>
                    <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
                  </div> */}
                  <div className={'forgot'}>
                    <Link to="/tra-cuu">Tra cứu kết quả giải quyết</Link>
                  </div>
                </div>
                {/* <div className={'text-error'} style={{marginTop: '10px'}}>
                  {messageError}
                </div> */}
              </div>
            </div>
            <div className={'helper'}>
              <div class={'help-title'}>Hỗ trợ</div>
              <div className={'help-row'}>
                <PhoneOutlined /> {address.phoneNumber}
              </div>
              <div className={'help-row'}>
                <MailOutlined /> {address.email}
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
        </div>
      </SignInWrapper>
    );
  }
}

export default connect(
  (state) => ({
    reducerToken: state.Auth.user,
    //da dang nhap khi co reduce idToken hoac co localStore
  }),
  {login, clearMenu, getNotifications, getHuongDan, checkIframeSuccess},
)(SignIn);
