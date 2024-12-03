import React, { useEffect, useLayoutEffect, useState } from "react";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import Report from "../ReportOrigin";
import { Checkbox, DatePicker as DatePickerAnt, message } from "antd";
import { Button } from "../../../../components/uielements/exportComponent";
import actions from "../../../redux/BaoCao/BaoCaoChung/action";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import {
  changeUrlFilter,
  formatDate,
  getFilterData,
  getLocalKey,
} from "../../../../helpers/utility";
import moment from "moment";
import styled from "styled-components";
import api from "./config";
import FilterTime from "../../NghiepVu/Shared/Component/BoxFilterTime";
import PageWrap from "../../../../components/utility/PageWrap";
import { CapID } from "../../../../settings/constants";
import { saveAs } from "file-saver";
import axios from "axios";
import { apiUrl } from "./config";
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
const KKDLDauKy = (props) => {
  const handleRenderTitle = (route) => {
    switch (route) {
      case "bc-kq-thkl-tt-hc":
        return "B02 - Tổng hợp kết quả thực hiện kết luận thanh tra hành chính";
      case "bc-kq-tt-hc-xd":
        return "B03 - THKQ TT hành chính trong lĩnh vực Xây dựng cơ bản";
      case "bc-kq-tt-hc-tcns":
        return "B04 - THKQ TT hành chính trong lĩnh vực Tài chính - Ngân sách";
      case "bc-kq-tt-hc-dd":
        return "B05 - THKQ TT hành chính trong lĩnh vực Đất đai";
      case "bc-kq-tt-kt-cn":
        return "B06 - Tổng hợp kết quả thanh tra, kiểm tra chuyên ngành";
      case "bc-kq-thkl-dq-xp":
        return "B07 - THKQ thực hiện KL, QĐ xử phạt qua thanh tra chuyên ngành";
      case "bc-kq-tt-hc":
        return "B01 - Tổng hợp kết quả thanh tra hành chính";
      case "tk-th-tt-kt":
        return "Thống kê tình hình thanh tra, kiểm tra";
      default:
        break;
    }
  };

  const route = props.location.pathname.slice(
    props.location.pathname.lastIndexOf("/") + 1
  );

  document.title = handleRenderTitle(route);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );

  const [Step, setStep] = useState(1);
  const { ThongTinBaoCao, tableLoading } = useSelector(
    (state) => state.BaoCaoChung
  );

  const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState([]);
  const [loadingDetailsReport, setLoadingDetailsReport] = useState(false);
  const [MaxLevel, setMaxLevel] = useState(2);
  const [DetailsReportPayload, setDetailsReportPayload] = useState({});
  const [ListChangeRowReport, setListChangeRowReport] = useState([]);
  const [LoaiKhieuToID, setLoaiKhieuToID] = useState(null);
  const [defaultSelectValue, setDefaultSelectValue] = useState([]);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [dataExport, setDataExport] = useState({
    CoQuanID: 0,
    CapID: 0,
    Index: 0,
  });

  let ListCapIDStr = "";
  if (
    typeof filterData?.ListCapIDStr !== "string" &&
    filterData?.ListCapIDStr
  ) {
    filterData.ListCapIDStr.forEach((item, index) => {
      index === filterData.ListCapIDStr.length - 1
        ? (ListCapIDStr += item)
        : (ListCapIDStr += item + ",");
    });
  } else {
    ListCapIDStr = filterData.ListCapIDStr;
  }
  const checkSo = ListCapIDStr ? ListCapIDStr?.includes("1") : false;
  const checkHuyen = ListCapIDStr ? ListCapIDStr?.includes("2") : false;

  const disabledExportReport = !ThongTinBaoCao?.DataTable;

  const dispatch = useDispatch();
  const user = getLocalKey("user", {});

  useEffect(() => {
    const Type = handleCheckTypeReport(route);
    const firstDayOfCurrentMonth = moment()
      ?.startOf("month")
      ?.format("YYYY/MM/DD");
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
        : moment().format("YYYY/MM/DD"),
      ListCapIDStr: ListCap,
    };
    onChangeFilterCap(ListCap);
    setFilterData(initFilter);
  }, []);

  const onChangeFilterCap = (value) => {
    if (value) {
      let newDefaultSelectValue;
      if (typeof value === "string") {
        newDefaultSelectValue = value.split(",")?.map((item) => Number(item));
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
    const DenNgay = filterData?.DenNgay ? formatDate(filterData?.DenNgay) : "";
    const NgaySuDung = filterData?.NgaySuDung
      ? formatDate(filterData?.NgaySuDung)
      : "";
    const TuNgay = filterData?.TuNgay ? formatDate(filterData?.TuNgay) : "";

    const { CoQuanID, CapID, Index } = dataExport;
    const data = {
      ...filterData,
      checkSo,
      checkHuyen,
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
          const a = document.createElement("a");
          a.href = res.data.Data;
          a.target = "_blank";
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

  const handleExportExcel = async (type) => {
    const Type = handleCheckTypeReport(route);

    const data = {
      ...filterData,
      checkSo,
      checkHuyen,
      Type,
    };

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(apiUrl.exportexcel, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          ...data,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(
          blob,
          ThongTinBaoCao?.Title ? ThongTinBaoCao?.Title : "Báo cáo.xlsx"
        );
        setLoadingDownload(false);
      } else {
        message.destroy();
        message.error("Có lỗi khi tải file");
      }
    } catch (error) {
      setLoadingDownload(false);
      message.destroy();
      message.error(error.toString());
    }

    // api
    //   .ExportExcel(data)
    //   .then((res) => {
    //     if (res.data.Status > 0) {
    //       const a = document.createElement("a");
    //       a.href = res.data.Data;
    //       a.target = "_blank";
    //       a.click();
    //     } else {
    //       message.destroy();
    //       message.warning(res.data.Message);
    //     }
    //   })
    //   .catch((err) => {
    //     message.destroy();
    //     message.warning(err.toString());
    //   });
  };

  const handleCheckTypeReport = (route) => {
    switch (route) {
      case "bc-kq-thkl-tt-hc":
        return 1;
      case "bc-kq-tt-hc-xd":
        return 3;
      case "bc-kq-tt-hc-tcns":
        return 4;
      case "bc-kq-tt-hc-dd":
        return 5;
      case "bc-kq-tt-kt-cn":
        return 6;
      case "bc-kq-thkl-dq-xp":
        return 7;
      case "bc-kq-tt-hc":
        return 2;
      case "tk-th-tt-kt":
        return 8;
      default:
        break;
    }
  };
  const handleRenderFilterForType = (route) => {
    const dataConfig = getLocalKey("data_config");
    const user = getLocalKey("user");
    const ThanhTraIDS = dataConfig?.THANHTRATINH_IDS;
    const checkThanhTraTinh = Number(user?.CoQuanChaID) === Number(ThanhTraIDS);
    return (
      <>
        {checkThanhTraTinh ? (
          <Checkbox.Group
            onChange={(value) => {
              onFilter(value, "ListCapIDStr");
              onChangeFilterCap(value);
            }}
            value={defaultSelectValue}
          >
            <Checkbox value={1}>Sở</Checkbox>
            <Checkbox value={2}>Huyện</Checkbox>
          </Checkbox.Group>
        ) : null}
        <FilterTime onFilter={onFilter} filterData={filterData} />
        <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
        <Button
          onClick={handleExportExcel}
          disabled={disabledExportReport}
          loading={loadingDownload}
        >
          Xuất Báo Cáo
        </Button>
      </>
    );
  };

  useLayoutEffect(() => {
    dispatch(actions.clearData());
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newfilterData);
  };

  const handleCreateReport = () => {
    dispatch(
      actions.getData({
        ...filterData,
        checkSo,
        checkHuyen,
      })
    );
  };

  const GetChiTietDonThu = async (
    CapID,
    Index,
    CoQuanID,
    key,
    PageNumber,
    LoaiKhieuTo,
    newStep
  ) => {
    if (LoaiKhieuTo) {
      setLoaiKhieuToID(LoaiKhieuTo);
    }
    setDataExport((prevData) => ({ ...prevData, CoQuanID, CapID, Index }));

    const Type = handleCheckTypeReport(route);
    const DenNgay = filterData?.DenNgay ? formatDate(filterData?.DenNgay) : "";
    const NgaySuDung = filterData?.NgaySuDung
      ? formatDate(filterData?.NgaySuDung)
      : "";
    const TuNgay = filterData?.TuNgay ? formatDate(filterData?.TuNgay) : "";
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
      checkSo,
      checkHuyen,
      CapBaoCao: newStep,
      PageNumber: PageNumber ? PageNumber : 1,
    };
    const payload = {
      ...filterData,
      ...dataFilter,
    };
    if (key === "set") {
      setLoadingDetailsReport(true);
      const CallApi =
        MaxLevel === newStep
          ? api.ChiTietDonThu(payload)
          : api.ThongTinBaoCao(payload);
      CallApi.then((res) => {
        setLoadingDetailsReport(false);
        if (res.data.Status > 0) {
          const data = { ...res.data.Data };
          const newThongTinBaoCaoChiTiet = [...ThongTinBaoCaoChiTiet];
          newThongTinBaoCaoChiTiet.push({ Step: newStep, Data: data });
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
    } else if (key === "get") {
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
    return key === "get" ? data : [];
  };

  const handleBackReport = () => {
    const ThongTinBaoCao = [...ThongTinBaoCaoChiTiet];
    const newThongTinBaoCaoChiTiet = ThongTinBaoCao.filter(
      (item) => item.Step !== Step
    );
    setThongTinBaoCaoChiTiet(newThongTinBaoCaoChiTiet);
    setStep(Step - 1);
  };

  const CurrentThongTinBaoCao = ThongTinBaoCaoChiTiet.find(
    (item) => item?.Step === Step
  )?.Data;

  return (
    <ReportWrappper>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>
            <BreadCrumb />
          </PageHeader>
        </PageWrap>
        <Box>
          {Step === 1 ? (
            <BoxFilter Step={Step} isLeft={true}>
              {handleRenderFilterForType(route)}
            </BoxFilter>
          ) : null}
          <div
            className="unit-report"
            dangerouslySetInnerHTML={{ __html: ThongTinBaoCao?.DonViTinh }}
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
