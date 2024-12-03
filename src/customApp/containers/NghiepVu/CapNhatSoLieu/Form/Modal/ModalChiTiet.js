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

  useEffect(() => {}, []);

  const renderTable = (data) => {
    return data.map((item, index) => (
      <div
        key={index}
        style={{
          marginBottom: "20px",
          border: "1px solid #e8e8e8",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Quyết định thu hồi: {item.QuyetDinhThuHoi}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Ngày ban hành:</strong>{" "}
          {dayjs(item.NgayBanHanh).format("DD/MM/YYYY")}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Thời hạn:</strong> {dayjs(item.ThoiHan).format("DD/MM/YYYY")}
        </div>
        <table
          border="1"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th rowSpan="2">Loại đối tượng</th>
              <th rowSpan="2">Đối tượng xử lý</th>
              <th colSpan="2">Tiền</th>
              <th colSpan="2">Đất</th>
            </tr>
            <tr>
              <th>Số phải thu (đồng)</th>
              <th>Số đã thu (đồng)</th>
              <th>Số phải thu (m2)</th>
              <th>Số đã thu (m2)</th>
            </tr>
          </thead>
          <tbody>
            {item.Child.map((child, childIndex) => (
              <tr key={childIndex}>
                <td style={{ paddingLeft: "8px" }}>
                  {child.LoaiDoiTuong === 1 ? "Tổ chức" : "Cá nhân"}
                </td>
                <td style={{ paddingLeft: "8px" }}>{child.TenDoiTuong}</td>
                <td style={{ textAlign: "center" }}>{child.SoTienPhaiThu}</td>
                <td style={{ textAlign: "center" }}>{child.SoTienDaThu}</td>
                <td style={{ textAlign: "center" }}>{child.SoDatPhaiThu}</td>
                <td style={{ textAlign: "center" }}>{child.SoDatDaThu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <Modal
      title={`Thông tin chi tiết kiến nghị xử lý thu hồi tiền & đất`}
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
        <div style={{ marginBottom: "20px" }}>
          {dataEdit && dataEdit[0] ? (
            <>
              <div style={{ marginBottom: "20px" }}>
                <Row>
                  <Col span={12}>
                    <strong>Kết luận:</strong> {dataEdit[0].SoVanBan}
                  </Col>
                  <Col span={12}>
                    <strong>Lĩnh vực chính:</strong>{" "}
                    {dataEdit[0].TenLoaiThanhTra}
                  </Col>
                </Row>
              </div>
              {dataEdit[0].Child ? (
                dataEdit[0].Child.map((child, index) => (
                  <div key={index}>{renderTable([child])}</div>
                ))
              ) : (
                <div>Không có dữ liệu để hiển thị</div>
              )}
            </>
          ) : (
            <div>Không có dữ liệu để hiển thị</div>
          )}
        </div>
      </Form>
    </Modal>
  );
};
