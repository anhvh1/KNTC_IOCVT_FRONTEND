// import {Chart as ChartJS} from 'chart.js/auto';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip as TooltipChart,
  BarElement,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import {Modal, Table, Tooltip, message, Row, Col, Spin} from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/DashBoard/action';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import PageAction from '../../../components/utility/pageAction';
import Box from '../../../components/utility/box';
import BoxFilter from '../../../components/utility/boxFilter';
import BoxTable from '../../../components/utility/boxTable';
import Checkbox from '../../../components/uielements/checkbox';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Bar} from 'react-chartjs-2';
import {PolarArea} from 'react-chartjs-2';

import {
  Button,
  DatePicker,
  InputSearch,
  Option,
  Select,
} from '../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../helpers/utility';
import {useKey} from '../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ExportOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../components/uielements/checkbox';
import {getTotalMonthsOfYear} from '../../../helpers/utility';
import moment from 'moment';
import Wrapper from './styled';
import {Redirect, useHistory} from 'react-router';
import actionsAuth from '../../../redux/auth/actions';
import ModalFilterData from './ModalFilterData';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import {push} from 'react-router-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import FilterImage from '../../../../src/image/filter-white.png';
import Group from '../../../../src/image/group.png';
import Reception from '../../../../src/image/reception_white.png';
import Process from '../../../../src/image/process_white.png';
import CheckList from '../../../../src/image/to-do-list-wihte.png';
import Skills from '../../../../src/image/skills-white.png';
// import api from './config';
import {getConfigLocal} from '../../../helpers/utility';
import {handleTextLong} from '../../../helpers/utility';
import WarningRed from '../../../../src/image/warning-red.png';
import WarningBlue from '../../../../src/image/warning-blue.png';
import {Link} from 'react-router-dom';
import LineChart from './LineChart';
import dayjs from 'dayjs';
import FilterTime from '../NghiepVu/Shared/Component/BoxFilterTime';
import actionsApp from '../../../redux/app/actions';
import PageWrap from '../../../components/utility/PageWrap';
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Legend,
  TooltipChart,
  ChartDataLabels,
);

const ListCapID = getConfigLocal('ListCapID', []);

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

