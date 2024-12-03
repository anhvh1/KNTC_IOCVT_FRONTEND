import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import ModalForm from "../../../../../customApp/containers/NghiepVu/Shared/Modal/ModalForm";
import FormDynamic from "../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
import { useModal } from "../../../../CustomHook/useModal";
import BoxTable from "../../../../../components/utility/boxTable";
import { FORM, FORMCOL } from "../../../../../settings/constants";
import api, { apiUrl } from "../config";
import { Button } from "../../../../../components/uielements/exportComponent";
import AddIcon from "../../../../../components/utility/AddIcon";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import EditIcon from "../../../../../components/utility/EditIcon";
import EyeIcon from "../../../../../components/utility/EyeIcon";
import DownLeftIcon from "../../../../../components/utility/DownLeftIcon";
import { useForm } from "../../../../../components/uielements/formValidator";
import { Tooltip, message } from "antd";
import { useKey } from "../../../../CustomHook/useKey";
import dayjs from "dayjs";
import ModalAdd from "./Modal/modalAddChinhSach";
import ModalEditKQXLCS from "./Modal/modalEditKQXLCS";
import ModalChiTietChinhSach from "./Modal/ModalChiTietChinhSach";
import { formDataCaller } from "../../../../../api/formDataCaller";
import { styles } from "./style";
const FormReportResult = ({ CuocThanhTraID, form, title }) => {
  const [listReport, setListReport] = useState([]);
  const { showModal, hideModal, stateModal } = useModal();
  const [formRef] = useForm();
  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        listReport: listReport,
      });
    }
  }, [listReport]);
  const [data, setData] = useState([]);
  const [CapNhapLoaiSoLieuID, setCapNhapLoaiSoLieuID] = useState({});

  useEffect(() => {
    fetchData();
  }, [CuocThanhTraID]);

  const fetchData = () => {
    api
      .GetListPagingSoLieuByLoaiSoLieu(CuocThanhTraID, 6) // Fetching data based on CuocThanhTraID and TypeChucNang
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
  const showModalEdit = (capNhapLoaiSoLieuID) => {
    setAction("edit");
    api
      .GetSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalAddEdit(true);
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
  const showModalEditKQXLCS = (capNhapLoaiSoLieuID) => {
    setAction("editkqxlcs");
    api
      .GetChiTietSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
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
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        return <p style={{ textAlign: "center" }}>{index + 1}</p>;
      },
    },
    {
      title: "Kết luận",
      dataIndex: "SoVanBan",
      key: "SoVanBan",
      width: "10%",
    },
    {
      title: "Lĩnh vực chính",
      dataIndex: "TenLoaiThanhTra",
      key: "TenLoaiThanhTra",
      width: "10%",
    },
    {
      title: "Tổng số văn bản kiến nghị phải hoàn thiện",
      dataIndex: "TongSoVanBan",
      align: "center",
      key: "TongSoVanBan",
      width: "30%",
    },
    {
      title: "Số văn bản kiến nghị đã thực hiện xong",
      dataIndex: "SoVanbanDaThucHien",
      align: "center",

      key: "SoVanbanDaThucHien",
      width: "30%",
    },
    {
      title: "Chức năng",
      width: "15%",
      render: (text, record, index) => {
        return (
          <div className="btn-action">
            {/* <Tooltip title="Xem chi tiết">
              <EyeIcon onClick={() => showModalChiTiet(record.CapNhapLoaiSoLieuID)} />
            </Tooltip>
            <Tooltip title="Cập nhật">
              <EditIcon
                // onClick={() => showModalEdit(record.CapNhapLoaiSoLieuID)}
                onClick={() => {
                  showModalEdit(record.CapNhapLoaiSoLieuID);
                  setCapNhapLoaiSoLieuID(record.CapNhapLoaiSoLieuID);
                }}
              />
            </Tooltip> */}
            <Tooltip title="Cập nhật xử lý">
              <DownLeftIcon
                onClick={() => {
                  showModalEditKQXLCS(record.CapNhapLoaiSoLieuID);
                  setCapNhapLoaiSoLieuID(record.CapNhapLoaiSoLieuID);
                }}
              />
            </Tooltip>
            {/* <Tooltip title="Xóa">
              <DeleteIcon onClick={() => deleteModalAddEdit(record.CapNhapLoaiSoLieuID)} />
            </Tooltip> */}
          </div>
        );
      },
    },
  ];
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

  const showModalChiTiet = (capNhapLoaiSoLieuID) => {
    setAction("chitiet");
    api
      .GetThongTinQuyetDinh(capNhapLoaiSoLieuID, 6)
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
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [dataModalChiTiet, setDataModalChiTiet] = useState({});
  const [visibleModalChiTiet, setVisibleModalChiTiet] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [dataModalAddEdit, setDataModalAddEdit] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
    setVisibleModalEdit(false);
    setVisibleModalChiTiet(false);
  };
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);

    if (action === "add") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.InsertCapNhapLoaiSoLieu}?type=6`, formSave)
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
    } else if (action === "edit" || action === "editkqxlcs") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));
      formDataCaller(`${apiUrl.UpdateCapNhapLoaiSoLieu}?type=6`, formSave)
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
  return (
    <div style={styles.formImportContainer}>
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        {title}
      </h2>
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

      <BoxTable columns={columns} dataSource={data} pagination={false} />
      <ModalAdd
        visible={visibleModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        CapNhapLoaiSoLieuID={CapNhapLoaiSoLieuID}
      />
      <ModalEditKQXLCS
        visible={visibleModalEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        CapNhapLoaiSoLieuID={CapNhapLoaiSoLieuID}
      />
      <ModalChiTietChinhSach
        visible={visibleModalChiTiet}
        dataEdit={dataModalChiTiet}
        loading={confirmLoading}
        key={modalKey}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        action={action}
      />
    </div>
  );
};
export default FormReportResult;
