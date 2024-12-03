import {Modal, Radio, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/HeThong/HuongDanSuDung/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';

import Select from '../../../../components/uielements/select';

import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import moment from 'moment';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import PageWrap from '../../../../components/utility/PageWrap';
const CauHinhQuyTrinh = (props) => {
  document.title = 'Phương án nhập dữ liệu về KNTC,PAKN';

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );

  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);

  useEffect(() => {
    api.GetByID().then((res) => {
      if (res.data.Status > 0) {
        const {QuyTrinhID} = res.data.Data;
        const newFilterData = {...filterData};
        newFilterData.QuyTrinhID = QuyTrinhID;
        setFilterData(newFilterData);
      }
    });
  }, []);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  const changeProgress = (e) => {
    const QuyTrinhID = e.target.value;
    api
      .ChangeProgress({QuyTrinhID})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Phương án nhập dữ liệu về KNTC,PAKN</PageHeader>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Radio.Group
            value={filterData?.QuyTrinhID?.toString()}
            onChange={(e) => {
              changeProgress(e);
              onFilter(e.target.value, 'QuyTrinhID');
            }}
          >
            <Radio value={'1'}>Phức tạp</Radio>
            <Radio value={'2'}>Đơn giản</Radio>
          </Radio.Group>
        </BoxFilter>
      </Box>
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.CauHinhQuyTrinh,
    role: getRoleByKey(state.Auth.role, 'quan-ly-nam-hoc'),
  };
}

export default connect(mapStateToProps, actions)(CauHinhQuyTrinh);
