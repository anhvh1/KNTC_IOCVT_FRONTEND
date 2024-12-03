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
  const [DoiTuong, setDoiTuong] = useState();
  useEffect(() => {
    GetListDoiTuong();
  }, [dataEdit]);
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
  const renderTable = (data) => {
    return (
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={tableHeaderStyle}>Nội dung/vụ việc</th>
            <th style={tableHeaderStyle}>Đối tượng</th>
            <th style={tableHeaderStyle}>Ngày chuyển điều tra</th>
            <th style={tableHeaderStyle}>Khởi tố</th>
            <th style={tableHeaderStyle}>Ngày khởi tố</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {item.Child.flatMap((child, childIndex) =>
                child.Child.map((grandChild, grandChildIndex) => (
                  <tr
                    key={`${index}-${childIndex}-${grandChildIndex}`}
                    style={tableRowStyle}
                  >
                    {childIndex === 0 && grandChildIndex === 0 && (
                      <td
                        style={{ ...tableCellStyle, verticalAlign: "top" }}
                        rowSpan={item.Child.reduce(
                          (acc, c) => acc + c.Child.length,
                          0
                        )}
                      >
                        {item.SoVanBan}
                      </td>
                    )}
                    <td style={tableCellStyle}>
                      {(DoiTuong &&
                        DoiTuong.find((dt) => dt.ID === grandChild.DoiTuongID)
                          ?.Ten) ||
                        ""}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "center" }}>
                      {grandChild.NgayChuyen
                        ? dayjs(grandChild.NgayChuyen).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={grandChild.KhoiTo || false}
                        readOnly
                        style={{ margin: "0 auto", display: "block" }}
                      />
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: "center" }}>
                      {grandChild.NgayKhoiTo
                        ? dayjs(grandChild.NgayKhoiTo).format("DD/MM/YYYY")
                        : ""}
                    </td>
                  </tr>
                ))
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  const tableHeaderStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  };

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const tableRowStyle = {
    "&:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
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
          <p>Kết luận: {dataEdit && dataEdit[0] ? dataEdit[0].SoVanBan : ""}</p>
          <p>
            Lĩnh vực chính:{" "}
            {dataEdit && dataEdit[0] ? dataEdit[0].TenLoaiThanhTra : ""}
          </p>
          {dataEdit && dataEdit.length > 0 ? (
            <>{renderTable(dataEdit)}</>
          ) : (
            <div>Không có dữ liệu để hiển thị</div>
          )}
        </div>
      </Form>
    </Modal>
  );
};
