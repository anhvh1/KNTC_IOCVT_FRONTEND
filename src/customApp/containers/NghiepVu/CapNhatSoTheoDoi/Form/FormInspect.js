import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useKey } from "../../../../CustomHook/useKey";
import { Table, Select, Input, Button, Space, Tooltip, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import BoxTable from "../../../../../components/utility/boxTable";
import api, { apiUrl } from "../config";
import dayjs from "dayjs";
import { styles } from "./style";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import EyeIcon from "../../../../../components/utility/EyeIcon";
import Pencil from "../../../../../components/utility/PenCilIcon2";
import DownLeftIcon from "../../../../../components/utility/DownLeftIcon";
import AddIcon from "../../../../../components/utility/AddIcon";
import ModalAdd from "./Modal/modalAddRKN";
import ModalEdit from "./Modal/modalEditRKN";
import ModalChiTiet from "./Modal/ModalChiTietRKN";
import ModalTienDat from "./Modal/modalTDKhac";
import { formDataCaller } from "../../../../../api/formDataCaller";

const FormInspect = ({ form, title, CuocThanhTraID }) => {
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [CapNhapLoaiSoLieuID, setCapNhapLoaiSoLieuID] = useState();
  const [visibleModalTienDat, setVisibleModalTienDat] = useState(false);
  const [dataModalEditTienDat, setDataModalEditTienDat] = useState({});

  useEffect(() => {
    fetchData();
  }, [CuocThanhTraID]);

  const fetchData = () => {
    api
      .GetListPagingSoLieuByLoaiSoLieu(CuocThanhTraID, 3) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setData(res.data.Data); // Set fetched data
        } else {
          message.destroy();
          message.error(res.data.Message); // Error message if the API response fails
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString()); // Catch any API errors
      });
  };

  const renderTable = () => {
    return (
      <table style={styles.customTable}>
        <thead>
          <tr>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Kết luận
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Lĩnh vực chính
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              colSpan={2}
            >
              Số phải xử lý
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              colSpan={2}
            >
              Số đã xử lý
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Chức năng
            </th>
          </tr>
          <tr>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Tổ chức
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Cá nhân
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Tổ chức
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Cá nhân
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : {}}>
              <td style={styles.tableCell}>{item.SoVanBan}</td>
              <td style={styles.tableCell}>{item.TenLoaiThanhTra}</td>
              <td style={styles.tableCell}>{item.ToChucPhaiXuLy}</td>
              <td style={styles.tableCell}>{item.CaNhanPhaiXuLy}</td>
              <td style={styles.tableCell}>{item.ToChucDaXuLy}</td>
              <td style={styles.tableCell}>{item.CaNhanDaXuLy}</td>
              <td
                style={{
                  ...styles.tableCell,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                <Space size="middle">
                  {/* <Tooltip title="Xem chi tiết">
                    <EyeIcon onClick={() => showModalChiTiet(item.CapNhapLoaiSoLieuID)} />
                  </Tooltip>
                  <Tooltip title="Cập nhật">
                    <Pencil onClick={() => {
                      showModalEditSoLieu(item.CapNhapLoaiSoLieuID);
                      setCapNhapLoaiSoLieuID(item.CapNhapLoaiSoLieuID);
                    }} />
                  </Tooltip> */}
                  <Tooltip title="Cập nhật xử lý">
                    <DownLeftIcon
                      onClick={() => {
                        setCapNhapLoaiSoLieuID(item.CapNhapLoaiSoLieuID);
                        showModalEdit(item.CapNhapLoaiSoLieuID);
                      }}
                    />
                  </Tooltip>

                  {/* <Tooltip title="Xóa">
                    <DeleteIcon onClick={() => deleteModalAddEdit(item.CapNhapLoaiSoLieuID)} />
                  </Tooltip> */}
                </Space>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const showModalEditSoLieu = (capNhapLoaiSoLieuID) => {
    console.log("capNhapLoaiSoLieuID", capNhapLoaiSoLieuID);
    setAction("editSoLieu");
    api
      .GetSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalTienDat(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
    api
      .GetCapNhapSoLieuByID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalEditTienDat(res.data.Data.Data);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalChiTiet, setVisibleModalChiTiet] = useState(false);

  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [dataModalChiTiet, setDataModalChiTiet] = useState({});

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
    setVisibleModalEdit(false);
    setVisibleModalChiTiet(false);
    setVisibleModalTienDat(false);
  };

  const showModalEdit = (capNhapLoaiSoLieuID) => {
    setAction("edit");
    api
      .GetSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalEdit(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const showModalChiTiet = (capNhapLoaiSoLieuID) => {
    api
      .GetThongTinQuyetDinh(capNhapLoaiSoLieuID, 3)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalChiTiet(res.data.Data);
          inceaseModalKey();
          setVisibleModalChiTiet(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const showModalAdd = () => {
    setAction("addrkn");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const submitModalAddEdit = (data, soLieu) => {
    setConfirmLoading(true);

    if (action === "addrkn") {
      const formSave = new FormData();
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.InsertCapNhapLoaiSoLieu}?type=3`, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success("Thêm thành công");
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "edit") {
      const formSave = new FormData();
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.UpdateCapNhapLoaiSoLieu}?type=3`, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success("Sửa thành công");
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "editSoLieu") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.UpdateCapNhapLoaiSoLieu}?type=3`, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success("Sửa thành công");
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const deleteModalAddEdit = (CapNhapLoaiSoLieuID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa dữ liệu này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .DeleteCapNhapSoLieu({ ListID: [CapNhapLoaiSoLieuID] })
          .then((res) => {
            if (res.data.Status > 0) {
              fetchData();
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

  return (
    <div style={styles.formImportContainer}>
      <h2 style={styles.title}>{title}</h2>
      {/* <Button
        style={{
          float: "right",
          backgroundColor: "#E6F7FF",
          color: "#000",
          border: "1px solid #91D5FF",
          borderRadius: "2px",
          padding: "5px 8px",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          marginBottom: "10px"
        }}
        icon={<AddIcon style={{ marginRight: "4px" }} />}
        onClick={showModalAdd}
      >
        Thêm mới nội dung xử lý
      </Button> */}
      {renderTable()}

      <ModalAdd
        visible={visibleModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
      />
      <ModalTienDat
        visible={visibleModalTienDat}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        dataModalEditTienDat={dataModalEditTienDat}
        capNhapLoaiSoLieuID={CapNhapLoaiSoLieuID}
      />
      <ModalEdit
        visible={visibleModalEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        CapNhapLoaiSoLieuID={CapNhapLoaiSoLieuID}
      />
      <ModalChiTiet
        visible={visibleModalChiTiet}
        dataEdit={dataModalChiTiet}
        loading={confirmLoading}
        key={modalKey}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
      />
    </div>
  );
};

export default FormInspect;
