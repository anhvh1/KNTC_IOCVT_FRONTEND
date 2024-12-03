import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import {
  Row,
  Col,
  Typography,
  Space,
  Form as FormAntd,
  Input as InputAntd,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  SendOutlined,
  CloseSquareFilled,
} from "@ant-design/icons";
import moment from "moment";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import { Modal as ModalAnt } from "antd";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import { REQUIRED } from "../../../../settings/constants";
const { TextArea } = InputAntd;
const { Title } = Typography;
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import styled from "styled-components";
import VectorFly from "../../../../image/VectorFly.png";
import api from "./config";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import TableCheck from "./TableCheck";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { useRef } from "react";
import { EditOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import { Checkbox } from "antd";
import { WrapperModalCheck, styleExportExcel } from "./index.styled";
import { exportExcel } from "../../../../helpers/utility";
import { getListYear } from "../../../../helpers/utility";
import EditIcon from "../../../../components/utility/EditIcon";
import { styleWrapper } from "./index.styled";
import { printComponent } from "../../../../helpers/utility";
const ModalCheck = ({
  visible,
  onCancel,
  onCreate,
  ListHinhThuc,
  action,
  ListAgency,
  onSplit,
  dataEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const [ListDataCheck, setListDataCheck] = useState([]);
  const [filterData, setFilterData] = useState({
    NamThanhTra: null,
    CoQuanLapID: null,
    Keyword: null,
    DoiTuongTT: "1",
    checked: [1],
  });
  const ListYear = getListYear();
  const excelRef = useRef(null);
  const [datakey, setDataKey] = useState(1);
  const isCheck = action === "check";
  const isShowResult = action === "showresult";
  const [isChanged, setisChanged] = useState(false);
  const NamThanhTra = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultNamThanhTra = filterData.NamThanhTra
    ? filterData.NamThanhTra
    : NamThanhTra;
  const checkIsView = dataEdit.isView;

  useEffect(() => {
    const { checked } = filterData;
    setLoading(true);
    if (isCheck) {
      api
        .GetListCheck({
          ...filterData,
          NamThanhTra: defaultNamThanhTra,
          CheckNoiDung: checked.includes(2),
          CheckThoiKyThanhTra: checked.includes(3),
          CheckThoiGianThanhTra: checked.includes(4),
        })
        .then((res) => {
          if (res.data.Status > 0) {
            setLoading(false);
            setListDataCheck(res.data.Data);
            setDataKey((prevKey) => prevKey + 1);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        });
    } else {
      api
        .GetViewResult({
          ...filterData,
          NamThanhTra: defaultNamThanhTra,
        })
        .then((res) => {
          if (res.data.Status > 0) {
            setLoading(false);
            setListDataCheck(res.data.Data);
            setDataKey((prevKey) => prevKey + 1);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        });
    }
  }, [filterData]);

  const dowloadListCheck = () => {
    if (excelRef.current.innerHTML) {
      let innerHTML = excelRef.current.innerHTML;

      // Remove elements with classes ant-checkbox-wrapper, hightlight-count
      innerHTML = innerHTML.replace(
        /<(label|div) class="(ant-checkbox-wrapper).*?<\/\1>|<p class="hightlight-count".*?<\/p>/g,
        ""
      );

      exportExcel(innerHTML, "Danh sách chồng chéo", styleExportExcel);
    } else {
      message.destroy();
      message.warning("Không có dữ liệu xử lý");
    }
  };

  const handleChecked = (e, item) => {
    if (!isChanged) {
      setisChanged(true);
    }
    const checked = e.target.checked;
    const newListDataCheck = [...ListDataCheck];
    const mappingChecked = (data, DoiTuongThanhTraID) => {
      data.forEach((item) => {
        if (item.DoiTuongThanhTraID === DoiTuongThanhTraID) {
          item.DuocThucHien = checked;
        } else if (item.Child) {
          mappingChecked(item.Child, DoiTuongThanhTraID);
        }
      });
    };
    mappingChecked(newListDataCheck, item.DoiTuongThanhTraID);
  };

  const handleChangeNote = (value, item) => {
    console.log(value, "value", item, "item");
    if (!isChanged) {
      setisChanged(true);
    }
    const newListDataCheck = [...ListDataCheck];
    const mappingChecked = (data, DoiTuongThanhTraID) => {
      data.forEach((item) => {
        if (item.DoiTuongThanhTraID === DoiTuongThanhTraID) {
          item.GhiChu = value;
        } else if (item.Child) {
          mappingChecked(item.Child, DoiTuongThanhTraID);
        }
      });
    };
    mappingChecked(newListDataCheck, item.DoiTuongThanhTraID);
    setListDataCheck(newListDataCheck);
  };

  const processItems = (items) => {
    const ListDTThucHienIDs = [];
    const ListDTKhongThucHienIDs = [];

    const flattenItems = (items) => {
      items.forEach((item) => {
        // Only process children if the parent has DoiTuongThanhTraID === 0
        if (item.DoiTuongThanhTraID === 0) {
          if (item.Child && item.Child.length > 0) {
            item.Child.forEach((child) => {
              if (child.DoiTuongThanhTraID !== 0) {
                if (child.DuocThucHien) {
                  ListDTThucHienIDs.push({
                    DoiTuongTTID: child.DoiTuongThanhTraID,
                    GhiChu: child.GhiChu,
                  });
                } else {
                  ListDTKhongThucHienIDs.push({
                    DoiTuongTTID: child.DoiTuongThanhTraID,
                    GhiChu: child.GhiChu,
                  });
                }
              }
            });
          }
        }
        // Recursively flatten child items
        if (item.Child && item.Child.length > 0) {
          flattenItems(item.Child);
        }
      });
    };

    flattenItems(items);
    return { ListDTThucHienIDs, ListDTKhongThucHienIDs };
  };

  const handleSubmit = () => {
    if (ListDataCheck.length > 0) {
      const { ListDTThucHienIDs, ListDTKhongThucHienIDs } =
        processItems(ListDataCheck);
      const data = {
        ListDTThucHienIDs,
        ListDTKhongThucHienIDs,
        NamThanhTra: defaultNamThanhTra,
        DoiTuongTT: filterData.DoiTuongTT,
      };
      setisChanged(false);
      console.log(data, "data");
      onCreate(data);
      // const checkItems = (items) => {
      //   for (const item of items) {
      //     // Check if the item is a parent with DoiTuongThanhTraID = 0
      //     if (item.DoiTuongThanhTraID === 0) {
      //       const hasUncheckedChild =
      //         item.Child &&
      //         item.Child.every((child) => {
      //           // Check if the child has no children and is not checked
      //           return (
      //             !child.Child ||
      //             (child.Child.length === 0 && !child.DuocThucHien)
      //           );
      //         });
      //       if (hasUncheckedChild) {
      //         return false; // Return false if condition is met
      //       }
      //     }
      //     // Check if the item has children
      //     if (item.Child && item.Child.length > 0) {
      //       const hasUncheckedChild = checkItems(item.Child);
      //       if (hasUncheckedChild === false) {
      //         return false; // If any child check returns false, return false
      //       }
      //     }
      //   }
      //   return true; // All checks passed
      // };

      // const hasUncheckedItems = checkItems(ListDataCheck);
      // if (!hasUncheckedItems) {
      //   message.destroy();
      //   message.warning(
      //     "Vui lòng chọn đầy đủ một đơn vị chủ trì trong mỗi đối tượng thanh tra, kiểm tra"
      //   );
      // } else {
      //   const { ListDTThucHienIDs, ListDTKhongThucHienIDs } =
      //     processItems(ListDataCheck);
      //   const data = {
      //     ListDTThucHienIDs,
      //     ListDTKhongThucHienIDs,
      //     NamThanhTra: defaultNamThanhTra,
      //     DoiTuongTT: filterData.DoiTuongTT,
      //   };
      //   setisChanged(false);
      //   onCreate(data);
      // }
    } else {
      message.destroy();
      message.warning("Không có dữ liệu xử lý");
    }
  };

  const printData = () => {
    const html =
      `<style>${styleExportExcel}</style>` + excelRef.current.innerHTML;
    printComponent(html);
    // exportExcel(
    //   excelRef.current.innerHTML,
    //   "Danh sách chồng chéo",
    //   styleExportExcel
    // );
  };

  function processData(data) {
    if (data) {
      function processItems(items) {
        if (!items || items.length === 0) return;

        const typeNoiDungMap = {};
        const typeThoiGianThanhTraMap = {};
        const typeThoiKiThanhTraMap = {};

        items.forEach((item) => {
          if (!item.TieuDe) {
            if (item.TypeNoiDung > 0 && item.TypeNoiDung != null) {
              if (!typeNoiDungMap[item.TypeNoiDung])
                typeNoiDungMap[item.TypeNoiDung] = [];
              typeNoiDungMap[item.TypeNoiDung].push(item);
            }
            if (
              item.TypeThoiGianThanhTra > 0 &&
              item.TypeThoiGianThanhTra != null
            ) {
              if (!typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra])
                typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra] = [];
              typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra].push(item);
            }
            if (
              item.TypeThoiKiThanhTra > 0 &&
              item.TypeThoiKiThanhTra != null
            ) {
              if (!typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra])
                typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra] = [];
              typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra].push(item);
            }
          }

          if (item.Child && item.Child.length > 0) {
            processItems(item.Child);
          }
        });

        // Assign highlight properties
        Object.values(typeNoiDungMap).forEach((group) => {
          if (group.length > 1) {
            group.forEach((item) => (item.isHightLightNoidung = true));
          }
        });

        Object.values(typeThoiGianThanhTraMap).forEach((group) => {
          if (group.length > 1) {
            group.forEach((item) => (item.isHightlightThoiGian = true));
          }
        });

        Object.values(typeThoiKiThanhTraMap).forEach((group) => {
          if (group.length > 1) {
            group.forEach((item) => (item.isThoiHan = true));
          }
        });
      }

      // Process all items first
      data.forEach((item) => {
        if (item.Child && item.Child.length > 0) {
          processItems(item.Child);
        }
      });

      // Now assign classes to all first-level children
      let allFirstLevelChildren = [];

      const loopData = (data) => {
        if (data) {
          data.forEach((item) => {
            if (
              item.Child &&
              item.Child.length > 0 &&
              item.Child.every((child) => !child.TieuDe)
            ) {
              allFirstLevelChildren.push(item);
            }
            if (item.Child) {
              loopData(item.Child);
            }
          });
        }
      };
      loopData(data);

      if (allFirstLevelChildren) {
        allFirstLevelChildren.forEach((item, index) => {
          const classParent = index % 2 === 0 ? "even" : "odd";
          item.class = classParent;
          if (item.Child) {
            item.Child.forEach((child, index) => {
              child.class = classParent;
            });
          }
        });
      }

      return data;
    }
  }

  // function processData(data) {
  //   if (data) {
  //     function processItems(items) {
  //       if (!items || items.length === 0) return;

  //       const typeNoiDungMap = {};
  //       const typeThoiGianThanhTraMap = {};
  //       const typeThoiKiThanhTraMap = {};

  //       // Group items by types, only if they meet the criteria
  //       items.forEach((item) => {
  //         if (!item.TieuDe) {
  //           if (item.TypeNoiDung > 0 && item.TypeNoiDung != null) {
  //             if (!typeNoiDungMap[item.TypeNoiDung])
  //               typeNoiDungMap[item.TypeNoiDung] = [];
  //             typeNoiDungMap[item.TypeNoiDung].push(item);
  //           }
  //           if (
  //             item.TypeThoiGianThanhTra > 0 &&
  //             item.TypeThoiGianThanhTra != null
  //           ) {
  //             if (!typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra])
  //               typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra] = [];
  //             typeThoiGianThanhTraMap[item.TypeThoiGianThanhTra].push(item);
  //           }
  //           if (
  //             item.TypeThoiKiThanhTra > 0 &&
  //             item.TypeThoiKiThanhTra != null
  //           ) {
  //             if (!typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra])
  //               typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra] = [];
  //             typeThoiKiThanhTraMap[item.TypeThoiKiThanhTra].push(item);
  //           }
  //         }
  //       });

  //       // Assign highlight properties
  //       Object.values(typeNoiDungMap).forEach((group) => {
  //         if (group.length > 1) {
  //           group.forEach((item) => (item.isHightLightNoidung = true));
  //         }
  //       });

  //       Object.values(typeThoiGianThanhTraMap).forEach((group) => {
  //         if (group.length > 1) {
  //           group.forEach((item) => (item.isHightlightThoiGian = true));
  //         }
  //       });

  //       Object.values(typeThoiKiThanhTraMap).forEach((group) => {
  //         if (group.length > 1) {
  //           group.forEach((item) => (item.isThoiHan = true));
  //         }
  //       });

  //       // Process children recursively
  //       items.forEach((item) => {
  //         if (item.Child && item.Child.length > 0) {
  //           processItems(item.Child);
  //         }
  //       });
  //     }

  //     processItems(data);
  //     return data;
  //   }
  // }

  const confirmModal = (action, gene, value) => {
    if (ListDataCheck.length > 0 && isChanged) {
      ModalAnt.confirm({
        title: `Xác nhận ${action}`,
        content: `Bạn có muốn lưu dữ liệu trước khi ${action} không?`,
        onOk: () => {
          handleSubmit();
          setisChanged(false);
          setFilterData({ ...filterData, DoiTuongTT: value });
        },
        onCancel: () => {
          if (gene === "closed") {
            onCancel();
            setisChanged(false);
          } else if (gene === "changedtab") {
            setFilterData({ ...filterData, DoiTuongTT: value });
            setisChanged(false);
          }
        },
      });
    } else {
      if (gene === "closed") {
        onCancel();
        setisChanged(false);
      } else if (gene === "changedtab") {
        setFilterData({ ...filterData, DoiTuongTT: value });
        setisChanged(false);
      }
    }
  };

  // Sử dụng hàm
  const processedData = processData(ListDataCheck);

  const filterNoiDung = filterData.checked.includes(2);
  const filterThoiGian = filterData.checked.includes(4);

  return (
    <Modal
      visible={visible}
      title={
        isCheck
          ? "Kiểm tra, xử lý chồng chéo"
          : "Kết quả kế hoạch thanh tra, kiểm tra sau xử lý chồng chéo"
      }
      onCancel={onCancel}
      width={1800}
      className="footer-center"
      footer={[
        isCheck && !checkIsView ? (
          <>
            <Button
              icon={<EditIcon />}
              key="submit"
              type="primary"
              onClick={() => handleSubmit()}
            >
              Xử lý chồng chéo
            </Button>

            <Button key="submit" type="primary" onClick={() => printData()}>
              In danh sách
            </Button>
          </>
        ) : null,
        <Button
          key="back"
          icon={<CloseSquareFilled />}
          type="danger"
          onClick={() => confirmModal("đóng", "closed")}
        >
          {"Đóng"}
        </Button>,
      ]}
    >
      <WrapperModalCheck>
        <div className="wrapper-modal-check">
          <div className="wrapper-modal-check-header">
            {!isShowResult ? (
              <div className="filter-left">
                <Select
                  placeholder="Chọn năm"
                  style={{ width: 100 }}
                  onChange={(value) =>
                    setFilterData({ ...filterData, NamThanhTra: value })
                  }
                  value={defaultNamThanhTra}
                  allowClear={false}
                  disabled
                >
                  {ListYear &&
                    ListYear.map((item) => (
                      <Option value={item.id}>{item.name}</Option>
                    ))}
                </Select>

                <Select
                  placeholder="Đơn vị chủ trì"
                  style={{ width: 200 }}
                  onChange={(value) =>
                    setFilterData({ ...filterData, CoQuanLapID: value })
                  }
                  value={filterData.CoQuanLapID ? filterData.CoQuanLapID : null}
                  allowClear
                >
                  {ListAgency &&
                    ListAgency.map((item) => (
                      <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
                    ))}
                </Select>

                {isCheck ? (
                  <Select
                    placeholder="Hình thức"
                    style={{ width: 200 }}
                    onChange={(value) => {
                      setFilterData({
                        ...filterData,
                        PhanLoaiThanhTraID1: value,
                      });
                    }}
                    value={
                      filterData.PhanLoaiThanhTraID1
                        ? filterData.PhanLoaiThanhTraID1
                        : null
                    }
                    allowClear
                  >
                    {ListHinhThuc &&
                      ListHinhThuc.map((item) => (
                        <Option value={item.PhanLoaiThanhTraID}>
                          {item.TenPhanLoaiThanhTra}
                        </Option>
                      ))}
                  </Select>
                ) : null}

                {/* {isCheck ? (
                <Select
                  placeholder="Tình trạng chồng chéo"
                  style={{ width: 200 }}
                  onChange={(value) =>
                    setFilterData({ ...filterData, TrangThai: value })
                  }
                  value={filterData.TrangThai ? filterData.TrangThai : null}
                  allowClear
                >
                  <Option value="0">Tất cả</Option>
                  <Option value="1">Có chồng chéo</Option>
                  <Option value="2">Không chồng chéo</Option>
                </Select>
              ) : null} */}

                <InputSearch
                  placeholder="Nhập đối tượng, nội dung để tìm kiếm"
                  style={{ width: 300 }}
                  onSearch={(value) =>
                    setFilterData({ ...filterData, Keyword: value })
                  }
                  defaultValue={filterData.Keyword}
                  allowClear
                />
              </div>
            ) : null}
            <div className="filter-right">
              <Button
                type="dowloadlist"
                icon={<CloudDownloadIcon />}
                onClick={dowloadListCheck}
              >
                {isCheck ? "Tải kết quả xử lý chồng chéo" : "Tải danh sách"}
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="warning-check">
          <span>
            Các cuộc thanh tra, kiểm tra đã được chọn sẽ được xử lý chồng chéo
          </span>
        </div> */}
        <div className="wrapper-tab"></div>
        <Tabs
          activeKey={filterData.DoiTuongTT}
          defaultActiveKey={filterData.DoiTuongTT}
          onChange={(value) => confirmModal("chuyển tab", "changedtab", value)}
          tabBarExtraContent={{
            right: isCheck ? (
              <div className="wrapper-modal-checked">
                <Checkbox.Group
                  onChange={(value) =>
                    setFilterData({ ...filterData, checked: value })
                  }
                  value={filterData.checked}
                >
                  <Checkbox disabled value={1}>
                    Đối tượng
                  </Checkbox>
                  <Checkbox value={2}>Nội dung</Checkbox>
                  {/* <Checkbox value={3}>Thời hạn thanh tra</Checkbox> */}
                  <Checkbox value={4}>Thời gian thanh tra</Checkbox>
                </Checkbox.Group>
              </div>
            ) : (
              <></>
            ),
          }}
        >
          <TabPane tab="Đơn vị hành chính, sự nghiệp" key={1}></TabPane>
          <TabPane tab="Doanh nghiệp" key={2}></TabPane>
        </Tabs>
        <TableCheck
          data={processedData}
          loading={loading}
          onChecked={handleChecked}
          isCheck={isCheck}
          key={datakey}
          year={defaultNamThanhTra}
          DoiTuongTT={filterData.DoiTuongTT}
          filterNoiDung={filterNoiDung}
          filterThoiGian={filterThoiGian}
          onChangeNote={handleChangeNote}
          onSplit={onSplit}
          checkIsView={checkIsView}
        />

        <div style={{ display: "none" }}>
          <TableCheck
            data={processedData}
            isExport={true}
            excelRef={excelRef}
            loading={loading}
            onChecked={handleChecked}
            isCheck={isCheck}
            key={datakey}
            year={defaultNamThanhTra}
            DoiTuongTT={filterData.DoiTuongTT}
            filterNoiDung={filterNoiDung}
            filterThoiGian={filterThoiGian}
            onChangeNote={handleChangeNote}
            onSplit={onSplit}
          />
        </div>
      </WrapperModalCheck>
    </Modal>
  );
};

export default ModalCheck;
