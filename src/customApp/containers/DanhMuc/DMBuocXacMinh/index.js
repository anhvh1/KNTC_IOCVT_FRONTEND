import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/DanhMuc/DMBuocXacMinh/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  Button,
  InputSearch,
  Select,
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
import {map} from 'lodash';
import PageWrap from '../../../../components/utility/PageWrap';
const QLXacMinh = (props) => {
  document.title = 'Danh Mục Bước Xác Minh';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [danhSachKhieuToCha, setDanhSachKhieuToCha] = useState([]);
  const [file, setFile] = useState([]);
  const [list, setList] = useState([]);
  const [idDS, setIdDS] = useState('');
  const [idFile, setIDFile] = useState('');

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    getDanhSachLoaiKhieuToCha();
    getDanhSachFile();
  }, []);

  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachKhieuToCha(res.data.Data);
  };
  const getDanhSachFile = async () => {
    let res = await api.DanhSachFile();
    setList(res.data.Data);
  };
  const getFileMau = async (id) => {
    const DMBuocXacMinhID = id;
    let res = await api.DanhSachFileMau({DMBuocXacMinhID});
    setFile(res.data.Data);
    setIDFile(res.data.Data);
  };
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
    setFile([]);
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (BuocXacMinhID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa bước xác minh này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaBuocXacMinh(BuocXacMinhID)
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
    setIdDS(id);
    const BuocXacMinhID = id;
    setAction('edit');
    api
      .ChiTietBuocXacMinh({BuocXacMinhID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalAddEdit(true);
          getFileMau(id);
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
        .THemBuocXacMinh(data)
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
        .CapNhatBuocXacMinh(data)
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
  const rederCheckBox = (record) => {
    return <Checkbox checked={record}></Checkbox>;
  };
  const rederName = (record) => {
    return danhSachKhieuToCha.find(
      (item) => item.LoaiKhieuToID === record.LoaiDon,
    )?.TenLoaiKhieuTo;
  };
  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {role?.edit ? (
          <Tooltip title={'Sửa'}>
            <EditOutlined onClick={() => showModalEdit(record.BuocXacMinhID)} />
          </Tooltip>
        ) : (
          ''
        )}
        {role?.delete ? (
          <Tooltip title={'Xóa'}>
            <DeleteOutlined
              onClick={() => deleteModalAddEdit(record.BuocXacMinhID)}
            />
          </Tooltip>
        ) : (
          ''
        )}
      </div>
    );
  };
  const renderFileMau = (record) => {
    let arrFileMau = record.split(',');
    return (
      <ul>
        {arrFileMau.map((item, index) => (
          <li key={index}>- {item.trim()}</li>
        ))}
      </ul>
    );
  };

  const {DanhSachBuocXacMinh, TotalRow, role} = props;
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
      title: 'Loại Đơn',
      align: 'left',
      width: '15%',
      render: (_, record) => rederName(record),
    },
    {
      title: 'Tên bước xác minh',
      dataIndex: 'TenBuoc',
      align: 'left',
      width: '22%',
    },
    {
      title: 'Nội dung bước xác minh',
      dataIndex: 'GhiChu',
      align: 'left',
      width: '23%',
    },
    {
      title: 'File mẫu',
      dataIndex: 'TenFile',
      align: 'left',
      width: '10%',
      render: (text, record) => renderFileMau(record.TenFile),
    },

    {
      title: 'Bắt buộc đính kèm file',
      align: 'center',
      width: '5%',
      render: (text, record) =>
        record.IsDinhKemFile === true ? <>có</> : <>không</>,
    },
    {
      title: 'Sử dụng',
      align: 'center',
      width: '5%',
      render: (text, record) => rederCheckBox(record.SuDung),
    },
    {
      title: 'TT sắp xếp',
      dataIndex: 'OrderBy',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Thao tác',
      width: '5%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh Mục Bước Xác Minh</PageHeader>
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
            defaultValue={filterData.LoaiDon ? filterData.TenLoaiKhieuTo : null}
            placeholder={'Chọn loại đơn'}
            allowClear
            onChange={(value) => onFilter(value, 'LoaiDon')}
          >
            {danhSachKhieuToCha.map((value, index) => (
              <Option key={index} value={value.LoaiKhieuToID}>
                {value.TenLoaiKhieuTo}
              </Option>
            ))}
          </Select>
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên bước xác minh'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachBuocXacMinh}
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
        DanhSachBuocXacMinh={DanhSachBuocXacMinh}
        options={danhSachKhieuToCha}
        file={file}
        setFile={setFile}
        list={list}
        PageNumber={PageNumber}
        PageSize={PageSize}
        getFileMau={getFileMau}
        idDS={idDS}
        idFile={idFile}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhMucBuocXacMinh,
    role: getRoleByKey(state.Auth.role, 'danh-muc-buoc-xac-minh'),
  };
}

export default connect(mapStateToProps, actions)(QLXacMinh);
