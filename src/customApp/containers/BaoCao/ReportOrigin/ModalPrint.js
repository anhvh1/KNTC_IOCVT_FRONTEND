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
  DownloadOutlined,
  FolderViewOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import PDFIcon from '../../../../image/pdf.png';
import RARIcon from '../../../../image/rar-file-format.png';
import DOCIcon from '../../../../image/doc.png';
import XLSIcon from '../../../../image/xls.png';
import Constants from '../../../../settings/constants';
import {Form, Radio, Row, Col} from 'antd';
import ModalPreviewFile from './ModalPreviewFile';
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
  const [visibleModalPrevew, setVisibleModalPreview] = useState(false);
  const [keyModalPreview, setKeyModalPreview] = useState(0);
  const [srcPreview, setSrcPreview] = useState('');

  useEffect(() => {}, []);

  const {visible} = props;

  const handleOpenModalPreview = () => {
    setVisibleModalPreview(true);
    setKeyModalPreview((prevKey) => prevKey + 1);
  };

  const handleCloseModalPrevew = () => {
    setVisibleModalPreview(false);
    setSrcPreview('');
  };

  return (
    <Modal
      title={`Chọn phiếu in`}
      width={1200}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={handleOpenModalPreview} type="primary">
          <FolderViewOutlined /> Xem trước
        </Button>,
        <Button key="back" onClick={props.onCancel} type="primary">
          <DownloadOutlined /> Tải file
        </Button>,
        <Button key="back" onClick={props.onCancel} type="danger">
          <RollbackOutlined /> Hủy bỏ
        </Button>,
      ]}
    >
      <ModalPreviewFile
        onCancel={handleCloseModalPrevew}
        visible={visibleModalPrevew}
        src={srcPreview}
      />
    </Modal>
  );
};
