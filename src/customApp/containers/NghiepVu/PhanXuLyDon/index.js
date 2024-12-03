import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/PhanXuLyDon/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './PhanXuLyDon.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import {handleTextLong} from '../../../../helpers/utility';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import moment from 'moment';
import icons from '../icons';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import FilterTime from '../Shared/Component/BoxFilterTime';
const PhanXuLyDon = (props) => {
  document.title = 'Phân xử lý đơn';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachPhanXuLy?.find(
      (item) => item.XuLyDonID === XuLyDonID,
    )?.DonThuID;
    api.ChiTietDonThu2({XuLyDonID, DonThuID}).then((res) => {
      if (res.data.Status > 0) {
        setDataModalChiTietDonThu(res.data.Data);
        setVisibleModalChiTietDonThu(true);
        setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
      }
    });
  };

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    // props.getInitData(filterData);
    props.getData();
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
    let STT = 0;
    api.GetSTTHoSo().then((res) => {
      if (res.data.Status > 0) {
        STT = res.data.Data;
      }
    });
    setAction('add');
    setDataModalAddEdit({SoDon: STT});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = () => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa đơn thư này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .XoaDonThu({ListID: selectedRowsKey})
          .then((res) => {
            if (res.data.Status > 0) {
              props.getInitData({
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
    const PhanXuLyID = DanhSachPhanXuLy.find(
      (item) => item.XuLyDonID === selectedRowsKey[0],
    )?.PhanXuLyID;
    setAction('edit');
    api
      .ChiTietDonThu({PhanXuLyID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit({...res.data.Data, isViewDetails: true});
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
    // setAction("");
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    // data.KQQuaTiepDan = null;
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileHoSo,
    };
    if (action === 'add') {
      const Promise_Files = [];
      if (data.DanhSachHoSoTaiLieu) {
        mapFileToPromiseArray(
          data.DanhSachHoSoTaiLieu,
          Promise_Files,
          LoaiFile,
          api,
        );
      }
      Promise.all(Promise_Files).then((list) => {
        api.ThemMoiDonThu(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getInitData(filterData);
          }
        });
      });
    } else {
      const Promise_Files = [];
      if (data.DanhSachHoSoTaiLieu) {
        mapFileToPromiseArray(
          data.DanhSachHoSoTaiLieu,
          Promise_Files,
          LoaiFile,
          api,
        );
      }
      Promise.all(Promise_Files).then((list) => {
        api
          .SuaDonThu(data)
          .then((res) => {
            setLoading(false);
            if (res.data.Status > 0) {
              message.destroy();
              message.success(res.data.Message);
              hideModalAddEdit();
              props.getInitData(filterData);
            } else {
              message.destroy();
              message.error(`${res.data.Message}`);
            }
          })
          .catch((err) => {
            message.destroy();
            message.error(`${err.toString()}`);
          });
      });
    }
  };

  const handleIconClick = (event, record) => {
    event.stopPropagation(); // ngăn chặn sự kiện click truyền qua Checkbox
    handleCheckboxChange(record);
  };

  const handleCheckboxChange = (record) => {
    const selectedRows = [...selectedRowsKey];

    if (selectedRows.includes(record.key)) {
      // Nếu đã checked thì uncheck
      setSelectedRowsKey(selectedRows.filter((key) => key !== record.key));
    } else {
      // Nếu chưa checked thì check
      setSelectedRowsKey([...selectedRows, record.key]);
    }
  };

  const handleRenderContentKhieuNai = () => {
    const rowSelection = {
      selectedRowsKey,
      renderCell: (checked, record, index, originNode) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',

              // visibility: 'visible',
            }}
            // onClick={(event) => handleIconClick(event, record)}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              // onClick={(event) => handleIconClick(event, record)}
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
            <div>
              <Checkbox
                // disabled={record?.PhanXuLyID > 0}
                className="selected__table"
                checked={selectedRowsKey.includes(record.XuLyDonID)}
                onChange={() => handleCheckboxChange(record)}
              />
            </div>
          </div>
        );
      },
      onChange: (selectedRowkey) => {
        setSelectedRowsKey(selectedRowkey);
      },
    };
    const newDanhSachPhanXuLy = DanhSachPhanXuLy.map((item) => ({
      ...item,
      key: item?.XuLyDonID,
    }));
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachPhanXuLy}
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
      </>
    );
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role.edit ? */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record.DanTocID)} />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={'Xóa'}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.DanTocID)} />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData?.TrangThaiID}
          placeholder={'Chọn trạng thái xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiID')}
        >
          <Option value={0}>Chưa duyệt</Option>
          <Option value={1}>Đã duyệt</Option>
          <Option value={2}>Xử lý lại</Option>
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.LoaiKhieuToID}
          placeholder={'Chọn loại khiếu tố'}
          allowClear
          onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
        >
          {DanhSachLoaiKhieuTo
            ? DanhSachLoaiKhieuTo.map((item) => (
                <Option
                  value={item.LoaiKhieuToID.toString()}
                  key={item.LoaiKhieuToID}
                >
                  {item.TenLoaiKhieuTo}
                </Option>
              ))
            : null}
        </Select>
        <FilterTime onFilter={onFilter} filterData={filterData} />
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập đối tượng KNTC, KNPA hoặc nội dung tiếp'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    );
  };
  // DanhSachLoaiKhieuTo: [],
  // DanhSachQuocTich: [],
  // DanhSachDanToc: [],
  // DanhSachTinh: [],
  // DanhSachHuyen: [],
  // DanhSachXa: [],
  // DanhSachChucVu: [],
  // DanhSachHinhThucDaGiaiQuyet: [],
  // DanhSachCanBoXuLy: [],
  // DanhSachTenFile: [],

  const {
    DanhSachPhanXuLy,
    DanhSachLoaiKhieuTo,
    DanhSachHuongXuLy,
    TotalRow,
    role,
    DanhSachCanBoXuLy,
    DanhSachTenFile,
  } = props;

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'Số đơn thư',
      dataIndex: 'SoDonThu',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.SoDonThu}
        </p>
      ),
    },
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayTiepStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayTiep ? dayjs(record.NgayTiep).format('DD/MM/YYYY') : null}
        </p>
      ),
    },
    {
      title: 'Nguồn đơn đến',
      dataIndex: 'NguonDonDens',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NguonDonDens}
        </p>
      ),
    },
    {
      title: 'Thông tin chủ đơn',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '20%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN.map((item) => (
                <div>
                  <p
                    style={{
                      fontWeight: '600',
                      color: record.TrangThaiQuaHan === 1 ? 'red' : '',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.HoTen}
                  </p>
                  <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
                    {item.DiaChiCT}
                  </p>
                </div>
              ))
            : null}
        </div>
      ),
    },
    {
      title: 'Nội dung vụ việc',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <Tooltip title={record.NoiDungDon}>
          <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
            {handleTextLong(record.NoiDungDon, 150)}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Loại khiếu tố',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenLoaiKhieuTo}
        </p>
      ),
    },
    {
      title: 'Trạng thái phân xử lý',
      dataIndex: 'TrangThaiPhanXuLyStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TrangThaiPhanXuLyStr}
        </p>
      ),
    },
    {
      title: 'Cán bộ xử lý',
      dataIndex: 'TenCanBoXuLy',
      align: 'left',
      width: '15%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCanBoXuLy}
        </p>
      ),
    },
    {
      title: 'Hạn xử lý',
      dataIndex: 'HanXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HanXuLy}
        </p>
      ),
    },
    {
      title: 'Trạng thái xử lý',
      dataIndex: 'TrangThaiXuLyStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TrangThaiXuLyStr}
        </p>
      ),
    },
  ];

  const itemsTabs = [
    {
      key: '1',
      label: <div className="ant-tabs__title">Khiếu nại</div>,
      children: <>{handleRenderContentKhieuNai()}</>,
    },
    {
      key: '2',
      label: <div className="ant-tabs__title">Tố cáo</div>,
      children: <>{handleRenderContentKhieuNai()}</>,
    },
    {
      key: '3',
      label: <div className="ant-tabs__title">Kiến nghị, phản ánh</div>,
      children: <>{handleRenderContentKhieuNai()}</>,
    },
  ];

  // const LayDonThuoc = ã
  const PhanXuLyID = DanhSachPhanXuLy?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiID;
  const TrangThaiPhanXuLy = PhanXuLyID === 1;
  // record?.PhanXuLyID > 0;
  return (
    <LayoutWrapper>
      <PageHeader>Phân xử lý đơn</PageHeader>
      <PageAction>
        <Button
          type="primary"
          className="btn-center"
          onClick={showModalChiTietDonThu}
          disabled={!(selectedRowsKey.length === 1)}
        >
          <img
            src={
              !(selectedRowsKey.length === 1)
                ? icons.Preview
                : icons.PreviewWhite
            }
            className="btn-icon__img"
          />
          Xem chi tiết đơn thư
        </Button>
        <Button
          type="primary"
          className="btn-center"
          onClick={showModalEdit}
          disabled={!(selectedRowsKey.length === 1)}
        >
          <img
            src={
              !(selectedRowsKey.length === 1)
                ? icons.Preview
                : icons.PreviewWhite
            }
            className="btn-icon__img"
          />
          Xem chi tiết phân xử lý
        </Button>
        {role.edit ? (
          <Button
            className="btn-center"
            disabled={!(selectedRowsKey.length === 1) || TrangThaiPhanXuLy}
            type="primary"
            onClick={showModalAdd}
          >
            <img
              src={
                !(selectedRowsKey.length === 1) || TrangThaiPhanXuLy
                  ? icons.Process
                  : icons.ProcessWhite
              }
              className="btn-icon__img"
            />
            Phân xử lý đơn
          </Button>
        ) : null}
      </PageAction>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={loading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachCanBoXuLy={DanhSachCanBoXuLy}
        XuLyDonID={selectedRowsKey[0]}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.PhanXuLyDon,
    role: getRoleByKey(state.Auth.role, 'phan-xu-ly-don'),
  };
}

export default connect(mapStateToProps, actions)(PhanXuLyDon);
