import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition, borderRadius} from '../../settings/style-util';

const widthCollaped = '50px';
const widthCollapedMobile = '0px';
const widthExpanded = '240px';

const SidebarWrapper = styled.div`
  position: relative;
  .wrapp-img {
    position: absolute;
    bottom: 36px;
    background: #fafafa;
    width: 100%;
    z-index: 1111;
    display: flex;
    justify-content: center;
    img {
      margin: 0 auto;
      padding: 15px 10px;
      width: 130px;
      height: auto;
    }
  }
  .parent-menu {
    font-weight: 700;
  }
  .ant-tooltip-open,
  .ant-menu-title-content {
    font-size: 14px;
  }
  .ant-menu-inline .ant-menu-item {
    height: 35px;
  }
  .wrapper-content__item {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
      width: 25px;
      height: 25px;
    }
    .nav-text {
      font-weight: 600;
    }
  }
  .isomorphicSidebar {
    background: #fafafa;
    z-index: 999;
    /* background: ${palette('primary', 14)};
    color: ${palette('secondary', 1)}; */
    background: ${palette('sidebar', 0)};
    color: ${palette('sidebar', 1)};
    width: ${widthExpanded} !important;
    flex: 0 0 ${widthExpanded} !important;
    max-width: ${widthExpanded} !important;
    min-width: ${widthExpanded} !important;

    .scrollarea {
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 500px) {
      position: absolute;
      box-shadow: 12px 0 15px -4px rgba(0, 0, 0, 0.3);
      width: 100% !important;
      flex: 0 0 100% !important;
      max-width: 100% !important;
      min-width: 220px !important;
    }

    &.ant-layout-sider-collapsed {
      width: ${widthCollaped};
      min-width: ${widthCollaped} !important;
      max-width: ${widthCollaped} !important;
      flex: 0 0 ${widthCollaped} !important;

      @media only screen and (max-width: 500px) {
        width: ${widthCollapedMobile};
        min-width: ${widthCollapedMobile} !important;
        max-width: ${widthCollapedMobile} !important;
        flex: 0 0 ${widthCollapedMobile} !important;
      }
    }

    .isoLogoWrapper {
      height: 50px;
      margin: 70px 0 0 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      ${borderRadius()};

      div {
        a {
          font-size: 21px;
          line-height: 70px;
          text-transform: uppercase;
          color: ${palette('sidebar', 1)};
          /* color: ${palette('primary', 14)}; */
          display: block;
          text-decoration: none;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .isoLogoWrapper {
        padding: 0;

        background-size: 40px;
        background-repeat: no-repeat;
        background-position: center;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 15px;
      padding-bottom: 35px;
      border-inline-end: none !important;
      background: transparent;
      margin-top: 70px;
      a {
        text-decoration: none;
        display: inline-block;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100%;
      }

      .ant-menu-item {
        line-height: 17px;
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 !important;
        margin: 0;

        &::after {
          border-right: 0;
        }
      }

      .isoMenuHolder {
        display: flex;
        align-items: center;
        color: ${palette('secondary', 1)};

        i {
          font-size: 19px;
          color: inherit;
          margin: 0 30px 0 0;
          width: 18px;
          ${transition()};
        }

        ion-icon {
          color: ${palette('sidebar', 1)};
          /* color: inherit; */
          margin: 0 15px 0 10px;
          width: 24px;
          height: 24px;
          ${transition()};
        }

        &.current {
          ion-icon {
            color: ${palette('sidebar', 1)};
            /* color: ${palette('primary', 14)}; */
          }
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 14px;
        /* color: inherit; */
        color: ${palette('sidebar', 1)};
        ${transition()};
        /* color :  */
      }

      .ant-menu-submenu-inline
        .ant-menu-inline
        > .ant-menu-item:not(.ant-menu-item-group):not(
          .ant-menu-item-selected
        ):hover
        a,
      .ant-menu-submenu-vertical
        .ant-menu-inline
        > .ant-menu-item:not(.ant-menu-item-group):not(
          .ant-menu-item-selected
        ):hover
        a,
      .ant-menu-submenu-inline
        .ant-menu-submenu-vertical
        > .ant-menu-item:not(.ant-menu-item-group):not(
          .ant-menu-item-selected
        ):hover
        a,
      .ant-menu-submenu-vertical
        .ant-menu-submenu-vertical
        > .ant-menu-item:not(.ant-menu-item-group):not(
          .ant-menu-item-selected
        ):hover
        a {
        color: #000 !important;
      }
      /* .ant-menu-item-active .ant-menu-title-content {
        .nav-text {
          color: #000 !important;
        }
      } */
      .ant-menu-item-selected {
        background-color: #1058af !important;
        border-radius: 111px;
        /* background-color: ${palette('sidebar', 2)}; */
        /* background-color: ${palette('secondary', 1)} !important; */
        .anticon {
          color: #ffffff !important;
          /* color: ${palette('sidebar', 1)}; */
          /* color: ${palette('primary', 14)}; */
        }

        i {
          color: #ffffff !important;
          /* color: ${palette('sidebar', 1)}; */
          /* color: ${palette('primary', 14)}; */
        }

        ion-icon {
          color: #ffffff !important;
          /* color: ${palette('sidebar', 1)}; */
          /* color: ${palette('primary', 14)}; */
        }

        .nav-text,
        .ant-menu-title-content {
          color: #ffffff !important;
          /* color: ${palette('sidebar', 1)}; */
          /* color: ${palette('primary', 14)}; */
        }

        &::after {
          border-right: 0;
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 5)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0 !important;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          opacity: 1;
          left: auto;
          right: 25px;

          &:before,
          &:after {
            background: #999;
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: 35px !important;
          padding-right: 0px !important;
          font-size: 13px;
          font-weight: 400;
          margin: 0;
          color: inherit;
          ${transition()};

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;

        background-color: transparent !important;
      }

      &:hover {
        color: black;
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline > {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default SidebarWrapper;
