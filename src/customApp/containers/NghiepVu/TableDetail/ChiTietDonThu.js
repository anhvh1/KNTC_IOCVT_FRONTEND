import {Modal, Table, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DanhMucDanToc/action';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  Button,
  DatePicker,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import {Collapse} from 'antd';

const {Panel} = Collapse;
import Wrapper, {WrapperBottom} from './ChiTietDonThu.styled';
const ChiTietDonThu = (props) => {
  const {filterData, setFilterData, setStep} = props;

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  const onChange = (key) => {
    setFilterData({...filterData, keyCollapse: key});
  };

  const ToPrevStep = () => {
    setFilterData({...filterData, step: null, keyCollapse: []});
  };

  let activeKey;

  if (typeof filterData.keyCollapse === 'string') {
    activeKey = filterData.keyCollapse.split(',');
  } else {
    activeKey = filterData.keyCollapse;
  }

  return (
    <Box>
      <Collapse onChange={onChange} activeKey={activeKey} ghost>
        <Panel header="Thông tin đơn thư" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="Hồ sơ đơn thư" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="Tiến trình xử lý" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <WrapperBottom>
        <Button onClick={ToPrevStep}>Trở về</Button>
      </WrapperBottom>
    </Box>
  );
};

export default ChiTietDonThu;
