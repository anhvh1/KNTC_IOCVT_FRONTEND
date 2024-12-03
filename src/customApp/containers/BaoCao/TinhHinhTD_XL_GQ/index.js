import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {DatePicker, message, Modal, Tooltip} from 'antd';
import {disabledDate} from '../../../../helpers/utility';
import {
  Button,
  InputSearch,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getRoleByKey,
  getConfigLocal,
} from '../../../../helpers/utility';
import moment from 'moment';
import {useVisible} from '../../../CustomHook/useVisible';
import {useKey} from '../../../CustomHook/useKey';
import api from './config';
import ModalAddEdit from './modalAddEdit';
const BaoCaoTinhHinhTD_XL_GQ = (props) => {
  document.title = 'Danh mục chung';
  const [filterData, setFilterData] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalKey, setModalKey] = useKey();
  const [dataModalAddEdit, setDataModalAdđEit] = useState();
  const [action, setAction] = useState('');

  const {
    location,
    danhsachdonvi = [],
    tableHeader = [],
    tableData = [],
  } = props;

  const dataTable = [
    {
      name: 'abc',
    },
  ];

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      key: 'name',
    },
    {
      title: 'Tên quốc tịch',
      dataIndex: 'name',
      key: 'age',
    },
    {
      title: 'Thao tác',
      dataIndex: 'address',
      render: (text, record) => handleRenderAction(record),
    },
  ];

  const handleSubmitModal = (value) => {
    action === 'add'
      ? api
          .DanhSachDanhMucChung({Loai: paramsId})
          .then((res) => {
            if (res.data.Status > 0) {
              const {title, data} = res.data.Data;
              setDataModalAdđEit(data);
              setVisible(true);
            } else {
              message.destroy();
              message.warning(res.message);
            }
          })
          .catch((err) => {
            message.destroy();
            message.warning(err.toString());
          })
      : action === edit
      ? api
          .DanhSachDanhMucChung({Loai: paramsId})
          .then((res) => {
            if (res.data.Status > 0) {
              const {title, data} = res.data.Data;
              setDataModalAdđEit(data);
              setVisible(true);
            } else {
              message.destroy();
              message.warning(res.message);
            }
          })
          .catch((err) => {
            message.destroy();
            message.warning(err.toString());
          })
      : null;
  };

  const handleEditData = (id) => {
    setAction('edit');
    api
      .DanhSachDanhMucChung({Loai: paramsId})
      .then((res) => {
        if (res.data.Status > 0) {
          const {title, data} = res.data.Data;
          setDataModalAdđEit(data);
          setVisible(true);
        } else {
          message.destroy();
          message.warning(res.message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleRemoveData = (id) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa bậc học này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .XoaData({ListID: [id]})
          .then((res) => {
            if (res.data.Status > 0) {
              props.getList(filterData);
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

  const handleRenderAction = (record) => {
    return (
      <>
        <Button>Sửa</Button>
        <Button>Xóa</Button>
      </>
    );
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };
  return (
    <LayoutWrapper>
      {/* <PageHeader>{title}</PageHeader> */}
      <PageAction></PageAction>

      <Box>
        <BoxFilter Step={Step}>
          <DatePicker
            placeholder="Từ Ngày"
            // defaultValue={filterData?.TuNgay ? moment(filterData?.TuNgay) : moment()}
            value={
              filterData?.TuNgay ? moment(filterData?.TuNgay, 'DD/MM/YYYY') : ''
            }
            format={'DD/MM/YYYY'}
            onChange={(value, valueString) => onFilter(valueString, 'TuNgay')}
            disabledDate={(currentDate) =>
              disabledDate(currentDate, filterData.DenNgay)
            }
          ></DatePicker>
          <DatePicker
            defaultValue={
              filterData?.DenNgay
                ? moment(filterData?.DenNgay, 'DD/MM/YYYY')
                : moment()
            }
            // format = {'YYYY-MM-DD'}
            format={'DD/MM/YYYY'}
            placeholder="Đến Ngày"
            onChange={(value, valueString) => {
              return onFilter(valueString, 'DenNgay');
            }}
          ></DatePicker>
        </BoxFilter>
      </Box>
    </LayoutWrapper>
  );
};

export default BaoCaoTinhHinhTD_XL_GQ;
