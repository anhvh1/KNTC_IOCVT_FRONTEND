import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { Radio, Row, Col, Checkbox, Select, TreeSelect } from "antd";
import {
  Button,
  Modal,
  Input,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import apiUrl from "./config";
import { checkInputNumber } from "../../../../helpers/utility";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import {
  CloseSquareFilled,
  SaveFilled
} from "@ant-design/icons";
const { Option, OptGroup } = Select;
import axios from "axios";
export default (props) => {
  const [form] = useForm();
  const access_token = localStorage.getItem("access_token");
  const { dataEdit, loading, visible, action } = props;
  useEffect(() => {
    if (dataEdit && dataEdit.PhanLoaiThanhTraID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
      if (dataEdit.IsKiemTra === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      PhanLoaiThanhTraID:value.PhanLoaiThanhTraID,
      TenPhanLoaiThanhTra: value.TenPhanLoaiThanhTra,
      ParrentID: value.ParrentID > 0 ? value.ParrentID : 0,
      IsKiemTra: isChecked,
    });
  };
  const [options, setOptions] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl.GetTree, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.data && response.data.Status === 1) {
          setOptions(response.data.Data);
        }
      } catch (error) {
        console.error("Error fetching the tree data", error);
      }
    };
    fetchData();
  }, []);

  // Recursive function to render nested Select options
  const renderOptions = (data) => {
    return data.map((item) => {
      if (item.Children && item.Children.length > 0) {
        return (
          <OptGroup
            key={item.PhanLoaiThanhTraID}
            label={item.TenPhanLoaiThanhTra}
          >
            {renderOptions(item.Children)}
          </OptGroup>
        );
      }
      return (
        <Option key={item.PhanLoaiThanhTraID} value={item.PhanLoaiThanhTraID}>
          {item.TenPhanLoaiThanhTra}
        </Option>
      );
    });
  };
  const generateTreeSelectData = (data) => {
    return data.map((item) => ({
      title: item.TenPhanLoaiThanhTra,
      value: item.PhanLoaiThanhTraID.toString(), // Ensure value is string
      key: item.PhanLoaiThanhTraID.toString(), // Ensure key is string
      children:
        item.Children.length > 0
          ? generateTreeSelectData(item.Children)
          : undefined,
    }));
  };

  const treeSelectData = generateTreeSelectData(options);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Cập nhật giá trị checkbox
  };
  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"
        } thông tin phân loại thanh tra`}
      width={450}
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
        {action === "edit" ? <Item name={"PhanLoaiThanhTraID"} hidden /> : ""}

        <Item
          label="Tên loại thanh tra"
          name={"TenPhanLoaiThanhTra"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Thuộc phân loại" name="ParrentID" {...ITEM_LAYOUT}>
          {/* <Select placeholder="Chọn phân loại">
            {renderOptions(options)}
          </Select> */}
          <TreeSelect
            treeData={treeSelectData}
            placeholder="Chọn thư mục"
            // style={{ width: '30%' }}
            treeDefaultExpandAll
            onChange={(value) => form.setFieldsValue({ ParrentID: value })}
          />
        </Item>
        {/* <Item label="Là kiểm tra" name={"IsKiemTra"} {...ITEM_LAYOUT}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </Item> */}
      </Form>
    </Modal>
  );
};
