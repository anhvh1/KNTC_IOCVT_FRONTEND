import React from 'react';
import {ComponentDivFilter} from './boxFilter.style';
import {getConfigLocal} from '../../helpers/utility';

export default (props) => {
  const isIframe = getConfigLocal('isIframe', false);
  const {isDashBoard, isCenter} = props;
  return (
    <ComponentDivFilter
      isCenter={isCenter}
      {...props}
      isIframe={isIframe}
      className="boxFilter"
    >
      {props.children}
    </ComponentDivFilter>
  );
};
