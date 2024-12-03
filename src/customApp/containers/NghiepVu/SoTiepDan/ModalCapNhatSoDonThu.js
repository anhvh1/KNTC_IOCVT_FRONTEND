import React, {Component, useEffect, useRef, useState} from 'react';
import {DatePicker, Form, message, Modal as ModalAnt, Spin} from 'antd';
import Button from '../../../../components/uielements/button';
import styled from 'styled-components';
import {REQUIRED} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import api from './config';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
import Wrapper from './ModalCapNhatSoDonThu.styled';
import {formatDateTime} from '../../../../helpers/utility';
import dayjs from 'dayjs';
const {Item, useForm} = Form;
const ModalCapNhatSoDonThu = (props) => {
  const [form] = useForm();
  const {visible, onCancel, onRefresh} = props;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    setLoading(false);
    setMessage('');
  }, []);

  const UpdateSoDonThu = () => {
    form.validateFields().then((value) => {
      const {NamTiepNhan} = value;
      const dateYear = dayjs(NamTiepNhan).format('YYYY');
      setLoading(true);
      api
        .UpdateSoDonThuTheoNam(Number(dateYear))
        .then((res) => {
          setLoading(false);
          if (res.data.Status > 0) {
            setMessage(`Đã thực hiện đánh số đơn thư của năm ${dateYear}!`);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          setLoading(false);
          message.destroy();
          message.warning(err.toString());
        });
    });
  };
  return (
    <Modal
      className="center-modal__footer"
      title={'Cập nhật số đơn thư'}
      open={visible}
      footer={
        <>
          <Button className="btn-danger" onClick={() => onCancel()}>
            Đóng
          </Button>
        </>
      }
      onCancel={() => onCancel()}
    >
      <Wrapper>
        <Form form={form}>
          <div className="guide">
            <p className="guide-text">
              Chú ý: Toàn bộ số đơn thư của cả năm sẽ được đánh số tự động theo
              định dạng "Số/Năm"
            </p>
          </div>
          <div className="break-line"></div>
          <div className="wrap-picker">
            <div className="wrap-item">
              <Item label="Chọn năm" name={'NamTiepNhan'} rules={[REQUIRED]}>
                <DatePicker
                  picker="year"
                  format="YYYY"
                  onChange={() => setMessage('')}
                  placeholder=""
                />
              </Item>
              <Button type="primary" onClick={UpdateSoDonThu}>
                Thực hiện
              </Button>
              {loading ? <Spin /> : null}
            </div>
            <p className="message">{message}</p>
          </div>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default ModalCapNhatSoDonThu;
