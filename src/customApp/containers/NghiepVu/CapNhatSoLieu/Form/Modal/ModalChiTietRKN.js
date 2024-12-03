import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../../../settings/constants";
import { Radio, Row, Col, Input, DatePicker, message } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from "../../../../../../components/uielements/exportComponent";
import { customizeItemValidator as Item } from "../../../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../../../components/uielements/formValidator";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import api from "../../config";
import dayjs from "dayjs";
import { InputNumber } from "antd";

export default (props) => {
  const [form] = useForm();
  const { dataEdit, loading, visible, action, CuocThanhTraID } = props;
  useEffect(() => {
    GetListDoiTuong();
  }, []);
  const [DoiTuong, setDoiTuong] = useState();
  const GetListDoiTuong = () => {
    api
      .GetListDoiTuong(CuocThanhTraID, 16) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setDoiTuong(res.data.Data); // Set fetched data
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

  return (
    <Modal
      title={`Thông tin chi tiết kiến nghị xử lý hành chính – xử lý kỷ luật`}
      width={"100%"}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={props.onCancel}
        >
          Đóng
        </Button>,
      ]}
    >
      <Form form={form}>
        <div>
          {Array.isArray(dataEdit) &&
            dataEdit.map((dataItem, dataIndex) => (
              <React.Fragment key={dataIndex}>
                <p>Kết luận: {dataItem.SoVanBan}</p>
                <p>Lĩnh vực chính: {dataItem.TenLoaiThanhTra}</p>
                <table
                  border="1"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th style={{ padding: "8px" }}>Loại đối tượng</th>
                      <th style={{ padding: "8px" }}>Đối tượng xử lý</th>
                      <th style={{ padding: "8px" }}>Hình thức kỷ luật</th>
                      <th style={{ padding: "8px" }}>Ngày xử lý</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataItem.Child.map((item, index) => (
                      <tr key={index}>
                        <td style={{ paddingLeft: "8px" }}>
                          {item.LoaiDoiTuong === 1 ? "Tổ chức" : "Cá nhân"}
                        </td>
                        <td>{item.TenDoiTuong || " "}</td>
                        <td style={{ padding: "8px" }}>
                          {item.HinhThucKyLuat || " "}
                        </td>
                        <td style={{ padding: "8px" }}>
                          {item.NgayXuLy
                            ? dayjs(item.NgayXuLy).format("DD/MM/YYYY")
                            : " "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            ))}
        </div>
      </Form>
    </Modal>
  );
};
