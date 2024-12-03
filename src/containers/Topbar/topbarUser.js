import React, { Component } from "react";
import { connect } from "react-redux";
import Popover from "../../components/uielements/popover";
import IntlMessages from "../../components/utility/intlMessages";
import defaultAvatar from "../../image/defaultAvatar.jpeg";
import authAction from "../../redux/auth/actions";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import { Link } from "react-router-dom";
import { store } from "../../redux/store";
import { ModalChangePassword } from "./modalChangePassword";
import { getLocalKey } from "../../helpers/utility";
import vector from "../../image/Vector.png";
const { logout } = authAction;
import { formatNoiDung } from "../../helpers/utility";
class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      visibleModalChangePassword: false,
      modalKey: 0,
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  renderUser = () => {
    const userAuth = store.getState().Auth.user;
    let Ten = userAuth ? userAuth.TenNguoiDung : "";
    let Avatar = userAuth ? userAuth.AnhHoSo : null;
    if (!Ten) {
      //neu redux store chua san sang, lay data tu local store
      const userJson = localStorage?.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        Ten = user.TenNguoiDung ? user.TenNguoiDung : "";
        Avatar = user.AnhHoSo ? user.AnhHoSo : null;
      }
    }
    if (Ten.length > 15) {
      Ten = Ten.substr(0, 10) + "...";
    }
    return {
      name: Ten,
      avatar: Avatar ? Avatar : defaultAvatar,
    };
  };

  showModalChangePassword = () => {
    let modalKey = this.state.modalKey + 1;
    this.setState({
      visibleModalChangePassword: true,
      modalKey: modalKey,
    });
  };
  hideModalChangePassword = () => {
    this.setState({ visibleModalChangePassword: false });
  };

  render() {
    let currRouter = "dashboard";
    const pathname = window.location.pathname;

    if (!pathname.includes(currRouter)) {
      currRouter = "staff";
    }

    const user = getLocalKey("user", {});
    const CanBoID = user && user.CanBoID;
    const VaiTro = user && user.VaiTro;
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        {/*{VaiTro !== 1 ? <Link to={`/${currRouter}/thong-tin-can-bo?CanBoID=${CanBoID}`} onClick={this.handleVisibleChange}>*/}
        {/*  <a className="isoDropdownLink">*/}
        {/*    Thông tin cá nhân*/}
        {/*  </a>*/}
        {/*</Link> : ""}*/}
        <a className="isoDropdownLink" onClick={this.showModalChangePassword}>
          Đổi mật khẩu
        </a>
        <ModalChangePassword
          visible={this.state.visibleModalChangePassword}
          onCancel={this.hideModalChangePassword}
          logout={this.props.logout}
          key={this.state.modalKey}
        />
        <a className="isoDropdownLink" onClick={this.props.logout}>
          Đăng xuất
        </a>
      </TopbarDropdownWrapper>
    );
    const renderUser = this.renderUser();

    return (
      <Popover
        content={content}
        trigger="click"
        open={this.state.visible}
        onOpenChange={this.handleVisibleChange}
        // arrowPointAtCenter={true}
        placement="bottom"
      >
        <div style={{ display: "flex" }} className="wrapper-user">
          <div className="isoImgWrapper" style={{ display: "inline-flex" }}>
            <img alt="user" src={vector} />
          </div>
          <div className="name">
            <span style={{ color: "rgba(14, 109, 239, 1)" }}>
              {formatNoiDung(renderUser.name, 4) || "Thanh tra tỉnh"}
            </span>
          </div>
        </div>
      </Popover>
    );
  }
}

export default connect(null, { logout })(TopbarUser);
