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
import { convertToRoman } from "../../../../helpers/utility";
import { CloseSquareFilled } from "@ant-design/icons";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import { saveAs } from "file-saver";
const Wrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
    flex-wrap: wrap;
    .list-total {
      display: flex;
      align-items: center;
      column-gap: 40px;
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 15px;
      padding: 8px 40px;
      flex-wrap: wrap;
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

const ModalImportPlan = ({ visible, onCancel, data, ListHinhThuc }) => {
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
              colSpan: 6,
              style: { backgroundColor: "#f0f0f0" },
            },
          };
        }
        return <p style={{ textAlign: "center" }}>{record.index + 1}</p>;
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

        return (
          <div>
            {record.DanhSachDoiTuong.map((item) => (
              <p>
                <span>{item.MaSoThue ? `${item.MaSoThue} - ` : ""}</span>{" "}
                <span>{item.TenCoQuan}</span>
              </p>
            ))}
          </div>
        );
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

  const downloadFileBase64 = (base64Data, fileName) => {
    // Prepend the necessary data type for Excel files
    const link = document.createElement("a");
    link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const listData = data?.CuocThanhTraReponses ? data?.CuocThanhTraReponses : [];

  const dataGroup =
    ListHinhThuc &&
    [...ListHinhThuc]
      .map((item, index) => {
        return {
          TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
          // idx: convertToRoman(index + 1),
          listChild: listData
            ? listData
                ?.filter(
                  (item2) =>
                    item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
                )
                .map((item3, index2) => {
                  return {
                    ...item3,
                    index: index2,
                  };
                })
            : [],
        };
      })
      ?.filter((item) => item?.listChild?.length > 0)
      .map((item, index) => {
        return {
          ...item,
          idx: convertToRoman(index + 1),
        };
      });

  const restructuredData = dataGroup.flatMap((group, index) => [
    { ...group, isParent: true, key: `parent-${index}` },
    ...group.listChild.map((child, childIndex) => ({
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
      width={1200}
      footer={[
        <Button
          key="back"
          type="danger"
          icon={<CloseSquareFilled />}
          onClick={onCancel}
        >
          Đóng
        </Button>,
      ]}
    >
      <Wrapper>
        <div className="top">
          <div className="list-total">
            <div className="total-item">
              <p className="name">Tổng số</p>
              <p className="count">{data.TongSo}</p>
            </div>
            <div className="total-item">
              <p className="name">Số nhập thành công</p>
              <p className="count">{data.TongSoDung}</p>
            </div>
            <div className="total-item">
              <p className="name">Số nhập thất bại</p>
              <p className="count">{data.TongSoSai}</p>
            </div>
          </div>
          <Button
            icon={<CloudDownloadIcon />}
            onClick={() =>
              downloadFileBase64(data?.FileContentBase64, data.FileName)
            }
            type="dowloadlist"
          >
            Xuất danh sách lỗi
          </Button>
        </div>
        <BoxTable
          scroll={{ y: 500, x: 50 }}
          className="custom-expandable-table"
          columns={columns}
          dataSource={restructuredData}
          expandable={{
            // childrenColumnName: "children1,
            defaultExpandAllRows: true,
            expandIcon: ({ expanded, onExpand, record }) => false,
            expandIconColumnIndex: -1,
          }}
          pagination={false}
        />
      </Wrapper>
    </Modal>
  );
};

export default ModalImportPlan;
