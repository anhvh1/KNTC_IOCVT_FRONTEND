import styled from 'styled-components';
import {palette} from 'styled-theme';

const breadcrumb_theme = [palette('primary', 0), '#FFF'];

export default styled.div`
  /* margin: 20px 0 0 20px; */
  text-align: center;
  display: flex;
  /* display: inline-block; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 5px;
  counter-reset: flag;
  position: relative;
  flex-wrap: wrap;

  &.absolute {
    position: absolute;
    z-index: 99;
  }

  .breadcrumb_step {
    /* text-decoration: none;
    outline: none;
    display: block;
    float: left; */
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 36px;
    padding: 0 20px 0 20px;
    position: relative;
    background: ${breadcrumb_theme[1]};
    color: ${breadcrumb_theme[0]};
    /* transition: background 0.5s; */
    cursor: pointer;
    position: relative;
    clip-path: polygon(
      -100px 0px,
      95% 0px,
      100% 52%,
      95% 100%,
      -100px 100%,
      0px 52%,
      0px 50%
    );

    .step_label {
      /* font-size: 13px; */
      margin-left: 10px;
    }

    .step_label__number {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #0b57d0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 15px;
      right: 0;
      background: #0b57d0;
      clip-path: polygon(
        0 0,
        18% 0,
        100% 52%,
        20% 100%,
        0 100%,
        82% 51%,
        77% 49%
      );
    }

    /* &::before {
      position: absolute;
      content: '';
      height: 100%;
      width: 15px;
      background: #0b57d0;
    } */
    &:first-child {
      /* padding-left: 46px; */
      border-radius: 5px 0 0 5px;

      &::before {
        left: 14px;
      }
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
      padding-right: 20px;

      &::after {
        content: none;
      }
    }

    /* &::before {
      content: counter(flag);
      counter-increment: flag;
      border-radius: 100%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin: 8px 0;
      position: absolute;
      top: 0;
      left: 30px;
      font-weight: bold;
      background: ${breadcrumb_theme[1]};
      box-shadow: 0 0 0 1px ${breadcrumb_theme[0]};;
    }
     */
    /* &::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -5px;
      width: 10px;
      height: 10px;
      clip-path: circle(50% at 50% 50%);
      z-index: 1;
      background: #fff;
      transition: 0.5s;
    } */

    &.active {
      color: ${breadcrumb_theme[1]};
      background: ${breadcrumb_theme[0]};
      z-index: 99999;
      &::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 16px;
        left: -14px;
        background: rgb(40, 120, 215);
        transition: background 0.5s ease 0s;
        clip-path: polygon(
          0px 0px,
          100% 0px,
          100% 70%,
          100% 100%,
          0px 100%,
          82% 51%,
          77% 49%
        );
      }
      .step_label__number {
        background: #fff;
        border: 1px solid #fff;
        color: rgb(11, 87, 208);
      }

      &::before {
        color: ${breadcrumb_theme[0]};
      }

      &::after {
        background: ${breadcrumb_theme[0]};
      }
    }

    &:hover {
      color: ${breadcrumb_theme[1]};
      background: ${breadcrumb_theme[0]};
      z-index: 99999;
      .step_label__number {
        background: #fff;
        border: 1px solid #fff;
        color: rgb(11, 87, 208);
      }
      &::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 16px;
        left: -14px;
        background: rgb(40, 120, 215);
        transition: background 0.5s ease 0s;
        clip-path: polygon(
          0px 0px,
          100% 0px,
          100% 70%,
          100% 100%,
          0px 100%,
          82% 51%,
          77% 49%
        );
      }
      /* clip-path: polygon(0 0, 63% 0, 100% 52%, 64% 100%, 0 100%, 0 52%, 0 50%); */

      &::before {
        color: ${breadcrumb_theme[0]};
      }

      &::after {
        color: ${breadcrumb_theme[0]};
        background: ${breadcrumb_theme[0]};
      }
    }
  }
`;
