import React, { useState } from "react";
import { Form, Upload, message } from "antd";

import {
  UploadOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import {
  Modal,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import {
  formatNoiDung,
  getValueConfigLocalByKey,
} from "../../../../helpers/utility";
import styled from "styled-components";
import { DONVIHANHCHINH, DOANHNGHIEP } from "../../../../settings/constants";
import BoxTable from "../../../../components/utility/boxTable";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
const Wrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .list-total {
      display: flex;
      align-items: center;
      column-gap: 40px;
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 15px;
      padding: 10px 20px;
      .total-item {
        column-gap: 20px;
        row-gap: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .name {
          font-weight: 500;
        }
        .count {
          background: rgba(75, 153, 228, 1);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: #fff;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .total-item:nth-child(2) {
        .count {
          background: rgba(56, 161, 30, 1);
        }
      }
      .total-item:nth-child(3) {
        .count {
          background: rgba(212, 32, 32, 1);
        }
      }
    }
  }
`;

const ModalImportPlan = ({ visible, onCancel, ListHinhThuc = [] }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "left",
      render: (text, record, index) => {
        if (record.isParent) {
          return {
            children: (
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "15px",
                }}
              >
                {record.idx}. {record.TenPhanLoaiThanhTra}
              </p>
            ),
            props: {
              colSpan: columns.length,
              style: { backgroundColor: "#f0f0f0" },
            },
          };
        }
        return (
          <p style={{ textAlign: "center" }}>
            {(PageNumber - 1) * PageSize + (record.index + 1)}
          </p>
        );
      },
    },
    {
      title: "Đối tượng",
      dataIndex: "CoQuanBiThanhTra",
      key: "CoQuanBiThanhTra",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return formatNoiDung(text);
      },
    },
    {
      title: "Thời hạn thanh tra",
      dataIndex: "ThoiHanThanhTra",
      key: "ThoiHanThanhTra",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Thời gian thanh tra",
      dataIndex: "ThoiGianTienHanh",
      key: "ThoiGianTienHanh",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },

    {
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
  ];

  const dataGroup =
    ListHinhThuc &&
    [...ListHinhThuc]
      .map((item, index) => {
        return {
          TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
          idx: convertToRoman(index + 1),
          ListChild: ListInspection
            ? ListInspection?.filter(
                (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
              ).map((item3, index2) => {
                return {
                  ...item3,
                  index: index2,
                };
              })
            : [],
        };
      })
      ?.filter((item) => item?.ListChild?.length > 0);

  const restructuredData = dataGroup.flatMap((group, index) => [
    { ...group, isParent: true, key: `parent-${index}` },
    ...group.ListChild.map((child, childIndex) => ({
      ...child,
      isParent: false,

      key: `child-${index}-${childIndex}`,
    })),
  ]);

  return (
    <Modal
      visible={visible}
      title="Import kế hoạch"
      onCancel={onCancel}
      width={900}
      footer={[
        <Button key="back" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Wrapper>
        <div className="top">
          <div className="list-total">
            <div className="total-item">
              <p className="name">Tổng số</p>
              <p className="count">100</p>
            </div>
            <div className="total-item">
              <p className="name">Số nhập thành công</p>
              <p className="count">100</p>
            </div>
            <div className="total-item">
              <p className="name">Số nhập thành công</p>
              <p className="count">100</p>
            </div>
          </div>
          <Button icon={<CloudDownloadIcon />} type="dowloadlist">
            Xuất danh sách lỗi
          </Button>
        </div>
        <BoxTable
          scroll={{ y: 500, x: 900 }}
          className="custom-expandable-table"
          columns={columns}
          dataSource={restructuredData}
          expandable={{
            // childrenColumnName : 'children',
            defaultExpandAllRows: true,
            expandIcon: ({ expanded, onExpand, record }) => false,
            expandIconColumnIndex: -1,
            expandedRowRender: (record) => {},
          }}
          pagination={false}
        />
      </Wrapper>
    </Modal>
  );
};

export default ModalImportPlan;
