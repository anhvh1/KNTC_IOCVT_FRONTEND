import styled from "styled-components";
import { palette } from "styled-theme";
import { transition, borderRadius, boxShadow } from "../../settings/style-util";
import WithDirection from "../../settings/withDirection";
import schedule from "../../image/schedule.jpg";
const TopbarWrapper = styled.div`
  html {
    font-size: 14px;
  }

  .popupSubMenuInline {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .ant-menu-submenu-popup {
    background: red;
  }
  .ant-menu-submenu-title {
    display: flex;
    align-items: center;

    height: 45px;
    color: #fff;
    p {
      color: #fff;
    }
  }
  .ant-menu-item {
    display: flex;
    align-items: center;
    top: 0 !important;
    margin-top: 0 !important;
  }
  .ant-menu {
  }
  .menu_topbar {
    width: 100%;
  }
  .isomorphicTopbar {
    z-index: 3;
    padding: 0;
    /* height: 64px; */
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* background-image: linear-gradient(
      to right,
      rgba(8, 85, 190, 0.9) 70%,
      rgba(255, 255, 255, 0.9)
    ); */
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border: 1px solid #bcbcbc; */

    ${transition()}
    position: fixed;
    width: 100%;

    .wrapper-topbar {
      padding: 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: rgba(25, 101, 198, 1);
      position: relative;
      z-index: 0;
      display: grid;
      grid-template-columns: 80% 20%;
    }

    @media only screen and (max-width: 767px) {
      /* padding: 0px 15px 0px 15px !important; */
    }

    @media only screen and (max-width: 1200px) {
      /* display: none; */
      &::after {
        display: none;
      }
      .isoGuide {
      }
    }

    /* &.collapsed {
      padding: 0 31px 0 15px;
      @media only screen and (max-width: 767px) {
        padding: 0px 15px !important;
      }
    } */
    .siteName_topbar {
      display: flex;
      align-items: center;
      font-size: min(0.9rem, 4vh);
      font-weight: bold;
      /* color: ${palette("text", 5)}; */
      text-transform: uppercase;
      color: #fff;
      position: relative;

      .ion-android-notifications {
        color: #fff;
      }
      @media only screen and (max-width: 1200px) {
        /* display: none; */
      }
    }
    .isoGuide .anticon,
    .isoIconWrapper i {
      color: ${palette("primary", 16)} !important;
      @media only screen and (max-width: 1200px) {
        color: ${palette("primary", 18)} !important;
      }
    }

    .isoLeft {
      /* display: flex;
      align-items: center; */
      min-width: 1000px;
      /* min-width: max-content;
      position: relative;
      column-gap: 10px; */

      .left {
        display: flex;
        .title_topbar {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: min(5px, 1.7vh);
          line-height: 1;
          /* font-size: 12px; */
          color: #fff;
          p + p {
            text-transform: uppercase;
            margin-top: 2px;
            color: yellow;
            font-size: min(0.8rem, 3.5vh);
          }
        }
      }

      .triggerHeader {
        /* color: ${palette("text", 5)}; */
        color: #000;
        display: inline-block;
        font-size: 16px;

        @media only screen and (max-width: 500px) {
          display: none;
        }
      }

      .link-topbar {
        display: flex !important;
        align-items: center;
        justify-content: center;

        img {
          width: min(13vh, 50px);
          max-width: 40px;
          display: inline-block;
          margin-right: 10px;
        }
      }

      .triggerBtn {
        width: ${(props) =>
          props?.SidebarWidth ? `${props.SidebarWidth}px` : "24px"};
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: ${palette("primary", 16)};
        color: #000;
        border: 0;
        outline: 0;
        position: relative;
        cursor: pointer;
        display: none;

        &:before {
          content: "\f20e";
          font-family: "Ionicons";
          font-size: 26px;
          color: inherit;
          line-height: 0;
          position: absolute;
        }

        @media only screen and (max-width: 500px) {
          display: block;
        }
      }
    }

    .isoRight {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;
      .question-circle {
        color: #fff;
      }
      li {
        cursor: pointer;
        line-height: normal;
        position: relative;
        display: inline-block;

        @media only screen and (max-width: 360px) {
          margin-left: ${(props) =>
            props["data-rtl"] === "rtl" ? "25px" : "0"};
          margin-right: ${(props) =>
            props["data-rtl"] === "rtl" ? "0" : "25px"};
        }

        &:last-child {
          margin: 0;
        }

        i {
          font-size: 24px;
          color: ${palette("text", 0)};
          line-height: 1;
        }

        .isoIconWrapper {
          position: relative;
          line-height: normal;

          span {
            font-size: 12px;
            color: #fff;
            background-color: ${palette("secondary", 1)};
            width: 20px;
            height: 20px;
            display: -webkit-inline-flex;
            display: -ms-inline-flex;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 20px;
            position: absolute;
            top: -8px;
            left: ${(props) =>
              props["data-rtl"] === "rtl" ? "inherit" : "10px"};
            right: ${(props) =>
              props["data-rtl"] === "rtl" ? "10px" : "inherit"};
            ${borderRadius("50%")};
          }
        }

        &.isoNotify {
          .isoIconWrapper {
            span {
              background-color: ${palette("primary", 2)};
            }
          }
        }

        &.isoUser {
          .wrapper-user {
            /* padding: 8px 15px; */
            /* border-radius: 20px; */
            /* background: #fff; */
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            /* margin-right: 20px; */
          }
          .isoImgWrapper {
            height: 30px;
            width: 30px;
            background-color: ${palette("grayscale", 9)};
            ${borderRadius("50%")};
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              height: 15px;
              width: 15px;
              /* object-fit: cover; */
            }
          }
          .name {
            height: 30px;
            padding: 0 15px;
            /* width: 78px; */
            background-color: ${palette("grayscale", 9)};
            ${borderRadius("15px")};
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .isoDashboardMenu {
      background: rgb(25 101 198);
      border-inline-end: none !important;
      border-bottom: none;
      margin-right: auto;
      width: 100%;
      overflow: hidden;
      @media only screen and (max-width: 500px) {
        display: none;
      }

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .isoMenuHolder {
        align-items: center;
        color: #fff !important;
        display: flex;
        gap: 5px;
        .wrapper-content__item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        i {
          font-size: 19px;
          color: inherit;
          margin: 0 15px 0 0;
          width: 18px;
          ${transition()};
        }
        ion-icon {
          font-size: 19px;
        }
        img {
          width: 16px;
          height: 16px;
        }
      }

      .ant-menu-overflowed-submenu {
        color: #fff;
      }

      .nav-text {
        font-size: 1rem;
        color: #fff;
        ${transition()};
        line-height: 1;
        height: 12px;
      }

      .ant-menu-item-selected {
        /* background-color: ${palette("primary", 15)} !important; */
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff;
        }
      }

      .ant-menu-item:hover {
        border-radius: 6px;
      }
      .ant-menu-item a {
        color: #fff;
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: #ffffff;
          }
        }
      }

      .ant-menu-submenu-selected {
        .nav-text,
        .ant-menu-submenu-arrow {
          /* font-size: 18px; */
          font-weight: 600;
        }
        ion-icon svg {
          fill: black;
          stroke: black;
          stroke-width: 3;
        }
      }

      .ant-menu-item-selected {
        /* background-color: ${palette("primary", 15)} !important; */
        border-radius: 6px;
        /* color: #fff; */
      }
    }
  }

  .isoUserDropdown {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoUserDropdownContent {
          padding: 7px 0;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 220px;
          min-width: 160px;
          flex-shrink: 0;
          ${borderRadius("5px")};
          ${boxShadow("0 2px 10px rgba(0,0,0,0.2)")};
          ${transition()};

          .isoDropdownLink {
            font-size: 13px;
            color: ${palette("text", 1)};
            line-height: 1.1;
            padding: 7px 15px;
            background-color: transparent;
            text-decoration: none;
            display: flex;
            justify-content: flex-start;
            ${transition()};

            &:hover {
              background-color: ${palette("secondary", 6)};
            }
          }
        }
      }
    }
  }

  // Dropdown
  .ant-popover {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoDropdownContent {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 360px;
          min-width: 160px;
          flex-shrink: 0;
          ${borderRadius("5px")};
          ${boxShadow("0 2px 10px rgba(0,0,0,0.2)")};
          ${transition()};

          @media only screen and (max-width: 767px) {
            width: 310px;
          }

          .isoDropdownHeader {
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: 0px;
            padding: 15px 30px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette("text", 0)};
              text-align: center;
              text-transform: uppercase;
              margin: 0;
            }
          }

          .isoDropdownBody {
            width: 100%;
            height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            background-color: ${palette("grayscale", 6)};

            .isoDropdownListItem {
              padding: 15px 30px;
              flex-shrink: 0;
              text-decoration: none;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              width: 100%;
              ${transition()};

              &:hover {
                background-color: ${palette("grayscale", 3)};
              }

              .isoListHead {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
              }

              h5 {
                font-size: 13px;
                font-weight: 500;
                color: ${palette("text", 0)};
                margin-top: 0;
              }

              p {
                font-size: 12px;
                font-weight: 400;
                color: ${palette("text", 2)};
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .isoDate {
                font-size: 11px;
                color: ${palette("grayscale", 1)};
                flex-shrink: 0;
              }
            }
          }

          .isoViewAllBtn {
            font-size: 13px;
            font-weight: 500;
            color: ${palette("text", 2)};
            padding: 10px 15px 20px;
            display: flex;
            text-decoration: none;
            align-items: center;
            justify-content: center;
            text-align: center;
            ${transition()};

            &:hover {
              color: ${palette("primary", 0)};
            }
          }

          .isoDropdownFooterLinks {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 30px 20px;

            a {
              font-size: 13px;
              font-weight: 500;
              color: ${palette("text", 0)};
              text-decoration: none;
              padding: 10px 20px;
              line-height: 1;
              border: 1px solid ${palette("border", 1)};
              display: flex;
              align-items: center;
              justify-content: center;
              ${transition()};

              &:hover {
                background-color: ${palette("primary", 0)};
                border-color: ${palette("primary", 0)};
                color: #ffffff;
              }
            }

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette("text", 0)};
              line-height: 1.3;
            }
          }

          &.withImg {
            .isoDropdownListItem {
              display: flex;
              flex-direction: row;

              .isoImgWrapper {
                width: 35px;
                height: 35px;
                overflow: hidden;
                margin-right: 15px;
                display: -webkit-inline-flex;
                display: -ms-inline-flex;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background-color: ${palette("grayscale", 9)};
                ${borderRadius("50%")};

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .isoListContent {
                width: 100%;
                display: flex;
                flex-direction: column;

                .isoListHead {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                }

                h5 {
                  margin-bottom: 0;
                  padding-right: 15px;
                }

                .isoDate {
                  font-size: 11px;
                  color: ${palette("grayscale", 1)};
                  flex-shrink: 0;
                }

                p {
                  white-space: normal;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }

    &.topbarMail {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 519px) {
              right: -170px;
            }
          }
        }
      }
    }

    &.topbarMessage {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -69px;
            }
          }
        }
      }
    }

    &.topbarNotification {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -120px;
            }
          }
        }
      }
    }

    &.topbarAddtoCart {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 465px) {
              right: -55px;
            }

            .isoDropdownHeader {
              margin-bottom: 0;
            }

            .isoDropdownBody {
              background-color: ${palette("grayscale", 6)};
            }
          }
        }
      }
    }
  }
  @media only screen and (max-height: 768px) {
  }
`;

export default WithDirection(TopbarWrapper);
