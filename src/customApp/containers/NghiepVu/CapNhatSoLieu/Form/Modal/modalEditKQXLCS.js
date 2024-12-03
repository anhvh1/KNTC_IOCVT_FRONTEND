import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../../../settings/constants';
import { Radio, Row, Col, Input, DatePicker, message, Checkbox } from 'antd';
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

  const { dataModalAddEdit, loading, visible, action, CuocThanhTraID, CapNhapLoaiSoLieuID } = props;
  useEffect(() => {
    if (dataModalAddEdit) {
      form &&
        form.setFieldsValue({
          CongBoKLID: dataModalAddEdit.CongBoKLID,
        });
    }
  }, [dataModalAddEdit]);

  const [dataUpdate, setdataUpdate] = useState([]);
  useEffect(() => {
  }, []);

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
  // const onOk = async (e) => {
  //   const formattedValue = {
  //     CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,
  //     CongBoKLID: dataModalAddEdit[0]?.CongBoKLID,
  //     DeleteIDs: [],
  //     CuocThanhTraID: CuocThanhTraID || 0,
  //     LoaiSoLieu: 6,
  //     Child: dataUpdate.map(item => ({
  //       CapNhapSoLieuID: item.CapNhapSoLieuID,
  //       FileDeleteIDs: [],
  //       CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID,
  //       NoiDung: item.Child.map(child => child.NoiDung).find(Boolean), // Lấy giá trị đầu tiên hợp lệ
  //       DaXuLy: item.Child.map(child => child.DaXuLy).find(Boolean), // Lấy giá trị đầu tiên hợp lệ
  //       NgayXuLy: item.Child.map(child => child.NgayXuLy).find(Boolean), // Lấy giá trị đầu tiên hợp lệ
  //       FileIDs: [] // Assuming you want to initialize this as empty
  //     }))
  //   };
  //   props.onCreate(formattedValue);
  // };
  const onOk = async (e) => {
    // Validate that if any checkbox is checked, the corresponding Ngày xử lý is set
    const isValid = dataUpdate.every(item =>
      item.Child.every(child =>
        !child.DaXuLy || (child.DaXuLy && child.NgayXuLy)
      )
    );

    if (!isValid) {
      message.error("Ngày xử lý là bắt buộc !"); // Show error message
      return; // Prevent submission
    }

    const formattedValue = {
      CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,
      CongBoKLID: dataModalAddEdit[0]?.CongBoKLID,
      DeleteIDs: [],
      CuocThanhTraID: CuocThanhTraID || 0,
      LoaiSoLieu: 6,
      Child: dataUpdate.map(item => ({
        CapNhapSoLieuID: item.CapNhapSoLieuID,
        FileDeleteIDs: [],
        CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID,
        NoiDung: item.Child.map(child => child.NoiDung).find(Boolean),
        DaXuLy: item.Child.map(child => child.DaXuLy).find(Boolean),
        NgayXuLy: item.Child.map(child => child.NgayXuLy).find(Boolean),
        FileIDs: []
      }))
    };
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
      const dataToSave = tableData.map(item => ({
        CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID,
        CapNhapSoLieuID: item.CapNhapSoLieuID,
        Child: item.Child.map(child => ({
          CapNhapSoLieuID: child.CapNhapSoLieuID,
          NoiDung: child.NoiDung,
          DaXuLy: child.DaXuLy,
          NgayXuLy: child.NgayXuLy,
        })),
      }));

      setdataUpdate(dataToSave);
    };

    return (
      <table className="custom-table">
        <thead>
          <tr>
            <th style={{ width: '60%' }}>Nội dung</th>
            <th style={{ width: '20%' }}>Đã xử lý</th>
            <th style={{ width: '20%' }}>Ngày xử lý</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIndex) => (
            item.Child.map((child, childIndex) => (
              <tr key={child.CapNhapSoLieuID}>
                <td>{child.NoiDung}</td>
                <td>
                  <Checkbox
                    checked={child.DaXuLy}
                    onChange={(e) => handleInputChange(itemIndex, childIndex, 'DaXuLy', e.target.checked)}
                  />
                </td>
                <td>
                  {child.DaXuLy && (
                    <DatePicker
                      value={child.NgayXuLy ? dayjs(child.NgayXuLy) : null}
                      onChange={(date) => handleInputChange(itemIndex, childIndex, 'NgayXuLy', date ? date.format('YYYY-MM-DD') : null)}
                      format="DD/MM/YYYY"
                      style={{ width: '100%' }} // Set max width for Ngày xử lý
                      placeholder='Ngày xử lý'
                    />
                  )}
                </td>
              </tr>
            ))
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
        action === 'editkqxlcs'
          ? 'Cập nhật kết quả xử lý hoàn thiện cơ chế chính sách'
          : action === 'editkqxlcs7'
            ? 'Cập nhật kết quả xử lý hoàn thiện ngoài cơ chế chính sách'
            : 'Cập nhật kết quả xử lý'
      }
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

        <CustomTable data={dataModalAddEdit} updateData={updateSoLieu} />
      </Form>
    </Modal>
  );
};