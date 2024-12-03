import {Modal, Tooltip, message} from 'antd';
import actions from '../../../redux/DanhMuc/DanhMucNguonDonDen/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select, {Option} from '../../../../components/uielements/select';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import PageWrap from '../../../../components/utility/PageWrap';
const index = (props) => {
  document.title = 'Danh Mục Nguồn Đơn Đến';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {TotalRow} = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
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

  const deleteModalAddEdit = (NguonDonDenID) => {
    Modal.confirm({
      icon: <QuestionCircleOutlined />,
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa nguồn đơn đến này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaNguonDonDen({NguonDonDenID})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getList({
                ...filterData,
                PageNumber:
                  Math.ceil(
                    (TotalRow ? TotalRow - 1 : TotalRow) / filterData.PageSize,
                  ) < filterData.PageNumber
                    ? Math.ceil(
                        (TotalRow ? TotalRow - 1 : TotalRow) /
                          filterData.PageSize,
                      )
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil(
                    (TotalRow ? TotalRow - 1 : TotalRow) / filterData.PageSize,
                  ) < filterData.PageNumber
                    ? Math.ceil(
                        (TotalRow ? TotalRow - 1 : TotalRow) /
                          filterData.PageSize,
                      )
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
    const NguonDonDenID = id;
    setAction('edit');
    api
      .ChiTietNguonDonDen({NguonDonDenID})
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
        .ThemNguonDonDen(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList({
              ...filterData,
              PageNumber:
                Math.ceil(
                  (TotalRow ? TotalRow - 1 : TotalRow) / filterData.PageSize,
                ) < filterData.PageNumber
                  ? Math.ceil(
                      (TotalRow ? TotalRow - 1 : TotalRow) /
                        filterData.PageSize,
                    )
                  : filterData.PageNumber,
            });
            setFilterData({
              ...filterData,
              PageNumber:
                Math.ceil(
                  (TotalRow ? TotalRow - 1 : TotalRow) / filterData.PageSize,
                ) < filterData.PageNumber
                  ? Math.ceil(
                      (TotalRow ? TotalRow - 1 : TotalRow) /
                        filterData.PageSize,
                    )
                  : filterData.PageNumber,
            });
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
        .CapNhatNguonDonDen(data)
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
            <EditOutlined onClick={() => showModalEdit(record.NguonDonDenID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.NguonDonDenID)}
            />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  };

  const renderTrangThai = (record) => {
    return <Checkbox checked={record.TrangThai} />;
  };

  const {DanhSachNguonDonDen, role} = props;
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
      key: 'stt',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Mã nguồn đơn đến',
      dataIndex: 'MaNguonDonDen',
      align: 'left',
      width: '15%',
    },
    {
      title: 'Tên nguồn đơn đến',
      dataIndex: 'TenNguonDonDen',
      align: 'left',
      width: '25%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'GhiChu',
      align: 'left',
      width: '35%',
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '10%',
      render: (_, record) => renderTrangThai(record),
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const statusFilter = [
    {
      value: true,
      key: 'Đang sử dụng',
    },
    {
      value: false,
      key: 'Không sử dụng',
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh Mục Nguồn Đơn Đến</PageHeader>
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
            defaultValue={
              statusFilter.find(
                (item) => item.value.toString() === filterData.status,
              )?.key
            }
            style={{width: 200}}
            placeholder="Chọn trạng thái"
            allowClear
            onChange={(value) => onFilter(value, 'status')}
          >
            {statusFilter.map((item) => (
              <Option value={item.value}>{item.key}</Option>
            ))}
          </Select>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập mã hoặc tên nguồn đơn đến'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          rowKey="NguonDonDenID"
          columns={columns}
          dataSource={DanhSachNguonDonDen}
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
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachNguonDonDen={DanhSachNguonDonDen}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhMucNguonDonDen,
    role: getRoleByKey(state.Auth.role, 'danh-muc-nguon-don-den'),
  };
}

export default connect(mapStateToProps, actions)(index);
