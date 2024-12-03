import React from 'react';
import { ComponentTitleWrapper } from './pageHeader.style';
import queryString from 'query-string'
import { useSelector } from 'react-redux';
export default props => {
  const isIframe = JSON.parse(localStorage.getItem('data_config'))?.isIframe ? JSON.parse(localStorage.getItem('data_config')).isIframe : false
  return !isIframe ? <ComponentTitleWrapper className="isoComponentTitle">
  {props.children}
</ComponentTitleWrapper> : null
}