import React, { Component, useEffect, useState } from "react";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from "../../../../settings/constants";
import { Form, Input, Button, message, Modal as ModalAnt } from "antd";
import Upload from "../../../../components/uielements/upload";
import Select, {
  Option,
  OptGroup,
} from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import optionsSidebar from "../../../sidebar";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import actionSidebar from "../../../redux/HeThong/Sidebar/actions";
import { useDispatch, useSelector } from "react-redux";
import api from "./config";

const { Item } = Form;

const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const { useForm } = Form;
  const [form] = useForm();
  const dispatch = useDispatch();
  const { dataModalAddEdit, ListSideBar } = props;

  useEffect(() => {
    if (dataModalAddEdit) {
      const { DanhSachHuongDan, Data } = dataModalAddEdit;
      form && form.setFieldsValue({ ...Data });

      // setListOptions(listOption);
      if (dataModalAddEdit.Data?.TenFileGoc) {
        const file = {
          TenFileGoc: dataModalAddEdit.Data?.TenFileGoc,
          FileUrl: dataModalAddEdit.Data?.UrlFile,
        };
        setListFileDinhKem([file]);
      }
      if (dataModalAddEdit?.Data?.CapID) {
        GetListMenuByCap(dataModalAddEdit?.Data?.CapID);
      }
    }
  }, []);

  const onOk = (e) => {
    e.preventDefault();
    form.validateFields().then((value) => {
      if (ListFileDinhKem.length < 1) {
        message.destroy();
        message.warning("Chưa chọn file đính kèm");
        return;
      }
      const newValue = {
        ...value,
        TenFileGoc: ListFileDinhKem[0].name,
      };
      const { onCreate } = props;
      onCreate(newValue, ListFileDinhKem[0]);
    });
  };

  const getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile)
    );
    reader.readAsDataURL(file);
    // })
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };

  const deteleFile = (item, index) => {
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: "Thông báo",
        content: "Bạn có muốn xóa file đính kèm này không ?",
        okText: "Có",
        cancelText: "Không",
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...ListFileDinhKem];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          // ListFileDinhKem[index] = item;
          setListFileDinhKem(newArr);
        },
      });
    } else {
      const newArr = [...ListFileDinhKem];
      newArr.splice(index, 1);
      setListFileDinhKem(newArr);
    }
  };

  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile?.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  const { confirmLoading, visible, onCancel, actions, danhSachCacCap } = props;

  return (
    <Modal
      title={
        actions === "add"
          ? "Thêm mới hướng dẫn sử dụng"
          : "Cập nhật hướng dẫn sử dụng"
      }
      width={MODAL_NORMAL}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button loading={confirmLoading} onClick={onOk} type="primary">
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        {actions !== "add" ? (
          <Item name="HuongDanSuDungID" hidden {...REQUIRED}></Item>
        ) : null}
        {/* <Item label="Chọn cấp" {...ITEM_LAYOUT} name="CapID" {...REQUIRED}>
          <Select
            allowClear
            // style={{width: '200px'}}
            placeholder={"Chọn cấp"}
            onChange={(value) => GetListMenuByCap(value)}
          >
            {danhSachCacCap?.map((item) => (
              <Option value={item.Cap}>{item.TenCap}</Option>
            ))}
          </Select>
        </Item> */}
        <Item
          label="Chức năng"
          {...ITEM_LAYOUT}
          name="MaChucNang"
          {...REQUIRED}
        >
          <Select placeholder="Chọn chức năng">
            {ListSideBar.map((groupItem) => (
              <OptGroup key={groupItem.MaMenu} label={groupItem.TenMenu}>
                {groupItem?.Children?.filter((item) => item)?.map(
                  (optionItem) => {
                    if (optionItem) {
                      return (
                        <Option
                          key={optionItem?.MaMenu}
                          // disabled={!optionItem?.ViewOnly}
                          value={optionItem?.key}
                        >
                          {optionItem?.TenMenu}
                        </Option>
                      );
                    }
                  }
                )}
              </OptGroup>
            ))}
          </Select>
        </Item>
        <Item
          label="Tiêu đề hướng dẫn"
          name="TieuDe"
          {...REQUIRED}
          {...ITEM_LAYOUT}
        >
          <Input />
        </Item>
        <Item label="Link" name="Link" {...ITEM_LAYOUT}>
          <Input />
        </Item>
        <Item label="File hướng dẫn" {...ITEM_LAYOUT}>
          <Upload
            showUploadList={false}
            actions={false}
            // multiple={true}
            beforeUpload={(file, listFile) => {
              beforeUploadFile(file, genDataFileDinhKem, listFile);
            }}
            disabled={loading}
          >
            <Button type={"primary"} loading={loading} className="btn-upload">
              Chọn file từ liệu từ máy tính
            </Button>
          </Upload>
          {ListFileDinhKem && ListFileDinhKem?.length
            ? ListFileDinhKem.map((item, index) => (
                <>
                  {/* <td style={{textAlign: 'center'}}>{index + 1}</td> */}
                  <p>
                    <a target="_bank" href={item?.FileUrl}>
                      {item?.name || item?.TenFileGoc}
                    </a>
                  </p>
                  {/* <td style={{textAlign: 'center'}}>
                    <span>
                      <Tooltip title={'Xóa file'}>
                        <DeleteOutlined
                          onClick={() => deteleFile(item, index)}
                        />
                      </Tooltip>
                    </span>
                  </td> */}
                </>
              ))
            : ""}
        </Item>
        <div>
          {/* <div style={{color: '#ff0000'}}>
            Lưu ý: File hướng dẫn sử dụng yêu cầu file có định dạng .pdf và có
            dung lượng &#60; {FileLimit} MB
          </div> */}
        </div>
      </Form>
    </Modal>
  );
};
export { ModalAddEdit };
