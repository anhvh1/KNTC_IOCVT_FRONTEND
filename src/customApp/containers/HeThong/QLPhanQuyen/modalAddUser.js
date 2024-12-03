import React, { Component, useEffect, useState } from "react";
import { ITEM_LAYOUT_SMALL_2, REQUIRED } from "../../../../settings/constants";
import { message } from "antd";
import Modal from "../../../../components/uielements/modal";
import Button from "../../../../components/uielements/button";

import {
  Select,
  OptionSelect,
} from "../../../../components/uielements/exportComponent";
import api from "./config";

import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";

const ModalAddUser = (props) => {
  const [form] = useForm();
  const {
    confirmLoading,
    visible,
    onCancel,
    dataModalAddUser,
    NhomNguoiDungID,
  } = props;
  const [DanhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [DanhSachNguoiDung, setDanhSachNguoiDung] = useState([]);

  useEffect(() => {
    form && form.setFieldsValue({ NhomNguoiDungID });
    api
      .GetAllCoQuan()
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachCoQuan(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const { onCreate } = props;
    onCreate(value);
  };

  const changeCoQuan = (value) => {
    if (value) {
      if (NhomNguoiDungID) {
        api
          .danhSachNguoiDung({ NhomNguoiDungID, CoQuanID: value })
          .then((response) => {
            if (response.data.Status > 0) {
              setDanhSachNguoiDung(response.data.Data);
            } else {
              message.destroy();
              message.error(response.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      }
    } else {
      setDanhSachNguoiDung([]);
    }
    form && form.setFieldsValue({ NguoiDungID: [] });
  };

  return (
    <Modal
      title="Thêm người dùng vào nhóm"
      width={600}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formAddUser"
          loading={confirmLoading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name="formAddUser">
        <Item name={"NhomNguoiDungID"} hidden />
        <Item
          label="Chọn cơ quan"
          name={"CoQuanID"}
          rules={[{ ...REQUIRED }]}
          {...ITEM_LAYOUT_SMALL_2}
        >
          <Select
            showSearch
            noGetPopupContainer
            placeholder="Chọn cơ quan"
            // mode={'multiple'}
            onChange={(value) => changeCoQuan(value)}
          >
            {DanhSachCoQuan.map((value) => (
              <OptionSelect key={value.CoQuanID} value={value.CoQuanID}>
                {`${value.TenCoQuan}`}
              </OptionSelect>
            ))}
          </Select>
        </Item>
        <Item
          label="Chọn người dùng"
          name={"NguoiDungID"}
          rules={[{ ...REQUIRED }]}
          {...ITEM_LAYOUT_SMALL_2}
        >
          <Select
            showSearch
            noGetPopupContainer
            placeholder="Chọn người dùng"
            mode={"multiple"}
          >
            {DanhSachNguoiDung.map((value) => (
              <OptionSelect key={value.NguoiDungID} value={value.NguoiDungID}>
                {`${value.TenNguoiDung} (${value.TenCanBo})`}
              </OptionSelect>
            ))}
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};

export { ModalAddUser };
