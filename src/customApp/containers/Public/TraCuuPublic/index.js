import React, {useEffect, useState} from 'react';
import actions from '../../../redux/Public/TraCuu/actions';
import {
  Button,
  Input,
  DatePicker,
  Option,
  Select,
} from '../../../../components/uielements/exportComponent';
import {
  Form,
  Row,
  Col,
  Tabs,
  Pagination,
  Affix,
  Radio,
  message,
  Tooltip,
} from 'antd';
import Wrapper from './styled';
import {
  changeUrlFilter,
  checkInputNumber,
  formatDate,
  getDefaultPageSize,
  getFilterData,
} from '../../../../helpers/utility';
import {useDispatch, useSelector} from 'react-redux';
import TraCuuImage from '../../../../image/tracuu.jpg';
import Logo from '../../../../image/thanhtra.png';
import {Layout} from 'antd';
import {useHistory} from 'react-router';
import {
  SearchOutlined,
  ZoomOutOutlined,
  ZoomInOutlined,
  UserOutlined,
  HomeOutlined,
  ReloadOutlined,
  FileSearchOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import BoxTable from '../../../../components/utility/boxTable';
import {handleCancelledApiTraCuuPublic} from '../../../redux/Public/TraCuu/saga';
import ModalDetailsProgress from './modalDetailsProgress';
import api from './config';
import {useKey} from '../../../CustomHook/useKey';
import ModalChiTietDonThu from '../../NghiepVu/Shared/Modal/ModalChiTietDonThu';
import {siteConfig} from '../../../../settings';
import {
  COL_ITEM_LAYOUT_HALF,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT_FULL,
  ITEM_LAYOUT3,
} from '../../../../settings/constants';
import queryString from 'query-string';
import dayjs from 'dayjs';
const {Item, useForm} = Form;
const COL_LEFT = {
  lg: {span: 24},
  md: {span: 24},
  sm: {span: 24},
  xs: {span: 24},
};

const COL_RIGHT = {
  lg: {span: 24},
  md: {span: 24},
  sm: {span: 24},
  xs: {span: 24},
};

const COL_LEFT_V2 = {
  lg: {span: 24},
  md: {span: 24},
  sm: {span: 24},
  xs: {span: 24},
};

const COL_RIGHT_V2 = {
  lg: {span: 10},
  md: {span: 24},
  sm: {span: 24},
  xs: {span: 24},
};

const ITEM_FORM = {
  labelAlign: 'left',
  labelCol: {md: 6, sm: 6},
  wrapperCol: {md: 18, sm: 18},
};

const ITEM_FORM_LEFT = {
  labelAlign: 'left',
  labelCol: {md: 10, sm: 10},
  wrapperCol: {md: 14, sm: 14},
};

const ITEM_FORM_RIGHT = {
  labelAlign: 'left',
  labelCol: {md: 9, sm: 9},
  wrapperCol: {md: 15, sm: 15},
};

const {Footer} = Layout;

export default (props) => {
  document.title = 'Tra cứu khiếu tại tố cáo';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  // const [filterData,set]
  const [form] = useForm();
  const [formNangCao] = useForm();
  const [tabsKey, setTabsKey] = useState('1');
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    DanhSachTraCuuPubLic,
    DanhSachCoQuan,
    TotalRow,
    TableLoading,
    TotalRowLichTiepDan,
    DanhSachLichTiepDan,
    DanhSachTrinhTuThuTuc,
    TotalRowTrinhTuThuTuc,
  } = useSelector((state) => state?.TraCuu);
  // const [DanhSachTrinhTuThuTuc, setDanhSachTrinhTuThuTuc] = useState([]);
  const [ChiTietTrinhTuThuTuc, setChiTietTrinhTuThuTuc] = useState({});
  const [isViewDetailsTrinhTu, setIsViewDetailsTrinhTu] = useState(false);
  const [isViewDetailsTiepDan, setIsViewDetailsTiepDan] = useState(false);
  // const [DanhSachLichTiepDan, setDanhSachLichTiepDan] = useState([]);
  const [ChiTietLichTiepDan, setChiTietLichTiepDan] = useState({});
  const [DanhSachTraCuu, setDanhSachTraCuu] = useState([]);
  const [type, setType] = useState(1);

  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [dataModalDetails, setDataModalDetails] = useState([]);
  const [visibleModalDetails, setVisibleModalDetails] = useState(false);
  const [keyModalDetails, setKeyModalDetails] = useState([]);

  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setdataModalChiTietDonThu] = useState(0);

  useEffect(() => {
    dispatch(actions.clear());
  }, []);

  useEffect(() => {
    setDanhSachTraCuu(DanhSachTraCuuPubLic);
  }, [DanhSachTraCuuPubLic]);

  if (filterData.code && filterData.session_state) {
    history.push(
      `/signin?code=${filterData.code}&session_state=${filterData.session_state}`,
    );
  }

  const handleShowChiTietDonThu = (record) => {
    const DonThuID = record.DonThuID;
    const XuLyDonID = record.XuLyDonID;
    api
      .ChiTietDonThu2({
        XuLyDonID,
        DonThuID,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalChiTietDonThu(res.data.Data);
          setVisibleModalChiTietDonThu(true);
          setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
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

  const handleDowloadTaiLieu = (record) => {
    const {DanhSachHoSoTaiLieu} = record;
    if (DanhSachHoSoTaiLieu) {
      DanhSachHoSoTaiLieu.forEach((item) => {
        const {FileDinhKem} = item;
        if (FileDinhKem) {
          FileDinhKem.forEach((file) => {
            const a = document.createElement('a');
            a.href = file.FileUrl;
            a.target = '_blank';
            a.click();
          });
        }
      });
    }
  };

  useEffect(() => {
    if (Number(filterData.tabsKey) === 2) {
      formNangCao.setFieldsValue({
        ...filterData,
        NgayNopDon: filterData.NgayNopDon ? dayjs(filterData.NgayNopDon) : null,
      });
    } else {
      form.setFieldsValue({
        ...filterData,
        TuNgay: filterData.TuNgay ? dayjs(filterData.TuNgay) : null,
        DenNgay: filterData.DenNgay ? dayjs(filterData.DenNgay) : null,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(actions.getInitData());
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);

  const hideModalDetailsProgress = () => {
    setDataModalDetails({});
    setVisibleModalDetails(false);
    // setKeyModalDetails((prevKey) => prevKey + 1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.code === 'Enter') {
      const FormCheck =
        filterData && filterData.tabsKey === '2' ? formNangCao : form;
      TraCuu(FormCheck);
    }
  };

  const showModalDetailsProgress = (record) => {
    const XuLyDonID = record.XuLyDonID;
    const DonThuID = record.DonThuID;
    api.ChiTietDonThu2({XuLyDonID, DonThuID}).then((res) => {
      if (res.data.Status > 0) {
        setDataModalDetails(res.data.Data);
        setVisibleModalDetails(true);
        setKeyModalDetails((prevKey) => prevKey + 1);
      }
    });
  };

  const {user} = useSelector((state) => state.Auth);

  // const onTableChange = (pagination, filters, sorter) => {
  //   //get filter data
  //   let oldFilterData = {...filterData};
  //   let onOrder = {pagination, filters, sorter};
  //   let newFilterData = getFilterData(oldFilterData, null, onOrder);
  //   //get filter data
  //   setFilterData(newFilterData);
  //   dispatch(actions.getListPubLic(newFilterData, type));
  // };

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    dispatch(actions.getListPubLic(newFilterData, type));
  };

  const toThongTinSo = () => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = 'http://bariavungtau.edu.vn/Default.aspx';
    link.click();
  };

  const toSignin = () => {
    history.push('/signin');
  };

  const TraCuu = async (form) => {
    const value = await form.validateFields();
    setFilterData({...filterData, ...value, PageSize: 20, PageNumber: 1});
    dispatch(
      actions.getListPubLic({
        type,
        ...filterData,
        ...value,

        PageNumber: 1,
        TuNgay: formatDate(value.TuNgay),
        DenNgay: formatDate(value.DenNgay),
        NgayNopDon: formatDate(value.NgayNopDon),
      }),
    );
    // dispatch(actions.getListPubLic({...filterData,...value}));
  };

  const columns = [
    {
      title: 'Số đơn thư',
      dataIndex: 'SoDonThu',
      width: '10%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>{text}</p>
      ),
    },
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayTiepNhan',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>
          {record.NgayTiepNhan}
        </p>
      ),
    },
    {
      title: 'Nội dung vụ việc',
      dataIndex: 'NoiDungDon',
      width: '40%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>{text}</p>
      ),
    },
    {
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'TenCoQuanTiepNhan',
      width: '15%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>{text}</p>
      ),
    },
    {
      title: 'Cơ quan xác minh',
      dataIndex: 'TenCoQuanXacMinh',
      width: '15%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>{text}</p>
      ),
    },
    {
      title: 'Trạng thái xử lý',
      dataIndex: 'TrangThaiDonThu',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <p onClick={(e) => showModalDetailsProgress(record)}>{text}</p>
      ),
    },
  ];

  const handleRenderTenDoiTuongKN = (record) => {
    let str = 'Quyết định giải quyết khiếu nại của';
    record?.lsDoiTuongKN?.forEach((item, index) => {
      const strinGioiTinh =
        item.GioiTinh === 1 ? 'ông' : item.GioiTinh === 2 ? 'bà' : '';
      if (index > 0) {
        str += `và ${strinGioiTinh} ${item.HoTen}`;
      } else {
        str += `${strinGioiTinh} ${item.HoTen}`;
      }
    });

    return str;
  };

  const columns2 = [
    {
      dataIndex: 'NoiDungDon',
      width: '40%',
      render: (text, record) => (
        <Tooltip title={'Nhấn để xem chi tiết'}>
          <p onClick={(e) => showModalDetails(record)}>
            {record?.lsDoiTuongKN ? handleRenderTenDoiTuongKN(record) : null}
          </p>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'NgayTiepNhan',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <Tooltip title={'Nhấn để xem chi tiết'}>
          <p onClick={(e) => showModalDetails(record)}>{record.NgayTiepNhan}</p>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'NoiDungDon',
      width: '40%',
      render: (text, record) => (
        <Tooltip title={'Nhấn để xem chi tiết'}>
          <p onClick={(e) => showModalDetails(record)}>{text}</p>
        </Tooltip>
      ),
    },
    {
      dataIndex: 'TenCoQuanTiepNhan',
      width: '15%',
      render: (text, record) => (
        <Tooltip title={'Nhấn để xem chi tiết'}>
          <p onClick={(e) => showModalDetails(record)}>{text}</p>
        </Tooltip>
      ),
    },
    {
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            gap: 10,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <InfoCircleOutlined
            className="info"
            id=""
            onClick={() => handleShowChiTietDonThu(record)}
            style={{fontSize: '20px'}}
            isClickRow={false}
          />
          {record?.DanhSachHoSoTaiLieu ? (
            <DownloadOutlined
              onClick={() => handleDowloadTaiLieu(record)}
              style={{fontSize: '20px'}}
              isClickRow={false}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const closeModalChiTietDonThu = () => {
    setVisibleModalChiTietDonThu(false);
    setdataModalChiTietDonThu({});
  };

  const onFilter = (value, property, isNotChanged = true) => {
    //get filter data
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData({...newFilterData});
    // dispatch(actions.getListPubLic(filterData));
    //get filter data
    // changeUrlFilter(this.state.filterData); //change url
    // this.props.getList(this.state.filterData); //get list
  };

  const handleRemoveAllValueFilter = async (key) => {
    const newFilterData = {...filterData};
    if (filterData.tabsKey && Number(filterData.tabsKey) === 2) {
      const value = await formNangCao.validateFields();
      for (const key in value) {
        onFilter(null, key, true);
        delete newFilterData[key];
      }
      formNangCao.resetFields();
    } else {
      const value = await form.validateFields();
      for (const key in value) {
        onFilter(null, key, true);
        delete newFilterData[key];
      }
      form.resetFields();
    }
    setFilterData({...newFilterData, tabsKey: key, PageNumber: 1});
  };

  const handleReloadForm = (form) => {
    form.resetFields();
    const valueAfterReset = form.getFieldsValue();
    setFilterData((filterData) => ({...filterData, ...valueAfterReset}));
    dispatch(actions.clear({}));
  };

  const getDanhSachTrinhTuThuTuc = () => {
    api
      .GetThuTucHanhChinh()
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachTrinhTuThuTuc(res.data.Data);
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

  const dowloadFile = (DanhSachFileDinhKem) => {
    if (DanhSachFileDinhKem) {
      DanhSachFileDinhKem.forEach((item) => {
        const a = document.createElement('a');
        a.href = item.FileUrl;
        a.target = '_blank';
        a.click();
      });
    }
  };

  const getDanhSachLichTiepDan = () => {
    api
      .GetDanhSachLichTiepDan()
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachLichTiepDan(res.data.Data);
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

  const showModalDetails = (record) => {
    const XuLyDonID = record.XuLyDonID;
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

  const handleGetChiTietTrinhTuThuTuc = (TrinhTuThuTucID) => {
    api
      .GetChiTietTrinhTuThuTuc({TrinhTuThuTucID})
      .then((res) => {
        if (res.data.Status > 0) {
          setChiTietTrinhTuThuTuc(res.data.Data);
          setIsViewDetailsTrinhTu(true);
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

  const hideModalAddEdit = () => {
    // setAction("");
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const handleGetChiTietDanhSachTiepDan = (IDLichTiep) => {
    api
      .GetChiTietLichTiepDan({IDLichTiep})
      .then((res) => {
        if (res.data.Status > 0) {
          setChiTietLichTiepDan(res.data.Data);
          setIsViewDetailsTiepDan(true);
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

  const PageNumber = filterData?.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData?.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const PageNumberLichTiepDan = filterData?.PageNumberLichTiepDan
    ? parseInt(filterData.PageNumberLichTiepDan)
    : 1;
  const PageSizeLichTiepDan = filterData?.PageSizeLichTiepDan
    ? parseInt(filterData.PageSizeLichTiepDan)
    : getDefaultPageSize();

  const PageNumberTrinhTuThuTuc = filterData?.PageNumberTrinhTuThuTuc
    ? parseInt(filterData.PageNumberTrinhTuThuTuc)
    : 1;
  const PageSizeTrinhTuThuTuc = filterData?.PageSizeTrinhTuThuTuc
    ? parseInt(filterData.PageSizeTrinhTuThuTuc)
    : getDefaultPageSize();

  return (
    <Wrapper>
      <Row
        justify={'center'}
        style={{height: '100%'}}
        className={'row-content'}
      >
        <Col
          style={{height: '100%', display: 'flex', flexDirection: 'column'}}
          xs={24}
          md={24}
          lg={20}
          xl={17}
        >
          <Row>
            <Col style={{height: '100%'}} xs={24}>
              <div className={'header'}>
                <div className="header-top">
                  <div className="header-logo">
                    <img src={Logo} alt="logo" />
                  </div>
                  <div className="header-wrapper">
                    <div className={'header-title'}>
                      <div className="wrapper-top__title">
                        <p>
                          PHẦN MỀM QUẢN LÝ CÔNG TÁC TIẾP DÂN, XỬ LÝ ĐƠN
                          <br /> VÀ GIẢI QUYẾT KHIẾU NẠI, TỐ CÁO
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="header-background"></div>
                <div className="tabs-right">
                  <Button
                    onClick={() => {
                      setType(1);
                      handleRemoveAllValueFilter(
                        filterData.tabsKey ? filterData.tabsKey : '1',
                      );
                      setIsViewDetailsTiepDan(false);
                      setIsViewDetailsTrinhTu(false);
                    }}
                    className={type === 1 ? 'active-btn' : ''}
                    type={type === 1 ? 'primary' : ''}
                  >
                    {/* <HomeOutlined /> */}
                    Tra cứu
                  </Button>
                  <Button onClick={() => history.push('/loginsso')}>
                    Đăng nhập SSO
                  </Button>
                  <Button
                    onClick={() => {
                      setType(2);
                      handleRemoveAllValueFilter(
                        filterData.tabsKey ? filterData.tabsKey : '1',
                      );
                      setIsViewDetailsTiepDan(false);
                      setIsViewDetailsTrinhTu(false);
                      dispatch(actions.getDanhSachTrinhTuThuTuc());
                      dispatch(actions.clear({}));
                    }}
                    className={type === 2 ? 'active-btn' : ''}
                    type={type === 2 ? 'primary' : ''}
                  >
                    {/* <HomeOutlined /> */}
                    Xem trình tự thủ tục
                  </Button>
                  <Button
                    onClick={() => {
                      setType(3);
                      handleRemoveAllValueFilter(
                        filterData.tabsKey ? filterData.tabsKey : '1',
                      );
                      setIsViewDetailsTiepDan(false);
                      setIsViewDetailsTrinhTu(false);
                      dispatch(actions.getDanhSachLichTiepDan());
                      dispatch(actions.clear({}));
                    }}
                    className={type === 3 ? 'active-btn' : ''}
                    type={type === 3 ? 'primary' : ''}
                  >
                    {/* <HomeOutlined /> */}
                    Xem lịch tiếp dân
                  </Button>
                  <div className="wrap">
                    <Button onClick={() => history.push('/signin')}>
                      <UserOutlined />
                      <span className="login_btn">Đăng nhập</span>
                    </Button>
                    <div className="wrapp-img">
                      <a
                        href="https://tinnhiemmang.vn/danh-ba-tinnhiem/kntcvinhphucgovvn-1700545022hsltvinhlonggovvn-1699588324"
                        title="Chung nhan Tin Nhiem Mang"
                        target="_blank"
                      >
                        <img
                          src="https://tinnhiemmang.vn/handle_cert?id=kntc.vinhphuc.gov.vn"
                          alt="Chung nhan Tin Nhiem Mang"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {type === 1 ? (
            <>
              <Tabs
                className="tabs-section"
                type="card"
                activeKey={filterData?.tabsKey ? filterData.tabsKey : '1'}
                onChange={(key) => {
                  handleRemoveAllValueFilter(key);
                  key === '2'
                    ? handleReloadForm(formNangCao)
                    : handleReloadForm(form);
                  onFilter(key, 'tabsKey');
                  handleCancelledApiTraCuuPublic();
                  setDanhSachTraCuu([]);
                  setFilterData({
                    ...filterData,
                    PageNumber: 1,
                    PageSize: 10,
                  });
                }}
                // tabBarExtraContent={{
                //   right: (
                //     <div className="tabs-right">
                //       <Button
                //         onClick={() => {
                //           setType(1);
                //           handleRemoveAllValueFilter(
                //             filterData.tabsKey ? filterData.tabsKey : '1',
                //           );
                //         }}
                //         className={type === 1 ? 'active-btn' : ''}
                //         type={type === 1 ? 'primary' : ''}
                //       >
                //         <HomeOutlined />
                //         Tra cứu
                //       </Button>
                //       <Button
                //         onClick={() => {
                //           setType(2);
                //           handleRemoveAllValueFilter(
                //             filterData.tabsKey ? filterData.tabsKey : '1',
                //           );
                //         }}
                //         className={type === 2 ? 'active-btn' : ''}
                //         type={type === 2 ? 'primary' : ''}
                //       >
                //         <HomeOutlined />
                //         Xem trình tự thủ tục
                //       </Button>
                //       <Button onClick={toThongTinSo}>
                //         <HomeOutlined />
                //         Xem lịch tiếp dân
                //       </Button>
                //       <Button onClick={() => history.push('/signin')}>
                //         <UserOutlined />
                //         <span>Đăng nhập</span>
                //       </Button>
                //     </div>
                //   ),
                // }}
              >
                <Tabs.TabPane
                  tab={
                    <span>
                      <ZoomOutOutlined />
                      Tra cứu quyết định giải quyết
                    </span>
                  }
                  key={'1'}
                >
                  <div className={'box-filter'}>
                    <Form form={form} {...ITEM_FORM}>
                      <Row gutter={[10, 10]}>
                        <Col xxl={3} xl={0} lg={0} xs={0}></Col>
                        <Col xxl={14} xl={18} lg={24} xs={24}>
                          <Row>
                            <>
                              <Col {...COL_LEFT}>
                                <Item name={'SoDonThu'} label={'Số đơn thư'}>
                                  <Input onKeyUp={handleKeyDown} />
                                </Item>
                              </Col>
                              <Col {...COL_RIGHT}>
                                <Item name={'ChuDon'} label={'Chủ đơn'}>
                                  <Input onKeyUp={handleKeyDown} />
                                </Item>
                              </Col>
                              <Col {...COL_LEFT}>
                                <Item name={'CCCD'} label={'CCCD/CMTND'}>
                                  <Input onKeyUp={handleKeyDown} />
                                </Item>
                              </Col>
                              <Col {...COL_RIGHT}>
                                <Item
                                  name={'CoQuanID'}
                                  label={'Cơ quan ra quyết định'}
                                >
                                  <Select onKeyUp={handleKeyDown}>
                                    {DanhSachCoQuan
                                      ? DanhSachCoQuan.map((item) => (
                                          <Option value={item.CoQuanID}>
                                            {item.TenCoQuan}
                                          </Option>
                                        ))
                                      : null}
                                  </Select>
                                </Item>
                              </Col>
                              <Row style={{width: '100%'}} gutter={[0, 10]}>
                                <Col span={14}>
                                  <Item
                                    className="datepicker-day__left"
                                    name={'TuNgay'}
                                    label={'Từ ngày'}
                                    {...ITEM_FORM_LEFT}
                                  >
                                    <DatePicker
                                      style={{width: '100%'}}
                                      onKeyUp={handleKeyDown}
                                      format={'DD/MM/YYYY'}
                                      placeholder=""
                                    />
                                  </Item>
                                </Col>
                                <Col span={10}>
                                  <Item
                                    name={'DenNgay'}
                                    label={'Đến ngày'}
                                    {...ITEM_FORM_RIGHT}
                                    className="datepicker-day__right"
                                  >
                                    <DatePicker
                                      style={{width: '100%'}}
                                      onKeyUp={handleKeyDown}
                                      format={'DD/MM/YYYY'}
                                      placeholder="      "
                                    />
                                  </Item>
                                </Col>
                              </Row>
                            </>
                          </Row>
                          <div className={'filter-action'}>
                            <Button
                              className="btn-action"
                              icon={<SearchOutlined />}
                              disabled={TableLoading}
                              onClick={() => TraCuu(form)}
                            >
                              Tra cứu
                            </Button>
                            <Button
                              className="btn-action"
                              disabled={TableLoading}
                              icon={<ReloadOutlined />}
                              onClick={() => handleReloadForm(form)}
                            >
                              Nhập lại
                            </Button>
                          </div>
                        </Col>
                        <Col xxl={7} xl={6} lg={0} xs={0}>
                          <div className="wrapper-img__tracuu">
                            <img className="img-tracuu" src={TraCuuImage} />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <span>
                      <ZoomInOutlined />
                      Tra cứu trạng thái xử lý hồ sơ
                    </span>
                  }
                  key="2"
                >
                  <div className={'box-filter'}>
                    <Form form={formNangCao} {...ITEM_FORM}>
                      <Row>
                        <Col xxl={5} xl={3} lg={3} md={1} sm={0}></Col>
                        <Col xxl={12} xl={12} lg={12} md={13} sm={24} xs={24}>
                          <Row>
                            <Col {...COL_LEFT}>
                              <Item name={'SoDonThu'} label={'Số đơn thư'}>
                                <Input onKeyUp={handleKeyDown} />
                              </Item>
                            </Col>
                            <Col {...COL_RIGHT}>
                              <Item name={'ChuDon'} label={'Chủ đơn'}>
                                <Input onKeyUp={handleKeyDown} />
                              </Item>
                            </Col>
                            <Col {...COL_LEFT}>
                              <Item name={'CCCD'} label={'CCCD/CMTND'}>
                                <Input onKeyUp={handleKeyDown} />
                              </Item>
                            </Col>
                            <Col {...COL_RIGHT}>
                              <Item name={'NgayNopDon'} label={'Ngày nộp đơn'}>
                                <DatePicker
                                  style={{width: '100%'}}
                                  onKeyUp={handleKeyDown}
                                  placeholder=""
                                  format={'DD/MM/YYYY'}
                                />
                              </Item>
                            </Col>
                          </Row>
                          <div className={'filter-action'}>
                            <Button
                              className="btn-action"
                              icon={<SearchOutlined />}
                              disabled={TableLoading}
                              onClick={() => TraCuu(formNangCao)}
                            >
                              Tra cứu
                            </Button>
                            <Button
                              className="btn-action"
                              disabled={TableLoading}
                              icon={<ReloadOutlined />}
                              onClick={() => handleReloadForm(formNangCao)}
                            >
                              Nhập lại
                            </Button>
                          </div>
                        </Col>
                        <Col xxl={7} xl={9} lg={9} md={10} sm={0} xs={0}>
                          <div className="wrapper-img__tracuu">
                            <img className="img-tracuu" rc={TraCuuImage} />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tabs.TabPane>
              </Tabs>

              <div className={'box-result'}>
                <div className="wrapper-table__title">
                  <div className={'title'}>
                    {Number(filterData.tabsKey) === 2
                      ? 'Kết quả'
                      : 'Danh sách quyết định giải quyết được công bố'}
                  </div>
                </div>
                <BoxTable
                  className={
                    Number(filterData.tabsKey) === 2
                      ? ''
                      : 'table-empty__header'
                  }
                  noneBorder={true}
                  columns={
                    Number(filterData.tabsKey) === 2 ? columns : columns2
                  }
                  dataSource={DanhSachTraCuu}
                  loading={TableLoading}
                  onRow={(record, rowIndex) => {
                    return {
                      // onClick: (event, e) => {
                      //   const tagName = event.target.tagName === 'svg';
                      //   const checkElementNotOnRow = event.target
                      //     ?.querySelector('.anticon')
                      //     ?.querySelector('svg');
                      //   if (!tagName && !checkElementNotOnRow) {
                      //     if (Number(filterData.tabsKey) === 2) {
                      //       showModalDetailsProgress(record);
                      //     } else {
                      //       showModalDetails(record);
                      //     }
                      //   } else {
                      //   }
                      // },
                    };
                  }}
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
                {/* <div className="pagination-top"></div> */}
              </div>
            </>
          ) : null}
          {type === 2 ? (
            <>
              <p className="title">Trình tự thủ tục</p>
              <div className="line-break" />
              {!isViewDetailsTrinhTu ? (
                <>
                  <div className="progress">
                    <div className="progress-wrapper">
                      {DanhSachTrinhTuThuTuc
                        ? DanhSachTrinhTuThuTuc.map((item) => (
                            <div
                              className="progress-item"
                              onClick={() =>
                                handleGetChiTietTrinhTuThuTuc(
                                  item.TrinhTuThuTucID,
                                )
                              }
                            >
                              <p className="progress-title">{item.TieuDe}</p>
                              <span className="progress-day">
                                Ngày tạo:{' '}
                                {item.NgayTao
                                  ? moment(item.NgayTao).format('DD/MM/YYYY')
                                  : null}
                              </span>
                            </div>
                          ))
                        : null}
                      <Pagination
                        className="pagination-bottom"
                        showSizeChanger={true}
                        showTotal={(total, range) =>
                          `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`
                        }
                        total={TotalRowTrinhTuThuTuc}
                        current={PageNumberTrinhTuThuTuc}
                        pageSize={PageSizeTrinhTuThuTuc}
                        onChange={(PageNumber, PageSize) => {
                          setFilterData({
                            ...filterData,
                            PageNumberTrinhTuThuTuc: PageNumber,
                            PageSizeTrinhTuThuTuc: PageSize,
                          });
                          dispatch(
                            actions.getListPubLic({
                              ...filterData,
                              type,
                              PageNumber,
                              PageSize,
                            }),
                          );
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="detail-wrapper">
                  <p className="detail-title">{ChiTietTrinhTuThuTuc?.TieuDe}</p>
                  <div className="details-top">
                    <span>
                      Ngày tạo:{' '}
                      {ChiTietTrinhTuThuTuc.NgayTao
                        ? moment(ChiTietTrinhTuThuTuc.NgayTao).format(
                            'DD/MM/YYYY',
                          )
                        : null}
                    </span>
                    <span>
                      Tải file quy trình thủ tục{' '}
                      <DownloadOutlined
                        style={{fontSize: '22px', color: '#2568EF'}}
                        onClick={() =>
                          dowloadFile(ChiTietTrinhTuThuTuc.DanhSachFileDinhKem)
                        }
                      />
                    </span>
                  </div>
                  <div className="detail-image">
                    <img
                      src={ChiTietTrinhTuThuTuc?.Thumbnail?.FileUrl}
                      alt="Quy trình"
                    />
                  </div>
                  <p className="title">Các thủ tục khác</p>
                  <div className="line-break" />
                  <div className="progress">
                    <div
                      className="progress-wrapper"
                      style={{padding: '18px 30px', marginTop: 0}}
                    >
                      {DanhSachTrinhTuThuTuc.filter(
                        (item) =>
                          item.TrinhTuThuTucID !==
                          ChiTietTrinhTuThuTuc.TrinhTuThuTucID,
                      ).map((item) => (
                        <div
                          className="progress-item"
                          onClick={() =>
                            handleGetChiTietTrinhTuThuTuc(item.TrinhTuThuTucID)
                          }
                        >
                          <p className="progress-title">{item.TieuDe}</p>
                          <span className="progress-day">
                            Ngày tạo:{' '}
                            {item.NgayTao
                              ? moment(item.NgayTao).format('DD/MM/YYYY')
                              : null}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
          {type === 3 ? (
            <>
              <p className="title">Lịch tiếp công dân</p>
              {!isViewDetailsTiepDan ? (
                <div className="progress">
                  <div className="progress-wrapper">
                    {DanhSachLichTiepDan
                      ? DanhSachLichTiepDan.map((item) => (
                          <div
                            className="progress-item"
                            onClick={() =>
                              handleGetChiTietDanhSachTiepDan(item?.IDLichTiep)
                            }
                          >
                            <p className="progress-title">
                              Lịch tiếp dân - {item?.CoQuanTiep} -{' '}
                              {item.NgayTiep
                                ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
                                : null}
                            </p>
                            <div className="line-break" />
                            {/* <span className="progress-day">
                              Ngày tạo:{' '}
                              {item?.CreateDate
                                ? moment(item?.CreateDate).format('DD/MM/YYYY')
                                : null}
                            </span> */}
                          </div>
                        ))
                      : null}
                    <Pagination
                      className="pagination-bottom"
                      showSizeChanger={true}
                      showTotal={(total, range) =>
                        `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`
                      }
                      total={TotalRowLichTiepDan}
                      current={PageNumberLichTiepDan}
                      pageSize={PageSizeLichTiepDan}
                      onChange={(PageNumber, PageSize) => {
                        setFilterData({
                          ...filterData,
                          PageNumberLichTiepDan: PageNumber,
                          PageSizeLichTiepDan: PageSize,
                        });
                        dispatch(
                          actions.getListPubLic({
                            ...filterData,
                            type,
                            PageNumber,
                            PageSize,
                          }),
                        );
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="detail-wrapper">
                    <p className="detail-title">
                      Lịch tiếp dân - {ChiTietLichTiepDan?.CoQuanTiep} -{' '}
                      {ChiTietLichTiepDan.NgayTiep
                        ? dayjs(ChiTietLichTiepDan.NgayTiep).format(
                            'DD/MM/YYYY',
                          )
                        : null}
                    </p>
                    {/* <div className="details-top">
                      <span>
                        Ngày tạo:{' '}
                        {ChiTietLichTiepDan.CreateDate
                          ? moment(ChiTietLichTiepDan.CreateDate).format(
                              'DD/MM/YYYY',
                            )
                          : null}
                      </span>
                    </div> */}
                    <div className="line-break" />
                    <div className="detail-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: ChiTietLichTiepDan.NDTiep,
                        }}
                      ></p>
                    </div>
                    <p className="subtitle">Các thông tin khác</p>
                    {/* <div className="line-break" /> */}
                    <div className="info">
                      {DanhSachLichTiepDan.filter(
                        (item) =>
                          item.IDLichTiep !== ChiTietLichTiepDan.IDLichTiep,
                      ).map((item) => (
                        <div
                          className="info-item"
                          // style={{padding: '10px 0'}}
                          onClick={() =>
                            handleGetChiTietDanhSachTiepDan(item?.IDLichTiep)
                          }
                        >
                          <p className="info-title">
                            Lịch tiếp dân - {item?.CoQuanTiep} -{' '}
                            {item.NgayTiep
                              ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
                              : null}
                          </p>
                          <div className="line-break" />
                          {/* <span className="progress-day">
                            Ngày tạo:{' '}
                            {item.CreateDate
                              ? moment(item.CreateDate).format('DD/MM/YYYY')
                              : null}
                          </span> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : null}
        </Col>
        <Col span={24}>
          <div className="footer">
            <Affix offsetBottom={0}>
              <Footer
                style={{
                  background: '#ffffff',
                  textAlign: 'center',
                  borderTop: '1px solid #ededed',
                  padding: '10px 50px',
                }}
              >
                {siteConfig.footerText}
              </Footer>
            </Affix>
          </div>
        </Col>
      </Row>
      <ModalDetailsProgress
        visible={visibleModalDetails}
        dataEdit={dataModalDetails}
        key={keyModalDetails}
        onCancel={hideModalDetailsProgress}
      />
      {/* <ModalCapNhatQDGiaiQuyet
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCancel={hideModalAddEdit}
        isDetails={true}
      /> */}
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
        isPublic={true}
      />
    </Wrapper>
  );
};
