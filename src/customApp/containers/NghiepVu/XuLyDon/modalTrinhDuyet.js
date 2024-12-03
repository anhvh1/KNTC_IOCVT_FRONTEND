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
    this.formRef.current.validateFields().then((value) => {
      onCreate(value);
    });
  };

  render() {
    const {title, visible, onCancel, DanhSachLanhDao, loading} = this.props;
    return (
      <Modal
        title={'Trình đơn thư'}
        visible={visible}
        className="center-modal__footer"
        footer={
          <>
            <Button type="primary" onClick={this.onOk} loading={loading}>
              <SaveOutlined style={{fontSize: 20}} /> Trình duyệt
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Đóng
            </Button>
          </>
        }
        width={500}
        onCancel={() => onCancel()}
        // key={fileKey}
      >
        <Form ref={this.formRef}>
          <Item label="Trình Lãnh Đạo" name="LanhDaoID" rules={[REQUIRED]}>
            <Select>
              {DanhSachLanhDao
                ? DanhSachLanhDao.map((item) => (
                    <Option value={item.CanBoID}>{item.TenCanBo}</Option>
                  ))
                : null}
            </Select>
          </Item>
        </Form>
      </Modal>
    );
  }
}

export default ModalTrinhDuyet;
