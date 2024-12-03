import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/CapNhatQuyetDinhGiaiQuyet/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './index.styled';
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
  getLocalKey,
  getRoleByKey,
  handleRenderTrangThai,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {handleTextLong} from '../../../../helpers/utility';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import moment from 'moment';
import PrintWhite from '../../../../image/printer_white.png';
import Print from '../../../../image/printer.png';
import Send from '../../../../image/send.png';
import Search from '../../../../image/search.png';
import SearchWhite from '../../../../image/search_white.png';
import SendWhite from '../../../../image/send_white.png';
import ProcessWhite from '../../../../image/process_white.png';
import Process from '../../../../image/process.png';
import Preview from '../../../../image/preview.png';
import PreviewWhite from '../../../../image/preview_wihte.png';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import ModalKetQuaXacMinh from '../GiaoXacMinh/ModalKetQuaXacMinh';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {TrangThaiMoi} from '../../../../settings/constants';
const QDThiHanh = (props) => {
  document.title = 'Cập nhật BC, QĐ, KL';
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
  const [visibleModalKetQuaXacMinh, setVisibleModalKetQuaXacMinh] =
    useState(false);
  const [dataModalKetQuaXacMinh, setdataModalKetQuaXacMinh] = useState({});
  const [keyModalKetQuaXacMinh, setKeyModalKetQuaXacMinh] = useState(0);

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachQDGiaiQuyet?.find(
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

  const showModalKetQuaXacMinh = () => {
    const XuLyDonID = selectedRowsKey[0];
    // setAction('edit');
    api
      .ChiTietXacMinhNoiDungDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalKetQuaXacMinh({isViewDetails: true, ...res.data.Data});
          setVisibleModalKetQuaXacMinh(true);
          setKeyModalKetQuaXacMinh((prevKey) => prevKey + 1);
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

  const closeModalKetQuaXacMinh = () => {
    setVisibleModalKetQuaXacMinh(false);
  };

  const {DanhSachQDGiaiQuyet, DanhSachHuongXuLy, TotalRow, role, tableLoading} =
    props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
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
    const XuLyDonID = selectedRowsKey[0];
    // inceaseModalKey();
    // setVisibleModalAddEdit(true);
    api
      .ChiTietBanHanh({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setAction('add');
          setDataModalAddEdit({...res.data.Data});
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

  const showModalDetails = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .ChiTietBanHanh({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit({isViewDetails: true, ...res.data.Data});
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

  const submitModalAddEdit = (data, isTrinh) => {
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileBanHanhQD,
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
        api.BanHanhQuyetDinhGiaiQuyet(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getInitData(filterData);
            setSelectedRowsKey([]);
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
          .BanHanhQuyetDinhGiaiQuyet(data)
          .then((res) => {
            setLoading(false);
            if (res.data.Status > 0) {
              message.destroy();
              message.success(res.data.Message);
              hideModalAddEdit();
              props.getInitData(filterData);
              setSelectedRowsKey([]);
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
              // onClick={() => setSelectedRowsKey([record.XuLyDonID])}
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
            <div>
              <Checkbox
                // disabled={record?.TrangThaiID === 1}
                className="selected__table"
                checked={selectedRowsKey.includes(record.XuLyDonID)}
                onChange={() => handleCheckboxChange(record)}
              />
            </div>
            {/* {originNode} */}
          </div>
        );
      },
      onChange: (selectedRowkey) => {
        setSelectedRowsKey(selectedRowkey);
      },
    };
    const newDanhSachQDGiaiQuyet = DanhSachQDGiaiQuyet?.map((item) => ({
      ...item,
      key: item?.XuLyDonID,
    }));
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          loading={tableLoading}
          dataSource={newDanhSachQDGiaiQuyet}
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

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    const {DanhSachLoaiKhieuTo} = props;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThai}
          placeholder={'Chọn trạng thái cập nhật quyết định'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          <Option value={'1'}>Chưa cập nhật </Option>
          <Option value={'2'}>Đã cập nhật</Option>
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
        {/* <Select
          style={{width: '200px'}}
          value={filterData.Status}
          placeholder={'Chọn hướng xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'HuongXuLyID')}
        >
          {DanhSachHuongXuLy
            ? DanhSachHuongXuLy.map((item) => (
                <Option
                  value={item.HuongGiaiQuyetID}
                  key={item.HuongGiaiQuyetID}
                >
                  {item.TenHuongGiaiQuyet}
                </Option>
              ))
            : null}
        </Select> */}
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
      width: '15%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.SoDonThu}
        </p>
      ),
    },
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayTiep',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayTiepNhan
            ? dayjs(record.NgayTiepNhan).format('DD/MM/YYYY')
            : null}
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
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <Tooltip title={record.NoiDungDon}>
          <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
            {record.TenLoaiKhieuTo}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Cơ quan thực hiện xác minh',
      dataIndex: 'HanXuLy',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuanGiaiQuyet}
        </p>
      ),
    },
    {
      title: 'Hạn giải quyết',
      dataIndex: 'HanXuLy',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayHetHan
            ? dayjs(record.NgayHetHan).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TenTrangThai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {/* {handleRenderTrangThai(record, 'TrangThai')} */}
          {record.TenTrangThai}
        </p>
      ),
    },
  ];

  const {DanhSachCoQuan} = props;

  const DonThu = DanhSachQDGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  );
  const TrangThai = DonThu?.TrangThai;

  const Lan2 = DonThu?.Lan2 ? true : false;

  const ItemLoaiKhieuTo = DonThu?.LoaiKhieuTo1ID;

  const TrangThaiIDMoi = DonThu?.TrangThaiIDMoi;

  const CheckTrangThai = DonThu?.CheckTrangThai;

  const checkCapNhap = CheckTrangThai
    ? !(selectedRowsKey.length === 1) ||
      (TrangThaiIDMoi !== TrangThaiMoi.BanHanhQuyetDinh &&
        TrangThaiIDMoi !== TrangThaiMoi.CapNhapBCQDKL) ||
      DonThu?.ThiHanhID
    : !(selectedRowsKey.length === 1) || TrangThai === 1;

  console.log(
    !(selectedRowsKey.length === 1) ||
      TrangThaiIDMoi !== TrangThaiMoi.BanHanhQuyetDinh ||
      DonThu?.ThiHanhID,
    'check',
  );

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Cập nhật BC, QĐ, KL</PageHeader>
        <PageAction>
          <Button
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
            className="btn-center"
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Search : SearchWhite}
              className="btn-icon__img"
            />
            Xem chi tiết đơn thư
          </Button>
          <Button
            type="primary"
            onClick={showModalKetQuaXacMinh}
            disabled={!(selectedRowsKey.length === 1)}
            className="btn-center"
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Search : SearchWhite}
              className="btn-icon__img"
            />
            Xem kết quả xác minh
          </Button>
          <Button
            type="primary"
            onClick={() => showModalDetails()}
            className="btn-center"
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Search : SearchWhite}
              className="btn-icon__img"
            />
            Xem kết quả giải quyết
          </Button>
          {role.edit ? (
            <Button
              type="primary"
              className="btn-center"
              onClick={() => showModalAdd()}
              disabled={checkCapNhap}
            >
              <img
                src={checkCapNhap ? Process : ProcessWhite}
                className="btn-icon__img"
              />
              Cập nhật BC, QĐ, KL
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
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
        dataSource={DanhSachQDGiaiQuyet}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuan}
        TabsKey={filterData?.tabsKey}
        Lan2={Lan2}
        ItemLoaiKhieuTo={ItemLoaiKhieuTo}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
      <ModalKetQuaXacMinh
        onCancel={closeModalKetQuaXacMinh}
        dataEdit={dataModalKetQuaXacMinh}
        visible={visibleModalKetQuaXacMinh}
        key={keyModalKetQuaXacMinh}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.CapNhatQuyetDinhGiaiQuyet,
    role: getRoleByKey(state.Auth.role, 'ban-hanh-qd'),
  };
}

export default connect(mapStateToProps, actions)(QDThiHanh);
