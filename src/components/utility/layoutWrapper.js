import React from 'react';
import {LayoutContentWrapper} from './layoutWrapper.style';

export default (props) => {
  const isIframe = JSON.parse(localStorage.getItem('data_config'))?.isIframe
    ? JSON.parse(localStorage.getItem('data_config')).isIframe
    : false;
  const heightFooter =
    document.querySelectorAll('.ant-layout-footer')[0]?.clientHeight;
  return (
    <LayoutContentWrapper
      // style={{height : isIframe ? '100%' : heightFooter ? `calc(100% - ${heightFooter}px)` : 'auto'}}
      style={{height: isIframe ? '100%' : heightFooter ? `100%` : 'auto'}}
      isIframe={isIframe}
      className={
        props.className != null
          ? `${props.className} isoLayoutContentWrapper`
          : 'isoLayoutContentWrapper'
      }
      {...props}
    >
      {props.children}
    </LayoutContentWrapper>
  );
};
