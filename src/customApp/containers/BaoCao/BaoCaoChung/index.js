import React, {useEffect, useLayoutEffect, useState} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import Report from '../ReportOrigin';
import {
  Checkbox,
  DatePicker as DatePickerAnt,
  message,
  Modal,
  Tooltip,
} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import apiCoQuan from '../../DanhMuc/DMCoQuan/config';
import {
  Button,
  InputSearch,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {WrapperReport} from '../HOC';
import actions from '../../../redux/BaoCao/BaoCaoChung/action';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {
  changeUrlFilter,
  formatDate,
  getFilterData,
  getLocalKey,
} from '../../../../helpers/utility';
import moment from 'moment';
import styled from 'styled-components';
import {TreeSelect as TreeSelectAnt} from 'antd';
import api from './config';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import {disabledDate} from '../../../../helpers/utility';
import {formatDataTreeLoaiKhieuTo} from '../../../../helpers/utility';
import FilterTime from '../../NghiepVu/Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {CapID} from '../../../../settings/constants';

const KKDLDauKy = (props) => {
  const handleRenderTitle = (route) => {
    switch (route) {
      case 'bc-kien-nghi-phan-anh':
        return 'Báo cáo tổng hợp kết quả giải quyết đơn kiến nghị, phản ánh';
      case 'bc-loai-khieu-to':
        return 'Báo cáo thống kê theo loại khiếu tố';
      case 'bc-cq-chuyen-don':
        return 'Báo cáo thống kê theo cơ quan chuyển đơn';
      case 'bc-dia-chi-chu-don':
        return 'Báo cáo thống kê theo địa chỉ chủ đơn';
      case 'bc-noi-phat-sinh':
        return 'Báo cáo thống kê theo nơi phát sinh';
      case 'bc-vu-viec-dong-nguoi':
        return 'Báo cáo thống kê vụ việc đông người';
      case 'bc-rut-don':
        return 'Báo cáo thống kê rút đơn';
      case 'bc-td-xld-gqd':
        return 'Báo cáo tổng hợp tình hình tiếp dân, xử lý đơn và giải quyết đơn theo đơn vị';
      case 'bc-xu-ly-cong-viec':
        return 'Báo cáo xử lý công việc';
      case 'bc-don-chuyen-giai-quyet':
        return 'Báo cáo đơn chuyển giải quyết';
      // old report
      case 'TCD01':
        return 'THKQ TIẾP CÔNG DÂN THƯỜNG XUYÊN, ĐỊNH KỲ VÀ ĐỘT XUẤT';
      case 'TCD02':
        return 'THKQ PHÂN LOẠI, XỬ LÝ ĐƠN QUA TIẾP CÔNG DÂN';
      case 'XLD01':
        return 'THKQ XỬ LÝ ĐƠN';
      case 'XLD02':
        return 'THKQ XỬ LÝ ĐƠN KHIẾU NẠI';
      case 'XLD03':
        return 'THKQ XỬ LÝ ĐƠN TỐ CÁO';
      case 'XLD04':
        return 'THKQ XỬ LÝ ĐƠN KIẾN NGHỊ, PHẢN ÁNH';
      case 'KQGQ01':
        return 'THKQ GIẢI QUYẾT THUỘC THẨM QUYỀN';
      case 'KQGQ02':
        return 'THKQ THI HÀNH QUYẾT ĐỊNH GIẢI QUYẾT KHIẾU NẠI';
      case 'KQGQ03':
        return 'THKQ GIẢI QUYẾT TỐ CÁO THUỘC THẨM QUYỀN';
      case 'KQGQ04':
        return 'THKQ THỰC HIỆN KẾT LUẬN NỘI DUNG TỐ CÁO';
      default:
        break;
    }
  };

  const route = props.location.pathname.slice(
    props.location.pathname.lastIndexOf('/') + 1,
  );

  document.title = handleRenderTitle(route);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  // const [DanhSachCap, setDanhSachCap] = useState([]);
  const [Step, setStep] = useState(1);
  const {ThongTinBaoCao, tableLoading} = useSelector(
    (state) => state.BaoCaoChung,
  );
  const [DanhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState([]);
  const [loadingDetailsReport, setLoadingDetailsReport] = useState(false);
  const [MaxLevel, setMaxLevel] = useState(2);
  const [DanhSachDuLieu, setDanhSachDuLieu] = useState([]);
  const [DanhSachCoQuanByDuLieu, setDanhSachCoQuanByDuLieu] = useState([]);
  const [DetailsReportPayload, setDetailsReportPayload] = useState({});
  const [ListChangeRowReport, setListChangeRowReport] = useState([]);
  const [DanhSachLoaiKhieuTo, setDanhSachLoaiKhieuTo] = useState([]);
  const [LoaiKhieuToID, setLoaiKhieuToID] = useState(null);
  const [defaultSelectValue, setDefaultSelectValue] = useState([]);
  const [dataExport, setDataExport] = useState({
    CoQuanID: 0,
    CapID: 0,
    Index: 0,
  });

  useEffect(() => {
    let type = handleCheckTypeReport(route);
    api
      .getMaxLevel({type})
      .then((res) => {
        if (res.data.Status > 0) {
          setMaxLevel(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  }, []);

  const disabledExportReport = !ThongTinBaoCao?.DataTable;

  const dispatch = useDispatch();
  const user = getLocalKey('user', {});
  const DanhSachCap = user?.ListCap;

  const handleGetInitDataFromType = (Type) => {
    switch (Type) {
      // case 1:
      // case 6:
      // case 7:
      // case 11:
      // case 12:
      // case 13:
      // case 14:
      // case 15:
      // case 16:
      // case 17:
      // case 18:
      // case 19:
      // case 20:
      //   api
      //     .DanhSachCapBaoCao()
      //     .then((res) => {
      //       if (res.data.Status > 0) {
      //         setDanhSachCap(res.data.Data);
      //       } else {
      //         message.destroy();
      //         message.warning(res.data.Message);
      //       }
      //     })
      //     .catch((err) => {
      //       message.destroy();
      //       message.warning(err.toString());
      //     });
      case 2:
      case 9:
        api.TreeLoaiKhieuTo().then(async (res) => {
          if (res.data.Status > 0) {
            const treeData = await formatDataTreeLoaiKhieuTo(res.data.Data);
            setDanhSachLoaiKhieuTo(treeData.DanhSachLoaiKhieuTo);
          }
        });
        api.DanhSachDuLieu({Type}).then((res) => {
          if (res.data.Status > 0) {
            setDanhSachDuLieu(res.data.Data);
          }
        });
      case 3:
      case 4:
      case 5:
        api.DanhSachDuLieu({Type}).then((res) => {
          if (res.data.Status > 0) {
            setDanhSachDuLieu(res.data.Data);
          }
        });
      // case 7:
      //   api.DanhSachCoQuan({Type}).then((res) => {
      //     if (res.data.Status > 0) {
      //       setDanhSachCoQuan(res.data.Data);
      //     }
      //   });
      default:
        break;
    }
  };

  useEffect(() => {
    const Type = handleCheckTypeReport(route);
    const firstDayOfCurrentMonth = moment()
      ?.startOf('month')
      ?.format('YYYY/MM/DD');
    const defaultSelect = [];
    if (user && user?.ListCap) {
      user?.ListCap.forEach((item) => defaultSelect.push(item.CapID));
    }
    const ListCap = filterData.ListCapIDStr
      ? filterData.ListCapIDStr
      : defaultSelect;
    const initFilter = {
      ...filterData,
      Type,
      TuNgay: filterData.TuNgay ? filterData.TuNgay : firstDayOfCurrentMonth,
      DenNgay: filterData.DenNgay
        ? filterData.DenNgay
        : moment().format('YYYY/MM/DD'),
      ListCapIDStr: ListCap,
    };
    onChangeFilterCap(ListCap);
    setFilterData(initFilter);
    dispatch(actions.getCoQuan());
    handleGetInitDataFromType(Type);
    if (filterData.PhamViID) {
      handleGetCoQuanFromDuLieu(filterData.PhamViID);
    }
  }, []);

  const onChangeFilterCap = (value) => {
    if (value) {
      let newDefaultSelectValue;
      if (typeof value === 'string') {
        newDefaultSelectValue = value.split(',')?.map((item) => Number(item));
      } else {
        newDefaultSelectValue = value ? value : [];
      }
      setDefaultSelectValue(newDefaultSelectValue);
    } else {
      setDefaultSelectValue([]);
    }
  };

  const ExportListReport = (type) => {
    const Type = handleCheckTypeReport(route);
    const DenNgay = filterData?.DenNgay ? formatDate(filterData?.DenNgay) : '';
    const NgaySuDung = filterData?.NgaySuDung
      ? formatDate(filterData?.NgaySuDung)
      : '';
    const TuNgay = filterData?.TuNgay ? formatDate(filterData?.TuNgay) : '';
    let ListCapIDStr = '';
    if (
      typeof filterData?.ListCapIDStr !== 'string' &&
      filterData?.ListCapIDStr
    ) {
      filterData.ListCapIDStr.forEach((item, index) => {
        index === filterData.ListCapIDStr.length - 1
          ? (ListCapIDStr += item)
          : (ListCapIDStr += item + ',');
      });
    } else {
      ListCapIDStr = filterData.ListCapIDStr;
    }
    const {CoQuanID, CapID, Index} = dataExport;
    const data = {
      ...filterData,
      ListCapIDStr,
      Index,
      Type,
      DenNgay,
      NgaySuDung,
      TuNgay,
      CoQuanID,
      CapID,
    };
    api
      .ExportExcelDanhSachDonThu(data)
      .then((res) => {
        if (res.data.Status > 0) {
          const a = document.createElement('a');
          a.href = res.data.Data;
          a.target = '_blank';
          a.click();
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

  const handleExportExcel = (type) => {
    const Type = handleCheckTypeReport(route);

    let ListCapIDStr = '';
    if (
      typeof filterData?.ListCapIDStr !== 'string' &&
      filterData?.ListCapIDStr
    ) {
      filterData.ListCapIDStr.forEach((item, index) => {
        index === filterData.ListCapIDStr.length - 1
          ? (ListCapIDStr += item)
          : (ListCapIDStr += item + ',');
      });
    } else {
      ListCapIDStr = filterData.ListCapIDStr;
    }
    const data = {
      ...filterData,
      ListCapIDStr,
      Type,
      LoaiKhieuToID: LoaiKhieuToID ? LoaiKhieuToID : null,
    };
    const callApi =
      type === 1 ? api.ExportExcelDanhSachDonThu(data) : api.ExportExcel(data);

    callApi
      .then((res) => {
        if (res.data.Status > 0) {
          const a = document.createElement('a');
          a.href = res.data.Data;
          a.target = '_blank';
          a.click();
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

  const handleCheckTypeReport = (route) => {
    switch (route) {
      case 'bc-kien-nghi-phan-anh':
        return 1;
      case 'bc-loai-khieu-to':
        return 2;
      case 'bc-cq-chuyen-don':
        return 3;
      case 'bc-dia-chi-chu-don':
        return 4;
      case 'bc-noi-phat-sinh':
        return 5;
      case 'bc-vu-viec-dong-nguoi':
        return 6;
      case 'bc-rut-don':
        return 7;
      case 'bc-td-xld-gqd':
        return 8;
      case 'bc-xu-ly-cong-viec':
        return 9;
      case 'bc-don-chuyen-giai-quyet':
        return 10;
      case 'TCD01':
        return 11;
      case 'TCD02':
        return 12;
      case 'XLD01':
        return 13;
      case 'XLD02':
        return 14;
      case 'XLD03':
        return 15;
      case 'XLD04':
        return 16;
      case 'KQGQ01':
        return 17;
      case 'KQGQ02':
        return 18;
      case 'KQGQ03':
        return 19;
      case 'KQGQ04':
        return 20;
      default:
        break;
    }
  };

  const handleGetCoQuanFromDuLieu = (PhamViID) => {
    api.GetCoQuanByDuLieu({PhamViID}).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachCoQuanByDuLieu(res.data.Data);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };

  const handleRenderFilterForType = (route) => {
    const isVisibleCap = user?.ListCap?.length > 1;
    let type = handleCheckTypeReport(route);
    switch (type) {
      case 1:
      case 6:
      case 7:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return (
          <>
            {Step === 1 ? (
              <>
                {isVisibleCap ? (
                  <Checkbox.Group
                    onChange={(value) => {
                      onFilter(value, 'ListCapIDStr');
                      onChangeFilterCap(value);
                    }}
                    value={defaultSelectValue}
                  >
                    {DanhSachCap?.map((item) => (
                      <Checkbox
                        style={{
                          display:
                            item.CapID === CapID.CapSoNganh ? 'none' : '',
                        }}
                        key={item.CapID}
                        value={item.CapID}
                      >
                        {item?.TenCap}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                ) : null}
                <FilterTime onFilter={onFilter} filterData={filterData} />
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  onClick={handleExportExcel}
                  disabled={disabledExportReport}
                >
                  Xuất Báo Cáo
                </Button>
              </>
            ) : null}
          </>
        );
      case 2:
        return (
          <>
            {Step === 1 ? (
              <>
                {isVisibleCap ? (
                  <Checkbox.Group
                    onChange={(value) => {
                      onFilter(value, 'ListCapIDStr');
                      onChangeFilterCap(value);
                    }}
                    value={defaultSelectValue}
                  >
                    {DanhSachCap?.map((item) => (
                      <Checkbox
                        style={{
                          display:
                            item.CapID === CapID.CapSoNganh ? 'none' : '',
                        }}
                        key={item.CapID}
                        value={item.CapID}
                      >
                        {item?.TenCap}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                ) : null}
                <TreeSelectAnt
                  showSearch
                  treeData={DanhSachLoaiKhieuTo}
                  onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
                  value={filterData?.LoaiKhieuToID}
                  style={{width: 400}}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="Chọn loại khiếu tố"
                  allowClear
                  treeDefaultExpandAll
                  notFoundContent={'Không có dữ liệu'}
                  treeNodeFilterProp={'title'}
                />
                <FilterTime onFilter={onFilter} filterData={filterData} />
                {/* <Select
                  style={{width: 200}}
                  placeholder="Dữ liệu"
                  onChange={(value) => onFilter(value, 'PhamViID')}
                >
                  <Option value={'2'}>Toàn tỉnh</Option>
                  <Option value={'1'}>Trong đơn vị</Option>
                </Select> */}
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  onClick={handleExportExcel}
                  disabled={disabledExportReport}
                >
                  Xuất Báo Cáo
                </Button>
              </>
            ) : null}
          </>
        );
      case 3:
      case 4:
      case 5:
        return (
          <>
            {Step === 1 ? (
              <>
                <Select
                  style={{width: '300px'}}
                  allowClear
                  placeholder="Dữ liệu"
                  value={filterData?.PhamViID?.toString()}
                  onChange={(value) => {
                    onFilter(value, 'PhamViID');
                    onFilter(null, 'CoQuanID');
                    handleGetCoQuanFromDuLieu(value);
                  }}
                >
                  {DanhSachDuLieu
                    ? DanhSachDuLieu?.map((item) => (
                        <Option value={item.Value.toString()}>
                          {item.Key}
                        </Option>
                      ))
                    : null}
                </Select>
                <Select
                  style={{width: '300px'}}
                  allowClear
                  placeholder="Chọn cơ quan"
                  value={filterData?.CoQuanID?.toString()}
                  onChange={(value) => {
                    onFilter(value, 'CoQuanID');
                  }}
                >
                  {DanhSachCoQuanByDuLieu
                    ? DanhSachCoQuanByDuLieu.map((item) => (
                        <Option value={item.CoQuanID.toString()}>
                          {item.TenCoQuan}
                        </Option>
                      ))
                    : null}
                </Select>
                <FilterTime onFilter={onFilter} filterData={filterData} />
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  onClick={handleExportExcel}
                  disabled={disabledExportReport}
                >
                  Xuất Báo Cáo
                </Button>
              </>
            ) : null}
          </>
        );

      case 8:
      case 10:
        return (
          <>
            {Step === 1 ? (
              <>
                <FilterTime onFilter={onFilter} filterData={filterData} />
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  onClick={handleExportExcel}
                  disabled={disabledExportReport}
                >
                  Xuất Báo Cáo
                </Button>
              </>
            ) : null}
          </>
        );
      case 9:
        return (
          <>
            {Step === 1 ? (
              <>
                <TreeSelectAnt
                  showSearch
                  treeData={DanhSachLoaiKhieuTo}
                  onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
                  value={filterData?.LoaiKhieuToID}
                  style={{width: 400}}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="Chọn loại khiếu tố"
                  allowClear
                  treeDefaultExpandAll
                  notFoundContent={'Không có dữ liệu'}
                  treeNodeFilterProp={'title'}
                />
                <FilterTime onFilter={onFilter} filterData={filterData} />
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  onClick={handleExportExcel}
                  disabled={disabledExportReport}
                >
                  Xuất Báo Cáo
                </Button>
              </>
            ) : null}
          </>
        );
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    dispatch(actions.clearData());
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData);
    // dispatch(actions.getData(filterData))
  }, [filterData]);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };

  const handleCreateReport = () => {
    let ListCapIDStr = '';
    if (
      typeof filterData?.ListCapIDStr !== 'string' &&
      filterData?.ListCapIDStr
    ) {
      filterData.ListCapIDStr.forEach((item, index) => {
        index === filterData.ListCapIDStr.length - 1
          ? (ListCapIDStr += item)
          : (ListCapIDStr += item + ',');
      });
    } else {
      ListCapIDStr = filterData.ListCapIDStr;
    }
    if (!ListCapIDStr.includes(CapID.CapUBNDTinh)) {
      // nếu user chọn cấp tỉnh thì thêm cấp sở ngành vào để get danh sách cơ quan cho báo cáo
      // ListCapIDStr += `,${CapID.CapSoNganh}`;
      ListCapIDStr = ListCapIDStr.replace(`${CapID.CapSoNganh},`, '');
    }
    dispatch(
      actions.getData({
        ...filterData,
        ListCapIDStr,
      }),
    );
  };

  const GetChiTietDonThu = async (
    CapID,
    Index,
    CoQuanID,
    key,
    PageNumber,
    LoaiKhieuTo,
    newStep,
  ) => {
    if (LoaiKhieuTo) {
      setLoaiKhieuToID(LoaiKhieuTo);
    }
    setDataExport((prevData) => ({...prevData, CoQuanID, CapID, Index}));
    let ListCapIDStr = '';
    if (
      typeof filterData?.ListCapIDStr !== 'string' &&
      filterData?.ListCapIDStr
    ) {
      filterData.ListCapIDStr.forEach((item, index) => {
        index === filterData.ListCapIDStr.length - 1
          ? (ListCapIDStr += item)
          : (ListCapIDStr += item + ',');
      });
    } else {
      ListCapIDStr = filterData.ListCapIDStr;
    }
    const Type = handleCheckTypeReport(route);
    const DenNgay = filterData?.DenNgay ? formatDate(filterData?.DenNgay) : '';
    const NgaySuDung = filterData?.NgaySuDung
      ? formatDate(filterData?.NgaySuDung)
      : '';
    const TuNgay = filterData?.TuNgay ? formatDate(filterData?.TuNgay) : '';
    const tableData =
      Step === 1
        ? ThongTinBaoCao?.DataTable?.TableData
        : Step === 2
        ? ThongTinBaoCaoChiTiet?.DataTable?.TableData
        : [];
    let data = [];
    setDetailsReportPayload({
      CapID,
      Index,
      CoQuanID,
    });
    const dataFilter = {
      DenNgay,
      NgaySuDung,
      CapID,
      Index,
      CoQuanID,
      TuNgay,
      Type,
      LoaiKhieuToID: LoaiKhieuTo ? LoaiKhieuTo : LoaiKhieuToID,
      ListCapIDStr,
      CapBaoCao: newStep,
      PageNumber: PageNumber ? PageNumber : 1,
    };
    const payload = {
      ...filterData,
      ...dataFilter,
    };
    if (key === 'set') {
      setLoadingDetailsReport(true);
      const CallApi =
        MaxLevel === newStep
          ? api.ChiTietDonThu(payload)
          : api.ThongTinBaoCao(payload);
      CallApi.then((res) => {
        setLoadingDetailsReport(false);
        if (res.data.Status > 0) {
          const data = {...res.data.Data};
          const newThongTinBaoCaoChiTiet = [...ThongTinBaoCaoChiTiet];
          newThongTinBaoCaoChiTiet.push({Step: newStep, Data: data});
          setThongTinBaoCaoChiTiet(newThongTinBaoCaoChiTiet);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      }).catch((err) => {
        setLoadingDetailsReport(false);
        message.destroy();
        message.warning(err.toString());
      });
    } else if (key === 'get') {
      setLoadingDetailsReport(true);
      await api
        .ChiTietDonThu(payload)
        .then((res) => {
          setLoadingDetailsReport(false);
          if (res.data.Status > 0) {
            if (tableData) {
            }
            data = res.data.Data.DataTable.TableData;
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          setLoadingDetailsReport(false);
          message.destroy();
          message.warning(err.toString());
        });
    }
    return key === 'get' ? data : [];
  };

  const handleBackReport = () => {
    const ThongTinBaoCao = [...ThongTinBaoCaoChiTiet];
    const newThongTinBaoCaoChiTiet = ThongTinBaoCao.filter(
      (item) => item.Step !== Step,
    );
    setThongTinBaoCaoChiTiet(newThongTinBaoCaoChiTiet);
    setStep(Step - 1);
  };

  const handleSaveReport = () => {
    const data = {
      ...filterData,
      DataArr: ListChangeRowReport,
    };
    api
      .SaveReport(data)
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          let ListCapIDStr = '';
          if (
            typeof filterData?.ListCapIDStr !== 'string' &&
            filterData?.ListCapIDStr
          ) {
            filterData.ListCapIDStr.forEach((item, index) => {
              index === filterData.ListCapIDStr.length - 1
                ? (ListCapIDStr += item)
                : (ListCapIDStr += item + ',');
            });
          } else {
            ListCapIDStr = filterData.ListCapIDStr;
          }
          dispatch(
            actions.getData({
              ...filterData,
              ListCapIDStr,
            }),
          );
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

  const CurrentThongTinBaoCao = ThongTinBaoCaoChiTiet.find(
    (item) => item?.Step === Step,
  )?.Data;

  return (
    <ReportWrappper>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>{handleRenderTitle(route)}</PageHeader>
        </PageWrap>
        <Box>
          {/* <BoxFilter Step={Step}>{handleRenderFilterForType(route)}</BoxFilter> */}
          {Step === 1 ? (
            <BoxFilter Step={Step} isLeft={true}>
              {handleRenderFilterForType(route)}
            </BoxFilter>
          ) : null}
          <div
            className="unit-report"
            dangerouslySetInnerHTML={{__html: ThongTinBaoCao?.DonViTinh}}
          ></div>
          <Report
            setListChangeRowReport={setListChangeRowReport}
            ListChangeRowReport={ListChangeRowReport}
            setLoadingDetailsReport={setLoadingDetailsReport}
            ThongTinBaoCaoChiTiet={CurrentThongTinBaoCao}
            DetailsReportPayload={DetailsReportPayload}
            loadingDetailsReport={loadingDetailsReport}
            handleCreateReport={handleCreateReport}
            GetChiTietDonThu={GetChiTietDonThu}
            onRollBack={handleBackReport}
            onExport={() => ExportListReport()}
            ThongTinBaoCao={ThongTinBaoCao}
            tableLoading={tableLoading}
            title="Báo cáo 2A"
            setStep={setStep}
            Step={Step}
            MaxLevel={MaxLevel}
          />
        </Box>
      </LayoutWrapper>
    </ReportWrappper>
  );
};

const ReportWrappper = styled.div``;

export default KKDLDauKy;
