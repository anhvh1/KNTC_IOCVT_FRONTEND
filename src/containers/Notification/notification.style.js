import styled from 'styled-components';

const SidebarWrapper = styled.div`
  .menu-notification {
    position: fixed;
    right: 3%;
    bottom: 85px;
    background: #fff;
    padding: 10px;
    z-index: 1000;
    box-shadow: rgb(205, 209, 214) 0px 0px 7px 1px;
    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .menu-close {
        font-size: 22px;
      }
    }
    .menu-content {
      .menu-item {
        padding: 12px 10px !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        .menu-item__link a {
          color: #000;
          /* font-size: 13px; */
        }
        .menu-item__content {
          background-color: #d01e1e;
          border-radius: 2.5px;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          height: 20px;
          line-height: 20px;
          text-align: center;
          vertical-align: middle;
          width: 40px;
        }
      }
    }
  }
  .notification-wrapper {
    z-index: 10;
    position: fixed;
    bottom: 45px;
    background: #fff;
    right: 2%;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0px 0px 11px 5px #cdd1d6;
    cursor: pointer;
    .notification-circle {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .notification-icon {
        font-size: 40px;
        color: red;
      }
      .notification-content {
        position: absolute;
        color: #fff;
        font-size: 11px;
      }
    }
  }
`;

export default SidebarWrapper;
