import React from "react";
import BreadCrumbStyled from './breadCumb.style';

export default props => {
  const listTab = [
    {
      label: 'Thống kê',
      key: 'thong-ke'
    },
    {
      label: 'Ngân hàng câu hỏi',
      key: 'ngan-hang-cau-hoi'
    }
  ];
  const {currentKey, filterData} = props;

  return (
    <BreadCrumbStyled className={`${props.className ? props.className : ''}`}>
      {listTab.length > 1 ? listTab.map(item => {
        const step = <div className={`breadcrumb_step ${currentKey === item.key ? 'active' : ''}`}
                          onClick={() => props.changeTab(item.key)}>
          <span className={'step_label'}>{item.label}</span>
        </div>;
        if (item.key === 'thong-ke') {
          return step;
        } else {
          if (currentKey === 'ngan-hang-cau-hoi') {

              return step
            
          } else {
            return step;
          }
        }
      }) : ''}
    </BreadCrumbStyled>
  )
}