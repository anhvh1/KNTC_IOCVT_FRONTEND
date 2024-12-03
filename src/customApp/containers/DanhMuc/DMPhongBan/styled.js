import styled from 'styled-components';

export const TreeCustom = styled.div`
  .tree-custom {
    padding: 0;
    border: none;
  }
  .isoBoxWrapper {
    border: none;
    padding: 0;
  }
  .tree-custom div,
  .isoLayoutContentWrapper,
  .isoLayoutContentWrapper div {
    padding: 0;
  }

  h1,
  .d-none {
    display: none;
    padding: 0 !important;
  }
  .mg-top::-webkit-scrollbar {
    background-color: #f5f5f5;
  }

  .ant-select.ant-select-single.ant-select-allow-clear.ant-select-show-arrow.ant-select-show-search {
    width: 30% !important;
  }
  span.ant-input-group-wrapper.ant-input-search {
    width: 65% !important;
  }

  span.ant-tree-title {
    min-width: 450px;
  }

  .mg-top {
    margin-top: 20px;
    height: calc(100vh - 265px);
    overflow: scroll;
  }
  /* @media only screen and (max-width: 1280px) {
    .isoBoxWrapper {
      height: auto !important;
    }
  } */
  @media (max-width: 767px) {
    span.ant-tree-title {
      width: 100%;
    }
    .isoBoxWrapper {
      height: 300px !important;
    }
    .mg-top {
      height: 300px !important;
    }
    .esmvo {
      height: 300px;
    }
  }
  @media (min-width: 768px) and (max-width: 852px) {
    .ant-select.ant-select-single.ant-select-allow-clear.ant-select-show-arrow.ant-select-show-search {
      width: 100% !important;
    }
    span.ant-input-group-wrapper.ant-input-search {
      width: 100% !important;
    }
  }
`;

export const InputCustom = styled.div`
  .ant-input-number-handler-wrap {
    display: none;
    width: 100%;
  }
  .ant-input-number.ant-input-number-in-form-item {
    width: 100%;
  }
`;

export const HeaderCQ = styled.div`
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  font-size: 17px;
  margin: 5px 0;
`;
