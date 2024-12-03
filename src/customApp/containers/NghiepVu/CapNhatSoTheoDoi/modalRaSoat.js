import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { Radio, Row, Col, Input, Tooltip, message } from "antd";

import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import { checkInputNumber, formatNoiDung } from "../../../../helpers/utility";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import BoxTable from "../../../../components/utility/boxTable";
import Box from "../../../../components/utility/box";
import DownLeftIcon from "../../../../components/utility/DownLeftIcon";
import AddIcon from "../../../../components/utility/AddIcon";
import EditIcon from "../../../../components/utility/EditIcon";
import { useKey } from "../../../CustomHook/useKey";
import ModalAddEdit from "./modalAddEdit";
import api, { apiUrl } from "./config";
import { formDataCaller } from "../../../../api/formDataCaller";
import dayjs from "dayjs";
import ModalCheck from "./ModalCheck";
export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    loading,
    visible,
    CuocThanhTraID,
    setDataModalRaSoat,
    ListHinhThuc,
    ListYear,
    ListAgency,
  } = props;
  const [stateModalCheck, setStateModalCheck] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const [menuRaSoat, setmenuRaSoat] = useState(11);
  const showModalCheck = (CuocThanhTraID) => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: true,
      action: "check",
      key: stateModalCheck.key + 1,
      CuocThanhTraID: CuocThanhTraID,
    });
  };
  const handleChangeStateInspection = (value) => {
    setStateModalCheck({
      ...stateModalCheck,
      ...value,
    });
  };
  const submitModalCheck = (value) => {
    handleChangeStateInspection({ loading: true });
    api
      .UpdateChongCheo(value)
      .then((response) => {
        handleChangeStateInspection({ loading: false });
        if (response.data.Status > 0) {
          message.destroy();
          message.success(response.data.Message);
          hideModalCheck();
          refreshList();
        } else {
          message.destroy();
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        handleChangeStateInspection({ loading: false });
        message.destroy();
        message.error(error.toString());
      });
  };
  const hideModalCheck = () => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: false,

      data: {},
      action: null,
    });
  };
  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Nội dung rà soát",
      dataIndex: "NoiDung",
      width: "55%",
      key: "NoiDung",
      render: (text, record, index) => formatNoiDung(text),
    },
    {
      title: "Ngày ban hành",
      dataIndex: "ThoiGian",
      align: "center",
      width: "25%",
      key: "ThoiGian",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Thao tác",
      width: "15%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  useEffect(() => {}, [CuocThanhTraID]);
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role && role.edit && ( */}
        <Tooltip title={"Cập nhật "}>
          <DownLeftIcon onClick={() => showModalCheck(record.CuocThanhTraID)} />
        </Tooltip>
        <Tooltip title={"Sửa"}>
          <EditIcon
            onClick={() => showModalEdit(record.CuocThanhTraID, record.ID)}
          />
        </Tooltip>
        {/* )} */}
      </div>
    );
  };
  const [action, setAction] = useState("");
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [modalKey, inceaseModalKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const showModalEdit = (CuocThanhTraID, ID) => {
    setAction("edit");
    api
      .gechitietid(CuocThanhTraID, ID)
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
  const submitModalAddEdit = (data, FileData) => {
    console.log("FileData", FileData);
    setConfirmLoading(true);
    if (action === "add") {
      const formSave = new FormData();
      formSave.append("jsonModel", JSON.stringify(data));
      formSave.append("Type", 19);
      formDataCaller(apiUrl.InsertRaSoat, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Thêm thành công");
            api
              .getchitietrasoat(CuocThanhTraID)
              .then((res) => {
                if (res.data.Status > 0) {
                  setDataModalRaSoat(res.data.Data);
                } else {
                  message.destroy();
                  message.error(res.data.Message);
                }
              })
              .catch((error) => {
                message.destroy();
                message.error(error.toString());
              });
            hideModalAddEdit();
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
      formSave.append("Type", 19);
      formDataCaller(apiUrl.UpdateRaSoat, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Cập nhật thành công");
            api
              .getchitietrasoat(CuocThanhTraID)
              .then((res) => {
                if (res.data.Status > 0) {
                  setDataModalRaSoat(res.data.Data);
                } else {
                  message.destroy();
                  message.error(res.data.Message);
                }
              })
              .catch((error) => {
                message.destroy();
                message.error(error.toString());
              });
            hideModalAddEdit();
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
  const hideModalAddEdit = () => {
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  return (
    <Modal
      title={`Danh sách nội dung rà soát`}
      width={"100%"}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={props.onCancel}
        >
          Đóng
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formLinhVuc"}
        initialValues={{
          TrangThai: 1,
        }}
      >
        <Button
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
            marginBottom: "10px",
          }}
          icon={<AddIcon style={{ marginRight: "4px" }} />}
          onClick={showModalAdd}
          type="add"
        >
          Thêm mới
        </Button>
        <BoxTable
          columns={columns}
          dataSource={dataEdit}
          // loading={props.TableLoading}
          // onChange={onFilter}
          pagination={false}
        />
        <ModalAddEdit
          visible={visibleModalAddEdit}
          dataEdit={dataModalAddEdit}
          action={action}
          loading={confirmLoading}
          key={modalKey}
          onCreate={submitModalAddEdit}
          onCancel={hideModalAddEdit}
          CuocThanhTraID={CuocThanhTraID}
        />
        <ModalCheck
          visible={stateModalCheck.visible}
          onCancel={hideModalCheck}
          loading={stateModalCheck.loading}
          ListAgency={ListAgency}
          key={stateModalCheck.key}
          ListHinhThuc={ListHinhThuc}
          onCreate={submitModalCheck}
          dataEdit={stateModalCheck.data}
          action={stateModalCheck.action}
          CuocThanhTraID={stateModalCheck.CuocThanhTraID}
          ListYear={ListYear}
          menuRaSoat={menuRaSoat}
        />
      </Form>
    </Modal>
  );
};
