import React, { useState, useEffect } from "react";
import { Modal } from "../../../../components/uielements/exportComponent";
import Menu from "./Menu";
import GroupForm from "./Form/GroupForm";
import { WrapperModalCheck } from "./index.styled";
import { Row, Col, message, Modal as ModalAntd } from "antd";
import { Button } from "../../../../components/uielements/exportComponent";
import { useForm } from "../../../../components/uielements/formValidator";
import { CloseSquareFilled, SaveOutlined } from "@ant-design/icons";
import api, { apiUrl } from "./config";
import { formDataCaller } from "../../../../api/formDataCaller";
import { useModal } from "../../../CustomHook/useModal";
import apiCuocThanhTra, {
  apiUrl as ApiUrlTaoCuocTTKT,
} from "../../NghiepVu/TaoCuocTTKT/config";
import { menuItems } from "./constant";
import { ListCuocThanhtra, ListMenuForm } from "./constant";
import KEY_MENU from "./constant";
import { removePropertyNotValue } from "../../../../helpers/utility";
import dayjs from "dayjs";
const ModalUpdateReportDocument = ({
  visible,
  onCancel,
  loading,
  dataEdit,
  ListTruongPhong,
  ListThanhVien,
}) => {
  const [form] = useForm();
  const [activeMenu, setActiveMenu] = useState("1");
  const [dataFields, setDataFields] = useState([]);
  const { CuocThanhTraID } = dataEdit || {};
  const { showModal, hideModal, stateModal } = useModal();
  const [dataDay, setDataDay] = useState();
  const [isChange, setIsChange] = useState(false);

  const onChangeForm = (state = true) => {
    setIsChange(state);
  };

  const refreshData = () => {
    if (CuocThanhTraID) {
      if (activeMenu === KEY_MENU.THANH_VIEN_DOAN_THANH_TRA) {
        api.GetByID({ CuocThanhTraID }).then((res) => {
          if (res.data.Status > 0) {
            setDataFields(res.data.Data);
          } else {
            message.destroy();
            message.error(res.data.Message);
          }
        });
      } else if (!ListCuocThanhtra.includes(activeMenu)) {
        api
          .GetByIDNvChung({ CuocThanhTraID, Type: activeMenu })
          .then((res) => {
            if (res.data.Status > 0) {
              const data = res.data.Data || [];
              const checkForm = !ListMenuForm.includes(activeMenu);
              if (checkForm) {
                setDataFields(data[0]);
              } else {
                setDataFields(data);
              }
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((err) => {
            message.destroy();
            message.error(err.message);
          });
      } else {
        apiCuocThanhTra
          .chiTietTaoCuoc(CuocThanhTraID)
          .then((res) => {
            if (res.data.Status > 0) {
              const data = res.data.Data;
              if (
                activeMenu === KEY_MENU.THONG_TIN_CHUNG_CUOC_THANH_TRA_KIEM_TRA
              ) {
                setDataFields(data.CuocThanhTraReponse);
              } else if (
                activeMenu === KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA ||
                activeMenu === KEY_MENU.THANH_VIEN_DOAN_GIAM_SAT
              ) {
                const dataQuyetDinhThanhTra =
                  activeMenu === KEY_MENU.THANH_VIEN_DOAN_GIAM_SAT
                    ? data.QuyetDinhGiamSat
                    : data.QuyetDinhThanhTra;
                const getListData = (List, Type) => {
                  return List.filter((item) => item.VaiTroID === Type).map(
                    (item) => item.CanBoID
                  );
                };
                const DoanThanhtra = dataQuyetDinhThanhTra.DoanThanhTra || [];
                const newDataQuyetDinhThanhTra = {
                  ...dataQuyetDinhThanhTra,
                  TruongDoanID: getListData(DoanThanhtra, 1),
                  PhoDoanID: getListData(DoanThanhtra, 2),
                  ThanhVienID: getListData(DoanThanhtra, 3),
                  ListFiles: dataQuyetDinhThanhTra.ListFile,
                };
                setDataFields(newDataQuyetDinhThanhTra);
              }
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((err) => {
            message.destroy();
            message.error(err.message);
          });
      }
    }
  };

  useEffect(() => {
    refreshData();
  }, [activeMenu]);

  useEffect(() => {
    if (CuocThanhTraID) {
      api
        .GetTimeThanhTra({ CuocThanhTraID })
        .then((res) => {
          if (res.data.Status > 0) {
            setDataDay(res.data.Data);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    }
  }, []);

  const handleRenderConfirm = () => {
    switch (activeMenu) {
      case "1":
        return "thông tin chung cuộc thanh tra, kiểm tra";
      case "2":
        return "quyết định thanh tra, kiểm tra";
      case "3":
        return "thành viên đoàn thanh tra";
      case "4":
        return "tài liệu, nội dung đã thu thập";
      case "5":
        return "biên bản công bố quyết định thanh tra, kiểm tra";
      case "6":
        return "người thực hiện giám sát";
      case "7":
        return "nhật ký đoàn thanh tra, kiểm tra";
      case "8":
        return "báo cáo giải trình đoàn thanh tra, kiểm tra";
      case "9":
        return "báo cáo kết quả thực hiện nhiệm vụ";
      case "10":
        return "gia hạn thời gian thanh tra, kiểm tra";
      case "11":
        return "tạm dừng cuộc thanh tra, kiểm tra";
      case "12":
        return "thông báo kết thúc tiến hành thanh tra, kiểm tra trực tiếp";
      case "13":
        return "kết luận thanh tra, kiểm tra";
      case "14":
        return "công bố kết luận thanh tra, kiểm tra";
    }
  };

  const onRemove = (data) => {
    ModalAntd.confirm({
      title: "Xóa Dữ Liệu",
      content: `Bạn có muốn xóa ${handleRenderConfirm()} này không?`,
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .DeleteNvChung({ CuocThanhTraID, Type: activeMenu, ID: data?.ID })
          .then((res) => {
            if (res.data.Status > 0) {
              refreshData();
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
      },
    });
  };

  const handleMenuClick = (menu) => {
    console.log(isChange, "isChange");
    if (menu !== activeMenu) {
      if (!ListMenuForm.includes(activeMenu) && isChange) {
        ModalAntd.confirm({
          title: "Xác nhận",
          content:
            "Bạn có muốn lưu lại thay đổi trước khi chuyển sang menu mới không?",
          okText: "Có",
          cancelText: "Không",
          onOk: async () => {
            onOk(true, menu);
          },
          onCancel: () => {
            setActiveMenu(menu);
            setDataFields(null);
            form.resetFields();
            setIsChange(false);
          },
        });
      } else {
        setActiveMenu(menu);
        setDataFields(null);
        form.resetFields();
        setIsChange(false);
      }
    }
  };

  const callApiCuoThanhTra = (values, isNegative, menu) => {
    const formData = new FormData();
    const newValues = {
      ...values,
    };
    const nameFileAppend =
      activeMenu === KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA
        ? "fileQuyetDinhThanhTra"
        : "fileQuyetDinhGiamSat";
    if (values.ListFiles) {
      const ListFile = values.ListFiles.fileList || values.ListFiles || [];
      ListFile.forEach((file) => {
        if (!file.FileID) {
          formData.append(nameFileAppend, file?.originFileObj || file);
        }
      });
    }
    delete newValues.ListFiles;
    const QuyetDinhThanhTra = {
      ...newValues,
      CuocThanhTraID,
    };
    const name =
      activeMenu === KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA
        ? "QuyetDinhThanhTra"
        : "QuyetDinhGiamSat";
    const taoCuocThanhTraKiemTraObj = {
      [name]: QuyetDinhThanhTra,
      CuocThanhTraID: CuocThanhTraID,
    };
    if (taoCuocThanhTraKiemTraObj[name]?.ListXoaFileIds) {
      taoCuocThanhTraKiemTraObj.ListXoaFileIds = [
        ...taoCuocThanhTraKiemTraObj[name]?.ListXoaFileIds,
      ];
      taoCuocThanhTraKiemTraObj.LisXoaFileIds = [
        ...taoCuocThanhTraKiemTraObj[name]?.ListXoaFileIds,
      ];
      // delete taoCuocThanhTraKiemTraObj[name].ListXoaFileIds;
    }
    formData.append(
      "taoCuocThanhTraKiemTraStr",
      JSON.stringify(taoCuocThanhTraKiemTraObj)
    );
    formDataCaller(ApiUrlTaoCuocTTKT.suaTaoCuoc, formData).then((res) => {
      if (res.data.Status > 0) {
        message.success(res.data.Message);
        if (!isNegative) {
          refreshData();
        } else {
          setActiveMenu(menu);
          setDataFields(null);
          form.resetFields();
        }
      } else {
        message.error(res.data.Message);
      }
    });
  };

  const callApiNvChung = (values, isNegative, menu) => {
    const formData = new FormData();
    formData.append("Type", activeMenu);
    if (values.ListFiles) {
      const ListFile = values.ListFiles.fileList || values.ListFiles || [];
      ListFile.forEach((file) => {
        if (!file.FileID) {
          formData.append("FileUploads", file?.originFileObj || file);
        }
      });
    }
    delete values.ListFiles;
    formData.append("jsonModel", JSON.stringify({ ...values, CuocThanhTraID }));
    const apicall = values.ID ? apiUrl.updatenvchung : apiUrl.addnvchung;
    formDataCaller(apicall, formData).then((res) => {
      if (res.data.Status > 0) {
        message.success(res.data.Message);
        if (!isNegative) {
          refreshData();
        } else {
          setActiveMenu(menu);
          setDataFields(null);
          form.resetFields();
        }
        hideModal();
      } else {
        message.error(res.data.Message);
      }
    });
  };

  function convertData(inputData) {
    if (inputData) {
      const result = {};

      for (const [key, value] of Object.entries(inputData)) {
        const [objectName, propertyName] = key.split("__");

        if (!result[objectName]) {
          result[objectName] = {};
        }
        if (propertyName) {
          result[objectName][propertyName] = value;
        } else {
          result[objectName] = value;
        }
      }

      return result;
    }
  }

  const callApiDoanThanHTra = (values, isNegative, menu) => {
    const newValues = convertData(values);
    const { FormLead, FormExternal } = newValues || {};
    const formData = new FormData();
    const FileListDoanTruong = FormLead?.ListFiles || [];
    const FileListThanhVien = FormExternal?.ListFiles || [];

    if (FileListDoanTruong) {
      const ListFile = FileListDoanTruong?.fileList?.length
        ? FileListDoanTruong?.fileList
        : FileListDoanTruong;

      if (ListFile.length) {
        ListFile.forEach((file) => {
          if (!file.FileID) {
            formData.append(
              "fileThayDoiDoanTruong",
              file?.originFileObj || file
            );
          }
        });
      }
    }
    if (FileListThanhVien) {
      const ListFile =
        FileListThanhVien?.fileList?.length > 0
          ? FileListThanhVien?.fileList
          : FileListThanhVien;

      if (ListFile.length) {
        ListFile.forEach((file) => {
          if (!file.FileID) {
            formData.append(
              "fileThayDoiThanhVien",
              file?.originFileObj || file
            );
          }
        });
      }
    }
    const jsonForm = {
      ThayDoiDoanTruong: removePropertyNotValue({
        ...newValues.FormLead,
      }),
      ThayDoiThanhVien: removePropertyNotValue({
        ...newValues.FormExternal,
      }),
      CuocThanhTraID,
      ListXoaFileIds: newValues?.ListXoaFileIds,
      ListXoa: newValues?.ListXoa,
    };

    if (jsonForm?.ThayDoiDoanTruong?.ListFiles) {
      delete jsonForm?.ThayDoiDoanTruong?.ListFiles;
    }
    if (jsonForm?.ThayDoiThanhVien?.ListFiles) {
      delete jsonForm.ThayDoiThanhVien.ListFiles;
    }
    if (Object.keys(jsonForm.ThayDoiDoanTruong).length === 0) {
      delete jsonForm.ThayDoiDoanTruong;
    }
    if (Object.keys(jsonForm.ThayDoiThanhVien).length === 0) {
      delete jsonForm.ThayDoiThanhVien;
    }
    formData.append("jsonModel", JSON.stringify({ ...jsonForm }));

    formDataCaller(apiUrl.thaydoidoanthanhtra, formData).then((res) => {
      if (res.data.Status > 0) {
        message.success(res.data.Message);
        form.setFieldsValue({
          ListXoa: [],
          ListXoaFileIds: [],
        });

        if (!isNegative) {
          refreshData();
        } else {
          setActiveMenu(menu);
          setDataFields(null);
          form.resetFields();
        }
      } else {
        message.destroy();
        message.error(res.data.Message);
      }
    });
  };

  const convertDateTimeFields = (obj) => {
    const formattedObj = { ...obj };
    if (obj) {
      Object.keys(formattedObj).forEach((key) => {
        const value = formattedObj[key];
        if (dayjs.isDayjs(value)) {
          formattedObj[key] = value.format("YYYY-MM-DD");
        }
      });
      return formattedObj;
    }
  };

  const onOk = (isNegative = false, menu) => {
    form.validateFields().then((values) => {
      setIsChange(false);
      const newValues = convertDateTimeFields(values);
      const dataFormated = removePropertyNotValue(newValues);

      if (activeMenu === KEY_MENU.THANH_VIEN_DOAN_THANH_TRA) {
        callApiDoanThanHTra(dataFormated, isNegative, menu);
      } else if (
        activeMenu === KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA ||
        activeMenu === KEY_MENU.THANH_VIEN_DOAN_GIAM_SAT
      ) {
        callApiCuoThanhTra(dataFormated, isNegative, menu);
      } else {
        callApiNvChung(dataFormated, isNegative, menu);
      }
    });
  };

  const newListTruongPhong = ListTruongPhong
    ? ListTruongPhong.map((item) => ({
        ID: item.CanBoID,
        Ten: item.TenCanBo,
      }))
    : [];

  const newListThanhVien = ListThanhVien
    ? ListThanhVien.map((item) => ({
        ID: item.CanBoID,
        Ten: item.TenCanBo,
      }))
    : [];

  const handleEdit = (record) => {
    showModal(record);
  };

  return (
    <Modal
      visible={visible}
      title={
        <p>
          Cập nhật hồ sơ cuộc thanh tra, kiểm tra{" "}
          {dataDay > 0 ? (
            <span style={{ color: "red", fontStyle: "italic" }}>
              (Thời gian thanh tra trực tiếp còn {dataDay} ngày)
            </span>
          ) : null}
        </p>
      }
      onCancel={onCancel}
      footer={[
        !ListMenuForm.includes(activeMenu) && (
          <>
            <Button
              key="back"
              onClick={onCancel}
              type="danger"
              icon={<CloseSquareFilled />}
            >
              Hủy
            </Button>

            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              form="FormImport"
              loading={loading}
              icon={<SaveOutlined />}
              onClick={() => onOk()}
            >
              Lưu
            </Button>
          </>
        ),
      ]}
      width={"100%"}
    >
      <WrapperModalCheck>
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            md={8}
            style={{ maxHeight: 700, overflowY: "auto", paddingRight: "0px" }}
          >
            <Menu
              menuItems={menuItems}
              activeMenu={activeMenu}
              onMenuClick={handleMenuClick}
            />
          </Col>
          <Col span={24} md={16}>
            <div
              style={{
                border: "1px solid rgba(229, 229, 229, 1)",
                borderRadius: "10px",
                height: "100%",
              }}
            >
              <GroupForm
                activeMenu={activeMenu}
                menuItems={menuItems}
                form={form}
                onOk={() => onOk()}
                onEdit={handleEdit}
                onRemove={onRemove}
                dataFields={dataFields}
                showModal={showModal}
                hideModal={hideModal}
                stateModal={stateModal}
                ListTruongPhong={newListTruongPhong}
                ListThanhVien={newListThanhVien}
                onChangeForm={onChangeForm}
              />
            </div>
          </Col>
        </Row>
      </WrapperModalCheck>
    </Modal>
  );
};

export default ModalUpdateReportDocument;
