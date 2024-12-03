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
  Spin,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  SendOutlined,
  SaveOutlined,
  CloseSquareFilled,
  SaveFilled,
  CheckOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import { REQUIRED } from "../../../../settings/constants";
import CustomizeTooltip from "../../../../components/uielements/tooltip";
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
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import {
  DONVIHANHCHINH,
  MAXLENGTHNOIDUNG,
} from "../../../../settings/constants";
import { _debounce } from "../../../../helpers/utility";
import { CarryOutOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { StyleTree } from "./index.styled";
import { useTransition } from "react";
import HiddenVector from "../../../../image/HiddenVector.png";
const Wrapper = styled.div`
  .name-agency {
    max-width: 80%;
    /* white-space: nowrap;f
    overflow: hidden;
    text-overflow: ellipsis; */
    word-break: break-word;
  }
  .title-required {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .note {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    margin-left: 8px;
    position: absolute;
    top: 4px;
    right: 10px;
    cursor: pointer;
    background: rgb(111 178 234);
  }
  .tax {
    width: 100%;
  }
  .title {
    margin-bottom: 5px;
  }
  .wrapper-item__disabled {
    p {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  .wrapper-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    /* height: 50px; */
    /* margin-bottom: 10px; */
    align-items: flex-start;
    position: relative;
    .selected-item {
      display: flex;
      gap: 3px;
      flex-direction: column;

      .tax .count {
        position: absolute;
        right: 35px;
        top: 2px;
        /* top: 50%;
        transform: translateY(-50%); */
      }
    }

    .tax,
    .wrap-remove {
      display: flex;
      gap: 10px;
      align-items: center;
      svg {
        fill: #fff !important;
      }
      .count {
        color: #fff;
        background: rgba(76, 153, 227, 1);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    button {
      width: 55px;
      min-width: 55px;
      height: 20px;

      color: #fff;
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 11px;
    }
    .icon-send {
      cursor: pointer;
    }
    .btn-remove {
      background: red;
      color: #fff;
    }
    .btn-add {
      background: #09b109;
      color: #fff;
      .ant-btn-icon {
        background: #fff;
        color: #09b109;
      }
    }
  }
  .wrapper-item:nth-child(odd) {
    background: #fff;
  }
  .wrapper-item:nth-child(even) {
    background: rgba(244, 246, 249, 1);
  }

  .wrapper-agency,
  .wrapper-agency_selected {
    /* margin-top: 10px; */
    border: 1px solid #ccc;
    max-height: 505px;
    overflow: auto;
    min-height: 505px;
  }
  .wrapper-col {
    position: relative;
  }
  .wrapper-agency {
    .loading-antd {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 50%;
      background: rgba(255, 255, 255, 0.7);
      transform: translate(-50%, -50%);
    }
  }
  .input-search {
    input,
    button {
      border-radius: 0 !important;
    }
    input {
      height: 35px;
      /* padding: 10px 15px; */
    }
    button {
      /* height: 30px; */
      padding: 20px;
    }
  }
`;

const ModalAddInspection = ({
  visible,
  onCancel,
  onCreate,
  defaultNamThanhTra,
  ListHinhThuc,
  ListFields,
  dataEdit,
  action,
  isTTTrungUong,
  ListYear,
  DoiTuongTT,
  ListAgencyTw,
}) => {
  const [form] = useForm();
  const [listAgecnySelected, setlistAgecnySelected] = useState([]);
  const [NamThanhTra, setNamThanhTra] = useState(defaultNamThanhTra);
  const [listAgency, setListAgency] = useState([]);
  const [listFields, setlistFields] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [loadingAgency, setLoadingAgency] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const defaultPageNumber = 1;

  const getListAgency = (Keyword, isSearch, initLoading = false) => {
    setLoadingAgency(true);
    api
      .GetListAgency({
        PhanLoai: DoiTuongTT ? Number(DoiTuongTT) : DONVIHANHCHINH,
        PageNumber: isSearch ? defaultPageNumber : pageNumber,
        Keyword,
        NamThanhTra,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          const data = res.data.Data ? res.data.Data : [];
          const defaultExpandKey = [];
          transformData(data, defaultExpandKey || []);
          setExpandedKeys(defaultExpandKey);
          if (initLoading) {
            setInitLoading(initLoading);
          }
          const viewData = data
            ? data.map((agency) => ({ ...agency, isView: true }))
            : [];
          setLoadingAgency(false);
          if (isSearch) {
            const data = [...viewData].map((item) => {
              if (
                listAgecnySelected.find(
                  (itemFind) => itemFind.CoQuanID === item.CoQuanID
                )
              ) {
                return { ...item, isView: false };
              } else {
                return { ...item, isView: true };
              }
            });
            setListAgency(data);
            setpageNumber(defaultPageNumber);
          } else {
            const data = [...viewData].map((item) => {
              if (
                listAgecnySelected.find(
                  (itemFind) => itemFind.CoQuanID === item.CoQuanID
                )
              ) {
                return { ...item, isView: false };
              } else {
                return { ...item, isView: true };
              }
            });
            setListAgency(data);
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
  };

  console.log(listAgecnySelected, "listAgecnySelected");

  const filterTreeData = (data, keyword) => {
    if (keyword) {
      let expandedKeys = []; // Danh sách keys cho các node sẽ được mở rộng

      const filteredData = data.reduce((acc, node) => {
        // Kiểm tra xem node.title có chứa keyword hay không
        const isTitleMatched = removeDiacritics(
          node.title?.toLowerCase()
        )?.includes(removeDiacritics(keyword.toLowerCase()));

        // Đệ quy qua children
        const childrenResult = filterTreeData(node.children || [], keyword);
        const { filteredData: children, expandedKeys: newExpandedKeys } =
          childrenResult;

        // Nếu node.title hoặc children chứa keyword, giữ lại node
        if (isTitleMatched || children.length > 0) {
          expandedKeys.push(node.key); // Thêm key của node cha vào danh sách
          acc.push({
            ...node,
            children, // Giữ lại children đã được lọc
            rawData: node.rawData, // Giữ lại rawData
          });
        }

        // Thêm các expandedKeys của children vào danh sách
        expandedKeys = [...expandedKeys, ...newExpandedKeys];

        return acc;
      }, []);

      return { filteredData, expandedKeys: [...new Set(expandedKeys)] }; // Trả về danh sách key duy nhất
    }
    return { filteredData: data, expandedKeys: [] }; // Trả về dữ liệu gốc nếu không có keyword
  };

  // const filterTreeData = (data, keyword) => {
  //   if (keyword) {
  //     let expandedKeys = []; // Danh sách keys cho các node sẽ được mở rộng

  //     const filteredData = data.reduce((acc, node) => {
  //       // Kiểm tra xem node.title có chứa keyword hay không
  //       const isTitleMatched = removeDiacritics(
  //         node.title?.toLowerCase()
  //       ).includes(removeDiacritics(keyword.toLowerCase()));

  //       // Đệ quy qua children
  //       const childrenResult = filterTreeData(node.children || [], keyword);
  //       const { filteredData: children, expandedKeys: newExpandedKeys } =
  //         childrenResult;

  //       // Nếu node.title hoặc children chứa keyword, giữ lại node
  //       if (isTitleMatched || children.length > 0) {
  //         expandedKeys.push(node.key); // Thêm key của node cha vào danh sách
  //         acc.push({
  //           ...node,
  //           children, // Giữ lại children đã được lọc
  //           rawData: node.rawData, // Giữ lại rawData
  //         });
  //       }

  //       return acc;
  //     }, []);

  //     return { filteredData, expandedKeys };
  //   }
  //   return data;
  // };

  useEffect(() => {
    getListAgency(keyWord, false, true); // Gọi API khi pageSize thay đổi
  }, [NamThanhTra]);

  useEffect(() => {
    if (dataEdit.PhanLoaiThanhTraID1 && form) {
      form.setFieldsValue({
        ...dataEdit,
        PhanLoaiThanhTraID1: dataEdit?.PhanLoaiThanhTraID1
          ? dataEdit.PhanLoaiThanhTraID1
          : null,
        PhanLoaiThanhTraID2: dataEdit?.PhanLoaiThanhTraID2
          ? dataEdit.PhanLoaiThanhTraID2
          : null,
        NamThanhTra: dataEdit.NamThanhTra ? String(dataEdit.NamThanhTra) : null,
        LaQuanLyKeHoachTrungUong: isTTTrungUong ? true : false,
        LinhVucPhuIDs: dataEdit.LinhVucPhuIDs
          ? dataEdit.LinhVucPhuIDs.split(",").map((id) => Number(id))
          : null,
        // ThoiGianTienHanh: dataEdit.ThoiGianTienHanh
        //   ? dayjs(dataEdit.ThoiGianTienHanh)
        //   : null,
      });

      if (dataEdit.PhanLoaiThanhTraID1) {
        getListFields(dataEdit.PhanLoaiThanhTraID1);
      } else {
        setlistFields(ListFields);
      }
      const DoiTuongTTIds = dataEdit.DoiTuongTTIds;
      const DanhSachDoiTuongThanhTra = dataEdit?.DanhSachDoiTuongThanhTra || [];
      if (DoiTuongTTIds) {
        if (DoiTuongTT === DONVIHANHCHINH) {
          const ListItemSelected = [];
          const newListAgency = [...listAgency];
          const mappingSelected = (data, ListCoQuanID) => {
            if (data) {
              data.forEach((item) => {
                if (ListCoQuanID?.includes(item.CoQuanID)) {
                  ListItemSelected.push({
                    ...item,
                    isView: true,
                    isNotDelete: DanhSachDoiTuongThanhTra.find(
                      (itemTT) => itemTT.CoQuanID === item.CoQuanID
                    )?.DTChongCheo,
                  });
                  item.isView = false;
                }
                if (item.Children && item.Children?.length) {
                  mappingSelected(item.Children, ListCoQuanID);
                }
              });
            }
          };
          mappingSelected(newListAgency, DoiTuongTTIds);
          setListAgency(newListAgency);
          setlistAgecnySelected(ListItemSelected);
        } else {
          const listAgecnySelected = listAgency
            .filter((agency) => DoiTuongTTIds?.includes(agency.CoQuanID))
            .map((item) => ({
              ...item,
              isView: true,
              isNotDelete: DanhSachDoiTuongThanhTra.find(
                (itemTT) => itemTT.CoQuanID === item.CoQuanID
              )?.DTChongCheo,
            }));
          setlistAgecnySelected(listAgecnySelected);
          const lisstAgency = listAgency.map((item) => {
            if (
              listAgecnySelected.find(
                (itemFind) => itemFind.CoQuanID === item.CoQuanID
              )
            ) {
              return { ...item, isView: false };
            } else {
              return { ...item, isView: true };
            }
          });
          setListAgency(lisstAgency);
        }
      }
      //  else {
      //   setListAgency(
      //     listAgency.map((agency) => ({ ...agency, isView: true }))
      //   );
      // }
    } else {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NamThanhTra: defaultNamThanhTra,
          LaQuanLyKeHoachTrungUong: isTTTrungUong ? true : false,
        });
    }
  }, [initLoading]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight) {
      // Tăng pageNumber khi cuộn đến cuối
      getListAgency(); // Gọi API để lấy dữ liệu mới
    }
  };

  const addObject = (object, index) => {
    setlistAgecnySelected([...listAgecnySelected, { ...object, isView: true }]);
    const newListAgency = [...listAgency]; // Tạo bản sao của listAgency
    newListAgency[index].isView = false; // Cập nhật isView
    setListAgency(newListAgency); // Cập nhật state
  };

  const removeObject = (index, object) => {
    if (DoiTuongTT === DONVIHANHCHINH) {
      const newObjects = [...listAgecnySelected];
      newObjects.splice(index, 1);
      const newListAgency = [...listAgency];
      assignPropertyAgency(newListAgency, "isView", object.CoQuanID, true);
      setListAgency(newListAgency);
      setlistAgecnySelected(newObjects);
    } else {
      const newObjects = [...listAgecnySelected];
      const objectRemoved = newObjects[index];
      newObjects.splice(index, 1);
      setlistAgecnySelected(newObjects);
      const agency = listAgency.find(
        (itemFind) => itemFind.CoQuanID === objectRemoved.CoQuanID
      );
      const newListAgency = [...listAgency];
      if (agency) {
        const index = newListAgency.indexOf(agency);
        const target = newListAgency[index];
        target.isView = true;
        setListAgency(newListAgency);
      }
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (listAgecnySelected.length) {
        const newValues = {
          ...values,
          DoiTuongTTIds: listAgecnySelected.map((item) => item.CoQuanID),
          LoaiKeHoach: 0,
        };
        newValues.LaBoSung = values.LaBoSung ? true : false;
        newValues.LaQuanLyKeHoachTrungUong = values.LaQuanLyKeHoachTrungUong
          ? true
          : false;
        if (newValues.LinhVucPhuIDs) {
          newValues.LinhVucPhuIDs = newValues.LinhVucPhuIDs.join(",");
        }
        onCreate(newValues);
      } else {
        message.destroy();
        message.warning("Vui lòng chọn đối tượng được thanh tra, kiểm tra");
      }
    });
  };

  const FilterAgency = _debounce((value, generate = 1) => {
    const strValue = String(value);

    if (generate === 1) {
      getListAgency(value, true);
      // const filterList = listAgency.map((agency) => {
      //   if (
      //     agency?.TenCoQuan?.toLowerCase()
      //       ?.trim()
      //       ?.includes(strValue?.toLowerCase()?.trim()) ||
      //     agency?.MaCoQuan?.toLowerCase()
      //       ?.trim()
      //       ?.includes(strValue?.toLowerCase()?.trim())
      //   ) {
      //     return { ...agency, isView: true };
      //   }
      //   else {
      //     return { ...agency, isView: false };
      //   }
      // });
      // if (!value) {
      //   setListAgency(
      //     listAgency.map((agency) => ({ ...agency, isView: true }))
      //   );
      // } else {
      //   setListAgency(filterList);
      // }
    } else {
      const filterList = listAgecnySelected.map((agency) => {
        if (
          agency?.TenCoQuan?.toLowerCase()
            ?.trim()
            ?.includes(strValue?.toLowerCase()?.trim()) ||
          agency?.MaCoQuan?.toLowerCase()
            ?.trim()
            ?.includes(strValue?.toLowerCase()?.trim())
        ) {
          return { ...agency, isView: true };
        } else {
          return { ...agency, isView: false };
        }
      });
      if (!value) {
        setlistAgecnySelected(
          listAgecnySelected.map((agency) => ({ ...agency, isView: true }))
        );
      } else {
        setlistAgecnySelected(filterList);
      }
    }
  }, 50);

  const getListFields = (HinhThucID) => {
    const filteredFields = ListFields.filter(
      (field) => field.ParrentID === HinhThucID
    );
    setlistFields(filteredFields);
  };

  const rowCustom = {
    lg: 6,
    span: 24,
  };

  const transformData = (data, defaultExpandKey) => {
    if (data) {
      return data.map((item) => {
        defaultExpandKey.push(item.CoQuanID);
        return {
          title: item.TenCoQuan,
          key: item.CoQuanID,
          children: transformData(item.Children, defaultExpandKey),
          rawData: item,
          disabled: item.isView === false ? true : false,
        };
      });
    }
  };

  const assignPropertyAgency = (data, property, CoQuanID, value) => {
    if (data) {
      data.forEach((item) => {
        if (item.CoQuanID === CoQuanID) {
          item[property] = value;
        }
        if (item.Children) {
          assignPropertyAgency(item.Children, property, CoQuanID, value);
        }
      });
    }
  };

  const handleAddItemTree = (data) => {
    data.isView = false;
    setlistAgecnySelected([...listAgecnySelected, { ...data, isView: true }]);
  };

  const customTitleRender = (node) => {
    const { rawData } = node;
    return (
      <div
        className={`selected-item ${
          rawData.isView === false || rawData.Type === 1
            ? "selected-item__disabled"
            : ""
        }`}
      >
        <div className="tax">
          <p className="name-agency">{rawData.TenCoQuan}</p>
          {rawData.Count ? (
            <Tooltip
              className="tax-tooltip"
              title={rawData?.NamThanhTra}
              placement="right"
              arrow={false}
              overlayInnerStyle={{
                backgroundColor: "rgba(222, 240, 255, 1)",
                color: "#000000",
                border: "1px solid rgba(76, 153, 227, 1)",
                borderRadius: "3px",
                minHeight: "16px",
                padding: "0 5px",
              }}
            >
              <p className="count">
                {rawData.Count ? (rawData.Count > 0 ? rawData.Count : "") : ""}
              </p>
            </Tooltip>
          ) : null}
        </div>
        <div className="fly-icon">
          {rawData.isView === false || rawData.Type === 1 ? (
            <img src={HiddenVector} alt="Send" className="icon-send" />
          ) : (
            <img
              src={VectorFly}
              alt="Send"
              onClick={() =>
                rawData.isView === false || rawData.Type === 1
                  ? null
                  : handleAddItemTree(rawData)
              }
              className="icon-send"
            />
          )}
        </div>
      </div>
    );
  };

  const changeKeyWord = (value) => {
    if (value) {
      const { filteredData, expandedKeys: newExpandedKeys } = filterTreeData(
        data,
        value
      );
      setExpandedKeys(newExpandedKeys); // Cập nhật expandedKeys với các key đã lọc
    } else {
      const defaultExpandKey = [];
      const data = isDonViHanhChinh
        ? transformData(listAgency, defaultExpandKey || [])
        : listAgency;
      setExpandedKeys(defaultExpandKey);
    }
    setKeyWord(value);
  };

  const debouncedChangeKeyWord = _debounce(changeKeyWord, 50);

  const isDonViHanhChinh = DoiTuongTT === DONVIHANHCHINH;

  const defaultExpandKey = [];
  const data = isDonViHanhChinh
    ? transformData(listAgency, defaultExpandKey || [])
    : listAgency;

  const removeDiacritics = (str) => {
    if (str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  };

  const dataFilter = filterTreeData(data, keyWord);

  const filteredData =
    dataFilter.filteredData && dataFilter.filteredData?.length > 0
      ? dataFilter.filteredData
      : data;

  return (
    <Modal
      visible={visible}
      title={
        dataEdit?.LaBoSung
          ? "Bổ sung cuộc thanh tra"
          : dataEdit.PhanLoaiThanhTraID1
          ? "Cập nhật cuộc thanh tra"
          : "Thêm cuộc thanh tra"
      }
      onCancel={onCancel}
      width={1800}
      footer={[
        <Button
          key="back"
          type="danger"
          icon={<CloseSquareFilled />}
          onClick={onCancel}
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          onClick={() => handleSubmit()}
        >
          Lưu
        </Button>,
      ]}
    >
      <Wrapper>
        <Form form={form} layout="vertical">
          <Item name="LaBoSung" hidden></Item>
          <Item name="LaQuanLyKeHoachTrungUong" hidden></Item>
          {action === "edit" && (
            <Item name="CuocThanhTraID" hidden>
              <Input />
            </Item>
          )}
          <Row gutter={16}>
            <Col
              lg={12}
              md={24}
              style={{ maxHeight: "615px", overflow: "auto" }}
            >
              <Title level={5}>Thông tin cuộc thanh tra/kiểm tra</Title>
              <Row gutter={[16, 16]}>
                <Col {...rowCustom}>
                  <Item
                    name="NamThanhTra"
                    label="Kế hoạch năm"
                    rules={[REQUIRED]}
                  >
                    <Select
                      defaultValue={defaultNamThanhTra}
                      onChange={(value) => {
                        setNamThanhTra(value);
                        setlistAgecnySelected([]);
                      }}
                      allowClear={false}
                      disabled
                    >
                      {ListYear &&
                        ListYear.map((item) => (
                          <Option value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                    {/* <DatePicker
                      picker="year"
                      format="YYYY"
                      style={{ width: "100%" }}
                    /> */}
                  </Item>
                </Col>
                {isTTTrungUong && (
                  <>
                    <Col {...rowCustom}>
                      <Item
                        name="CoQuanID"
                        label="Cơ quan TW"
                        rules={[REQUIRED]}
                      >
                        <TreeSelect
                          showSearch
                          treeData={ListAgencyTw}
                          style={{ width: "100%" }}
                          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                          placeholder="Chọn đơn vị"
                          treeDefaultExpandAll
                          notFoundContent={"Không có dữ liệu"}
                          treeNodeFilterProp={"title"}
                        />
                      </Item>
                    </Col>
                  </>
                )}
                <Col {...rowCustom}>
                  <Item
                    name="PhanLoaiThanhTraID1"
                    label="Hình thức"
                    rules={[REQUIRED]}
                  >
                    <Select
                      onChange={(value) => {
                        getListFields(value);
                        form.setFieldsValue({
                          PhanLoaiThanhTraID2: null,
                        });
                      }}
                    >
                      {ListHinhThuc &&
                        ListHinhThuc.length > 0 &&
                        ListHinhThuc.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                </Col>
                <Col {...rowCustom}>
                  <Item
                    name="PhanLoaiThanhTraID2"
                    label={<p className="title-required">Lĩnh vực chính</p>}
                    rules={[REQUIRED]}
                  >
                    <Select>
                      {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                  <CustomizeTooltip title="Phục vụ báo cáo">
                    <span className="note" style={{ marginLeft: 8 }}>
                      ?
                    </span>
                  </CustomizeTooltip>
                </Col>
                <Col {...rowCustom}>
                  <Item
                    name="LinhVucPhuIDs"
                    label="Lĩnh vực thanh tra/kiểm tra"
                    rules={[REQUIRED]}
                  >
                    <Select mode="multiple">
                      {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                  <CustomizeTooltip
                    maxWidth={250}
                    title="Chọn các lĩnh vực có liên quan đến nội dung cuộc thanh tra"
                  >
                    <span className="note" style={{ marginLeft: 8 }}>
                      ?
                    </span>
                  </CustomizeTooltip>
                </Col>
              </Row>
              <Item
                name="NoiDung"
                label="Nội dung"
                rules={[REQUIRED]}
                maxLength={MAXLENGTHNOIDUNG}
              >
                <TextArea rows={4} />
              </Item>
              <Row gutter={[16, 16]}>
                <Col md={12} span={24}>
                  <Item
                    name="ThoiHanThanhTra"
                    label="Thời hạn thanh tra/kiểm tra (ngày)"
                  >
                    <Input />
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    name="ThoiGianTienHanh"
                    label="Thời gian triển khai thanh tra/kiểm tra"
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>

              <Item
                name="DonViPhoiHop"
                label="Đơn vị phối hợp"
                maxLength={MAXLENGTHNOIDUNG}
              >
                <TextArea rows={4} />
              </Item>
              <Item name="GhiChu" label="Ghi chú" maxLength={MAXLENGTHNOIDUNG}>
                <TextArea rows={4} />
              </Item>
            </Col>
            <Col lg={12} md={24}>
              <Title level={5}>Đối tượng thanh tra/kiểm tra</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Row gutter={[16, 16]}>
                  <Col md={12} span={24}>
                    <div className="wrapper-col">
                      <Title className="title" level={5}>
                        Chọn đối tượng thanh tra/kiểm tra
                      </Title>
                      <InputSearch
                        style={{ width: "100%" }}
                        className="input-search"
                        placeholder="Nhập mã hoặc tên đối tượng"
                        onChange={(e) => {
                          if (DoiTuongTT === DONVIHANHCHINH) {
                            debouncedChangeKeyWord(e.target.value);
                          } else {
                            FilterAgency(e.target.value);
                          }
                        }}
                        onSearch={(value) => {
                          if (DoiTuongTT === DONVIHANHCHINH) {
                            debouncedChangeKeyWord(value);
                          } else {
                            FilterAgency(value);
                          }
                        }}
                      />
                      <div
                        className="wrapper-agency"
                        style={{ padding: !isDonViHanhChinh ? "" : "10px 5px" }}
                        onScroll={(e) => {
                          if (!isDonViHanhChinh) {
                            handleScroll(e);
                          }
                        }}
                      >
                        {!isDonViHanhChinh ? (
                          listAgency.map(
                            (object, index) =>
                              object && (
                                <div
                                  className={`wrapper-item ${
                                    object.isView === false || object.Type === 1
                                      ? "wrapper-item__disabled"
                                      : ""
                                  }`}
                                  key={index}
                                >
                                  <div className="selected-item">
                                    <div className="tax">
                                      <p style={{ fontWeight: "bold" }}>
                                        {object.MaSoThue}
                                      </p>
                                      {object.Count ? (
                                        <Tooltip
                                          className="tax-tooltip"
                                          title={object?.NamThanhTra}
                                          placement="right"
                                          arrow={false}
                                          overlayInnerStyle={{
                                            backgroundColor:
                                              "rgba(222, 240, 255, 1)",
                                            color: "#000000",
                                            border:
                                              "1px solid rgba(76, 153, 227, 1)",
                                            borderRadius: "3px",
                                            minHeight: "16px",
                                            padding: "0 5px",
                                          }}
                                        >
                                          <p className="count">
                                            {object.Count
                                              ? object.Count > 0
                                                ? object.Count
                                                : ""
                                              : ""}
                                          </p>
                                        </Tooltip>
                                      ) : null}
                                    </div>
                                    <p className="name-agency">
                                      {object.TenCoQuan}
                                    </p>
                                    <p
                                      style={{
                                        color: "rgba(177, 175, 175, 1)",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {object.DiaChi
                                        ? `Địa chỉ: ${object.DiaChi}`
                                        : ""}
                                    </p>
                                  </div>
                                  {object.isView === false ||
                                  object.Type === 1 ? (
                                    <img
                                      src={HiddenVector}
                                      alt="Send"
                                      className="icon-send"
                                    />
                                  ) : (
                                    <img
                                      src={VectorFly}
                                      alt="Send"
                                      onClick={() =>
                                        object.isView === false ||
                                        object.Type === 1
                                          ? null
                                          : addObject(object, index)
                                      }
                                      className="icon-send"
                                    />
                                  )}
                                </div>
                              )
                          )
                        ) : (
                          <StyleTree>
                            <Tree
                              treeData={filteredData}
                              showIcon={true}
                              showLine={true}
                              titleRender={customTitleRender}
                              blockNode={true}
                              defaultExpandAll={true}
                              defaultExpandedKeys={defaultExpandKey}
                              expandedKeys={expandedKeys}
                              onExpand={(expandedKeys) => {
                                setExpandedKeys(expandedKeys);
                              }}
                              filterTreeNode={(node) =>
                                keyWord
                                  ? removeDiacritics(
                                      node.title?.toLowerCase()
                                    )?.includes(
                                      removeDiacritics(keyWord.toLowerCase())
                                    )
                                  : false
                              }
                              // ... other props if needed ...
                            />
                          </StyleTree>
                        )}
                        {loadingAgency ? (
                          <Spin className="loading-antd" />
                        ) : null}
                      </div>
                    </div>
                  </Col>

                  <Col md={12} span={24}>
                    <div className="title-list__object">
                      <Title className="title" level={5}>
                        Danh sách đối tượng thanh tra/kiểm tra{" "}
                        <span style={{ color: "red" }}>*</span>{" "}
                      </Title>
                    </div>
                    <InputSearch
                      style={{ width: "100%" }}
                      placeholder="Nhập mã hoặc tên đối tượng"
                      className="input-search"
                      onChange={(e) => {
                        FilterAgency(e.target.value, 2);
                      }}
                      onSearch={(value) => {
                        FilterAgency(value, 2);
                      }}
                    />
                    <div className="wrapper-agency_selected">
                      {listAgecnySelected.map(
                        (object, index) =>
                          object &&
                          object.isView && (
                            <div className="wrapper-item" key={index}>
                              <div className="selected-item">
                                <p style={{ fontWeight: "bold" }}>
                                  {object.MaSoThue}
                                </p>
                                <p>{object.TenCoQuan}</p>
                                <p
                                  style={{
                                    color: "rgba(177, 175, 175, 1)",
                                    fontSize: "12px",
                                  }}
                                >
                                  {object.DiaChi
                                    ? `Địa chỉ: ${object.DiaChi}`
                                    : ""}
                                </p>
                              </div>
                              <div className="wrap-remove">
                                {object.Count ? (
                                  <Tooltip
                                    className="tax-tooltip"
                                    title={object?.NamThanhTra}
                                    placement="left"
                                    arrow={false}
                                    overlayInnerStyle={{
                                      backgroundColor: "rgba(222, 240, 255, 1)",
                                      color: "#000000",
                                      border: "1px solid rgba(76, 153, 227, 1)",
                                      borderRadius: "3px",
                                      minHeight: "16px",
                                      padding: "0 5px",
                                    }}
                                  >
                                    <p className="count">
                                      {object.Count
                                        ? object.Count > 0
                                          ? object.Count
                                          : ""
                                        : ""}
                                    </p>
                                  </Tooltip>
                                ) : null}
                                {object?.isNotDelete !== true ? (
                                  <Button
                                    type="text"
                                    icon={<DeleteIcon />}
                                    onClick={() => removeObject(index, object)}
                                    className="btn-remove"
                                  >
                                    Xóa
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default ModalAddInspection;
