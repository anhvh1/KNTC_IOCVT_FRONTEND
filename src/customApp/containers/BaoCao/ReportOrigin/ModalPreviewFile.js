import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT3,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL,
  ITEM_LAYOUT_FULL,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import Wrapper from './ModalDetailsReport.styled';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  UpOutlined,
  DownOutlined,
  RollbackOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import PDFIcon from '../../../../image/pdf.png';
import RARIcon from '../../../../image/rar-file-format.png';
import DOCIcon from '../../../../image/doc.png';
import XLSIcon from '../../../../image/xls.png';
import Constants from '../../../../settings/constants';
import {Form, Radio, Row, Col} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
  Collapse,
  DatePicker,
  ItemForm as Item,
} from '../../../../components/uielements/exportComponent';

const {Panel} = Collapse;

export default (props) => {
  useEffect(() => {}, []);

  const {visible, src} = props;

  return (
    <Modal
      title={`Xem trước phiếu`}
      width={1100}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel} type="primary">
          <DownloadOutlined />
          Tải file
        </Button>,
        <Button key="back" onClick={props.onCancel} type="second">
          <RollbackOutlined />
          Quay lại
        </Button>,
        <Button key="back" onClick={props.onCancel} type="danger">
          Hủy bỏ
        </Button>,
      ]}
    >
      <iframe src={src} />
    </Modal>
  );
};
