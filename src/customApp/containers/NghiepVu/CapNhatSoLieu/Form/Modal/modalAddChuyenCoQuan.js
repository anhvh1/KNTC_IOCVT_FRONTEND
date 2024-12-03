import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../../../settings/constants';
import { Radio, Row, Col, Input, Table, DatePicker, message } from 'antd';
import { DeleteOutlined, DownloadOutlined, SaveOutlined } from "@ant-design/icons";
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

export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID } = props;
  useEffect(() => {
    if (dataEdit) {
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

    // Group allData by noiDung
    const groupedData = allData.reduce((acc, curr) => {
      if (!acc[curr.noiDung]) {
        acc[curr.noiDung] = [];
      }
      acc[curr.noiDung].push({
        CapNhapSoLieuID: 0,
        CapNhapChiTietSoLieuID: 0,
        DoiTuongID: curr.DoiTuongID,
        NgayChuyen: null,
        KhoiTo: null,
        NgayKhoiTo: null
      });
      return acc;
    }, {});

    const Child = Object.entries(groupedData).map(([noiDung, childItems]) => ({
      CapNhapSoLieuID: 0,
      CapNhapChitietDeleteIDs: [],
      CapNhapLoaiSoLieuID: 0,
      NoiDung: noiDung,
      Child: childItems
    }));

    const formattedValue = {
      CongBoKLID: value.CongBoKLID || 0,
      CuocThanhTraID: CuocThanhTraID,
      LoaiSoLieu: 5,
      Child: Child
    };

    props.onCreate(formattedValue);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      noiDung: '',
      doiTuong: [{ key: '1-1', DoiTuongID: '' }]
    },
  ]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    updateAllData();
  }, [dataSource]);

  const updateAllData = () => {
    const newAllData = dataSource.flatMap(item =>
      item.doiTuong.map(dt => ({
        noiDung: item.noiDung,
        DoiTuongID: dt.DoiTuongID
      }))
    ).filter(item => item.noiDung !== '' && item.DoiTuongID !== '');

    setAllData(newAllData);
  };

  const [soLieu, setSoLieu] = useState([]);

  const handleSave = (record) => {
    const newDoiTuongKey = `${record.key}-${record.doiTuong.length + 1}`;
    const newDataSource = dataSource.map(item => {
      if (item.key === record.key) {
        return {
          ...item,
          doiTuong: [
            { key: item.doiTuong[0].key, DoiTuongID: '' }, // Reset first row
            ...item.doiTuong.slice(1), // Keep existing rows (if any)
            { key: newDoiTuongKey, DoiTuongID: item.doiTuong[0].DoiTuongID } // Add new row
          ]
        };
      }
      return item;
    });

    setDataSource(newDataSource);
    setSoLieu(newDataSource.slice(1));
  };

  const renderTable = () => (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Nội dung/vụ việc</th>
          <th style={tableHeaderStyle}>Đối tượng</th>
          <th style={tableHeaderStyle}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, index) => (
          <React.Fragment key={record.key}>
            {record.doiTuong.map((doiTuong, doiTuongIndex) => (
              <tr key={doiTuong.key} style={doiTuongIndex % 2 === 0 ? evenRowStyle : oddRowStyle}>
                {doiTuongIndex === 0 && (
                  <td style={{ ...tableCellStyle, ...firstColumnStyle }} rowSpan={record.doiTuong.length}>
                    <Input
                      value={record.noiDung}
                      onChange={(e) => handleChangeNoiDung(record.key, e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                )}
                <td style={tableCellStyle}>
                  <Select
                    style={selectStyle}
                    placeholder="Chọn đối tượng"
                    value={doiTuong.DoiTuongID}
                    onChange={(value) => handleChangeDoiTuong(record.key, doiTuong.key, value)}
                  >
                    {DoiTuong?.map((item) => (
                      <Option key={item.ID} value={item.ID}>
                        {item.Ten}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td style={{ ...tableCellStyle, ...actionColumnStyle }}>
                  {doiTuongIndex === 0 ? (
                    // <Button icon={<SaveOutlined />} onClick={() => handleSave(record)} />
                    // <svg onClick={() => handleSave(record)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    //   <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
                    // </svg>
                    <svg onClick={() => {
                      if (allData.length === 0) {
                        message.error("Vui lòng điền thông tin trước khi lưu."); // Thông báo lỗi nếu chưa điền thông tin
                        return;
                      }
                      handleSave(record);
                    }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-floppy" viewBox="0 0 16 16">
                      <path d="M11 2H9v3h2z" />
                      <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                    </svg>
                  ) : (
                    // <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key, doiTuong.key)} />
                    // <button
                    //   onClick={() => handleDelete(record.key, doiTuong.key)}
                    //   style={deleteButtonStyle}
                    // >
                      <DeleteIcon onClick={() => handleDelete(record.key, doiTuong.key)} />
                    // </button>
                  )}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f0f0f0',
    padding: '12px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  };

  const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    verticalAlign: 'middle',
  };

  const firstColumnStyle = {
    borderRight: '1px solid #ddd',
  };

  const actionColumnStyle = {
    textAlign: 'center',
    width: '100px',
  };

  const evenRowStyle = {
    backgroundColor: '#f9f9f9',
  };

  const oddRowStyle = {
    backgroundColor: '#ffffff',
  };

  const inputStyle = {
    width: '100%',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    padding: '4px 8px',
  };

  const selectStyle = {
    width: '100%',
  };

  const iconStyle = {
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "red",
    fontSize: "15px",
    padding: 0,
  };

  const handleChangeNoiDung = (key, value) => {
    const newData = dataSource.map(item =>
      item.key === key ? { ...item, noiDung: value } : item
    );
    setDataSource(newData);
  };

  const handleChangeDoiTuong = (recordKey, doiTuongKey, value) => {
    const newData = dataSource.map(item => {
      if (item.key === recordKey) {
        const newDoiTuong = item.doiTuong.map(dt =>
          dt.key === doiTuongKey ? { ...dt, DoiTuongID: value } : dt
        );
        return { ...item, doiTuong: newDoiTuong };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleDelete = (recordKey, doiTuongKey) => {
    const newDataSource = dataSource.map(item => {
      if (item.key === recordKey) {
        if (item.doiTuong.length > 1) {
          return {
            ...item,
            doiTuong: item.doiTuong.filter(dt => dt.key !== doiTuongKey)
          };
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null);
    setDataSource(newDataSource);

    const newSoLieu = soLieu.filter(item => item.key !== recordKey);
    setSoLieu(newSoLieu);
  };

  return (
    <Modal
      title={`${action === "editSoLieu" ? "Cập nhật" : "Thêm"} nội dung kiến nghị xử lý chuyển cơ quan điều tra`}
      width={"50%"} // Increased width to accommodate more fields
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
            name={'HuyenID'}
            listHeight={100}
          >
            {CongBoKLID?.map((item) => (
              <Option key={item.ID} value={item.ID}>
                {item.SoVanBan}
              </Option>
            ))}
          </Select>
        </Item>
        {renderTable()}

        {/* You can add action buttons for "Thao tác" here if needed */}
      </Form>
    </Modal>
  );
};
