import React, { useState } from "react";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { FORM, FORMCOL, REQUIRED } from "../../../../../settings/constants";
import FormDynamic from "../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
import { DatePicker, Row } from "antd";
import DowloadIcon from "../../../../../components/utility/DowloadIcon";
import BoxTable from "../../../../../components/utility/boxTable";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import { Tooltip } from "antd";
import Button from "../../../../../components/uielements/button";
import AddIcon from "../../../../../components/utility/AddIcon";
import { useForm } from "../../../../../components/uielements/formValidator";
import DynamicTableHeader from "../../Shared/Component/TableHeader";
import TableWrapper from "../../Shared/Component/style/Table.style";
import { Input } from "../../../../../components/uielements/exportComponent";
import { SaveIcon } from "../../../../../components/utility/SaveIcon";
import { CloudUploadOutlined } from "@ant-design/icons";
import {
  Select,
  Option,
} from "../../../../../components/uielements/exportComponent";
import Upload from "../../../../../components/uielements/upload";
import { useEffect } from "react";
import { Col } from "antd";
import CloudUploadIcon from "../../../../../components/utility/CloudUploadIcon";
import dayjs from "dayjs";
import { getValueConfigLocalByKey } from "../../../../../helpers/utility";
const FormInspect = ({ form, title, dataFields }) => {
  // Define the dynamic fields
  const [ListMemberLead, setListMemberLead] = useState([]);
  const [ListMemberExternal, setListMemberExternal] = useState([]);
  const newDataFields = dataFields ? { ...dataFields } : {};
  const [ListXoa, setListXoa] = useState([]);
  const [ListXoaFileIds, setListXoaFileIds] = useState([]);
  const {
    DanhSachThayDoiThanhVien,
    DanhSachThayDoiTruongDoan,
    ThanhVienDoanThanhTra,
  } = newDataFields;

  useEffect(() => {
    if (DanhSachThayDoiTruongDoan) {
      setListMemberLead(DanhSachThayDoiTruongDoan);
    }
    if (DanhSachThayDoiThanhVien) {
      const newDanhSachThayDoiThanhVien = DanhSachThayDoiThanhVien.map(
        (item) => {
          return {
            ...item,
            ThanhVienNgoaiDonVi: item.ThanhVienNgoaiDonVi
              ? [{}, ...item.ThanhVienNgoaiDonVi]
              : [{}],
          };
        }
      );

      setListMemberExternal(newDanhSachThayDoiThanhVien);
    }
  }, [dataFields]);

  const filerList = (List, type) => {
    if (List) {
      return List.filter(
        (item) => item.VaiTroID === type || item.VaiTro === type
      );
    } else {
      return [];
    }
  };

  const dataMapping = dataFields?.ThanhVienDoanThanhTra
    ? dataFields?.ThanhVienDoanThanhTra
    : {};

  const listFields = [
    {
      name: "ThayDoiThanhVien",
      label: "",
      hidden: true,
      isWrap: true,
    },
    {
      name: "ThayDoiDoanTruong",
      label: "",
      type: FORM.Input,
      hidden: true,
      isWrap: true,
      disabled: true,
    },
    {
      name: "TruongDoanStr",
      label: "Trưởng đoàn",
      type: FORM.Input,

      props: {
        disabled: true,
      },
    },
    {
      name: "PhoDoanStr",
      label: "Phó đoàn",
      type: FORM.Input,
      props: {
        disabled: true,
      },
    },
    {
      name: "ThanhVienStr",
      label: "Thành viên",
      type: FORM.Input,
      props: {
        disabled: true,
      },
    },
    {
      name: "ListXoa",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "ListXoaFileIds",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
  ];

  const listFieldsLead = [
    {
      name: "ID",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "SoLan",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "ThayDoiDoanTruong",
      label: "",
      type: FORM.Input,
      hidden: true,
      isWrap: true,
    },
    {
      name: "SoVanBan",
      label: "Số văn bản",
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
      name: "DonViBanHanh",
      label: "Đơn vị, cơ quan ban hành",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "TrichYeu",
      label: "Trích yếu",
      type: FORM.Input,
      // required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "NguoiKy",
      label: "Người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ChucVuNguoiKy",
      label: "Chức vụ người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "TruongDoanStr",
      label: "Trưởng đoàn",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ListFiles",
      label: "File đính kèm",
      type: FORM.Upload,

      col: FORMCOL.Col1P2,
    },
  ];

  const listFieldsExternal = [
    {
      name: "ID",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "SoLan",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "ThanhVienNgoaiDonVis",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "ThayDoiThanhVien",
      label: "",
      type: FORM.Input,
      hidden: true,
      isWrap: true,
    },
    {
      name: "SoVanBan",
      label: "Số văn bản",
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
      name: "DonViBanHanh",
      label: "Đơn vị, cơ quan ban hành",
      type: FORM.Input,
      required: true,
      options: [{ value: "1", label: "Chánh thanh tra - Phạm Thành Long" }],
      col: FORMCOL.Col1P2,
    },
    {
      name: "TrichYeu",
      label: "Trích yếu",
      type: FORM.Input,
      col: FORMCOL.Col1P2,
    },
    {
      name: "NguoiKy",
      label: "Người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ChucVuNguoiKy",
      label: "Chức vụ người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ThanhVienStr",
      label: "Thành viên",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ListFiles",
      label: "File đính kèm",
      type: FORM.Upload,
      col: FORMCOL.Col1P2,
    },
  ];

  const addMemberExternal = (index, record) => {
    const newListMemberExternal = [...ListMemberExternal];
    if (newListMemberExternal && index >= 0) {
      const { ThanhVienNgoaiDonVi } = newListMemberExternal[index];
      if (ThanhVienNgoaiDonVi) {
        ThanhVienNgoaiDonVi.push({ ...record });
        const rowInput = ThanhVienNgoaiDonVi[0];
        if (rowInput) {
          rowInput.TenCanBo = "";
          rowInput.DonViCongTac = "";
        }
        setListMemberExternal(newListMemberExternal);
      }
    }
  };

  const addListMemberExternal = (index) => {
    const newListMemberExternal = [...ListMemberExternal];
    newListMemberExternal.unshift({
      isView: true,
      ThanhVienNgoaiDonVi: [{}],
      SoLan: ListMemberExternal ? ListMemberExternal.length + 1 : 1,
    });
    setListMemberExternal(newListMemberExternal);
  };

  const RemoveItemMemberExternal = (index, item) => {
    const newList = ListMemberExternal.filter((item, idx) => idx !== index);
    const newListXoa = [...ListXoa];
    if (item) {
      newListXoa.push(item?.ID);
      setListXoa(newListXoa);
    }
    setListMemberExternal(newList);
  };

  const handleRemoveMember = (index, idx) => {
    if (index >= 0) {
      const newListMemberExternal = [...ListMemberExternal];
      newListMemberExternal[index].ThanhVienNgoaiDonVi.splice(idx, 1);
      setListMemberExternal(newListMemberExternal);
    }
  };

  const addMemberLead = (data) => {
    const newListMemberLead = [...ListMemberLead];
    newListMemberLead.unshift({
      isView: true,
      SoLan: ListMemberLead ? ListMemberLead.length + 1 : 1,
    });
    setListMemberLead(newListMemberLead);
  };

  const handleRemoveMemberLead = (index, item) => {
    const newList = ListMemberLead.filter((item, idx) => idx !== index);
    const newListXoa = [...ListXoa];
    if (item) {
      newListXoa.push(item?.ID);
      setListXoa(newListXoa);
    }
    setListMemberLead(newList);
  };

  const checkDisabledLead = ListMemberLead.find((item) => item.isView);
  const checkDisabledExternal = ListMemberExternal.find((item) => item.isView);

  const onChangeForm = (name, value, index) => {
    const newListMemberExternal = [...ListMemberExternal];
    newListMemberExternal[index] = {
      ...newListMemberExternal[index],
      ...value,
    };

    setListMemberExternal(newListMemberExternal);
    // setListMemberExternal()
    // form.setFieldsValue({
    //   [name]: value,
    // });
  };

  const getPrefixName = (type) => {
    if (type === 1) {
      return "FormLead__";
    } else if (type === 2) {
      return "FormExternal__";
    }
  };

  const handleChangeMemberExternal = (value, indexParent, name, idx) => {
    const newListMemberExternal = [...ListMemberExternal];
    if (newListMemberExternal[indexParent]) {
      const target =
        newListMemberExternal[indexParent].ThanhVienNgoaiDonVi[idx];
      target[name] = value;
    }
    setListMemberExternal(newListMemberExternal);
  };

  // assign ThanhVienNgoaiDonVis to form
  useEffect(() => {
    const newListMemberExternal = [...ListMemberExternal];
    if (newListMemberExternal && newListMemberExternal.length) {
      const ThanhVienNgoaiDonVis = newListMemberExternal[0].ThanhVienNgoaiDonVi;
      form.setFieldsValue({
        FormExternal__ThanhVienNgoaiDonVis: ThanhVienNgoaiDonVis,
      });
    }
  }, [ListMemberExternal]);

  // assign ListXoa to form
  useEffect(() => {
    if (ListXoa && ListXoa.length) {
      form.setFieldsValue({
        ListXoa: ListXoa,
      });
    }
  }, [ListXoa]);

  // assign ListXoaFileIds to form
  useEffect(() => {
    if (ListXoaFileIds && ListXoaFileIds.length) {
      form.setFieldsValue({
        ListXoaFileIds: ListXoaFileIds,
      });
    }
  }, [ListXoaFileIds]);

  const renderColumns = (index) => {
    return [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: "5%",
        align: "left",
        render: (text, record, idx) => {
          return <p style={{ textAlign: "center" }}>{idx + 1}</p>;
        },
      },
      {
        title: "Họ và tên",
        dataIndex: "HoVaTen",
        key: "HoVaTen",
        width: "20%",
        render: (text, record, idx) => {
          return (
            <Input
              disabled={index > 0}
              placeholder="Nhập họ và tên"
              value={record?.TenCanBo}
              onChange={(e) =>
                handleChangeMemberExternal(
                  e.target.value,
                  index,
                  "TenCanBo",
                  idx
                )
              }
            />
          );
        },
      },
      {
        title: "Đơn vị công tác",
        dataIndex: "DonViCongTac",
        key: "DonViCongTac",
        width: "30%",
        render: (text, record, idx) => {
          return (
            <Input
              disabled={index > 0}
              placeholder="Nhập đơn vị công tác"
              value={record?.DonViCongTac}
              onChange={(e) =>
                handleChangeMemberExternal(
                  e.target.value,
                  index,
                  "DonViCongTac",
                  idx
                )
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
          const disabled = !(record.TenCanBo && record.DonViCongTac);
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
                  {index === 0 ? (
                    <SaveIcon
                      disabled={disabled}
                      style={{ fontSize: "18px" }}
                      onClick={() =>
                        disabled ? null : addMemberExternal(index, record)
                      }
                    />
                  ) : null}
                </Tooltip>
              ) : null}
              {idx > 0 ? (
                <Tooltip title="Xóa">
                  {index === 0 ? (
                    <DeleteIcon
                      onClick={() => handleRemoveMember(index, idx)}
                    />
                  ) : null}
                </Tooltip>
              ) : null}
            </div>
          );
        },
      },
    ];
  };

  const handleRemoveFile = (file) => {
    const newListXoaFileIds = [...ListXoaFileIds];
    if (file?.FileID) {
      newListXoaFileIds.push(file?.FileID);
      setListXoaFileIds(newListXoaFileIds);
    }
  };

  const colDefault = {
    span: 24,
  };

  const onChangeData = (name, value, index) => {
    const newListMemberExternal = [...ListMemberExternal];
    newListMemberExternal[index][name] = value;
    setListMemberExternal(newListMemberExternal);
  };

  const genDataFileDinhKem = (base64, file, listFile, name, ListFiles = []) => {
    const newListFiles = [...ListFiles, ...listFile];
    console.log(newListFiles, "newListFields");
  };

  const getBase64 = (file, callback, listFile, name, ListFiles) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile, name, ListFiles)
    );
    reader.readAsDataURL(file);
  };

  const beforeUploadFile = (file, callback, listFile, name, ListFiles = []) => {
    try {
      const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
      const isLt2M = file.size / 1024 / 1024 < FileLimit;
      const ListFileExist = [];
      listFile?.forEach((file) => {
        const ExistFile = ListFiles.filter(
          (item) => item.TenFileGoc === file.name
        );
        if (ExistFile.length) {
          ListFileExist.push(file);
        }
      });
      if (!isLt2M) {
        message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
      } else {
        getBase64(file, callback, listFile, name, ListFiles);
      }
      return false;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleRenderItem = (item, index) => {
    const InitCol = item.col ? item.col : colDefault;
    const rawElement = () => {
      const value = ListMemberExternal[index][item.name];
      switch (item.type || item.hidden) {
        case FORM.Input:
          return (
            <>
              <p>
                {item.label}
                {item.required ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                ) : null}
              </p>
              <Input
                value={value}
                onChange={(e) => onChangeData(item.name, e.target.value, index)}
              />
            </>
          );
        case FORM.InputNumber:
          return (
            <>
              <p>
                {item.label}
                {item.required ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                ) : null}
              </p>
              <InputNumberFormat
                {...item.props}
                value={value}
                onChange={(value) => onChangeData(item.name, value, index)}
              />
            </>
          );
        case FORM.InputTextArea:
          return (
            <>
              <p>
                {item.label}
                {item.required ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                ) : null}
              </p>
              <TextArea
                {...item.props}
                value={value}
                onChange={(value) => onChangeData(item.name, value, index)}
              />
            </>
          );

        case FORM.DatePicker:
          return (
            <>
              <p>
                {item.label}
                {item.required ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                ) : null}
              </p>
              <DatePicker
                {...item.props}
                style={{ width: "100%" }}
                value={value ? dayjs(value, "YYYY-MM-DD") : null}
                format={"DD/MM/YYYY"}
                onChange={(value, valueStr) => {
                  const newData = valueStr
                    ? dayjs(valueStr).format("YYYY-MM-DD")
                    : null;
                  onChangeData(item.name, newData, index);
                }}
              />
            </>
          );
        case FORM.Upload:
          return (
            <>
              <p>
                {item.label}
                {item.required ? (
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                ) : null}
              </p>
              <Upload
                {...item.props}
                showUploadList={false}
                action={false}
                actions={false}
                multiple={true}
                beforeUpload={(file, listFile) => {
                  beforeUploadFile(
                    file,
                    genDataFileDinhKem,
                    listFile,
                    item.name,
                    item?.ListFiles || []
                  );
                }}
                disabled={item.loadingFile}
              >
                <Button
                  type="primary"
                  icon={<CloudUploadIcon />}
                  loading={item.loadingFile}
                >
                  Chọn tệp từ máy tính
                </Button>
              </Upload>

              {item && item?.ListFiles && item?.ListFiles.length > 0 && (
                <div className="list-file-upload">
                  {item?.ListFiles.map((file, index) => (
                    <div className="file-item" key={file.id}>
                      <a href={file.UrlFile} target="_blank">
                        {file.name || file.TenFile}
                      </a>
                      {/* {file.UrlFile && (
                          <DowloadIcon
                            onClick={() => dowloadFile(file.UrlFile)}
                          />
                        )} */}
                      <DeleteIcon
                        onClick={() => deleteFile(item, index, file)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          );
      }
    };

    return item.hidden ? null : (
      <Col {...InitCol}>
        {rawElement()}
        {item.isWarning === true ? (
          <p style={{ color: "red" }}>Vui lòng nhập đầy đủ thông tin</p>
        ) : null}
      </Col>
    );
  };

  return (
    <>
      <p className="title">{title}</p>
      <FormDynamic listFields={listFields} data={dataMapping} form={form} />
      <div className="actions-btn">
        <Button
          type="primary"
          disabled={checkDisabledLead}
          onClick={() => addMemberLead()}
        >
          <AddIcon /> Cập nhật thay đổi trưởng đoàn
        </Button>
        <Button
          type="primary"
          disabled={checkDisabledExternal}
          onClick={() => addListMemberExternal()}
        >
          <AddIcon /> Cập nhật thay đổi thành viên đoàn
        </Button>
      </div>
      <div className="wrapper-fields">
        {/* {ListMemberLead.length
          ? ListMemberLead.map((item, index) => {
              const checkIsNotClearData =
                ListMemberLead.length > 0 && index === 0 ? false : true;
              return (
                <div className="field-item">
                  <div className="field-top">
                    <p className="field-item__title">
                      Thông tin thay đổi trưởng đoàn lần {item?.SoLan}
                    </p>
                    <Tooltip
                      title={`Xóa thông tin thay đổi lần thứ ${item?.SoLan}`}
                      placement="left"
                    >
                      <DeleteIcon
                        className="danger-icon"
                        onClick={() => handleRemoveMemberLead(index, item)}
                      />{" "}
                    </Tooltip>
                  </div>
                  <FormDynamic
                    form={index === 0 ? form : undefined}
                    listFields={listFieldsLead}
                    key={`FormLead${index}`}
                    disabledAll={index === 0 ? false : true}
                    name="FormLead"
                    onChangeForm={onChangeForm}
                    prefixName={getPrefixName(1)}
                    onGetPrefixName={getPrefixName}
                    onRemoveFile={handleRemoveFile}
                    data={item?.SoVanBan ? { ...item } : form.getFieldsValue()}
                    isNotClearData={checkIsNotClearData}
                  />
                </div>
              );
            })
          : true} */}
      </div>
      <div className="wrapper-member">
        {ListMemberExternal.length
          ? ListMemberExternal.map((item, index) => {
              const ThanhVien = filerList(
                item?.ListCanBo ? item?.ListCanBo : [],
                3
              );
              const ThanhVienIDS = ThanhVien
                ? ThanhVien?.map((item) => item.CanBoID)
                : [];

              const handleCheck = () => {
                if (index === 0) {
                  const data = item.ThanhVienNgoaiDonVi.filter(
                    (item) => item.TenCanBo && item.TenCanBo !== ""
                  );

                  if (data.length > 0) {
                    return true;
                  } else {
                    return false;
                  }
                }
                if (ListMemberExternal.length > 0 && index === 0) {
                  return false;
                } else {
                  return true;
                }
              };

              const checkIsNotClearData = handleCheck();
              console.log(checkIsNotClearData, "checkIsNotClearData");
              return (
                <div className="field-item">
                  <div className="field-top">
                    <p className="field-item__title">
                      Thông tin thay đổi thành viên lần {item?.SoLan}
                    </p>
                    <Tooltip title={`Xóa thành viên lần ${item?.SoLan}`}>
                      <DeleteIcon
                        className="danger-icon"
                        onClick={() => RemoveItemMemberExternal(index, item)}
                      />
                    </Tooltip>
                  </div>
                  {/* <Row gutter={[16, 16]}>
                    {listFieldsExternal &&
                      listFieldsExternal.map((item) =>
                        handleRenderItem(item, index)
                      )}
                  </Row> */}
                  <FormDynamic
                    form={index === 0 ? form : undefined}
                    listFields={listFieldsExternal}
                    key={`FormLead${index}`}
                    disabledAll={index === 0 ? false : true}
                    name="FormLead"
                    // onChangeForm={onChangeForm}
                    prefixName={getPrefixName(1)}
                    onGetPrefixName={getPrefixName}
                    onRemoveFile={handleRemoveFile}
                    data={
                      item.SoVanBan || !checkIsNotClearData
                        ? item
                        : form.getFieldsValue()
                    }
                    isNotClearData={checkIsNotClearData}
                  />

                  <p className="subtitle">Thành viên ngoài đơn vị</p>

                  <BoxTable
                    columns={renderColumns(index)}
                    dataSource={item.ThanhVienNgoaiDonVi}
                    pagination={false}
                  />
                </div>
              );
            })
          : true}
      </div>
    </>
  );
};

export default FormInspect;
