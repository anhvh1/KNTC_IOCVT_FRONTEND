import React, { useState, useEffect } from "react";
import Constants, {
  ITEM_LAYOUT,
  REQUIRED,
} from "../../../../settings/constants";
import { Radio, message } from "antd";
import Select, { Option } from "../../../../components/uielements/select";
import {
  Modal,
  Input,
  Button,
} from "../../../../components/uielements/exportComponent";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import api, { DanhSachLoaiDiaDanh } from "./config";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
const ModalEdit = ({
  visible,
  confirmLoading,
  onCancel,
  action,
  DanhSachDiaGioi,
  dataModalEdit,
  onCreate,
}) => {
  const [form] = useForm();

  const [Key, setKey] = useState("");
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [CapID, setCapID] = useState(Constants.TINH);
  const [danhSachLoaiDiaDanh, setDanhSachLoaiDiaDanh] = useState(
    DanhSachLoaiDiaDanh.find(
      (item) => item.value.toString() === `${Constants.TINH}00`
    ).children
  );
  const [tenDiaDanh, setTenDiaDanh] = useState("");
  const [danhSachTinh, setDanhSachTinh] = useState(DanhSachDiaGioi || []);
  const [danhSachHuyen, setDanhSachHuyen] = useState([]);
  const [tenTinh, setTenTinh] = useState("");
  const [tenHuyen, setTenHuyen] = useState("");
  const [tenDiaGioi, setTenDiaGioi] = useState("");
  const [tenDayDu, setTenDayDu] = useState(tenDiaDanh);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    setIsDisable(dataModalEdit.Key ? true : false);
    if (dataModalEdit && dataModalEdit.DanhSachTinh) {
      const { DanhSachTinh, ID, Cap, TinhID, HuyenID, Key, Ten, TenDayDu } =
        dataModalEdit;
      //neu la them xa -> lay ds huyen
      if (Cap.toString() === Constants.XA) {
        api
          .danhSachDiaGioi({
            ID: TinhID,
            Cap: Constants.HUYEN,
          })
          .then((response) => {
            if (response.data.Status > 0) {
              const DanhSachHuyen = response.data.Data
                ? response.data.Data[0]?.Children
                : [];
              const TenDiaDanh = DanhSachLoaiDiaDanh.find(
                (item) => item.value.toString() === `${Cap}00`
              )?.children[0]?.name;
              const TenHuyen = DanhSachHuyen.find(
                (item) => item.ID === HuyenID
              )?.TenDayDu;
              const newObj = {
                ID: ID,
                Cap: String(Cap),
                LoaiDiaDanh: DanhSachLoaiDiaDanh.find(
                  (item) => item.value == `${Cap}00`
                )?.children[0]?.value,
                TinhID: TinhID,
                HuyenID: HuyenID,
                Key: Key,
                Ten: Ten,
                TenDayDu: TenDayDu ? TenDayDu : TenDiaDanh,
              };
              form &&
                form.setFieldsValue({
                  ...newObj,
                });

              setKey(Key);
              setDanhSachHuyen(DanhSachHuyen);
              setDanhSachTinh(DanhSachTinh);
              setCapID(Cap);
              setDanhSachLoaiDiaDanh(
                DanhSachLoaiDiaDanh.find(
                  (item) => item.value.toString() === `${Cap}00`
                )?.children
              );
              setTenHuyen(TenHuyen);
              setTenDiaDanh(TenDiaDanh);
              setTenTinh("");
              setTenDiaGioi(Ten);
              TenDayDu
                ? setTenDayDu(TenDayDu)
                : handleTenDayDu(String(Cap), TenDiaDanh, Ten, TenHuyen, null);
            } else {
              message.destroy();
              message.error({
                title: "Lỗi",
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(Constants.API_ERROR);
          });
      } else {
        const changeCap = String(Cap);
        const TenTinh = danhSachTinh.find(
          (item) => item.ID === TinhID
        )?.TenDayDu;
        const TenDiaDanh = DanhSachLoaiDiaDanh.find(
          (item) => item.value == `${Cap}00`
        )?.children[0]?.name;
        const newObj = {
          ID: ID,
          Cap: changeCap,
          LoaiDiaDanh: DanhSachLoaiDiaDanh.find(
            (item) => item.value == `${Cap}00`
          )?.children[0]?.value,
          TinhID: TinhID,
          HuyenID: null,
          Key: Key,
          Ten: Ten,
          TenDayDu: TenDayDu ? TenDayDu : TenDiaDanh,
        };
        form &&
          form.setFieldsValue({
            ...newObj,
          });

        setKey(Key);
        setCapID(changeCap);
        setDanhSachTinh(DanhSachTinh);
        setTenDiaGioi(Ten);
        setTenTinh(TenTinh);
        setTenHuyen("");
        setDanhSachLoaiDiaDanh(
          DanhSachLoaiDiaDanh.find(
            (item) => item.value.toString() === `${Cap}00`
          )?.children
        );
        setTenDiaDanh(TenDiaDanh);
        TenDayDu
          ? setTenDayDu(TenDayDu)
          : handleTenDayDu(changeCap, TenDiaDanh, Ten, null, TenTinh);
      }
    }
  }, []);

  const renderTitle = () => {
    if (action === "add") {
      return "Thêm địa giới hành chính";
    }
    if (action === "edit") {
      return "Sửa địa giới hành chính";
    }
    return "Trường hợp ngoại lệ";
  };

  const onOk = async (e) => {
    e.preventDefault();

    const values = await form.validateFields();
    onCreate(values);
  };

  const onChangeCap = (e) => {
    let cap = e.target.value;
    let findDanhSachByCap = DanhSachLoaiDiaDanh.find(
      (item) => item.value.toString() === `${cap}00`
    ).children;
    let currentDiaDanh = findDanhSachByCap[0];

    form.setFieldsValue({
      LoaiDiaDanh: currentDiaDanh.value || "",
    });
    setCapID(String(cap));
    setDanhSachLoaiDiaDanh(findDanhSachByCap || []);
    setTenDiaDanh(currentDiaDanh.name);
    handleTenDayDu(
      String(cap),
      currentDiaDanh.name,
      tenDiaGioi,
      tenHuyen,
      tenTinh
    );
  };

  const onChangeLoaiDiaDanh = (e) => {
    let tenLoaiDiaDanh =
      danhSachLoaiDiaDanh.find((item) => item.value === e)?.name || "";
    setTenDiaDanh(tenLoaiDiaDanh);
    handleTenDayDu(
      String(CapID),
      tenLoaiDiaDanh,
      tenDiaGioi,
      tenHuyen,
      tenTinh
    );
  };

  const onChangeTinh = (TinhID) => {
    if (TinhID) {
      api
        .danhSachDiaGioi({
          ID: TinhID,
          Cap: Constants.HUYEN,
        })
        .then((response) => {
          if (response.data.Status > 0) {
            setDanhSachHuyen(response.data.Data);
          } else {
            message.destroy();
            message.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(Constants.API_ERROR);
        });

      form.setFieldValue("HuyenID", null);
      let tenTinh = danhSachTinh.find((item) => item.ID === TinhID)?.TenDayDu;
      setTenTinh(tenTinh);
      setTenHuyen("");
      handleTenDayDu(String(CapID), tenDiaDanh, tenDiaGioi, null, tenTinh);
    } else {
      setDanhSachHuyen([]);
    }
  };

  const onChangeHuyen = (HuyenID) => {
    let tenHuyen = danhSachHuyen.find((item) => item.ID === HuyenID)?.TenDayDu;
    setTenHuyen(tenHuyen);
    handleTenDayDu(String(CapID), tenDiaDanh, tenDiaGioi, tenHuyen, tenTinh);
  };

  const onInputTen = (e) => {
    let ten = e.target.value;
    setTenDiaGioi(ten);
    handleTenDayDu(String(CapID), tenDiaDanh, ten, tenHuyen, tenTinh);
  };

  const handleTenDayDu = (
    capID,
    tenDiaDanh,
    tenDiaGioi,
    tenHuyen = null,
    tenTinh = null
  ) => {
    let TenDayDu = tenDiaGioi;
    switch (capID) {
      case "1":
        TenDayDu = tenDiaDanh + " " + tenDiaGioi;
        break;
      case "2":
        TenDayDu =
          tenDiaDanh + " " + tenDiaGioi + (tenTinh ? " - " + tenTinh : "");
        break;
      case "3":
        TenDayDu =
          tenDiaDanh + " " + tenDiaGioi + (tenHuyen ? " - " + tenHuyen : "");
        break;
      default:
        break;
    }

    form.setFieldValue("TenDayDu", TenDayDu);
    setTenDayDu(TenDayDu);
  };

  const handleChangedFields = (changedValue, allValues) => {
    const { Ten, TenDayDu } = allValues;

    if (Ten && TenDayDu) setIsFormSuccess(false);
    else setIsFormSuccess(true);
  };

  return (
    <Modal
      title={renderTitle()}
      width={500}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={onCancel}
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          loading={confirmLoading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="myForm"
        layout="horizontal"
        initialValues={{
          Cap: CapID,
          LoaiDiaDanh: DanhSachLoaiDiaDanh.find(
            (item) => item.value.toString() === `${CapID}00`
          )?.children[0]?.value,
          TenDayDu: tenDayDu,
          Key: "",
        }}
        onValuesChange={handleChangedFields}
      >
        {action === "edit" ? (
          <Item style={{ display: "none" }} name={"ID"}></Item>
        ) : (
          ""
        )}
        <Item style={{ display: "none" }} name={"Key"}></Item>
        <Item
          label="Cấp"
          name={"Cap"}
          {...ITEM_LAYOUT}
          rules={[{ ...REQUIRED }]}
        >
          <Radio.Group
            onChange={onChangeCap}
            disabled={action === "edit" || isDisable ? true : false}
          >
            <Radio value={Constants.TINH}>Tỉnh</Radio>
            <Radio value={Constants.HUYEN}>Huyện</Radio>
            <Radio value={Constants.XA}>Xã</Radio>
          </Radio.Group>
        </Item>

        {/* <Item
          label="Loại địa danh"
          name={"LoaiDiaDanh"}
          {...ITEM_LAYOUT}
          rules={[{ ...REQUIRED }]}
        >
          <Select allowClear onChange={onChangeLoaiDiaDanh}>
            {danhSachLoaiDiaDanh?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Item> */}
        {CapID >= Constants.HUYEN ? (
          <Item
            label="Thuộc tỉnh"
            name={"TinhID"}
            {...ITEM_LAYOUT}
            rules={[{ ...REQUIRED }]}
          >
            <Select
              showSearch
              onChange={onChangeTinh}
              disabled={action === "edit" || isDisable ? true : false}
            >
              {danhSachTinh.map((value) => (
                <Option key={value.ID} value={value.ID}>
                  {value.Ten}
                </Option>
              ))}
            </Select>
          </Item>
        ) : (
          ""
        )}
        {CapID >= Constants.XA ? (
          <Item
            label="Thuộc huyện"
            name={"HuyenID"}
            {...ITEM_LAYOUT}
            rules={[{ ...REQUIRED }]}
          >
            <Select
              showSearch
              onChange={onChangeHuyen}
              disabled={action === "edit" || isDisable ? true : false}
            >
              {danhSachHuyen.map((value) => (
                <Option key={value.ID} value={value.ID}>
                  {value.Ten}
                </Option>
              ))}
            </Select>
          </Item>
        ) : (
          ""
        )}
        <Item label="Tên" {...ITEM_LAYOUT} name={"Ten"} rules={[REQUIRED]}>
          <Input autoFocus onInput={onInputTen} />
        </Item>
        <Item
          label="Tên đầy đủ"
          {...ITEM_LAYOUT}
          name={"TenDayDu"}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export { ModalEdit };
