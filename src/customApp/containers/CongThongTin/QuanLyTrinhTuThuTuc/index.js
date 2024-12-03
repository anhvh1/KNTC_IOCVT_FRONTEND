import {Modal, Table, Tooltip, message, Select, Space} from 'antd';
import actions from '../../../redux/CongThongTin/QuanLyTrinhTuThuTuc/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {LoaiFileDinhKem} from '../../../../settings/constants';
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
import PageWrap from '../../../../components/utility/PageWrap';
const {Option} = Select;

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
const QLNamHoc = (props) => {
  document.title = 'Quản lý trình tự thủ tục';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [previewLink, setPreviewlink] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [download, setDownload] = useState();
  const StyledBoxAdd = styled.div`
    float: right;
  `;

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

  const showModalEdit = (id) => {
    const TrinhTuThuTucID = id;
    setAction('edit');
    api
      .ChiTietBieuMau({TrinhTuThuTucID})
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
  const Preview = (data) => {
    setPreviewlink(data);
    setVisibleModalAddEdit(true);
  };
  const hideModalAddEdit = () => {
    setAction('');
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileTrinhTuThuTuc,
    };
    const LoaiFileThumbnail = {
      FileType: LoaiFileDinhKem.FileThumbnail,
    };
    data['DanhSachFileDinhKemID'] = [];
    const Promise_Files = [];
    if (data.DanhSachHoSoTaiLieu) {
      data.DanhSachHoSoTaiLieu.map(async (files, index) => {
        if (!files.FileID) {
          const formDataFile = new FormData();
          formDataFile.append('files', files);
          // formDataFile.append('TenFile', item?.TenFile);
          formDataFile.append('FileDinhKemStr', JSON.stringify({...LoaiFile}));
          Promise_Files.push(
            api.UploadFile(formDataFile).then((res) => {
              if (res.data.Status > 0) {
                data.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
                return res.data.Data[0];
              }
            }),
          );
        }
      });
    }
    if (data.DanhSachThumbnail) {
      data.DanhSachThumbnail.map(async (files, index) => {
        if (!files.FileID) {
          const formDataFile = new FormData();
          formDataFile.append('files', files);
          // formDataFile.append('TenFile', item?.TenFile);
          formDataFile.append(
            'FileDinhKemStr',
            JSON.stringify({...LoaiFileThumbnail}),
          );
          Promise_Files.push(
            api.UploadFile(formDataFile).then((res) => {
              if (res.data.Status > 0) {
                data.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
                return res.data.Data[0];
              }
            }),
          );
        }
      });
    }
    Promise.all(Promise_Files).then((list) => {
      api.LuuTrinhTuThuTuc(data).then((res) => {
        if (!res || !res.data || res.data.Status !== 1) {
          message.error(
            `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          );
        } else {
          message.success(res.data.Message);
          hideModalAddEdit();
          inceaseModalKey();
          setConfirmLoading(false);
          props.getList({
            ...filterData,
          });
        }
      });
    });
  };

  // const onPreView = (record) => {
  //   api.BieuMauPreView({ fileName: record.MaPhieuIn });
  // };
  const deleteModalAddEdit = (TrinhTuThuTucID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa biểu mẫu này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .XoaBieuMau({ListID: [TrinhTuThuTucID]})
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
  // const renderThaoTac = (record) => {
  //   return (
  //     <div className={"action-btn"}>
  //       <StyledDisplay>
  //         <Tooltip title={" Xem biểu mẫu"}>
  //           <ModalViewForm />
  //         </Tooltip>

  //         <Tooltip title={"Cập nhật biểu mẫu"}>
  //           <Button
  //             type="primary"
  //             size="small"
  //             style={{ fontSize: "10px", margin: "0 10px" }}
  //             onClick={() => showModalEdit(record.TrinhTuThuTucID)}
  //           >
  //             <EditOutlined style={{ fontSize: "10px" }} />
  //             Cập nhật biểu mẫu
  //           </Button>
  //         </Tooltip>

  //         <Tooltip title={" Tải biểu mẫu"}>
  //           <Button
  //             type="primary"
  //             size="small"
  //             style={{ fontSize: "10px" }}
  //             onClick={() => onDownloadFile(record)}
  //           >
  //             <ArrowDownOutlined style={{ fontSize: "10px" }} />
  //             Tải biểu mẫu
  //           </Button>
  //         </Tooltip>

  //         <Tooltip title={" Xem lịch sử"}>
  //           <ModalViewHistory data={record} />
  //         </Tooltip>
  //       </StyledDisplay>
  //     </div>
  //   );
  // };
  const handleActions = (record) => {
    return (
      <StyledActions>
        <Space size={'middle'}>
          <EditOutlined onClick={() => showModalEdit(record.TrinhTuThuTucID)} />
          <DeleteOutlined
            onClick={() => {
              deleteModalAddEdit(record.TrinhTuThuTucID);
            }}
          />
          {/* {record.FileUrl === '' ? (
            <a style={{color: '#000'}}>
              <DownloadOutlined />
            </a>
          ) : (
            <a href={`${record.FileUrl}`}>
              <DownloadOutlined />
            </a>
          )} */}
        </Space>
      </StyledActions>
    );
  };
  const {DanhSachTrinhTuThuTuc, TotalRow, role, DanhSachLoaiThuTuc} = props;
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
      title: 'Tiêu đề',
      dataIndex: 'TieuDe',
      align: 'left',
      width: '20%',
    },
    {
      title: 'Nội dung',
      dataIndex: 'NoiDung',
      align: 'left',
      width: '45%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'NgayTao',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return record.NgayTao
          ? moment(record.NgayTao).format('DD/MM/YYYY')
          : null;
      },
    },
    {
      title: 'Tên người tạo',
      dataIndex: 'TenNguoiTao',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return <p>{record.TenNguoiTao}</p>;
      },
    },
    {
      title: 'Hiển thị',
      dataIndex: 'Public',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return <Checkbox checked={record.Public} />;
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
        <PageHeader>Quản lý trình tự thủ tục</PageHeader>
        <PageAction>
          {role.add ? (
            <Button type="primary" onClick={showModalAdd}>
              <PlusOutlined />
              Thêm thủ tục
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Nhập nội dung cần tìm kiếm '}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          dataSource={DanhSachTrinhTuThuTuc}
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
        DanhSachTrinhTuThuTuc={DanhSachTrinhTuThuTuc}
        DanhSachLoaiThuTuc={DanhSachLoaiThuTuc}
      />
      {/* <ModalViewForm
        visible={visibleModalAddEdit}
        // dataEdit={dataModalAddEdit}
        // action={action}
        dataEdit={previewLink}
        loading={confirmLoading}
        key={modalKey}
        // onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        // DanhSachTrinhTuThuTuc={DanhSachTrinhTuThuTuc}
      /> */}
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLTrinhTuThuTuc,
    role: getRoleByKey(state.Auth.role, 'ql-trinh-tu-thu-tuc'),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
