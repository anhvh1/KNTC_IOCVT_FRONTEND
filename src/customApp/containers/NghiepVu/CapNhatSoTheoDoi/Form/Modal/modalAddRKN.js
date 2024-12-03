import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../../../settings/constants';
import { Radio, Row, Col, Input, Table, DatePicker, message, Space } from 'antd';
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
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";

export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.LinhVucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayBanHanh: dataEdit.NgayBanHanh ? moment(dataEdit.NgayBanHanh) : null,
          ThoiHan: dataEdit.ThoiHan ? moment(dataEdit.ThoiHan) : null,
        });
    }
  }, [dataEdit]);
  const [CongBoKLID, setCongBoKLID] = useState();
  const [DoiTuong, setDoiTuong] = useState();
  useEffect(() => {
    GetCongBoKL();
    GetListDoiTuong();
  }, []);

  const GetCongBoKL = () => {
    api
      .GetCongBoKL(CuocThanhTraID) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setCongBoKLID(res.data.Data); // Set fetched data
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
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const formattedValue = {
      ...value,
      CuocThanhTraID: CuocThanhTraID,
      LoaiSoLieu: 3,
      Child: soLieu ? soLieu.map(item => ({
        CapNhapSoLieuID: 0,
        CapNhapLoaiSoLieuID: 0,
        HinhThucKyLuat: item.HinhThucKyLuat || null,
        DoiTuongID: item.DoiTuongID || null,
      })) : []
    };
    props.onCreate(formattedValue, soLieu);
    console.log("formattedValue", formattedValue);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      loaiDoiTuong: '',
      DoiTuongID: '',
      HinhThucKyLuat: '',
    },
  ]);

  const [soLieu, setSoLieu] = useState();
  console.log("soLieu", soLieu)
  useEffect(() => {
    const newFilteredDoiTuong = dataSource.map((item) =>
      Array.isArray(DoiTuong) ? DoiTuong.filter(doiTuong => doiTuong.LoaiDoiTuong === item.loaiDoiTuong) : []
    );

    setFilteredDoiTuong(newFilteredDoiTuong);
  }, [dataSource, DoiTuong]);
  const columns = [
    {
      title: 'Loại đối tượng',
      dataIndex: 'loaiDoiTuong',
      key: 'loaiDoiTuong',
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn loại"
          value={record.loaiDoiTuong}
          onChange={(value) => {
            handleChange(record.key, 'loaiDoiTuong', value);
            // Reset DoiTuongID when loaiDoiTuong changes
            handleChange(record.key, 'DoiTuongID', undefined); // Hoặc null
          }}
        >
          <Option value={1}>Tổ chức</Option>
          <Option value={2}>Cá nhân</Option>
        </Select>
      ),
    },
    {
      title: 'Đối tượng xử lý',
      dataIndex: 'DoiTuongID',
      key: 'DoiTuongID',
      render: (_, record, index) => (
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn đối tượng"
          value={record.DoiTuongID}
          onChange={(value) => handleChange(record.key, 'DoiTuongID', value)}
        >
          {(Array.isArray(filteredDoiTuong[index]) ? filteredDoiTuong[index] : []).map((item) => ( // Ensure it's an array
            <Option key={item.ID} value={item.ID}>
              {item.Ten}
            </Option>
          ))} {/* Fallback to an empty array if undefined */}
        </Select>
      ),
    },
    {
      title: 'Hình thức kỷ luật',
      dataIndex: 'HinhThucKyLuat',
      key: 'HinhThucKyLuat',
      render: (_, record) => (
        <Input
          value={record.HinhThucKyLuat}
          onChange={(e) => handleChange(record.key, 'HinhThucKyLuat', e.target.value)}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      // render: (_, record, index) => (
      //   <>
      //     {record.key === dataSource[0].key && (
      //       <Button icon={<SaveOutlined />} onClick={() => handleSave(record)} />
      //     )}
      //     {index !== 0 && (
      //       <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
      //     )}
      //   </>
      // ),
      render: (_, record, index) => (
        <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
          {record.key === dataSource[0].key && (
            // <Button icon={<SaveOutlined />}  />
            // <svg onClick={() => handleSave(record)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
            //   <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
            // </svg>
            <svg onClick={() => {
              if (!dataSource[0].loaiDoiTuong || !dataSource[0].DoiTuongID || !dataSource[0].HinhThucKyLuat) {
                message.warning("Vui lòng nhập đầy đủ thông tin"); // Show tooltip message
                return; // Prevent handleSave from being called
              }
              handleSave(record);
            }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-floppy" viewBox="0 0 16 16">
              <path d="M11 2H9v3h2z" />
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
            </svg>
          )}
          {index !== 0 && (
            // <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
            <button
              onClick={() => handleDelete(record.key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "red",
                fontSize: "15px",
              }}
            >
              <DeleteIcon />
            </button>
          )}
        </Space>
      ),
    },
  ];

  const handleSave = (record) => {
    const newKey = Date.now().toString();
    const newRow = {
      key: newKey,
      loaiDoiTuong: record.loaiDoiTuong,
      DoiTuongID: record.DoiTuongID,
      HinhThucKyLuat: record.HinhThucKyLuat,
      CapNhapLoaiSoLieuID: 1, // Add this line
    };

    const clearedFirstRow = {
      ...dataSource[0],
      loaiDoiTuong: '',
      DoiTuongID: '',
      HinhThucKyLuat: '',
    };
    const updatedDataSource = [clearedFirstRow, newRow, ...dataSource.slice(1)];
    setDataSource(updatedDataSource);
    setSoLieu(updatedDataSource.slice(1));
  };
  const [filteredDoiTuong, setFilteredDoiTuong] = useState([]);
  const handleChange = (key, dataIndex, value) => {
    const newData = [...dataSource];
    const target = newData.find((item) => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setDataSource(newData);

      // Nếu trường được thay đổi là loaiDoiTuong, lọc DoiTuong và xóa giá trị DoiTuongID
      if (dataIndex === 'loaiDoiTuong') {
        target.DoiTuongID = undefined; // Xóa giá trị DoiTuongID
        const filtered = (DoiTuong || []).filter(item => item.LoaiDoiTuong === parseInt(value)); // Added null check
        setFilteredDoiTuong(filtered);
      }
    }
  };
  const handleDelete = (key) => {
    const newDataSource = dataSource.filter((item) => item.key !== key);
    setDataSource(newDataSource);
    const newSoLieu = soLieu.filter((item) => item.key !== key);
    setSoLieu(newSoLieu);
  };
  return (
    <Modal
      title={action === 'addrkn2' ? `Thêm mới nội dung xử lý kiểm điểm rút kinh nghiệm` : action === 'addrkn' ? `Thêm mới nội dung xử lý kỷ luật` : ''}
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
        <Item
          label="Kết luận"
          name={"CongBoKLID"}
          rules={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            allowClear
            name={'CongBoKLID'}
            listHeight={100}
          >
            {CongBoKLID?.map((item) => (
              <Option key={item.ID} value={item.ID}>
                {item.SoVanBan}
              </Option>
            ))}
          </Select>
        </Item>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />

        {/* You can add action buttons for "Thao tác" here if needed */}
      </Form>
    </Modal>
  );
};
