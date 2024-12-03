import styled from 'styled-components';

const Wrapper = styled.div`
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
    width: 250px;
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
