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
import actions from '../../../redux/BaoCao/ThongKeNhapLieu/action';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import FilterTime from '../../NghiepVu/Shared/Component/BoxFilterTime';
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
import PageWrap from '../../../../components/utility/PageWrap';
const Report2A = (props) => {
  document.title = 'Quản lý nhập liệu';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [DanhSachCap, setDanhSachCap] = useState([]);
  const [Step, setStep] = useState(1);
  const {ThongTinBaoCao, tableLoading} = useSelector(
    (state) => state.ThongKeNhapLieu,
  );
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const [MaxLevel, setMaxLevel] = useState(2);
  const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState({});
  const [loadingDetailsReport, setLoadingDetailsReport] = useState(false);
  const [DetailsReportPayload, setDetailsReportPayload] = useState({});
  const [TableData, setTableData] = useState([]);
  const [TableHeader, setTableHeader] = useState([]);
  const [TableDataDetails, setTableDataDetails] = useState([]);
  const [TableHeaderDetails, setTableHeaderDetails] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const initFilter = {
      ...filterData,
      DenNgay: filterData.DenNgay
        ? filterData.DenNgay
        : moment().format('YYYY/MM/DD'),
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

  useEffect(() => {
    dispatch(actionsCoQuan.getInitData());
  }, []);
  useLayoutEffect(() => {
    dispatch(actions.clearData());
    dispatch(actions.getCoQuan());
  }, []);
  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);
  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };
  const handleCreateReport = () => {
    dispatch(
      actions.getData({
        ...filterData,
      }),
    );
  };
  const GetChiTietDonThu = async (CapID, Index, CoQuanID, key, PageNumber) => {
    const DenNgay = filterData?.DenNgay ? formatDate(filterData?.DenNgay) : '';
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
    const data = {
      ...filterData,
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
        <PageWrap>
          <PageHeader>Quản lý nhập liệu</PageHeader>
        </PageWrap>
        <Box>
          <BoxFilter Step={Step} isLeft={true}>
            {Step === 1 ? (
              <>
                <TreeSelect
                  showSearch
                  treeData={DanhSachCoQuan}
                  onChange={(value) => onFilter(value, 'CoQuanID')}
                  style={{width: 400}}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="Chọn cơ quan"
                  allowClear
                  treeDefaultExpandAll
                  // onChange={value => this.onSearch(value, "CoQuanID")}
                  notFoundContent={'Không có dữ liệu'}
                  treeNodeFilterProp={'title'}
                  // defaultValue={filterData.CoQuanID}
                />
                <Select
                  placeholder="Trạng thái"
                  style={{width: '200px'}}
                  onChange={(value) => onFilter(value, 'TrangThai')}
                >
                  <Option value={1}>Chưa nhập liệu</Option>
                  <Option value={2}>Đã nhập liệu</Option>
                </Select>
                <FilterTime onFilter={onFilter} filterData={filterData} />
                {/* <DatePickerFormat
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
                  disabledDate={(currentDate) =>
                    disabledDate(filterData.TuNgay, currentDate, 2)
                  }
                ></DatePickerFormat> */}
                <Button onClick={handleCreateReport}>Thống kê</Button>
                <Button
                  style={{float: 'right'}}
                  onClick={handleExportExcel}
                  disabled={!ThongTinBaoCao?.DataTable?.TableData}
                >
                  Xuất excel
                </Button>
              </>
            ) : null}
          </BoxFilter>

          <div
            className="unit-report"
            dangerouslySetInnerHTML={{__html: ThongTinBaoCao?.DonViTinh}}
          ></div>
          <Report
            setThongTinBaoCaoChiTiet={setThongTinBaoCaoChiTiet}
            setLoadingDetailsReport={setLoadingDetailsReport}
            ThongTinBaoCaoChiTiet={ThongTinBaoCaoChiTiet}
            DetailsReportPayload={DetailsReportPayload}
            loadingDetailsReport={loadingDetailsReport}
            handleCreateReport={handleCreateReport}
            GetChiTietDonThu={GetChiTietDonThu}
            isViewDetail={false}
            onRollBack={handleBackReport}
            ThongTinBaoCao={ThongTinBaoCao}
            tableLoading={tableLoading}
            title="Báo cáo 2A"
            setStep={setStep}
            Step={Step}
            MaxLevel={2}
          />
        </Box>
      </LayoutWrapper>
    </ReportWrappper>
  );
};

const ReportWrappper = styled.div``;

export default Report2A;
