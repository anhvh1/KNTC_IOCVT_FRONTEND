import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, Table} from 'antd';
import {
  Button,
  Modal,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {HistoryOutlined} from '@ant-design/icons';
import moment from 'moment';
import api from './config';
import styled from 'styled-components';
const {Item, useForm} = Form;
const ModalViewHistory = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setpagination] = useState({
    pageSize: 6,
    pageNumber: 1,
  });
  const StyledLable = styled.p``;
  const showModal = () => {
    // const [ctBieuMau, setCTBieuMau] = useState([]);

    setIsModalOpen(true);
    api
      .LichSuChiTiet({BieuMauID: props.data.BieuMauID})
      .then((res) => setDanhLichSu(res.data.Data));
    // api
    //   .ChiTietBieuMau({ BieuMauID: props.data.BieuMauID })
    //   .then((res) => setCTBieuMau(res.data.Data));
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: '5%',
      render: (text, record, index) => {
        return (
          <span>
            {(pagination.pageNumber - 1) * pagination.pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'ThoiGianCapNhat',
      align: 'right',
      render: (_, record) => {
        return (
          <div>
            <p>{moment(record.ThoiGianCapNhat).format('DD/MM/YYYY h:mm')}</p>
          </div>
        );
      },
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'TenCanBo',
      align: 'left',
    },
  ];
  const [danhlichsu, setDanhLichSu] = useState([]);
  //  {danhsachcap.map((item, index) => (
  //   <Option key={index} value={item.CapID}>{item.TenCap}</Option>
  // ))}
  return (
    <>
      <HistoryOutlined onClick={showModal} />
      <Modal
        title="Lịch sử cập nhập"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={550}
        footer={[<Button onClick={handleCancel}>Đóng</Button>]}
      >
        <StyledLable>
          Lịch sử cập nhập biểu mẫu:{' '}
          <strong>
            {' '}
            {props.data.MaPhieuIn} -{props.data.TenBieuMau}
          </strong>
        </StyledLable>
        <StyledLable>
          Cấp sử dụng biểu mẫu:{' '}
          <strong>{props.data.CapID === 4 ? 'Tỉnh/Huyện' : 'Xã'}</strong>
        </StyledLable>
        <Item>
          <Table
            columns={columns}
            dataSource={danhlichsu}
            pagination={{
              pageSize: pagination.pageSize,
              onChange: (current) => {
                setpagination((pre) => ({
                  ...pre,
                  pageNumber: current,
                }));
              },
            }}
          />
        </Item>
      </Modal>
    </>
  );
};

export default ModalViewHistory;
