import React, { Component, useEffect, useState } from "react";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
import Constants, {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
} from "../../../../settings/constants";
import { Row, Col } from "antd";
import {
  Button,
  Modal,
  Input,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import Checkbox from "../../../../components/uielements/checkbox";
import apidichi from "../DMDoanhNghiep/config";
import TreeSelect from "../../../../components/uielements/treeSelect";
import Select, { Option } from "../../../../components/uielements/select";
import { _debounce } from "../../../../helpers/utility";
import api from "./config";
import layout, { StyledModalCoQuan } from "./styled";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
const ModalEdit = ({
  visible,
  onCancel,
  dataModalEdit,
  onCreate,
  DanhSachCoQuan,
  action,
}) => {
  const [form] = useForm();
  const [capDonVi, setCapDonVi] = useState([]);
  const [thamQuyen, setThamQuyen] = useState([]);
  const [diaGioi, setDiaGioi] = useState({
    tinh: [],
    huyen: [],
    xa: [],
  });
  const [coquancha, setCoquancha] = useState();
  useEffect(() => {
    if (!dataModalEdit?.CoQuanID && DanhSachCoQuan) {
      const parentID = dataModalEdit.CoQuanChaID;
      let Parent;
      const findParentFromTree = (list, ParentID) => {
        list?.forEach((item) => {
          if (item.Children) {
            if (item.ID === ParentID) {
              Parent = item.Ten;
            } else {
              findParentFromTree(item.Children, ParentID);
            }
          } else {
            if (item.ID === ParentID) {
              Parent = item.Ten;
            }
          }
        });
      };
      findParentFromTree(DanhSachCoQuan, parentID);
      form.setFieldsValue({
        ...dataModalEdit,
        TenCoQuanCha: dataModalEdit?.CoQuanChaID
          ? dataModalEdit.TenCoQuanCha
          : DanhSachCoQuan[0]?.Ten,
        TinhID: 63,
      });
      api.danhSachCacCapDonVi().then((res) => setCapDonVi(res.data.Data));
      api.danhSachThamQuyen().then((res) => setThamQuyen(res.data.Data));
      api
        .danhSachDiaGioi()
        .then((res) => setDiaGioi({ ...diaGioi, tinh: res.data.Data }));
    } else {
      api.danhSachCacCapDonVi().then((res) => setCapDonVi(res.data.Data));
      api.danhSachThamQuyen().then((res) => setThamQuyen(res.data.Data));
      api.danhSachDiaGioi().then((res) => {
        const newDiaGioi = { ...diaGioi, tinh: res.data.Data };
        setDiaGioi(newDiaGioi);
        if (dataModalEdit?.Data?.TinhID) {
          onTinhChange(dataModalEdit?.Data?.TinhID, newDiaGioi);
          if (dataModalEdit?.Data?.HuyenID) {
            onHuyenChange(dataModalEdit?.Data?.HuyenID, newDiaGioi);
          }
        }
      });
      api
        .chiTietCoQuan({ ID: dataModalEdit?.Data?.CoQuanChaID })
        .then((res) => {
          setCoquancha(res.data.Data?.TenCoQuan);
          form.setFieldsValue({
            ...dataModalEdit.Data,
            TenCoQuanCha: dataModalEdit.Data?.TenCoQuanCha,
            HuyenID: dataModalEdit.Data?.HuyenID
              ? dataModalEdit.Data.HuyenID
              : null,
            XaID: dataModalEdit.Data?.XaID ? dataModalEdit.Data.XaID : null,
          });
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    for (const key in value) {
      if (!value[key]) {
        delete value[key];
      }
    }
    delete value.TenCoQuanCha;
    if (action === "add") {
      onCreate({
        ...value,
        // CoQuanID: dataModalEdit?.CoQuanID ? dataModalEdit?.CoQuanID : 0,
        CoQuanChaID: dataModalEdit?.CoQuanChaID
          ? dataModalEdit?.CoQuanChaID
          : 0,
      });
    } else {
      onCreate({
        ...value,
        CoQuanID: dataModalEdit?.CoQuanID ? dataModalEdit?.CoQuanID : 0,
        CoQuanChaID: dataModalEdit.Data.CoQuanChaID,
      });
    }
  };
  // const onTinhChange = (value, newDiaGioi) => {
  //   if (value) {
  //     api.danhSachDiaGioi({ID: value, Cap: 2}).then((res) => {
  //       const diaGioi = {...newDiaGioi, huyen: res.data.Data};
  //       setDiaGioi(diaGioi);
  //     });
  //   }
  // };
  // const onHuyenChange = (value, newDiaGioi) => {
  //   if (value) {
  //     api.danhSachDiaGioi({ID: value, Cap: 3}).then((res) => {
  //       const diaGioi = {...newDiaGioi, xa: res.data.Data};
  //       setDiaGioi(diaGioi);
  //     });
  //   }
  // };
  const [DanhSachTinh, setDanhSachTinh] = useState([]);

  const [DanhSachHuyen, setDanhSachHuyen] = useState([]);
  const [DanhSachXa, setDanhSachXa] = useState([]);
  useEffect(() => {
    Tinh();
    fetchHuyen();
    // fetchXa(dataModalEdit.HuyenID);
    GetAllWorkFlow();
  }, []);
  const Tinh = async () => {
    try {
      const res = await apidichi.danhSachTinh();
      if (res.data.Status > 0) {
        setDanhSachTinh(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };
  const [WorkFlow, setWorkFlow] = useState([]);

  const GetAllWorkFlow = async () => {
    try {
      const res = await api.danhsachGetAllWorkFlow();
      if (res.data.Status > 0) {
        setWorkFlow(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };
  const fetchHuyen = async () => {
    try {
      const res = await apidichi.danhSachHuyen();
      if (res.data.Status > 0) {
        setDanhSachHuyen(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách huyện:", error);
    }
  };

  const onTinhChange = (value) => {
    // Fetch Huyen when a Tinh is selected
    form.setFieldsValue({ HuyenID: undefined }); // Reset Huyen field when Tinh changes
  };
  const fetchXa = async (huyenID) => {
    try {
      const res = await apidichi.danhSachXa(huyenID);
      if (res.data.Status > 0) {
        setDanhSachXa(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách huyện:", error);
    }
  };

  const onHuyenChange = (value) => {
    fetchXa(value); // Fetch Huyen when a Tinh is selected
    form.setFieldsValue({ XaID: undefined }); // Reset Huyen field when Tinh changes
  };
  return (
    <>
      <Modal
        open={visible}
        title={action === "add" ? "Thêm cơ quan đơn vị" : "Sửa cơ quan đơn vị"}
        onCancel={onCancel}
        width={1100}
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
            onClick={onOk}
            form="FormDMCoQuan"
          >
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="FormDMCoQuan"
          initialValues={{
            CQCoHieuLuc: false,
            QTVanThuTiepDan: false,
            CapUBND: false,
            QTVanThuTiepNhanDon: false,
            CapThanhTra: false,
            SuDungQuyTrinh: false,
            SuDungPM: false,
            SDNganSachNhaNuoc: false,
            TinhID: 63,
            HuyenID: null,
            XaID: null,
          }}
        >
          <Row justify="space-between" gutter={[32, 8]}>
            {/* {dataModalEdit?.TenCoQuanCha ? (
              <Col {...layout.colFull}>
                <Item
                  label="Cơ quan cha"
                  name={'TenCoQuanCha'}
                  rules={[REQUIRED]}
                  {...layout.formItem1}
                >
                  <Select disabled></Select>
                </Item>
              </Col>
            ) : null} */}
            {dataModalEdit?.CoQuanID !== 1 && dataModalEdit?.TenCoQuanCha ? (
              <Col {...layout.colFull}>
                <Item
                  label="Cơ quan cha"
                  name={"TenCoQuanCha"}
                  rules={[REQUIRED]}
                  {...layout.formItem1}
                >
                  {/* <Select disabled><Option>{coquancha}</Option></Select> */}
                  <Select disabled />
                </Item>
              </Col>
            ) : null}
            <Col {...layout.colHaft}>
              <Item
                label="Mã cơ quan"
                name={"MaCQ"}
                rules={[REQUIRED]}
                {...layout.formItem2}
              >
                <InputFormatSpecific />
              </Item>
            </Col>
            <Col {...layout.colHaft}>
              <Item
                label="Tên cơ quan"
                name={"TenCoQuan"}
                rules={[REQUIRED]}
                labelAlign="left"
                {...layout.formItem2}
                isNoCheckRule
              >
                <Input />
              </Item>
            </Col>
            <Col {...layout.colFull}>
              <Item
                label="Cấp"
                name={"CapID"}
                {...layout.formItem1}
                rules={[REQUIRED]}
              >
                <Select>
                  {capDonVi?.map((item, index) => (
                    <Option key={index} value={item.CapID}>
                      {item.TenCap}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            {/* <Col {...layout.colFull}>
              <Item
                label="Luồng kế hoạch TT"
                name={'WorkFlowID'}
                rules={[REQUIRED]}
                {...layout.formItem1}
              >
                <Select>
                  {WorkFlow?.map((item, index) => (
                    <Option key={index} value={item.WorkFlowID}>
                      {item.WorkFlowName}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col {...layout.colFull}>
              <Item
                label="Luồng tiến hành TT"
                name={'WFTienHanhTTID'}
                // rules={[REQUIRED]}
                {...layout.formItem1}
              >
                <Select>
                  {/* {capDonVi?.map((item, index) => (
                    <Option key={index} value={item.CapID}>
                      {item.TenCap}
                    </Option>
                  ))} */}
            {/* </Select>
              </Item>
            </Col>  */}
            <Col {...layout.colHaft}>
              {/* <Item
                label="Thẩm quyền"
                name={'ThamQuyenID'}
                rules={[REQUIRED]}
                {...layout.formItem2}
              >
                <Select>
                  {thamQuyen?.map((item, index) => (
                    <Option key={index} value={item.ThamQuyenID}>
                      {item.TenThamQuyen}
                    </Option>
                  ))}
                </Select>
              </Item> */}
            </Col>
          </Row>
          <Row justify="space-between" gutter={[10, 8]}>
            <Col {...layout.colThirt}>
              <Item
                label="Tỉnh"
                name="TinhID"
                labelAlign="left"
                {...layout.formItem3}
                rules={[REQUIRED]}
              >
                <Select
                  onChange={onTinhChange}
                  listHeight={100}
                  allowClear
                  disabled
                >
                  <Option key={63} value={63}>
                    Quảng Trị
                  </Option>
                </Select>
              </Item>
            </Col>
            <Col {...layout.colThirt}>
              <Item
                label="Huyện"
                name={"HuyenID"}
                labelAlign="right"
                {...layout.formItem3}
                rules={[REQUIRED]}
              >
                <Select
                  allowClear
                  name={"HuyenID"}
                  listHeight={100}
                  onChange={onHuyenChange}
                >
                  {DanhSachHuyen?.map((item) => (
                    <Option key={item.HuyenID} value={item.HuyenID}>
                      {item.TenHuyen}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col {...layout.colThirt}>
              <Item
                label="Xã"
                name={"XaID"}
                labelAlign="right"
                {...layout.formItem3}
                rules={[REQUIRED]}
              >
                <Select listHeight={100} allowClear>
                  {DanhSachXa?.map((item) => (
                    <Option key={item.XaID} value={item.XaID}>
                      {item.TenXa}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <StyledModalCoQuan>
            <Row className="checkbox-coquan">
              <Col span={7}>
                <Item name="CQCoHieuLuc" valuePropName="checked" label="">
                  <Checkbox>Cơ quan có hiệu lực</Checkbox>
                </Item>
              </Col>

              <Col span={7}>
                <Item name="IsCQThanhTra" valuePropName="checked">
                  <Checkbox>Cơ quan thanh tra</Checkbox>
                </Item>
              </Col>
              <Col span={7}>
                <Item name="IsCQTrungUong" valuePropName="checked">
                  <Checkbox>Cơ quan thanh tra trung ương</Checkbox>
                </Item>
              </Col>
              {/* <Col span={7}>
                <Item name="SDNganSachNhaNuoc" valuePropName="checked">
                  <Checkbox>Sử dụng ngân sách nhà nước</Checkbox>
                </Item>
              </Col> */}
            </Row>
          </StyledModalCoQuan>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(ModalEdit);
