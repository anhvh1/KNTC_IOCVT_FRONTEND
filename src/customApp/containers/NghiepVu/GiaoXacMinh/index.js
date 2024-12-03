import {DatePicker, Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/GiaoXacMinh/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './GiaoXacMinh.styled';
import ModalTrinhBaoCaoXacMinh from './modalTrinhBaoCaoXacMinh';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  CapHanhChinh,
  LoaiFileDinhKem,
  LoaiQuyTrinhDonThu,
  RoleID,
  TrangThaiMoi,
} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  handleRenderTenNguonDonDen,
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
import ModalKetQuaXacMinh from './ModalKetQuaXacMinh';
import ModalXacMinhNoiDungDon from './ModalXacMinhNoiDungDon';
import ModalGiaoXacMinh from './ModalGiaoXacMinh';
import ModalDuyetBaoCaoXacMinh from './ModalDuyetBaoCaoXacMinh';
import moment from 'moment';
import ModalChiTietKetQuaXuLyDon from '../Shared/Modal/ModalChiTietKetQuaXuLyDon';
import icons from '../icons';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import ModalGiaHanXacMinh from './ModalGiaHanXacMinh';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {getLocalKey} from '../../../../helpers/utility';
import ModalQuyetDinhGiaoXacMinh from '../CapNhatQDGiaoXacMinh/modalAddEdit';
const GiaoXacMinh = (props) => {
  document.title = 'Giải quyết đơn';
  // const [filterData, setFilterData] = useState(
  //   queryString.parse(props.location.search),
  // );
  const {filterData, setFilterData} = props;
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalTrinhDuyet, setVisibleModalTrinhDuyet] = useState(false);
  const [keyModalTrinhDuyet, setKeyModalTrinhDuyet] = useState(0);
  const [loadingState, setLoadingState] = useState({
    loading: false,
    loadingModalGiaoXacMinh: false,
    loadingModalDuyetXacMinh: false,
    loadingModalTrinhXacMinh: false,
  });
  const [visibleModalKetQuaXacMinh, setVisibleModalKetQuaXacMinh] =
    useState(false);

  const [dataModalKetQuaXacMinh, setdataModalKetQuaXacMinh] = useState({});
  const [keyModalKetQuaXacMinh, setKeyModalKetQuaXacMinh] = useState(0);
  const [visibleModalXacMinhNoiDungDon, setVisibleModalXacMinhNoiDungDon] =
    useState(false);
  const [dataModalXacMinhNoiDungDon, setdataModalXacMinhNoiDungDon] = useState(
    {},
  );
  const [keyModalXacMinhNoiDungDon, setKeyModalXacMinhNoiDungDon] = useState(0);

  const [visibleModalDuyetBaoCaoXacMinh, setVisibleModalDuyetBaoCaoXacMinh] =
    useState(false);
  const [dataModalDuyetBaoCaoXacMinh, setdataModalDuyetBaoCaoXacMinh] =
    useState({});
  const [keyModalDuyetBaoCaoXacMinh, setKeyModalDuyetBaoCaoXacMinh] =
    useState(0);

  const [visibleModalGiaoXacMinh, setVisibleModalGiaoXacMinh] = useState(false);
  const [dataModalGiaoXacMinh, setdataModalGiaoXacMinh] = useState({});
  const [keyModalGiaoXacMinh, setKeyModalGiaoXacMinh] = useState(0);
  const [visibleModalKetQuaXuLyDon, setVisibleModalKetQuaXuLyDon] =
    useState(false);

  const [dataModalKetQuaXuLyDon, setdataModalKetQuaXuLyDon] = useState({});
  const [keyModalKetQuaXuLyDon, setKeyModalKetQuaXuLyDon] = useState(0);
  const [visibleModalTrinhBaoCaoXacMinh, setVisibleModalTrinhBaoCaoXacMinh] =
    useState(false);
  const [dataModalTrinhBaoCaoXacMinh, setdataModalTrinhBaoCaoXacMinh] =
    useState({});
  const [keyModalTrinhBaoCaoXacMinh, setKeyModalTrinhBaoCaoXacMinh] =
    useState(0);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  const [visibleModalGiaHanXacMinh, setVisibleModalGiaHanXacMinh] =
    useState(false);
  const [keyModalGiaHanXacMinh, setKeyModalGiaHanXacMinh] = useState(0);
  const [dataModalGiaHanXacMinh, setDataModalGiaHanXacMinh] = useState({});
  const [DanhSachCanBoXacMinh, setDanhSachCanBoXacMinh] = useState([]);

  const user = getLocalKey('user', {});
  const RoleIdUser = user?.RoleID;
  const SuDungQuyTrinhGQPhucTap = JSON.parse(
    localStorage?.getItem('user'),
  )?.SuDungQuyTrinhGQPhucTap;
  const CapID = user?.CapID;

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

  const showModalAdd = () => {
    setAction('add');
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const showModalDetails = () => {
    const TiepDanID = selectedRowsKey[0];
    setVisibleModalAddEdit(true);
    // setAction('edit');
    // api
    //   .ChiTietDonThu({TiepDanID})
    //   .then((res) => {
    //     if (res.data.Status > 0) {
    //       inceaseModalKey();
    //       setDataModalAddEdit({isViewDetails: true, ...res.data.Data});
    //     } else {
    //       message.destroy();
    //       message.error(res.data.Message);
    //     }
    //   })
    //   .catch((error) => {
    //     message.destroy();
    //     message.error(error.toString());
    //   });
  };

  const hideModalAddEdit = () => {
    // setAction("");
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const closeModalGiaoXacMinh = () => {
    setVisibleModalGiaoXacMinh(false);
  };

  const showModalGiaoXacMinh = (type) => {
    // LoaiQuyTrinh === LoaiQuyTrinhDonThu.PhongThuocSo
    if (LoaiQuyTrinh === LoaiQuyTrinhDonThu.PhongThuocSo) {
      api
        .GetNguoiDungByCoQuanID({CoQuanID: CoQuanIDDonThu})
        .then((res) => {
          if (res.data.Status > 0) {
            setDanhSachCanBoXacMinh(res.data.Data);
            setVisibleModalGiaoXacMinh(true);
            setdataModalGiaoXacMinh({type});
            setKeyModalGiaoXacMinh((prevKey) => prevKey + 1);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    } else {
      setVisibleModalGiaoXacMinh(true);
      setdataModalGiaoXacMinh({type});
      setKeyModalGiaoXacMinh((prevKey) => prevKey + 1);
    }
  };

  const submitModalGiaoXacMinh = (data, type) => {
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
    let apiCall = api.GiaoXacMinh;
    if (!checkGiaoXacMinhKoCoVaiTroCanBo) {
      apiCall = api.CapNhapDoanToXacMinh;
    }

    Promise.all(Promise_Files).then((list) => {
      apiCall(data)
        .then((res) => {
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

  const closeModalGiaHanXacMinh = () => {
    setVisibleModalGiaHanXacMinh(false);
  };

  const showModalGiaHanXacMinh = (type) => {
    setVisibleModalGiaHanXacMinh(true);
    setDataModalGiaHanXacMinh({type});
    setKeyModalGiaHanXacMinh((prevKey) => prevKey + 1);
  };

  const submitModalGiaHanXacMinh = (data, type) => {
    setLoadingState((prevState) => ({
      ...prevState,
      loadingModalGiaHanXacMinh: true,
    }));
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileGiaHanGiaiQuyet,
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
        .GiaHanThoiGianXacMinh(data)
        .then((res) => {
          setLoadingState((prevState) => ({
            ...prevState,
            loadingModalGiaHanXacMinh: false,
          }));
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            setSelectedRowsKey([]);
            closeModalGiaHanXacMinh();
            props.getInitData(filterData);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          setLoadingState((prevState) => ({
            ...prevState,
            loadingModalGiaHanXacMinh: false,
          }));
          message.destroy();
          message.warning(err.toString());
        });
    });
  };

  const submitModalAddEdit = (data) => {
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    setLoadingState((prevState) => ({...prevState, loading: true}));
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileHoSo,
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
      api.BanHanhQuyetDinhGiaiQuyet(data).then((res) => {
        setLoadingState((prevState) => ({...prevState, loading: false}));
        if (!res || !res.data || res.data.Status !== 1) {
          message.error(
            `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          );
        } else {
          setLoadingState((prevState) => ({...prevState, loading: false}));
          message.success(res.data.Message);
          hideModalAddEdit();
          props.getInitData(filterData);
          setSelectedRowsKey([]);
        }
      });
    });
  };

  const handleEditQuyTrinhXacMinh = (data) => {};

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
    const newDanhSachGiaoXacMinh = DanhSachGiaoXacMinh?.map((item) => ({
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
      } else if (RoleIdUser === 3) {
        return (
          <>
            <Option value={'1'}>Chưa xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'5'}>Đã trình báo cáo xác minh</Option>
          </>
        );
      } else if (RoleIdUser === 2) {
        return (
          <>
            <Option value={'0'}>Chưa giao xác minh</Option>
            <Option value={'2'}>Đang xác minh</Option>
            <Option value={'4'}>Chưa duyệt báo cáo xác minh</Option>
            <Option value={'5'}>Đã trình báo cáo xác minh</Option>
          </>
        );
      } else if (RoleIdUser === 1) {
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
          style={{width: '250px'}}
          value={filterData?.TrangThaiDonThu}
          placeholder={'Chọn trạng thái đơn thư được giao'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiDonThu')}
        >
          <Option value={'1'}>Đơn được giao phụ trách xác minh</Option>
          <Option value={'2'}>Đơn được giao phối hợp xác minh</Option>
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData?.TrangThai}
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
          value={filterData?.LoaiKhieuToID}
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
          className="search-input"
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    );
  };

  const showModalApproveReportConfirm = () => {
    setVisibleModalDuyetBaoCaoXacMinh(true);
    setKeyModalDuyetBaoCaoXacMinh((prevKey) => prevKey + 1);
  };

  const handleSubmitApproveReport = (data) => {
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    api
      .DuyetBaoCaoXacMinh(data)
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalKetQuaXacMinh({isViewDetails: true, ...res.data.Data});
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

  const submitModalTrinhBaoCaoXacMinh = (data) => {
    setLoadingState((prevState) => ({
      ...prevState,
      loadingModalDuyetXacMinh: true,
    }));
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const LoaiFile = {
      FileType: LoaiFileDinhKem.XuLyDon,
    };
    Modal.confirm({
      title: 'Trình báo cáo xác minh',
      content: !SuDungQuyTrinhGQPhucTap
        ? 'Bạn có muốn trình báo cáo xác minh này không?'
        : 'Bạn có muốn cập nhật báo cáo xác minh này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
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
            .TrinhBaoCaoXacMinh({XuLyDonID})
            .then((res) => {
              if (res.data.Status > 0) {
                message.destroy();
                message.success(res.data.Message);
                props.getInitData(filterData);
                setLoadingState((prevState) => ({
                  ...prevState,
                  loadingModalDuyetXacMinh: true,
                }));
                closeModalTrinhBaoCaoXacMinh();
                setSelectedRowsKey([]);
              } else {
                message.destroy();
                message.error(res.data.Message);
              }
            })
            .catch((error) => {
              message.destroy();
              message.error(error.toString());
            });
        });
      },
    });
  };

  const closeModalTrinhBaoCaoXacMinh = (data) => {
    setVisibleModalTrinhBaoCaoXacMinh(false);
  };

  const showModalKetQuaXuLyDon = () => {
    const TiepDanID = DanhSachGiaoXacMinh.find(
      (item) => item.XuLyDonID === selectedRowsKey[0],
    )?.TIepDanID;
    // setVisibleModalKetQuaXuLyDon(true);
    // setAction('edit');
    api
      .KetQuaXuLyDon({TiepDanID})
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalKetQuaXuLyDon({isViewDetails: true, ...res.data.Data});
          setKeyModalKetQuaXuLyDon((prevKey) => prevKey + 1);
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

  const showModalXacMinhNoiDungDon = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .ChiTietXacMinhNoiDungDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setVisibleModalXacMinhNoiDungDon(true);
          setdataModalXacMinhNoiDungDon(res.data.Data);
          setKeyModalXacMinhNoiDungDon((prevKey) => prevKey + 1);
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

  const closeModalXacMinhNoiDungDon = () => {
    setVisibleModalXacMinhNoiDungDon(false);
    props.getInitData(filterData);
  };

  const closeModalDuyetBaoCaoXacMinh = () => {
    setVisibleModalDuyetBaoCaoXacMinh(false);
  };

  const closeModalChiTietXuLyDon = () => {
    setVisibleModalKetQuaXuLyDon(false);
  };

  const submitModalDuyetBaoCaoXacMinh = (data) => {
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileDBCXM,
    };
    setLoadingState((prevState) => ({
      ...prevState,
      loadingModalDuyetXacMinh: true,
    }));
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    if (DonThuTarget && DonThuTarget?.LoaiQuyTrinh) {
      data.LoaiQuyTrinh = DonThuTarget?.LoaiQuyTrinh;
    }
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
        .DuyetBaoCaoXacMinh(data)
        .then((res) => {
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            setLoadingState((prevState) => ({
              ...prevState,
              loadingModalDuyetXacMinh: false,
            }));
            closeModalDuyetBaoCaoXacMinh();
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

  const showModalTrinhBaoCaoXacMinh = () => {
    setVisibleModalTrinhBaoCaoXacMinh(true);
    setKeyModalTrinhBaoCaoXacMinh((prevKey) => prevKey + 1);
  };

  const handleRutDon = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .RutDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          closeModalXacMinhNoiDungDon();
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
  };

  const handleCompleteReport = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .TrinhBaoCaoXacMinh({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          closeModalXacMinhNoiDungDon();
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
    DanhSachCanBo,
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
          {handleRenderTrangThai(record, 'TenTrangThai')}
        </p>
      ),
    },
  ];

  const {
    loading,
    loadingModalDuyetXacMinh,
    loadingModalGiaHanXacMinh,
    loadingModalGiaoXacMinh,
    loadingModalTrinhXacMinh,
  } = loadingState;

  const DonThuTarget = DanhSachGiaoXacMinh?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  );

  const TrangThai = DonThuTarget?.TrangThai;

  const CoQuanIDDonThu = DonThuTarget?.CoQuanID;

  const checkCapXa =
    user?.CapHanhChinh === CapHanhChinh.CapPhongThuocXa ||
    user?.CapHanhChinh === CapHanhChinh.CapUBNDXa;

  const TrangThaiDuyet = !checkCapXa
    ? DanhSachGiaoXacMinh?.find((item) => item.XuLyDonID === selectedRowsKey[0])
        ?.TrangThaiDuyet
    : true;

  const TrangThaiGiaoXacMinh = JSON.parse(
    localStorage?.getItem('user'),
  )?.TrangThaiGiaoXacMinh;

  const ItemLoaiKhieuTo = DonThuTarget?.LoaiKhieuTo1ID;

  const CQPhoiHopID = DonThuTarget?.CQPhoiHopID;

  const checkPhongThuocHuyen =
    user?.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen;

  const LoaiQuyTrinh = DonThuTarget?.LoaiQuyTrinh;

  const TrangThaiIDMoi = DonThuTarget?.TrangThaiIDMoi;

  const CheckTrangThai = DonThuTarget?.CheckTrangThai;

  const checkSelectRow = !(selectedRowsKey.length === 1);

  const checkGiaoXacMinhKoCoVaiTroCanBo = !(
    DonThuTarget?.CoCapNhapDoanToXacMinh &&
    DonThuTarget.TrangThaiIDMoi === TrangThaiMoi.ChuaXacMinhLan1
  );

  const checkXacMinh = CheckTrangThai
    ? !(
        (selectedRowsKey.length === 1 &&
          TrangThaiIDMoi === TrangThaiMoi.ChuaXacMinhLan1) ||
        TrangThaiIDMoi === TrangThaiMoi.DaXacMinhLan1
      )
    : checkSelectRow || (TrangThai !== 1 && TrangThai !== 2);

  const checkGiaoXacMinh =
    (CheckTrangThai
      ? RoleIdUser === RoleID.LanhDao
        ? !(
            selectedRowsKey.length === 1 &&
            (TrangThaiIDMoi === TrangThaiMoi.DaCapNhapVBGXM ||
              TrangThaiIDMoi === TrangThaiMoi.GiaoXacMinhLan1)
          )
        : RoleIdUser === RoleID.LanhDaoPhong
        ? checkSelectRow || TrangThaiIDMoi !== TrangThaiMoi.GiaoXacMinhLan1
        : true
      : checkSelectRow || TrangThai !== 0 || CQPhoiHopID > 0) ||
    (checkPhongThuocHuyen
      ? DonThuTarget?.LoaiQuyTrinh === LoaiQuyTrinhDonThu.BTDHuyen
      : false);

  const checkDuyetBaoCaoXacMinh = CheckTrangThai
    ? !(selectedRowsKey.length === 1 && RoleIdUser === RoleID.LanhDaoPhong
        ? TrangThaiIDMoi === TrangThaiMoi.TrinhXacMinhLan1
        : RoleIdUser === RoleID.LanhDao
        ? TrangThaiIDMoi === TrangThaiMoi.DuyetVaTrinhXacMinhLan2
        : false)
    : checkSelectRow || TrangThai !== 4;

  const checkTrinhBaoCaoXacMinh = CheckTrangThai
    ? !(
        selectedRowsKey.length === 1 &&
        TrangThaiIDMoi === TrangThaiMoi.DuyetVaTrinhXacMinhLan2
      )
    : checkSelectRow || TrangThai !== 2;

  const checkBanHanhQDGQ = CheckTrangThai
    ? !(
        selectedRowsKey.length === 1 &&
        TrangThaiIDMoi === TrangThaiMoi.DuyetLan3
      )
    : checkSelectRow || TrangThai !== 6;

  const checkGiaHanXacMinh = CheckTrangThai
    ? !(selectedRowsKey.length === 1 && RoleIdUser === RoleID.LanhDao
        ? TrangThaiIDMoi === TrangThaiMoi.GiaoXacMinhLan2
        : TrangThaiIDMoi === TrangThaiMoi.ChuaXacMinhLan1)
    : checkSelectRow || TrangThai !== 2;

  const checkCapNhatTLDTXacMinh = CheckTrangThai
    ? !DonThuTarget?.CoCapNhapDoanToXacMinh
      ? !(
          selectedRowsKey.length === 1 &&
          TrangThaiIDMoi === TrangThaiMoi.GiaoXacMinhLan1
        )
      : checkGiaoXacMinhKoCoVaiTroCanBo
    : checkSelectRow || TrangThai !== 0 || CQPhoiHopID > 0;

  const checkDuyetBaoCao =
    LoaiQuyTrinh === LoaiQuyTrinhDonThu.BTDHuyen &&
    RoleID.LanhDao !== user?.RoleID;

  const checkDisableBanHanhQDGQ =
    LoaiQuyTrinh === LoaiQuyTrinhDonThu.BTDHuyen &&
    user.RoleID === RoleID.LanhDao &&
    user.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen &&
    user.ChuTichUBND === 0;
  const checkThanhLapDoanToXacMinhPhongThuocHuyen =
    checkPhongThuocHuyen &&
    user.RoleID === RoleID.LanhDao &&
    (DonThuTarget?.LoaiQuyTrinh === LoaiQuyTrinhDonThu.BTDHuyen ||
      DonThuTarget?.LoaiQuyTrinh ===
        LoaiQuyTrinhDonThu.QuyTrinhNoiBoPhongThuocHuyen) &&
    !user?.BanTiepDan;

  const checkGiaoXacMinhPhongThuocHuyen =
    checkPhongThuocHuyen &&
    user.RoleID === RoleID.LanhDao &&
    DonThuTarget?.LoaiQuyTrinh ===
      LoaiQuyTrinhDonThu.QuyTrinhNoiBoPhongThuocHuyen &&
    !user?.BanTiepDan;

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Giải quyết đơn</PageHeader>
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
          {(RoleIdUser === RoleID.ChuyenVien ||
            !SuDungQuyTrinhGQPhucTap ||
            (RoleIdUser === RoleID.LanhDaoPhong && checkPhongThuocHuyen)) &&
          role.edit ? (
            <Button
              type="primary"
              className="btn-center"
              onClick={() => showModalXacMinhNoiDungDon()}
              disabled={checkXacMinh}
            >
              <img
                src={
                  checkXacMinh
                    ? // !(selectedRowsKey.length === 1) ||
                      // (TrangThai !== 1 && TrangThai !== 2)
                      icons.Approval
                    : icons.ApprovalWhite
                }
                className="btn-icon__img"
              />
              Xác minh
            </Button>
          ) : null}
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
          {(TrangThaiGiaoXacMinh === 2 && role.edit) ||
          checkThanhLapDoanToXacMinhPhongThuocHuyen ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalGiaoXacMinh(1)}
              disabled={
                checkCapNhatTLDTXacMinh
                // !(selectedRowsKey.length === 1) ||
                // TrangThai !== 0 ||
                // CQPhoiHopID > 0
                // ||
                // !TrangThaiDuyet
              }
            >
              <img
                src={
                  checkCapNhatTLDTXacMinh
                    ? // !(selectedRowsKey.length === 1) ||
                      // TrangThai !== 0 ||
                      // CQPhoiHopID > 0
                      // ||
                      // !TrangThaiDuyet
                      icons.Process
                    : icons.ProcessWhite
                }
                className="btn-icon__img"
              />
              Cập nhật QĐTL tổ/đoàn xác minh
              {/* {!SuDungQuyTrinhGQPhucTap ||
              checkThanhLapDoanToXacMinhPhongThuocHuyen
                ? 'Cập nhật QĐTL tổ/đoàn xác minh'
                : 'Giao xác minh'} */}
            </Button>
          ) : null}
          {!(checkPhongThuocHuyen && !user.BanTiepDan) ? (
            (TrangThaiGiaoXacMinh === 1 && role.edit) ||
            checkGiaoXacMinhPhongThuocHuyen ? (
              <Button
                className="btn-center"
                type="primary"
                onClick={() => showModalGiaoXacMinh(2)}
                disabled={
                  checkGiaoXacMinh
                  // ||
                  // !TrangThaiDuyet
                }
              >
                <img
                  src={
                    checkGiaoXacMinh
                      ? // !(selectedRowsKey.length === 1) ||
                        // TrangThai !== 0 ||
                        // CQPhoiHopID > 0
                        // ||
                        // !TrangThaiDuyet
                        icons.Process
                      : icons.ProcessWhite
                  }
                  className="btn-icon__img"
                />
                Giao xác minh
              </Button>
            ) : null
          ) : null}
          {role.edit && RoleIdUser !== RoleID.ChuyenVien ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalGiaHanXacMinh(2)}
              disabled={checkGiaHanXacMinh}
            >
              <img
                src={
                  checkGiaHanXacMinh
                    ? // !(selectedRowsKey.length === 1) || TrangThai !== 2
                      icons.Process
                    : icons.ProcessWhite
                }
                className="btn-icon__img"
              />
              Gia hạn xác minh
            </Button>
          ) : null}
          {(RoleIdUser !== RoleID.ChuyenVien || !SuDungQuyTrinhGQPhucTap) &&
          role.edit ? (
            <Button
              type="primary"
              className="btn-center"
              onClick={showModalApproveReportConfirm}
              disabled={checkDuyetBaoCaoXacMinh || checkDuyetBaoCao}
            >
              <img
                src={
                  checkDuyetBaoCaoXacMinh || checkDuyetBaoCao
                    ? // !(selectedRowsKey.length === 1) || TrangThai !== 4
                      icons.Approval
                    : icons.ApprovalWhite
                }
                className="btn-icon__img"
              />
              Duyệt báo cáo xác minh
            </Button>
          ) : null}
          {RoleIdUser === RoleID.ChuyenVien &&
          SuDungQuyTrinhGQPhucTap &&
          role.edit ? (
            <Button
              type="primary"
              className="btn-center"
              onClick={() => showModalTrinhBaoCaoXacMinh()}
              disabled={checkTrinhBaoCaoXacMinh}
            >
              <img
                src={
                  checkTrinhBaoCaoXacMinh
                    ? // !(selectedRowsKey.length === 1) || TrangThai !== 2
                      icons.Send
                    : icons.SendWhite
                }
                className="btn-icon__img"
              />
              {!SuDungQuyTrinhGQPhucTap
                ? 'Cập nhật báo cáo xác minh'
                : 'Trình báo cáo xác minh'}
            </Button>
          ) : null}
          {RoleIdUser === RoleID.LanhDao && CapID !== 3 && role.edit ? (
            <Button
              type="primary"
              onClick={showModalAdd}
              className="btn-center"
              disabled={checkBanHanhQDGQ || checkDisableBanHanhQDGQ}
            >
              <img
                src={
                  checkBanHanhQDGQ || checkDisableBanHanhQDGQ
                    ? // !(selectedRowsKey.length === 1) || TrangThai !== 6
                      icons.Process
                    : icons.ProcessWhite
                }
                className="btn-icon__img"
              />
              Ban hành QĐ giải quyết
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
        dataSource={DanhSachGiaoXacMinh}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        DanhSachCoQuan={DanhSachCoQuan}
        ItemLoaiKhieuTo={ItemLoaiKhieuTo}
      />
      <ModalGiaHanXacMinh
        onCancel={closeModalGiaHanXacMinh}
        dataEdit={dataModalGiaHanXacMinh}
        visible={visibleModalGiaHanXacMinh}
        onCreate={submitModalGiaHanXacMinh}
        key={keyModalGiaHanXacMinh}
        loading={loadingModalGiaHanXacMinh}
      />
      <ModalKetQuaXacMinh
        onCancel={closeModalKetQuaXacMinh}
        dataEdit={dataModalKetQuaXacMinh}
        visible={visibleModalKetQuaXacMinh}
        key={keyModalKetQuaXacMinh}
      />
      <ModalXacMinhNoiDungDon
        onCancel={closeModalXacMinhNoiDungDon}
        dataEdit={dataModalXacMinhNoiDungDon}
        visible={visibleModalXacMinhNoiDungDon}
        key={keyModalXacMinhNoiDungDon}
        onEdit={handleEditQuyTrinhXacMinh}
        DanhSachCanBo={DanhSachCanBoGQ}
        XuLyDonID={selectedRowsKey[0]}
        handleRutDon={handleRutDon}
        handleCompleteReport={handleCompleteReport}
      />
      <ModalDuyetBaoCaoXacMinh
        onCancel={closeModalDuyetBaoCaoXacMinh}
        dataEdit={dataModalDuyetBaoCaoXacMinh}
        visible={visibleModalDuyetBaoCaoXacMinh}
        key={keyModalDuyetBaoCaoXacMinh}
        onCreate={submitModalDuyetBaoCaoXacMinh}
        loading={loadingModalDuyetXacMinh}
      />
      <ModalGiaoXacMinh
        DanhSachTruongPhong={
          LoaiQuyTrinh === LoaiQuyTrinhDonThu.PhongThuocSo
            ? DanhSachCanBoXacMinh
            : DanhSachTruongPhong
        }
        DanhSachCanBoGQ={DanhSachCanBoGQ}
        onCancel={closeModalGiaoXacMinh}
        dataEdit={dataModalGiaoXacMinh}
        visible={visibleModalGiaoXacMinh}
        key={keyModalGiaoXacMinh}
        onCreate={submitModalGiaoXacMinh}
        SuDungQuyTrinhGQPhucTap={SuDungQuyTrinhGQPhucTap}
        DanhSachCoQuan={DanhSachCoQuan}
        loading={loadingModalGiaoXacMinh}
        isTLDTGiaoXacMinh={checkCapNhatTLDTXacMinh}
      />
      <ModalChiTietKetQuaXuLyDon
        dataEdit={dataModalKetQuaXuLyDon}
        visible={visibleModalKetQuaXuLyDon}
        key={keyModalKetQuaXuLyDon}
        onCancel={closeModalChiTietXuLyDon}
      />
      <ModalTrinhBaoCaoXacMinh
        visible={visibleModalTrinhBaoCaoXacMinh}
        dataEdit={dataModalTrinhBaoCaoXacMinh}
        onCreate={submitModalTrinhBaoCaoXacMinh}
        onCancel={closeModalTrinhBaoCaoXacMinh}
        SuDungQuyTrinhGQPhucTap={SuDungQuyTrinhGQPhucTap}
        key={keyModalTrinhBaoCaoXacMinh}
        loading={loadingModalTrinhXacMinh}
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
    ...state.GiaoXacMinh,
  };
}

export default connect(mapStateToProps, actions)(GiaoXacMinh);
