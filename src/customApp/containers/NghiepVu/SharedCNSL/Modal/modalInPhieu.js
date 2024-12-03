import React, {Component, useEffect, useRef, useState} from 'react';
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
import Button from '../../../../../components/uielements/button';
import Select, {Option} from '../../../../../components/uielements/select';
import styled from 'styled-components';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
  ITEM_LAYOUT_NEW,
} from '../../../../../settings/constants';
import {Modal} from '../../../../../components/uielements/exportComponent';
import dayjs from 'dayjs';
import {getValueConfigLocalByKey} from '../../../../../helpers/utility';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import api from '../config';
const {Item} = Form;
const ModalInPhieu = (props) => {
  const [MaPhieuIn, setMaPhieuIn] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [linkPreview, setLinkPreview] = useState(false);
  const {
    dataEdit,
    XuLyDonID,
    TiepDanKhongDonID,
    DonThuID,
    title,
    visible,
    onCreate,
    fileKey,
    onCancel,
    DanhSachBieuMau,
  } = props;

  useEffect(() => {
    if (props.LoaiMaIn) {
      getPreview(props.LoaiMaIn);
    }
  }, []);

  const getPreview = (MaPhieuIn) => {
    api
      .GetPrevewPDF({MaPhieuIn, XuLyDonID, DonThuID, TiepDanKhongDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setLinkPreview(res.data.Data);
          setIsPreview(true);
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

  const DowLoadFile = () => {
    api
      .getChiTietBieuMau({MaPhieuIn, XuLyDonID, DonThuID, TiepDanKhongDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          const a = document.createElement('a');
          a.href = res.data.Data;
          a.target = '_blank';
          a.click();
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

  return (
    <Modal
      className="center-modal__footer"
      title={'In phiếu'}
      visible={visible}
      footer={
        <>
          {MaPhieuIn ? (
            <>
              {!isPreview ? (
                <Button type="primary" onClick={() => getPreview(MaPhieuIn)}>
                  Xem trước
                </Button>
              ) : null}
              {!isPreview ? (
                <Button type="primary" onClick={() => DowLoadFile()}>
                  Tải file
                </Button>
              ) : (
                <Button type="primary" onClick={() => setIsPreview(false)}>
                  Quay lại
                </Button>
              )}
            </>
          ) : null}
          <Button className="btn-danger" onClick={() => onCancel()}>
            Đóng
          </Button>
        </>
      }
      width={1200}
      IsFullHeight={true}
      onCancel={() => onCancel()}
    >
      <Wrapper>
        {!isPreview ? (
          <Radio.Group
            className="radio-wrapper"
            onChange={(e) => setMaPhieuIn(e.target.value)}
            value={MaPhieuIn}
          >
            {DanhSachBieuMau
              ? DanhSachBieuMau.map((item, index) => (
                  <Radio className="radio-items" value={item.MaPhieuIn}>
                    {`${index + 1}. ${item.TenBieuMau}`}
                  </Radio>
                ))
              : null}
          </Radio.Group>
        ) : (
          <>
            <iframe style={{height: 800}} src={linkPreview}></iframe>
          </>
        )}
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  .radio-wrapper {
    display: flex;
    flex-direction: column;
  }
  iframe {
    width: 100%;
  }
`;

export default ModalInPhieu;
