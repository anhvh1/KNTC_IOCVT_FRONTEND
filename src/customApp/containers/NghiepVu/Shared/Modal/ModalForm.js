import React from "react";
import { Modal } from "../../../../../components/uielements/exportComponent";
import Button from "../../../../../components/uielements/button";
import {
  CloseOutlined,
  CloseSquareFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
const ModalForm = (props) => {
  const {
    visible,
    onCancel,
    title,
    children,
    onOk,
    keyRef,
    width,
    style,
    hiddenSave,
    disabledSave,
    titleDisabledSave,
  } = props;

  return (
    <Modal
      visible={visible}
      key={keyRef}
      onCancel={onCancel}
      title={title}
      {...props}
      footer={[
        <Button type="danger" onClick={() => onCancel()}>
          <CloseSquareFilled /> Đóng
        </Button>,
        !hiddenSave ? (
          <Tooltip title={disabledSave ? titleDisabledSave : null}>
            <Button
              type="primary"
              onClick={() => onOk()}
              disabled={disabledSave}
            >
              <SaveOutlined /> Lưu
            </Button>
          </Tooltip>
        ) : null,
      ]}
      width={width ? width : 800}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
