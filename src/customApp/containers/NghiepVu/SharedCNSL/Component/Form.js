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
const FormDynamic = ({ form, listFields, data, keyRef }) => {
  const [ListFields, setListFields] = useState(listFields);
  const colDefault = {
    span: 24,
  };

  console.log(form, "form");

  useEffect(() => {
    setListFields(listFields);
  }, [listFields]);

  useEffect(() => {
    console.log("setFieldsValue", data);
    if (data) {
      const dataDatePicker = listFields.filter(
        (item) => item.type === FORM.DatePicker
      );
      const objectDatePicker = {};
      dataDatePicker.forEach((item) => {
        objectDatePicker[item.name] = dayjs(data[item.name]);
      });
      form.setFieldsValue({ ...data, ...objectDatePicker });
      const arrayProperties = Object.keys(data).filter((key) =>
        Array.isArray(data[key])
      );
      const newListFields = [...ListFields];
      arrayProperties.forEach((property) => {
        newListFields.find((item) => item.name === property).ListFileDinhKem =
          data[property];
        setListFields(newListFields);
      });
    } else {
      form.resetFields();
    }
  }, [data]);

  useEffect(() => {
    if (keyRef) {
      console.log("resetFields", keyRef);
      //   form.resetFields();
    }
  }, [keyRef]);

  const getBase64 = (file, callback, listFile, name) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile, name)
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKem = (base64, file, listFile, name) => {
    const newListFileDinhKem = [...listFile];
    const newListFields = [...ListFields];
    handleUpdateField(name, "ListFileDinhKem", newListFileDinhKem);
    handleUpdateField(name, "loadingFile", false);
    setListFields(newListFields);
    if (form) {
      //   const newData = {
      //     [name]: newListFileDinhKem,
      //   };
      //   form.setFieldsValue({
      //     ...newData,
      //   });
    }
  };

  const handleUpdateField = (name, property, value) => {
    const newListFields = [...ListFields];
    const field = newListFields.find((item) => item.name === name);
    field[property] = value;
    setListFields(newListFields);
  };

  const deleteFile = (name, index) => {
    const newListFields = [...ListFields];
    const field = newListFields.find((item) => item.name === name);
    field.ListFileDinhKem.splice(index, 1);
    setListFields(newListFields);
  };

  const beforeUploadFile = (
    file,
    callback,
    listFile,
    name,
    ListFileDinhKem = []
  ) => {
    try {
      const newListFields = [...ListFields];
      handleUpdateField(name, "loadingFile", true);
      setListFields(newListFields);
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
        getBase64(file, callback, listFile, name);
      }
      return false;
    } catch (error) {
      console.log("error", error);
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

  return (
    <FormStyle>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          {ListFields &&
            ListFields.map((item) => {
              const col = item.col ? item.col : colDefault;
              const propertyMapping = {
                hidden: item.hidden,
                name: item.name,
                label: item.label,
                rules: item.required ? [{ ...REQUIRED }] : [],
              };
              switch (item.type) {
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
                  return (
                    <Col {...col}>
                      <Item {...propertyMapping}>
                        <Select {...item.props}>
                          {item &&
                            item.options &&
                            item.options.map((option) => (
                              <Option key={option.value} value={option.value}>
                                {option.label}
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
                              item?.ListFileDinhKem || []
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

                        {item &&
                          item?.ListFileDinhKem &&
                          item?.ListFileDinhKem.length > 0 && (
                            <div className="list-file-upload">
                              {item?.ListFileDinhKem.map((file, index) => (
                                <div className="file-item" key={file.id}>
                                  <a>{file.name || file.TenFileGoc}</a>
                                  {file.FileUrl && (
                                    <DowloadIcon
                                      onClick={() => dowloadFile(file.FileUrl)}
                                    />
                                  )}
                                  <DeleteIcon
                                    onClick={() => deleteFile(item.name, index)}
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
                        <Item
                          {...propertyMapping}
                          label="Từ ngày"
                          name="TuNgay"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Từ ngày"
                            format={"DD/MM/YYYY"}
                            onChange={(value, valueStr) =>
                              onFilter(
                                value ? formatDate(value) : null,
                                "TuNgay"
                              )
                            }
                            disabledDate={(currentDate) =>
                              disabledDate(
                                currentDate,
                                form.getFieldValue("DenNgay")
                              )
                            }
                          ></DatePicker>
                        </Item>
                      </Col>
                      <Col {...col}>
                        <Item
                          {...propertyMapping}
                          label="Đến ngày"
                          name="DenNgay"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            onChange={(value, valueStr) =>
                              onFilter(
                                value ? formatDate(value) : null,
                                "DenNgay"
                              )
                            }
                            placeholder="Đến ngày"
                            format={"DD/MM/YYYY"}
                            disabledDate={(currentDate) =>
                              disabledDate(
                                form.getFieldValue("TuNgay"),
                                currentDate,
                                2
                              )
                            }
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
            })}
        </Row>
      </Form>
    </FormStyle>
  );
};

export default FormDynamic;
