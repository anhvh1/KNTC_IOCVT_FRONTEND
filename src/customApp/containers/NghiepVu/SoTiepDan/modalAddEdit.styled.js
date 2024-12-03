import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  .wrapper-item {
    margin-top: 30px;
    padding: 0 50px;
  }
  .content-mail__checkbox {
    /* border-top: 1px solid #bdbdbd; */
    /* padding-top: 50px; */
    padding: 15px 50px 15px;
    /* margin-top: 10px; */
    position: relative;
    label {
      display: flex;
      align-items: center;
      span {
        font-weight: 600;
        font-size: 16px;
      }
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
      }
    }
  }
  .line-break {
    width: 100%;
    height: 1px;
    background: #bdbdbd;
    margin-top: 10px;
  }
  .wrapper-bottom {
    align-self: flex-end;
    /* position: absolute;
    bottom: 50px;
    width: 100%; */
  }
  .wrapper-tab__item {
    margin-top: 30px;
    padding: 0 50px;
  }
  .top-item__wrapper {
    padding: 0 50px;
  }
  .breadCum-wrapper {
    padding: 0 50px;
  }
  /* .content-mail__checkbox::before {
    position: absolute;
    content: '';
    width: 100%;
    border: 1px solid;
  } */
  .breadCum-wrapper {
    margin-top: 10px;
  }
  .title_bold label {
    font-weight: bold;
  }
  .ant-modal-footer {
    text-align: center;
  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  .ant-tabs-nav {
    margin: 0;
    display: none;
  }
  .title-noidungtiep {
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0;
  }
  .title-user__claims {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  .top-item__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .ant-picker {
    height: 30px;
    width: 100%;
  }

  /* .btn-danger {
    background: #d9001b;
    color: #fff;
  } */

  .breadCum-content__top {
    /* display: grid;
    grid-template-columns: repeat(auto-fit, 49% 49%);
    gap: 30px; */
  }

  .breadCum-content {
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

  .breadCum-content__tiepdan {
    padding-left: 140px;
    padding-right: 250px;
    @media only screen and (max-width: 1500px) {
      padding-left: 100px;
      padding-right: 200px;
    }
    @media only screen and (max-width: 1370px) {
      padding-left: 20px;
      padding-right: 20px;
      .breadCum-content__top {
        /* display: grid;
        grid-template-columns: auto auto; */
        .ant-form-title__left .ant-form-item-control-input-content {
          width: 100%;
        }
      }
    }
    .ant-form-title__left .ant-form-item-control-input-content {
      width: 450px;
    }
    .ant-default-width {
      width: 450px;
      height: 30px;
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
  }

  .info-wrapper {
    .info-wrapper__title {
      margin-top: 20px;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .breadCum-content__khieunai {
    .group-check {
      display: flex;
      align-items: end;
      justify-content: center;
      height: 100%;
      gap: 10px;
      @media only screen and (max-width: 1200px) {
        justify-content: start;
      }
    }
    /* .wrapper-content {
      .wrapper-content-item:first-child {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .ant-form-title__left:first-child {
          flex-basis: 30%;
        }
        .ant-form-title__left:not(:first-child) {
          flex-grow: 1;
        }
      }
      .wrapper-content-item {
        display: flex;
      }
    } */
  }
  .file-wrapper {
    /* margin-top: 30px; */
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
  /* .info-wrapper {
    margin-top: 30px;
  }
  .user-report {
    margin-top: 30px;
  } */
`;

export default Wrapper;
