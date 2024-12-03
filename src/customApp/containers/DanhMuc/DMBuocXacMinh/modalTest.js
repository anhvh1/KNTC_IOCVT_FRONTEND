import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Select,
  Checkbox,
  Upload,
  DatePicker,
  message,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT_SMALL_2,
  ITEM_LAYOUT_HALF,
  REQUIRED,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  ITEM_LAYOUT3,
} from '../../../../settings/constants';
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseSquareOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import moment, {now} from 'moment';
import {Flex} from './styled';
import api from './config';
import {useSelector} from 'react-redux';

const dateFormat = 'YYYY-MM-DD';

let fileInfo = '';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  list,
  ...restProps
}) => {
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange({file, fileList}) {
      if (file.status !== 'uploading') {
        fileInfo = file;
      }
    },
  };

  const [checkInputName, setCheckInputName] = useState(Boolean(false));
  let inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  const CheckEnterName = (e) => {
    setCheckInputName(e.target.checked);
  };

  switch (dataIndex) {
    case 'TenFile': {
      inputNode = (
        <Flex>
          <Form.Item
            name={dataIndex}
            style={{width: '80%', marginRight: '10px'}}
            rules={[REQUIRED]}
          >
            {checkInputName === true ? (
              <Input />
            ) : (
              <Select placeholder="Chọn tên file">
                {list.map((val, index) => {
                  return (
                    <Option key={index} value={val.TenFile}>
                      {val.TenFile}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Checkbox onChange={CheckEnterName} style={{width: '25%'}}>
            Nhập tên file
          </Checkbox>
        </Flex>
      );
      break;
    }
    case 'FileURL': {
      inputNode = (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          valuePropName="file"
          rules={[REQUIRED]}
        >
          {false ? (
            <div>
              <DownloadOutlined
                style={{
                  marginLeft: '15px',
                  fontSize: '20px',
                  color: '#1890ff',
                }}
              />
            </div>
          ) : (
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Tải File lên</Button>
            </Upload>
          )}
        </Form.Item>
      );
      break;
    }

    case 'NgayUp': {
      inputNode = (
        <Form.Item name={dataIndex}>
          <DatePicker format={dateFormat} defaultValue={moment()} />
        </Form.Item>
      );
      break;
    }
  }
  return <td {...restProps}>{editing ? inputNode : children}</td>;
};

const index = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [checkSave, setCheckSave] = useState();

  useEffect(() => {
    if (action === 'edit') {
      setDataSource(
        file.map((item, index) => {
          let newItem = {...item};
          newItem.key = index;
          newItem.NgayUp = moment(newItem.NgayUp).format(dateFormat);
          return newItem;
        }),
      );
    }
  }, [props.file]);

  const PageSize = 10;
  const PageNumber = 1;
  const {file, list, action, idDS, setTrainForm, idFile, setFileMauList} =
    props;

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    let ngayup = moment();
    if (record.NgayUp) ngayup = moment(record.NgayUp, dateFormat);
    form.setFieldsValue({
      TenFile: '',
      ...record,
      FileURL: fileInfo,
      NgayUp: ngayup,
    });
    setEditingKey(record.key);
    setCheckSave(true);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      if (action === 'add') {
        const convertData = {
          ...row,
          FileURL: row.FileURL.file.name || '',
          TenGoc: row.FileURL.file.name || '',
          NgayUp: row.NgayUp.format('YYYY-MM-DD'),
          key: record.key,
        };

        setFileMauList((pre) => [
          ...pre,
          {
            key: record.key,
            TenFile: row.TenFile,
            TenFileGoc: row.FileURL.file.name,
            FileURL: row.FileURL.file.name,
          },
        ]);
        setTrainForm((pre) => [
          ...pre,
          {
            file: row.FileURL.file.originFileObj,
            key: record.key,
          },
        ]);
        let newData = [...dataSource];
        const index = newData.findIndex((item) => record.key === item.key);
        if (index > -1) {
          newData = newData.map((item) =>
            item.key === record.key ? convertData : item,
          );
          setDataSource(newData);
          setEditingKey('');
        } else {
          newData.push(convertData);
          setDataSource(newData);
          setEditingKey('');
        }
      }
      if (action === 'edit') {
        const convertData = {
          ...row,
          FileURL: row.FileURL.file.name,
          NgayUp: moment(row.NgayUp).format('YYYY-MM-DD'),
          key: record.key,
        };
        setFileMauList((pre) => [
          ...pre,
          {
            key: record.key,
            TenFile: row.TenFile,
            TenFileGoc: row.FileURL.file.name,
            FileURL: row.FileURL.file.name,
          },
        ]);
        setTrainForm((pre) => [
          ...pre,
          {
            file: row.FileURL.file.originFileObj,
            key: record.key,
          },
        ]);
        if (checkSave === false || !record.FileDanhMucBuocXacMinhID) {
          const data = new FormData();

          data.append('files', row.FileURL.file.originFileObj);
          data.append(
            'FileDMBuocXacMinhMODStr',
            JSON.stringify({
              themMoiFileMOD: [
                {
                  TenFile: row.TenFile,
                  TenFileGoc: row.FileURL.file.name,
                  FileURL: row.FileURL.file.name,
                  NgayUp: moment(row.NgayUp).format('YYYY-MM-DD'),
                  DMBuocXacMinhID: idDS,
                  BuocXacMinhID: idDS,
                },
              ],
            }),
          );
          await api
            .THemFile(data)
            .then((res) => {
              if (res.data.Status > 0) {
                let newData = [...dataSource];
                const index = newData.findIndex(
                  (item) =>
                    record.FileDanhMucBuocXacMinhID ===
                    item.FileDanhMucBuocXacMinhID,
                );
                if (index > -1) {
                  newData = newData.map((item) =>
                    item.key === record.key ? convertData : item,
                  );
                  setDataSource(newData);
                  setEditingKey('');
                } else {
                  newData.push(convertData);
                  setDataSource(newData);
                  setEditingKey('');
                }
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
        }
        if (record.FileDanhMucBuocXacMinhID) {
          const dataForm = new FormData();
          dataForm.append('UploadFile', row.FileURL.file.originFileObj);
          dataForm.append(
            'CapNhatFileStr',
            JSON.stringify({
              FileDanhMucBuocXacMinhID: record.FileDanhMucBuocXacMinhID,
              TenFile: row.TenFile,
              TenFileGoc: row.FileURL.file.name,
              FileURL: row.FileURL.file.name,
              NgayUp: moment(row.NgayUp).format('YYYY-MM-DD'),
            }),
          );

          await api
            .CapNhatFile(dataForm)
            .then((res) => {
              if (res.data.Status > 0) {
                let newData = [...dataSource];
                const index = newData.findIndex(
                  (item) => record.key === item.key,
                );
                if (index > -1) {
                  newData = newData.map((item) =>
                    item.key === record.key ? convertData : item,
                  );
                  setDataSource(newData);
                  setEditingKey('');
                } else {
                  newData.push(convertData);
                  setDataSource(newData);
                  setEditingKey('');
                }
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
        }
      }
    } catch (errInfo) {}
  };
  const dowloadFileMau = (record) => {
    let fileName = record.FileURL.split('\\').pop();
    window.open(
      `https://kntcv2devapi.gosol.com.vn/api/v2/DanhMucBuocXacMinh/Download?FileName=${fileName}`,
    );
    message.success('Tải file thành công');
  };

  const columns = [
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên file mẫu',
      dataIndex: 'TenFile',
      width: '40%',
      editable: true,
    },
    {
      title: 'File mẫu',
      dataIndex: 'FileURL',
      align: 'center',
      width: '25%',
      editable: true,
      render: (text, record) => (
        <>
          {record.FileURL} <br></br>
          <DownloadOutlined
            style={{color: '#1890ff', fontSize: '20px'}}
            onClick={() => dowloadFileMau(record)}
          />
        </>
      ),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'NgayUp',
      width: '20%',
      align: 'center',
      editable: true,
      render: (text, record) => moment(record.NgayUp).format(dateFormat),
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
                fontSize: '25px',
              }}
            >
              <SaveOutlined />
            </Typography.Link>
            <Popconfirm title="Bạn có chắc chắn hủy?" onConfirm={cancel}>
              <CloseSquareOutlined style={{fontSize: '25px', color: 'red'}} />
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              style={{
                marginRight: 8,
                fontSize: '25px',
                color: 'black',
              }}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Typography.Link>
            <Popconfirm
              title="Bạn có chắc chắn xóa?"
              disabled={dataSource.length <= 0}
              onConfirm={() => handleDeleteAdd(record)}
            >
              <DeleteOutlined style={{fontSize: '25px'}} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        list,
      }),
    };
  });

  const handleAdd = () => {
    const newData = {
      key: dataSource.length,
      TenFile: '',
      FileURL: '',
      NgayUp: moment(),
    };
    edit(newData);
    setDataSource([...dataSource, newData]);
    setCount((pre) => pre + 1);
    setCheckSave(false);
  };

  const handleDeleteAdd = (record) => {
    let id = record.FileDanhMucBuocXacMinhID;
    if (!id) {
      const newData = dataSource.filter((item) => item.key !== record.key);
      message.success('Xóa file thành công!');
      setDataSource(newData);
    } else {
      try {
        api.XoaFile(id).then((res) => {
          if (res.data.Status > 0) {
            const newData = dataSource.filter(
              (item) => item.key !== record.key,
            );
            message.success(res.data.Message);
            setDataSource(newData);
          } else {
            message.error(res.data.Message);
          }
        });
      } catch (error) {
        message.error('Loi he thong');
      }
    }
  };

  return (
    <Form form={form} component={false}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        disabled={editingKey !== ''}
      >
        Thêm file mẫu
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default index;
