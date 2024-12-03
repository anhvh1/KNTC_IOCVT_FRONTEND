import styled from 'styled-components';

const Wrapper = styled.div`
  .swiper-wrapper {
    .nav-item {
      height: 50px;
    }
    .swiper-slide {
      /* margin: 0 !important; */
    }
  }
  .wrap-swiper {
    position: relative;
  }
  .swiper-button-prev {
    right: 7px !important;
    /* top: 90px !important; */
  }
  .swiper-button-next {
    right: left !important;
    /* top: 90px !important; */
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 20px !important;
  }
  .ant-tabs {
    margin: 10px 40px;
    position: static !important;
    .ant-tabs-nav-list {
      display: none;
    }
    /* .ant-tabs-nav::before {
      display: none !important;
    }
    .ant-tabs-nav-wrap div:first-child {
      transform: none !important;
    } */

    .ant-tabs-ink-bar {
      display: none;
    }
    /* .ant-tabs-ink-bar-animated {
      display: none;
    } */
    .ant-tabs-tab {
      margin: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      /* padding: 12px 51px; */
      width: 100%;
      border-left: 1px solid #0b57d0;
      border-right: 1px solid #0b57d0;
      padding: 0 15px;
    }
    .ant-tabs-tab-active {
      background: #0f6cbd;
      border: 1px solid #0b57d0;
      .ant-tabs__title {
        color: #fff;
      }
    }
    /* .ant-tabs-nav::before {
      content: none !important;
    } */
  }

  .justifyEnd {
    justify-content: end !important;
  }
  .line-break {
    /* position: absolute; */
    width: 100%;
    height: 1px;
    background: #0f6cbd;
    left: 0;
    right: 0;
  }
  .group {
    padding-top: 5px;
    padding-bottom: 12px;
  }
  .title {
    font-weight: 600;
    /* margin: 5px 0; */
    /* margin-top: 5px; */
    padding-top: 5px;
    margin-bottom: 12px;
  }

  .wrapper-row {
    position: relative;
    & .ant-col {
      padding-right: 0 !important;
    }
    & .ant-col:last-child {
      /* padding-left: 0; */
    }
  }

  .wrapper-row::after {
    position: absolute;
    content: '';
    background: #0b57d0;
    height: 100%;
    width: 2px;
    left: 50%;
    transform: translate(-50%);
    @media only screen and (max-width: 1200px) {
      display: none;
    }
  }

  .box-title {
    border-bottom: 1px solid #0f6cbd;
    p {
      margin: 0;
      border: 1px solid #0b57d0;
      background: #0f6cbd;
      padding: 5px 10px;
      max-width: 350px;
      color: #fff;
    }
  }

  .wraper-info__report {
    padding-top: 12px;
    padding-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    & > p {
      flex-basis: 50%;
    }
    & > p:nth-child(3) {
      flex-basis: 100%;
    }
    .label-line {
      flex-basis: 100%;
    }
    .box-file {
      width: 100%;
    }
  }
  .wrapper-info__userReport,
  .wrapper-info__userComplaint,
  .wrapper-info__shared {
    padding-top: 12px;
    padding-bottom: 15px;
  }
  .progress {
    .progress-wrapper {
      /* display: grid; */
      /* grid-template-columns: 20% 20% 20% 20%; */
      gap: 20px;
      display: flex;
      justify-content: start;

      /* justify-content: space-between; */
      .progress-icon {
        height: 20px;
        width: 20px;
      }
      .progress-items {
        flex-basis: 24%;
        position: relative;
      }
      .progress-items__wrap {
        height: 100%;
        width: 80%;
        background: #2878d7;
        display: flex;
        flex-direction: column;
        /* padding: 10px 15px; */
        position: relative;
        .progress-items__title {
          padding: 9px 15px;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          border-bottom: 1px solid #fff;
        }
        .progress-items__content {
          /* padding: 10px 0; */
          flex: 1;
          display: flex;
          /* align-items: end; */
          flex-direction: column;
          justify-content: end;
          .progress-icon {
            font-size: 16px;
            color: #fff;
          }
          .time {
            padding-top: 10px;
          }
          .user {
            padding: 5px 0;
          }
          .location {
            padding-bottom: 10px;
          }
          .time,
          .user,
          .location {
            display: flex;
            padding-left: 15px;
            padding-right: 15px;
            p {
              margin-left: 15px;
              color: #fff;
            }
          }
          .user {
            margin: 5px 0;
          }
        }
      }
    }

    .progress-end .progress-items:last-child .progress-items__wrap::before {
      display: none;
    }
    .progress-end .progress-items:last-child .progress-items__wrap::after {
      display: none;
    }
    .progress-items__unfulfilled .progress-items__wrap {
      background: #d9001b;
    }
    .progress-end .progress-items:last-child .progress-items__wrap {
      .progress-items__title {
        color: #fff;
      }
      .progress-items__content .progress-icon {
        color: #fff;
      }
      .time,
      .user,
      .location {
        display: flex;
        p {
          margin-left: 15px;
          color: #fff;
        }
      }
    }
    & .progress-wrapper:nth-child(even) {
      /* background-color: grey; */
      flex-direction: row-reverse;
      .progress-items:not(:last-child) .progress-items__wrap::before {
        position: absolute;
        content: '';
        left: -70px;
        width: 70px;
        z-index: 0;
        height: 2px;
        background: #2878d7;
        top: 50%;
        transform: translateY(-50%);
      }
      .progress-items:last-child .progress-items__wrap::before {
        position: absolute;
        content: '';
        height: 100px;
        width: 1px;
        background: #2878d7;
        bottom: -100px;
        left: 50%;
        right: 0;
        transform: translateX(-50%);
      }
      .progress-items:not(:last-child)::after {
        position: absolute;
        content: '';
        left: calc(-20% - 20px);
        width: 18px;
        z-index: 0;
        height: 18px;
        background: #2878d7;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(50% 0%, 50% 50%, 50% 100%, 0% 50%);
      }
      .progress-items:last-child .progress-items__wrap::after {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        background: rgb(40, 120, 215);
        bottom: -50px;
        left: 50%;
        right: 0px;
        transform: translateX(-50%);
        clip-path: polygon(49% 50%, 100% 50%, 50% 100%, 0% 50%);
      }
    }
    & .progress-wrapper:nth-child(odd) {
      .progress-items:not(:last-child) .progress-items__wrap::before {
        position: absolute;
        content: '';
        right: -70px;
        width: 70px;
        z-index: 0;
        height: 2px;
        background: #2878d7;
        top: 50%;
        transform: translateY(-50%);
      }
      .progress-items:last-child .progress-items__wrap::before {
        position: absolute;
        content: '';
        height: 100px;
        width: 1px;
        background: #2878d7;
        bottom: -100px;
        left: 50%;
        right: 0;
        transform: translateX(-50%);
      }
      .progress-items:not(:last-child)::after {
        position: absolute;
        content: '';
        right: -20px;
        width: 18px;
        z-index: 0;
        height: 18px;
        background: #2878d7;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 50% 50%);
      }
      .progress-items:last-child .progress-items__wrap::after {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        background: rgb(40, 120, 215);
        bottom: -50px;
        left: 50%;
        right: 0px;
        transform: translateX(-50%);
        clip-path: polygon(49% 50%, 100% 50%, 50% 100%, 0% 50%);
      }
      /* background-color: #2878D7; */
    }
    .progress-wrapper + .progress-wrapper {
      margin-top: 50px;
    }
  }
  .label {
    /* padding-top: 5px;
    padding-bottom: 10px; */
    /* margin-top: 9px; */
    /* margin-bottom: 5px; */
    padding-top: 5px;
    font-weight: 500;
    span {
      font-weight: 400;
    }
  }
  .step-title {
  }
  .wrapper-info__shared,
  .wrapper-result {
    display: grid;
    grid-template-columns: 40% 40% auto;
  }
  .wrapper-info {
    .wrapper-info__top {
      grid-template-columns: 40% 20% 20% 20%;
      display: grid;
    }
    .wrapper-info__bottom {
      grid-template-columns: 20% 20% 20% 20% 20%;
      display: grid;
    }
    .wrapper-info__bottom2 {
      grid-template-columns: 20% 20% 20% 20% 20%;
      display: grid;
    }
    .wrapper-info__report {
      display: grid;
      grid-template-columns: 40% 40% 20%;
    }
  }
  .wrapper-info__hidden {
    display: none;
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
    margin-bottom: 20px;
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
    margin-bottom: 20px;
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
  @media only screen and (max-width: 1410px) {
    .wrapper-info {
      .wrapper-info__top {
        display: none;
      }
      .wrapper-info__bottom,
      .wrapper-info__bottom2 {
        display: none;
      }
      .wrapper-info__report {
        display: none;
      }
      .wrapper-info__hidden {
        display: grid;
        grid-template-columns: 33% 33% 33%;
      }
    }
    .wrapper-info__shared {
      grid-template-columns: 33% 33% 33%;
    }
  }
  @media only screen and (max-width: 1100px) {
    .progress .progress-wrapper {
      justify-content: end;
      .progress-items {
        flex-basis: 32%;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    /* .progress
      .progress-wrapper:nth-child(2n + 1)
      .progress-items:not(:last-child)
      .progress-items__wrap::before {
      right: -63px;
      width: 63px;
    } */
  }
  @media only screen and (max-width: 800px) {
    .progress .progress-wrapper .progress-items {
      flex-basis: 49%;
    }
    /* .progress
      .progress-wrapper:nth-child(2n)
      .progress-items:not(:last-child)
      .progress-items__wrap::before {
      width: 80px;
      right: -80px;
    } */
  }
  @media only screen and (max-width: 560px) {
    .progress .progress-wrapper {
      justify-content: center;
      .progress-items {
        flex-basis: 75%;
      }
      .progress-items__wrap {
        width: 100%;
      }
    }
  }
  .title-user__claims {
    /* margin-top: 10px; */
    font-size: 14px;
    font-weight: 600;
  }
`;
// 201px 297px 282px 237px 163px
export default Wrapper;
