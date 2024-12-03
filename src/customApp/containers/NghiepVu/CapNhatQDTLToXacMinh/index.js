import {DatePicker, Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/CapNhatQDTLToXacMinh/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './GiaoXacMinh.styled';
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
  handleRenderTenNguonDonDen,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {handleTextLong} from '../../../../helpers/utility';
import {UnorderedListOutlined} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ModalKetQuaXacMinh from './ModalKetQuaXacMinh';
import ModalGiaoXacMinh from './ModalGiaoXacMinh';
import moment from 'moment';
import icons from '../icons';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {getLocalKey} from '../../../../helpers/utility';
const GiaoXacMinh = (props) => {
  document.title = 'Cập nhật quyết định thành lập đoàn/tổ xác minh';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [loading, setLoading] = useState(false);
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalKetQuaXacMinh, setVisibleModalKetQuaXacMinh] =
    useState(false);
  const [dataModalKetQuaXacMinh, setdataModalKetQuaXacMinh] = useState({});
  const [keyModalKetQuaXacMinh, setKeyModalKetQuaXacMinh] = useState(0);
  const [visibleModalGiaoXacMinh, setVisibleModalGiaoXacMinh] = useState(false);
  const [dataModalGiaoXacMinh, setdataModalGiaoXacMinh] = useState({});
  const [keyModalGiaoXacMinh, setKeyModalGiaoXacMinh] = useState(0);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const user = getLocalKey('user', {});
  const RoleID = user?.RoleID;
  const CapID = user?.CapID;
  const SuDungQuyTrinhGQPhucTap = JSON.parse(
    localStorage?.getItem('user'),
  )?.SuDungQuyTrinhGQPhucTap;

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachGiaoXacMinh?.find(
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

  const closeModalGiaoXacMinh = () => {
    setVisibleModalGiaoXacMinh(false);
  };

  const showModalGiaoXacMinh = (type) => {
    setVisibleModalGiaoXacMinh(true);
    setdataModalGiaoXacMinh({type});
    setKeyModalGiaoXacMinh((prevKey) => prevKey + 1);
  };

  const submitModalGiaoXacMinh = (data, type) => {
    setLoading(true);
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileCapNhatGiaoXacMinh,
    };
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
        .GiaoXacMinh(data)
        .then((res) => {
          setLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            closeModalGiaoXacMinh();
            props.getInitData(filterData);
            setSelectedRowsKey([]);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    });
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
            onClick={(event) => handleIconClick(event, record)}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              onClick={(event) => handleIconClick(event, record)}
              // onClick={() => setSelectedRowsKey([record.XuLyDonID])}
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
            <div>
              <Checkbox
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
    const newDanhSachGiaoXacMinh = DanhSachGiaoXacMinh.map((item) => ({
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
          dataSource={newDanhSachGiaoXacMinh}
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

  const handleRenderOptionsDonThu = () => {
    if (SuDungQuyTrinhGQPhucTap) {
      if (CapID === 3) {
        return (
          <>
            <Option value={'0'}>Chưa giao xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'4'}>Chưa duyệt báo cáo xác minh</Option>
            <Option value={'5'}>Đã duyệt báo cáo xác minh</Option>
          </>
        );
      } else if (RoleID === 3) {
        return (
          <>
            <Option value={'1'}>Chưa xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'5'}>Đã trình báo cáo xác minh</Option>
          </>
        );
      } else if (RoleID === 2) {
        return (
          <>
            <Option value={'0'}>Chưa giao xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'4'}>Chưa duyệt báo cáo xác minh</Option>
            <Option value={'5'}>Đã trình báo cáo xác minh</Option>
          </>
        );
      } else if (RoleID === 1) {
        return (
          <>
            <Option value={'0'}>Chưa giao xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'4'}>Chưa duyệt báo cáo xác minh</Option>
            <Option value={'5'}>Đã trình báo cáo xác minh</Option>
            <Option value={'6'}>Chưa ban hành quyết định giải quyết</Option>
            <Option value={'7'}>Đã ban hành quyết định giải quyết</Option>
          </>
        );
      }
    } else {
      return (
        <>
          <Option value={'0'}>Chưa giao xác minh</Option>
          <Option value={'1'}>Chưa xác minh</Option>
          <Option value={'2'}>Đang xác minh</Option>
          <Option value={'4'}>Chưa duyệt báo cáo xác minh</Option>
          <Option value={'5'}>Đã trình báo cáo xác minh</Option>
          <Option value={'6'}>Chưa ban hành quyết định giải quyết</Option>
          <Option value={'7'}>Đã ban hành quyết định giải quyết</Option>
        </>
      );
    }
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThai}
          placeholder={'Chọn trạng thái đơn thư'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          {handleRenderOptionsDonThu()}
          {/* <Option value={1}>Chưa xác min</Option>
          <Option value={2}>Đang xác minh</Option>
          <Option value={4}>Chưa duyệt báo cáo xác minh</Option>
          <Option value={4}>Đã trình báo cáo xác minh</Option> */}
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
          defaultValue={filterData.Keyword}
          placeholder={'Nhập đối tượng KNTC, KNPA hoặc nội dung tiếp'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    );
  };

  const showModalKetQuaXacMinh = () => {
    const XuLyDonID = selectedRowsKey[0];
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

  const {
    DanhSachGiaoXacMinh,
    DanhSachHuongXuLy,
    TotalRow,
    role,
    tableLoading,
    DanhSachCoQuan,
    DanhSachTruongPhong,
    DanhSachCanBoGQ,
    DanhSachLoaiKhieuTo,
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
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
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
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {record.NgayTiep ? dayjs(record.NgayTiep).format('DD/MM/YYYY') : null}
        </p>
      ),
    },
    {
      title: 'Nguồn đơn đến',
      dataIndex: 'TenNguonDonDen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {handleRenderTenNguonDonDen(record)}
        </p>
      ),
    },
    {
      title: 'Thông tin chủ đơn',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '25%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN.map((item) => (
                <div>
                  <p
                    style={{
                      fontWeight: '600',
                      color: record.TrangThai === 0 ? 'red' : '',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.HoTen}
                  </p>
                  <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
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
          <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
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
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {record.TenLoaiKhieuTo}
        </p>
      ),
    },
    {
      title: 'Hạn xử lý',
      dataIndex: 'HanXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {record.HanXuLy ? dayjs(record.HanXuLy).format('DD/MM/YYYY') : null}
        </p>
      ),
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'TenHuongGiaiQuyet',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {record.TenHuongGiaiQuyet}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThai === 0 ? 'red' : ''}}>
          {record.TenTrangThai}
        </p>
      ),
    },
  ];

  const TrangThai = DanhSachGiaoXacMinh?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThai;

  const ItemLoaiKhieuTo = DanhSachGiaoXacMinh.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.LoaiKhieuTo1ID;

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Cập nhật quyết định giao xác minh</PageHeader>
        <PageAction>
          <Button
            type="primary"
            onClick={showModalChiTietDonThu}
            className="btn-center"
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
            onClick={() => showModalKetQuaXacMinh()}
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
            Kết quả xác minh
          </Button>
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalGiaoXacMinh(1)}
              disabled={!(selectedRowsKey.length === 1) || TrangThai !== 0}
            >
              <img
                src={
                  !(selectedRowsKey.length === 1) || TrangThai !== 0
                    ? icons.Process
                    : icons.ProcessWhite
                }
                className="btn-icon__img"
              />
              {!SuDungQuyTrinhGQPhucTap
                ? 'Cập nhật QĐTL tổ/đoàn xác minh'
                : 'Giao xác minh'}
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>

      <ModalKetQuaXacMinh
        onCancel={closeModalKetQuaXacMinh}
        dataEdit={dataModalKetQuaXacMinh}
        visible={visibleModalKetQuaXacMinh}
        key={keyModalKetQuaXacMinh}
      />

      <ModalGiaoXacMinh
        DanhSachTruongPhong={DanhSachTruongPhong}
        DanhSachCanBoGQ={DanhSachCanBoGQ}
        onCancel={closeModalGiaoXacMinh}
        dataEdit={dataModalGiaoXacMinh}
        visible={visibleModalGiaoXacMinh}
        key={keyModalGiaoXacMinh}
        onCreate={submitModalGiaoXacMinh}
        SuDungQuyTrinhGQPhucTap={SuDungQuyTrinhGQPhucTap}
        loading={loading}
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
    ...state.CapNhatQDTLToXacMinh,
    role: getRoleByKey(state.Auth.role, 'cap-nhat-qdtl-to-xac-minh'),
  };
}

export default connect(mapStateToProps, actions)(GiaoXacMinh);
