import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Input,
} from '../../../../components/uielements/exportComponent';
import Select, {
  Option,
} from '../../../../components/uielements/select';
import { customizeItemValidator as Item } from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import {
  REQUIRED,
  ITEM_LAYOUT,
} from "../../../../settings/constants";
import api from './config';
import {
  CloseSquareFilled,
  SaveFilled
} from "@ant-design/icons";

export default (props) => {
  const [form] = useForm();
  const { dataEdit, loading, visible, action, dataModalEdit } = props;
  const [DanhSachMenu, setDanhSachMenu] = useState([]);
  const [DanhSachTinh, setDanhSachTinh] = useState([]);
  const [DanhSachHuyen, setDanhSachHuyen] = useState([]);
  const [DanhSachXa, setDanhSachXa] = useState([]);
  const [CoQuanID, setCoQuanID] = useState(dataEdit.CoQuanID);
  const [TinhID, setTinhID] = useState(dataModalEdit.TinhID);
  const [MaCQ, setMaCQ] = useState('');
  useEffect(() => {
    if (dataEdit && dataEdit.DoanhNghiepID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
      if (dataEdit.IsVanPhongDaiDien === true) {
        setIsChecked(true)
      } else {
        setIsChecked(false)
      }
      fetchXa(dataModalEdit.HuyenID)

    }
  }, [dataEdit]);
  useEffect(() => {
    if (dataModalEdit && dataModalEdit.CoQuanID) {
      form &&
        form.setFieldsValue({
          ...dataModalEdit,
        });
      setMaCQ(dataModalEdit.MaCQ)
    }
  }, [dataModalEdit]);
  useEffect(() => {
    fetchData();
    Tinh();
    fetchHuyen();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.danhSachLinhVuc(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachMenu(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };
  const Tinh = async () => {
    try {
      const res = await api.danhSachTinh(/* Tham số */);
      if (res.data.Status > 0) {
        setDanhSachTinh(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách cấp xếp hạng:', error);
    }
  };
  const fetchHuyen = async (tinhID) => {
    try {
      const res = await api.danhSachHuyen(tinhID);
      if (res.data.Status > 0) {
        setDanhSachHuyen(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách huyện:', error);
    }
  };

  const onTinhChange = (value) => {
    form.setFieldsValue({ HuyenID: undefined }); // Reset Huyen field when Tinh changes
  };
  const fetchXa = async (huyenID) => {
    try {
      const res = await api.danhSachXa(huyenID);
      if (res.data.Status > 0) {
        setDanhSachXa(res.data.Data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách huyện:', error);
    }
  };

  const onHuyenChange = (value) => {
    fetchXa(value); // Fetch Huyen when a Tinh is selected
    form.setFieldsValue({ XaID: undefined }); // Reset Huyen field when Tinh changes
  };
  const [isChecked, setIsChecked] = useState(false);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();

    // Xóa các trường có giá trị là undefined hoặc null
    Object.keys(value).forEach((key) => {
      if (value[key] === undefined || value[key] === null) {
        delete value[key];
      }
    });
    props.onCreate({
      ...value,
      IsVanPhongDaiDien: isChecked, // Gửi giá trị checkbox từ state
      PhanLoai: 1,
      CoQuanID: CoQuanID,
      MaCQ: value.MaSoThue,
    });
  };
  const isViewMode = action === 'view';
  const renderFormItem = (name, label, rules, inputComponent) => {
    let displayValue = dataEdit[name] || dataModalEdit[name] || '';

    if (isViewMode) {
      if (name === 'TinhID') {
        displayValue = 'Quảng Trị';
      } else if (name === 'HuyenID') {
        const huyen = DanhSachHuyen.find(h => h.HuyenID === displayValue);
        displayValue = huyen ? huyen.TenHuyen : '';
      } else if (name === 'XaID') {
        const xa = DanhSachXa.find(x => x.XaID === displayValue);
        displayValue = xa ? xa.TenXa : '';
      }
    }

    return (
      <Item
        label={label}
        name={name}
        {...ITEM_LAYOUT}
        rules={isViewMode ? [] : rules}
      >
        {isViewMode ? (
          <span>{displayValue}</span>
        ) : (
          inputComponent
        )}
      </Item>
    );
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Cập nhật' : action === 'view' ? 'Chi tiết' : 'Thêm'} thông tin doanh nghiệp`}
      width={550}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button type="danger"
        icon={<CloseSquareFilled />} 
        key="back"  onClick={props.onCancel}>
          {isViewMode ? 'Đóng' : 'Hủy'}
        </Button>,
        !isViewMode && (
          <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
            form="formdoanhnghiep"
            loading={loading}
            onClick={onOk}
          >
            Lưu
          </Button>
        ),
      ]}
    >
      <Form form={form} name={'Formdoanhnghiep'} initialValues={{
        TinhID: 63,
        HuyenID: null,
        XaID: null,
      }}>
        {action === 'edit' && !isViewMode ? <Item name={'DoanhNghiepID'} hidden /> : null}

        {renderFormItem('MaSoThue', 'Mã số thuế/ Số đăng ký', [
          {
            required: true,
            message: 'Vui lòng nhập mã số thuế',
          },
        ], <Input isRemoveAcent isClearSpace={true} />)}
        {renderFormItem('NameDoanhNghiep', 'Tên doanh nghiệp', [
          {
            required: true,
            message: 'Vui lòng nhập tên doanh nghiệp',
          },
        ], <Input/>)}
        {renderFormItem('TinhID', 'Tỉnh', [REQUIRED],
          <Select
            allowClear
            placeholder={'Chọn tỉnh'}
            onChange={onTinhChange}
          >
            <Option key={63} value={63}>Quảng Trị</Option>
          </Select>
        )}

        {renderFormItem('HuyenID', 'Huyện', [REQUIRED],
          <Select allowClear placeholder={'Chọn huyện'} onChange={onHuyenChange}>
            {DanhSachHuyen?.map((item) => (
              <Option key={item.HuyenID} value={item.HuyenID}>
                {item.TenHuyen}
              </Option>
            ))}
          </Select>
        )}

        {renderFormItem('XaID', 'Xã', [REQUIRED],
          <Select allowClear placeholder={'Chọn xã'}>
            {DanhSachXa?.map((item) => (
              <Option key={item.XaID} value={item.XaID}>
                {item.TenXa}
              </Option>
            ))}
          </Select>
        )}

        {renderFormItem('DiaChi', 'Địa chỉ', [], <Input />)}
        {renderFormItem('NguoiDaiDien', 'Người đại diện', [], <Input />)}
        {renderFormItem('Website', 'Website', [], <Input />)}
      </Form>
    </Modal>
  );
};
