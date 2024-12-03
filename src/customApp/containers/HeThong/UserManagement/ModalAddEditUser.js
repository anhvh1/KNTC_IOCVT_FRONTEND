import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
  REQUIRED,
  ITEM_LAYOUT,
} from '../../../../settings/constants';
import {Form} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  TreeSelect,
} from '../../../../components/uielements/exportComponent';
import DatePicker from '../../../../components/uielements/datePickerFormat';
import {Checkbox} from 'antd';
import moment from 'moment';
import {useSelector} from 'react-redux';
import apiPhanQuyen from '../../HeThong/QLPhanQuyen/config';
import {
  formatDate,
  formatValueSendRequest,
  removeAscent2,
} from '../../../../helpers/utility';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    loading,
    visible,
    action,
    DanhSachCoQuan = [],
    DanhSachChucVu = [],
  } = props;
  const [fromTime, setFromTime] = useState('');
  const [changeCanBo, setChangeCanBo] = useState(false);
  const [DanhSachNhomNguoiDung, setDanhSachNhomNguoiDung] = useState([]);

  const [TenNguoiDung, setTenNguoiDung] = useState('');

  const handleInputChange = (value) => {
    let newValue = removeAscent2(value);
    newValue = newValue.trim().replace(/\s+/g, '');
    setTenNguoiDung(newValue);
  };

  useEffect(() => {
    if (dataEdit && dataEdit.CanBoID) {
      const newNgaySinh = moment(dataEdit.NgaySinh).format('DD/MM/YYYY');
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgaySinh:
            dataEdit && dataEdit.NgaySinh
              ? moment(newNgaySinh, 'DD/MM/YYYY')
              : '',
          XemTaiLieuMat:
            dataEdit?.XemTaiLieuMat && dataEdit?.XemTaiLieuMat === 1 ? true : 0,
          QuanTriDonVi:
            dataEdit?.QuanTriDonVi && dataEdit?.QuanTriDonVi === 1 ? true : 0,
          QuyenKy: dataEdit?.QuyenKy && dataEdit?.QuyenKy === 1 ? true : 0,
          ChuTichUBND: dataEdit?.ChuTichUBND === 1 ? true : false,
        });
    }
    apiPhanQuyen.danhSachNhomAll().then((res) => {
      if (res.data.Status > 0) {
        setDanhSachNhomNguoiDung(res.data.Data);
      }
    });
  }, []);

  const handleChangeNgaySinh = (value, strValue) => {
    setFromTime(value);
  };
  const onOk = async (e) => {
    e.preventDefault();
    await form.validateFields().then((value) => {
      value.LaCanBo = changeCanBo;
      value.XemTaiLieuMat = value?.XemTaiLieuMat ? 1 : 0;
      value.QuanTriDonVi = value?.QuanTriDonVi ? 1 : 0;
      value.QuyenKy = value?.QuyenKy ? 1 : 0;
      value.NgaySinh = formatDate(value.NgaySinh);
      const newValue = {...value};
      newValue.ChuTichUBND =
        value.ChuTichUBND === true ? 1 : value.ChuTichUBND === false ? 0 : 0;
      newValue.TenNguoiDung = TenNguoiDung;
      formatValueSendRequest(newValue);
      // for (const key in newValue) {
      //   if (!newValue[key]) {
      //     delete newValue[key];
      //   }
      // }
      props.onCreate(newValue);
    });
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin người dùng`}
      width={700}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formmonhoc"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formmonhoc'} initialValues={{TrangThaiID: 0}}>
        {action === 'edit' ? <Item name={'CanBoID'} hidden /> : ''}
        {action === 'edit' ? <Item name={'NguoiDungID'} hidden /> : ''}
        <Item
          label="Tên người dùng"
          name="TenNguoiDung"
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input
            value={TenNguoiDung}
            onChange={(e) => {
              handleInputChange(e.target.value);
              let newValue = removeAscent2(e.target.value);
              newValue = newValue.trim().replace(/\s{2,}/g, ' ');
              form && form.setFieldsValue({SSOID: newValue});
            }}
          />
        </Item>
        <Item label="SSOID" name="SSOID" {...ITEM_LAYOUT_SMALL}>
          <Input />
        </Item>
        <Item
          label="Tên cán bộ"
          name={'TenCanBo'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input />
        </Item>
        <Item
          label="Ngày sinh"
          name={'NgaySinh'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <DatePicker
            onChange={handleChangeNgaySinh}
            format={'DD/MM/YYYY'}
            placeholder={''}
            style={{width: '100%'}}
          />
        </Item>
        <Item
          label="Giới tính"
          name={'GioiTinh'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select placeholder={'Chọn giới tính'} style={{width: '100%'}}>
            <Option key={1} value={1}>
              Nam
            </Option>
            <Option key={0} value={0}>
              Nữ
            </Option>
            <Option key={2} value={2}>
              Khác
            </Option>
          </Select>
        </Item>
        <Item
          label="Địa chỉ"
          name={'DiaChi'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input />
        </Item>
        <Item
          label="Tên cơ quan"
          name={'CoQuanID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            // onChange={value => this.onSearch(value, "CoQuanID")}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
            // defaultValue={filterData.CoQuanID}
          />
        </Item>
        <Item
          label="Nhóm người dùng"
          name={'DanhSachNhomNguoiDungID'}
          // rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}} mode="multiple">
            {DanhSachNhomNguoiDung?.map((item) => (
              <Option key={item.NhomNguoiDungID} value={item.NhomNguoiDungID}>
                {item.TenNhom}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Chức vụ"
          name={'ChucVuID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}}>
            {DanhSachChucVu?.map((item) => (
              <Option key={item.ChucVuID} value={item.ChucVuID}>
                {item.TenChucVu}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Email"
          name={'Email'}
          rules={[
            // {...REQUIRED},
            {
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng ',
            },
          ]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Input type={'email'} />
        </Item>
        <Item label="Điện thoại" name={'DienThoai'} {...ITEM_LAYOUT_SMALL}>
          <Input />
        </Item>

        <Item
          label="Quyền ký"
          name="QuyenKy"
          valuePropName="checked"
          {...ITEM_LAYOUT_SMALL}
        >
          <Checkbox />
        </Item>
        <Item
          label="Vai trò"
          name={'RoleID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}} placeholder={'Chọn vai trò'}>
            <Option key={1} value={1}>
              Lãnh đạo đơn vị
            </Option>
            <Option key={2} value={2}>
              Trưởng phòng
            </Option>
            <Option key={3} value={3}>
              Chuyên viên
            </Option>
          </Select>
        </Item>
        <Item
          label="Quản trị đơn vị"
          name="QuanTriDonVi"
          valuePropName="checked"
          {...ITEM_LAYOUT_SMALL}
        >
          <Checkbox />
        </Item>
        <Item
          label="Chủ tịch UBND"
          name="ChuTichUBND"
          valuePropName="checked"
          {...ITEM_LAYOUT_SMALL}
        >
          <Checkbox />
        </Item>
        <Item
          label="Xem tài liệu mật"
          name="XemTaiLieuMat"
          valuePropName="checked"
          {...ITEM_LAYOUT_SMALL}
        >
          <Checkbox />
        </Item>
        <Item
          label="Trạng thái"
          name={'TrangThaiID'}
          rules={[{...REQUIRED}]}
          {...ITEM_LAYOUT_SMALL}
        >
          <Select style={{width: '100%'}} placeholder={'Chọn trạng thái'}>
            <Option key={1} value={1}>
              Nghỉ hưu
            </Option>
            <Option key={0} value={0}>
              Đang làm
            </Option>
            <Option key={2} value={2}>
              Chuyển công tác
            </Option>
            <Option key={3} value={3}>
              Nghỉ việc
            </Option>
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
