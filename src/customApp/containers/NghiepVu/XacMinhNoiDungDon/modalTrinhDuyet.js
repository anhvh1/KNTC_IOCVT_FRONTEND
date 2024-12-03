import React, {Component, useRef} from 'react';
import {
  Col,
  Form,
  Icon,
  Input,
  message,
  Row,
  Upload,
  Checkbox,
  Radio,
  DatePicker,
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import Wrapper from './modalAddEdit.styled';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
  ITEM_LAYOUT_NEW,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  COL_ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

const {Item} = Form;
class ModalTrinhDuyet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formRef = React.createRef();
  }

  onOk = () => {
    const {onCreate} = this.props;
    onCreate(false, true);
  };

  render() {
    const {title, visible, onCancel} = this.props;
    return (
      <Modal
        title={'Trình duyệt'}
        visible={visible}
        className="center-modal__footer"
        footer={
          <>
            <Button type="primary" onClick={this.onOk}>
              <SaveOutlined /> Có
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Không
            </Button>
          </>
        }
        width={450}
        onCancel={() => onCancel()}
        // key={fileKey}
      >
        Bạn có chắc chắn muốn trình đơn này lên cho lãnh đạo xem xét, phê duyệt
        kết quả xử lý không?
      </Modal>
    );
  }
}

export default ModalTrinhDuyet;
