import styled from 'styled-components';

import WithDirection from '../../settings/withDirection';

const WDComponentDivFilter = styled.div`
  padding-bottom: ${(props) => (props.isIframe ? '' : '10px')};
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: start; */
  justify-content: end;
  align-items: center;
  /* & > div + div {
    margin-right: 10px;
  }
  & > div:first-child {
    margin-right: 10px;
  } */
  & > * {
    margin-right: 0 !important;
    /* padding: 0; */
  }
  gap: 10px;
  display: ${(props) =>
    props?.isCenter === true ? 'flex' : props?.isLeft === true ? 'start' : ''};
  justify-content: ${(props) =>
    props?.isCenter === true
      ? 'center'
      : props?.isLeft === true
      ? 'start'
      : ''};
  /* gap: ${(props) => (props?.isCenter === true ? '5px' : '')}; */
  .ant-select-search,
  .ant-select,
  .ant-calendar-picker {
    margin-right: 10px;

    &.ant-calendar-picker {
      margin-left: 5px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ComponentDivFilter = WithDirection(WDComponentDivFilter);
export {ComponentDivFilter};
