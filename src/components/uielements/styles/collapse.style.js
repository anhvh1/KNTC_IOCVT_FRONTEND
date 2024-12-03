import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition} from '../../../settings/style-util';

const Collapse = (ComponentName) => styled(ComponentName)`
  width: 100%;
  background: #fff;
  .ant-collapse-item + .ant-collapse-item {
    margin-top: 35px;
  }

  .ant-collapse-item {
    border-bottom: none !important;
  }
  .ant-collapse-content-box {
    padding: 0 !important;
  }
  .ant-collapse-item {
    .ant-collapse-header {
      box-shadow: 1px 2px 3px 0px #000;
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      align-items: center !important;
      padding: 0 !important;
      border-bottom: 1px solid #0f6cbd;
      background: #0f6cbd;
      .ant-collapse-header-text {
        /* width: 300px; */
        padding: 7px 10px;
        /* border-bottom: 1px solid #0f6cbd; */
        color: #fff;
      }
    }
  }
  .customize-panel {
    .ant-collapse-header {
      border-bottom: 1px solid #0f6cbd;
      background: transparent !important;
      box-shadow: none;
      .ant-collapse-header-text {
        font-weight: 600;
        /* width: 300px; */
        padding: 5px 10px !important;
        color: red;
      }
    }
  }
  .red-panel > .ant-collapse-header:first-child > .ant-collapse-header-text {
    color: ${palette('text', 5)};
    font-size: 17px;
    /* color: red; */
    width: 100%;
    position: relative;
    /* padding: 12px 0 !important; */
    font-weight: 600;
    &::before {
      position: absolute;
      content: '';
      width: 30%;
      background-color: ${palette('text', 5)};
      height: 2px;
      bottom: 0;
    }
  }
  .black-panel > .ant-collapse-header:first-child > .ant-collapse-header-text {
    color: ${palette('text', 6)};
    font-size: 14px;
    /* color: red; */
    width: 100%;
    position: relative;
    font-weight: 600;
    &::before {
      content: none !important;
    }
  }
  .red-panel > .ant-collapse-header:first-child {
    padding: 12px 0;
  }
  .black-panel > .ant-collapse-header:first-child {
    padding: 0 35px;
  }
  .ant-collapse-expand-icon {
    color: #0f6cbd;
    z-index: 111;
    padding-right: 10px !important;
    padding-left: 0 !important;
    position: absolute !important;
    right: 0;
    top: 45px;
    .anticon {
      font-size: 18px !important;
    }
    /* color: ${palette('text', 5)}; */
  }
  .customize-panel {
    margin-top: 15px;
    .ant-collapse-expand-icon {
      color: #0f6cbd;
      padding-right: 10px !important;
      padding-left: 0 !important;
      position: absolute !important;
      right: 0;
      top: 35px;
      .anticon {
        font-size: 18px !important;
      }
      /* color: ${palette('text', 5)}; */
    }
  }
  .ant-collapse-extra {
    height: 100%;
    button {
      height: 100%;
      border-radius: none;
    }
  }
`;

export default Collapse;
