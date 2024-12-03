import React, {useEffect, useLayoutEffect, useState} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
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
// import DatePickerFormat from "../../../../components/uielements/datePickerFormat";
// import DatePickerFormat from "../../../../components/uielements/datePickerFormat";
import {DatePicker} from '../../../../components/uielements/exportComponent';
import {
  Button,
  InputSearch,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {WrapperReport} from '../HOC';
import actions from '../../../redux/BaoCao/TCD02Report/action';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {
  changeUrlFilter,
  getFilterData,
  disabledDate,
  formatDate,
} from '../../../../helpers/utility';
import moment from 'moment';
import styled from 'styled-components';
import api from './config';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';

const TCD02Report = (props) => {
  document.title = 'THKQ phân loại, xử lý đơn qua tiếp công dân';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [DanhSachCap, setDanhSachCap] = useState([]);
  const [Step, setStep] = useState(1);
  const {ThongTinBaoCao, tableLoading} = useSelector(
    (state) => state.TCD02Report,
  );
  const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState({});
  const [loadingDetailsReport, setLoadingDetailsReport] = useState(false);
  const [DetailsReportPayload, setDetailsReportPayload] = useState({});
  const [TableData, setTableData] = useState([]);
  const [TableHeader, setTableHeader] = useState([]);
  const [TableDataDetails, setTableDataDetails] = useState([]);
  const [TableHeaderDetails, setTableHeaderDetails] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const startDayofTheWeek = moment()
      .startOf('isoWeek')
      .day(1)
      .format('YYYY/MM/DD');
    const initFilter = {
      ...filterData,
      DenNgay: filterData.DenNgay
        ? filterData.DenNgay
        : moment().format('YYYY/MM/DD'),
      TuNgay: filterData.TuNgay ? filterData.TuNgay : startDayofTheWeek,
    };
    setFilterData(initFilter);
    api
      .DanhSachCapBaoCao()
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachCap(res.data.Data);
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

  // useEffect(() => {

  // },[])

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
    dispatch(
      actions.getData({
        ...filterData,
        ListCapIDStr,
      }),
    );
  };

  let defaultSelectValue;
  if (typeof filterData.ListCapIDStr === 'string') {
    defaultSelectValue =
      filterData && filterData.ListCapIDStr
        ? filterData?.ListCapIDStr.split(',').map((item) => Number(item))
        : [];
  } else {
    defaultSelectValue = filterData?.ListCapIDStr
      ? filterData.ListCapIDStr
      : [];
  }

  const GetChiTietDonThu = async (CapID, Index, CoQuanID, key, PageNumber) => {
    const DenNgay = filterData?.DenNgay
      ? moment(filterData.DenNgay).format('YYYY/MM/DD')
      : '';
    const TuNgay = filterData?.TuNgay
      ? moment(filterData.TuNgay).format('YYYY/MM/DD')
      : '';
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
    if (key === 'set') {
      setLoadingDetailsReport(true);
      api
        .ChiTietDonThu({DenNgay, TuNgay, CapID, Index, CoQuanID})
        .then((res) => {
          setLoadingDetailsReport(false);
          if (res.data.Status > 0) {
            const data = {...res.data.Data};
            setThongTinBaoCaoChiTiet(data);
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
    } else if (key === 'get') {
      setLoadingDetailsReport(true);
      await api
        .ChiTietDonThu({DenNgay, TuNgay, CapID, Index, CoQuanID, PageNumber})
        .then((res) => {
          setLoadingDetailsReport(false);
          if (res.data.Status > 0) {
            if (tableData) {
              // setThongTinBaoCaoChiTiet(prevThongTinBaoCao => ({...prevThongTinBaoCao,DataTable : {
              //     TableData : [...tableData,...res.data.Data.DataTable.TableData],
              //     TableHeader : prevThongTinBaoCao.DataTable?.TableHeader
              // }}))
            }
            data = res.data.Data.DataTable.TableData;
            // PageNumber++
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
    setStep(1);
    setThongTinBaoCaoChiTiet({});
  };

  const handleExportExcel = () => {
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
    };
    api
      .ExportExcel(data)
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

  return (
    <ReportWrappper>
      <LayoutWrapper>
        <PageHeader>THKQ phân loại, xử lý đơn qua tiếp công dân</PageHeader>
        <Box>
          <BoxFilter Step={Step}>
            {Step === 1 ? (
              <>
                <Checkbox.Group
                  onChange={(value) => onFilter(value, 'ListCapIDStr')}
                  defaultValue={defaultSelectValue}
                >
                  {DanhSachCap.map((item) => (
                    <Checkbox key={item.CapID} value={item.CapID}>
                      {item?.TenCap}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
                <DatePickerFormat
                  style={{width: '200px'}}
                  placeholder="Từ Ngày"
                  value={
                    filterData?.TuNgay
                      ? dayjs(filterData?.TuNgay, 'YYYY/MM/DD')
                      : null
                  }
                  format={'DD/MM/YYYY'}
                  onChange={(value, valueString) => {
                    return onFilter(value ? formatDate(value) : null, 'TuNgay');
                  }}
                  disabledDate={(currentDate) =>
                    disabledDate(currentDate, filterData.DenNgay)
                  }
                ></DatePickerFormat>
                <DatePickerFormat
                  style={{width: '200px'}}
                  value={
                    filterData?.DenNgay
                      ? dayjs(filterData?.DenNgay, 'YYYY/MM/DD')
                      : null
                  }
                  format={'DD/MM/YYYY'}
                  placeholder="Đến Ngày"
                  onChange={(value, valueString) => {
                    return onFilter(
                      value ? formatDate(value) : null,
                      'DenNgay',
                    );
                  }}
                ></DatePickerFormat>
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button style={{float: 'right'}} onClick={handleExportExcel}>
                  Xuất excel
                </Button>
              </>
            ) : null}
          </BoxFilter>
          {/* {Step === 2 ? <Button  onClick={handleBackReport}><RollbackOutlined /></Button> : ''} */}
          <div
            className="unit-report"
            dangerouslySetInnerHTML={{__html: ThongTinBaoCao?.DonViTinh}}
          ></div>
          {/* {ThongTinBaoCao && ThongTinBaoCao.DataTable ? ( */}
          <Report
            setThongTinBaoCaoChiTiet={setThongTinBaoCaoChiTiet}
            setLoadingDetailsReport={setLoadingDetailsReport}
            ThongTinBaoCaoChiTiet={ThongTinBaoCaoChiTiet}
            DetailsReportPayload={DetailsReportPayload}
            loadingDetailsReport={loadingDetailsReport}
            handleCreateReport={handleCreateReport}
            GetChiTietDonThu={GetChiTietDonThu}
            onRollBack={handleBackReport}
            ThongTinBaoCao={ThongTinBaoCao}
            tableLoading={tableLoading}
            title="Báo cáo 2A"
            setStep={setStep}
            Step={Step}
          />
          {/* ) : null} */}
        </Box>
      </LayoutWrapper>
    </ReportWrappper>
  );
};

const ReportWrappper = styled.div``;

export default TCD02Report;
