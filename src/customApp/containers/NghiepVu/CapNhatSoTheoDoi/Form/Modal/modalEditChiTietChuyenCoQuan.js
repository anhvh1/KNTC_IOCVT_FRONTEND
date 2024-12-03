import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../../../settings/constants';
import { Radio, Row, Col, Input, DatePicker, message, Checkbox } from 'antd';
import { DeleteOutlined, DownloadOutlined, SaveOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from '../../../../../../components/uielements/exportComponent';
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";
import { customizeItemValidator as Item } from '../../../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../../../components/uielements/formValidator';
import {
  CloseSquareFilled,
  SaveFilled
} from "@ant-design/icons";
import api from "../../config";
import dayjs from "dayjs";
import { InputNumber } from 'antd';
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.LinhVucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayXuLy: dataEdit.NgayXuLy ? moment(dataEdit.NgayXuLy) : null,
          ThoiHan: dataEdit.ThoiHan ? moment(dataEdit.ThoiHan) : null,
        });
    }
    GetListDoiTuong();
  }, [dataEdit]);
  const [CapNhapChiTietSoLieuID, setCapNhapChiTietSoLieuID] = useState();
  const [dataUpdate, setdataUpdate] = useState([]);
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
  const [soLieu, setSoLieu] = useState([
    {
      "CapNhapLoaiSoLieuID": 1,
      "CapNhapSoLieuID": 6,
      "TenDoiTuong": "123123",
      "SoTienPhaiThu": 200000,
      "SoDatPhaiThu": 100,
      "Child": [
        {
          "CapNhapChiTietSoLieuID": 2,
          "SoTienDaThu": 50000,
          "SoDatDaThu": 20,
          "NgayXuLy": "2024-09-20T00:00:00"
        },
        {
          "CapNhapChiTietSoLieuID": 3,
          "SoTienDaThu": 30000,
          "SoDatDaThu": 50,
          "NgayXuLy": "2024-09-21T00:00:00"
        }
      ]
    }
  ]);
  const onOk = async () => {
    const formattedValue = [
      ...dataUpdate.map(item => ({
        CapNhapSoLieuID: item.CapNhapSoLieuID || null,
        CapNhapChiTietSoLieuID: item.CapNhapChiTietSoLieuID || 0,
        DoiTuongID: item.DoiTuongID || 0,
        NgayChuyen: item.NgayChuyen || null,
        KhoiTo: item.KhoiTo || null,
        NgayKhoiTo: item.NgayKhoiTo || null,
        DeleteIDs: CapNhapChiTietSoLieuID || [],

      }))
    ];
    props.onCreate(formattedValue);
  };

  const CustomTable = ({ data, updateData }) => {
    const handleInputChange = (itemIndex, childIndex, field, value) => {
      const newData = [...data];
      newData[itemIndex].Child[childIndex][field] = value;
      updateData(newData);
      saveTableData(newData);
    };

    const saveTableData = (tableData) => {
      const dataToSave = tableData.flatMap(item =>
        item.Child.map(child => ({
          CapNhapChiTietSoLieuID: child.CapNhapChiTietSoLieuID,
          CapNhapSoLieuID: item.CapNhapSoLieuID,
          DoiTuongID: child.DoiTuongID,
          NgayChuyen: child.NgayChuyen,
          KhoiTo: child.KhoiTo,
          NgayKhoiTo: child.NgayKhoiTo,
        }))
      );

      setdataUpdate(dataToSave);
    };

    return (
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nội dung/vụ việc</th>
            <th>Đối tượng</th>
            <th>Ngày chuyển điều tra</th>
            <th>Khởi tố</th>
            <th>Ngày khởi tố</th>
            {/* <th>Thao tác</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIndex) => (
            <React.Fragment key={item.CapNhapLoaiSoLieuID}>
              {item.Child.map((child, childIndex) => (
                <tr key={child.CapNhapChiTietSoLieuID}>
                  {childIndex === 0 && (
                    <td rowSpan={item.Child.length}>{item.NoiDung}</td>
                  )}
                  <td>
                    {DoiTuong && Array.isArray(DoiTuong)
                      ? (DoiTuong.find(dt => dt.ID === child.DoiTuongID)?.Ten || 'Không xác định')
                      : ' '}
                  </td>
                  <td style={{ width: '200px' }}>
                    <DatePicker
                      value={child.NgayChuyen ? dayjs(child.NgayChuyen) : null}
                      onChange={(date) => handleInputChange(itemIndex, childIndex, 'NgayChuyen', date ? date.format('YYYY-MM-DD') : null)}
                      format="DD/MM/YYYY"
                      style={{ width: '100%' }}
                      placeholder='Ngày chuyển điều tra'
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={child.KhoiTo}
                      onChange={(e) => handleInputChange(itemIndex, childIndex, 'KhoiTo', e.target.checked)}
                    />
                  </td>
                  <td style={{ width: '200px' }}>
                    {child.KhoiTo && ( // Hiển thị ô chọn ngày khởi tố chỉ khi checkbox được chọn
                      <DatePicker
                        value={child.NgayKhoiTo ? dayjs(child.NgayKhoiTo) : null}
                        onChange={(date) => handleInputChange(itemIndex, childIndex, 'NgayKhoiTo', date ? date.format('YYYY-MM-DD') : null)}
                        format="DD/MM/YYYY"
                        style={{ width: '100%' }}
                        placeholder='Ngày khởi tố'
                      />
                    )}
                  </td>
                  {/* <td>
                    <Button
                      icon={<RedoOutlined />}
                      className="action-btn"
                      onClick={() => {
                        // Implement reset functionality here
                      }}
                    />
                  </td> */}
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
      title={`Cập nhật kết quả xử lý kiến nghị xử lý chuyển cơ quan điều tra`}
      width={"100%"} // Increased width to accommodate more fields
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button type="danger"
          icon={<CloseSquareFilled />}
          key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          form="formLinhVuc"
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
          .custom-table th, .custom-table td {
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
