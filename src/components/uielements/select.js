import React from 'react';
import { Select } from 'antd';
import { getScrollParent } from '../../helpers/utility';

class CustomerSelect extends React.PureComponent {
  render() {
    const props = {
      // getPopupContainer: (e) => this.props.getPopupContainer ? this.props.getPopupContainer : getScrollParent(e),
      ...this.props,
    };
    return (
      <Select
        allowClear
        showSearch
        notFoundContent={
          props.notFoundContent ? props.notFoundContent : 'Không có dữ liệu'
        }
        optionFilterProp={
          props.optionFilterProp != undefined
            ? props.optionFilterProp
            : 'children'
        }
        dropdownStyle={{
          maxHeight: 400,
          // width: '100%',
          overflow: 'auto',
          ...this.props.dropdownStyle,
        }}
        {...props}
      />
    );
  }
}

const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default CustomerSelect;
export { Option, OptGroup };
