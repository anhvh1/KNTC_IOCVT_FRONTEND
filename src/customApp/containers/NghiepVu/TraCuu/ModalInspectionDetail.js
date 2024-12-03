import React, { useEffect } from "react";
import { Row, Col, Typography, message } from "antd";
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
import api from "./config";
import { useState } from "react";
import { DONVIHANHCHINH } from "../../../../settings/constants";
const StyledModal = styled(Modal)`
  .top-detail,
  .top-detail_body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    flex-wrap: wrap;
    border: 1px solid rgba(229, 229, 229, 1);
    align-items: center;
    padding: 20px;
    row-gap: 10px;
    column-gap: 50px;
    .name {
      font-weight: 600;
      span {
        font-weight: 400;
      }
    }
  }
  .top-detail_body {
    padding: 0;
    border: none;

    .top-detail-item {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      .name {
        flex-basis: 145px;
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
  ListHinhThuc,
  ListFields,
  DoiTuongTT,
  defaultNamThanhTra,
}) => {
  const defaultPageNumber = 1;
  const [ListAgency, setListAgency] = useState([]);

  const getListAgency = (Keyword, isSearch, initLoading = false) => {
    api
      .GetListAgency({
        PhanLoai: DoiTuongTT ? Number(DoiTuongTT) : DONVIHANHCHINH,
        PageNumber: defaultPageNumber,
        Keyword,
        NamThanhTra: dataEdit.NamThanhTra
          ? dataEdit.NamThanhTra
          : defaultNamThanhTra,
        PageSize: 99999,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setListAgency(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
  };

  const handleMapAgency = (DoiTuongIDS) => {
    try {
      if (DoiTuongTT === DONVIHANHCHINH && DoiTuongIDS) {
        const DoiTuongRender = [];
        const loopAgency = (DoiTuongIDS, Data) => {
          if (Data) {
            Data.forEach((item) => {
              if (DoiTuongIDS.includes(item.CoQuanID)) {
                DoiTuongRender.push(item);
              }
              if (item.Children) {
                loopAgency(DoiTuongIDS, item.Children);
              }
            });
          }
        };
        loopAgency(DoiTuongIDS, ListAgency);
        return (
          DoiTuongRender &&
          DoiTuongRender.map((item) => {
            return (
              <div>
                <span style={{ fontWeight: "bold" }}>
                  {item?.MaSoThue ? `${item?.MaSoThue} - ` : ""}
                </span>
                <span>{item?.TenCoQuan}</span>
              </div>
            );
          })
        );
      } else {
        return (
          DoiTuongIDS &&
          DoiTuongIDS.map((item) => {
            const DoiTuong = ListAgency.find(
              (agency) => agency.CoQuanID === item
            );
            return (
              <div>
                <span style={{ fontWeight: "bold" }}>
                  {DoiTuong?.MaSoThue ? `${DoiTuong?.MaSoThue} - ` : ""}
                </span>
                <span>{DoiTuong?.TenCoQuan}</span>
              </div>
            );
          })
        );
      }
    } catch (err) {
      // Corrected syntax
      console.error(err); // Optional: log the error for debugging
    }
  };

  useEffect(() => {
    getListAgency();
  }, []);

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
          <p className="name">
            Lĩnh vực chính:{" "}
            <span>
              {
                ListFields.find(
                  (item) =>
                    item.PhanLoaiThanhTraID === dataEdit.PhanLoaiThanhTraID2
                )?.TenPhanLoaiThanhTra
              }
            </span>
          </p>
        </div>
      </div>
      <div className="body-detail">
        <div className="body-detail-item">
          <div className="name">
            <p>Đối tượng thanh tra</p>
          </div>
          <div className="content">
            {handleMapAgency(dataEdit.DoiTuongTTIds)}
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
        {/* <div className="wrapper-time">
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
          <div className="body-detail-item">
            <div className="name">
              <p>Thời gian thanh tra</p>
            </div>
            <div className="content">
              <p>{dataEdit?.ThoiGianTienHanh}</p>
            </div>
          </div>
        </div> */}
        <div className="top-detail_body">
          <div className="top-detail-item">
            <div className="name">
              <p>Thời hạn thanh tra</p>
            </div>
            <div className="content">
              <p>{dataEdit?.ThoiHanThanhTra}</p>
            </div>
          </div>
          <div className="top-detail-item">
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
