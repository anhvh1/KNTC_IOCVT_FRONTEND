import React, {Component, useRef} from 'react';
import {
  Col,
  Form,
  Icon,
  Input,
  message,
  Row,
  Upload,
  Checkbox,
  Radio,
  DatePicker,
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import styled from 'styled-components';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
  ITEM_LAYOUT_NEW,
} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import dayjs from 'dayjs';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

const {Item} = Form;
class ModalAddEditHoSoTaiLieu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListFileDinhKem: [],
      FileDinhKemDelete: [],
      DanhSachFileTaiLieu: [],
      FileDinhKemDeleteTemp: [],
      fileView: {},
      fileKey: 0,
      loading: false,
      isFile: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if ((dataEdit && dataEdit.TenFile) || (dataEdit && dataEdit.FileDinhKem)) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          TenFile: dataEdit.TenFile,
          NgayCapNhat: dataEdit?.NgayCapNhat
            ? dayjs(dataEdit.NgayCapNhat)
            : null,
        });
      this.setState({ListFileDinhKem: dataEdit.FileDinhKem});
    } else {
      if (this.formRef && this.formRef.current) {
        this.formRef.current.setFieldsValue({
          NgayCapNhat: dayjs(),
        });
      }
    }
  }

  beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey('data_config')?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const {ListFileDinhKem} = this.state;
    const ListFileExist = [];
    listFile.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name,
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      this.getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result, file, listFile),
    );
    reader.readAsDataURL(file);
    // })
  };

  genDataFileDinhKem = (base64, file, listFile) => {
    const {ListFileDinhKem} = this.state;
    const newListFileDinhKem = [...ListFileDinhKem, ...listFile];
    // newListFileDinhKem.push(file);

    this.setState({ListFileDinhKem: newListFileDinhKem, isFile: false});
  };

  deteleFile = (item, index) => {
    const {ListFileDinhKem} = this.state;
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...ListFileDinhKem];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          // ListFileDinhKem[index] = item;
          this.setState({
            ListFileDinhKem: newArr,
            isFalseFile: false,
            messErr: '',
          });
        },
      });
    } else {
      ListFileDinhKem.splice(index, 1);
      this.setState({
        ListFileDinhKem,
        isFalseFile: false,
        messErr: '',
      });
    }
  };

  onOk = async () => {
    const {ListFileDinhKem} = this.state;
    const {onCreate, dataEdit} = this.props;
    // if (!(ListFileDinhKem && ListFileDinhKem.length)) {
    //   this.setState({isFile: true});
    // }
    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          FileDinhKem: ListFileDinhKem,
          TenFile: FormValue?.TenFile,
          index: dataEdit?.index,
        };
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  render() {
    const {
      dataEdit,
      title,
      visible,
      onCreate,
      fileKey,
      onCancel,
      DanhSachTenFile,
      DanhSachCanBoXuLy,
    } = this.props;
    const {ListFileDinhKem, loading, isFile} = this.state;
    return (
      <Modal
        title={
          dataEdit && dataEdit.TenFile
            ? 'Sửa file tài liệu'
            : 'Thêm mới file tài liệu'
        }
        visible={visible}
        footer={
          <>
            <Button onClick={() => onCancel()}>Đóng</Button>
            <Button type="primary" onClick={this.onOk}>
              Lưu
            </Button>
          </>
        }
        width={800}
        onCancel={() => onCancel()}
        key={fileKey}
      >
        <Wrapper>
          <Form ref={this.formRef}>
            <Item
              label={'Tên hồ sơ/tài liệu'}
              name="TenFile"
              // {...ITEM_LAYOUT_NEW}
              rules={[{...REQUIRED}]}
              className="ant-form-title__left"
            >
              <Input style={{width: '100%'}} />
            </Item>
            <div className="wrapper-file">
              <Upload
                showUploadList={false}
                multiple={true}
                beforeUpload={(file, listFile) =>
                  this.beforeUploadFile(file, this.genDataFileDinhKem, listFile)
                }
                // accept={".pdf, .doc, .docx"}
                disabled={loading}
              >
                <Button
                  type={'primary'}
                  loading={loading}
                  className="btn-upload"
                >
                  Chọn file từ liệu từ máy tính
                </Button>
              </Upload>
            </div>
            {ListFileDinhKem && ListFileDinhKem?.length ? (
              <div style={{marginTop: '10px'}} className={'box-file'}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '5%'}}>STT</th>
                      <th style={{width: '30%'}}>File đính kèm</th>
                      <th style={{width: '10%', textAlign: 'center'}}>
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ListFileDinhKem.map((item, index) => (
                      <tr>
                        <td style={{textAlign: 'center'}}>{index + 1}</td>
                        <td>{item?.name || item?.TenFile}</td>
                        <td style={{textAlign: 'center'}}>
                          <span>
                            <Tooltip title={'Xóa file'}>
                              <DeleteOutlined
                                onClick={() => this.deteleFile(item, index)}
                              />
                            </Tooltip>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ''
            )}
            {isFile ? (
              <span style={{color: 'red', marginLeft: '5px'}}>
                Vui lòng chọn file đính kèm
              </span>
            ) : (
              ''
            )}
          </Form>
        </Wrapper>
      </Modal>
    );
  }
}

const Wrapper = styled.div`
  .wrapper-file {
    text-align: right;
  }
  .ant-upload {
    margin: 10px 0;
    /* float: right; */
  }
  .box-file {
    max-height: 500px;
    overflow: scroll;
    table thead {
      position: sticky;
      top: 0;
      z-index: 1111;
      background: #fff;
    }
    table {
      width: 100%;
      position: relative;
      border-collapse: collapse;
    }
    table tr th {
      border: 1px solid #d7d7d7;
    }
    table tr td {
      border: 1px solid #d7d7d7;
    }
  }
  .ant-form-title__left {
    margin-bottom: 0;
    .ant-form-item-row {
      display: grid !important;
    }
    .ant-form-item-label {
      text-align: left;
    }
    .ant-form-item-row {
      width: 100%;
    }
    .ant-form-item-control-input-content {
      width: 100%;
      /* width: 450px; */
      input {
        height: 30px;
      }
    }
  }
`;

export default ModalAddEditHoSoTaiLieu;
