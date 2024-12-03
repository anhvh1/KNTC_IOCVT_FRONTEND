import styled from "styled-components";

const Wrapper = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0px;
  }
  .ant-tabs-ink-bar-animated {
    display: none;
  }
  .ant-tabs-tab {
    border: 1px solid rgba(229, 229, 229, 1);
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px 30px; */
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
  }
  .ant-tabs-tab-active {
    border: 1px solid rgba(33, 111, 202, 1);
    border-bottom: none;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  .info-plan {
    margin-bottom: 10px;
    font-size: 16px;
    .complete {
      color: rgba(95, 151, 23, 1);
    }
    .date {
      color: rgba(255, 15, 15, 1);
      font-style: italic;
    }
  }
`;

const StyleTree = styled.div`
  .selected-item__disabled {
    color: rgb(177, 175, 175);
  }

  .selected-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .tax {
      display: flex;
      gap: 10px;
      .count {
        color: #fff;
        background: rgba(76, 153, 227, 1);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .icon-send {
      position: absolute;
      right: 10px;
      cursor: pointer;
      height: 15px;
      width: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .ant-tree-node-content-wrapper {
    position: relative !important;
  }
`;

export { StyleTree };
export default Wrapper;
