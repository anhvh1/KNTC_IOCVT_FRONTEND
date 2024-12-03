import React, { useEffect, useState } from "react";
import { Checkbox, Form, Select } from "antd";

import FormDynamic from "../../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
import BoxTable from "../../../../../../components/utility/boxTable";
import { FORM, FORMCOL } from "../../../../../../settings/constants";

import { Tooltip, message } from "antd";
import dayjs from "dayjs";
import {
  Input,
  InputNumberFormat,
} from "../../../../../../components/uielements/exportComponent";
import ModalForm from "../../../../../../customApp/containers/NghiepVu/Shared/Modal/ModalForm";
import { SaveIcon } from "../../../../../../components/utility/SaveIcon";
import AddIcon from "../../../../../../components/utility/AddIcon";
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";
import { useForm } from "../../../../../../components/uielements/formValidator";
import { DatePicker } from "../../../../../../components/uielements/exportComponent";
import { SoLieuDoiTuongTT } from "../../../../../../settings/constants";
import {
  InsertCapToData,
  calculateRowSpans,
  transformData,
  flattenTree,
  getRowSpan,
  getTextView,
  addEmptyChildToLeaves,
  checkRowspanItem,
  addParentPropertyToChildren,
} from "../command";
import DatePickerFormat from "../../../../../../components/uielements/datePickerFormat";
import { WrapperInfo } from "../form.style";
import { formatNumberStr } from "../../../../../../helpers/utility";
const FormKienNghi = ({
  form,
  onInsert,
  onRemove,
  onChangeData,
  ListDoiTuongXuLy,
  ListDoiTuong,
  ListKetLuan,
  isUpdate,
}) => {
  const newListKetLuan = ListKetLuan
    ? ListKetLuan.map((item) => {
        return {
          Ten: item.SoVanBan,
          ID: item.ID,
        };
      })
    : [];

  const listFields = [
    {
      name: "CongBoKLID",
      label: "Kết luận",
      type: FORM.Select,
      required: true,
      col: FORMCOL.Col1P2,
      props: {
        placeholder: "Chọn kết luận",
      },
      options: newListKetLuan,
    },
  ];

  if (isUpdate) {
    listFields.push({
      name: "CapNhapLoaiSoLieuID",
      label: "",
      type: FORM.Input,
      hidden: true,
    });
    listFields.push({
      name: "DeleteIDs",
      label: "",
      type: FORM.Input,
      hidden: true,
    });
  }

  const columns = [
    {
      title: "Loại đối tượng",
      dataIndex: "LoaiDoiTuong",
      key: "LoaiDoiTuong",
      width: "20%",
      align: "left",
      render: (text, record, idx) => {
        return (
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn loại đối tượng"
            value={record?.LoaiDoiTuong}
            onChange={(value) => onChangeData(value, idx, "LoaiDoiTuong")}
          >
            <Option value={SoLieuDoiTuongTT.ToChuc}>Tổ chức</Option>
            <Option value={SoLieuDoiTuongTT.CaNhan}>Cá nhân</Option>
          </Select>
        );
      },
    },
    {
      title: "Đối tượng xử lý",
      dataIndex: "DoiTuongID",
      key: "DoiTuongID",
      width: "20%",
      render: (text, record, idx) => {
        return (
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn đối tượng xử lý"
            value={record?.DoiTuongID}
            onChange={(value) => onChangeData(value, idx, "DoiTuongID")}
          >
            {record.ListDoiTuong &&
              record.ListDoiTuong.map((item) => {
                return (
                  <Option key={item.ID} value={item.ID}>
                    {item.Ten}
                  </Option>
                );
              })}
          </Select>
        );
      },
    },
    {
      title: "Tổng số tiền vi phạm (tiền và tài sản quy thành tiền)",
      dataIndex: "TongSoTienViPham",
      key: "TongSoTienViPham",
      width: "20%",
      render: (text, record, idx) => {
        return (
          <InputNumberFormat
            key={idx}
            style={{ width: "100%" }}
            placeholder="Nhập số tiền xử phạt"
            value={record?.TongSoTienViPham}
            onChange={(value) => onChangeData(value, idx, "TongSoTienViPham")}
          />
        );
      },
    },
    {
      title: "Số tiền kiến nghị thu hồi",
      dataIndex: "phone",
      children: [
        {
          title: "Về NSNN",
          dataIndex: "SoTienNSNN",
          key: "SoTienNSNN",
          width: "10%",
          render: (text, record, idx) => {
            return (
              <InputNumberFormat
                value={record?.SoTienNSNN}
                onChange={(value) => onChangeData(value, idx, "SoTienNSNN")}
              />
            );
          },
        },
        {
          title: "Về tổ chức, đơn vị",
          dataIndex: "SoTienDVTC",
          key: "SoTienDVTC",
          width: "10%",
          render: (text, record, idx) => {
            return (
              <InputNumberFormat
                value={record?.SoTienDVTC}
                onChange={(value) => onChangeData(value, idx, "SoTienDVTC")}
              />
            );
          },
        },
      ],
    },
    {
      title: "Số tiền kiến nghị xử lý khác",
      dataIndex: "XuLyKhac",
      key: "XuLyKhac",
      width: "20%",
      render: (text, record, idx) => {
        return (
          <InputNumberFormat
            value={record?.XuLyKhac}
            onChange={(value) => onChangeData(value, idx, "XuLyKhac")}
          />
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record, idx) => {
        const disabled = !(
          record.TongSoTienViPham >= 0 &&
          record.TongSoTienViPham &&
          record.LoaiDoiTuong &&
          record.DoiTuongID &&
          ((record.SoTienDVTC >= 0 && record.SoTienDVTC) ||
            (record.SoTienNSNN >= 0 && record.SoTienNSNN) ||
            (record.XuLyKhac >= 0 && record.XuLyKhac))
        );
        return (
          <div className="btn-action">
            {idx === 0 ? (
              <Tooltip
                title={
                  disabled
                    ? "Vui lòng nhập đầy đủ thông tin để thêm mới"
                    : "Thêm mới"
                }
              >
                <SaveIcon
                  disabled={disabled}
                  style={{ fontSize: "18px" }}
                  onClick={() => (disabled ? null : onInsert(record))}
                />
              </Tooltip>
            ) : null}
            {idx > 0 ? (
              <Tooltip title="Xóa">
                <DeleteIcon onClick={() => onRemove(idx, record)} />
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <FormDynamic form={form} listFields={listFields} />
      <p>Danh sách đối tượng bị xử lý vi phạm về kinh tế</p>
      <BoxTable
        columns={columns}
        dataSource={ListDoiTuongXuLy}
        pagination={false}
      />
    </>
  );
};

const FormUpdateKienNghi = ({
  IsViewDetails,
  ListDoiTuongBiXuLyViPham,
  changedData,
  isView,
  ListDoiTuong,
}) => {
  const [ListDoiTuongBiXuLy, setListDoiTuongBiXuLy] = useState([]);
  useEffect(() => {
    const newListData = addParentPropertyToChildren(
      ListDoiTuongBiXuLy,
      "CapNhapSoLieuID"
    );

    changedData(newListData);
  }, [ListDoiTuongBiXuLy]);

  useEffect(() => {
    const addEmprtyChild = ListDoiTuongBiXuLyViPham
      ? ListDoiTuongBiXuLyViPham.map((item) => {
          return {
            ...item,
            Child: [{}, ...item.Child],
          };
        })
      : [];
    setListDoiTuongBiXuLy(
      !IsViewDetails ? addEmprtyChild : ListDoiTuongBiXuLyViPham
    );
  }, [ListDoiTuongBiXuLyViPham]);

  const addData = (record, indexParent) => {
    const newListDoiTuong = [...ListDoiTuongBiXuLy];
    const parent = newListDoiTuong[indexParent];
    if (parent.Child) {
      parent.Child.push({
        ...record,
        CapNhapSoLieuID: parent?.CapNhapSoLieuID,
      });
    } else {
      parent.Child = [{ ...record, CapNhapSoLieuID: parent?.CapNhapSoLieuID }];
    }
    parent.Child[0].SoTienNSNN = "";
    parent.Child[0].SoTienDVTC = "";
    parent.Child[0].XuLyKhac = "";
    parent.Child[0].NgayXuLy = "";
    setListDoiTuongBiXuLy(newListDoiTuong);
  };

  const removeData = (record, index, indexParent) => {
    const newListDoiTuong = [...ListDoiTuongBiXuLy];
    if (newListDoiTuong[indexParent]?.DeleteIDs) {
      newListDoiTuong[indexParent].DeleteIDs.push(
        record.CapNhapChiTietSoLieuID
      );
    } else {
      newListDoiTuong[indexParent].DeleteIDs = [record.CapNhapChiTietSoLieuID];
    }
    if (newListDoiTuong[indexParent].Child) {
      newListDoiTuong[indexParent].Child.splice(index, 1);
    }
    setListDoiTuongBiXuLy(newListDoiTuong);
  };

  const changeDataListDoiTuong = (data, property, index, indexParent) => {
    const newListDoiTuong = [...ListDoiTuongBiXuLy];
    if (newListDoiTuong[indexParent].Child) {
      newListDoiTuong[indexParent].Child[index][property] = data;
    } else {
      newListDoiTuong[indexParent].Child = [{ [property]: data }];
    }
    setListDoiTuongBiXuLy(newListDoiTuong);
  };

  const renderColumns = (indexParent) => {
    const columns = [
      {
        title: "Về NSNN",
        dataIndex: "SoTienNSNN",
        key: "SoTienNSNN",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>{getTextView(record?.SoTienNSNN)}</p>
          ) : (
            <InputNumberFormat
              value={getTextView(record?.SoTienNSNN)}
              disabled={isView}
              format="DD/MM/YYYY"
              onChange={(value) =>
                changeDataListDoiTuong(value, "SoTienNSNN", idx, indexParent)
              }
            />
          );
        },
      },
      {
        title: "Về tổ chức, đơn vị",
        dataIndex: "SoTienDVTC",
        key: "SoTienDVTC",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>{getTextView(record?.SoTienDVTC)}</p>
          ) : (
            <InputNumberFormat
              disabled={isView}
              value={getTextView(record?.SoTienDVTC)}
              format="DD/MM/YYYY"
              onChange={(value) =>
                changeDataListDoiTuong(value, "SoTienDVTC", idx, indexParent)
              }
            />
          );
        },
      },
      {
        title: "Số tiền xử lý khác đã thu",
        dataIndex: "XuLyKhac",
        key: "XuLyKhac",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>{getTextView(record?.XuLyKhac)}</p>
          ) : (
            <InputNumberFormat
              disabled={isView}
              value={getTextView(record?.XuLyKhac)}
              format="DD/MM/YYYY"
              onChange={(value) =>
                changeDataListDoiTuong(value, "XuLyKhac", idx, indexParent)
              }
            />
          );
        },
      },
      {
        title: "Ngày xử lý",
        dataIndex: "NgayXuLy",
        key: "NgayXuLy",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>
              {getTextView(record?.NgayXuLy)
                ? dayjs(getTextView(record?.NgayXuLy)).format("DD/MM/YYYY")
                : ""}
            </p>
          ) : (
            <DatePicker
              style={{ width: "100%" }}
              disabled={isView}
              value={
                getTextView(record?.NgayXuLy)
                  ? dayjs(getTextView(record?.NgayXuLy), "YYYY-MM-DD")
                  : null
              }
              format="DD/MM/YYYY"
              onChange={(value, valueStr) => {
                const newValue = value
                  ? dayjs(value).format("YYYY-MM-DD")
                  : null;

                changeDataListDoiTuong(newValue, "NgayXuLy", idx, indexParent);
              }}
            />
          );
        },
      },
    ];
    if (!IsViewDetails) {
      columns.push({
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        width: "5%",
        render: (text, record, idx) => {
          const disabled = !(
            ((record.SoTienNSNN >= 0 && record.SoTienNSNN) ||
              (record.XuLyKhac >= 0 && record.XuLyKhac) ||
              (record.SoTienDVTC >= 0 && record.SoTienDVTC)) &&
            record.NgayXuLy
          );

          return (
            <div className="btn-action">
              {idx === 0 ? (
                <Tooltip
                  title={
                    disabled
                      ? "Vui lòng nhập đầy đủ thông tin để thêm mới"
                      : "Thêm mới"
                  }
                >
                  <SaveIcon
                    disabled={disabled}
                    style={{ fontSize: "18px" }}
                    onClick={() =>
                      disabled ? null : addData(record, indexParent)
                    }
                  />
                </Tooltip>
              ) : null}
              {idx > 0 ? (
                <Tooltip title="Xóa">
                  <DeleteIcon
                    onClick={() => removeData(record, idx, indexParent)}
                  />
                </Tooltip>
              ) : null}
            </div>
          );
        },
      });
    }
    return columns;
  };

  const onChangeDataParent = (data, property, indexParent) => {
    const newListDoiTuong = [...ListDoiTuongBiXuLy];
    newListDoiTuong[indexParent][property] = data;
    setListDoiTuongBiXuLy(newListDoiTuong);
  };

  return (
    <WrapperInfo>
      <div className="wrapper">
        <p>Danh sách đối tượng bị xử lý vi phạm về kinh tế</p>
        {ListDoiTuongBiXuLy &&
          ListDoiTuongBiXuLy.map((item, indexParent) => (
            <>
              <div className="wrapper-info">
                <div className="info-list">
                  <div className="info-item">
                    <p>Loại đối tượng:</p>
                    {item.LoaiDoiTuong === SoLieuDoiTuongTT.CaNhan
                      ? "Cá nhân"
                      : item.LoaiDoiTuong === SoLieuDoiTuongTT.ToChuc
                      ? "Tổ chức"
                      : ""}
                  </div>
                  <div className="info-item">
                    <p>
                      Tổng số tiền vi phạm (tiền và tài sản quy thành tiền):
                    </p>
                    {formatNumberStr(item.TongSoTienViPham)}
                  </div>
                  <div className="info-item">
                    <p>Đối tượng xử lý:</p>
                    {item.TenDoiTuong}
                  </div>
                  <div className="info-item">
                    <p>Số tiền kiến nghị thu hồi về ngân sách nhà nước:</p>
                    {formatNumberStr(item.SoTienNSNN)}
                  </div>
                  <div className="info-item">
                    <p>Số tiền kiến nghị xử lý khác:</p>
                    {formatNumberStr(item.XuLyKhac)}
                  </div>
                  <div className="info-item">
                    <p>Số tiền kiến nghị thu hồi về tổ chức, đơn vị:</p>
                    {formatNumberStr(item.SoTienDVTC)}
                  </div>
                </div>
                <div className="info-table">
                  <div className="info-item">
                    <p>Chuyển điều tra:</p>
                    {/* {item.ChuyenDieuTra ? "Có" : "Không"} */}
                    <Checkbox
                      checked={item.ChuyenDieuTra}
                      disabled={IsViewDetails}
                      format={"DD/MM/YYYY"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        onChangeDataParent(
                          checked,
                          "ChuyenDieuTra",
                          indexParent
                        );
                      }}
                    />
                  </div>
                  <div className="info-item">
                    <p>Ngày chuyển:</p>
                    <DatePickerFormat
                      disabled={IsViewDetails || !item.ChuyenDieuTra}
                      value={
                        item.NgayChuyen
                          ? dayjs(item.NgayChuyen, "YYYY-MM-DD")
                          : null
                      }
                      format={"DD/MM/YYYY"}
                      onChange={(value) => {
                        const newValue = value
                          ? dayjs(value).format("YYYY-MM-DD")
                          : null;
                        onChangeDataParent(newValue, "NgayChuyen", indexParent);
                      }}
                    />
                  </div>
                  <div className="info-item">
                    <p>Khởi tố:</p>
                    {/* {item.KhoiTo ? "Có" : "Không"} */}
                    <Checkbox
                      disabled={IsViewDetails}
                      checked={item.KhoiTo}
                      format={"DD/MM/YYYY"}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        onChangeDataParent(checked, "KhoiTo", indexParent);
                      }}
                    />
                  </div>
                  <div className="info-item">
                    <p>Ngày khởi tố:</p>
                    <DatePickerFormat
                      disabled={IsViewDetails || !item.KhoiTo}
                      value={
                        item.NgayKhoiTo
                          ? dayjs(item.NgayKhoiTo, "YYYY-MM-DD")
                          : null
                      }
                      format={"DD/MM/YYYY"}
                      onChange={(value) => {
                        const newValue = value
                          ? dayjs(value).format("YYYY-MM-DD")
                          : null;
                        onChangeDataParent(newValue, "NgayKhoiTo", indexParent);
                      }}
                    />
                  </div>
                </div>
                <div className="wrapper-table">
                  <BoxTable
                    columns={renderColumns(indexParent)}
                    dataSource={item.Child}
                    pagination={false}
                  />
                </div>
              </div>
            </>
          ))}
      </div>
    </WrapperInfo>
  );
};

