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

  const [data, setData] = useState({
    Data: [
      {
        CuocThanhTraID: 46456,
        SoVanBan: "456/2024/QD-UBND",
        PhanLoaiThanhTraID2: 26,
        TenLoaiThanhTra: "Thanh tra chuyên ngành",
        Child: [
          {
            CapNhapLoaiSoLieuID: 5,
            CapNhapSoLieuID: 12,
            CapNhapChiTietSoLieuID: 10,
            DoiTuongID: 28,
            TenDoiTuong: "Tổ chức2",
            NoiDung: "",
            SoTienPhaiThu: 22221,
            SoDatPhaiThu: 22222,
            SoTienDaThu: 3,
            SoDatDaThu: 3,
          },
          {
            CapNhapLoaiSoLieuID: 5,
            CapNhapSoLieuID: 13,
            CapNhapChiTietSoLieuID: 0,
            DoiTuongID: 26,
            TenDoiTuong: "UBND huyện",
            NoiDung: "Nội dung",
            SoTienPhaiThu: 222231,
            SoDatPhaiThu: 222232,
            SoTienDaThu: 0,
            SoDatDaThu: 0,
          },
        ],
      },
    ],
  });

  useEffect(() => {}, []);

  return (
    <Modal
      title={`Thông tin chi tiết kiến nghị xử lý thu hồi tiền & đất`}
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
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th rowSpan="2">Loại đối tượng</th>
                      <th rowSpan="2">Đối tượng xử lý</th>
                      <th rowSpan="2">Nội dung xử lý</th>
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
                    {dataItem.Child.map((item, index) => (
                      <tr key={index}>
                        <td style={{ paddingLeft: "8px" }}>
                          {item.LoaiDoiTuong === 1 ? "Tổ chức" : "Cá nhân"}
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {item.TenDoiTuong}
                        </td>
                        <td style={{ paddingLeft: "8px" }}>{item.NoiDung}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.SoTienPhaiThu}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.SoTienDaThu}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.SoDatPhaiThu}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.SoDatDaThu}
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
