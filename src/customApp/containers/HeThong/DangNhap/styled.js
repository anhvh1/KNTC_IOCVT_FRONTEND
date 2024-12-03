import styled from "styled-components";
import bgImage from "../../../../image/login.jpg";

export default styled.div`
  height: 100vh;
  overflow-y: auto;
  .g-recaptcha {
    transform: scale(0.77);
    transform-origin: 0 0;
  }
  .login-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: left;
    align-items: center;
    padding: 50px 0;
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
    background-color: rgba(255, 255, 255, 0.8);
    align-items: center;
    border-radius: 20px;
    min-width: 500px;
  }

  .login-header {
    text-align: center;
    /* margin-top: 2rem; */
    margin-bottom: 1.5rem;

    .logo {
      width: 50px;
      height: 50px;
      margin-bottom: 0.5rem;
    }

    .header-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;
      h1 {
        font-size: 16px;
        margin: 0;
        color: #0754be;
        font-family: "Open Sans", sans-serif;
      }
      h2 {
        font-size: 16px;
        margin: 0;
        color: #0754be;
        font-weight: 700;
        font-family: "Open Sans", sans-serif;
      }
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    max-width: 230px;
    align-items: center;

    input {
      border: 1px solid #0754be !important;
      background: transparent;
      height: 30px !important;
    }

    input + input {
      margin-top: 10px;
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
      margin-top: 10px;
      width: 100%;
      height: 40px;
      font-size: 1rem;
      background: rgba(7, 84, 190, 0.9);
      border: none;
      &:hover {
        background-color: rgba(7, 84, 190, 1);
      }
    }

    .forgot-password {
      text-align: right;
      width: 100%;
      margin: 5px 0;
      a {
        font-size: 0.8rem;
        text-decoration: none;
        color: #0754be;
      }
    }
    .recaptcha-container {
      max-height: 60px;
      max-width: 230px;
    }
  }

  .support-info {
    width: 100%;
    text-align: left;
    margin-top: 0.5rem;
    /* position: absolute; */
    bottom: 2rem;
    left: 2rem;
    /* color: #fff !important; */
    z-index: 1;
    .anticon {
      font-size: 20px;
    }
    a {
      /* color: #fff; */
      text-decoration: none !important;
    }
    img {
      width: 20px;
      height: 20px;
    }
    h4 {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
    p {
      margin: 0 0 5px 0;
      font-size: 0.8rem;
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
    .login-left {
      flex: 0 0 50%;
    }
    /* .login-wrapper {
      flex: 0 0 50%;
    } */
  }

  @media only screen and (max-width: 1200px) {
    .login-wrapper {
      max-width: 550px;
    }
  }

  @media only screen and (max-width: 991px) {
    .login-wrapper {
      min-width: 450px;
    }
    .login-header .header-text h1 {
      max-width: 90%;
    }
  }

  @media only screen and (max-width: 768px) {
    .login-wrapper {
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

    .support-info {
      position: static;
      margin-top: 1rem;
      color: #333;
    }

    .copyright {
      position: static;
      margin-top: 1rem;
      text-align: center;
      color: #333;
    }
  }
  @media only screen and (max-width: 576px) {
    .login-wrapper {
      min-width: 320px;
      max-width: 320px;
    }
    .support-info {
      margin-top: 0.4rem;
      h4 {
        margin-bottom: 0.3rem;
      }
      p {
        font-size: 0.7rem;
      }
    }
  }
  @media only screen and (max-height: 768px) {
    .login-wrapper {
      transform: scale(0.8);
    }
  }
  @media only screen and (max-height: 600px) {
    .login-wrapper {
      height: 85vh;
      min-height: 500px;
      /* transform: scale(0.75); */
    }
    .login-container {
      padding: 0;
    }
  }
`;
