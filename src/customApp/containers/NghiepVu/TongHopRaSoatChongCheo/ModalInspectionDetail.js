import React from "react";
import { Row, Col, Typography } from "antd";
import styled from "styled-components";
import {
  Modal,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
const { Text } = Typography;
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import dayjs from "dayjs";
const StyledModal = styled(Modal)`
  .top-detail {
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(229, 229, 229, 1);
    align-items: center;
    padding: 20px;
    .name {
      font-weight: 600;
      span {
        font-weight: 400;
      }
    }
  }
  .body-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid rgba(229, 229, 229, 1);
    .wrapper-time {
      display: flex;
      gap: 100px;
      /* justify-content: space-between; */
    }
    .body-detail-item {
      display: grid;
      grid-template-columns: 150px 1fr;
      .name {
        flex-basis: 150px;
        font-weight: 600;
      }
    }
  }
`;

const ModalInspectionDetail = ({
  visible,
  onCancel,
  dataEdit,
  ListAgency,
  ListHinhThuc,
  ListFields,
}) => {
  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={1000}
      title="Chi tiết kế hoạch thanh tra"
      footer={[
        <Button key="back" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <div className="top-detail">
        <div className="top-detail-item">
          <p className="name">
            Kế hoạch năm:{" "}
            <span>{dataEdit.NamThanhTra ? dataEdit.NamThanhTra : ""}</span>
          </p>
        </div>
        <div className="top-detail-item">
          <p className="name">
            Hình thức:{" "}
            <span>
              {
                ListHinhThuc.find(
                  (item) =>
                    item.PhanLoaiThanhTraID === dataEdit.PhanLoaiThanhTraID1
                )?.TenPhanLoaiThanhTra
              }
            </span>
          </p>
        </div>
        <div className="top-detail-item">
          <p className="name">Lĩnh vực chính: </p>
        </div>
      </div>
      <div className="body-detail">
        <div className="body-detail-item">
          <div className="name">
            <p>Đối tượng thanh tra</p>
          </div>
          <div className="content">
            {dataEdit.DoiTuongTTIds &&
              dataEdit.DoiTuongTTIds.map((item) => {
                const DoiTuong = ListAgency.find(
                  (agency) => agency.CoQuanID === item
                );
                return <p>{DoiTuong.TenCoQuan}</p>;
              })}
          </div>
        </div>
        <div className="body-detail-item">
          <div className="name">
            <p>Nội dung thanh tra</p>
          </div>
          <div className="content">
            <p>{dataEdit?.NoiDung}</p>
          </div>
        </div>
        <div className="wrapper-time">
          <div className="body-detail-item">
            <div className="name">
              <p>Thời hạn thanh tra</p>
            </div>
            <div className="content">
              <p>{dataEdit?.ThoiHanThanhTra}</p>
            </div>
          </div>
          <div className="body-detail-item">
            <div className="name">
              <p>Thời gian thanh tra</p>
            </div>
            <div className="content">
              <p>{dataEdit?.ThoiGianTienHanh}</p>
            </div>
          </div>
        </div>
        <div className="body-detail-item">
          <div className="name">
            <p>Trạng thái</p>
          </div>
          <div className="content">
            <p>{dataEdit?.StateName}</p>
          </div>
        </div>
        <div className="body-detail-item">
          <div className="name">
            <p>Đơn vị phối hợp</p>
          </div>
          <div className="content">
            <p>{dataEdit?.DonViPhoiHop}</p>
          </div>
        </div>
        <div className="body-detail-item">
          <div className="name">
            <p>Ghi chú</p>
          </div>
          <div className="content">
            <p>{dataEdit?.GhiChu}</p>
          </div>
        </div>
      </div>
    </StyledModal>
  );
};

export default ModalInspectionDetail;
