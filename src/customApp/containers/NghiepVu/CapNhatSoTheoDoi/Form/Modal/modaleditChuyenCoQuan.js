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
import moment from 'moment'; // Add this import
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";

export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID, CapNhapLoaiSoLieuID } = props;
  const [capNhapChiTietSoLieuIDs, setCapNhapChiTietSoLieuIDs] = useState([]);
  console.log("capNhapChiTietSoLieuIDs", capNhapChiTietSoLieuIDs)

  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        CongBoKLID: dataEdit[0]?.CongBoKLID,
      });

      const formattedDataSource = Array.isArray(dataEdit) ? dataEdit.map((item, index) => ({
        key: `${index + 1}`,
        noiDung: item.NoiDung,
        CapNhapSoLieuID: item.CapNhapSoLieuID,
        doiTuong: [
          { key: `${index + 1}-0`, DoiTuongID: '' }, // Empty first row
          ...item.Child.map((child, childIndex) => ({
            key: `${index + 1}-${childIndex + 1}`,
            CapNhapChiTietSoLieuID: child.CapNhapChiTietSoLieuID,
            DoiTuongID: child.DoiTuongID,
            TenDoiTuong: child.TenDoiTuong,
            NgayChuyen: child.NgayChuyen ? moment(child.NgayChuyen) : null,
            KhoiTo: child.KhoiTo,
            NgayKhoiTo: child.NgayKhoiTo ? moment(child.NgayKhoiTo) : null,
          }))
        ],
      })) : [];

      setDataSource(formattedDataSource);
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
      CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,
      DeleteIDs: [],
      CongBoKLID: value.CongBoKLID,
      CuocThanhTraID: CuocThanhTraID,
      LoaiSoLieu: 5,
      Child: dataSource.map(item => ({
        CapNhapSoLieuID: item.CapNhapSoLieuID || 0,
        CapNhapChitietDeleteIDs: capNhapChiTietSoLieuIDs,
        CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,
        NoiDung: item.noiDung,
        Child: item.doiTuong
          .slice(1)
          .filter(dt => dt.DoiTuongID !== '')
          .map(dt => ({
            CapNhapSoLieuID: item.CapNhapSoLieuID || null,
            CapNhapChiTietSoLieuID: dt.CapNhapChiTietSoLieuID || 0,
            DoiTuongID: dt.DoiTuongID,
            NgayChuyen: dt.NgayChuyen ? dt.NgayChuyen.format('YYYY-MM-DD') : null,
            KhoiTo: dt.KhoiTo || null,
            NgayKhoiTo: dt.NgayKhoiTo ? dt.NgayKhoiTo.format('YYYY-MM-DD') : null
          }))
      }))
    };

    console.log("formattedValue", formattedValue);
    props.onCreate(formattedValue);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      noiDung: '',
      doiTuong: []
    },
  ]);
  console.log("dataSource", dataSource)
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
    console.log("newDataSource", newDataSource)
    setDataSource(newDataSource);
    setSoLieu(newDataSource.slice(1));

  };

  const renderTable = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
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
              <tr key={doiTuong.key}>
                {doiTuongIndex === 0 && (
                  <td style={tableCellStyle} rowSpan={record.doiTuong.length}>
                    <Input
                      value={record.noiDung}
                      onChange={(e) => handleChangeNoiDung(record.key, e.target.value)}
                    />
                  </td>
                )}
                <td style={tableCellStyle}>
                  <Select
                    style={{ width: '100%' }}
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
                <td style={{ ...tableCellStyle, textAlign: 'center' }}>
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
                    <button
                      onClick={() => handleDelete(record.key, doiTuong.key)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "15px",
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  const tableHeaderStyle = {
    backgroundColor: '#f0f0f0',
    padding: '8px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    textAlign: 'center',
  };

  const tableCellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
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
          const deletedDoiTuong = item.doiTuong.find(dt => dt.key === doiTuongKey);
          if (deletedDoiTuong && deletedDoiTuong.CapNhapChiTietSoLieuID) {
            setCapNhapChiTietSoLieuIDs(prevIds => [...prevIds, deletedDoiTuong.CapNhapChiTietSoLieuID]);
          }
          return {
            ...item,
            doiTuong: item.doiTuong.filter(dt => dt.key !== doiTuongKey)
          };
        } else {
          const deletedItem = item.doiTuong[0];
          if (deletedItem && deletedItem.CapNhapChiTietSoLieuID) {
            setCapNhapChiTietSoLieuIDs(prevIds => [...prevIds, deletedItem.CapNhapChiTietSoLieuID]);
          }
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
          loading={loading}
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