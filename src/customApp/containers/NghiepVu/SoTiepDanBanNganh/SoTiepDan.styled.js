import styled from 'styled-components';

const Wrapper = styled.div`
  .select-table:hover .ant-icon__table {
    visibility: visible !important;
  }
  .table-scroll {
    padding: 1px;
    max-height: 520px;
    overflow: scroll;
  }
  .table-scroll .table-scroll__wrapper {
    width: 100%;
    thead {
      position: sticky;
      z-index: 9999;
      background: #fff;
      top: -1px;
      box-shadow: inset 0px 2px 0px 0px, inset 0px -1px 0px 0px;
    }
    th {
      border: 1px solid;
    }
    td {
      height: 50px;
      padding: 5px;
      border: 1px solid;
    }
  }
  .wrapper-scroll {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
  }
  .table-primary {
    background: #0b57d0;
  }
  .table-primary p {
    color: #fff;
  }
  .ant-tabs-nav::before {
    display: none !important;
  }
  .ant-tabs-nav-wrap div:first-child {
    transform: none !important;
  }
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-ink-bar-animated {
    display: none;
  }
  .ant-tabs-nav {
    margin-bottom: 0;
  }
  .ant-tabs-tab {
    padding: 10px 0;
  }
  .ant-tabs .ant-tabs-tab {
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 !important;
  }
  .ant-tabs__title {
    width: 200px;
    /* height: 35px; */
    background: #eaf1fb;
    color: #000;
    padding: 10px 0;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #0b57d0;
  }
  .ant-tabs-tab-active .ant-tabs__title {
    background: rgb(40, 120, 215) !important;
    color: #fff;
    background: #94cef7;
    font-weight: 600;
  }
`;

export default Wrapper;
