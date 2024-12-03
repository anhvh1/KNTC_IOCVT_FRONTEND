import styled from "styled-components";
import bgImage from "../../../../image/bgLogin.png";

export default styled.div`
  height: 100vh;
  overflow-y: auto;
  .login-notice {
    font-size: 14px;
    margin-top: 10px;
    text-align: right;
    width: 100%;
    text-decoration: underline;
    cursor: pointer;
    color: rgba(42, 49, 48, 1);
  }
  .recaptcha-container {
    transform-origin: top;
    display: flex;
    justify-content: left;
    width: 100%;
    position: relative;
    .fake-capcha {
      position: absolute;
      width: 140px;
      right: 0;
      z-index: 10000;
      background: #f9f9f9;
      height: 97%;
      border-top: 1px solid #d3d3d3;
      border-right: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;
      display: flex;
      justify-content: right;
      align-items: center;
      padding-right: 10px;
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        a {
          text-decoration: none;
          color: #000;
        }
        img {
          width: 30px;
        }
        p {
          font-size: 10px;
        }
      }
    }
  }
  .login-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background: #e3f6fa;
    background-size: cover;
    background-position: left;
    align-items: center;
    position: relative;
    /* padding: 60px 0; */
  }

  .custom-captcha {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dcdcdc;
    padding: 10px;
    background-color: #f9f9f9;
    cursor: pointer;
    width: 300px;
  }

  .checkbox input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .captcha-logo img {
    width: 40px;
    height: 40px;
  }
  .login-left {
    flex: 0 0 60%;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(
        to right,
        rgba(24, 144, 255, 0.7),
        rgba(255, 255, 255, 0.7)
      );
    }
  }

  .login-wrapper {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: rgba(255, 255, 255);
    align-items: center;
    border-radius: 8px;
    padding: min(40px, 5vh);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    /* height: 70vh; */
    z-index: 2;
  }

  .login-header {
    text-align: center;
    /* margin-top: 2rem; */
    margin-bottom: min(30px, 6vh);

    .logo {
      width: min(80px, 10vh);
      height: min(80px, 10vh);
      min-width: 50px;
      min-height: 50px;
    }

    .header-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;
      margin-top: min(30px, 4vh);
      h1 {
        font-weight: 700;
        font-size: max(min(1.5rem, 3.5vh), 24px);
        margin: 0;
        color: #000;
        font-family: "Open Sans", sans-serif;
      }
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .ant-input {
      min-width: 320px;
      border: 1px solid rgba(191, 185, 185, 1) !important;
      background: #fff;
      /* height: 40px !important; */
      height: 41px;
      width: min(60vh, 21vw);
      max-width: 400px;
      outline: none;
      border-radius: 4px;
      font-size: 14px;
    }
    input:focus {
      background-color: #fff; /* Màu nền khi nhập liệu, tùy chọn */
    }

    input + input {
      margin-top: 20px;
    }

    h3 {
      text-align: center;
      color: #1890ff;
      font-size: 1.5rem;
    }

    .ant-input-affix-wrapper {
      height: 40px;
    }

    .ant-checkbox-wrapper {
      margin-left: 0;
    }

    .ant-btn {
      margin-top: 15px;
      width: 100%;
      height: 40px;
      font-size: 1rem;
      background: #28a745;
      text-transform: none;
      color: #fff;
      border: none;
      &:hover {
        background-color: #28a745; /* Màu nền khi hover */
        color: rgba(255, 255, 255, 0.8); /* Màu chữ khi hover */
      }
    }

    .forgot-password {
      text-align: right;
      width: 100%;
      margin: 10px 0;
      a {
        cursor: pointer;
        font-size: 0.8rem;
        text-decoration: underline;
        color: rgba(42, 49, 48, 1);
      }
    }
  }

  .copy-right {
    bottom: 10px;
    z-index: 1;
    color: rgb(255, 255, 255);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .support-info {
    color: #006400;
    display: flex;
    gap: 14px;
    /* align-items: center; */
    /* flex-direction: column; */
    margin-top: 20px;
    position: absolute;
    bottom: 10px;
    span {
      color: #006400;
    }
    .anticon {
      font-size: 20px;
    }
    .download {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    a {
      color: #006400;
      text-decoration: none !important;
    }
    img {
      width: 20px;
      height: 20px;
    }
    h4 {
      font-size: 1rem;
      margin-bottom: 0.8rem;
    }
    p {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }

  .copyright {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: rgb(24, 144, 255);
    font-size: 0.9rem;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    /* .login-left {
      flex: 0 0 50%;
    } */
    /* .login-wrapper {
      flex: 0 0 50%;
    } */
  }

  @media only screen and (max-width: 1200px) {
  }

  @media only screen and (max-width: 991px) {
  }

  @media only screen and (max-width: 768px) {
    /* .login-wrapper {
      min-width: 370px;
      max-width: 370px;
    }
    .login-container {
      flex-direction: column;
    }

    .login-left {
      flex: none;
      height: 200px;
    }

    .copyright {
      position: static;
      margin-top: 1rem;
      text-align: center;
      color: #333;
    } */
  }
  @media only screen and (max-width: 576px) {
  }
  @media only screen and (max-height: 768px) {
  }
  @media only screen and (max-height: 600px) {
    .copy-right {
      display: none;
    }
  }
  @media only screen and (max-height: 550px) {
    .login-container {
      padding: 50px 0;
    }
  }
`;
