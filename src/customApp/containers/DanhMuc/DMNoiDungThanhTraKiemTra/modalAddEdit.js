import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { Radio, Row, Col, Checkbox } from "antd";

import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import { checkInputNumber } from "../../../../helpers/utility";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action } = props;
  useEffect(() => {
    if (dataEdit && dataEdit.ContentID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [dataEdit]);

  const [isChecked, setIsChecked] = useState(false);
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      Status: isChecked,
    });
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Cập nhật giá trị checkbox
  };
  return (
    <Modal
      title={`${
        action === "edit" ? "Sửa" : "Thêm"
      } nội dung thanh tra, kiểm tra`}
      width={450}
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
          form="FormNoiDungThanhTraKiemTra"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"FormNoiDungThanhTraKiemTra"}
        initialValues={{
          TrangThai: 1,
        }}
      >
        {action === "edit" ? <Item name={"ContentID"} hidden /> : ""}

        <Item
          label="Nội dung"
          name={"Content"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Đối tượng áp dụng" name={"Object"} {...ITEM_LAYOUT}>
          <Select allowClear placeholder={"Chọn đối tượng áp dụng"}>
            <Option value={0}>Cơ quan</Option>
            <Option value={1}>Doanh Nghiệp</Option>
          </Select>
        </Item>
        <Item label="Sử dụng" name={"Status"} {...ITEM_LAYOUT}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        </Item>
      </Form>
    </Modal>
  );
};
