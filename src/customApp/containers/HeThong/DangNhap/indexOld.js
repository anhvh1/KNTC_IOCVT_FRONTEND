import React, { Component, useRef } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Input,
} from "../../../../components/uielements/exportComponent";
import authAction from "../../../../redux/auth/actions";
import appAction from "../../../../redux/app/actions";
import { Row, Col, Tooltip, Modal, message, Checkbox } from "antd";
// import dangImage from '../../../../image/dang.png';
// import iconGo from "../../../../image/logo_gosol.png";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import api from "./config";
import { isFullLocalStorage } from "../../../../helpers/utility";
import SignInWrapper from "./styled";
import teamview from "../../../../image/teamview-icon.png";
import ultraview from "../../../../image/ultraview-icon.png";
import { getConfigLocal } from "../../../../helpers/utility";
import queryString from "query-string";
import { ThongTinChung } from "../../../../settings/constants";
import { ReloadOutlined } from "@ant-design/icons";
const { login } = authAction;
import Logo from "../../../../image/thanhtra.png";
const { clearMenu, getNotifications, getHuongDan, checkIframeSuccess } =
  appAction;
const date = new Date();
const currentYear = date.getFullYear();
import ReCAPTCHA from "react-google-recaptcha";
import Phone from "../../../../image/phone.svg";

import Mail from "../../../../image/Subtract.svg";
import Screen from "../../../../image/screen.svg";
import Union from "../../../../image/Union.svg";
class SignIn extends Component {
  constructor(props) {
    super(props);
    document.title = "Đăng nhập";
    this.canvasRef = React.createRef();
    const filterData = queryString.parse(this.props.location.search);
    this.state = {
      confirmLoading: false,
      checkCapCha: false,
      username: "",
      password: "",
      messageError: "",
      TenDonVi: "",
      capcha: "",
      srcCapcha: "",
      email: "",
      capchainput: "",
      isCapChaSuccess: false,
      address: {
        phoneNumber: "----.----.---",
        fax: "----.----.---",
        email: "----@gosol.com.vn",
      },
      luuThongTin: false,
    };
    this.capchaRef = React.createRef();
  }

  //Get initData---------------------------------------------
  componentDidMount = async () => {
    document.title = "Thanh tra, kiểm tra";
    this.RegCapCha();
    this.getThongTinHoTro();

    let url = new URL(window.location.href);
    const { client_id, client_secret, urlSend, redirect_uri, checkCapCha } =
      this.state;
  };

  getThongTinHoTro = async () => {
    try {
      const ThongTinHoTro = await api.getDataConfig({
        ConfigKey: "Thong_Tin_Ho_Tro",
      });
      const TenDonVi = await api.getDataConfig({ ConfigKey: "Ten_Don_Vi" });
      let addressArray = ThongTinHoTro.data.Data.ConfigValue.split(";", 3);
      this.setState({
        TenDonVi: TenDonVi,
        address: {
          phoneNumber: addressArray[0] ? addressArray[0] : "----.----.---",
          fax: addressArray[1] ? addressArray[1] : "----.----.---",
          email: addressArray[2] ? addressArray[2] : "----@gosol.com.vn",
        },
      });
    } catch (e) {
      message.error(e.toString());
    }
  };

  handleLogin = () => {
    const { capchainput, capcha, checkCapCha } = this.state;
    this.setState({ confirmLoading: true }, () => {
      // if (capchainput === '' && checkCapCha) {
      //   this.setState({
      //     confirmLoading: false,
      //   });
      //   message.destroy();
      //   message.warning('Chưa nhập mã xác thực');
      //   return;
      // }
      // if (capcha !== capchainput && checkCapCha) {
      //   this.setState({
      //     confirmLoading: false,
      //   });
      //   message.destroy();
      //   message.warning('Mã xác thực không chính xác');
      //   return;
      // }
      setTimeout(() => {
        const username = this.state.username;
        const password = this.state.password;
        //check api
        if (username && password) {
          const data = {
            UserName: username,
            Password: password,
            Captcha: "",
            Email: "",
            Ticket: "",
          };
          api
            .dangNhap(data)
            .then((response) => {
              if (response.data.Status > 0) {
                const { luuThongTin } = this.state;
                luuThongTin && this.luuThongTinDangNhap();
                this.setState(
                  {
                    confirmLoading: false,
                    username: "",
                    password: "",
                    messageError: "",
                  },
                  () => {
                    const { login, clearMenu, getNotifications, getHuongDan } =
                      this.props;
                    login(response.data);
                    clearMenu();
                  }
                );
              } else {
                this?.capchaRef?.current?.reset();
                message.destroy();
                message.warning(response.data.Message);
                this.setState({
                  confirmLoading: false,
                  messageError: response.data.Message,
                });
                const checkCapCha = response.data.Captcha;
                if (checkCapCha) {
                  this.setState({ checkCapCha: true });
                  this.RegCapCha();
                }
              }
            })
            .catch((error) => {
              this?.capchaRef?.current?.reset();
              this.systemError();
            });
        } else {
          this?.capchaRef?.current?.reset();
          this.setState({
            confirmLoading: false,
            messageError: "Vui lòng nhập đầy đủ thông tin!",
          });
        }
      }, 500);
    });
  };

