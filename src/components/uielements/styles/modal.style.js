import styled from "styled-components";
import { palette } from "styled-theme";
import { Modal } from "antd";

const ModalWrapper = styled(Modal)`
  top: ${(props) => (props.top ? `${props.top}` : "50")}px;
  max-width: 95%;

  .ant-modal-title {
    font-size: 18px !important;
    color: #000000 !important;
  }

  .modal-footer__grey .ant-modal-footer {
    background: #ededed !important;
  }

  .ant-modal-close {
    color: #000000 !important;
    display: ${(props) => (props.noTitle ? "none" : "block")};
  }

  .ant-modal-header {
    background-color: white !important;
    /* border-color: ${palette("primary", 0)}; */
    /* background-color: #2878d7 !important; */
  }

  .ant-modal-header {
    padding: 11px 19px;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #dddddd;
  }

  .ant-modal-content {
    border-radius: 4px;
    padding: 0;
  }

  &.footer-center {
    .ant-modal-footer {
      justify-content: center;
    }
  }

  .center {
    text-align: center;
  }

  .ant-form-item {
    margin-bottom: 14px;
  }

  /* .modal-footer__grey  */
  .ant-modal-body > div:first-child {
    min-height: ${(props) =>
      props?.IsFullHeight ? `calc(100vh - 250px)` : 120};
  }
  .ant-modal-body {
    padding: ${(props) =>
      props?.padding || props?.padding === 0 ? props.padding : "8px 24"}px;
    /* max-height: calc(100vh - 190px); */
    max-height: 80vh;
    min-height: 120px;
    overflow: auto;
    margin-bottom: 10px;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: end;
    margin-top: 0;
    // border-top: 1px solid #dddddd;
    padding: 10px 20px 10px 20px;
  }
`;

export default ModalWrapper;
