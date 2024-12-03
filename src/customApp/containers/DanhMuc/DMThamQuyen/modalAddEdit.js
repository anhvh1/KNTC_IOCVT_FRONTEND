import React, { useEffect, useRef, useState } from 'react';
import { ITEM_LAYOUT_SMALL_2, ITEM_LAYOUT, REQUIRED, ITEM_LAYOUT2 } from '../../../../settings/constants';
import { Radio } from 'antd';
import { Form } from 'antd';
import { Button, Modal, Select, Option, Textarea, InputFormatSpecific, Input } from '../../../../components/uielements/exportComponent';

const { Item, useForm } = Form;

export default (props) => {
    const [form] = useForm();
    const [isFormSuccess, setIsFormSuccess] = useState(true);
    const { dataEdit, loading, visible, action } = props;
    const [value1, setValue1] = useState();

    useEffect(() => {
        if (dataEdit && dataEdit.ThamQuyenID) {
            form &&
                form.setFieldsValue({
                    ...dataEdit,
                });
        }
    }, []);

    const onOk = async (e) => {
        e.preventDefault();
        const value = await form.validateFields();
        if (action === 'edit') {
            props.onCreate({
                ...value,
                TrangThai: value1 || value.TrangThai,
            });
        }
        if (action === 'add') {
            props.onCreate({
                ...value,
                TrangThai: value1 === undefined ? true : value1,
            });
        }
    };
    const handleChangedFields = async (changedValues, allValues) => {
        const value = await form.getFieldsValue();
        const { MaThamQuyen, TenThamQuyen, GhiChu, TrangThai } = value;
        if (
            MaThamQuyen &&
            TenThamQuyen &&
            (MaThamQuyen !== dataEdit.MaThamQuyen ||
                TenThamQuyen !== dataEdit.TenThamQuyen ||
                GhiChu !== dataEdit.GhiChu ||
                TrangThai !== dataEdit.TrangThai)
        ) {
            setIsFormSuccess(false);
        } else {
            setIsFormSuccess(true);
        }
    };

    const onChange = (e) => {
        setValue1(e.target.value);
    };

    return (
        <Modal
            title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin thẩm quyền`}
            width={450}
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
                    form="formthamquyen"
                    loading={loading}
                    onClick={onOk}
                    disabled={isFormSuccess}
                >
                    Lưu
                </Button>,
            ]}
        >
            <Form form={form} name={'formthamquyen'} onChange={handleChangedFields}>
                {action === 'edit' ? <Item name={'ThamQuyenID'} hidden /> : ''}

                <Item label="Mã thẩm quyền" name={'MaThamQuyen'} {...ITEM_LAYOUT} rules={[REQUIRED]}>
                    <InputFormatSpecific />
                </Item>
                <Item label="Tên thẩm quyền" name={'TenThamQuyen'} {...ITEM_LAYOUT} rules={[REQUIRED]}>
                    <Input />
                </Item>
                <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT}>
                    <Textarea />
                </Item>
                <Item label="Trạng thái" name={'TrangThai'} {...ITEM_LAYOUT}>
                    <Radio.Group onChange={onChange} value={value1} defaultValue={true}>
                        <Radio value={true}>Có</Radio>
                        <Radio value={false}>Không</Radio>
                    </Radio.Group>
                </Item>
            </Form>
        </Modal>
    );
};
