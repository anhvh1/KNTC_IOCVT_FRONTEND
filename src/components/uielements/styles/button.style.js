import styled from "styled-components";
import { palette } from "styled-theme";
import { transition } from "../../../settings/style-util";

const Buttons = (ComponentName) => styled(ComponentName)`
  &.btn-center {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  &.ant-btn {
    /* display: flex;
    align-items: center; */
    gap: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* display: inline-block; */
    margin-bottom: 0;
    font-weight: 500;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 0 8px;
    font-size: 13px;
    border-radius: 4px;
    min-width: 100px;
    height: 35px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    color: ${palette("text", 1)};
    border-color: ${palette("border", 0)};
    ${transition()};

    /* .ant-btn-icon {
      color: rgba(90, 168, 233, 1);
    } */

    .btn-icon__img {
      width: 20px;
      height: auto;
    }

    &.ant-btn::before {
      content: "${(props) => (props.contentsub ? props.contentsub : "")}";
      position: absolute;
      top: ${(props) => props.top};
      right: ${(props) => props.right};
      left: ${(props) => props.left};
      padding: 0 5px;
      bottom: ${(props) => props.bottom};
      font-size: ${(props) => (props.fontSizeSub ? props.fontSizeSub : "9px")};
      background: ${(props) => props.backgroundSub};
      color: ${(props) => (props.colorSub ? props.colorSub : "#000")};
      writing-mode: ${(props) =>
        props.mode === "vertical" ? "vertical-lr" : "none"};
      /* width: 5%; */
      transform: ${(props) =>
        props.mode === "vertical" ? "rotate(180deg)" : "none"};
      height: ${(props) => (props.mode === "vertical" ? "100%" : "none")};
      display: flex;
      justify-content: ${(props) =>
        props.center || props.mode === "vertical" ? "center" : ""};
      align-items: center;
    }

    &:hover {
      border-color: ${palette("primary", 0)};
      color: ${palette("primary", 0)};
    }

    > .anticon + span,
    > span + .anticon {
      margin: ${(props) =>
        props["data-rtl"] === "rtl" ? "0 0.5em 0 0" : "0 0 0 0.5em"};
    }

    .anticon-right {
      transform: ${(props) =>
        props["data-rtl"] === "rtl" ? "rotate(180deg)" : "rotate(0)"};
    }

    .anticon-left {
      transform: ${(props) =>
        props["data-rtl"] === "rtl" ? "rotate(180deg)" : "rotate(0)"};
    }

    &.ant-btn-icons-blue {
      background: #fff;
      .ant-btn-icon {
        color: rgba(90, 168, 233, 1) !important;
      }
    }

    &.ant-btn-add {
      background-color: ${palette("primary", 28)};
      border-color: ${palette("primary", 28)};
      color: #fff;
      &:hover {
        background-color: ${palette("primary", 29)};
        border-color: ${palette("primary", 29)};
        color: #fff;
      }
    }

    &.ant-btn-add-content {
      background-color: ${palette("primary", 32)};
      border: 1px solid rgba(229, 229, 229, 1);
      svg {
        fill: rgba(90, 168, 233, 1) !important;
      }
      &:hover {
        background-color: ${palette("primary", 33)};
        border-color: ${palette("primary", 33)};
        color: #fff;
        svg {
          fill: #fff !important;
        }
      }
    }

    &.ant-btn-primary {
      background-color: ${palette("primary", 0)};
      border-color: ${palette("primary", 0)};

      &:hover {
        background-color: ${palette("primary", 1)};
        border-color: ${palette("primary", 1)};
        color: #fff;
      }
    }

    &.ant-btn-secondary {
      background: ${palette("primary", 22)};
      border-color: ${palette("primary", 22)};
      color: ${palette("primary", 17)};
      &:hover {
        opacity: 0.8;
        background-color: ${palette("primary", 23)};
        border-color: ${palette("primary", 23)};
        color: #fff;
      }
    }

    &.ant-btn-import {
      background: ${palette("primary", 24)};
      border-color: ${palette("primary", 24)};
      color: ${palette("primary", 17)};
      &:hover {
        opacity: 0.8;
        background-color: ${palette("primary", 25)};
        border-color: ${palette("primary", 25)};
        color: #fff;
      }
    }

    &.ant-btn-checked {
      background: ${palette("primary", 30)};
      border-color: ${palette("primary", 30)};
      color: ${palette("primary", 17)};
      &:hover {
        opacity: 0.8;
        background-color: ${palette("primary", 31)};
        border-color: ${palette("primary", 31)};
        color: #fff;
      }
    }

    &.ant-btn-dowloadlist {
      background: ${palette("primary", 26)};
      border-color: ${palette("primary", 26)};
      color: ${palette("primary", 17)};
      &:hover {
        opacity: 0.8;
        background-color: ${palette("primary", 27)};
        border-color: ${palette("primary", 27)};
        color: #fff;
      }
    }

    &.ant-btn-sm {
      padding: 0 15px;
      height: 28px;
      font-size: 12px;

      &.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
        padding: ${(props) =>
          props["data-rtl"] === "rtl" ? "0 24px 0 15px" : "0 15px 0 24px"};
        .anticon {
          margin: ${(props) =>
            props["data-rtl"] === "rtl" ? "0 -17px 0 0" : "0 0 0 -17px"};
        }
      }
    }

    &.ant-btn-lg {
      padding: 0 35px;
      font-size: 14px;
      height: 42px;
    }

    &.ant-btn-primary {
      color: #ffffff;
    }

    &.ant-btn-dashed {
      border-style: dashed;
      border-color: ${palette("border", 1)};

      &:hover {
        color: ${palette("primary", 0)};
        border-color: ${palette("primary", 0)};
      }
    }

    &.ant-btn-danger {
      background-color: ${palette("error", 0)};
      border-color: ${palette("error", 0)};
      color: #ffffff;

      &:hover {
        background-color: ${palette("error", 2)};
        border-color: ${palette("error", 2)};
      }

      &.ant-btn-background-ghost {
        color: ${palette("error", 0)};
        background-color: transparent;
        border-color: ${palette("error", 0)};

        &:hover {
          color: ${palette("error", 2)};
          border-color: ${palette("error", 2)};
        }
      }
    }

    &.ant-btn-circle,
    &.ant-btn-circle-outline {
      width: 35px;
      padding: 0;
      font-size: 14px;
      border-radius: 50%;
      height: 35px;

      &.ant-btn-sm {
        padding: 0;
        height: 28px;
        width: 28px;
        font-size: 12px;
      }

      &.ant-btn-lg {
        padding: 0;
        font-size: 14px;
        height: 42px;
        width: 42px;
      }
    }

    &.ant-btn.disabled,
    &.ant-btn[disabled],
    &.ant-btn.disabled:hover,
    &.ant-btn[disabled]:hover,
    &.ant-btn.disabled:focus,
    &.ant-btn[disabled]:focus,
    &.ant-btn.disabled:active,
    &.ant-btn[disabled]:active,
    &.ant-btn.disabled.active,
    &.ant-btn[disabled].active {
      color: ${palette("grayscale", 2)};
      background-color: #f7f7f7;
      border-color: ${palette("border", 0)};
      cursor: not-allowed;
      .ant-btn-icon {
        color: ${palette("grayscale", 2)} !important;
      }
    }

    &.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
      .anticon {
      margin: ${(props) =>
        props["data-rtl"] === "rtl" ? "0 -14px 0 0" : "0 0 0 -14px"};
    }

    &.isoButton {
      display: inline-block;
      margin-bottom: 0;
      font-weight: 500;
      text-align: center;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      background-image: none;
      border: 0;
      white-space: nowrap;
      line-height: 1.5;
      padding: 0 25px;
      font-size: 13px;
      border-radius: 4px;
      height: 35px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: relative;
      color: #ffffff;
      background-color: ${palette("primary", 0)};
      ${transition()};

      &:hover {
        background-color: ${palette("primary", 1)};
      }

      &.isoBtnSm {
        padding: 0 15px;
        height: 28px;
        font-size: 12px;
      }

      &.isoBtnLg {
        padding: 0 35px;
        font-size: 14px;
        height: 42px;
      }
    }
  }

  + .ant-btn-group {
    margin-left: ${(props) =>
      props["data-rtl"] === "rtl" ? "0" : "-1px"} !important;
    margin-right: ${(props) =>
      props["data-rtl"] === "rtl" ? "-1px" : "0"} !important;
  }
`;

