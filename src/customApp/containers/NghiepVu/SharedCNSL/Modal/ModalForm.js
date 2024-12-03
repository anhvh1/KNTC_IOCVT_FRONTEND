import React from "react";
import { Modal } from "../../../../../components/uielements/exportComponent";
import Button from "../../../../../components/uielements/button";
import {
  CloseOutlined,
  CloseSquareFilled,
  SaveOutlined,
} from "@ant-design/icons";
const ModalForm = ({
  visible,
  onCancel,
  title,
  children,
  onOk,
  keyRef,
  width,
}) => {
  console.log(keyRef, "key");
  return (
    <Modal
      visible={visible}
      key={keyRef}
      onCancel={onCancel}
      title={title}
      footer={[
        <Button type="danger" onClick={() => onCancel()}>
          <CloseSquareFilled /> Đóng
        </Button>,
        <Button type="primary" onClick={() => onOk()}>
          <SaveOutlined /> Lưu
        </Button>,
      ]}
      width={width ? width : 800}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
