import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/HeThong/QLEmail/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';
import {Option} from '../../../../components/uielements/exportComponent';
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
import {useSelector} from 'react-redux';
import PageWrap from '../../../../components/utility/PageWrap';
const QuanLyEmail = (props) => {
  document.title = 'Quản Lý Email';
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
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    props.getInit(filterData);
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

  const deleteModalAddEdit = (EmailID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa email này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaEmail({ListID: [EmailID]})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getList({
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
    const EmailID = id;
    setAction('edit');
    api
      .ChiTietEmail({EmailID})
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
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === 'add') {
      api
        .CapNhatEmail(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
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
        .CapNhatEmail(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
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
            <EditOutlined onClick={() => showModalEdit(record.EmailID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.EmailID)}
            />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  };

  const renderCheckBox = (record) => {
    return <Checkbox checked={record.Active} />;
  };

  const {DanhSachEmail, TotalRow, role, DanhSachLoaiEmail} = props;

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Loại Email',
      align: 'left',
      width: '15%',
      render: (text, record) =>
        record.LoaiEmailID
          ? DanhSachLoaiEmail.find(
              (item) => item.LoaiEmailID === record.LoaiEmailID,
            )?.TenEmail
          : null,
    },
    {
      title: 'Ngày tạo',
      align: 'left',
      width: '25%',
      render: (text, record) =>
        record.NgayTao ? moment(record.NgayTao).format('DD/MM/YYYY') : null,
    },

    {
      title: 'Nội dung email',
      dataIndex: 'NoiDungEmail',
      align: 'left',
      width: '35%',
    },

    {
      title: 'Sử dụng',
      align: 'center',
      width: '10%',
      render: (text, record) => renderCheckBox(record),
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
        <PageHeader>Quản Lý Email</PageHeader>
        <PageAction>
          {role ? (
            role.add ? (
              <Button type="primary" onClick={showModalAdd}>
                <PlusOutlined />
                Thêm Mới
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
            defaultValue={filterData.LoaiEmailID}
            placeholder={'Chọn loại email'}
            allowClear
            onChange={(value) => onFilter(value, 'LoaiEmailID')}
          >
            {DanhSachLoaiEmail
              ? DanhSachLoaiEmail.map((item) => (
                  <Option value={item.LoaiEmailID?.toString()}>
                    {item.TenEmail}
                  </Option>
                ))
              : null}
          </Select>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={'Tìm kiếm theo nội dung'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachEmail}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          rowKey={(record) => record.EmailID}
        />
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachLoaiEmail={DanhSachLoaiEmail}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QuanLyEmail,
    role: getRoleByKey(state.Auth.role, 'ql-email'),
  };
}

export default connect(mapStateToProps, actions)(QuanLyEmail);
