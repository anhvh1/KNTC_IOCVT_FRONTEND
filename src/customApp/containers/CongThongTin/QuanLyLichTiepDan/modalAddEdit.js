import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, message, Space, Table, Tag, Upload} from 'antd';
import axios from 'axios';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
  DatePicker,
} from '../../../../components/uielements/exportComponent';
import {FileAddOutlined} from '@ant-design/icons';
import {useKey} from '../../../CustomHook/useKey';
import {
  checkInputNumber,
  formatDate,
  formatValueSendRequest,
} from '../../../../helpers/utility';
import styled from 'styled-components';
import Checkbox from '../../../../components/uielements/checkbox';
import modal from '../../../../components/uielements/modal';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import {WysiwygEditor} from '../../../../components/uielements/exportComponent';
import api from './config';
import moment from 'moment';
import CKEditorApp from '../../../../components/uielements/ckeditor';
import {_debounce} from '../../../../helpers/utility';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
const {Item, useForm} = Form;
export default (props) => {
  const [form] = useForm();
  const [upload, setUpload] = useState();
  const [DanhSachLanhDao, setDanhSachLanhDao] = useState([]);
  const {dataEdit, loading, visible, action, DanhSachCoQuan} = props;
  const [dataCKEditor, setDataCKEditor] = useState('');
  const [keyEditor, setKeyEditor] = useKey();
  const [noiDung, setNoiDung] = useState(null);

  const onEditorStateChange = (value) => {
    setNoiDung(value);
  };

  const getDanhSachLanhDaoByCoQuan = (CoQuanID) => {
    api
      .GetDanhSachLanhDao({CoQuanID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachLanhDao(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  useEffect(() => {
    if (dataEdit && dataEdit.IDLichTiep) {
      setDataCKEditor(dataEdit?.NDTiep);
      setKeyEditor((prevKey) => prevKey + 1);
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayTiep: dataEdit?.NgayTiep ? moment(dataEdit?.NgayTiep) : null,
        });
    }
    if (dataEdit.IDCoQuanTiep) {
      getDanhSachLanhDaoByCoQuan(dataEdit.IDCoQuanTiep);
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    form.validateFields().then((value) => {
      const {onCreate} = props;
      value.NDTiep = dataCKEditor.toString();
      value.NgayTiep = formatDate(value.NgayTiep);
      formatValueSendRequest(value);
      onCreate(value);
    });
  };

  const onChange = _debounce((value) => {
    setDataCKEditor(value);
  });

  return (
    <Modal
      title={`${
        dataEdit.isView ? 'Chi tiết' : action === 'edit' ? 'Cập nhật' : 'Thêm'
      } lịch tiếp dân`}
      width={1000}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel} loading={loading}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formquoctich"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={'formlichtiepdan'}
        initialValues={{
          TrangThai: 1,
          CapID: 4,
          DuocSuDung: true,
          Public: true,
        }}
      >
        {/* <WysiwygEditor
          key={keyEditor}
          htmlRaw={noiDung}
          onDone={onEditorStateChange}
        /> */}
        {action === 'edit' ? <Item name={'IDLichTiep'} hidden /> : ''}
        {dataEdit.isView ? (
          <>
            <p>
              Cơ quan tiếp:{' '}
              <span style={{fontWeight: 500}}>{dataEdit.CoQuanTiep}</span>
            </p>
            <p>
              Lãnh đạo tiếp:{' '}
              <span style={{fontWeight: 500}}>
                {dataEdit.CoQuanTiep
                  ? DanhSachLanhDao.find(
                      (item) => item.CanBoID === dataEdit.IDCanBoTiep,
                    )?.TenCanBo
                  : null}
              </span>
            </p>
            <p>
              Nội dung tiếp:{' '}
              <span style={{fontWeight: 500}}>{dataEdit.NDTiep}</span>
            </p>
            <p>
              Ngày tiếp:{' '}
              <span style={{fontWeight: 500}}>{dataEdit.NgayTiep_Str}</span>
            </p>
            <p>
              Hiển thị:{' '}
              <span style={{fontWeight: 500}}>
                {dataEdit.Public === true ? 'Có hiển thị' : 'Không hiển thị'}
              </span>
            </p>
          </>
        ) : (
          <>
            <Item
              label="Cơ quan tiếp"
              name={'IDCoQuanTiep'}
              {...ITEM_LAYOUT}
              rules={[REQUIRED]}
            >
              <TreeSelect
                showSearch
                treeData={DanhSachCoQuan}
                onChange={(value) => {
                  getDanhSachLanhDaoByCoQuan(value);
                  form.setFieldValue('IDCanBoTiep', null);
                }}
                // style={{width: 400}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="Chọn cơ quan"
                allowClear
                treeDefaultExpandAll
                // onChange={value => this.onSearch(value, "CoQuanID")}
                notFoundContent={'Không có dữ liệu'}
                treeNodeFilterProp={'title'}
                // defaultValue={filterData.CoQuanID}
              />
              {/* <Select
                onChange={(value) => {
                  getDanhSachLanhDaoByCoQuan(value);
                  form.setFieldValue('IDCanBoTiep', null);
                }}
              >
                {DanhSachCoQuan
                  ? DanhSachCoQuan.map((item) => (
                      <Option value={item.CoQuanID} key={item.CoQuanID}>
                        {item.TenCoQuan}
                      </Option>
                    ))
                  : null}
              </Select> */}
            </Item>
            <Item
              label="Lãnh đạo tiếp"
              name={'IDCanBoTiep'}
              {...ITEM_LAYOUT}
              rules={[REQUIRED]}
            >
              <Select>
                {DanhSachLanhDao
                  ? DanhSachLanhDao.map((item) => (
                      <Option value={item.CanBoID} key={item.CanBoID}>
                        {item.TenCanBo}
                      </Option>
                    ))
                  : null}
              </Select>
            </Item>
            <Item
              label="Nội dung tiếp"
              name={'NDTiep'}
              {...ITEM_LAYOUT}
              rules={[REQUIRED]}
            >
              <CKEditorApp
                onChange={onChange}
                data={dataCKEditor}
                key={keyEditor}
              />
              {/* <Textarea /> */}
            </Item>
            <Item
              label="Ngày tiếp"
              name={'NgayTiep'}
              {...ITEM_LAYOUT}
              rules={[REQUIRED]}
            >
              <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" />
            </Item>
            <Item
              label="Hiển thị"
              name={'Public'}
              {...ITEM_LAYOUT}
              valuePropName="checked"
            >
              <Checkbox defaultChecked={dataEdit?.Public} />
            </Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
