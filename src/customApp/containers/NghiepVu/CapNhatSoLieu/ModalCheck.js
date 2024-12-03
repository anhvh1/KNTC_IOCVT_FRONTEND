import React, { useState, useEffect } from "react";
import { Modal } from "../../../../components/uielements/exportComponent";
import Menu from "./Menu";
import GroupForm from "./Form/GroupForm";
import { WrapperModalCheck } from "./index.styled";
import { Row, Col } from "antd";
import { Button } from "../../../../components/uielements/exportComponent";
import { useForm } from "../../../../components/uielements/formValidator";
import api, { apiUrl } from "./config";
import { apiUrl as apiUrlNvChung } from "../CapNhatHoSoTaiLieu/config";
import apiChung from "../CapNhatHoSoTaiLieu/config";
import { formDataCaller } from "../../../../api/formDataCaller";
import { message } from "antd";
import KEY_MENU from "../CapNhatHoSoTaiLieu/constant";
import dayjs from "dayjs";
import { EnumLoaiSoLieu } from "../../../../settings/constants";
import { CapNhatHoSoTaiLieu } from "../../../../settings/constants";
const ModalUpdateReportDocument = ({
  visible,
  onCancel,
  loading,
  CuocThanhTraID,
}) => {
  const [form] = useForm();
  const [activeMenu, setActiveMenu] = useState("1");
  const [dataFields, setDataFields] = useState([]);
  const [ListDoiTuong, setListDoiTuong] = useState([]);

  const refreshData = () => {
    apiChung
      .GetByIDNvChung({
        CuocThanhTraID,
        type: KEY_MENU.BAN_GIAO_SO_LIEU_XU_LY_SAU_THANH_TRA,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataFields(res.data.Data ? res.data.Data[0] : {});
        }
      });
  };

  useEffect(() => {
    if (CuocThanhTraID) {
      refreshData();
    }
  }, [CuocThanhTraID]);

  const GetDoiTuongXuLy = () => {
    api
      .GetListDoiTuong(CuocThanhTraID, CapNhatHoSoTaiLieu.DTSP) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setListDoiTuong(res.data.Data); // Set fetched data
        } else {
          message.destroy();
          message.error(res.data.Message); // Error message if the API response fails
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString()); // Catch any API errors
      });
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === "10" || menu === "11") {
      GetDoiTuongXuLy();
    }
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

  const onOk = () => {
    form.validateFields().then((values) => {
      const newValues = convertDateTimeFields(values);
      const formData = new FormData();
      formData.append("Type", activeMenu);
      if (newValues.ListFiles) {
        const ListFile =
          newValues.ListFiles.fileList || newValues.ListFiles || [];
        ListFile.forEach((file) => {
          if (!file.FileID) {
            formData.append("FileUploads", file?.originFileObj || file);
          }
        });
      }
      delete newValues.ListFiles;
      formData.append(
        "jsonModel",
        JSON.stringify({ ...newValues, CuocThanhTraID })
      );
      const apicall = newValues.ID
        ? apiUrlNvChung.updatenvchung
        : apiUrlNvChung.addnvchung;
      formDataCaller(apicall, formData).then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          refreshData();
          // hideModal();
        } else {
          message.error(res.data.Message);
        }
      });
    });
  };

  const menuItems = [
    {
      key: "1",
      label:
        "1. Quản lý đối tượng được thanh tra theo kết luận thanh tra, kiểm tra",
    },
    {
      key: "2",
      label:
        "2. Quản lý đối tượng sai phạm liên quan kết luận thanh tra, kiểm tra",
    },
    { key: "3", label: "3. Quản lý kiến nghị xử lý thu hồi tiền & đất" },
    { key: "4", label: "4. Quản lý xử lý khác về tiền & đất" },
    { key: "5", label: "5. Quản lý kiến nghị xử lý hành chính – xử lý kỷ luật" },
    {
      key: "6",
      label:
        "6. Quản lý kiến nghị xử lý hành chính – xử lý kiểm điểm rút kinh nghiệm",
    },
    { key: "7", label: "7. Quản lý kiến nghị xử lý chuyển cơ quan điều tra" },
    { key: "8", label: "8. Quản lý kiến nghị xử lý hoàn thiện cơ chế chính sách" },
    {
      key: "9",
      label: "9. Quản lý kiến nghị xử lý hoàn thiện cơ chế ngoài chính sách",
    },
    { key: "10", label: "10. Quản lý kiến nghị xử lý vi phạm về kinh tế (TTKT chuyên ngành) " },
    {
      key: "11",
      label:
        "11. Quản lý kiến nghị xử lý vi phạm về hành chính (TTKT chuyên ngành)",
    },
    { key: "17", label: "12. Bàn giao số liệu xử lý sau thanh tra" },
  ];

  return (
    <Modal
      visible={visible}
      title="Theo dõi xử lý sau thanh tra"
      onCancel={onCancel}
      footer={
        activeMenu === "17"
          ? [
              <Button key="back" onClick={onCancel}>
                Hủy
              </Button>,

              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                form="FormImport"
                loading={loading}
                onClick={onOk}
              >
                Lưu
              </Button>,
            ]
          : null
      }
      width={"100%"}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} md={8}>
          <WrapperModalCheck>
            <Menu
              menuItems={menuItems}
              activeMenu={activeMenu}
              onMenuClick={handleMenuClick}
            />
          </WrapperModalCheck>
        </Col>
        <Col span={24} md={16}>
          <GroupForm
            activeMenu={activeMenu}
            menuItems={menuItems}
            form={form}
            CuocThanhTraID={CuocThanhTraID}
            dataFields={dataFields}
            ListDoiTuong={ListDoiTuong}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalUpdateReportDocument;
