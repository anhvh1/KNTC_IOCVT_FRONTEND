import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import actions from "../../../redux/NghiepVu/PhanCongSoTheoDoi/actions";
import api, { apiUrl } from "./config";
import {
  formatNoiDung,
  getListYear,
  renderTrangThaiColor,
} from "../../../../helpers/utility";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import {
  Modal,
  Space,
  message,
  Input,
  Switch,
  Tooltip,
  Checkbox,
  DatePicker,
  Radio,
} from "antd";
import Select, { Option } from "../../../../components/uielements/select";
import ModalHuyCuoc from "./modalHuyCuoc";
import { convertToRoman } from "../../../../helpers/utility";
import AddIcon from "../../../../components/utility/AddIcon";
import EyeIcon from "../../../../components/utility/EyeIcon";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import BreadCrumb from "../Shared/Component/BreadCumb";
import {
  changeUrlFilter,
  getFilterData,
  getConfigLocal,
} from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import { useKey } from "../../../CustomHook/useKey";
import { InputSearch } from "../../../../components/uielements/input";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  TYPEKEHOACH,
} from "../../../../settings/constants";
import * as XLSX from "xlsx";
const PhanCongSoTheoDoi = (props) => {
  document.title = "Phân công theo dõi số liệu xử lý sau TTKT";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleHuyCuoc, setVisibleHuyCuoc] = useState(false);
  const [CuocThanhTraID, setCuocThanhTraID] = useState("");

  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [CanBoIDs, setCanBoIDs] = useState();
  const [action, setAction] = useState("");

  const dispatch = useDispatch();
  const [ListAgency, setListAgency] = useState([]);
  const route = location.pathname.split("/")[2];
  const isTTTrungUong = route === "tao-cuoc-thanh-tra-kiem-tra" ? false : true;

  const ListYear = getListYear();
  const getListAgency = () => {
    api
      .GetListAgency({
        PhanLoai: filterData.DoiTuongTT
          ? Number(filterData.DoiTuongTT)
          : DONVIHANHCHINH,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setListAgency(res.data.Data);
        }
      });
  };
  useEffect(() => {
    dispatch(actions.getInitData());
    dispatch(actionsSidebar.getList());
  }, []);
  useEffect(() => {
    changeUrlFilter(filterData); //change url
    // props.getList(filterData); //get list
    dispatch(
      actions.getList({
        ...filterData,
        TypeKeHoach: defaultTypeKeHoach,
        NamThanhTra: defaultNamThanhTra,
        DoiTuongTT: defaultDoiTuongTT,
      })
    );
    getListAgency();
  }, [filterData]);
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultTypeKeHoach = filterData?.TypeKeHoach
    ? Number(filterData?.TypeKeHoach)
    : TYPEKEHOACH;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  // useEffect(() => {
  //   const currentYear = dayjs().year();
  //   setFilterData({ NamThanhTra: currentYear, DoiTuongTT: 1, TypeKeHoach: 0 });
  // }, []);
  const onFilter = (value, property) => {
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
    if (property === "NamThanhTra") {
      setSelectedYear(value); // Store the selected year
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = { ...filterData };
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setFilterData(newFilterData);
  };
  const [DoiTuongTT, setDoiTuongTT] = useState(1);
  const [TypeKeHoach, setTypeKeHoach] = useState(0);
  const [PhanLoaiThanhTraID1, setPhanLoaiThanhTraID1] = useState({});
  const [PhanLoaiThanhTraID2, setPhanLoaiThanhTraID2] = useState({});
  const showModalEdit = (CuocThanhTraID) => {
    api
      .PhanCongThanhVien(CuocThanhTraID)
      .then((res) => {
        if (res.data.Status > 0) {
          setCanBoIDs(res.data.Data.CanBoIDs);
          increaseKey();
          setVisibleHuyCuoc(true);
          api
            .chiTietTaoCuoc(CuocThanhTraID)
            .then((res) => {
              if (res.data.Status > 0) {
                setDataModalAddEdit(res.data.Data);
                increaseKey();
                setVisibleHuyCuoc(true);
              } else {
                message.destroy();
                increaseKey();
                setVisibleHuyCuoc(true);
              }
            })
            .catch((error) => {
              message.destroy();
              message.error(error.toString());
            });
        } else {
          message.destroy();
          increaseKey();
          setVisibleHuyCuoc(true);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const [DanhSachDoiTuongThanhTra, setDanhSachDoiTuongThanhTra] = useState([]);
  const HuyCuoc = (data) => {
    setConfirmLoading(true);
    api
      .HuyCuoc(data)
      .then((res) => {
        if (res.data.Status > 0) {
          setConfirmLoading(false);
          hideModalAddEdit();
          dispatch(
            actions.getList({
              ...filterData,
              TypeKeHoach: defaultTypeKeHoach,
              NamThanhTra: defaultNamThanhTra,
              DoiTuongTT: defaultDoiTuongTT,
            })
          );
          message.destroy();
          message.success(res.data.Message);
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
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
    setCuocThanhTraID("");
    setDanhSachDoiTuongThanhTra({});
    setVisibleHuyCuoc(false);
    setCanBoIDs({});
  };

  const { DanhSachTaoCuoc, role, ListHinhThuc, ListFields, ListAgencyTw } =
    props;

  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        if (record.isParent) {
          return {
            children: (
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "15px",
                }}
              >
                {record.idx}. {record.TenPhanLoaiThanhTra}
              </p>
            ),
            props: {
              colSpan: columns.length,
              style: { backgroundColor: "#f0f0f0" },
            },
          };
        }
        return <p style={{ textAlign: "center" }}>{record.index + 1}</p>;
      },
    },
    {
      title: "Đối tượng thanh tra, kiểm tra",
      dataIndex: "CoQuanBiThanhTra",
      width: "23%",
      key: "CoQuanBiThanhTra",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text.split("|").map((item, index) => (
          <React.Fragment key={index}>
            {item.includes("-") ? (
              <>
                <strong>{item.split("-")[0].trim()}</strong>
                {" - " + item.split("-").slice(1).join("-").trim()}
              </>
            ) : (
              item
            )}
            {index < text.split("|").length - 1 && <br />}
          </React.Fragment>
        ));
      },
    },
    {
      title: "Nội dung thanh tra, kiểm tra",
      dataIndex: "NoiDung",
      width: "23%",
      key: "NoiDung",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return formatNoiDung(text);
      },
    },
    {
      title: "Lĩnh vực chính",
      dataIndex: "LinhVuc",
      width: "12%",
      key: "LinhVuc",
      align: "center",

      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Lĩnh vực thanh tra",
      dataIndex: "LinhVucPhuIDs",
      key: "LinhVucPhuIDs",
      width: "12%",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }

        return record.LinhVucPhuIDs ? (
          <>
            {record.LinhVucPhuIDs.split(",").map((id) => {
              const data = ListFields.find(
                (item) => item.PhanLoaiThanhTraID === Number(id)
              );
              return data ? <p>{data.TenPhanLoaiThanhTra}</p> : null;
            })}
          </>
        ) : null;
      },
    },
    {
      title: "Thời hạn thanh tra (ngày)",
      dataIndex: "ThoiHanThanhTra",
      width: "12%",
      key: "ThoiHanThanhTra",
      align: "center",

      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Thời gian triển khai thanh tra",
      dataIndex: "ThoiGianTienHanh",
      key: "ThoiGianTienHanh",
      width: "12%",
      align: "center",

      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      width: "11%",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      key: "StateName",
      width: "180px",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return <div className="wrap-state">{renderTrangThaiColor(text)}</div>;
      },
    },
    {
      title: "Thành viên được phân công thực hiện",
      dataIndex: "CanBoThucHien",
      key: "CanBoThucHien",
      width: "12%",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <p type="primary" size="small">
            {text.split("|").map((item, index) => (
              <span key={index}>
                {item}
                <br />
              </span>
            ))}
          </p>
        );
      },
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return renderThaoTac(record);
      },
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        <Tooltip title={"Phân công theo dõi "}>
          <svg
            onClick={() => {
              showModalEdit(record.CuocThanhTraID);
              setCuocThanhTraID(record.CuocThanhTraID);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
          </svg>
        </Tooltip>
      </div>
    );
  };

  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selected, setSelected] = useState(defaultDoiTuongTT);

  const [DoiTuongTTDotXuat, setDoiTuongTTDotXuat] = useState(1);

  const handleClick = (id) => {
    setSelected(id);
  };
  const [stateModalAddInspection, setStateModalAddInspection] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const hideModalAddInspection = () => {
    setDataModalAddEdit({});
    setStateModalAddInspection({
      ...stateModalAddInspection,
      visible: false,

      data: {},
      action: null,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [listHinhThuc, setListHinhThuc] = useState([]);
  const fetchData = async () => {
    try {
      const res = await api.danhSachListHinhThuc(/* Tham số */);
      if (res.data.Status > 0) {
        setListHinhThuc(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };
  // const dataGroup = [...listHinhThuc]
  //   .map((item, index) => {
  //     return {
  //       TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
  //       idx: convertToRoman(index + 1),
  //       children: Array.isArray(DanhSachTaoCuoc)
  //         ? DanhSachTaoCuoc
  //           .filter(
  //             (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
  //           )
  //           .map((item3, index2) => ({
  //             ...item3,
  //             index: index2,
  //           }))
  //         : [], // fallback to empty array if dataModalAddEdit is not an array
  //     };
  //   })
  //   .filter((item) => item?.children?.length > 0);

  // const restructuredData = dataGroup.flatMap((group, index) => {
  //   const uniqueChildren = group.children.reduce((acc, child) => {
  //     const key = JSON.stringify(child);
  //     if (!acc.some(item => JSON.stringify(item) === key)) {
  //       acc.push(child);
  //     }
  //     return acc;
  //   }, []);

  //   return [
  //     { ...group, isParent: true, key: `parent-${index}` },
  //     ...uniqueChildren.map((child, childIndex) => ({
  //       ...child,
  //       isParent: false,
  //       key: `child-${index}-${childIndex}`,
  //     })),
  //   ];
  // });
  const dataGroup = [...listHinhThuc]
    .map((item, index) => {
      return {
        TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
        idx: convertToRoman(index + 1),
        data: DanhSachTaoCuoc
          ? DanhSachTaoCuoc?.filter(
              (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
            ).map((item3, index2) => {
              return {
                ...item3,
                index: index2,
                isParent: false,
                key: `child-${index}-${index2}`,
              };
            })
          : [],
      };
    })
    ?.filter((item) => item?.data?.length > 0);

  const restructuredData =
    dataGroup &&
    dataGroup.flatMap((group, index) => [
      { ...group, isParent: true, key: `parent-${index}` },
      ...group.data,
    ]);
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
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
          <Select
            placeholder="Hình thức"
            mode="multiple"
            style={{ width: 200 }}
            onChange={(value) => onFilter(value, "CoQuanLapID")}
            value={filterData.CoQuanLapID ? filterData.CoQuanLapID : null}
            allowClear
          >
            {ListAgency &&
              ListAgency.map((item) => (
                <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
              ))}
          </Select>
          <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Nhập đối tượng, nội dung để tìm kiếm"
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
          />
          <Radio.Group
            style={{ marginLeft: "50px", marginTop: "5px" }}
            defaultValue={defaultTypeKeHoach === 0 ? "kehoach" : "dotxuat"} // Updated to use defaultTypeKeHoach
            onChange={(e) => {
              const value = e.target.value;
              setTypeKeHoach(value);
              onFilter(value === "kehoach" ? 0 : 2, "TypeKeHoach");
            }}
          >
            <Radio
              value="kehoach"
              style={{ marginRight: "10px", fontSize: "16px" }}
            >
              Theo kế hoạch
            </Radio>
            <Radio value="dotxuat" style={{ fontSize: "16px" }}>
              Đột xuất
            </Radio>
          </Radio.Group>
        </div>
      </PageAction>
      <Box>
        <div
          style={{
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "18.75px",
            textAlign: "left",
          }}
          className="info"
        >
          Danh sách cuộc thanh tra, kiểm tra chính thức
        </div>
        <div style={{ marginTop: "10px" }}>
          <div style={{ display: "flex" }}>
            <div
              onClick={() => {
                handleClick(1);
                onFilter(1, "DoiTuongTT");
              }}
              style={{
                border: "1px solid",
                borderColor: selected === 1 ? "rgb(33, 111, 202)" : "#E5E5E5",
                padding: "10px 0px 10px 0px",
                textAlign: "center",
                width: "230px",
                fontSize: "16px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                backgroundColor:
                  selected === 1 ? "rgb(33, 111, 202)" : "transparent",
                fontWeight: selected === 1 ? 500 : 400,
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
                color: selected === 1 ? "white" : "#000000",
              }}
            >
              Đơn vị hành chính, sự nghiệp
            </div>
            <div
              onClick={() => {
                handleClick(2);
                onFilter(2, "DoiTuongTT");
              }}
              style={{
                border: "1px solid",
                borderColor: selected === 2 ? "rgb(33, 111, 202)" : "#E5E5E5",
                padding: "10px 0px 10px 0px",
                textAlign: "center",
                width: "230px",
                fontSize: "16px",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                backgroundColor:
                  selected === 2 ? "rgb(33, 111, 202)" : "transparent",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
                color: selected === 2 ? "white" : "#000000",
                fontWeight: selected === 2 ? 500 : 400,
              }}
            >
              Doanh Nghiệp
            </div>
          </div>
          <BoxTable
            columns={columns}
            dataSource={restructuredData}
            loading={props.TableLoading}
            onChange={onTableChange}
            pagination={false}
          />
        </div>
      </Box>
      <ModalHuyCuoc
        confirmLoading={confirmLoading}
        visible={visibleHuyCuoc}
        onCancel={hideModalAddEdit}
        onCreate={HuyCuoc}
        key={modalKey}
        CuocThanhTraID={CuocThanhTraID}
        action={action}
        selectedYear={selectedYear}
        dataModalAddEdit={dataModalAddEdit}
        CanBoIDs={CanBoIDs}
      />
    </LayoutWrapper>
  );
};
function mapStateToProps(state) {
  return {
    ...state.PhanCongSoTheoDoi,
    FileLimit: getConfigLocal("fileLimit", 10),
  };
}
export default connect(mapStateToProps, actions)(PhanCongSoTheoDoi);
