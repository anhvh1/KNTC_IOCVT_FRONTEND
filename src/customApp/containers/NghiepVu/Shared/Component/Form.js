import { customizeItemValidator as Item } from "../../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../../components/uielements/formValidator";
import { FORM } from "../../../../../settings/constants";
import { REQUIRED } from "../../../../../settings/constants";
import React, { useRef } from "react";
import { message } from "antd";
import Upload from "../../../../../components/uielements/upload";
import {
  Input,
  Select,
  DatePicker,
  Button,
  InputNumberFormat,
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
import { Modal } from "antd";
import CloudUploadIcon from "../../../../../components/utility/CloudUploadIcon";
const FormDynamic = (props) => {
  const {
    listFields,
    data,
    keyRef,
    disabledAll,
    name,
    prefixName,
    onRemoveFile,
    isNotClearData,
  } = props;
  const [formDefault] = useForm();
  const form = props.form || formDefault;
  const [ListFields, setListFields] = useState(listFields);
  const [internalProps, setInternalProps] = useState(props);
  const colDefault = {
    span: 24,
  };

  const nameFieldWrap = ListFields.find((itemFind) => itemFind.isWrap)?.name;
  const propsRef = useRef(props);
  // useEffect(() => {
  //   // if (ListFields.length === 0) {
  //   setListFields([...listFields]);
  //   // }
  // }, [listFields]);

  // useEffect(() => {}, [listFields]);

  useEffect(() => {
    propsRef.current = props;
    setInternalProps(props);
  }, []);

  const assignPrefixName = (data) => {
    const dataDatePicker = listFields.filter(
      (item) => item.type === FORM.DatePicker
    );
    if (data) {
      const result = {};
      for (const [key, value] of Object.entries(data)) {
        if (dataDatePicker.find((item) => item.name === key)) {
          // result[key] = value ? dayjs(value) : null;
          if (prefixName) {
            result[`${prefixName}${key}`] = value ? dayjs(value) : null;
          } else {
            result[key] = value ? dayjs(value) : null;
          }
        } else {
          if (prefixName) {
            result[`${prefixName}${key}`] = value;
          } else {
            result[key] = value;
          }
        }
      }
      return result;
    } else {
      return data;
    }
  };

  const checkData = () => {
    const listFieldsRequired = ListFields.filter((item) => item.required);

    if (listFieldsRequired.length > 0 && data) {
      const check = listFieldsRequired.every((item) => {
        if (item.name === "FromTimeToTime") {
          return data?.TuNgay && data?.DenNgay;
        } else {
          return data[item?.name];
        }
      });
      return check;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (form) {
      if (checkData() && data) {
        const dataDatePicker = listFields.filter(
          (item) => item.type === FORM.DatePicker
        );
        const checkFromTimeToTime = listFields.find(
          (item) => item.type === FORM.FromTimeToTime
        );
        if (checkFromTimeToTime) {
          dataDatePicker.push({
            name: "TuNgay",
          });
          dataDatePicker.push({
            name: "DenNgay",
          });
        }

        const objectDatePicker = {};
        dataDatePicker.forEach((item) => {
          if (data[item.name]) {
            objectDatePicker[item.name] = data[item.name]
              ? dayjs(data[item.name])
              : null;
          }
        });
        const totalData = { ...data, ...objectDatePicker };

        form.setFieldsValue(assignPrefixName(totalData));

        function convertData(inputData) {
          if (
            inputData &&
            typeof inputData === "object" &&
            !Array.isArray(inputData)
          ) {
            const result = {};

            for (const [key, value] of Object.entries(inputData)) {
              if (key.includes("__")) {
                const [objectName, propertyName] = key.split("__");
                if (!result[objectName]) {
                  result[objectName] = {};
                }
                result[objectName][propertyName] = value;
              } else {
                result[key] = value;
              }
            }

            return result;
          }
          return inputData; // Return the input as-is if it's not an object or is an array
        }
        const newData = convertData(data);
        const arrayProperties = Object.keys(newData).filter((key) =>
          Array.isArray(newData[key])
        );

        const ListFiles =
          newData.ListFile || newData.ListFiles?.fileList || newData.ListFiles;

        const { index } = props;
        const newListFields = [...listFields];

        if (ListFiles?.length > 0) {
          if (newListFields.find((item) => item.name === "ListFiles")) {
            newListFields.find((item) => item.name === "ListFiles").ListFiles =
              ListFiles;
          }

          if (prefixName) {
            form.setFieldsValue({
              [`${prefixName}ListFiles`]: ListFiles,
            });
          } else {
            form.setFieldsValue({
              ListFiles: ListFiles,
            });
          }

          setListFields(newListFields);
        } else {
          const ListFile = newListFields.find(
            (item) => item.name === "ListFiles"
          );
          if (ListFile) {
            if (prefixName) {
              form.setFieldsValue({
                [`${prefixName}ListFiles`]: ListFiles,
              });
            } else {
              form.setFieldsValue({
                ListFiles: ListFiles,
              });
            }
            ListFile.ListFiles = [];
            setListFields(newListFields);
          }
        }

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
        if (form && !isNotClearData) {
          const dataNull = {};
          listFields.forEach((item) => {
            if (prefixName) {
              dataNull[`${prefixName}${item.name}`] = null;
            } else {
              dataNull[item.name] = null;
            }
          });
          const checkFromTimeToTime = listFields.find(
            (item) => item.type === FORM.FromTimeToTime
          );
          if (checkFromTimeToTime) {
            dataNull.TuNgay = null;
            dataNull.DenNgay = null;
          }

          const newListFields = [...ListFields];
          const ListFile = newListFields.find(
            (item) => item.name === "ListFiles"
          );
          if (ListFile) {
            ListFile.ListFiles = null;
            setListFields(newListFields);
          }
          // else {
          //   setListFields([]);
          // }
          form.setFieldsValue({ ...dataNull, ...assignPrefixName(data) });
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
    if (nameFieldWrap) {
      form.setFieldsValue({
        [`${prefixName}${name}`]: newListFiles,
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

          if (field) {
            field.ListXoaFileIds = [...(field?.ListXoaFileIds || []), FileID];
            if (!field.ListFiles) {
              field.ListFiles = [...(data.ListFile || data.ListFields)];
            }
            field.ListFiles.splice(index, 1);
            if (field.ListFiles) {
              if (onRemoveFile) {
                onRemoveFile(field.ListFiles[index]);
              }
              setListFields(newListFields);
              const newListXoaFileIds = [...field.ListXoaFileIds];

              form.setFieldsValue({
                ListXoaFileIds: newListXoaFileIds,
                [name]: field.ListFiles,
              });
              if (nameFieldWrap) {
                form.setFieldsValue({
                  [`${prefixName}${name}`]: field.ListFiles,
                  [`${prefixName}${newListXoaFileIds}`]: newListXoaFileIds,
                });
              }
            }
          }
        },
      });
    } else {
      const newListFields = [...ListFields];
      const field = newListFields.find((item) => item.name === name);
      if (field.ListFiles) {
        if (onRemoveFile) {
          onRemoveFile(field.ListFiles[index]);
        }
        field.ListFiles.splice(index, 1);
        form.setFieldsValue({
          [name]: field.ListFiles,
        });
        setListFields(newListFields);
      }
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

  const isEqual = (obj1, obj2) => {
    // Nếu cả hai đều là đối tượng
    if (
      typeof obj1 === "object" &&
      typeof obj2 === "object" &&
      obj1 !== null &&
      obj2 !== null
    ) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // Nếu số lượng thuộc tính không bằng nhau, không bằng
      if (keys1.length !== keys2.length) return false;

      // Kiểm tra từng thuộc tính
      for (let key of keys1) {
        if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    }

    // Nếu là giá trị không phải đối tượng, so sánh trực tiếp
    return obj1 === obj2;
  };

  const compareArrays = (arr1, arr2) => {
    if (arr1 && arr2) {
      if (arr1.length !== arr2.length) return false;

      // Sắp xếp hai mảng trước khi so sánh (nếu không cần quan tâm đến thứ tự)
      const sortedArr1 = arr1.sort((a, b) => a.FileID - b.FileID);
      const sortedArr2 = arr2.sort((a, b) => a.FileID - b.FileID);

      // So sánh từng phần tử trong mảng
      return sortedArr1.every((item, index) =>
        isEqual(item, sortedArr2[index])
      );
    }
  };

  const checkChanges = () => {
    const currentValues = form.getFieldsValue();
    let isChanged = false;

    listFields.forEach((field) => {
      if (!field.hidden) {
        const fieldName = !prefixName
          ? field.name
          : `${prefixName}${field.name}`;
        // Lấy giá trị của trường hiện tại từ form và từ initialData
        const formValue = currentValues[fieldName];
        const initialValue = data ? data[field.name] : null;
        if (field.type === FORM.DatePicker) {
          const formatDateValue = formValue
            ? dayjs(formValue, "YYYY-MM-DD")
            : null;
          const formatInitValue = initialValue
            ? dayjs(initialValue, "YYYY-MM-DD")
            : null;
          if (!formatDateValue?.isSame(formatInitValue)) {
            console.log(
              `Field ${fieldName} đã thay đổi ${formatDateValue} - ${formatInitValue}`
            );
            isChanged = true;
          }
        } else if (field.type === FORM.Upload) {
          if (!compareArrays(formValue, initialValue)) {
            console.log(`Field ${fieldName} đã thay đổi`);
          }
        }
        // So sánh giá trị để kiểm tra xem có thay đổi không
        else if (formValue !== initialValue) {
          console.log(`Field ${fieldName} đã thay đổi`);
          isChanged = true;
        }
      }
    });

    return isChanged;
  };

  return (
    <FormStyle>
      <Form
        disabled={disabledAll}
        form={form}
        layout="vertical"
        name={name}
        onValuesChange={(changedFields, allFields) => {
          console.log(checkChanges(), "checkChanges");
          const { onChangeForm } = props;
          if (onChangeForm) {
            if (onChangeForm && checkChanges()) {
              onChangeForm(true);
            } else {
              onChangeForm(false);
            }
          }
        }}
      >
        <Row gutter={[15, 5]}>
          {ListFields &&
            ListFields.map((item, index) => {
              const col = item.col ? item.col : colDefault;
              const propertyMapping = {
                hidden: item.hidden,
                name: prefixName ? `${prefixName}${item.name}` : item.name,
                label: item.label,
                rules: item.required ? [{ ...REQUIRED }] : [],
              };
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
                case FORM.InputNumber:
                  return (
                    <Col {...col}>
                      <Item {...propertyMapping}>
                        <InputNumberFormat {...item.props} />
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
                    ? ListFields.find(
                        (itemFind) => itemFind.name === item.name_not_equal
                      )?.ListSelected
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
                            item.options.map((option) => {
                              return (
                                <Option
                                  key={option.ID}
                                  value={option.ID}
                                  disabled={ListDisabled?.includes(option.ID)}
                                >
                                  {option.Ten ? option.Ten : "Không có dữ liệu"}
                                </Option>
                              );
                            })}
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
                  const listUpload = item?.ListFiles;
                  return (
                    <Col {...col}>
                      <Item {...propertyMapping}>
                        <Upload
                          {...item.props}
                          showUploadList={false}
                          action={false}
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

                        {item && listUpload && listUpload.length > 0 && (
                          <div className="list-file-upload">
                            {listUpload.map((file, index) => (
                              <div className="file-item" key={file.id}>
                                <a href={file.UrlFile} target="_blank">
                                  {file.name || file.TenFile}
                                </a>
                                {/* {file.UrlFile && (
                                    <DowloadIcon
                                      onClick={() => dowloadFile(file.UrlFile)}
                                    />
                                  )} */}
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
                        <Item
                          {...propertyMapping}
                          label="Từ ngày"
                          name="TuNgay"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Từ ngày"
                            format={"DD/MM/YYYY"}
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
            })}
        </Row>
      </Form>
    </FormStyle>
  );
};

export default React.memo(FormDynamic);
