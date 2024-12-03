import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Modal, Tooltip, message} from 'antd';
import {PageWrapper, PageTitle} from './layout';
import Box from '../../../../components/utility/box';
import BoxTable from '../../../../components/utility/boxTable';
import PageAction from '../../../../components/utility/pageAction';
import {Button} from '../../../../components/uielements/exportComponent';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import api from './fileConfig';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import ModalFile from './modalFile';
import {useKey} from '../../../CustomHook/useKey';
import BoxFilter from '../../../../components/utility/boxFilter';
import {
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {InputSearch} from '../../../../components/uielements/exportComponent';
import actionsDanhSachNhomFile from '../../../redux/DanhMuc/DanhMucFileDinhKem/nhomFileActions';
import PageWrap from '../../../../components/utility/PageWrap';
function FileComponent({
  filterData,
  setFilterData,
  DanhMucNhomFile,
  danhSachChucNang,
  setSelectedRowsKey,
  onFilter,
  role,
}) {
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [modalKey, inceaseModalKey] = useKey();
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [action, setAction] = useState('');
  const [danhSachFile, setDanhSachFile] = useState([]);
  const {DanhSachNhomFile} = useSelector((state) => state.DanhMucNhomFile);
  const [totalRow, setTotalRow] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actionsDanhSachNhomFile.getList({
        PageSize: 99999,
        PageNumber: 1,
      }),
    );
  }, []);

  const getList = (filterData) => {
    api
      .DanhSachFile(filterData)
      .then((res) => {
        if (res.data.Status === 1) {
          setDanhSachFile(res.data.Data);
          setTotalRow(res.data.TotalRow);
        } else {
          message.destroy();
          message.success(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  useEffect(() => {
    getList({
      ...filterData,
      NhomFileID: filterData.NhomFileID || -1,
    });
  }, [filterData]);

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({NhomFileID: filterData?.NhomFileID});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (fileID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa nhóm file này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaFile({fileID})
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              getList(filterData);
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
    const fileID = id;
    setAction('edit');
    api
      .ChiTietFile({fileID})
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
        .ThemFile(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
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
    if (action === 'edit') {
      api
        .CapNhatFile(data)
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
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {role?.edit ? (
          <Tooltip title={'Sửa'}>
            <EditOutlined onClick={() => showModalEdit(record.FileID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role?.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined onClick={() => deleteModalAddEdit(record.FileID)} />
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

  const renderChucNang = (record) => {
    let ListChucNang = record.TenChucNang.split(',');

    return (
      <ul>
        {ListChucNang.map((item, index) => (
          <li key={index}>- {item.trim()}</li>
        ))}
      </ul>
    );
  };

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
      title: 'Tên tệp đính kèm',
      dataIndex: 'TenFile',
      align: 'left',
      width: '30%',
    },
    {
      title: 'Chức năng áp dụng',
      dataIndex: 'TenChucNang',
      align: 'left',
      width: '45%',
      render: (_, record) => renderChucNang(record),
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThaiSuDung',
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

  const onChangeChucNang = (value) => {
    onFilter(value, 'ChucNangID');
    getList({
      ChucNangID: value,
    });
  };

  return (
    <PageWrapper>
      <PageWrap>
        <PageTitle>Danh sách file đính kèm</PageTitle>
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
          <Select
            style={{minWidth: 250}}
            placeholder="Chọn chức năng"
            allowClear
            onChange={onChangeChucNang}
            value={
              danhSachChucNang.find(
                (item) => item.ChucNangID === parseInt(filterData.ChucNangID),
              )?.TenChucNang
            }
          >
            {danhSachChucNang.map((item, index) => (
              <Option key={index} value={item.ChucNangID}>
                {item.TenChucNang}
              </Option>
            ))}
          </Select>
          {/* <Select
            style={{minWidth: 250}}
            placeholder="Chọn nhóm file"
            value={Number(filterData?.NhomFileID)}
            allowClear
            onChange={(value) => {
              onFilter(value, 'NhomFileID');
              getList({
                NhomFileID: value ? value : null,
              });
            }}
          >
            {DanhSachNhomFile.map((item, index) => (
              <Option key={index} value={item.NhomFileID}>
                {item.TenNhomFile}
              </Option>
            ))}
          </Select> */}
          {/* <InputSearch
            allowClear
            defaultValue={filterData.keyword}
            placeholder={'Tìm kiếm theo tên nhóm file'}
            style={{width: 250}}
            onSearch={(value) => {
              onFilter(value, 'Keyword');
              getList({
                keyword: value,
              });
            }}
          /> */}
        </BoxFilter>
        <BoxTable
          rowKey="FileID"
          columns={columns}
          dataSource={danhSachFile}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: totalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalFile
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachNhomFile={DanhMucNhomFile.DanhSachNhomFile}
        DanhSachFile={danhSachFile}
        DanhSachChucNangFile={danhSachChucNang}
        NhomFileID={filterData?.NhomFileID}
      />
    </PageWrapper>
  );
}
function mapStateToProps(state) {
  return {
    DanhMucNhomFile: {...state.DanhMucNhomFile},
  };
}

export default connect(mapStateToProps)(FileComponent);
