import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT_SMALL_2,
  ITEM_LAYOUT_HALF,
  REQUIRED,
  ITEM_LAYOUT,
} from '../../../../settings/constants';
import {message, Radio} from 'antd';
import {Form} from 'antd';
import {
  Button,
  Modal,
  Select,
  Input,
  InputFormatSpecific,
} from '../../../../components/uielements/exportComponent';
import {useRef} from 'react';
import Inputnumber from '../../../../components/uielements/InputNumber';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {dataModalAdd, loading, visible, action, DanhSachLoaiKhieuTo} = props;
  const [value1, setValue1] = useState();
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  useEffect(() => {
    if (action === 'add') {
      if (dataModalAdd && dataModalAdd.LoaiKhieuToCha) {
        form &&
          form.setFieldsValue({
            ...dataModalAdd,
            TenLoaiKhieuToCha: dataModalAdd.Ten,
          });
      }
    }
    if (action === 'edit') {
      if (dataModalAdd) {
        const parentID = dataModalAdd?.LoaiKhieuToCha;
        let Parent;
        const findParentFromTree = (list, ParentID) => {
          list.forEach((item) => {
            if (item.DanhMucLoaiKhieuToCon) {
              if (item.LoaiKhieuToID === ParentID) {
                Parent = item.TenLoaiKhieuTo;
              } else {
                findParentFromTree(item.DanhMucLoaiKhieuToCon, ParentID);
              }
            } else {
              if (item.LoaiKhieuToID === ParentID) {
                Parent = item.TenLoaiKhieuTo;
              }
            }
          });
        };
        findParentFromTree(DanhSachLoaiKhieuTo, parentID);
        form &&
          form.setFieldsValue({
            ...dataModalAdd,
            TenLoaiKhieuToCha: Parent,
          });
      }
    }
  }, []);

  const onOk = async (e) => {
    const value = await form.validateFields();
    if (action == 'add') {
      e.preventDefault();
      props.onCreate({
        ...value,
        SuDung: value1 === undefined ? true : value1,
      });
    }
    if (action === 'edit') {
      e.preventDefault();
      props.onCreate({
        ...dataModalAdd,
        ...value,
        SuDung: value.SuDung,
      });
    }
  };
  const onChange = (e) => {
    setValue1(e.target.value);
  };

  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {MappingCode, TenLoaiKhieuTo, SuDung, ThuTu} = value;

    if (action === 'edit') {
      if (
        MappingCode &&
        parseInt(ThuTu) &&
        TenLoaiKhieuTo &&
        (MappingCode !== dataModalAdd.MappingCode ||
          TenLoaiKhieuTo !== dataModalAdd.TenLoaiKhieuTo ||
          SuDung !== dataModalAdd.SuDung ||
          parseInt(ThuTu) !== parseInt(dataModalAdd.ThuTu))
      ) {
        setIsFormSuccess(false);
      } else {
        setIsFormSuccess(true);
      }
    }

    if (action === 'add') {
      if (
        MappingCode &&
        TenLoaiKhieuTo &&
        (MappingCode !== dataModalAdd.MappingCode ||
          TenLoaiKhieuTo !== dataModalAdd.TenLoaiKhieuTo)
      ) {
        if (ThuTu && ThuTu <= 0) {
          setIsFormSuccess(true);
        } else {
          setIsFormSuccess(false);
        }
      } else {
        setIsFormSuccess(true);
      }
    }
  };


  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} loại khiếu tố`}
      width={450}
      visible={visible}
      onCancel={props.onCancel}
      style={{color: 'red'}}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          disabled={isFormSuccess}
          key="submit"
          htmlType="submit"
          type="primary"
          form="formbuocxacminh"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formbuocxacminh'} onChange={handleChangedFields}>
        {dataModalAdd.Ten ? 
          <Item
            label="Loại khiếu tố cha"
            name={'TenLoaiKhieuToCha'}
            {...ITEM_LAYOUT}
          >
            <Input disabled={true} />
          </Item>
         : null}
        <Item
          label="Mã loại khiếu tố"
          name={'MappingCode'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Item
          label="Tên loại khiếu tố"
          name={'TenLoaiKhieuTo'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>

        <Item
          label="Thứ tự sắp xếp"
          name={'ThuTu'}
          {...ITEM_LAYOUT}
          rules={[
            {
              max: 11,
              message: 'Số thứ tự không hợp lệ.',
              pattern: new RegExp(/^[1-900000000]+$/),
            },
          ]}
        >
          <Input maxLength={7} />
        </Item>
        {action === 'add' ? (
          <></>
        ) : (
          <Item label="Sử dụng" name={'SuDung'} {...ITEM_LAYOUT}>
            <Radio.Group onChange={onChange} value={value1} defaultValue={true}>
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Radio.Group>
          </Item>
        )}
      </Form>
    </Modal>
  );
};
