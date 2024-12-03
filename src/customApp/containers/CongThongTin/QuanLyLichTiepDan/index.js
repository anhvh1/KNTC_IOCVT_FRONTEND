import {Modal, Table, Tooltip, message, Space} from 'antd';
import actions from '../../../redux/CongThongTin/QuanLyLichTiepDan/actions';
import React, {useState, useEffect} from 'react';
import {
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {apiUrl} from './config';
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
  EditOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  FundViewOutlined,
  HistoryOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import {WysiwygEditor} from '../../../../components/uielements/exportComponent';
import CKEditorApp from '../../../../components/uielements/ckeditor';
import PageWrap from '../../../../components/utility/PageWrap';
import {useSelector, useDispatch} from 'react-redux';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
const StyledDisplay = styled.div`
  display: 'flex';
`;
const StyledActions = styled.div`
  .ant-space-item {
    font-size: 20px;
  }
  .ant-space-item:hover {
    cursor: pointer;
  }
  .ant-table-tbody > tr > td a {
    color: black !important;
  }
`;
const QLLichTiepDan = (props) => {
  document.title = 'Quản lý lịch tiếp dân';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getInit(filterData);
    dispatch(actionsCoQuan.getInitData());
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const showModalEdit = (id, isView = false) => {
    const IDLichTiep = id;
    setAction('edit');
    api
      .ChiTietBieuMau({IDLichTiep})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit({...res.data.Data, isView});
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
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === 'add') {
      api
        .ThemLichTiepDan(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === 'edit') {
      api
        .SuaLichTiepDan(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const deleteModalAddEdit = (IDLichTiep) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa biểu mẫu này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .XoaLichTiepDan({ListID: [IDLichTiep]})
          .then((res) => {
            if (res.data.Status > 0) {
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

  const handleActions = (record) => {
    return (
      <StyledActions>
        <Space size={'middle'}>
          <EditOutlined onClick={() => showModalEdit(record.IDLichTiep)} />
          <DeleteOutlined
            onClick={() => {
              deleteModalAddEdit(record.IDLichTiep);
            }}
          />
          <FundViewOutlined
            onClick={() => showModalEdit(record.IDLichTiep, true)}
          />
        </Space>
      </StyledActions>
    );
  };

  const handleUpdateTrangThai = (e, IDLichTiep) => {
    api
      .UpdateTrangThai({
        Public: e.target.checked,
        IDLichTiep,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          props.getList(filterData);
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

  const {
    DanhSachLichTiepDan,
    TotalRow,
    role,
    DanhSachLanhDaoTiep,
  } = props;
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const dispatch = useDispatch();

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
      title: 'Ngày tiếp dân',
      dataIndex: 'NgayTiep',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return (
          <p>
            {record.NgayTiep
              ? moment(record.NgayTiep).format('DD/MM/YYYY')
              : null}
          </p>
        );
      },
    },
    {
      title: 'Cơ quan',
      dataIndex: 'CoQuanTiep',
      align: 'left',
      width: '20%',
    },
    {
      title: 'Lãnh đạo tiếp',
      dataIndex: 'CanBoTiep',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return record.CanBoTiep;
      },
    },
    {
      title: 'Nội dung tiếp',
      dataIndex: 'NDTiep',
      align: 'left',
      width: '40%',
      render: (_, record) => {
        return <p dangerouslySetInnerHTML={{__html: record.NDTiep}}></p>;
      },
    },
    {
      title: 'Hiển thị ',
      dataIndex: 'Public',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return (
          <Checkbox
            checked={record.Public}
            onChange={(e) => handleUpdateTrangThai(e, record.IDLichTiep)}
          ></Checkbox>
        );
      },
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (_, record) => handleActions(record),
    },
  ];
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý lịch tiếp dân</PageHeader>
        <PageAction>
          {role.add ? (
            <Button type="primary" onClick={showModalAdd}>
              <PlusOutlined />
              Thêm lịch tiếp dân
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            onChange={(value) => onFilter(value, 'CoQuanID')}
            style={{width: 400}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            // onChange={value => this.onSearch(value, "CoQuanID")}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
            // defaultValue={filterData.CoQuanID}
          />
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập nội dung cần tìm kiếm'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachLichTiepDan}
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
        {/* ck editor
        <CKEditorApp /> */}
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachCoQuan={DanhSachCoQuan}
        DanhSachLichTiepDan={DanhSachLichTiepDan}
        DanhSachLanhDaoTiep={DanhSachLanhDaoTiep}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLLichTiepDan,
    role: getRoleByKey(state.Auth.role, 'ql-lich-tiep-dan'),
  };
}

export default connect(mapStateToProps, actions)(QLLichTiepDan);