  handleCAS = () => {
    window.location =
      "https://cas.baria-vungtau.gov.vn/cas/login?service=https%3a%2f%2fcasclient%3a9008%2fRestricted%2fAuthenticatedUsersOnly%2f&renew=true";
  };

  setUsername = (value) => {
    this.setState({ username: value });
  };

  setPassword = (value) => {
    this.setState({ password: value });
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  handleCheckLoginIframe = (searchUrl) => {
    if (searchUrl && searchUrl?.UserName && searchUrl.TicKet) {
      const Username = searchUrl?.UserName;
      const TicKet = searchUrl.TicKet;
      const HrefLink = searchUrl.HrefLink;
      const data = { Username, TicKet };
      api
        .dangNhap(data)
        .then((response) => {
          if (response.data.Status > 0) {
            const { luuThongTin } = this.state;
            luuThongTin && this.luuThongTinDangNhap();
            this.setState(
              {
                confirmLoading: false,
                username: "",
                password: "",
                messageError: "",
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
                login({ ...response.data, isIframe: true, HrefLink: HrefLink });
              }
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
      title: "Không thể đăng nhập",
      content: "Hệ thống đang trong quá trình bảo trì, vui lòng quay lại sau!",
    });
  };

  luuThongTinDangNhap = () => {};

  RegCapCha = () => {
    if (this.canvasRef.current) {
      let capcha = "";
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
      const tCtx = this.canvasRef.current.getContext("2d");
      tCtx.canvas.width = tCtx.measureText(capcha).width + 30;
      tCtx.canvas.height = 12;
      tCtx.fillStyle = "#fff";
      tCtx.font = "10px";
      for (let i = 0; i < capcha.length; i++) {
        tCtx.font = "12px Arial"; // Đặt font và kích thước chữ
        tCtx.fillText(capcha[i], i * (5 + letterSpacing), 10); // Vẽ chữ với khoảng cách
      }
      // tCtx.fillText(capcha, 20, 8);
      const srcCapcha = tCtx.canvas.toDataURL();
      this.setState({ capcha, srcCapcha });
    }
  };
  changeCapcha = (e) => {
    const capchainput = e.target.value;
    this.setState({ capchainput });
  };

  onChange = (response) => {
    console.log(response, "response");
    this.setState({ isCapChaSuccess: true });
  };
  render() {
    const from = { pathname: "/dashboard/dashboard" };
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

    const { TenDonVi, address, luuThongTin, messageError, stateCapCha } =
      this.state;
    const { capcha, capchainput, srcCapcha } = this.state;

    return (
      <SignInWrapper>
        <div className="login-container">
          {/* <div className="login-left">
            <div className="copyright">
              Phát triển bởi GOSOLUTION JSC - 2024
            </div>
          </div> */}
          <div className="login-wrapper">
            <div className="login-header">
              <img src={Logo} alt="logo" className="logo" />
              <div className="header-text">
                <h1>HỆ THỐNG QUẢN LÝ CÔNG TÁC THANH TRA, KIỂM TRA</h1>
                <h2>THANH TRA TỈNH QUẢNG TRỊ</h2>
              </div>
            </div>
            <div className="login-form">
              <Input
                className="input-form"
                // prefix={<UserOutlined />}
                placeholder="Tên người dùng"
                value={this.state.username}
                onChange={(e) => this.setUsername(e.target.value)}
                // onKeyUp={this._handleKeyDown}
              />
              <Input
                className="input-form"
                // prefix={<LockOutlined />}
                type="password"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={(e) => this.setPassword(e.target.value)}
                // onKeyUp={this._handleKeyDown}
              />
              <div className="forgot-password">
                <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
              </div>
              <div className="recaptcha-container">
                <ReCAPTCHA
                  sitekey="6LcqdEUqAAAAACyZ9QZ0NrJdkwn7kXtof2hSjzVG"
                  onChange={this.onChange}
                  size="normal"
                  theme="light"
                  class="g-recaptcha"
                  hl="vi"
                  ref={this.capchaRef}
                />
              </div>

              {/* <Checkbox>Tôi không phải là người máy</Checkbox> */}
              <Button
                type="primary"
                onClick={this.handleLogin}
                loading={this.state.confirmLoading}
                disabled={!this.state.isCapChaSuccess}
              >
                ĐĂNG NHẬP
              </Button>
            </div>
            <div className="support-info">
              <h4>Hỗ trợ</h4>
              <p>
                <img src={Phone} alt="Phone" /> {address.phoneNumber}
              </p>
              <p>
                <img src={Mail} alt="Mail" /> {address.email}
              </p>
              <p>
                <img src={Screen} alt="Screen" />
                <a
                  href="https://dl.teamviewer.com/download/version_15x/TeamViewer_Setup_x64.exe"
                  target="_blank"
                >
                  Tải phần mềm Teamview
                </a>
              </p>
              <p>
                <img src={Union} alt="Screen" />
                <a
                  href="https://dl2.ultraviewer.net/UltraViewer_setup_6.4_vi.exe"
                  target="_blank"
                >
                  Tải phần mềm Ultraview
                </a>
              </p>
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
  { login, clearMenu, getNotifications, getHuongDan, checkIframeSuccess }
)(SignIn);
