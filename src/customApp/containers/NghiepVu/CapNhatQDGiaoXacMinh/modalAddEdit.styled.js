import styled from 'styled-components';

const Wrapper = styled.div`
  /* padding: 0 50px; */
  .btns-end {
    display: flex;
    justify-content: flex-end;
  }
  .center-middle {
    display: flex;
    align-items: center;
  }
  .wrapper-top__info {
    display: grid;
    grid-template-columns: auto auto;
  }
  /* .wrapper-user__item {
    width: 100%;
  } */
  /* .wrapper-user {
    .wrapper-user__item {
      display: grid;
      grid-template-columns: 40% 40% 20%;
      align-items: center;
      margin-bottom: 20px;
    }
  } */
  .line-break {
    position: absolute;
    width: 100%;
    height: 1px;
    background: #bdbdbd;
    left: 0;
    right: 0;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 !important;
  }
  .ant-tabs-tab {
    height: 30px;
    width: 200px;
    justify-content: center;
    align-items: center;
  }
  .ant-tabs-tab-active {
    background: #0b57d0 !important;
    padding: 0;
    display: flex;
    & > div {
      color: #fff !important;
    }
  }
  .wrapper-content__main {
    table {
      width: 100%;
      td,
      th {
        border: 1px solid;
      }
    }
  }
  .title {
    font-weight: 600;
  }
  .wrapper-content {
    padding: 0px 15px;
    & > .wrapper-content__main {
      margin-top: 10px;
    }
    .title {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .content__top__title {
      display: flex;
      /* justify-content: space-around; */
      .content__top__info {
        margin-left: 50px;
      }
    }
    .wrapper-content__table {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
      .table_left,
      .table_right {
        flex: 1;
      }
    }
  }
  .modal-wrapper {
    padding: 0 50px;
    overflow: hidden;
    .line-break {
      position: relative;
      left: -50px;
      width: calc(100% + 100px);
      height: 1px;
      background: rgb(189, 189, 189);
      text-align: center;
      margin: 10px 0;
      display: flex;
      justify-content: cente;
    }
  }
  .btn-wrapper {
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
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
