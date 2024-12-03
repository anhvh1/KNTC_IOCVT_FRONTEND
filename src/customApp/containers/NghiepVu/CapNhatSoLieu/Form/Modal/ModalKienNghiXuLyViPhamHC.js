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
import { WrapperInfo } from "../form.style";
import DatePickerFormat from "../../../../../../components/uielements/datePickerFormat";
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
    {
      name: "QuyetDinhThuHoi",
      label: "Quyết định thu hồi",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "NgayBanHanh",
      label: "Ngày ban hành",
      type: FORM.DatePicker,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ThoiHan",
      label: "Thời hạn",
      required: true,
      type: FORM.DatePicker,
      col: FORMCOL.Col1P2,
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
      title: "Số tiền xử phạt",
      dataIndex: "SoTienXuPhat",
      key: "SoTienXuPhat",
      width: "20%",
      render: (text, record, idx) => {
        return (
          <InputNumberFormat
            key={idx}
            style={{ width: "100%" }}
            placeholder="Nhập số tiền xử phạt"
            value={record?.SoTienXuPhat}
            onChange={(value) => onChangeData(value, idx, "SoTienXuPhat")}
          />
        );
      },
    },
    {
      title: "Xử phạt bằng hình thức khác",
      dataIndex: "XuPhatBangHinhThucKhac",
      key: "XuPhatBangHinhThucKhac",
      width: "20%",
      render: (text, record, idx) => {
        return (
          <Input
            value={record?.XuPhatBangHinhThucKhac}
            onChange={(e) =>
              onChangeData(e.target.value, idx, "XuPhatBangHinhThucKhac")
            }
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
          ((record.XuPhatBangHinhThucKhac !== "" &&
            record.XuPhatBangHinhThucKhac) ||
            (record.SoTienXuPhat && record.SoTienXuPhat >= 0)) &&
          record.LoaiDoiTuong &&
          record.DoiTuongID
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
      <p>Danh sách đối tượng bị xử lý vi phạm về hành chính</p>
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
}) => {
  const [ListDoiTuongBiXuLy, setListDoiTuongBiXuLy] = useState([]);
  useEffect(() => {
    const newListData = addParentPropertyToChildren(
      ListDoiTuongBiXuLy,
      "CapNhapSoLieuID"
    );
    const filterDataChild = (data) => {
      if (data) {
        const newListData = [...data].map((item) => {
          return {
            ...item,
            Child: item.Child.filter(
              (item) =>
                item.SoTienXuPhatDaThu || item.XuPhatBangHinhThucKhacDaThu
            ),
          };
        });
        return newListData;
      }
    };
    const dataChanged = filterDataChild(newListData);

    changedData(dataChanged);
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
      IsViewDetails ? ListDoiTuongBiXuLyViPham : addEmprtyChild
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
    parent.Child[0].SoTienXuPhatDaThu = "";
    parent.Child[0].XuPhatBangHinhThucKhacDaThu = "";
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
        title: "Số tiền xử phạt đã thu",
        dataIndex: "SoTienXuPhatDaThu",
        key: "SoTienXuPhatDaThu",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>{getTextView(record?.SoTienXuPhatDaThu)}</p>
          ) : (
            <InputNumberFormat
              disabled={isView}
              value={getTextView(record?.SoTienXuPhatDaThu)}
              format="DD/MM/YYYY"
              onChange={(value) =>
                changeDataListDoiTuong(
                  value,
                  "SoTienXuPhatDaThu",
                  idx,
                  indexParent
                )
              }
            />
          );
        },
      },

      {
        title: "Ngày xử lý",
        dataIndex: "XuPhatBangHinhThucKhacDaThu",
        key: "XuPhatBangHinhThucKhacDaThu",
        width: "10%",
        render: (text, record, idx) => {
          return isView ? (
            <p>{getTextView(record?.XuPhatBangHinhThucKhacDaThu)}</p>
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

      // {
      //   title: "Xử phạt khác đã thu",
      //   dataIndex: "XuPhatBangHinhThucKhacDaThu",
      //   key: "XuPhatBangHinhThucKhacDaThu",
      //   width: "10%",
      //   render: (text, record, idx) => {
      //     return isView ? (
      //       <p>{getTextView(record?.XuPhatBangHinhThucKhacDaThu)}</p>
      //     ) : (
      //       <InputNumberFormat
      //         disabled={isView}
      //         value={getTextView(record?.XuPhatBangHinhThucKhacDaThu)}
      //         format="DD/MM/YYYY"
      //         onChange={(value) =>
      //           changeDataListDoiTuong(
      //             value,
      //             "XuPhatBangHinhThucKhacDaThu",
      //             idx,
      //             indexParent
      //           )
      //         }
      //       />
      //     );
      //   },
      // },
    ];
    if (!IsViewDetails) {
      columns.push({
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        width: "5%",
        render: (text, record, idx) => {
          const disabled = !(
            (record.SoTienXuPhatDaThu >= 0 && record.SoTienXuPhatDaThu) ||
            (record.XuPhatBangHinhThucKhacDaThu >= 0 &&
              record.XuPhatBangHinhThucKhacDaThu)
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
        <p className="subtitle">
          Danh sách đối tượng bị xử lý vi phạm về kinh tế
        </p>
        {ListDoiTuongBiXuLy &&
          ListDoiTuongBiXuLy.map((item, indexParent) => (
            <>
              <div className="wrapper-info">
                <div className="info-list">
                  <div className="info-item">
                    <p>Thông tin quyết định:</p>
                    {item.QuyetDinhThuHoi}
                  </div>
                  <div className="info-item">
                    <p>Loại đối tượng:</p>
                    {item.LoaiDoiTuong === SoLieuDoiTuongTT.CaNhan
                      ? "Cá nhân"
                      : item.LoaiDoiTuong === SoLieuDoiTuongTT.ToChuc
                      ? "Tổ chức"
                      : ""}
                  </div>
                  <div className="info-item">
                    <p>Đối tượng xử lý:</p>
                    {item.TenDoiTuong}
                  </div>
                  <div className="info-item">
                    <p>Số tiền xử phạt:</p>
                    {formatNumberStr(item.SoTienXuPhat)}
                  </div>
                  <div className="info-item">
                    <p>Xử phạt bằng hình thức khác:</p>
                    {item.XuPhatBangHinhThucKhac}
                  </div>
                </div>
                <div className="info-table">
                  <div className="info-item">
                    <p>Chuyển điều tra:</p>
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
                      onChange={(value, valueStr) => {
                        const newValue = value
                          ? dayjs(value).format("YYYY-MM-DD")
                          : null;
                        onChangeDataParent(newValue, "NgayChuyen", indexParent);
                      }}
                    />
                  </div>
                  <div className="info-item">
                    <p>Khởi tố:</p>

                    <Checkbox
                      checked={item.KhoiTo}
                      disabled={IsViewDetails}
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
                <div className="wrapper-info" style={{ border: "none" }}>
                  <div className="info-list">
                    <div className="info-item__horizontal">
                      <p>Xử phạt bằng hình thức khác:</p>
                      <p>{item.XuPhatBangHinhThucKhac}</p>
                    </div>
                    <div className="info-item__horizontal">
                      <div
                        style={{ display: "inline-block", textAlign: "center" }}
                      >
                        <p>Đã thực hiện</p>
                        <Checkbox
                          checked={item.DuocThucHien}
                          disabled={IsViewDetails}
                          format={"DD/MM/YYYY"}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            onChangeDataParent(
                              checked,
                              "DuocThucHien",
                              indexParent
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </WrapperInfo>
  );
};

const ModalKienNghiXuLyViPhamHC = ({
  visible,
  onCancel,
  onOk,
  actionType,
  ListDoiTuong,
  ListKetLuan,
  dataEdit,
  action,
  isNotAction,
}) => {
  const [form] = useForm();
  const [ListDoiTuongXuLy, setListDoiTuongXuLy] = useState([{}]);
  const [ListDoiTuongBiXuLyViPham, setListDoiTuongBiXuLyViPham] = useState([]);

  useEffect(() => {
    if (dataEdit) {
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
        NgayBanHanh: dataEdit?.NgayBanHanh
          ? dayjs(dataEdit?.NgayBanHanh)
          : null,
        ThoiHan: dataEdit?.ThoiHan ? dayjs(dataEdit?.ThoiHan) : null,
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
      onOk({
        ...values,
        ListDoiTuongXuLy,
        ThoiHan: values?.ThoiHan
          ? dayjs(values?.ThoiHan).format("YYYY-MM-DD")
          : null,
        NgayBanHanh: values?.NgayBanHanh
          ? dayjs(values?.NgayBanHanh).format("YYYY-MM-DD")
          : null,
      });
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
          ? "Thêm nội dung xử lý vi phạm về hành chính (TTKT chuyên ngành)"
          : actionType === action.EDIT
          ? "Cập nhật kết quả xử lý kiến nghị xử lý vi phạm hành chính"
          : actionType === action.VIEW
          ? "Thông tin chi tiết kiến nghị xử lý vi phạm về hành chính (thanh tra, kiểm tra chuyên ngành)"
          : actionType === action.UPDATE
          ? "Cập nhật nội dung xử lý vi phạm về hành chính (TTKT chuyên ngành)"
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
        <FormKienNghi form={form} {...passingProps} isUpdate={isUpdate} />
      )}
    </ModalForm>
  );
};

export default ModalKienNghiXuLyViPhamHC;
