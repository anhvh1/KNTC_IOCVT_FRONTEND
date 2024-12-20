import styled from 'styled-components';
import {palette} from 'styled-theme';
const LayoutContentWrapper = styled.div`
  padding: 0 10px 15px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* flex-flow: row wrap; */
  /* height: calc(100% - 20px) !important;  */
  /* background: ${palette('primary', 16)}; */
  /* overflow: hidden; */ // commet to changed layout
  @media only screen and (max-width: 767px) {
    padding: 15px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`;

export {LayoutContentWrapper};
