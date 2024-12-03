import styled from 'styled-components';
import {palette} from 'styled-theme';
import WithDirection from '../../settings/withDirection';

const WDComponentTitleWrapper = styled.h1`
  font-size: 19px;
  font-weight: 600;
  color: ${palette('secondary', 2)};
  padding-left: 10px;
  /* margin-bottom: 15px; */
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  text-transform: uppercase;
  /*   
  &:before {
    content: '';
    width: 4px;
    height: 35px;
    background-color: ${palette('secondary', 11)};
    display: flex;
    margin: ${(props) =>
    props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 8px 0 0'};
  } */

  .long-text {
    @media only screen and (max-width: 800px) {
      font-size: 16px;
    }

    @media only screen and (max-width: 479px) {
      font-size: 14px;
    }

    @media only screen and (max-width: 430px) {
      font-size: 12px;
    }

    .ke-khai-lai {
      color: #ff4c3b;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);
export {ComponentTitleWrapper};