const {logout} = actionsAuth;
const DashBoard = (props) => {
  document.title = 'Dashboard';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const {
    DuLieuChart,
    loadingChart,
    SoLieuCanhBao,
    DanhSachLoaiKhieuTo,
    loadingCanhBao,
  } = useSelector((state) => state.DashBoard);
  const [DataChart, setDataChart] = useState({});
  const [visibleModalFilter, setVisibleModalFilter] = useState(false);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);
  const [keyModalFilter, setKeyModalFilter] = useState(0);
  const [isFirstActiveCap, setIsFirstActiveCap] = useState(true);
  const [DanhSachCacCap, setDanhSachCap] = useState([]);
  const {DanhSachPhanLoaiVuViec} = props;
  const [TinhDenNgay, setTinhDenNgay] = useState(null);
  const [PhanLoaiVuViec, setPhanLoaiVuViec] = useState(null);
  const [dataUpdate, setDataUpdate] = useState({});
  const history = useHistory();
  const [data, setData] = useState({
    Data: moment().quarter(),
    LoaiThoiGianID: 3,
    Nam: moment().year(),
    Type: 3,
  });

  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const [DanhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [loadingFilterChart, setLoadingFilterChart] = useState(false);

  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);

  if (filterData?.isDangXuat) {
    // localStorage.clear();
    // if (localStorage.length === 0) {
    //   push('/');
    // }
    dispatch(actionsAuth.logout());
  }

  const url = window.location.origin;
  // const isBanTiepDan = userLocal?.BanTiepDan ? userLocal?.BanTiepDan : false;
  // const ChuTichUBND = userLocal?.ChuTichUBND ? userLocal?.ChuTichUBND : 0;
  // const RoleID = userLocal?.RoleID;
  // if (RoleID === 3 && isBanTiepDan) {
  //   history.push(`${url}/tiep-thuong-xuyen`);
  // } else if (RoleID === 1 && isBanTiepDan) {
  //   history.push(`${url}/phe-duyet-ket-qua-xu-ly`);
  // } else if (ChuTichUBND === 1) {
  //   history.push(`${url}/giai-quyet-don`);
  // } else if (RoleID === 1 || (RoleID === 2 && !isBanTiepDan)) {
  //   history.push(`${url}/giao-xac-minh`);
  // }
  // if (MaRedirect || MaRedirect === '') {
  //     history.push(`${url}/${MaRedirect}`);
  //   }

  useEffect(() => {
    setDataChart(DuLieuChart);
  }, [DuLieuChart]);

  const formatDataRequest = (data) => {
    let namBC = data.Nam;
    let thangBC = data.Data.toString();
    let quyBC = data.Data;
    // var quyBC = $("#ddlQuy").val();

    let tuNgay = '01/01/' + namBC;
    let denNgay = '31/12/' + namBC;
    if (data.Type === 1 || data.Type === 2) {
      var dsThang30 = ',04,06,09,11';
      if (thangBC == '00') {
        tuNgay = '01/01/' + namBC;
        denNgay = '31/12/' + namBC;
      } else if (thangBC == '17') {
        tuNgay = '01/01/' + namBC;
        denNgay = '30/06/' + namBC;
      } else if (thangBC == '18') {
        tuNgay = '01/07/' + namBC;
        denNgay = '31/12/' + namBC;
      } else if (thangBC == '19') {
        tuNgay = '01/01/' + namBC;
        denNgay = '30/09/' + namBC;
      } else if (thangBC == '20') {
        tuNgay = '01/01/' + namBC;
        denNgay = '31/12/' + namBC;
      } else if (thangBC == '02') {
        if (namBC % 4 == 0) {
          tuNgay = '01/02/' + namBC;
          denNgay = '29/02/' + namBC;
        } else {
          tuNgay = '01/02/' + namBC;
          denNgay = '28/02/' + namBC;
        }
      } else if (dsThang30.includes(thangBC)) {
        tuNgay = '01/' + thangBC + '/' + namBC;
        denNgay = '30/' + thangBC + '/' + namBC;
      } else {
        tuNgay = '01/' + thangBC + '/' + namBC;
        denNgay = '31/' + thangBC + '/' + namBC;
      }
    }

    if (data.Type === 3) {
      if (quyBC == 1) {
        tuNgay = '01/01/' + namBC;
        denNgay = '31/03/' + namBC;
      } else if (quyBC == 2) {
        tuNgay = '01/04/' + namBC;
        denNgay = '30/06/' + namBC;
      } else if (quyBC == 3) {
        tuNgay = '01/07/' + namBC;
        denNgay = '30/09/' + namBC;
      }
      if (quyBC == 4) {
        tuNgay = '01/10/' + namBC;
        denNgay = '31/12/' + namBC;
      }
    }
    const dataRequest = {
      TuNgay: tuNgay,
      DenNgay: denNgay,
      CapIDSelect: filterData?.CapID,
    };

    return dataRequest;
  };

  useEffect(() => {
    setFilterData({...filterData, Cap: 12});
    // initFilter
    const dataRequest = formatDataRequest(data);
    dispatch(actions.getData(dataRequest));
    dispatch(actions.getSoLieuCanhBao());
    const checkHeightContent = () => {
      const topFilter = document.getElementById('wrapper-top');
    };
    window.addEventListener('resize', checkHeightContent);
    return () => {
      window.removeEventListener('resize', checkHeightContent);
    };
  }, []);

  useEffect(() => {
    const newDanhSachCacCap = [...DanhSachCacCap];
    const DanhSachCacCapDefault = [
      {
        Title: 'Toàn tỉnh',
        ID: 12,
        STT: 1,
      },
      {
        Title: 'UBND Cấp Tỉnh',
        ID: 4,
        STT: 2,
      },
      {
        Title: 'Sở, ngành',
        ID: 1,
        STT: 3,
      },
      {
        Title: 'Cấp huyện',
        ID: 2,
        STT: 4,
      },
      {
        Title: 'Cấp phòng ban',
        ID: 11,
        STT: 5,
      },
      {
        Title: 'Cấp xã',
        ID: 3,
        STT: 6,
      },
    ];

    if (DataChart && DataChart?.ListCapID) {
      DataChart?.ListCapID.forEach((item, index) => {
        const obj = DanhSachCacCapDefault.find(
          (itemCap) => itemCap.ID === item,
        );
        if (obj && !newDanhSachCacCap.find((item) => item.ID === obj.ID)) {
          newDanhSachCacCap.push(obj);
        }
      });
      newDanhSachCacCap.sort(function (a, b) {
        return a.STT - b.STT;
      });
    }
    setDanhSachCap(newDanhSachCacCap);
  }, [DataChart]);

  useEffect(() => {
    if (DataChart && DanhSachCacCap.length > 0 && isFirstActiveCap) {
      setData({
        ...data,
        Cap: DanhSachCacCap[0]?.ID,
      });
      setFilterData({
        ...filterData,
        Cap: DanhSachCacCap[0]?.ID,
      });
      setIsFirstActiveCap(false);
    }
  }, [DanhSachCacCap]);

  const dataFiler = queryString.parse(props.location.search);

  const HrefLink = dataFiler?.HrefLink
    ? dataFiler?.HrefLink
    : JSON.parse(localStorage.getItem('data_config'))?.HrefLink;
  const from =
    HrefLink?.toString() !== 'dashboard'
      ? {pathname: `/dashboard/${HrefLink}`}
      : {pathname: `/dashboard`};

  // if (HrefLink && HrefLink?.toString() !== 'dashboard') {
  //   return <Redirect to={from} />;
  // }

  const ListImage = [
    {
      image: Reception,
      index: 1,
    },
    {
      image: Process,
      index: 2,
    },
    {
      image: CheckList,
      index: 3,
    },
    {
      image: CheckList,
      index: 4,
    },
    {
      image: Skills,
      index: 5,
    },
    {
      image: Reception,
      index: 6,
    },
    {
      image: Group,
      index: 7,
    },
  ];

  const listColor = [
    {
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
    },
    {
      backgroundColor: '#FFCD56',
      borderColor: '#FFCD56',
    },
    {
      backgroundColor: '#4BC0C0',
      borderColor: '#36A2EB',
    },
    {
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
    },
    {
      backgroundColor: '#C9CBCF',
      borderColor: '#C9CBCF',
    },
  ];

  const ListBackgroundPoleChart = [
    {
      backgroundColor: '#FFCD56',
      borderColor: '#FFCD56',
    },
    {
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
    },
    {
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
    },
  ];

  const renderListTitleChartPole = (List) => {
    if (List) {
      const chartTitle = [...List];
      return (
        chartTitle &&
        chartTitle.map((item, index) => (
          <div
            className="subtitle_item"
            style={{
              backgroundColor: ListBackgroundPoleChart[index].backgroundColor,
              borderColor: ListBackgroundPoleChart[index].borderColor,
            }}
          >
            {item.Key}
          </div>
        ))
      );
    }
  };

  const renderListTileChart = () => {
    if (DataChart && DataChart.SoLieuBieuDoCot) {
      const dataBieuDoCot = [...DataChart.SoLieuBieuDoCot];
      const arrTitle = [];
      dataBieuDoCot.forEach((item) => {
        if (item && item.Data) {
          item.Data.forEach((itemTitle) => {
            if (!arrTitle.find((item) => item.label === itemTitle.Key)) {
              arrTitle.push({
                label: itemTitle.Key,
              });
            }
          });
        }
      });
      return (
        arrTitle &&
        arrTitle.map((item, index) => (
          <div
            className="subtitle_item"
            style={{
              backgroundColor: listColor[index].backgroundColor,
              borderColor: listColor[index].borderColor,
            }}
          >
            {item.label}
          </div>
        ))
      );
    }
  };

  const handleRenderLineChart = (type) => {
    const dataOrigin = [];
    if (DataChart?.SoLieuBieuDoCot) {
      const dataChart = [...DataChart?.SoLieuBieuDoCot].filter(
        (item) => item.CapID === Number(filterData.Cap),
      );
      dataChart.forEach((item, index) => {
        dataOrigin[index] = {};
        dataOrigin[index].Title = item.TenCot;
        dataOrigin[index].DataArr = [];
        dataOrigin[index].CapID = item.CapID;
        if (item.Data) {
          item.Data.forEach((item) => {
            dataOrigin[index].DataArr.push({
              label: item.Key,
              Data: item.Value,
            });
          });
        }
      });
    }

    const arrTitle = [];

    const newData = [];
    dataOrigin.forEach((item) => arrTitle.push(item.Title));
    dataOrigin.forEach((item, indexParent) => {
      item.DataArr.forEach((itemChild, indexChild) => {
        const objConstant = newData.find(
          (itemArr) => itemArr.label === itemChild.label,
        );
        if (newData.find((itemArr) => itemArr.label === itemChild.label)) {
          let index = newData.indexOf(objConstant);
          newData[index].data.push(itemChild.Data);
        } else {
          newData.push({
            ...itemChild,
            label: itemChild.label,
            data: [itemChild.Data],
            backgroundColor: listColor[indexChild].backgroundColor,
            borderColor: listColor[indexChild].borderColor,
            pointBorderColor: 'aqua',
            fill: true,
          });
        }
      });
    });

    let Nam = arrTitle;
    const data = {
      labels: Nam,
      datasets: newData,
    };

    const options = {
      // indexAxis: indexAxis,
      maintainAspectRatio: false,
      barPercentage: 0.4,
      plugins: {
        tooltip: {
          // This more specific font property overrides the global property
          titleFont: {
            size: 18,
          },
          bodyFont: {
            size: 15,
          },
          footerFont: {
            size: 20, // there is no footer by default
          },
        },
        // tooltip: handleTooltip(),
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 14,
            },
          },
        },
        datalabels: {
          display: true,
          color: '#000', // Màu chữ
          font: {
            size: 14, // Kích thước chữ
            weight: 'bold', // Độ đậm của chữ
          },
          textAlign: 'center',
          anchor: 'end',
          padding: {
            bottom: 50,
          },

          rotation: -90, // Góc xoay văn bản
          formatter: function (value) {
            // Hàm format văn bản trước khi hiển thị
            return value;
          },
        },
      },
    };

    const optionsY = {
      // indexAxis: indexAxis,
      maintainAspectRatio: false,
      barPercentage: 0.4,
      plugins: {
        tooltip: {
          // This more specific font property overrides the global property
          titleFont: {
            size: 18,
          },
          bodyFont: {
            size: 15,
          },
          footerFont: {
            size: 20, // there is no footer by default
          },
        },
        // tooltip: handleTooltip(),
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 14,
            },
          },
        },
        datalabels: {
          display: true,
          color: '#000', // Màu chữ
          font: {
            size: 14, // Kích thước chữ
            weight: 'bold', // Độ đậm của chữ
          },
          // textAlign: 'center',
          anchor: 'end',
          padding: {
            bottom: 50,
          },

          // rotation: -90, // Góc xoay văn bản
          formatter: function (value) {
            // Hàm format văn bản trước khi hiển thị
            return value;
          },
        },
      },
    };
    return <LineChart data={data} options={options} optionsY={optionsY} />;
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };

  const handleRenderPoleAreaChart = (Data) => {
    const labels = [];
    const datasets = [];
    const dataItem = {
      data: [],
      backgroundColor: [],
      borderColor: [],
    };
    if (Data) {
      Data.forEach((item) => labels.push(item.Key));
      Data.forEach((item, index) => {
        dataItem.data.push(item.Value);
        dataItem.backgroundColor.push(
          ListBackgroundPoleChart[index].backgroundColor,
        );
        dataItem.borderColor.push(ListBackgroundPoleChart[index].borderColor);
      });
    }
    datasets.push(dataItem);
    const data = {
      labels: labels,
      datasets: datasets,
    };

    const optionsPoleArea = {
      plugins: {
        tooltip: {
          // This more specific font property overrides the global property
          titleFont: {
            size: 18,
          },
          bodyFont: {
            size: 15,
          },
          footerFont: {
            size: 20, // there is no footer by default
          },
          callbacks: {
            label: function (context) {
              let label = context.label;
              let value = context.formattedValue;
              return `${label}: ${value}%`;
              // let label = context.dataset.label || '';

              // if (label) {
              //     label += ': ';
              // }
              // if (context.parsed.y !== null) {
              //     label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              // }
              // return label;
            },
          },
        },
        // tooltip: handleTooltip(),
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 14,
            },
          },
        },
        legend: {
          display: false,
          labels: {
            font: {
              size: 14,
            },
          },
        },
        datalabels: {
          clip: true,
          backgroundColor: null,
          borderColor: null,
          borderRadius: 4,
          borderWidth: 1,
          color: '#000',
          anchor: 'center',
          align: 'center',
          // offset: 10,
          // padding: {
          //   left: 10,
          //   right: 10,
          //   top: 5,
          //   bottom: 5,
          // },
          font: {
            size: 17,
            weight: 600,
          },
          offset: function (context) {
            let value = context.dataset.data[context.dataIndex];
            return value > 0 ? 10 : -10;
          },
          textAlign: 'center',
          padding: 0,
          formatter: function (value, context) {
            context.textAlign = 'center';
            // ${context.chart.data.labels[context.dataIndex]}\n${value}%
            return `${value}%`;
          },
        },
      },
      responsive: true,
      // maintainAspectRatio: false,
    };
    return <PolarArea options={optionsPoleArea} data={data} />;
  };

  const handleShowModalFilter = () => {
    setVisibleModalFilter(true);
  };

  const closeModalFilter = () => {
    setVisibleModalFilter(false);
    const newKey = keyModalFilter + 1;
    setKeyModalFilter(newKey);
  };

  const getDanhSachCoQuanByCapID = (PhamViID) => {
    api
      .GetCoQuanByPhamViID({PhamViID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachCoQuan(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Data);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const submitModalFilter = (data, isGetInit = false) => {
    const dataRequest = formatDataRequest(data);
    setLoadingFilterChart(true);
    api
      .DanhSachData(dataRequest)
      .then((res) => {
        setVisibleModalFilter(false);
        setLoadingFilterChart(false);
        if (res.data.Status > 0) {
          setDataChart(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Data);
        }
      })
      .catch((err) => {
        setLoadingFilterChart(false);
        setVisibleModalFilter(false);
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleChangeData = (key, value, Type, resetData = false) => {
    const newData = {...data};
    newData[key] = value;
    if (Type) {
      newData['Type'] = Type;
    }
    if (resetData) {
      newData['Data'] = null;
      newData['Nam'] = null;
    }
    if (key === 'CapID' && data?.CoQuanID) {
      newData.CoQuanID = null;
    }
    if (key === 'LoaiThoiGianID' && value) {
      const currentMonth = moment().month() + 1;
      const currentYear = moment().year();
      // const localTimeStart = timeStart.local();
      const quater = moment().quarter();

      const obj = {};
      if (value === 1) {
        newData.Data = currentMonth;
        newData.Type = 1;
      } else if (value === 2) {
        /// check time current < 6 months or larger return first 6 months is 17 or latest 6 months is 18
        newData.Data = currentMonth < 6 ? 17 : 18;
        newData.Type = 2;
      } else if (value === 3) {
        newData.Data = quater;
        newData.Type = 3;
      }
      setData({
        ...newData,
        Nam: currentYear,
      });
    } else if (key === 'Nam' && !value) {
      setData({
        ...newData,
        Data: null,
      });
    } else {
      setData({
        ...newData,
      });
    }
  };

  const handleCaculateYearFromYear = (fromYear) => {
    const startYear = moment(fromYear, 'YYYY');
    const endYear = moment(); // Lấy ngày hiện tại
    const ListYears = [];
    let year = moment(startYear);

    while (year.isSameOrBefore(endYear)) {
      ListYears.push({
        Title: year.format('YYYY'),
        Value: year.format('YYYY'),
      });
      year.add(1, 'year');
    }
    ListYears.sort(function (a, b) {
      return b.Value - a.Value;
    });
    // ListYears.sort(item => i)
    return ListYears;
  };

  const UpdateWarning = () => {
    dispatch(actions.getSoLieuCanhBao(filterData));
  };

  const ExportData = () => {
    api.ExportData(filterData).then((res) => {
      const a = document.createElement('a');
      a.href = res.data.Data;
      a.target = '_blank';
      a.click();
    });
  };

  const handleRedirectXuLyDon = (url, ma) => {
    const nextOpenKeys = [];
    if (ListSideBar) {
      ListSideBar.forEach((item) => {
        if (item.Children.find((child) => child.MaMenu === ma)) {
          nextOpenKeys.push(item.MaMenu);
        }
      });
      dispatch(actionsApp.changeOpenKeys(nextOpenKeys));
    }
    history.push(url);
    dispatch(actionsApp.changeCurrent(ma));
  };

  const namTrienKhai = getConfigLocal('namTrienKhai', '2018');
  const ListYears = handleCaculateYearFromYear(namTrienKhai.toString());

  const ListMonths = [];
  const totalYear = Math.ceil(getTotalMonthsOfYear(moment().year()));
  for (let i = 1; i <= 12; i++) {
    ListMonths.push({
      Title: `Tháng ${i}`,
      Value: i,
    });
  }

  const ListQuarter = [
    {
      Title: 'Quý 1',
      Value: 1,
    },
    {
      Title: 'Quý 2',
      Value: 2,
    },
    {
      Title: 'Quý 3',
      Value: 3,
    },
    {
      Title: 'Quý 4',
      Value: 4,
    },
  ];

  const ListFilterYeas = [
    {
      Title: '6 tháng đầu năm',
      Value: 17,
    },
    {
      Title: '9 tháng đầu năm',
      Value: 19,
    },
    {
      Title: '6 tháng cuối',
      Value: 18,
    },
    {
      Title: 'Cả năm',
      Value: 20,
    },
  ];

  const indexCap = DanhSachCacCap.indexOf(
    DanhSachCacCap.find((item) => item.ID === data.CapID),
  );
  const indexMonths = ListMonths.indexOf(
    ListMonths.find((item) => Number(item.Value) === Number(data.Data)),
  );

  const indexQuaters = ListQuarter.indexOf(
    ListQuarter.find((item) => item.Value === data.Data),
  );

  const indexYears = ListFilterYeas.indexOf(
    ListFilterYeas.find((item) => item.Value === data.Data),
  );

  const indexCoQuan = DanhSachCoQuan.indexOf(
    DanhSachCoQuan.find((item) => item.CoQuanID === data.CoQuanID),
  );

  const isDashBoard = true;

  const urlMatch = props?.match?.url;

  return (
    <Wrapper HrefLink={HrefLink}>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>{DataChart?.ListCapID ? 'Dashboard' : ''}</PageHeader>
        </PageWrap>
        <Box>
          <div className="wrapper-box">
            {loadingChart ? (
              <div className="loading-spin_antd">
                <Spin></Spin>
              </div>
            ) : null}
            {DataChart?.ListCapID ? (
              <>
                <BoxFilter isDashBoard={isDashBoard}>
                  <div className="wrapper-top" id="wrapper-top">
                    <Row gutter={[18, 18]} className="row-top">
                      <div className="swiper-wrapper">
                        <Swiper
                          slidesPerView={1}
                          breakpoints={{
                            0: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            660: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            850: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1100: {
                              slidesPerView: 4,
                              spaceBetween: 30,
                            },
                            1500: {
                              slidesPerView: 5,
                              spaceBetween: 30,
                            },
                            1750: {
                              slidesPerView: 7,
                              spaceBetween: 0,
                            },
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          // navigation={true}
                          navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          // slidesOffsetBefore={20}
                          // slidesOffsetAfter={20}
                          modules={[Pagination, Navigation]}
                          className="toolbar"
                        >
                          <SwiperSlide>
                            <div className="toolbar-item">
                              <div className="toolbar-item__content">
                                <p className="item__content__title"></p>
                                <div className="item_data_filter">
                                  {data?.Nam ? (
                                    <Tooltip title={data?.Nam}>
                                      <p>{data?.Nam}</p>
                                    </Tooltip>
                                  ) : null}
                                  {data.Type === 1 ? (
                                    ListMonths[indexMonths]?.Title ? (
                                      <Tooltip
                                        title={ListMonths[indexMonths]?.Title}
                                      >
                                        <p>
                                          {handleTextLong(
                                            ListMonths[indexMonths]?.Title,
                                            7,
                                          )}
                                        </p>
                                      </Tooltip>
                                    ) : null
                                  ) : data.Type === 2 ? (
                                    ListFilterYeas[indexYears]?.Title ? (
                                      <Tooltip
                                        title={
                                          ListFilterYeas[indexYears]?.Title
                                        }
                                      >
                                        <p>
                                          {handleTextLong(
                                            ListFilterYeas[indexYears]?.Title,
                                            7,
                                          )}
                                        </p>
                                      </Tooltip>
                                    ) : null
                                  ) : data.Type === 3 ? (
                                    ListQuarter[indexQuaters]?.Title ? (
                                      <Tooltip
                                        title={ListQuarter[indexQuaters]?.Title}
                                      >
                                        <p>
                                          {handleTextLong(
                                            ListQuarter[indexQuaters]?.Title,
                                            7,
                                          )}
                                        </p>
                                      </Tooltip>
                                    ) : null
                                  ) : null}
                                </div>
                              </div>
                              <div
                                className="toolbar-item__icon"
                                onClick={handleShowModalFilter}
                              >
                                <img src={FilterImage} alt={'filter'} />
                                <p className="item__content__title">Bộ lọc</p>
                              </div>
                            </div>
                          </SwiperSlide>
                          {DataChart?.SoLieuTongHop &&
                            DataChart?.SoLieuTongHop.map((item, index) => (
                              <SwiperSlide>
                                <div className="toolbar-item" key={item.Value}>
                                  <div className="toolbar-item__content">
                                    <p className="item__content__data">
                                      {item?.Value}
                                    </p>
                                    <p className="item__content__title">
                                      {item?.Key}
                                    </p>
                                  </div>
                                  <div className="toolbar-item__icon">
                                    <img
                                      src={ListImage[index]?.image}
                                      alt={ListImage[index]?.image}
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </Row>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </BoxFilter>
                <div className="dashboard-wrapper">
                  <div className="dashboard-filter">
                    <div className="dashboard-filter__items">
                      <FilterTime onFilter={onFilter} filterData={filterData} />
                    </div>
                    <div className="dashboard-filter__items">
                      <p>Phân loại vụ việc: </p>
                      <Select
                        style={{width: '200px'}}
                        onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
                        value={filterData?.LoaiKhieuToID}
                      >
                        {DanhSachLoaiKhieuTo
                          ? DanhSachLoaiKhieuTo.map((item) => (
                              <Option value={item.LoaiKhieuToID?.toString()}>
                                {item.TenLoaiKhieuTo}
                              </Option>
                            ))
                          : null}
                      </Select>
                    </div>
                    <div className="dashboard-filter__items">
                      <Button className="btn-danger" onClick={UpdateWarning}>
                        Cập nhật cảnh báo
                      </Button>
                    </div>
                    <div className="dashboard-filter__items">
                      <Button type="primary" onClick={ExportData}>
                        Xuất dữ liệu
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`dashboard-wrapper__card ${
                      SoLieuCanhBao && SoLieuCanhBao?.length > 3
                        ? 'dashboard-wrapper__more'
                        : ''
                    }`}
                  >
                    {loadingCanhBao ? (
                      <div className="loading-wrapper">
                        <Spin></Spin>
                      </div>
                    ) : null}
                    {SoLieuCanhBao
                      ? SoLieuCanhBao.map((item, index) => (
                          <div
                            className="card-link"
                            to={`${urlMatch}/${item?.MaChucNang}`}
                            onClick={() =>
                              handleRedirectXuLyDon(
                                `${urlMatch}/${item?.MaChucNang}`,
                                item?.MaChucNang,
                              )
                            }
                          >
                            <div className="card-item">
                              <div className="card-item_top">
                                <div className="icon">
                                  <img
                                    src={
                                      index % 2 === 0 ? WarningRed : WarningBlue
                                    }
                                    alt="warning"
                                  />
                                </div>
                                <div className="title">{item.TenCanhBao}</div>
                              </div>
                              <div className="card-item_body">
                                {item &&
                                  item?.Data?.map((item) => (
                                    <div className="item__desc">
                                      <p>{item.Key}:</p>
                                      <p className="item__desc__circle">
                                        {item.Value}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </Box>
      </LayoutWrapper>
      <ModalFilterData
        visible={visibleModalFilter}
        onCancel={closeModalFilter}
        onCreate={submitModalFilter}
        onChangeData={handleChangeData}
        onGetDanhSachCoQuan={getDanhSachCoQuanByCapID}
        data={data}
        setData={setData}
        ListQuarter={ListQuarter}
        ListYears={ListYears}
        ListMonths={ListMonths}
        ListCap={DanhSachCacCap}
        DanhSachCoQuan={DanhSachCoQuan}
        ListFilterYeas={ListFilterYeas}
        loading={loadingFilterChart}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    role: getRoleByKey(state.Auth.role, 'quan-ly-nam-hoc'),
  };
}

export default connect(mapStateToProps, actions)(DashBoard);
