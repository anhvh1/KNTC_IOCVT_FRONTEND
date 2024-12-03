import {DatePicker, Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/PheDuyetKetQuaXuLy/actions';
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
import {
  CapHanhChinh,
  CapID,
  HuongGiaiQuyet,
  LoaiFileDinhKem,
  NGUONDONDEN,
  RoleID,
  TrangThaiMoi,
} from '../../../../settings/constants';
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
import {handleTextLong} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ModalTrinhDuyet from './modalTrinhDuyet';
import ModalChiTietKetQuaXuLyDon from '../Shared/Modal/ModalChiTietKetQuaXuLyDon';
import icons from '../icons';
import moment from 'moment';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import ModalChuyenDon from '../XuLyDon/modalChuyenDon';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
const PheDuyetKetQuaXuLy = (props) => {
  document.title = 'Phê duyệt kết quả xử lý';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleModalTrinhDuyet, setVisibleModalTrinhDuyet] = useState(false);
  const [keyModalTrinhDuyet, setKeyModalTrinhDuyet] = useState(0);
  const [dataModalAddEditTrinhDuyet, setDataModalAddEditTrinhDuyet] = useState(
    {},
  );
  const [DanhSachLanhDao, setDanhSachLanhDao] = useState([]);
  const [visibleModalKetQuaXuLyDon, setVisibleModalKetQuaXuLyDon] =
    useState(false);
  const [keyModalKetQuaXuLyDon, setKeyModalKetQuaXuLyDon] = useState(0);
  const [dataModalAddEditKetQuaXuLyDon, setDataModalAddEditKetQuaXuLyDon] =
    useState({});

  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [visibleModalChuyenDon, setVisibleModalChuyenDon] = useState(false);
  const [keyModalChuyenDon, setKeyModalChuyenDon] = useState(0);
  const [dataModalChuyenDon, setDataModalChuyenDon] = useState({});
  const {
    DanhSachPheDuyetKetQuaXuLy,
    DanhSachCoQuanChuyenDon,
    DanhSachHuongXuLy,
    DanhSachLoaiKhieuTo,
    TotalRow,
    role,
    // DanhSachLanhDao,
  } = props;
  const user = getLocalKey('user');
  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachPheDuyetKetQuaXuLy?.find(
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

  const LanhDaoDuyet2ID = DanhSachPheDuyetKetQuaXuLy?.find(
    (item) => item?.XuLyDonID === selectedRowsKey[0],
  )?.LanhDaoDuyet2ID;

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

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
    const selectRow = DanhSachPheDuyetKetQuaXuLy.find(
      (item) => item.XuLyDonID === selectedRowsKey[0],
    );
    setAction('add');
    setVisibleModalAddEdit(true);
    setDataModalAddEdit({...selectRow});
    inceaseModalKey();
  };

  const showModalDetails = () => {
    const XuLyDonID = selectedRowsKey[0];
    // setAction('edit');
    api
      .KetQuaXuLyDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEditKetQuaXuLyDon({
            isViewDetails: true,
            ...res.data.Data,
          });
          setKeyModalKetQuaXuLyDon((prevKey) => prevKey + 1);
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

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalTrinhDuyet = (data) => {
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const type = data.type;
    if (type === 1) {
      Modal.confirm({
        title: 'Trình dự thảo quyết định xác minh',
        content:
          'Bạn có chắc chắn muốn trình dự thảo quyết định giao xác minh không?',
        cancelText: 'Không',
        okText: 'Có',
        onOk: () => {
          setLoading(true);
          const LoaiFile = {
            FileType: LoaiFileDinhKem.PheDuyetKetQuaXuLy,
          };
          const Promise_Files = [];
          if (data.DanhSachHoSoTaiLieu) {
            mapFileToPromiseArray(
              data?.DanhSachHoSoTaiLieu,
              Promise_Files,
              LoaiFile,
              api,
            );
          }
          Promise.all(Promise_Files).then((list) => {
            api.TrinhDonThu(data).then((res) => {
              setLoading(false);
              if (!res || !res.data || res.data.Status !== 1) {
                message.error(
                  `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                );
              } else {
                message.success(res.data.Message);
                HideTrinhDuyet();
                props.getInitData(filterData);
                setSelectedRowsKey([]);
              }
            });
          });
        },
      });
    } else {
      setLoading(true);
      api.TrinhLanhDao(data).then((res) => {
        setLoading(false);
        if (!res || !res.data || res.data.Status !== 1) {
          message.error(
            `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          );
        } else {
          message.success(res.data.Message);
          HideTrinhDuyet();
          props.getInitData(filterData);
          setSelectedRowsKey([]);
        }
      });
    }
  };

  const submitModalAddEdit = (data) => {
    const checkChuyenDon =
      currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon;
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.PheDuyetKetQuaXuLy,
    };

    if (LanhDaoDuyet2ID >= 0 && LanhDaoDuyet2ID) {
      data.LanhDaoDuyet2ID = LanhDaoDuyet2ID;
    }
    if (action === 'add') {
      const Promise_Files = [];
      if (data.DanhSachHoSoTaiLieu) {
        mapFileToPromiseArray(
          data?.DanhSachHoSoTaiLieu,
          Promise_Files,
          LoaiFile,
          api,
        );
      }
      Promise.all(Promise_Files).then((list) => {
        let callApi = api.PheDuyetKetQuaXuLy;
        if (
          checkTrangThaiChuyenDon &&
          checkChuyenDon &&
          data.TrangThaiPheDuyet !== 2
        ) {
          callApi = api.ChuyenDon;
        }
        callApi(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.destroy();
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
    }
  };

  const submitModalChuyenDon = (data) => {
    data.XuLyDonID = selectedRowsKey[0];
    if (LanhDaoDuyet2ID && LanhDaoDuyet2ID >= 0) {
      data.LanhDaoDuyet2ID = LanhDaoDuyet2ID;
    }
    setLoading(true);
    api.ChuyenDon(data).then((res) => {
      setLoading(false);
      if (!res || !res.data || res.data.Status !== 1) {
        message.error(`${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`);
      } else {
        message.success(res.data.Message);
        closeModalChuyenDon();
        props.getInitData(filterData);
        setSelectedRowsKey([]);
      }
    });
  };

  const closeModalChuyenDon = () => {
    setVisibleModalChuyenDon(false);
  };

  const TrinhDuThao = (type) => {
    const XyLyDonID = selectedRowsKey[0];
    const callApi =
      type === 1 ? api.DanhSachLanhDao : api.DanhSachLanhDaoPheDuyet;
    callApi({XyLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachLanhDao(res.data.Data);
          setVisibleModalTrinhDuyet(true);
          setDataModalAddEditTrinhDuyet({type});
          setKeyModalTrinhDuyet((prevKey) => prevKey + 1);
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
    const newDanhSachPheDuyetKetQuaXuLy = DanhSachPheDuyetKetQuaXuLy?.map(
      (item) => ({
        ...item,
        key: item?.XuLyDonID,
      }),
    );
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachPheDuyetKetQuaXuLy}
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

  const showModalChuyenDon = () => {
    setKeyModalChuyenDon((prevKey) => prevKey + 1);
    setVisibleModalChuyenDon(true);
  };

  const HideTrinhDuyet = () => {
    setVisibleModalTrinhDuyet(false);
    // setKeyModalTrinhDuyet(prevKey + 1)
  };

  const hideModalKetQuaXuLyDon = () => {
    setVisibleModalKetQuaXuLyDon(false);
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThaiID}
          placeholder={'Chọn trạng thái xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiID')}
        >
          <Option value={'0'}>Chưa duyệt</Option>
          <Option value={'1'}>Đã duyệt</Option>
          <Option value={'2'}>Xử lý lại</Option>
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
          defaultValue={filterData.Keyword}
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
      dataIndex: 'NgayGuis',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record?.NgayTiepNhan
            ? dayjs(record?.NgayTiepNhan).format('DD/MM/YYYY')
            : null}
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
      width: '30%',
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
      title: 'Hướng xử lý',
      dataIndex: 'HuongXuLy',
      align: 'left',
      width: '15%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HuongXuLy}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {handleRenderTrangThai(record, 'TrangThai')}
        </p>
      ),
    },
  ];

  const currentSelect = DanhSachPheDuyetKetQuaXuLy?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  );

  const TrangThai = currentSelect?.TrangThaiID;
  const CapIDUser = user?.CapID;
  const ChanhThanhTra = user?.ChanhThanhTra;
  const checkLanhDaoXa =
    CapIDUser === CapID.CapUBNDXa && user?.RoleID === RoleID.LanhDao;
  const CheckBTDH =
    user.CapHanhChinh === CapID.CapPhongThuocHuyen && user.BanTiepDan;
  const CheckPhongThuocSo = user.CapHanhChinh === CapHanhChinh.CapPhongThuocSo;
  const checkCTH = user.ChuTichUBND === 1 && user.CapID === CapID.CapUBNDHuyen;
  const checkCapSoNganh = user.CapHanhChinh === CapHanhChinh.CapSoNganh;
  //  &&
  // user.CapID === CapID.CapSoNganh;

  const TrangThaiIDMoi = DanhSachPheDuyetKetQuaXuLy?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiIDMoi;

  const checkTrangThaiChuyenDon =
    currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon &&
    ((currentSelect?.LanhDaoDuyet2ID === user?.CanBoID &&
      (currentSelect?.TrangThaiIDMoi === TrangThaiMoi.DaTrinhLan1 ||
        currentSelect?.TrangThaiIDMoi === TrangThaiMoi.DaTrinhDuyetLan2)) ||
      (currentSelect?.TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan1 &&
        user?.CapHanhChinh === CapHanhChinh.CapUBNDTinh &&
        user.BanTiepDan) ||
      ((currentSelect?.TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan1 ||
        currentSelect?.TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan2 ||
        currentSelect?.TrangThaiIDMoi === TrangThaiMoi.DaDuyetLan1) &&
        user?.CapHanhChinh === CapHanhChinh.CapUBNDXa));

  const LoaiQuyTrinh = DanhSachPheDuyetKetQuaXuLy?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.LoaiQuyTrinh;

  const CheckTrangThai = DanhSachPheDuyetKetQuaXuLy?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.CheckTrangThai;

  const checkTrinhDuThao = CheckTrangThai
    ? !(
        selectedRowsKey.length === 1 &&
        TrangThaiIDMoi === TrangThaiMoi.DaDuyetLan1
      )
    : !(selectedRowsKey.length === 1) ||
      TrangThai === 3 ||
      TrangThai === 2 ||
      TrangThai === 0;
  const ChuTichUBND = user?.ChuTichUBND;
  const CTT = ChuTichUBND && user?.RoleID === RoleID.LanhDao;

  const checkTrinhDuyet = CheckTrangThai
    ? !(
        selectedRowsKey.length === 1 &&
        TrangThaiIDMoi === TrangThaiMoi.DaDuyetLan1 &&
        (LanhDaoDuyet2ID === null || LanhDaoDuyet2ID === 0)
      )
    : !(
        selectedRowsKey.length === 1 &&
        TrangThai === 1 &&
        (LanhDaoDuyet2ID === null || LanhDaoDuyet2ID === 0)
      );

  const checkPhongThuocHuyen =
    user.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen && !user.BanTiepDan;

  const checkPheDuyet = CheckTrangThai
    ? !(selectedRowsKey.length === 1 && !CTT
        ? user.RoleID === RoleID.LanhDaoPhong ||
          (user.CapHanhChinh === CapHanhChinh.CapUBNDTinh && user.BanTiepDan) ||
          ((user.CapHanhChinh === CapHanhChinh.CapUBNDHuyen ||
            user.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen) &&
            user.BanTiepDan &&
            user.RoleID === RoleID.LanhDao)
          ? TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan1
          : TrangThaiIDMoi === TrangThaiMoi.DaDuyetLan1 ||
            TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan2
        : TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan2)
    : //   ||
      // (currentSelect.LanhDaoDuyet2ID === user.CanBoID &&
      //   currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon) ||
      // (user.CapHanhChinh === CapHanhChinh.CapUBNDTinh &&
      //   user.BanTiepDan &&
      //   currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon) ||
      // ((user.CapHanhChinh === CapHanhChinh.CapUBNDXa ||
      //   user.CapHanhChinh === CapHanhChinh.CapPhongThuocXa) &&
      //   currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon)
      !(selectedRowsKey.length === 1) || TrangThai > 0;

  // const CheckChuyenDon =
  //   currentSelect?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon &&
  //   checkTrangThaiChuyenDon &&
  //   user?.SuDungQuyTrinhPhucTap === true;

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Phê duyệt kết quả xử lý</PageHeader>
        <PageAction>
          <Button
            className="btn-center"
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.Preview
                  : icons.PreviewWhite
              }
            />
            {/* <PlusOutlined /> */}
            Xem chi tiết đơn thư
          </Button>
          <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalDetails()}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.Preview
                  : icons.PreviewWhite
              }
            />
            {/* <PlusOutlined /> */}
            Xem kết quả xử lý đơn
          </Button>
          {role.edit &&
          !checkLanhDaoXa &&
          !checkCTH &&
          !checkCapSoNganh &&
          !CheckPhongThuocSo &&
          !checkPhongThuocHuyen ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => TrinhDuThao(1)}
              disabled={
                checkTrinhDuThao
                // !(selectedRowsKey.length === 1) ||
                // TrangThai === 3 ||
                // TrangThai === 2 ||
                // TrangThai === 0
              }
            >
              <img
                className="btn-icon__img"
                src={
                  // !(selectedRowsKey.length === 1) ||
                  // TrangThai === 3 ||
                  // TrangThai === 2 ||
                  // TrangThai === 0
                  checkTrinhDuThao ? icons.Send : icons.SendWhite
                }
              />
              {CheckBTDH ? 'Trình duyệt' : 'Trình dự thảo QĐ giao xác minh'}
            </Button>
          ) : null}
          {role.edit &&
          !checkCTH &&
          !user?.BanTiepDan &&
          ChanhThanhTra !== 1 &&
          !checkLanhDaoXa ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => TrinhDuThao(2)}
              disabled={
                checkTrinhDuyet
                // !(
                //   selectedRowsKey.length === 1 &&
                //   TrangThai === 1 &&
                //   (LanhDaoDuyet2ID === null || LanhDaoDuyet2ID === 0)
                // )
              }
            >
              <img
                src={
                  checkTrinhDuyet
                    ? // !(
                      //   selectedRowsKey.length === 1 &&
                      //   TrangThai === 1 &&
                      //   (LanhDaoDuyet2ID === null || LanhDaoDuyet2ID === 0)
                      // )
                      icons.Send
                    : icons.SendWhite
                }
                className="btn-icon__img"
              />
              Trình duyệt
            </Button>
          ) : null}
          {/* <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalChuyenDon()}
            disabled={!CheckChuyenDon}
          >
            <img
              className="btn-icon__img"
              src={!CheckChuyenDon ? icons.Approval : icons.ApprovalWhite}
            />
            Chuyển đơn
          </Button> */}
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={showModalAdd}
              disabled={checkPheDuyet}
            >
              <img
                className="btn-icon__img"
                src={
                  checkPheDuyet
                    ? // !(selectedRowsKey.length === 1) || TrangThai > 0
                      icons.Approval
                    : icons.ApprovalWhite
                }
              />
              Phê duyệt
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
        dataSource={DanhSachPheDuyetKetQuaXuLy}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuanChuyenDon}
        checkTrangThaiChuyenDon={checkTrangThaiChuyenDon}
      />
      <ModalChiTietKetQuaXuLyDon
        visible={visibleModalKetQuaXuLyDon}
        dataEdit={dataModalAddEditKetQuaXuLyDon}
        key={keyModalKetQuaXuLyDon}
        onCancel={hideModalKetQuaXuLyDon}
      />
      <ModalTrinhDuyet
        loading={loading}
        visible={visibleModalTrinhDuyet}
        key={keyModalTrinhDuyet}
        onCancel={HideTrinhDuyet}
        onCreate={submitModalTrinhDuyet}
        TrinhDuyet={submitModalTrinhDuyet}
        dataEdit={dataModalAddEditTrinhDuyet}
        DanhSachLanhDao={DanhSachLanhDao}
        isXa={CapIDUser === 3}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
      <ModalChuyenDon
        visible={visibleModalChuyenDon}
        key={keyModalChuyenDon}
        dataEdit={dataModalChuyenDon}
        onCancel={closeModalChuyenDon}
        DanhSachCoQuan={DanhSachCoQuanChuyenDon}
        onCreate={submitModalChuyenDon}
        loading={loading}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.PheDuyetKetQuaXuLy,
    role: getRoleByKey(state.Auth.role, 'phe-duyet-ket-qua-xu-ly'),
  };
}

export default connect(mapStateToProps, actions)(PheDuyetKetQuaXuLy);
