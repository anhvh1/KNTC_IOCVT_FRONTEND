import styled from 'styled-components';

const Wrapper = styled.div`
  .filter-item {
    display: flex;
    align-items: center;
    height: 100%;
    .label {
      margin-right: 10px;
      flex-basis: 25%;
    }
    .label-time {
      margin-right: 10px;
      flex-basis: 10%;
    }
    .input {
      display: flex;
      align-items: center;
      flex-basis: content;
    }
    .ant-checkbox-group {
      display: flex;
      align-items: center;
    }
  }
`;

export default Wrapper;
