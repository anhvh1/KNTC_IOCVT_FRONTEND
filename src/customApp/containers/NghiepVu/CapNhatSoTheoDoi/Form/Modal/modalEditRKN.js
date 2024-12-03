import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../../../settings/constants';
import { Radio, Row, Col, Input, DatePicker, message } from 'antd';
import { DeleteOutlined, DownloadOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from '../../../../../../components/uielements/exportComponent';
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

  const { dataEdit, loading, visible, action, CuocThanhTraID, CapNhapLoaiSoLieuID } = props;
  console.log("dataEdit", dataEdit)
  useEffect(() => {
    if (dataEdit && dataEdit.LinhVucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          HinhThucKyLuat: dataEdit.HinhThucKyLuat ? moment(dataEdit.HinhThucKyLuat) : null,
          ThoiHan: dataEdit.ThoiHan ? moment(dataEdit.ThoiHan) : null,
        });
    }
  }, [dataEdit]);

  const [CapNhapChiTietSoLieuID, setCapNhapChiTietSoLieuID] = useState();
  const [dataUpdate, setDataUpdate] = useState([]);
  console.log("dataUpdate123456 ", dataUpdate)
  console.log("setCapNhapChiTietSoLieuID", CapNhapChiTietSoLieuID)
  useEffect(() => {
    if (dataEdit && dataEdit.length > 0) {
      const formattedData = dataEdit.map(item => ({
        CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID,
        CapNhapSoLieuID: item.CapNhapSoLieuID,
        CongBoKLID: item.CongBoKLID,
        Child: item.Child.map(child => ({
          CapNhapSoLieuID: child.CapNhapSoLieuID,
          DoiTuongID: child.DoiTuongID,
          TenDoiTuong: child.TenDoiTuong,
          NgayXuLy: child.NgayXuLy,
          KhoiTo: child.KhoiTo,
          // Add HinhThucKyLuat and NgayXuLy if they exist in your data
          HinhThucKyLuat: child.HinhThucKyLuat || null,
        }))
      }));
      setDataUpdate(formattedData);
    }
  }, [dataEdit]);

  const [soLieu, setSoLieu] = useState([
    {
      "CapNhapLoaiSoLieuID": 7,
      "CapNhapSoLieuID": 14,
      "DoiTuongID": "To chuc",
      "TenDoiTuong": "Xax gif ddos",
      "HinhThucKyLuat": "Khai trừ đảng",
      "NgayXuLy": null
    },
    {
      "CapNhapLoaiSoLieuID": 7,
      "CapNhapSoLieuID": 15,
      "DoiTuongID": "To chuc",
      "TenDoiTuong": "Xax gif ddos",
      "HinhThucKyLuat": "Khai trừ đảng",
      "NgayXuLy": null
    }
  ]);
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
  const onOk = async () => {
    const formattedValue = {
      CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,

      DeleteIDs: CapNhapChiTietSoLieuID || [],
      CongBoKLID: dataUpdate[0]?.CongBoKLID || 0,
      CuocThanhTraID: CuocThanhTraID || 0,
      LoaiSoLieu: 3,
      Child: dataUpdate.flatMap(item => item.Child.map(child => ({
        CapNhapSoLieuID: child.CapNhapSoLieuID || 0,
        CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID || 0,
        DoiTuongID: child.DoiTuongID || 0,
        HinhThucKyLuat: child.HinhThucKyLuat || null,
        NgayXuLy: child.NgayXuLy || null,
        KhoiTo: child.KhoiTo || null,
      })))
    };
    props.onCreate(formattedValue);
    console.log("formattedValue", formattedValue);
  };

  const CustomTable = ({ data, updateData }) => {
    const handleInputChange = (itemIndex, childIndex, field, value) => {
      const newData = [...data];
      newData[itemIndex].Child[childIndex][field] = value;
      updateData(newData);

      // Update NgayXuLy in dataUpdate
      const updatedDataUpdate = [...dataUpdate];
      updatedDataUpdate[itemIndex].Child[childIndex][field] = value;
      setDataUpdate(updatedDataUpdate);
    };

    return (
      <table className="custom-table">
        <thead>
          <tr>
            <th>Loại đối tượng</th>
            <th>Đối tượng xử lý</th>
            <th>Hình thức kỷ luật</th>
            <th>Ngày xử lý</th>
            {/* <th>Ngày chuyển</th> */}
            {/* <th>Khởi tố</th> */}
          </tr>
        </thead>
        <tbody>
          {data.flatMap((item, itemIndex) =>
            item.Child.map((child, childIndex) => (
              <tr key={`${item.CapNhapSoLieuID}-${childIndex}`}>
                <td>{child.LoaiDoiTuong === 1 ? 'Tổ chức' : 'Cá nhân'}</td>
                <td>{child.TenDoiTuong}</td>
                <td>{child.HinhThucKyLuat}</td>
                <td>
                  <DatePicker
                    value={child.NgayXuLy ? dayjs(child.NgayXuLy) : null}
                    onChange={(date) => handleInputChange(itemIndex, childIndex, 'NgayXuLy', date ? date.format('YYYY-MM-DD') : null)}
                    format="DD/MM/YYYY"
                    style={{ width: '100%' }}
                    placeholder='Ngày xử lý'
                  />
                </td>
                {/* <td>
                  <Input
                    value={child.NgayXuLy}
                    onChange={(e) => handleInputChange(itemIndex, childIndex, 'NgayXuLy', e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={child.KhoiTo}
                    onChange={(e) => handleInputChange(itemIndex, childIndex, 'KhoiTo', e.target.value)}
                  />
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };

  const updateSoLieu = (newData) => {
    setSoLieu(newData);
  };
  return (
    <Modal
      title={`Cập nhật kết quả xử lý hành chính - xử lý kỷ luật`}
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
          loading={loading}
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