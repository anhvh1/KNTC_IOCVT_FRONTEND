import styled from 'styled-components';
import bgImage from '../../../../image/loginKKTS.png';
import {transition} from '../../../../settings/style-util'; // import palete from ''
import Background__header from '../../../../image/background__header_new.png';

export default styled.div`
  height: 100vh;
  overflow: auto;
  ${transition()};
  /* width: 100vw;
  height: 100%;
  min-height: 100vh; */
  /* background: url(${bgImage}) no-repeat center center; */
  /* display: flex;
  flex-wrap: wrap;
  background-size: cover; */

  @media only screen and (max-width: 740px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .main-wrapper {
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    margin-top: 100px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .main-content {
      border-radius: 12px;
      display: flex;
      padding: 80px 40px;
      background: #0f6cbd;
      position: relative;
      width: 90%;
      max-width: 750px;
      &::before {
        position: absolute;
        content: '';
        width: 1px;
        height: 58%;
        background: rgb(255, 255, 255);
        left: 50%;
        transform: translate(-50%, -50%);
        top: 55%;
      }
    }
  }
  .header {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 50px;
    .header-top {
      display: flex;
      position: relative;
      z-index: 1;
      align-items: center;
      justify-content: space-around;
      padding-top: 2%;
      .header-logo {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute;
        left: calc(30% - 300px);
        top: 20px;
        @media only screen and (max-width: 1000px) {
          display: none;
        }
        img {
          max-width: 100%;
          height: auto;
          height: 100px;
        }
        .desc-logo {
          margin-top: 5px;
          p {
            font-size: 12px;
            text-align: center;
            font-weight: 600;
          }
          br {
            height: 0;
          }
        }
      }
      .header-wrapper {
        display: flex;

        .header-title {
          .wrapper-top__title {
            img {
              display: none;
            }
            position: relative;
            z-index: 1;
            text-align: center;
            color: red;
            font-size: 25px;
            p {
              text-shadow: 2px 1px 0 #fff;
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
    }
    .header-background {
      position: absolute;
      height: 100%;
      left: 0;
      z-index: 0;
      top: 0;
      right: 0;
      /* padding: 20px; */
      background: url(${Background__header});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      justify-content: center;
      align-items: center;
    }
    .tabs-right {
      height: 45px;
      right: 0px;
      bottom: 10px;
      z-index: 11;
      display: flex;
      margin: auto 10px 10px 85%;
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
  }

  .col-center {
    text-align: center;
    ${transition(0.5)};

    &.title {
      font-size: 30px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
      height: 55px;
      position: absolute;
      top: 180px;
      width: 100%;

      @media only screen and (max-width: 740px) {
        position: initial;
        margin-bottom: 20px;
      }

      @media only screen and (max-height: 620px) {
        top: 70px;
      }

      @media only screen and (max-height: 530px) {
        top: 20px;
      }

      @media only screen and (max-height: 425px) {
        display: none;
      }
    }
  }

  .main-wrapper {
    .head-text {
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 50px;
      text-align: center;
      // display: none;
    }

    @media only screen and (max-width: 740px) {
      width: 100%;

      .head-text {
        display: block;
        text-align: center;
        font-size: 24px;
      }
    }

    .main-login {
      flex-basis: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .main-login__title {
        font-size: 14px;
        color: #fff;
        margin-bottom: 15px;
      }

      .main-icon {
        .anticon {
          font-size: 70px;
          color: #fff;
          margin-bottom: 40px;
        }
      }
      .confirm {
        margin-bottom: 10px;
        .group {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          /* align-items: center; */
          .ant-input-affix-wrapper {
            height: 45px;
            width: 200px !important;
            margin-bottom: 0 !important;
          }
          .anticon-reload {
            font-size: 20px;
            color: #fff;
          }
        }
      }

      .input {
        text-align: center;
        display: flex;
        flex-direction: column;

        .ant-input-affix-wrapper {
          height: 45px;
          margin-bottom: 15px;
          /* width: 320px; */

          .ant-input-prefix {
            /* color: #fff; */
            font-size: 22px;
          }
        }

        .ant-input {
          border-radius: 8px;
          padding-left: 15px;
          font-size: 18px;
          color: #555;
        }
      }

      .button {
        margin-bottom: 15px;

        .ant-btn {
          width: 100%;
          height: 45px;
          font-size: 20px;
          border-radius: 8px;
        }
      }

      .text-error {
        color: red;
      }
    }

    .sub-login {
      display: flex;
      flex-direction: column;
      justify-content: right;
      /* width: 320px; */
      .forgot + .forgot {
        margin-top: 5px;
      }
      .ant-checkbox-wrapper {
        color: #fff;
      }

      .forgot {
        margin-left: auto;
        cursor: pointer;

        a {
          color: #fff;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .main-wrapper {
    @media only screen and (max-width: 740px) {
      width: 100%;

      .head-text {
        display: none;
      }
    }

    .head-text {
      font-size: 24px;
      font-weight: bold;
      text-transform: uppercase;
      color: #fff;
      text-align: center;
      margin-bottom: 80px;
    }

    .helper {
      width: 50%;
      text-align: center;
      color: #fff;

      @media only screen and (max-width: 740px) {
        margin-top: 20px;
      }

      .help-title {
        font-size: 14px;
        margin-bottom: 15px;
      }
      .help-row + .help-row {
        margin-top: 10px;
      }
      .help-row {
        display: flex;
        align-items: center;
        justify-content: right;
        height: 30px;
        font-size: 16px;

        .anticon {
          font-size: 20px;
          margin-right: 10px;
        }

        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }

        a {
          color: #fff;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
