import React, {Component, useEffect, useState} from 'react';
import actions from '../../../redux/DanhMuc/DMDiaGioi/actions';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import Constants, {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
} from '../../../../settings/constants';
import {Form, Row, Col} from 'antd';
import {
  Button,
  Modal,
  Input,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';

import TreeSelect from '../../../../components/uielements/treeSelect';
import Select, {Option} from '../../../../components/uielements/select';
import {_debounce} from '../../../../helpers/utility';
import api from './config';
import apiDiaGioi from '../DMDiaGioi/config';
import layout, {StyledModalCoQuan} from './styled';

const {Item, useForm} = Form;
// const { Item } = Form;

const ModalEdit = ({visible, onCancel, dataModalEdit, onCreate}) => {
  const [form] = useForm();
  const [capDonVi, setCapDonVi] = useState([]);
  const [thamQuyen, setThamQuyen] = useState([]);
  const [diaGioi, setDiaGioi] = useState({
    tinh: [],
    huyen: [],
    xa: [],
  });

  const [coquancha, setCoquancha] = useState();
  useEffect(() => {
    api.danhSachCacCapDonVi().then((res) => setCapDonVi(res.data.Data));
    api.danhSachThamQuyen().then((res) => setThamQuyen(res.data.Data));
    apiDiaGioi.danhSachDiaGioi().then((res) => {
      setDiaGioi((prevState) => ({...prevState, tinh: res.data.Data}));
      if (dataModalEdit?.Data?.TinhID) {
        onTinhChange(dataModalEdit?.Data?.TinhID);
        if (dataModalEdit?.Data?.HuyenID) {
          onHuyenChange(dataModalEdit?.Data?.HuyenID);
        }
      }
    });
    api.chiTietCoQuan({ID: dataModalEdit?.Data?.CoQuanChaID}).then((res) => {
      setCoquancha(res.data.Data?.TenCoQuan);
      form.setFieldsValue({
        ...dataModalEdit.Data,
        TenCoQuanCha: res?.data.Data?.TenCoQuan,
        HuyenID: dataModalEdit.Data?.HuyenID
          ? dataModalEdit.Data.HuyenID
          : null,
        XaID: dataModalEdit.Data?.XaID ? dataModalEdit.Data.XaID : null,
      });
    });
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    for (const key in value) {
      if (!value[key]) {
        delete value[key];
      }
    }
    onCreate({
      ...value,
      CoQuanChaID: dataModalEdit.Data.CoQuanChaID,
      CoQuanID: dataModalEdit.CoQuanID,
    });
  };
  const onTinhChange = (value, reset) => {
    if (value) {
      apiDiaGioi.danhSachDiaGioi({ID: value, Cap: 2}).then((res) => {
        setDiaGioi((prevState) => ({...prevState, huyen: res.data.Data}));
      });
    } else {
      setDiaGioi((prevState) => ({...prevState, huyen: [], xa: []}));
      form.setFieldsValue({HuyenID: null, XaID: null});
    }
  };
  const onHuyenChange = (value) => {
    if (value) {
      apiDiaGioi.danhSachDiaGioi({ID: value, Cap: 3}).then((res) => {
        setDiaGioi((prevState) => ({...prevState, xa: res.data.Data}));
      });
    } else {
      setDiaGioi((prevState) => ({...prevState, xa: []}));
      form.setFieldsValue({XaID: null});
    }
  };

  return (
    <>
      <Modal
        open={visible}
        title="Sửa cơ quan đơn vị"
        onCancel={onCancel}
        width="900px"
        footer={[
          <Button key="back" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={onOk}
            form="myForm"
          >
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="myForm"
          initialValues={{
            CQCoHieuLuc: false,
            QTVanThuTiepDan: false,
            CapUBND: false,
            QTVanThuTiepNhanDon: false,
            CapThanhTra: false,
            SuDungQuyTrinh: false,
            SuDungPM: false,
            SuDungQuyTrinhGQ: false,
            TinhID: null,
            HuyenID: null,
            XaID: null,
          }}
        >
          <Row justify="space-between" gutter={[32, 8]}>
            <Col {...layout.colFull}>
              <Item
                label="Cơ quan cha"
                name={'TenCoQuanCha'}
                rules={[REQUIRED]}
                {...layout.formItem1}
              >
                <Select disabled>
                  <Option>{coquancha}</Option>
                </Select>
              </Item>
            </Col>
            <Col {...layout.colHaft}>
              <Item
                label="Mã cơ quan"
                name={'MaCQ'}
                rules={[REQUIRED]}
                {...layout.formItem2}
              >
                <InputFormatSpecific />
              </Item>
            </Col>
            <Col {...layout.colHaft}>
              <Item
                label="Tên cơ quan"
                name={'TenCoQuan'}
                rules={[REQUIRED]}
                labelAlign="left"
                {...layout.formItem2}
              >
                <Input />
              </Item>
            </Col>
            <Col {...layout.colHaft}>
              <Item
                label="Cấp"
                name={'CapID'}
                rules={[REQUIRED]}
                {...layout.formItem2}
              >
                <Select>
                  {capDonVi?.map((item, index) => (
                    <Option key={index} value={item.Cap}>
                      {item.TenCap}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col {...layout.colHaft}>
              <Item
                label="Thẩm quyền"
                name={'ThamQuyenID'}
                rules={[REQUIRED]}
                {...layout.formItem2}
              >
                <Select>
                  {thamQuyen?.map((item, index) => (
                    <Option key={index} value={item.ThamQuyenID}>
                      {item.TenThamQuyen}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[10, 8]}>
            <Col {...layout.colThirt}>
              <Item
                label="Tỉnh"
                name={'TinhID'}
                labelAlign="left"
                {...layout.formItem3}
              >
                <Select onChange={onTinhChange} listHeight={100} allowClear>
                  {diaGioi.tinh?.map((item, index) => (
                    <Option key={index} value={item.ID}>
                      {item.Ten}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col {...layout.colThirt}>
              <Item
                label="Huyện"
                name={'HuyenID'}
                labelAlign="right"
                {...layout.formItem3}
              >
                <Select
                  allowClear
                  name={'HuyenID'}
                  listHeight={100}
                  onChange={onHuyenChange}
                >
                  {diaGioi.huyen?.map((item, index) => (
                    <Option key={index} value={item.ID}>
                      {item.Ten}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col {...layout.colThirt}>
              <Item
                label="Xã"
                name={'XaID'}
                labelAlign="right"
                {...layout.formItem3}
              >
                <Select listHeight={100} allowClear>
                  {diaGioi.xa?.map((item, index) => (
                    <Option key={index} value={item.ID}>
                      {item.Ten}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <StyledModalCoQuan>
            <Row className="checkbox-coquan">
              <Col span={12}>
                <Item name="CQCoHieuLuc" valuePropName="checked" label="">
                  <Checkbox>Cơ quan có hiệu lực</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="QTVanThuTiepDan" valuePropName="checked">
                  <Checkbox>Quy trình cán bộ tiếp dân</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="CapUBND" valuePropName="checked">
                  <Checkbox>Cơ quan cấp UBND</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="QTVanThuTiepNhanDon" valuePropName="checked">
                  <Checkbox>Quy trình văn thư tiếp nhận đơn</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="CapThanhTra" valuePropName="checked">
                  <Checkbox>Cơ quan cấp thanh tra</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="SuDungQuyTrinh" valuePropName="checked">
                  <Checkbox>
                    Sử dụng quy trình tiếp công dân, xử lí đơn phức tạp
                  </Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="SuDungPM" valuePropName="checked">
                  <Checkbox>Cơ quan thuộc hệ thống phần mềm</Checkbox>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="SuDungQuyTrinhGQ" valuePropName="checked">
                  <Checkbox>Sử dụng quy trình giải quyết phức tạp</Checkbox>
                </Item>
              </Col>
            </Row>
          </StyledModalCoQuan>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalEdit);
