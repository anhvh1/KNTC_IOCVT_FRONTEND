import styled from 'styled-components';
import {palette} from 'styled-theme';
const Wrapper = styled.div`
  .Wrapper-listmenu__active {
    overflow: hidden;
    /* width: 0; */
    transition: all 0.3s ease-in-out;
    background: ${palette('primary', 20)};
    /* height: calc(100% + 35px); */
    padding: 0 5px;
    /* padding: 0 10px; */
    .menu-items {
      padding-top: 5px;
      width: 100%;
      /* background: #D3E3FD; */
      /* padding:  10px; */
      a {
        color: #000;
        padding: 10px;
        display: inline-block;
        width: 100%;
      }
      p {
        border-radius: 111px;
      }
    }
    .menu-items:not(.menu_items__active):hover p {
      background: ${palette('primary', 21)};
    }
    .menu-items + .menu-items {
      border-top: 1px solid #dddddd;
    }
    .menu_items__active p {
      background: #d3e3fd;
    }
  }
`;

export default Wrapper;
