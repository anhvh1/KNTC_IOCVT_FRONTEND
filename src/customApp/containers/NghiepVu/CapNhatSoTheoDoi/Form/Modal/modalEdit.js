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
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";
import { InputNumberFormat } from "../../../../../../components/uielements/exportComponent";
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID, NBH, QDTH } =
    props;

  useEffect(() => {
    if (dataEdit && dataEdit.LinhVucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayXuLy: dataEdit.NgayXuLy ? moment(dataEdit.NgayXuLy) : null,
          ThoiHan: dataEdit.ThoiHan ? moment(dataEdit.ThoiHan) : null,
        });
    }
  }, [dataEdit]);

  const [CapNhapChiTietSoLieuID, setCapNhapChiTietSoLieuID] = useState();
  const onOk = async () => {
    const formattedValue = [
      ...(soLieu?.length > 0
        ? soLieu.flatMap((item) =>
            item.Child.map((child) => ({
              CapNhapChiTietSoLieuID: child.CapNhapChiTietSoLieuID || 0,
              CapNhapSoLieuID: item.CapNhapSoLieuID || null,
              SoTienDaThu: child.SoTienDaThu || null,
              SoDatDaThu: child.SoDatDaThu || null,
              NgayXuLy: child.NgayXuLy || null,
              // DeleteIDs: CapNhapChiTietSoLieuID || [],
            }))
          )
        : [
            {
              CapNhapChiTietSoLieuID: 110,
              DeleteIDs: CapNhapChiTietSoLieuID || [],
              CapNhapSoLieuID: 157,
              SoTienDaThu: 1,
              SoDatDaThu: 1,
              NgayXuLy: "2024-09-24T00:00:00",
            },
          ]),
    ];
    props.onCreate(formattedValue, CapNhapChiTietSoLieuID);
  };
  const [soLieu, setSoLieu] = useState();
  const [soLieu2, setSoLieu2] = useState();

  const CustomTable = ({ data, updateData }) => {
    useEffect(() => {
      setSoLieu2(data); // Lưu dữ liệu vào soLieu khi data thay đổi
    }, [data]);
    const [dataUpdate, setdataUpdate] = useState([]);
    console.log("data", data);

    // const handleInputChange = (itemIndex, childIndex, field, value) => {
    //   const newData = [...data];
    //   newData[itemIndex].Child[childIndex][field] = value;
    //   updateData(newData);
    //   // saveTableData(newData);
    // };
    const [tempData, setTempData] = useState(data); // Temporary state to hold input values

    const handleInputChange = (itemIndex, childIndex, field, value) => {
      const newTempData = [...tempData];
      newTempData[itemIndex].Child[childIndex][field] = value;
      setTempData(newTempData); // Update temporary state
    };

    const handleBlur = () => {
      updateData(tempData); // Update the main data when input loses focus
    };
    const saveTableData = (tableData) => {
      const dataToSave = tableData.flatMap((item) =>
        item.Child.map((child) => ({
          CapNhapChiTietSoLieuID: child.CapNhapChiTietSoLieuID,
          CapNhapSoLieuID: item.CapNhapSoLieuID,
          SoTienDaThu: child.SoTienDaThu,
          SoDatDaThu: child.SoDatDaThu,
          NgayXuLy: child.NgayXuLy,
        }))
      );
      setdataUpdate(dataToSave);
    };

    const formatNumber = (num) => {
      if (num === null || num === undefined) return "";
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
      <table className="custom-table">
        <thead>
          <tr>
            <th rowSpan="2">Đối tượng xử lý</th>
            <th colSpan="2">Số phải thu</th>
            <th colSpan="2">Số đã thu</th>
            <th rowSpan="2">Ngày xử lý</th>
            <th rowSpan="2">Thao tác</th>
          </tr>
          <tr>
            <th>Tiền (đồng)</th>
            <th>Đất (m2)</th>
            <th>Tiền (đồng)</th>
            <th>Đất (m2)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIndex) => (
            <React.Fragment>
              <tr>
                <td rowSpan={item.Child.length + 1}>{item.TenDoiTuong}</td>
                <td rowSpan={item.Child.length + 1}>
                  {formatNumber(item.SoTienPhaiThu)}
                </td>
                <td rowSpan={item.Child.length + 1}>
                  {formatNumber(item.SoDatPhaiThu)}
                </td>
                <td>
                  <InputNumberFormat
                    placeholder="Số tiền đã thu"
                    style={{ width: "100%" }}
                    value={item.SoTienDaThu}
                    onChange={(value) => {
                      const totalChildSoTienDaThu = item.Child.reduce(
                        (sum, child) => sum + (child.SoTienDaThu || 0),
                        0
                      );
                      const totalSoTienDaThu = value + totalChildSoTienDaThu;

                      // Kiểm tra điều kiện
                      if (totalSoTienDaThu > item.SoTienPhaiThu) {
                        message.error(
                          "Tổng số tiền đã thu không được lớn hơn số tiền phải thu."
                        );
                        return; // Không cập nhật nếu điều kiện không thỏa mãn
                      }

                      const newData = [...data];
                      newData[itemIndex].SoTienDaThu = value;
                      setdataUpdate(newData); // Save updated data
                    }}
                  />
                </td>
                <td>
                  <InputNumberFormat
                    placeholder="Số đất đã thu"
                    style={{ width: "100%" }}
                    value={item.SoDatDaThu}
                    onChange={(value) => {
                      const totalChildSoDatDaThu = item.Child.reduce(
                        (sum, child) => sum + (child.SoDatDaThu || 0),
                        0
                      );
                      const totalSoDatDaThu = value + totalChildSoDatDaThu;

                      // Kiểm tra điều kiện
                      if (totalSoDatDaThu > item.SoDatPhaiThu) {
                        message.error(
                          "Tổng số dất đã thu không được lớn hơn số đất phải thu."
                        );
                        return; // Không cập nhật nếu điều kiện không thỏa mãn
                      }
                      const newData = [...data];
                      newData[itemIndex].SoDatDaThu = value;
                      setdataUpdate(newData); // Save updated data
                    }}
                  />
                </td>
                <td>
                  <DatePicker
                    placeholder="Ngày xử lý"
                    format="DD/MM/YYYY"
                    allowClear={false}
                    style={{ width: "100%" }}
                    value={item.NgayXuLy ? dayjs(item.NgayXuLy) : null}
                    onChange={(date) => {
                      item.NgayXuLy = date
                        ? date.format("YYYY-MM-DD")
                        : dayjs().format("YYYY-MM-DD");
                      saveTableData(data); // Save updated data
                    }}
                  />
                </td>
                <td>
                  {/* <svg onClick={() => {
                    const newData = [...data];

                    // Define newChild with the necessary structure
                    const newChild = {
                      CapNhapChiTietSoLieuID: 0, // or any default value
                      SoTienDaThu: item.SoTienDaThu, // Use current input value
                      SoDatDaThu: item.SoDatDaThu, // Use current input value
                      NgayXuLy: item.NgayXuLy, // Use current input value
                    };

                    newData[itemIndex].Child.push(newChild);
                    updateData(newData);

                    // Update dataUpdate state
                    const updatedDataUpdate = [
                      ...dataUpdate,
                      {
                        CapNhapChiTietSoLieuID: 0,
                        CapNhapSoLieuID: item.CapNhapSoLieuID,
                        SoTienDaThu: item.SoTienDaThu,
                        SoDatDaThu: item.SoDatDaThu,
                        NgayXuLy: item.NgayXuLy,
                      }
                    ];
                    setdataUpdate(updatedDataUpdate);

                    // Clear the input values
                    item.SoTienDaThu = null; // Reset to default value
                    item.SoDatDaThu = null; // Reset to default value
                    item.NgayXuLy = null; // Reset to default value
                    saveTableData(newData); // Save updated data after clearing
                  }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-floppy" viewBox="0 0 16 16">
                  <path d="M11 2H9v3h2z" />
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                </svg> */}
                  <svg
                    onClick={() => {
                      // Check if input values are filled before proceeding
                      // if (
                      //   !item.SoTienDaThu ||
                      //   !item.SoDatDaThu ||
                      //   !item.NgayXuLy
                      // ) {
                      //   message.error(
                      //     "Vui lòng nhập đầy đủ thông tin trước khi lưu."
                      //   ); // Show error message
                      //   return; // Exit if inputs are not filled
                      // }
                      if (!item.NgayXuLy) {
                        message.error(
                          "Vui lòng chọn ngày xử lý trước khi lưu."
                        ); // Show error message
                        return; // Exit if date is not selected
                      }
                      if (
                        (item.SoTienDaThu === undefined ||
                          item.SoTienDaThu === null) &&
                        (item.SoDatDaThu === undefined ||
                          item.SoDatDaThu === null)
                      ) {
                        message.error(
                          "Vui lòng nhập đầy đủ thông tin trước khi lưu."
                        ); // Show error message
                        return; // Exit if inputs are not filled
                      }
                      const newData = [...data];

                      // Define newChild with the necessary structure
                      const newChild = {
                        CapNhapChiTietSoLieuID: 0, // or any default value
                        SoTienDaThu: item.SoTienDaThu, // Use current input value
                        SoDatDaThu: item.SoDatDaThu, // Use current input value
                        NgayXuLy: item.NgayXuLy, // Use current input value
                      };

                      newData[itemIndex].Child.push(newChild);
                      updateData(newData);

                      // Update dataUpdate state
                      const updatedDataUpdate = [
                        ...dataUpdate,
                        {
                          CapNhapChiTietSoLieuID: 0,
                          CapNhapSoLieuID: item.CapNhapSoLieuID,
                          SoTienDaThu: item.SoTienDaThu,
                          SoDatDaThu: item.SoDatDaThu,
                          NgayXuLy: item.NgayXuLy,
                        },
                      ];
                      setdataUpdate(updatedDataUpdate);

                      // Clear the input values
                      item.SoTienDaThu = null; // Reset to default value
                      item.SoDatDaThu = null; // Reset to default value
                      item.NgayXuLy = null; // Reset to default value
                      saveTableData(newData); // Save updated data after clearing
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5AA8E9"
                    class="bi bi-floppy"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2H9v3h2z" />
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                  </svg>
                </td>
              </tr>
              {item.Child.map((child, childIndex) => (
                <tr key={child.CapNhapChiTietSoLieuID}>
                  <td>
                    <InputNumberFormat
                      value={child.SoTienDaThu}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        const totalChildSoTienDaThu =
                          data[itemIndex].Child.reduce(
                            (sum, child) => sum + (child.SoTienDaThu || 0),
                            0
                          ) -
                          (child.SoTienDaThu || 0) +
                          (value || 0);

                        // Kiểm tra điều kiện
                        if (totalChildSoTienDaThu > item.SoTienPhaiThu) {
                          message.error(
                            "Tổng số tiền đã thu không được lớn hơn số tiền phải thu."
                          );
                          return; // Không cập nhật nếu điều kiện không thỏa mãn
                        }

                        handleInputChange(
                          itemIndex,
                          childIndex,
                          "SoTienDaThu",
                          value
                        );
                      }}
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>
                    <InputNumberFormat
                      value={child.SoDatDaThu}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        const totalChildSoDatDaThu =
                          data[itemIndex].Child.reduce(
                            (sum, child) => sum + (child.SoDatDaThu || 0),
                            0
                          ) -
                          (child.SoDatDaThu || 0) +
                          (value || 0);
                        // Kiểm tra điều kiện
                        if (totalChildSoDatDaThu > item.SoDatPhaiThu) {
                          message.error(
                            "Tổng số đất đã thu không được lớn hơn số đất phải thu."
                          );
                          return; // Không cập nhật nếu điều kiện không thỏa mãn
                        }

                        handleInputChange(
                          itemIndex,
                          childIndex,
                          "SoDatDaThu",
                          value
                        );
                      }}
                      style={{ width: "100%" }}
                    />
                  </td>

                  <td>
                    <DatePicker
                      value={dayjs(child.NgayXuLy)}
                      onBlur={handleBlur}
                      allowClear={false}
                      onChange={(date) =>
                        handleInputChange(
                          itemIndex,
                          childIndex,
                          "NgayXuLy",
                          date ? date.format("YYYY-MM-DD") : null
                        )
                      }
                      format="DD/MM/YYYY"
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>
                    {/* <button
                      onClick={() => {
                        const newData = [...data];
                        const childToRemove =
                          newData[itemIndex].Child[childIndex];
                        newData[itemIndex].Child.splice(childIndex, 1);
                        updateData(newData);
                        setCapNhapChiTietSoLieuID((prevIds) => {
                          if (Array.isArray(prevIds)) {
                            return [
                              ...prevIds,
                              childToRemove.CapNhapChiTietSoLieuID,
                            ];
                          } else {
                            return [childToRemove.CapNhapChiTietSoLieuID];
                          }
                        });
                        saveTableData(newData); // Add this line to update dataUpdate
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "15px",
                      }}
                    > */}
                    <DeleteIcon
                      onClick={() => {
                        const newData = [...data];
                        const childToRemove =
                          newData[itemIndex].Child[childIndex];
                        newData[itemIndex].Child.splice(childIndex, 1);
                        updateData(newData);
                        setCapNhapChiTietSoLieuID((prevIds) => {
                          if (Array.isArray(prevIds)) {
                            return [
                              ...prevIds,
                              childToRemove.CapNhapChiTietSoLieuID,
                            ];
                          } else {
                            return [childToRemove.CapNhapChiTietSoLieuID];
                          }
                        });
                        saveTableData(newData); // Add this line to update dataUpdate
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "15px",
                      }}
                    />
                    {/* </button> */}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };
  const updateSoLieu = (newData) => {
    setSoLieu(newData);
  };

  return (
    <Modal
      title={
        QDTH
          ? `${
              action === "edit" ? "Cập nhật" : "Cập nhật"
            } quyết định xử lý thu hồi ${QDTH} ngày ${dayjs(NBH).format(
              "DD/MM/YYYY"
            )}`
          : `${
              action === "edit" ? "Cập nhật" : "Thêm"
            }  kết quả xử lý khác về tiền và đất`
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
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          form="formLinhVuc"
          // loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formLinhVuc"}
        initialValues={{
          TrangThai: 1,
        }}
      >
        {action === "edit" ? <Item name={"LinhVucID"} hidden /> : ""}
        <style jsx>{`
          .custom-table {
            width: 100%;
            border-collapse: collapse;
          }
          .custom-table th,
          .custom-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          .custom-table th {
            background-color: #f2f2f2;
          }
          .action-btn {
            background: none;
            border: none;
            cursor: pointer;
          }
          .download-btn {
            color: #1890ff;
          }
          .delete-btn {
            color: #ff4d4f;
          }
        `}</style>

        <CustomTable data={dataEdit} updateData={updateSoLieu} />
      </Form>
    </Modal>
  );
};
