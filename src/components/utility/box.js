import React, {useEffect} from 'react';
import BoxTitleWrapper from './boxTitle';
import {BoxWrapper} from './box.style';
import {getConfigLocal} from '../../helpers/utility';

export default (props) => {
  const heightTitle =
    document.querySelectorAll('.isoComponentTitle')[0]?.clientHeight;
  const isIframe = getConfigLocal('isIframe', false);

  useEffect(() => {
    const antTableWrapper = document.querySelector('.ant-table-wrapper');
    if (antTableWrapper?.parentElement) {
      // antTableWrapper.parentElement.style.display = 'flex';
      // antTableWrapper.parentElement.style.height = '100%';
      // antTableWrapper.parentElement.style.flexDirection = 'column';
    }
  }, []);

  return (
    <BoxWrapper
      {...props}
      isIframe={isIframe}
      className={`${props.className ? props.className : ''} isoBoxWrapper`}
      style={{
        ...props.style,
        // , height: 'inherit'
      }}
      heightTitle={heightTitle}
    >
      <div className="box-content">
        <BoxTitleWrapper title={props.title} subtitle={props.subtitle} />
        {props.children}
      </div>
    </BoxWrapper>
  );
};
