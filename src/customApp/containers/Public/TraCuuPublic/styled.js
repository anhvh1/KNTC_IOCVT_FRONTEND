import styled from 'styled-components';
import {transition} from '../../../../settings/style-util';
import Background__header from '../../../../image/background__header_new.png';
export default styled.div`
  background: #f2f2f2;
  height: 100vh;
  max-height: calc(100vh - 30px);
  overflow: auto;
  padding: 0 10px;
  .title {
    font-size: 22px;
    font-weight: 600;
    margin-top: 20px;
  }
  .line-break {
    width: 100%;
    height: 1px;
    background: #e8e8e8;
  }
  .header-title {
    /* position: absolute;
    top: 50px; */
    .wrapper-top__title {
      position: relative;

      z-index: 1;
      text-align: center;
      color: red;
      font-size: 25px;
      p {
        text-shadow: 2px 1px 0 #fff;
      }
    }
  }
  .subtitle {
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
  }
  .detail-wrapper {
    margin-top: 20px;
    background: #fff;
    padding: 20px 10px;
    .detail-title {
      font-weight: 500;
      font-size: 20px;
    }
    .details-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-style: italic;
        margin: 5px 0 15px 0;
        display: inline-block;
      }
    }
    .detail-image {
      display: flex;
      justify-content: center;
      img {
        max-width: 100%;
        height: auto;
        /* width: auto;
        height: auto;
        max-height: 500px; */
      }
    }
    .detail-content {
      margin-top: 10px;
    }
  }
  .info {
    .info-title {
      font-size: 16px;
      font-weight: 500;
      padding-top: 10px;
      padding-bottom: 5px;
    }
  }
  .progress {
    flex: 1;

    .progress-wrapper {
      height: calc(100% - 55px);
      margin-top: 30px;
      padding: 30px 30px 30px 30px;
      background: #fff;
      display: flex;
      flex-direction: column;
      .progress-item + .progress-item {
        margin-top: 15px;
      }
      .progress-item {
        .progress-title {
          cursor: pointer;
          font-weight: 600;
          padding-bottom: 5px;
        }
        .progress-day {
          font-style: italic;
        }
      }
      .pagination-bottom {
        margin-top: auto;
      }
    }
  }
  .pagination-top {
    flex-grow: 1;
    display: flex;
    /* justify-content: flex-end; */
    margin-top: 10px;
    .pagination-simple {
      display: none;
    }
  }
  .btn-action {
    padding: 15px 5px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .datepicker-day__left {
    .ant-form-item-label {
      margin-right: 7px;
    }
  }
  .datepicker-day__right {
    .ant-form-item-label {
      padding-left: 10px;
    }
  }
  .ant-table-container .ant-table-body {
    min-height: auto !important;
  }

  .ant-input,
  .ant-picker {
    border-radius: 50px !important;
  }
  .ant-select-selector {
    /* height: 35px; */
    // height: 35px !important;
    border-radius: 50px !important;
  }
  .ant-select-selection-search-input {
    // height: 35px !important;
  }
  .ant-tabs-nav {
    margin-bottom: 0;
  }
  .ant-tabs-tab .anticon {
    margin-right: 5px;
  }
  .ant-tabs-tab-active {
    background: #0f6cbd !important;
    /* background: red !important; */
  }
  /* .ant-table-thead tr:first-child th {
    background: #b4dbff;
  } */
  .ant-table-container {
    padding: 0;
  }
  /* .ant-table-container th,.ant-table-container td{
  border  : 1px solid ;
} */
  .ant-tabs-nav .ant-tabs-tab {
    border: none !important;
    border-radius: 8px 8px 0 0 !important;
    background: #fff;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 5px !important;
  }
  .ant-tabs-tab .ant-tabs-tab-btn {
    color: #000 !important;
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff !important;
  }
  .wrapper-img__tracuu {
    display: grid;
    height: 100%;
    align-items: end;
    max-height: 260px;
  }
  .ant-tabs-content-holder {
    background: #fff;
    padding: 25px;
  }
  .tabs-right {
    height: 45px;
    right: 0px;
    bottom: 10px;
    z-index: 11;
    display: flex;
    margin-bottom: 10px;
    margin-top: auto;
    margin-left: auto;
    margin-right: 10px;
    right: 15%;
    margin-bottom: 10px;
    gap: 10px;
    flex-wrap: wrap;
    .wrap {
      position: relative;
      .wrapp-img {
        position: absolute;
        top: -50px;
        left: 0;
        right: 0;
        /* display: flex;
        justify-content: center; */
        img {
          width: 100%;
          height: 40px;
        }
      }
    }
    button {
      border-radius: 10px;
      color: #1876cd;
      background: #fff;
      padding: 20px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .box-result {
    margin-top: 20px;
    .title {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: bold;
    }
    .wrapper-table__title {
      display: flex;
    }
  }
  .img-tracuu {
    max-width: 100%;
    height: 100%;
  }
  .filter-action {
    text-align: center;
    display: flex;
    justify-content: center;
    & button:first-child,
    & button:nth-child(2) {
      background: #1876cd;
      color: #fff;
    }
    & button:first-child:hover {
      /* color: #1876CD;
    border-color:#1876CD ;
    background: #fff; */
    }
    & button:last-child:hover {
      /* background: #1876CD;
    color: #fff; */
    }
    & button:nth-child(3) {
      color: #1876cd;
      border-color: #1876cd;
    }
    button + button {
      margin-left: 10px;
    }
    button {
      margin-top: 5px;
    }
    /* justify-content: center; */
  }
  .ant-form-item {
    margin-bottom: 15px !important;
  }
  .loggin-btn {
    width: 50px;
    padding: 10px;
    background: #62b0f9;
    border-radius: 10px;
  }
  .header {
    height: 200px;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 20px;
    .header-top {
      display: flex;
      position: relative;
      z-index: 1;
      align-items: center;
      justify-content: space-around;
      padding-top: 2%;
    }
    .header-background {
      position: absolute;
      height: 200px;
      left: 0;
      z-index: 0;
      top: 0;
      right: 0;
      /* padding: 20px; */
      background: url(${Background__header});
      background-size: cover;
      /* background-position: left; */
      background-repeat: no-repeat;
      justify-content: center;
      align-items: center;
    }
  }

  .header-logo {
    img {
      max-width: 100%;
      height: auto;
      height: 100px;
    }
  }
  .header-wrapper {
    left: 0;
    right: 0;
    display: flex;

    .header-title {
      .wrapper-top__title {
        img {
          display: none;
        }
      }
      .top-title {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 19px;
        text-align: center;
        color: #2d2d2d;
      }
      .title {
        text-transform: uppercase;
        text-align: center;
        font-size: 33px;
        /* letter-spacing: 3px; */
        color: #0e2cbc;
        font-weight: 500;
      }
      .sub-title {
        /* margin-top: 20px; */
        text-align: center;
        font-size: 22px;
        text-transform: uppercase;
        /* letter-spacing: 3px; */
        /* color : #0E2CBC; */
        font-weight: 400;
        display: flex;
        justify-content: center;
      }
    }
    .line-bottom {
      position: absolute;
      width: 100%;
      background: linear-gradient(
        180deg,
        rgba(75, 104, 244, 0.8) 0%,
        rgba(11, 41, 185, 0.8) 100%
      );
      left: 0;
      right: 0;
      height: 10px;
      bottom: -10px;
      opacity: 0.7;
    }
  }

  .tabs-section {
    margin-top: 20px;
  }
  .box-result {
    /* padding: 5px; */
    .title {
      color: #004c93;
    }
  }
  @media only screen and (max-width: 1600px) {
    .header-wrapper .header-title {
      .title {
        font-size: 27px;
      }
      .sub-title {
        font-size: 22px;
      }
      .top-title {
        font-size: 16px;
      }
    }
    .header-wrapper .header-logo {
      left: 20px;
    }
  }
  @media only screen and (max-width: 1250px) {
    .filter-action button {
      padding: 0 10px;
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 1200px) {
    .tabs-right {
      right: 9%;
    }
  }
  @media only screen and (max-width: 1100px) {
    .header-wrapper .header-title {
      .wrapper-top__title {
        font-size: 25px;
      }
      .title {
        font-size: 25px;
      }
      .sub-title {
        font-size: 20px;
      }
      .top-title {
        font-size: 14px;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    .tabs-right {
      right: 10px;
      bottom: 0;
    }
  }
  @media only screen and (max-width: 900px) {
    .header-wrapper .header-title {
      .title {
        font-size: 23px;
      }
      .sub-title {
        font-size: 17px;
      }
      .top-title {
        font-size: 14px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .header {
      height: auto;
      .tabs-right {
        height: auto;
        padding: 0 20px;
        /* margin-top: 10px; */
        .wrap {
          display: flex;
          gap: 10px;
          .wrapp-img {
            position: static;
          }
        }
      }
      /* height: 160px; */
      .header-top {
        padding-top: 5%;
      }
      .header-logo {
        display: none;
      }
      .header-background {
        height: 100%;
        /* height: 160px; */
      }
      .header-wrapper .header-title {
        .wrapper-top__title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          img {
            max-width: 100%;
            height: 30px;
            display: block;
          }
        }
        .title {
          font-size: 27px;
        }
        .sub-title {
          font-size: 18px;
        }
        .top-title {
          font-size: 15px;
        }
      }

      .header-wrapper .header-logo {
        display: none;
      }
    }

    .filter-action button {
      border-radius: 30px;
    }
    .box-result {
      .wrapper-table__title {
      }
    }
    .pagination-top {
      .pagination-normal {
        display: none;
      }
      .pagination-simple {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 576px) {
    .header .header-wrapper .header-title {
      .wrapper-top__title {
        font-size: 17px;
      }
      .title {
        font-size: 23px;
      }
      .sub-title {
        font-size: 16px;
      }
      .top-title {
        font-size: 14px;
      }
    }

    /* .tabs-right {
      button:first-child {
        display: none;
      }
      button:last-child {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        span:last-child {
          display: none;
        }
      }
    } */
  }

  @media only screen and (max-width: 470px) {
    .header-wrapper .header-title {
      .title {
        font-size: 20px;
      }
      .sub-title {
        font-size: 16px;
      }
      .top-title {
        font-size: 12px;
      }
    }
  }

  @media only screen and (max-width: 415px) {
    .header-wrapper .header-title {
      .title {
        font-size: 18px;
      }
      .sub-title {
        font-size: 13px;
      }
      .top-title {
        font-size: 11px;
      }
    }

    .header-wrapper .header-logo {
      display: none;
    }
  }

  @media only screen and (max-width: 370px) {
    .header-wrapper .header-title {
      .title {
        font-size: 15px;
      }
      .sub-title {
        font-size: 12px;
      }
      .top-title {
        font-size: 8px;
      }
    }
    .filter-action {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
    }
    .filter-action button:nth-child(3) {
      margin-left: 0;
    }
    .filter-action button {
      align-self: center;
    }
  }
`;
