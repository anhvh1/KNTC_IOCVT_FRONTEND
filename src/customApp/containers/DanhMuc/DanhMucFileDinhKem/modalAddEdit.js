// import React, {useEffect} from 'react';
// import {ITEM_LAYOUT_HALF, REQUIRED} from '../../../../settings/constants';
// import {Form, Radio} from 'antd';
// import {Button, Modal, Input, InputFormatSpecific, Select, Option} from '../../../../components/uielements/exportComponent';
// import {checkInputNumber} from "../../../../helpers/utility";

// const {Item, useForm} = Form;

// export default props => {
//   const [form] = useForm();
//   const {dataEdit, loading, visible,action} = props;


//   useEffect(() => {
//     if (dataEdit && dataEdit.NguonDonDenID) {
//       form && form.setFieldsValue({
//         ...dataEdit,
//         TrangThai: dataEdit.TrangThai ? 1 : 0
//       })
//     }
//   }, []);

//   const onOk = async (e) => {
//     e.preventDefault();
//     const value = await form.validateFields();
//     props.onCreate({
//       ...value,
//       TrangThai: Boolean(value.TrangThai)
//     });
//   };

//   return (
//     <Modal
//       title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin nguồn đơn đến`}
//       width={450}
//       open={visible}
//       onCancel={props.onCancel}
//       footer={[
//         <Button key="back" onClick={props.onCancel}>Hủy</Button>,
//         <Button key="submit" htmlType="submit" type="primary" form="formnguondonden"
//                 loading={loading} onClick={onOk}>Lưu</Button>,
//       ]}
//     >
//       <Form form={form} name={"formnguondonden"} initialValues={{
//         TrangThai: 1
//       }}>
//         {action === 'edit' ? <Item name={'NguonDonDenID'} hidden/> : ''}

//         <Item label="Mã nguồn đơn đến" name={'MaNguonDonDen'} {...ITEM_LAYOUT_HALF} rules={[
//           REQUIRED
//         ]}>
//           <InputFormatSpecific />
//         </Item>
//         <Item label="Tên nguồn đơn đến" name={'TenNguonDonDen'} {...ITEM_LAYOUT_HALF} rules={[
//           REQUIRED
//         ]}>
//           <Input/>
//         </Item>
//         <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT_HALF}>
//           <Input/>
//         </Item>
//         <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT_HALF}>
//         <Radio.Group>
//           <Radio value={1}>Có</Radio>
//           <Radio value={0}>Không</Radio>
//         </Radio.Group>
//         </Item>
//       </Form>
//     </Modal>
//   );
// }