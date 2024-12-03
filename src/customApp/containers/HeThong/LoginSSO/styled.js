import styled from 'styled-components';
import bgImage from '../../../../image/loginKKTS.png';
import {transition} from '../../../../settings/style-util'// import palete from ''

export default styled.div`
  ${transition()};
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: url(${bgImage}) no-repeat center center;
  display: flex;
  flex-wrap: wrap;
  background-size: cover;
  
  @media only screen and (max-width: 740px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  .col-center {
    text-align: center;
    ${transition(0.5)};
   
    &.title {
      font-size: 30px;
      font-weight: bold;
      text-transform: uppercase;
      color: #FFF;
      height: 55px;
      position: absolute;
      top: 100px;
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
  
  .col-left {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .head-text {
      font-size: 36px;
      font-weight: bold;
      text-transform: uppercase;
      color: #FFF;
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
      width: 100%;
      border-right: solid 1px #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      .main-icon {
        .anticon {
          font-size: 70px;
          color: #FFF;
          margin-bottom: 40px;
        }
      }
      
      .input {
        text-align: center;
        display: flex;
        flex-direction: column;
        
        .ant-input-affix-wrapper {
          height: 45px;
          margin-bottom: 15px;
          width: 350px;
          
          .ant-input-prefix {
            color: #0059b3;
            font-size: 22px;
          }
        }
        
        .ant-input {
          border-radius: 8px;
          padding-left: 40px;
          font-size: 18px;
          color: #555;
        }
      }
      
      .button {
        margin-bottom: 15px;
        
        .ant-btn {
          width: 350px;
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
      width: 350px;
      
      .ant-checkbox-wrapper {
        color: #FFF;
      }
      
      .forgot {
        margin-left: auto;
        cursor: pointer;
        
        a {
          color: #FFF;
        }
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  .col-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    
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
      color: #FFF;
      text-align: center;
      margin-bottom: 80px;
    }
    
    .helper {
      width: 350px;
      text-align: left;
      color: #FFF;
      
      @media only screen and (max-width: 740px) {
        margin-top: 20px;
      }
      
      .help-title {
        font-size: 25px;
        margin-bottom: 15px;
      }
      
      .help-row {
        display: flex;
        align-items: center;
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
          color: #FFF;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;