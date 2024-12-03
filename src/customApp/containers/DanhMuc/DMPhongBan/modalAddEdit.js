import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, ITEM_LAYOUT_SMALL_2, REQUIRED, ITEM_LAYOUT_HALF } from '../../../../settings/constants';
import { Form, InputNumber, Radio } from 'antd';
import { Button, Modal, Input, Select, Option } from '../../../../components/uielements/exportComponent';
import Inputnumber from '../../../../components/uielements/InputNumber';
// import InputNumber from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';
import { InputCustom } from './styled';

const { Item, useForm } = Form;

export default (props) => {
    const [form] = useForm();
    const { dataEdit, loading, visible, action, IDmodal, CoQuanDonVi } = props;
    const [isFormSuccess, setIsFormSuccess] = useState(true);

    const [value1, setValue1] = useState();
    useEffect(() => {
        if (dataEdit) {
            form &&
                form.setFieldsValue({
                    ...dataEdit,
                    CoQuanDonVi: CoQuanDonVi,
                });
        }
    }, []);
    form.setFieldsValue({
        CoQuanID: IDmodal,
    });
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };
    const onOk = async (e) => {
        e.preventDefault();
        const value = await form.validateFields();
        props.onCreate(value);
    };

    const handleChangedFields = async (changedValues, allValues) => {
        const value = await form.getFieldsValue();
        const { SoDienThoai, TenPhongBan, GhiChu } = value;
        if (TenPhongBan && (TenPhongBan !== dataEdit.TenPhongBan || GhiChu !== dataEdit.GhiChu || SoDienThoai !== dataEdit.SoDienThoai)) {
            setIsFormSuccess(false);
        } else {
            setIsFormSuccess(true);
        }
    };

    return (
        <Modal
            title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin phòng ban`}
            width={450}
            visible={visible}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    Hủy
                </Button>,
                <Button
                    disabled={isFormSuccess}
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
            <Form form={form} name={'formphongban'} onChange={handleChangedFields}>
                {action === 'edit' ? <Item name={'PhongBanID'} hidden /> : ''}
                {action === 'edit' ? (
                    <Item name={'CoQuanID'} hidden />
                ) : (
                    <Item label="Cơ Quan ID" name={'CoQuanID'} {...ITEM_LAYOUT} hidden>
                        <Input />
                    </Item>
                )}
                <Item label="Cơ quan đơn vị" name={'CoQuanDonVi'} {...ITEM_LAYOUT} required={[REQUIRED]}>
                    <Input disabled />
                </Item>
                <Item label="Tên phòng ban" name={'TenPhongBan'} {...ITEM_LAYOUT} required={[REQUIRED]}>
                    <Input />
                </Item>
                <Item
                    label="Điện thoại"
                    name={'SoDienThoai'}
                    {...ITEM_LAYOUT}
                    rules={[{ max: 11, message: 'Số điện thoại không hợp lệ.', pattern: new RegExp(/^[0-9]+$/) }]}
                >
                    <Input maxLength={11} />
                </Item>
                <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT}>
                    <TextArea />
                </Item>
            </Form>
        </Modal>
    );
};
