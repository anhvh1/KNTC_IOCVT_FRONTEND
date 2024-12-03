import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 !important;
  }

  .line-bottom {
    position: relative;
    margin-bottom: 10px;
  }
  .line-bottom::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    background: #0b57d0;
    bottom: -2px;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
  .group-info {
    margin-top: 5px;
    display: grid;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    gap: 5px;
  }
  .summary-content {
    margin-top: 5px;
  }
  .ant-form-item-label span {
    font-style: italic;
  }
  .wrapper-content {
    margin-top: 5px;
    display: grid;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    gap: 10px;
    /* justify-content: space-around; */
    @media only screen and (max-width: 600px) {
      grid-template-columns: auto;
    }
    p span {
      font-style: italic;
    }
  }
  .wrapper-content__group {
    margin-top: 5px;
    display: grid;
    grid-template-columns: calc(33% - 5px) calc(33% - 5px) calc(33% - 5px);
    gap: 10px;
    @media only screen and (max-width: 991px) {
      grid-template-columns: auto auto;
    }
    @media only screen and (max-width: 600px) {
      grid-template-columns: auto;
    }

    p span {
      font-style: italic;
    }
  }
  .ant-tabs-tab {
    /* height: 30px; */
    width: 200px;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin-top: 10px;
    font-weight: 600;
    span {
      font-weight: 400;
    }
  }

  .ant-tabs-tab-active {
    background: #0b57d0 !important;
    padding: 0;
    display: flex;
    & > div {
      color: #fff !important;
    }
  }
  .ant-form-title__left {
    margin-bottom: 0;
    .ant-form-item-row {
      display: grid !important;
    }
    .ant-form-item-label {
      text-align: left;
    }
    .ant-form-item-row {
      width: 100%;
    }
    .ant-form-item-control-input-content {
      width: 100%;
      /* width: 450px; */
      input {
        height: 30px;
      }
    }
  }
  .tile-content {
    font-weight: 600;
    margin-bottom: 10px;
  }
  .item-info + .item-info {
    margin-top: 10px;
  }
  .item-info {
    span {
      font-weight: 600;
    }
  }
  .box-file {
    table {
      border-collapse: collapse;
    }
    table th,
    table td {
      border: 1px solid #d7d7d7;
    }
  }
  .file-item {
    padding: 5px;
  }
  .file {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    p {
      font-weight: 600;
    }
  }

  .ant-form-title__left {
    margin-bottom: 0;
    .ant-form-item-row {
      display: grid !important;
    }
    .ant-form-item-label {
      text-align: left;
    }
    .ant-form-item-row {
      width: 100%;
    }
    .ant-form-item-control-input-content {
      width: 100%;
      /* width: 450px; */
      input {
        height: 30px;
      }
    }
  }

  .group-title {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-content__breadCum {
      font-size: 14px;
      font-weight: 600;
    }
    button {
      width: 80px !important;
      height: 25px !important;
    }
  }
  .wrapper-user {
    margin-top: 10px;
    .title {
      display: grid;
      grid-template-columns: 45.5% auto;
      /* justify-content: space-between; */
      p {
        font-size: 13px;
      }
    }
  }
  .groups-user {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .wrapper-select {
      display: grid;
      grid-template-columns: 450px 450px auto;
      gap: 30px;
      align-items: center;
    }
  }
  .btn-delete {
    justify-self: end;
    justify-items: end;
    button {
      width: 80px;
      height: 25px;
    }
  }

  .file-wrapper {
    margin-top: 30px;
    .file-wrapper__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 13px;
        font-weight: bold;
      }
    }
    .file-wrapper__content {
      table {
        margin-top: 10px;
        width: 100%;
        border-collapse: collapse;
        thead th {
          border: 1px solid #797979;
        }
        tbody td {
          border: 1px solid #797979;
        }
      }
    }
  }
  .info-wrapper {
    margin-top: 30px;
  }
  .user-report {
    margin-top: 30px;
  }
  .ant-picker {
    height: 30px;
    width: 100%;
  }
`;

export default Wrapper;
