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
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';

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
import actions from '../../../redux/BaoCao/GetDuLieuDauKy/action';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {
  changeUrlFilter,
  getFilterData,
  getValueConfigLocalByKey,
} from '../../../../helpers/utility';
import moment from 'moment';
import styled from 'styled-components';
import api from './config';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';
import {formatDate} from '../../../../helpers/utility';
import {TYPEEDIT} from '../../../../settings/constants';
import PageWrap from '../../../../components/utility/PageWrap';

const KKDLDauKy = (props) => {
  const route = props.location.pathname.slice(
    props.location.pathname.lastIndexOf('/') + 1,
  );
  const user = getValueConfigLocalByKey('user');
  const isAdmin = user?.isAdmin;

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [Step, setStep] = useState(1);
  const {ThongTinBaoCao, tableLoading} = useSelector(
    (state) => state.KKDLDauKy,
  );
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState({});
  const [loadingDetailsReport, setLoadingDetailsReport] = useState(false);
  const [DetailsReportPayload, setDetailsReportPayload] = useState({});
  const [ListChangeRowReport, setListChangeRowReport] = useState([]);
  const handleCheckTypeReport = (route) => {
    switch (route) {
      case 'ke-khai-du-lieu-dau-ky-tcd01':
        return 1;
      case 'ke-khai-du-lieu-dau-ky-tcd02':
        return 2;
      case 'ke-khai-du-lieu-dau-ky-xld01':
        return 3;
      case 'ke-khai-du-lieu-dau-ky-xld02':
        return 4;
      case 'ke-khai-du-lieu-dau-ky-xld03':
        return 5;
      case 'ke-khai-du-lieu-dau-ky-xld04':
        return 6;
      case 'ke-khai-du-lieu-dau-ky-kqgq01':
        return 7;
      case 'ke-khai-du-lieu-dau-ky-kqgq02':
        return 8;
      case 'ke-khai-du-lieu-dau-ky-kqgq03':
        return 9;
      case 'ke-khai-du-lieu-dau-ky-kqgq04':
        return 10;
      default:
        break;
    }
  };
  const handleRenderTitle = (route) => {
    switch (route) {
      case 'ke-khai-du-lieu-dau-ky-tcd01':
        return 'Kê khai số liệu kết quả tiếp công dân thường xuyên, định kỳ và đột xuất';
      case 'ke-khai-du-lieu-dau-ky-tcd02':
        return 'Kê khai số liệu đầu kỳ kết quả phân loại, xử lý đơn qua tiếp công dân';
      case 'ke-khai-du-lieu-dau-ky-xld01':
        return 'Kê khai số liệu đầu kỳ kết quả xử lý đơn';
      case 'ke-khai-du-lieu-dau-ky-xld02':
        return 'Kê khai số liệu đầu kỳ kết quả xử lý đơn khiếu nại';
      case 'ke-khai-du-lieu-dau-ky-xld03':
        return 'Kê khai số liệu đầu kỳ kết quả xử lý đơn tố cáo';
      case 'ke-khai-du-lieu-dau-ky-xld04':
        return 'Kê khai số liệu đầu kỳ kết quả xử lý đơn kiến nghị phản ánh';
      case 'ke-khai-du-lieu-dau-ky-kqgq01':
        return 'Kê khai số liệu đầu kỳ kết quả giải quyết thuộc thẩm quyền';
      case 'ke-khai-du-lieu-dau-ky-kqgq02':
        return 'Kê khai số liệu đầu kỳ kết quả thi hành quyết định giải quyết khiếu nại';
      case 'ke-khai-du-lieu-dau-ky-kqgq03':
        return 'Kê khai số liệu đầu kỳ kết quả giải quyết tố cáo thuộc thẩm quyền';
      case 'ke-khai-du-lieu-dau-ky-kqgq04':
        return 'Kê khai số liệu đầu kỳ kết quả thực hiện kết luận nội dung tố cáo';
      default:
        break;
    }
  };
  document.title = handleRenderTitle(route);

  // const [LoaiBaoCao, setLoaiBaoCao] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const Type = handleCheckTypeReport(route);
    const initFilter = {
      ...filterData,
      LoaiBaoCao: Type,
      NgaySuDung: filterData.DenNgay
        ? filterData.DenNgay
        : moment().format('YYYY/MM/DD'),
    };
    setFilterData(initFilter);
    dispatch(actions.getCoQuan());
  }, []);

  useLayoutEffect(() => {
    dispatch(actions.clearData());
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData);
    // dispatch(actions.getData(filterData))
  }, [filterData]);
  useEffect(() => {
    dispatch(actionsCoQuan.getInitData());
  }, []);
  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };

  const handleCreateReport = () => {
    const NgaySuDung = filterData.NgaySuDung
      ? formatDate(filterData.NgaySuDung)
      : null;
    dispatch(
      actions.getData({
        ...filterData,
        NgaySuDung,
      }),
    );
  };

  const GetChiTietDonThu = async (CapID, Index, CoQuanID, key, PageNumber) => {
    // const DenNgay = filterData?.DenNgay
    //   ? moment(filterData.DenNgay).format('YYYY/MM/DD')
    //   : '';
    const NgaySuDung = filterData?.NgaySuDung
      ? formatDate(filterData.NgaySuDung)
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
        .ChiTietDonThu({NgaySuDung, CapID, Index, CoQuanID})
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
        .ChiTietDonThu({
          // DenNgay,
          NgaySuDung,
          CapID,
          Index,
          CoQuanID,
          PageNumber,
        })
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

  const formatNumber = (text) => {
    if (text) {
      return text?.replace('.', '').replace(',', '.');
    }
    return '';
  };

  const handleSaveReport = () => {
    const ListDaySave = filterData.NgaySuDung.split('/');
    const daySelect = `${ListDaySave[2]}-${ListDaySave[0]}-${ListDaySave[1]}`;
    const newListChangeRowReport = [...ListChangeRowReport];
    const obj = newListChangeRowReport.find((item) =>
      item?.CoQuanID === Number(filterData?.CoQuanID)
        ? Number(filterData?.CoQuanID)
        : Number(user?.CoQuanID),
    );
    if (obj) {
      obj.NgaySuDung = daySelect;
      obj.LoaiBaoCao = filterData.LoaiBaoCao;
    }
    newListChangeRowReport.forEach((item, index) => {
      if (item.DataArr) {
        item.DataArr.forEach((itemArr, indexArr) => {
          if (itemArr?.TypeEdit === TYPEEDIT.Number) {
            newListChangeRowReport[index].DataArr[indexArr].Content =
              itemArr?.Content
                ? formatNumber(itemArr?.Content?.toString())
                : null;
          } else {
            newListChangeRowReport[index].DataArr[indexArr].Content =
              itemArr?.Content ? itemArr?.Content?.toString() : null;
          }
        });
      }
    });
    api
      .SaveReport(newListChangeRowReport)
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          dispatch(
            actions.getData({
              ...filterData,
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

  const {CoQuanID, NgaySuDung} = filterData;

  const checkDisabledSave = isAdmin
    ? CoQuanID && NgaySuDung && ThongTinBaoCao?.DataTable?.TableData
    : NgaySuDung && ThongTinBaoCao?.DataTable?.TableData;

  return (
    <ReportWrappper>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>{handleRenderTitle(route)}</PageHeader>
        </PageWrap>
        <Box>
          <BoxFilter Step={Step} isLeft={true}>
            {Step === 1 ? (
              <>
                {isAdmin ? (
                  <TreeSelect
                  showSearch
                  treeData={DanhSachCoQuan}
                  onChange={(value) => onFilter(value, 'CoQuanID')}
                  style={{width: 400}}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="Chọn đơn vị"
                  allowClear
                  treeDefaultExpandAll
                  // onChange={value => this.onSearch(value, "CoQuanID")}
                  notFoundContent={'Không có dữ liệu'}
                  treeNodeFilterProp={'title'}
                  // defaultValue={filterData.CoQuanID}
                />
                ) : null}
                <DatePickerFormat
                  style={{width: '200px'}}
                  placeholder="Ngày sử dụng"
                  value={
                    filterData?.NgaySuDung
                      ? dayjs(filterData?.NgaySuDung, 'YYYY/MM/DD')
                      : null
                  }
                  format={'DD/MM/YYYY'}
                  onChange={(value, valueString) => {
                    return onFilter(
                      value ? formatDate(value) : null,
                      'NgaySuDung',
                    );
                  }}
                ></DatePickerFormat>
                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                <Button
                  style={{float: 'right'}}
                  type="primary"
                  disabled={!checkDisabledSave}
                  onClick={handleSaveReport}
                >
                  Lưu báo cáo
                </Button>
              </>
            ) : null}
          </BoxFilter>
          <div
            className="unit-report"
            dangerouslySetInnerHTML={{__html: ThongTinBaoCao?.DonViTinh}}
          ></div>
          <Report
            title={false}
            setThongTinBaoCaoChiTiet={setThongTinBaoCaoChiTiet}
            setListChangeRowReport={setListChangeRowReport}
            ListChangeRowReport={ListChangeRowReport}
            setLoadingDetailsReport={setLoadingDetailsReport}
            ThongTinBaoCaoChiTiet={ThongTinBaoCaoChiTiet}
            DetailsReportPayload={DetailsReportPayload}
            loadingDetailsReport={loadingDetailsReport}
            handleCreateReport={handleCreateReport}
            GetChiTietDonThu={GetChiTietDonThu}
            onRollBack={handleBackReport}
            ThongTinBaoCao={ThongTinBaoCao}
            tableLoading={tableLoading}
            setStep={setStep}
            Step={Step}
            isViewDetail={false}
          />
        </Box>
      </LayoutWrapper>
    </ReportWrappper>
  );
};

const ReportWrappper = styled.div``;

export default KKDLDauKy;
