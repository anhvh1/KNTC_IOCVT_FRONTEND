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
      title={
        action === "chitiet"
          ? `Thông tin chi tiết kiến nghị xử lý hoàn thiện cơ chế chính sách`
          : action === "chitiet7"
          ? `Thông tin chi tiết kiến nghị xử lý hoàn thiện cơ chế ngoài chính sách`
          : ""
      }
      width={"100%"} // Increased width to accommodate more fields
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
          <p>Kết luận: {dataEdit[0]?.SoVanBan || " "}</p>
          <p>Lĩnh vực chính: {dataEdit[0]?.TenLoaiThanhTra || " "}</p>
          <table
            border="1"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "8px", textAlign: "center" }}>
                  Nội dung
                </th>
                <th style={{ padding: "8px", textAlign: "center" }}>
                  Đã xử lý
                </th>
                <th style={{ padding: "8px", textAlign: "center" }}>
                  Ngày xử lý
                </th>
              </tr>
            </thead>
            <tbody>
              {dataEdit[0]?.Child.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px" }}>{item.NoiDung}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={item.DaXuLy || false}
                      readOnly
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    {item.NgayXuLy
                      ? dayjs(item.NgayXuLy).format("DD/MM/YYYY")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Form>
    </Modal>
  );
};
