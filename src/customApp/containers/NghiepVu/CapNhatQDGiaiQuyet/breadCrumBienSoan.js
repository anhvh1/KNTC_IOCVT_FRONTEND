import React from 'react';
import BreadCrumbStyled from './breadCumb.style';

export default (props) => {
  const {currentKey, listTab} = props;

  return (
    <BreadCrumbStyled className={`${props.className ? props.className : ''}`}>
      {listTab.length > 1
        ? listTab.map((item, index) => {
            const step = (
              <div
                className={`breadcrumb_step ${
                  currentKey === item.key ? 'active' : ''
                }`}
                onClick={() => props.changeTab(item.key)}
              >
                <span className={'step_label__number '}>{index + 1}</span>
                <span className={'step_label'}>{item.label}</span>
              </div>
            );
            if (item.key === 'thong-ke') {
              return step;
            } else {
              if (currentKey === 'ngan-hang-cau-hoi') {
                return step;
              } else {
                return step;
              }
            }
          })
        : ''}
    </BreadCrumbStyled>
  );
};
