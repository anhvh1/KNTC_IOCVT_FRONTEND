import { customizeItemValidator as Item } from "../../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../../components/uielements/formValidator";
import { FORM } from "../../../../../settings/constants";
import { REQUIRED } from "../../../../../settings/constants";
import { message } from "antd";
import Upload from "../../../../../components/uielements/upload";
import {
  Input,
  Select,
  DatePicker,
  Button,
} from "../../../../../components/uielements/exportComponent";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Textarea as TextArea } from "../../../../../components/uielements/exportComponent";
import { useState, useEffect } from "react";
import { getValueConfigLocalByKey } from "../../../../../helpers/utility";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import DowloadIcon from "../../../../../components/utility/DowloadIcon";
import { FormStyle } from "./style/Form.style";
import dayjs from "dayjs";
import { disabledDate } from "../../../../../helpers/utility";
import CloudUploadIcon from "../../../../../components/utility/CloudUploadIcon";
import { Modal } from "antd";
const FormDynamic = (props) => {
  const { listFields, data, keyRef, disabledAll } = props;
  const [formDefault] = useForm();
  const form = props.form || formDefault;
  const [ListFields, setListFields] = useState(listFields);
  const colDefault = {
    span: 24,
  };

  useEffect(() => {
    setListFields(listFields);
  }, [listFields]);

  useEffect(() => {
    if (form) {
      if (data) {
        const dataDatePicker = listFields.filter(
          (item) => item.type === FORM.DatePicker
        );
        const objectDatePicker = {};
        dataDatePicker.forEach((item) => {
          if (data[item.name]) {
            objectDatePicker[item.name] = data[item.name]
              ? dayjs(data[item.name])
              : null;
          }
        });

        form.setFieldsValue({ ...data, ...objectDatePicker });
        const arrayProperties = Object.keys(data).filter((key) =>
          Array.isArray(data[key])
        );
        const newListFields = [...ListFields];

        arrayProperties.forEach((property) => {
          if (newListFields.find((item) => item.name === property)) {
            newListFields.find((item) => item.name === property)[property] =
              data[property];
            newListFields.forEach((item) => {
              if (item.name_not_equal) {
                item.ListSelected = item[item.name];
              }
            });
            setListFields(newListFields);
          }
        });
      } else {
        if (form) {
          form.resetFields();
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (keyRef) {
      //   form.resetFields();
    }
  }, [keyRef]);

  const getBase64 = (file, callback, listFile, name, ListFiles) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile, name, ListFiles)
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKem = (base64, file, listFile, name, ListFiles = []) => {
    const newListFiles = [...ListFiles, ...listFile];
    const newListFields = [...ListFields];
    handleUpdateField(name, "ListFiles", newListFiles);
    handleUpdateField(name, "loadingFile", false);
    setListFields(newListFields);
    if (form) {
      const newData = {
        [name]: newListFiles,
      };
      form.setFieldsValue({
        ...newData,
      });
    }
  };

  const handleUpdateField = (name, property, value) => {
    const newListFields = [...ListFields];
    const field = newListFields.find((item) => item.name === name);
    field[property] = value;
    setListFields(newListFields);
  };

  const deleteFile = (item, index, file) => {
    const { name } = item;
    const { FileID } = file;

    if (FileID) {
      Modal.confirm({
        title: "Xóa tài liệu",
        content: "Bạn có muốn xóa tài liệu này không?",
        onOk: () => {
          const newListFields = [...ListFields];
          const field = newListFields.find((item) => item.name === name);

          field.LisXoaFileIds = [...(field?.LisXoaFileIds || []), FileID];
          field.ListFiles.splice(index, 1);
          setListFields(newListFields);
          const newListXoaFileIds = [...field.LisXoaFileIds];
          form.setFieldsValue({
            ListXoaFileIds: newListXoaFileIds,
          });
        },
      });
    } else {
      const newListFields = [...ListFields];
      const field = newListFields.find((item) => item.name === name);
      field.ListFiles.splice(index, 1);
      setListFields(newListFields);
    }
  };

  const beforeUploadFile = (file, callback, listFile, name, ListFiles = []) => {
    try {
      const newListFields = [...ListFields];
      handleUpdateField(name, "loadingFile", true);
      setListFields(newListFields);
      const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
      const isLt2M = file.size / 1024 / 1024 < FileLimit;
      const ListFileExist = [];
      listFile?.forEach((file) => {
        const ExistFile = ListFiles.filter(
          (item) => item.TenFileGoc === file.name
        );
        if (ExistFile.length) {
          ListFileExist.push(file);
        }
      });
      if (!isLt2M) {
        message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
      } else {
        getBase64(file, callback, listFile, name, ListFiles);
      }
      return false;
    } catch (error) {
      const newListFields = [...ListFields];
      handleUpdateField(name, "loadingFile", false);
      setListFields(newListFields);
    }
  };

  const dowloadFile = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url;
    a.click();
    a.remove();
  };

  const handleRenderItemField = (item, propertyMapping, col) => {
    switch (item.type || item.hidden) {
      case item.hidden === true:
        return (
          <Col {...col}>
            <Item {...propertyMapping}></Item>
          </Col>
        );
      case FORM.Input:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <Input {...item.props} />
            </Item>
          </Col>
        );
      case FORM.InputTextArea:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <TextArea {...item.props} />
            </Item>
          </Col>
        );
      case FORM.Select:
        const ListDisabled = item.name_not_equal
          ? ListFields.find((itemFind) => itemFind.name === item.name_not_equal)
              ?.ListSelected
          : [];
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <Select
                mode={item.multiple ? "multiple" : ""}
                {...item.props}
                onChange={(value) => {
                  if (item.name_not_equal) {
                    const newListFields = [...ListFields];
                    const field = newListFields.find(
                      (itemFind) => itemFind.name === item.name
                    );
                    if (item.multiple) {
                      field.ListSelected = value;
                    } else {
                      field.ListSelected = [value];
                    }
                    setListFields(newListFields);
                  }
                }}
              >
                {item &&
                  item.options &&
                  item.options.map((option) => (
                    <Option
                      key={option.ID}
                      value={option.ID}
                      disabled={ListDisabled?.includes(option.ID)}
                    >
                      {option.Ten}
                    </Option>
                  ))}
              </Select>
            </Item>
          </Col>
        );
      case FORM.DatePicker:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <DatePicker {...item.props} style={{ width: "100%" }} />
            </Item>
          </Col>
        );
      case FORM.Upload:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <Upload
                {...item.props}
                showUploadList={false}
                actions={false}
                multiple={true}
                beforeUpload={(file, listFile) => {
                  beforeUploadFile(
                    file,
                    genDataFileDinhKem,
                    listFile,
                    item.name,
                    item?.ListFiles || []
                  );
                }}
                disabled={item.loadingFile}
              >
                <Button
                  type="primary"
                  icon={<CloudUploadIcon />}
                  loading={item.loadingFile}
                >
                  Chọn tệp từ máy tính
                </Button>
              </Upload>

              {item && item?.ListFiles && item?.ListFiles.length > 0 && (
                <div className="list-file-upload">
                  {item?.ListFiles.map((file, index) => (
                    <div className="file-item" key={file.id}>
                      <a>{file.name || file.TenFile}</a>
                      {file.UrlFile && (
                        <DowloadIcon
                          onClick={() => dowloadFile(file.UrlFile)}
                        />
                      )}
                      <DeleteIcon
                        onClick={() => deleteFile(item, index, file)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Item>
          </Col>
        );
      case FORM.FromTimeToTime:
        return (
          <>
            <Col {...col}>
              <Item {...propertyMapping} label="Từ ngày" name="TuNgay">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Từ ngày"
                  format={"DD/MM/YYYY"}
                  disabledDate={(currentDate) =>
                    disabledDate(currentDate, form.getFieldValue("DenNgay"))
                  }
                ></DatePicker>
              </Item>
            </Col>
            <Col {...col}>
              <Item {...propertyMapping} label="Đến ngày" name="DenNgay">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Đến ngày"
                  format={"DD/MM/YYYY"}
                  disabledDate={(currentDate) => {
                    return disabledDate(
                      form.getFieldValue("TuNgay"),
                      currentDate,
                      2
                    );
                  }}
                ></DatePicker>
              </Item>
            </Col>
          </>
        );
      case FORM.Checkbox:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <Checkbox.Group {...item.props}>
                {item.options &&
                  item.options.map((option) => (
                    <Checkbox key={option.value} value={option.value}>
                      {option.label}
                    </Checkbox>
                  ))}
              </Checkbox.Group>
            </Item>
          </Col>
        );
      case FORM.Radio:
        return (
          <Col {...col}>
            <Item {...propertyMapping}>
              <Radio.Group {...item.props}>
                {item.options &&
                  item.options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
              </Radio.Group>
            </Item>
          </Col>
        );
    }
  };

  return (
    <FormStyle>
      <Form disabled={disabledAll} form={form} layout="vertical">
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <>
                  {ListFields &&
                    ListFields.map((item, index) => {
                      const col = item.col ? item.col : colDefault;
                      const propertyMapping = {
                        hidden: item.hidden,
                        name: item.name,
                        label: item.label,
                        rules: item.required ? [{ ...REQUIRED }] : [],
                      };
                      return handleRenderItemField(item, propertyMapping, col);
                    })}
                  {/* <Form.Item label="Name" name={[field.name, "name"]}>
                    <Input />
                  </Form.Item> */}
                </>
              ))}
            </div>
          )}
        </Form.List>
        <Row gutter={[15, 5]}></Row>
      </Form>
    </FormStyle>
  );
};

export default FormDynamic;
