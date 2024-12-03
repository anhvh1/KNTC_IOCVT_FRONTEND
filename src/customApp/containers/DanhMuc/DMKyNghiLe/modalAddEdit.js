import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../settings/constants';
import { Radio, Row, Col, Switch, DatePicker } from 'antd';
import {
  Button,
  Modal,
  Input,
} from '../../../../components/uielements/exportComponent';
import dayjs from "dayjs";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import {
  CloseSquareFilled,
  SaveFilled
} from "@ant-design/icons";
const { RangePicker } = DatePicker;
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action } = props;
  const [status, setStatus] = useState(false);

  const handleSwitchChange = (checked) => {
    setStatus(checked);
  };
  useEffect(() => {
    if (dataEdit && dataEdit.LeId) {
      const TuNgay = dayjs(dataEdit.TuNgay).format("DD/MM/YYYY");
      const DenNgay = dayjs(dataEdit.DenNgay).format("DD/MM/YYYY");
      setStatus(dataEdit.TrangThai);
      form &&
        form.setFieldsValue({
          ...dataEdit,
          ThoiGian: [
            TuNgay ? dayjs(TuNgay, "DD/MM/YYYY") : null,
            DenNgay ? dayjs(DenNgay, "DD/MM/YYYY") : null,
          ],
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();

      // Extract the dates from RangePicker (values.ThoiGian)
      const { ThoiGian, ...rest } = values; // Exclude ThoiGian from the rest of the values

      const TuNgay =
        ThoiGian && ThoiGian[0] ? ThoiGian[0].format("YYYY-MM-DD") : null;
      const DenNgay =
        ThoiGian && ThoiGian[1] ? ThoiGian[1].format("YYYY-MM-DD") : null;
      const TrangThai = status;
      // Pass the rest of the form data (excluding ThoiGian) and the formatted dates to onCreate
      props.onCreate({
        ...rest, // Includes all form values except ThoiGian
        TuNgay,
        DenNgay,
        TrangThai,
      });
    } catch (error) {
    }
  };

  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"} thông tin kỳ nghỉ lễ`}
      width={550}
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
          // form="FormKyNghiLe"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
      // name={'FormKyNghiLe'}
      >
        {action === "edit" ? <Item name={"LeId"} hidden /> : ""}
        <Item
          label="Tên ngày nghỉ"
          name={"TenNgayNghi"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Chọn thời gian"
          name={"ThoiGian"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
        </Item>
        <Item
          label="Trạng thái"
          name="TrangThai"
          {...ITEM_LAYOUT}
        // rules={[REQUIRED]}
        >
          <Switch
            // checked={status}
            onChange={handleSwitchChange}
          />
        </Item>
      </Form>
    </Modal>
  );
};
