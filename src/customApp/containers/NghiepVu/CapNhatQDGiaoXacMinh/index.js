import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/CapNhatQDGiaoXacMinh/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './CapNhatQDGiaoXacMinh.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem, TrangThaiMoi} from '../../../../settings/constants';

import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  disabledDate,
  mapFileToPromiseArray,
  handleRenderTenNguonDonDen,
} from '../../../../helpers/utility';
import FilterTime from '../Shared/Component/BoxFilterTime';
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
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import {handleTextLong} from '../../../../helpers/utility';
import ModalChiTietKetQuaXuLyDon from '../Shared/Modal/ModalChiTietKetQuaXuLyDon';
import moment from 'moment';
import icons from '../icons';
import PageWrap from '../../../../components/utility/PageWrap';
import {handleRenderTrangThai} from '../../../../helpers/utility';
const CapNhatQDGiaoXacMinh = (props) => {
  document.title = 'Cập nhật văn bản giao xác minh';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalKetQuaXuLyDon, setVisibleModalKetQuaXuLyDon] =
    useState(false);
  const [keyModalKetQuaXuLyDon, setKeyModalKetQuaXuLyDon] = useState(0);
  const [dataModalXuLyDon, setdataModalXuLyDon] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachQDGiaoXacMinh?.find(
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

  const {DanhSachQDGiaoXacMinh, DanhSachHuongXuLy, TotalRow, role} = props;

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

  const showModalAdd = (isViewDetails) => {
    setAction('add');
    setDataModalAddEdit({isViewDetails});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const closeModalXuLyDon = () => {
    setVisibleModalKetQuaXuLyDon(false);
    setdataModalXuLyDon({});
  };

  const showModalDetails = () => {
    const XuLyDonID = selectedRowsKey[0];
    // setAction('edit');
    api
      .KetQuaXuLyDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalXuLyDon({isViewDetails: true, ...res.data.Data});
          inceaseModalKey();
          setVisibleModalKetQuaXuLyDon(true);
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

  const showModalDetailsGiaoXacMinh = () => {
    const XuLyDonID = selectedRowsKey[0];
    // setAction('edit');
    api
      .ChiTietGiaoXacMinh({XuLyDonID})
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

  const submitModalAddEdit = (data) => {
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileCapNhatGiaoXacMinh,
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
        api.CapNhatQuyetDinhGiaoXacMinh(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            setSelectedRowsKey([]);
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
      } else {
        delete data.FileDinhkem;
      }
      Promise.all(Promise_Files).then((list) => {
        api
          .CapNhatBanHanh(data)
          .then((res) => {
            setLoading(false);
            if (res.data.Status > 0) {
              message.destroy();
              message.success(res.data.Message);
              setSelectedRowsKey([]);
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
    const newDanhSachQDGiaoXacMinh = DanhSachQDGiaoXacMinh?.map((item) => ({
      ...item,
      key: item?.XuLyDonID,
    }));
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachQDGiaoXacMinh}
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
          placeholder={'Chọn trạng thái cập nhật'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          <Option value={'0'}>Chưa cập nhật quyết định</Option>
          <Option value={'1'}>Đã cập nhật quyết định</Option>
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
        <Select
          style={{width: '200px'}}
          value={filterData.HuongXuLyID}
          placeholder={'Chọn hướng xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'HuongXuLyID')}
        >
          {DanhSachHuongXuLy
            ? DanhSachHuongXuLy.map((item) => (
                <Option
                  value={item.HuongGiaiQuyetID?.toString()}
                  key={item.HuongGiaiQuyetID}
                >
                  {item.TenHuongGiaiQuyet}
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
      dataIndex: 'NgayTiepNhan',
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
      title: 'Nguồn đơn đến',
      dataIndex: 'TenNguonDonDen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {handleRenderTenNguonDonDen(record)}
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
      title: 'Hướng xử lý',
      dataIndex: 'HuongXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenHuongGiaiQuyet}
        </p>
      ),
    },
    {
      title: 'Hạn giải quyết',
      dataIndex: 'HanGiaiQuyet',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HanGiaiQuyet
            ? dayjs(record.HanGiaiQuyet).format('DD/MM/YYYY')
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
          {handleRenderTrangThai(record, 'TenTrangThai')}
        </p>
      ),
    },
  ];

  const {DanhSachCoQuan} = props;

  const TrangThaiIDMoi = DanhSachQDGiaoXacMinh?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiIDMoi;

  const CheckTrangThai = DanhSachQDGiaoXacMinh?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.CheckTrangThai;

  const checkCapNhapVanGXM = CheckTrangThai
    ? !(selectedRowsKey.length === 1) &&
      TrangThaiIDMoi === TrangThaiMoi.ChuaCapNhapVBGXM
    : !(selectedRowsKey.length === 1);

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Cập nhật văn bản giao xác minh</PageHeader>
        <PageAction>
          {/* {role ? role.add ?  */}
          <Button
            type="primary"
            className="btn-center"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.viewDetail
                  : icons.viewDetailWhite
              }
            />
            Xem chi tiết đơn thư
          </Button>
          <Button
            type="primary"
            className="btn-center"
            onClick={showModalDetails}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.viewDetail
                  : icons.viewDetailWhite
              }
            />
            Xem kết quả xử lý đơn
          </Button>
          <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalDetailsGiaoXacMinh(true)}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.viewDetail
                  : icons.viewDetailWhite
              }
            />
            {/* <PlusOutlined /> */}
            Xem văn bản giao xác minh
          </Button>
          <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalAdd(false)}
            disabled={checkCapNhapVanGXM}
          >
            <img
              className="btn-icon__img"
              src={checkCapNhapVanGXM ? icons.Process : icons.ProcessWhite}
            />
            {/* <PlusOutlined /> */}
            Cập nhật văn bản giao xác minh
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>
          {/* <Tabs
            items={itemsTabs}
            defaultActiveKey="1"
            value={filterData?.tabsKey}
            onChange={(value) => {
              const newFilterData = {...filterData};
              for (const key in newFilterData) {
                if (Object.hasOwnProperty.call(newFilterData, key)) {
                  if (newFilterData[key] !== 'Status') {
                    newFilterData[key] = null;
                  }
                }
              }
              setSelectedRowsKey([]);
              setFilterData({...newFilterData, tabsKey: value});
            }}
          >
          </Tabs> */}
          {handleRenderContentKhieuNai()}
        </Wrapper>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={loading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachQDGiaoXacMinh}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuan}
      />
      <ModalChiTietKetQuaXuLyDon
        visible={visibleModalKetQuaXuLyDon}
        key={keyModalKetQuaXuLyDon}
        dataEdit={dataModalXuLyDon}
        onCancel={closeModalXuLyDon}
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
    ...state.CapNhatQDGiaoXacMinh,
    role: getRoleByKey(state.Auth.role, 'giao-xac-minh'),
  };
}

export default connect(mapStateToProps, actions)(CapNhatQDGiaoXacMinh);
