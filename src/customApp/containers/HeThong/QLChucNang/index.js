import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/HeThong/QLChucNang/actions';
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
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import PageWrap from '../../../../components/utility/PageWrap';
const QLNamHoc = (props) => {
  document.title = 'Quản lý chức năng';

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getListData(filterData);
  }, [filterData]);
  useEffect(() => {
    props.getListData(filterData);
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };
  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const deleteModalAddEdit = (ChucNangID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa chức năng này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaChucNang(ChucNangID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getListData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
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
  const showModalEdit = (id) => {
    const ChucNangID = id;
    setAction('edit');
    api
      .ChiTietChucNang({ChucNangID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalAddEdit(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const hideModalAddEdit = () => {
    setAction('');
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === 'add') {
      api
        .THemChucNang(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getListData(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === 'edit') {
      api
        .CapNhatChucNang(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getListData(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {role.edit ? (
          <Tooltip title={'Sửa'}>
            <EditOutlined onClick={() => showModalEdit(record.ChucNangID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.ChucNangID)}
            />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  };
  const handleRenderSTT = (text, record, index) => {
    if (record.ChucNangChaID === null) {
      return <b>{record.TT}</b>;
    } else {
      return <p>{record.TT}</p>;
    }
  };
  const handleFontWeightMa = (text, record, index) => {
    if (record.ChucNangChaID === null) {
      return <b>{record.MaChucNang}</b>;
    } else {
      return <p>{record.MaChucNang}</p>;
    }
  };
  const handleFontWeightName = (text, record, index) => {
    if (record.ChucNangChaID === null) {
      return <b>{record.TenChucNang}</b>;
    } else {
      return <p>{record.TenChucNang}</p>;
    }
  };
  const handleFontWeightIcon = (text, record, index) => {
    if (record.ChucNangChaID === null) {
      return <b>{record.Icon}</b>;
    } else {
      return <p>{record.Icon}</p>;
    }
  };
  const handleFontWeightShow = (text, record, index) => {
    if (record.ChucNangChaID === null) {
      return <b>{record.ThuTuSapXep}</b>;
    } else {
      return <p>{record.ThuTuSapXep}</p>;
    }
  };

  const {DanhSachChucNang, TotalRow, role} = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: '5%',
      render: (text, record, index) => handleRenderSTT(text, record, index),
    },
    {
      title: 'Mã chức năng',
      align: 'center',
      width: '10%',
      render: (text, record, index) => handleFontWeightMa(text, record, index),
    },
    {
      title: 'Tên chức năng',
      align: 'left',
      width: '25%',
      render: (text, record, index) =>
        handleFontWeightName(text, record, index),
    },
    {
      title: 'Icon trên menu',
      dataIndex: 'Icon',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        handleFontWeightIcon(text, record, index),
    },
    {
      title: 'Thứ tự hiện thị',
      dataIndex: 'ThuTuSapXep',
      align: 'center',
      width: '6%',
      render: (text, record, index) =>
        handleFontWeightShow(text, record, index),
    },
    {
      title: 'Hiển thị trên menu',
      dataIndex: 'HienThiTrenMenu',
      align: 'center',
      width: '10%',
      render: (text, record) => {
        return <Checkbox checked={record.HienThiTrenMenu}></Checkbox>;
      },
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>QUẢN LÝ CHỨC NĂNG</PageHeader>
        <PageAction>
          {role ? (
            role.add ? (
              <Button type="primary" onClick={showModalAdd}>
                <PlusOutlined />
                Thêm mới
              </Button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Select
            style={{width: '200px'}}
            defaultValue={filterData.Status}
            placeholder={'Chọn trạng thái'}
            allowClear
            onChange={(value) => onFilter(value, 'Status')}
          >
            <Option value={true}>Đang sử dụng</Option>
            <Option value={false}>Không sử dụng</Option>
          </Select>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Tìm kiếm theo tên chức năng'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        {DanhSachChucNang ? (
          DanhSachChucNang.length > 0 ? (
            <BoxTable
              expandable={{
                childrenColumnName: 'Children',
                defaultExpandAllRows: true,
              }}
              size="large"
              columns={columns}
              dataSource={DanhSachChucNang}
              onChange={onTableChange}
              pagination={{
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                total: TotalRow,
                current: PageNumber,
                pageSize: PageSize,
              }}
            />
          ) : null
        ) : null}
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachChucNang={DanhSachChucNang}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLChucNang,
    role: getRoleByKey(state.Auth.role, 'quan-ly-chuc-nang'),
    actions,
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
