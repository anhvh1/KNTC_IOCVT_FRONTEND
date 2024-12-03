import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-table-thead tr > td:first-child {
    /* visibility: hidden; */
    border: 1px solid;
  }
  .box-file {
    position: relative;
    tbody {
    }
    .loading {
      position: absolute;
      background: #fff;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      .ant-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export default Wrapper;
