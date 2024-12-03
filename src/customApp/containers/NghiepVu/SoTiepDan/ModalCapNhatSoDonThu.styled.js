import styled from 'styled-components';
const Wrapper = styled.div`
  .guide {
    .guide-text {
      color: red;
    }
    padding-bottom: 10px;
  }
  .wrap-item {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    /* align-items: center; */
    .ant-form-item {
      margin-bottom: 0;
    }
  }
  .wrap-picker {
    padding-top: 15px;
    .ant-spin {
      align-self: center;
    }
  }
  .break-line {
    height: 1px;
    background: rgb(221, 221, 221);
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
  }
  .message {
    margin-top: 10px;
    color: rgb(70 143 231);
  }
`;

export default Wrapper;