const RadioButtons = (ComponentName) => styled(ComponentName)`
  .ant-radio-button-wrapper {
    height: 35px;
    line-height: 33px;
    color: ${palette("text", 1)};
    border: 1px solid ${palette("border", 0)};
    border-left: 0;
    background: #fff;
    padding: 0 20px;

    &:hover,
    &.ant-radio-button-wrapper-focused {
      color: ${palette("primary", 0)};
    }

    &.ant-radio-button-wrapper-checked {
      background: #fff;
      border-color: ${palette("primary", 0)};
      color: ${palette("primary", 0)};
      box-shadow: -1px 0 0 0 ${palette("primary", 0)};
    }
  }
`;

const ButtonsGroup = (ComponentName) => styled(ComponentName)`
  &.ant-btn-group {
    .ant-btn {
      margin: 0;
      margin-right: 0;
      display: inline-block;
      margin-bottom: 0;
      font-weight: 500;
      text-align: center;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      border-color: ${palette("border", 1)};
      white-space: nowrap;
      line-height: 1.5;
      padding: 0 8px;
      font-size: 14px;
      border-radius: 4px;
      height: 36px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: relative;
      ${transition()};

      &:hover {
        border-color: ${palette("primary", 0)};
      }

      &.ant-btn-dashed {
        border-style: dashed;

        &:hover {
          border-color: ${palette("primary", 0)};
        }
      }

      &.ant-btn-primary {
        border-color: ${palette("primary", 0)};

        &:hover {
          border-color: ${palette("primary", 1)};
        }
      }
    }

    > .ant-btn:first-child:not(:last-child) {
      border-radius: ${(props) =>
        props["data-rtl"] === "rtl" ? "0 4px 4px 0" : "4px 0 0 4px"};
    }

    > .ant-btn:last-child:not(:first-child) {
      border-radius: ${(props) =>
        props["data-rtl"] === "rtl" ? "4px 0 0 4px" : "0 4px 4px 0"};
    }

    .ant-btn-primary:last-child:not(:first-child),
    .ant-btn-primary + .ant-btn-primary {
      border-left-color: ${(props) =>
        props["data-rtl"] === "rtl"
          ? palette("primary", 0)
          : palette("primary", 1)};
      border-right-color: ${(props) =>
        props["data-rtl"] === "rtl"
          ? palette("primary", 1)
          : palette("primary", 0)};
    }

    .ant-btn-primary:first-child:not(:last-child) {
      border-left-color: ${(props) =>
        props["data-rtl"] === "rtl"
          ? palette("primary", 1)
          : palette("primary", 0)};
      border-right-color: ${(props) =>
        props["data-rtl"] === "rtl"
          ? palette("primary", 0)
          : palette("primary", 1)};
    }

    .ant-btn + .ant-btn,
    + .ant-btn {
      margin-left: ${(props) =>
        props["data-rtl"] === "rtl" ? "0" : "-1px"} !important;
      margin-right: ${(props) =>
        props["data-rtl"] === "rtl" ? "-1px" : "0"} !important;
    }

    &.ant-btn-group-lg {
      > .ant-btn {
        padding: 0 35px;
        font-size: 14px;
        height: 42px;
      }
    }

    &.ant-btn-group-sm {
      > .ant-btn {
        padding: 0 15px;
        height: 28px;
        font-size: 12px;
      }
    }
  }

  &.ant-btn-group + &.ant-btn-group {
    margin-left: ${(props) =>
      props["data-rtl"] === "rtl" ? "0" : "-1px"} !important;
    margin-right: ${(props) =>
      props["data-rtl"] === "rtl" ? "-1px" : "0"} !important;
  }
`;

const GhostButtons = (ComponentName) => styled(ComponentName)`
  .ant-btn-background-ghost {
    background: transparent !important;
    border-color: #fff;
    color: #fff;

    &.ant-btn-primary {
      color: ${palette("primary", 0)};
      background-color: transparent;
      border-color: ${palette("primary", 0)};
    }
  }
`;

export { Buttons, ButtonsGroup, RadioButtons, GhostButtons };