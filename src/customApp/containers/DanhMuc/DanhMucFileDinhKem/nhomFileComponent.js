import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Modal, Tooltip, message, Table} from 'antd';
import {PageWrapper, PageTitle} from './layout';
import Box from '../../../../components/utility/box';
import BoxTable from '../../../../components/utility/boxTable';
import PageAction from '../../../../components/utility/pageAction';
import {Button} from '../../../../components/uielements/exportComponent';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import actions from '../../../redux/DanhMuc/DanhMucFileDinhKem/nhomFileActions';
import api from './nhomFileConfig';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import ModalNhomFile from './modalNhomFile';
import {useKey} from '../../../CustomHook/useKey';
import BoxFilter from '../../../../components/utility/boxFilter';
import {
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {InputSearch} from '../../../../components/uielements/exportComponent';
import PageWrap from '../../../../components/utility/PageWrap';

function NhomFileComponent({
  danhSachChucNang,
  getList,
  filterData,
  setFilterData,
  DanhSachNhomFile,
  TotalRow,
  setSelectedRowsKey,
  onFilter,
  tableHeight,
  role,
}) {
  filterData = {
    ...filterData,
    keyword: '',
  };
  const PageNumber = filterData.NhomFilePageNumber
    ? parseInt(filterData.NhomFilePageNumber)
    : 1;
  const PageSize = filterData.NhomFilePageSize
    ? parseInt(filterData.NhomFilePageSize)
    : getDefaultPageSize();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [modalKey, inceaseModalKey] = useKey();
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [action, setAction] = useState('');
  useEffect(() => {
    getList({
      ...filterData,
      NhomFilePageNumber: PageNumber,
      NhomFilePageSize: PageSize,
    });
  }, [PageNumber, PageSize]);

  const FilterListGroupFileByKey = (value) => {
    getList({
      ...filterData,
      keyword: value,
      NhomFilePageNumber: PageNumber,
      NhomFilePageSize: PageSize,
    });
  };

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (NhomFileID) => {
    Modal.confirm({
      icon: <QuestionCircleOutlined />,
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa nhóm file này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaNhomFile({NhomFileID})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              getList({
                ...filterData,
                NhomFilePageNumber:
                  Math.ceil(
                    (TotalRow ? TotalRow - 1 : TotalRow) /
                      filterData.NhomFilePageSize,
                  ) < filterData.NhomFilePageNumber
                    ? Math.ceil(
                        (TotalRow ? TotalRow - 1 : TotalRow) /
                          filterData.NhomFilePageSize,
                      )
                    : filterData.NhomFilePageNumber,
                NhomFileID: null,
              });
              setFilterData({
                ...filterData,
                NhomFilePageNumber:
                  Math.ceil(
                    (TotalRow ? TotalRow - 1 : TotalRow) /
                      filterData.NhomFilePageSize,
                  ) < filterData.NhomFilePageNumber
                    ? Math.ceil(
                        (TotalRow ? TotalRow - 1 : TotalRow) /
                          filterData.NhomFilePageSize,
                      )
                    : filterData.NhomFilePageNumber,
                NhomFileID: null,
              });
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

  const showModalEdit = (id) => {
    const NhomFileID = id;
    setAction('edit');
    api
      .ChiTietNhomFile({NhomFileID})
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
        .ThemNhomFile(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            getList({
              ...filterData,
              NhomFilePageNumber:
                Math.ceil(
                  (TotalRow ? TotalRow - 1 : TotalRow) /
                    filterData.NhomFilePageSize,
                ) < filterData.NhomFilePageNumber
                  ? Math.ceil(
                      (TotalRow ? TotalRow - 1 : TotalRow) /
                        filterData.NhomFilePageSize,
                    )
                  : filterData.NhomFilePageNumber,
            });
            setFilterData({
              ...filterData,
              NhomFilePageNumber:
                Math.ceil(
                  (TotalRow ? TotalRow - 1 : TotalRow) /
                    filterData.NhomFilePageSize,
                ) < filterData.NhomFilePageNumber
                  ? Math.ceil(
                      (TotalRow ? TotalRow - 1 : TotalRow) /
                        filterData.NhomFilePageSize,
                    )
                  : filterData.NhomFilePageNumber,
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
        .CapNhatNhomFile(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            getList(filterData);
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

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = {
      ...filterData,
      NhomFilePageNumber: PageNumber,
      NhomFilePageSize: PageSize,
    };
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setFilterData({
      ...newFilterData,
      PageSize: oldFilterData.PageSize,
      PageNumber: oldFilterData.PageNumber,
      NhomFilePageNumber: onOrder.pagination.current,
      NhomFilePageSize: onOrder.pagination.pageSize,
    });
    setSelectedRowsKey([]);
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {role?.edit ? (
          <Tooltip title={'Sửa'}>
            <EditOutlined onClick={() => showModalEdit(record.NhomFileID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role?.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.NhomFileID)}
            />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  };

  const renderTrangThai = (record) => {
    return <Checkbox checked={record.TrangThaiSuDung} />;
  };

  const columns = [
    {
      title: 'STT',
      width: '15%',
      align: 'center',
      key: 'stt',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên nhóm file',
      dataIndex: 'TenNhomFile',
      align: 'left',
      width: '40%',
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThaiSuDung',
      align: 'center',
      width: '20%',
      render: (_, record) => renderTrangThai(record),
    },
    {
      title: 'Thao tác',
      width: '25%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const onRow = (record, rowIndex) => {
    return {
      onClick: () => {
        filterData.NhomFileID !== record.NhomFileID &&
          onFilter(record.NhomFileID, 'NhomFileID');
      },
    };
  };

  return (
    <PageWrapper>
      <PageWrap>
        <PageTitle>Danh sách nhóm file</PageTitle>
        <PageAction>
          {role?.add ? (
            <Button type="primary" onClick={showModalAdd}>
              <PlusOutlined />
              Thêm mới
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box style={{marginTop: '20px'}}>
        <BoxFilter>
          <InputSearch
            allowClear
            defaultValue={filterData.KeywordNhomFile}
            placeholder={'Tìm kiếm theo tên nhóm file'}
            style={{width: 300}}
            onSearch={(value) => {
              onFilter(value, 'KeywordNhomFile');
              FilterListGroupFileByKey(value);
            }}
          />
        </BoxFilter>
        <BoxTable
          className="tableCustomHeight"
          onRow={onRow}
          rowKey="NhomFileID"
          rowClassName={(record) =>
            record.NhomFileID == filterData.NhomFileID
              ? 'ant-table-row-selected'
              : ''
          }
          columns={columns}
          dataSource={DanhSachNhomFile}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          scroll={{
            y: tableHeight,
            x: 540,
          }}
        />
      </Box>
      <ModalNhomFile
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachNhomFile={DanhSachNhomFile}
      />
    </PageWrapper>
  );
}

function mapStateToProps(state) {
  return {
    ...state.DanhMucNhomFile,
  };
}

export default connect(mapStateToProps, actions)(NhomFileComponent);