const ModalKienNghiXuLyViPhamKinhTe = ({
  visible,
  onCancel,
  onOk,
  actionType,
  ListDoiTuong,
  ListKetLuan,
  dataEdit,
  action,
}) => {
  const [form] = useForm();
  const [ListDoiTuongXuLy, setListDoiTuongXuLy] = useState([{}]);
  const [ListDoiTuongBiXuLyViPham, setListDoiTuongBiXuLyViPham] = useState([]);

  useEffect(() => {
    if (dataEdit && dataEdit.ListDoiTuongXuLy) {
      setListDoiTuongBiXuLyViPham(dataEdit.ListDoiTuongXuLy);
    }
    if (actionType === action.UPDATE) {
      const newData = dataEdit.Child ? dataEdit.Child : [];
      const mappingData = [...newData].map((item) => ({
        ...item,
        ListDoiTuong: ListDoiTuong.filter(
          (itemFind) => itemFind.LoaiDoiTuong === item.LoaiDoiTuong
        ),
      }));
      setListDoiTuongXuLy([{}, ...mappingData]);
      form.setFieldsValue({
        ...dataEdit,
        DeleteIDs: dataEdit.DeleteIDs ? dataEdit.DeleteIDs : [],
      });
    }
  }, [dataEdit]);

  const onChangeData = (value, index, name) => {
    const newListDoiTuongXuLy = [...ListDoiTuongXuLy];

    // Cập nhật giá trị của field hiện tại
    newListDoiTuongXuLy[index][name] = value;

    // Xử lý khi thay đổi LoaiDoiTuong
    if (name === "LoaiDoiTuong" && newListDoiTuongXuLy[index]) {
      if (value) {
        newListDoiTuongXuLy[index].ListDoiTuong = ListDoiTuong.filter(
          (item) =>
            item.LoaiDoiTuong === value &&
            !newListDoiTuongXuLy.some(
              (itemFind) =>
                itemFind.DoiTuongID === item.ID &&
                itemFind !== newListDoiTuongXuLy[index]
            )
        );
        // Reset lại DoiTuongID vì loại đối tượng thay đổi
        newListDoiTuongXuLy[index].DoiTuongID = "";
      } else {
        newListDoiTuongXuLy[index].DoiTuongID = "";
        newListDoiTuongXuLy[index].ListDoiTuong = [];
      }
    }

    // Xử lý khi thay đổi DoiTuongID
    else if (name === "DoiTuongID") {
      // Cập nhật lại danh sách options cho tất cả các item
      newListDoiTuongXuLy.forEach((item, idx) => {
        // Tạo danh sách các DoiTuongID đã được chọn (ngoại trừ chính nó)
        const selectedDoiTuongIDs = newListDoiTuongXuLy
          .filter((_, innerIdx) => innerIdx !== idx)
          .map((item) => item.DoiTuongID);

        // Cập nhật lại danh sách ListDoiTuong của item hiện tại
        item.ListDoiTuong = ListDoiTuong.filter(
          (doiTuong) =>
            doiTuong.LoaiDoiTuong === item.LoaiDoiTuong &&
            !selectedDoiTuongIDs.includes(doiTuong.ID)
        );
      });
    }

    // Cập nhật lại state
    setListDoiTuongXuLy(newListDoiTuongXuLy);
  };

  const changedData = (newData) => {
    setListDoiTuongXuLy(newData);
  };

  const addData = (data) => {
    const newData = [...ListDoiTuongXuLy];
    newData.push({ ...data });
    newData[0] = {};
    setListDoiTuongXuLy(newData);
  };

  const removeData = (index, record) => {
    const newData = [...ListDoiTuongXuLy];
    const oldValue = form?.getFieldsValue()?.DeleteIDs
      ? form?.getFieldsValue()?.DeleteIDs
      : [];
    form.setFieldsValue({ DeleteIDs: [...oldValue, record.CapNhapSoLieuID] });
    newData.splice(index, 1);
    setListDoiTuongXuLy(newData);
  };

  const handleOK = () => {
    form.validateFields().then((values) => {
      onOk({ ...values, ListDoiTuongXuLy });
    });
  };
  // 1 : thêm mới
  // 2 : cập nhật
  // 3 : chi tiết
  const checkUpdate = actionType === action.EDIT;
  const checkView = actionType === action.VIEW;
  const passingProps = {
    form,
    ListDoiTuongXuLy,
    onInsert: addData,
    onRemove: removeData,
    ListDoiTuongBiXuLyViPham,
    onChangeData,
    ListDoiTuong,
    ListKetLuan,
    changedData,
    isView: checkView,
  };

  const isUpdate = actionType === action.UPDATE;
  return (
    <ModalForm
      visible={visible}
      onCancel={onCancel}
      onOk={handleOK}
      form={form}
      width={1700}
      hiddenSave={checkView}
      disabledSave={
        actionType === action.ADD || actionType === action.UPDATE
          ? !(ListDoiTuongXuLy?.length > 1)
          : false
      }
      titleDisabledSave="Vui lòng thêm ít nhất 1 đối tượng"
      title={
        actionType === action.ADD
          ? "Thêm nội dung xử lý vi phạm về kinh tế (TTKT chuyên ngành)"
          : actionType === action.EDIT
          ? "Cập nhật kết quả xử lý kiến nghị xử lý vi phạm kinh tế"
          : actionType === action.VIEW
          ? "Thông tin chi tiết kiến nghị xử lý vi phạm về kinh tế (thanh tra, kiểm tra chuyên ngành)"
          : actionType === action.UPDATE
          ? "Cập nhật nội dung xử lý vi phạm về kinh tế (TTKT chuyên ngành)"
          : ""
      }
    >
      {checkUpdate || checkView ? (
        <FormUpdateKienNghi
          form={form}
          IsViewDetails={checkView}
          {...passingProps}
        />
      ) : (
        <FormKienNghi isUpdate={isUpdate} form={form} {...passingProps} />
      )}
    </ModalForm>
  );
};

export default ModalKienNghiXuLyViPhamKinhTe;
