import { Modal, Table, Tooltip, message, Button } from "antd"; // Ensure Button and Select are imported correctly
import actions from "../../redux/DashBoard/action";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import PageHeader from "../../../components/utility/pageHeader";
import PageAction from "../../../components/utility/pageAction";
import Box from "../../../components/utility/box";
import { Select } from "../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
} from "../../../helpers/utility";
import { useKey } from "../../CustomHook/useKey";
import queryString from "query-string";
import { getListYear } from "../../../helpers/utility";
import { Card, Col, Row } from "antd";
import dayjs from "dayjs";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  TYPEKEHOACH,
} from "../../../settings/constants";
import BreadCrumb from "../NghiepVu/Shared/Component/BreadCumb";
// import { float } from "html2canvas/dist/types/css/property-descriptors/float";

const DashBoard = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [activeButton, setActiveButton] = useState("plan"); // State to track active button
  document.title = "DASBOARD";
  const ListYear = getListYear();
  const dispatch = useDispatch();
  useEffect(() => {
    changeUrlFilter(filterData);
    dispatch(
      actions.getList({
        ...filterData,
        loaiKeHoach: defaultTypeKeHoach,
        namThanhTra: defaultNamThanhTra,
        // DoiTuongTT: defaultDoiTuongTT,
      })
    );
    // props.getList(filterData);
  }, [filterData]);

  // useEffect(() => {
  //   props.getList(filterData);
  // }, []);
  // useEffect(() => {
  //   const currentYear = dayjs().year();
  //   setFilterData({ namThanhTra: currentYear, loaiKeHoach: 0 });
  // }, []);
  const onFilter = (value, property) => {
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  const { DanhSachDashBoard, TotalRow, role } = props;
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType); // Update active button state
  };

  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultTypeKeHoach = filterData?.loaiKeHoach
    ? Number(filterData?.loaiKeHoach)
    : TYPEKEHOACH;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;

  // Card data for "Theo kế hoạch"
  const planCardData = [
    {
      title: `HÀNH CHÍNH, SỰ NGHIỆP NĂM ${defaultNamThanhTra}`,
      value: DanhSachDashBoard?.TongSoCuocDVHC, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ThucHienDonViHC} cuộc đã tạo theo kế hoạch`,
    },
    {
      title: `DOANH NGHIỆP NĂM  ${defaultNamThanhTra}`,
      value: DanhSachDashBoard?.TongSoCuocDVDN, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ThucHienDonViDN} cuộc đã tạo theo kế hoạch`,
    },
    {
      title: "CHƯA THỰC HIỆN",
      value: DanhSachDashBoard?.TongChoTienHanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ChoTienHanhDN} doanh nghiệp, ${DanhSachDashBoard?.ChoTienHanhHC} đơn vị hành chính`,
    },
    {
      title: "ĐANG TIẾN HÀNH",
      value: DanhSachDashBoard?.TongDangTienHanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DangTienHanhHC} doanh nghiệp, ${DanhSachDashBoard?.DangTienHanhDN} đơn vị hành chính `,
    },
    {
      title: "ĐÃ KẾT THÚC",
      value: DanhSachDashBoard?.TongDaKetThuc, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DaKetThucDN} doanh nghiệp, ${DanhSachDashBoard?.DaKetThucHC} đơn vị hành chính`,
    },
    {
      title: "ĐÃ HOÀN THÀNH",
      value: DanhSachDashBoard?.TongDaHoanThanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DaHoanThanhDN} doanh nghiệp, ${DanhSachDashBoard?.DaHoanThanhHC} đơn vị hành chính`,
    },
  ];

  // Card data for "Đột xuất"
  const emergencyCardData = [
    {
      title: `HÀNH CHÍNH, SỰ NGHIỆP NĂM  ${defaultNamThanhTra}`,
      value: DanhSachDashBoard?.TongSoCuocDVHC, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ThucHienDonViHC} cuộc đã tạo theo đột xuất`,
    },
    {
      title: `DOANH NGHIỆP NĂM  ${defaultNamThanhTra}`,
      value: DanhSachDashBoard?.TongSoCuocDVDN, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ThucHienDonViDN} cuộc đã tạo theo đột xuất`,
    },
    {
      title: "CHƯA THỰC HIỆN",
      value: DanhSachDashBoard?.TongChoTienHanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.ChoTienHanhDN} doanh nghiệp, ${DanhSachDashBoard?.ChoTienHanhHC} đơn vị hành chính`,
    },
    {
      title: "ĐANG TIẾN HÀNH",
      value: DanhSachDashBoard?.TongDangTienHanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DangTienHanhHC} doanh nghiệp, ${DanhSachDashBoard?.DangTienHanhDN} đơn vị hành chính `,
    },
    {
      title: "ĐÃ KẾT THÚC",
      value: DanhSachDashBoard?.TongDaKetThuc, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DaKetThucDN} doanh nghiệp, ${DanhSachDashBoard?.DaKetThucHC} đơn vị hành chính`,
    },
    {
      title: "ĐÃ HOÀN THÀNH",
      value: DanhSachDashBoard?.TongDaHoanThanh, // Ensure this is the correct value
      description: `${DanhSachDashBoard?.DaHoanThanhDN} doanh nghiệp, ${DanhSachDashBoard?.DaHoanThanhHC} đơn vị hành chính`,
    },
  ];

  // Choose the card data based on the active button
  const cardData = activeButton === "plan" ? planCardData : emergencyCardData;
  // (function (H) {
  //   H.seriesTypes.pie.prototype.animate = function (init) {
  //     const series = this,
  //       chart = series.chart,
  //       points = series.points,
  //       { animation } = series.options,
  //       { startAngleRad } = series;

  //     function fanAnimate(point, startAngleRad) {
  //       const graphic = point.graphic,
  //         args = point.shapeArgs;

  //       if (graphic && args) {
  //         graphic
  //           .attr({ start: startAngleRad, end: startAngleRad, opacity: 1 })
  //           .animate(
  //             { start: args.start, end: args.end },
  //             {
  //               duration: animation.duration / points.length,
  //             },
  //             function () {
  //               if (points[point.index + 1]) {
  //                 fanAnimate(points[point.index + 1], args.end);
  //               }
  //               if (point.index === series.points.length - 1) {
  //                 series.dataLabelsGroup.animate(
  //                   { opacity: 1 },
  //                   void 0,
  //                   function () {
  //                     points.forEach((point) => {
  //                       point.opacity = 1;
  //                     });
  //                     series.update({ enableMouseTracking: true }, false);
  //                     chart.update({
  //                       plotOptions: {
  //                         pie: { innerSize: "40%", borderRadius: 8 },
  //                       },
  //                     });
  //                   }
  //                 );
  //               }
  //             }
  //           );
  //       }
  //     }

  //     if (init) {
  //       points.forEach((point) => {
  //         point.opacity = 0;
  //       });
  //     } else {
  //       fanAnimate(points[0], startAngleRad);
  //     }
  //   };
  // })(Highcharts);
  (function (H) {
    H.seriesTypes.pie.prototype.animate = function (init) {
      const series = this,
        chart = series.chart,
        points = series.points,
        { animation } = series.options,
        { startAngleRad } = series;

      function fanAnimate(point, startAngleRad) {
        const graphic = point.graphic,
          args = point.shapeArgs;

        // Kiểm tra xem graphic và args có tồn tại không
        if (graphic && args) {
          graphic
            .attr({ start: startAngleRad, end: startAngleRad, opacity: 1 })
            .animate(
              { start: args.start, end: args.end },
              {
                duration: animation.duration / points.length,
              },
              function () {
                if (points[point.index + 1]) {
                  fanAnimate(points[point.index + 1], args.end);
                }
                if (point.index === series.points.length - 1) {
                  series.dataLabelsGroup.animate(
                    { opacity: 1 },
                    void 0,
                    function () {
                      points.forEach((point) => {
                        point.opacity = 1;
                      });
                      series.update({ enableMouseTracking: true }, false);
                      chart.update({
                        plotOptions: {
                          pie: { innerSize: "40%", borderRadius: 8 },
                        },
                      });
                    }
                  );
                }
              }
            );
        }
      }

      if (init) {
        points.forEach((point) => {
          point.opacity = 0;
        });
      } else {
        // Kiểm tra xem điểm đầu tiên có tồn tại không
        if (points[0]) {
          fanAnimate(points[0], startAngleRad);
        }
      }
    };
  })(Highcharts);
  const chartOptions = {
    chart: {
      type: "pie",
    },
    credits: {
      // Disable credits
      enabled: false,
    },
    title: {
      text: null, // Set title to null to remove it
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            style: {
              fontSize: "1em", // Increased font size
              fontWeight: "bold", // Ensure bold text
              color: "#000000", // Set text color
            },
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name:
          DanhSachDashBoard?.TongSoCuocDVHC === 0 &&
          DanhSachDashBoard?.TongSoCuocDVDN === 0
            ? "Dữ liệu trống" // Hiển thị tên mặc định nếu không có dữ liệu
            : "Số cuộc",
        colorByPoint: true,
        // data: [
        //   { name: 'Hành chính sự nghiệp', y: DanhSachDashBoard?.ThucHienDonViHC }, // Updated to use ThucHienDonViHC
        //   { name: 'Doanh nghiệp', y: DanhSachDashBoard?.ThucHienDonViDN } // Updated to use ThucHienDonViDN
        // ]
        data: [
          ...(DanhSachDashBoard?.TongSoCuocDVHC === 0 &&
          DanhSachDashBoard?.TongSoCuocDVDN === 0
            ? [{ name: "Dữ liệu trống!", y: 2, color: "#DCDBDB" }]
            : [
                {
                  name: "Hành chính sự nghiệp",
                  y: DanhSachDashBoard?.TongSoCuocDVHC,
                }, // Updated to use ThucHienDonViHC
                { name: "Doanh nghiệp", y: DanhSachDashBoard?.TongSoCuocDVDN }, // Updated to use ThucHienDonViDN
              ]),
        ],
      },
    ],
  };
  const chartOptions2 = {
    chart: {
      type: "pie",
    },
    credits: {
      // Disable credits
      enabled: false,
    },
    title: {
      text: null, // Set title to null to remove it
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            style: {
              fontSize: "1em", // Increased font size
              fontWeight: "bold", // Ensure bold text
              color: "#000000", // Set text color
            },
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name:
          DanhSachDashBoard?.TongChoTienHanh === 0 &&
          DanhSachDashBoard?.TongDangTienHanh === 0 &&
          DanhSachDashBoard?.TongDaKetThuc === 0 &&
          DanhSachDashBoard?.TongDaHoanThanh === 0
            ? "Dữ liệu trống" // Hiển thị tên mặc định nếu không có dữ liệu
            : "Số cuộc", // Tên mặc định khi có dữ liệu
        colorByPoint: true,
        data: [
          ...(DanhSachDashBoard?.TongChoTienHanh === 0 &&
          DanhSachDashBoard?.TongDangTienHanh === 0 &&
          DanhSachDashBoard?.TongDaKetThuc === 0 &&
          DanhSachDashBoard?.TongDaHoanThanh === 0
            ? [
                {
                  name: "Dữ liệu trống!",
                  y: 4,
                  color: "#DCDBDB",
                  enableMouseTracking: false,
                },
              ] // Disable mouse tracking for empty data
            : [
                ...(DanhSachDashBoard?.TongChoTienHanh > 0
                  ? [
                      {
                        name: "Chưa thực hiện",
                        y: DanhSachDashBoard?.TongChoTienHanh,
                        color: "#F39C11",
                      },
                    ]
                  : []),
                ...(DanhSachDashBoard?.TongDangTienHanh > 0
                  ? [
                      {
                        name: "Đang tiến hành",
                        y: DanhSachDashBoard?.TongDangTienHanh,
                        color: "#2BAD3A",
                      },
                    ]
                  : []),
                ...(DanhSachDashBoard?.TongDaKetThuc > 0
                  ? [
                      {
                        name: "Đã kết thúc",
                        y: DanhSachDashBoard?.TongDaKetThuc,
                        color: "#0073B6",
                      },
                    ]
                  : []),
                ...(DanhSachDashBoard?.TongDaHoanThanh > 0
                  ? [
                      {
                        name: "Đã hoàn thành",
                        y: DanhSachDashBoard?.TongDaHoanThanh,
                        color: "#E34D4D",
                      },
                    ]
                  : []),
              ]),
        ],
      },
    ],
  };
  return (
    <LayoutWrapper>
      <PageAction className="filter-action">
        <div className="filter-left2">
          <Select
            placeholder="Chọn năm"
            allowClear={false}
            value={defaultNamThanhTra}
            onChange={(value) => onFilter(value, "NamThanhTra")}
            style={{ width: 120 }}
          >
            {getListYear().map((year) => (
              <Option key={year.id} value={year.id}>
                {year.name}
              </Option>
            ))}
          </Select>
          <Button
            type={activeButton === "plan" ? "primary" : "default"}
            style={{ marginLeft: 20, width: 130, fontSize: "16px" }}
            onClick={() => {
              handleButtonClick("plan");
              onFilter(0, "loaiKeHoach"); // Set value to 0 for 'plan'
            }}
          >
            Theo kế hoạch
          </Button>
          <Button
            type={activeButton === "emergency" ? "primary" : "default"}
            style={{ width: 130, fontSize: "16px" }}
            onClick={() => {
              handleButtonClick("emergency");
              onFilter(2, "loaiKeHoach"); // Set value to 2 for 'emergency'
            }}
          >
            Đột xuất
          </Button>
        </div>
        <div style={{ float: "left" }}></div>
      </PageAction>
      <Box style={{ marginTop: "10px" }}>
        <Row gutter={16}>
          <Col span={6}>
            {" "}
            {/* 2 cards in the first row */}
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#FFF2F2",
                    }}
                  >
                    {cardData[0].title}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#FFF2F2",
                    }}
                  >
                    {cardData[0].value}
                  </span>
                </div>
              }
              bordered={false}
              style={{
                marginBottom: 16,
                backgroundColor: "#1D8BAA",
                borderRadius: "8px",
                height: "80%", // Adjusted height
                width: "100%", // Ensure full width
              }}
            >
              <p
                style={{
                  fontStyle: "Roboto",
                  color: "#FFF2F2",
                  fontSize: "18px",
                }}
              >
                {cardData[0].description}
              </p>
            </Card>
          </Col>
          <Col span={6}>
            {" "}
            {/* 2nd card in the first row */}
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#FFF2F2",
                    }}
                  >
                    {cardData[1].title}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#FFF2F2",
                    }}
                  >
                    {cardData[1].value}
                  </span>
                </div>
              }
              bordered={false}
              style={{
                marginBottom: 16,
                backgroundColor: "#1D8BAA",
                borderRadius: "8px",
                height: "80%", // Adjusted height
                width: "100%", // Ensure full width
              }}
            >
              <p
                style={{
                  fontStyle: "Roboto",
                  color: "#FFF2F2",
                  fontSize: "18px",
                }}
              >
                {cardData[1].description}
              </p>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          {/* Second Row with 4 Cards */}
          {cardData.slice(2, 6).map((card, index) => (
            <Col span={6} key={index}>
              {" "}
              {/* 4 cards in the second row */}
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#FFF2F2",
                      }}
                    >
                      {card.title}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#FFF2F2",
                      }}
                    >
                      {card.value}
                    </span>
                  </div>
                }
                bordered={false}
                style={{
                  marginBottom: 16,
                  backgroundColor:
                    index === 0
                      ? "#F39C11"
                      : index === 1
                      ? "#2BAD3A"
                      : index === 2
                      ? "#0073B6"
                      : "#E34D4D",
                  borderRadius: "8px",
                  height: "80%", // Adjusted height
                  width: "100%", // Ensure full width
                }}
              >
                <p
                  style={{
                    fontStyle: "Roboto",
                    color: "#FFF2F2",
                    fontSize: "18px",
                  }}
                >
                  {card.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Col>
          <Col span={12}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions2} />
          </Col>
        </Row>
      </Box>
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DashBoard,
    role: getRoleByKey(state.Auth.role, "danh-muc-DashBoard"),
  };
}

export default connect(mapStateToProps, actions)(DashBoard);
