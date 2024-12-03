import React, { Component, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import actions from "../../../redux/NghiepVu/BanHanhKeHoachTTKT/actions";
import api, { apiUrl } from "./config";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";

import PenIcon from "../../../../components/utility/PenIcon";
import Button from "../../../../components/uielements/button";
import { formatNoiDung, getListYear } from "../../../../helpers/utility";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import { ModalAddEdit } from "./modalAddEdit";
import BreadCrumb from "../Shared/Component/BreadCumb";
import {
  Modal,
  message,
  Input,
  Switch,
  Tooltip,
  Checkbox,
  DatePicke,
} from "antd";
import Select, { Option } from "../../../../components/uielements/select";
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
import { DONVIHANHCHINH, DOANHNGHIEP } from "../../../../settings/constants";
import * as XLSX from "xlsx";
import PenCilIcon2 from "../../../../components/utility/PenCilIcon2";
import PencilIcon from "../../../../components/utility/PencilIcon";
import { useGetApi } from "../../../CustomHook/useGetApi";
import { exportExcel } from "../../../../helpers/utility";
import { styleWrapper } from "./index.styled";
import TableExport from "./TableExport";
const BanHanhKeHoachTTKT = (props) => {
  document.title = "Ban hành kế hoạch thanh tra, kiểm tra";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [loadingDowload, setLoadingDowload] = useState(false);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const [ListAgency, setListAgency] = useState([]);
  const tableRef = useRef();
  const ListFields = useGetApi(apiUrl.listfield);

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
    getListAgency();
    dispatch(
      actions.getList({
        ...filterData,
        NamThanhTra: defaultNamThanhTra,
        DoiTuongTT: defaultDoiTuongTT,
      })
    );
    getListAgency();
  }, [filterData]);

  const ListYear = getListYear();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  // useEffect(() => {
  //   const currentYear = dayjs().year();
  //   setFilterData({ NamThanhTra: currentYear, DoiTuongTT: 1 });
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
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction("add");
  };

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);
    if (action === "add") {
      const formSave = new FormData();
      if (FileData && Array.isArray(FileData)) {
        FileData.forEach((file) => {
          formSave.append("FileUploads", file); // Append each file individually
        });
      } else if (FileData) {
        formSave.append("FileUploads", FileData); // Append single file
      }
      formSave.append("jsonModel", JSON.stringify(data));
      formDataCaller(apiUrl.themBanHanh, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Thêm thành công");
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "edit") {
      const formSave = new FormData();
      formSave.append("jsonModel", JSON.stringify(data));
      if (FileData && Array.isArray(FileData)) {
        FileData.forEach((file) => {
          formSave.append("FileUploads", file); // Append each file individually
        });
      } else if (FileData) {
        formSave.append("FileUploads", FileData); // Append single file
      }

      formDataCaller(apiUrl.suaBanHanh, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Cập nhật thành công");
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const [DoiTuongTT, setDoiTuongTT] = useState(1);
  const showModalEdit = (year) => {
    api
      .chiTietBanHanh(year)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          increaseKey();
          setVisibleModalAddEdit(true);
          setAction("edit");
        } else {
          message.destroy();
          increaseKey();
          setVisibleModalAddEdit(true);
          setAction("add");
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
  };
  const { DanhSachBanHanh, role, DanhSachBanHanhAll } = props;
  // console.log(DanhSachBanHanhAll, "DanhSachBanHanhAll");
  // const columns = [
  //   {
  //     title: 'STT',
  //     dataIndex: 'STT',
  //     width: '5%',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return {
  //           children: <span>{record.STT}.{record.TenCoQuan}</span>,
  //           props: {
  //             colSpan: 8,
  //             style: { background: '#F4F6F9' }
  //           },
  //         };
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Đối tượng thanh tra, kiểm tra',
  //     dataIndex: 'TenCoQuan',
  //     width: '24%',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Nội dung thanh tra, kiểm tra',
  //     dataIndex: 'NoiDung',
  //     width: '24%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Thời gian thanh tra (ngày)',
  //     dataIndex: 'ThoiHanThanhTra',
  //     width: '12%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Thời gian thanh tra',
  //     dataIndex: 'ThoiGianTienHanh',
  //     width: '12%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Đơn vị chủ trì',
  //     dataIndex: 'DonViChuTri',
  //     width: '8%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Đơn vị phối hợp',
  //     dataIndex: 'DonViPhoiHop',
  //     width: '8%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  //   {
  //     title: 'Ghi chú',
  //     dataIndex: 'GhiChu',
  //     width: '7%',
  //     align: 'center',
  //     render: (text, record) => {
  //       if (record.Cap < 4) {
  //         return null;
  //       }
  //       return text;
  //     },
  //   },
  // ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        if (record.Cap !== 4) {
          return {
            children: (
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "15px",
                }}
              >
                {record.STT}. {record.TenCoQuan}
              </p>
            ),
            props: {
              colSpan: 11,
              style: {
                backgroundColor:
                  record.Cap <= 2 ? "#f0f0f0" : record.Cap === 3 ? "#fff" : "",
              },
            },
          };
        }
        return <p style={{ textAlign: "center" }}>{record.STT}</p>;
      },
    },
    {
      title: "Đối tượng thanh tra, kiểm tra",
      dataIndex: "TenCoQuan",
      key: "TenCoQuan",
      width: "18%",
      render: (text, record) => {
        if (record.Cap !== 4) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return handleRenderNameSplit(text);
      },
    },
    {
      title: "Nội dung thanh tra, kiểm tra",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "30%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      key: "LinhVuc",
      width: "10%",

      render: (text, record) => {
        if (record.Cap !== 4) {
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
      key: "ThoiHanThanhTra",
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Đơn vị chủ trì",
      dataIndex: "DonViChuTri",
      key: "DonViChuTri",
      align: "center",
      width: "15%",
      render: (text, record) => {
        if (record.Cap !== 4) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <p type="primary" size="small">
            {text}
          </p>
        );
      },
    },
    {
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      width: "14%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Trạng thái thực hiện",
      dataIndex: "TrangThaiThucHien",
      key: "TrangThaiThucHien",
      width: "10%",

      render: (text, record) => {
        if (record.Cap !== 4) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return handleRenderNameSplit(text);
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      key: "GhiChu",
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
  ];
  const handleRenderNameSplit = (text) => {
    if (text) {
      return text.split("|").map((item, index) => (
        <React.Fragment key={index}>
          {item.includes("-") ? (
            <>
              {item.includes("*") ? (
                <>
                  <span style={{ display: "none" }}>{item.split("*")[0]}</span>
                  <strong>{item.split("*")[1].split("-")[0].trim()}</strong>
                  {" - " +
                    item.split("*")[1].split("-").slice(1).join("-").trim()}
                </>
              ) : (
                <>
                  <strong>{item.split("-")[0].trim()}</strong>
                  {" - " + item.split("-").slice(1).join("-").trim()}
                </>
              )}
            </>
          ) : (
            item
          )}
          {index < text.split("|").length - 1 && <br />}
        </React.Fragment>
      ));
    }
  };
  const { FileLimit } = props;
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selected, setSelected] = useState(defaultDoiTuongTT);
  const handleClick = (id) => {
    setSelected(id);
  };
  const prepareData = () => {
    return (
      DanhSachBanHanhAll &&
      DanhSachBanHanhAll?.map((record) => {
        if (record.Cap < 4) {
          return [
            `${record.STT}.${record.TenCoQuan}`,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ];
        } else {
          return [
            record.STT,
            record.TenCoQuan,
            record.NoiDung,
            record.ThoiHanThanhTra,
            record.ThoiGianTienHanh,
            record.DonViChuTri,
            record.DonViPhoiHop,
            record.GhiChu,
          ];
        }
      })
    );
  };
  const exportToExcel = () => {
    setLoadingDowload(true);
    try {
      exportExcel(
        tableRef.current.innerHTML,
        "Tổng hợp rà soát chồng chéo kế hoạch",
        styleWrapper
      );
      setLoadingDowload(false);
    } catch (error) {
      setLoadingDowload(false);
      message.destroy();
      message.error(error.toString());
    }
    // const dataToExport = prepareData();
    // const header = [
    //   [
    //     "STT",
    //     "Đối tượng thanh tra, kiểm tra",
    //     "Nội dung thanh tra, kiểm tra",
    //     "Thời hạn thanh tra (ngày)",
    //     "Thời gian triển khai thanh tra",
    //     "Đơn vị chủ trì",
    //     "Đơn vị phối hợp",
    //     "Ghi chú",
    //   ],
    // ];
    // const worksheetData = header.concat(dataToExport);
    // const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "DataSheet");
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });
    // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    // saveAs(blob, "DanhSachBanHanh.xlsx");
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />{" "}
        <div className="filter-right">
          <Button
            type="add"
            icon={<PencilIcon />}
            onClick={() => {
              showModalEdit(defaultNamThanhTra);
            }}
          >
            Ban hành quyết định
          </Button>
          <Button
            type="add"
            icon={<CloudDownloadIcon />}
            onClick={exportToExcel}
          >
            Tải danh sách
          </Button>
        </div>
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
            placeholder="Đơn vị chủ trì"
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
        </div>
      </PageAction>
      <Box>
        <div
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "18.75px",
            textAlign: "left",
          }}
        >
          Danh sách các cuộc thanh tra được phê duyệt năm {defaultNamThanhTra}
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
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                fontSize: "16px",
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
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                fontSize: "16px",
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
            dataSource={DanhSachBanHanh}
            loading={props.TableLoading}
            onChange={onTableChange}
            pagination={false}
          />
        </div>
      </Box>
      <TableExport
        data={[...DanhSachBanHanhAll]}
        excelRef={tableRef}
        year={defaultNamThanhTra}
        DoiTuongTT={defaultDoiTuongTT}
        onRemove={handleRenderNameSplit}
        ListFields={ListFields}
      />
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        DanhSachBanHanh={DanhSachBanHanh}
        key={modalKey}
        filterData={filterData}
        FileLimit={FileLimit}
        action={action}
        defaultNamThanhTra={defaultNamThanhTra}
        setDoiTuongTT={setDoiTuongTT}
        DoiTuongTT={DoiTuongTT}
      />
    </LayoutWrapper>
  );
};
function mapStateToProps(state) {
  return {
    ...state.BanHanhKeHoachTTKT,
    FileLimit: getConfigLocal("fileLimit", 10),
  };
}
export default connect(mapStateToProps, actions)(BanHanhKeHoachTTKT);
