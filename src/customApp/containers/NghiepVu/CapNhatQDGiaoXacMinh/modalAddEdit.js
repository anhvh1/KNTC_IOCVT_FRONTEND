import React, {Component, useEffect, useRef, useState} from 'react';
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
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import Wrapper from './modalAddEdit.styled';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
  ITEM_LAYOUT_NEW,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  COL_ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {
  formatDate,
  getValueConfigLocalByKey,
} from '../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';

import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {StateHoSoTaiLieu} from '../Shared/State/HoSoTaiLieu';
const {Item} = Form;
const ModalAddEdit = (props) => {
  const [
    visibleModalHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    DanhSachHoSoTaiLieu,
    showModalHoSoTaiLieu,
    closeModalHoSoTaiLieu,
    submitModalHoSoTaiLieu,
    deteleFile,
    onChangeHoSoTaiLieu,
  ] = StateHoSoTaiLieu();
  const [DanhSachCoQuanPhoiHop, setDanhSachCoQuanPhoiHop] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.XuLyDonID) {
      formRef &&
        formRef.current.setFieldsValue({
          ...dataEdit,
          HanGiaiQuyet: dataEdit.HanGiaiQuyet
            ? dayjs(dataEdit.HanGiaiQuyet)
            : null,
          NgayQuyetDinh: dataEdit.NgayQuyetDinh
            ? dayjs(dataEdit.NgayQuyetDinh)
            : null,
        });
      onChangeHoSoTaiLieu({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
      setDanhSachCoQuanPhoiHop(
        dataEdit.CQPhoiHopGQ ? dataEdit.CQPhoiHopGQ : [],
      );
    }
  }, []);

  const onOk = async () => {
    const {onCreate, dataEdit} = props;
    formRef.current
      .validateFields()
      .then((value) => {
        const newValue = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu?.filter(
            (item) => !item?.GroupID,
          ),
          CQPhoiHopGQ: DanhSachCoQuanPhoiHop,
          ...value,
          type: dataEdit?.type,
        };
        newValue.HanGiaiQuyet = formatDate(newValue.HanGiaiQuyet);
        newValue.NgayQuyetDinh = formatDate(newValue.NgayQuyetDinh);

        for (const key in newValue) {
          if (!newValue[key]) {
            delete newValue[key];
          }
        }
        onCreate(newValue);
      })
      .catch((err) => console.log('errr', err));
  };

  const deleteCoQuanPhoiHop = (index) => {
    ModalAnt.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa cơ quan này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        // loop another coquan and add coquan remove to danhsachcoquan
        const {DanhSachCoQuan} = props;
        const newDanhSachCoQuanPhoiHop = [...DanhSachCoQuanPhoiHop];
        if (newDanhSachCoQuanPhoiHop) {
          const coquanDelete = newDanhSachCoQuanPhoiHop[index];
          newDanhSachCoQuanPhoiHop
            .filter((item, indexCoQuan) => indexCoQuan !== index)
            .forEach((anotherCoQuan) => {
              if (anotherCoQuan['DanhSachCoQuan']) {
                const newDanhSachCoQuan = [...anotherCoQuan['DanhSachCoQuan']];
                newDanhSachCoQuan.push(
                  DanhSachCoQuan.find(
                    (item) => item?.CoQuanID === coquanDelete?.CQPhoiHopID,
                  ),
                );
                const sortArr = newDanhSachCoQuan?.sort((a, b) =>
                  a?.TenCoQuan?.localeCompare(b?.TenCoQuan),
                );
                anotherCoQuan['DanhSachCoQuan'] = sortArr;
              }
            });
          newDanhSachCoQuanPhoiHop?.splice(index, 1);
          setDanhSachCoQuanPhoiHop(newDanhSachCoQuanPhoiHop);
        }
      },
    });
  };

  const addCoQuanPhoiHop = (index) => {
    const {DanhSachCoQuan} = props;
    const newDanhSachCoQuanPhoiHop = [...DanhSachCoQuanPhoiHop];
    const listCoQuanExist = [];
    newDanhSachCoQuanPhoiHop.forEach((item) => {
      listCoQuanExist.push(item.CQPhoiHopID);
    });
    newDanhSachCoQuanPhoiHop.push({
      DanhSachCoQuan: DanhSachCoQuan.filter(
        (item) => !listCoQuanExist.includes(item?.CoQuanID),
      ),
    });
    setDanhSachCoQuanPhoiHop(newDanhSachCoQuanPhoiHop);
  };

  const changeCoQuanPhoiHop = (index, value) => {
    const {DanhSachCoQuan} = props;
    const newDanhSachCoQuanPhoiHop = [...DanhSachCoQuanPhoiHop];
    newDanhSachCoQuanPhoiHop[index]['CQPhoiHopID'] = value;
    // getListCoQuanExistOld
    const listCoQuanExist = [];
    newDanhSachCoQuanPhoiHop.forEach((item) => {
      if (item.CQPhoiHopID) {
        listCoQuanExist.push(item.CQPhoiHopID);
      }
    });
    // asign agian DanhSachCoQuan of another CoQuan
    newDanhSachCoQuanPhoiHop
      .filter((item, indexCoQuan) => item.CQPhoiHopID !== value)
      .forEach((anotherCoQuan) => {
        const currentCoQuan = DanhSachCoQuan.find(
          (item) => item?.CoQuanID === anotherCoQuan?.CQPhoiHopID,
        );
        const newCoQuan = [
          ...DanhSachCoQuan.filter(
            (item) => !listCoQuanExist.includes(item?.CoQuanID),
          ),
        ];
        if (currentCoQuan) {
          newCoQuan.push(currentCoQuan);
        }
        const sortArr = newCoQuan?.sort((a, b) =>
          a?.TenCoQuan?.localeCompare(b?.TenCoQuan),
        );
        anotherCoQuan['DanhSachCoQuan'] = sortArr;
      });
    setDanhSachCoQuanPhoiHop(newDanhSachCoQuanPhoiHop);
  };

  const {
    dataEdit,
    visible,
    fileKey,
    onCancel,
    DanhSachCoQuan,
    loading,
    TitleModal,
    checkCTHuyen,
  } = props;

  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;
  return (
    <Modal
      title={TitleModal ? TitleModal : 'Cập nhật văn bản giao xác minh'}
      visible={visible}
      className="center-modal__footer"
      footer={
        !isViewDetails ? (
          <>
            <Button
              type="primary"
              onClick={() => onOk()}
              loading={loading}
              icon={<SaveOutlined />}
            >
              Lưu
            </Button>
            <Button
              className="btn-danger"
              onClick={() => onCancel()}
              loading={loading}
            >
              Hủy
            </Button>
          </>
        ) : (
          <>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Đóng
            </Button>
          </>
        )
      }
      width={800}
      padding={0}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef}>
          <div className="modal-wrapper">
            {isViewDetails ? (
              <div className="info-wrapper">
                <p className="title">Thông tin chung</p>
                <div className="wrapper-top__info">
                  <p>Số văn bản: {dataEdit?.SoQuyetDinh}</p>
                  <p>
                    Ngày văn bản:{' '}
                    {dataEdit?.NgayQuyetDinh
                      ? dayjs(dataEdit?.NgayQuyetDinh).format('DD/MM/YYYY')
                      : ''}
                  </p>
                  <p>Người ban hành: {dataEdit?.QuyetDinh}</p>
                </div>
                <div className="line-break" />
                <p className="title">Cơ quan thực hiện xác minh</p>
                {/* {DanhSachCoQuanPhoiHop && DanhSachCoQuanPhoiHop?.length ? ( */}
                <div style={{marginTop: '10px'}} className={'box-file'}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: '5%'}}>STT</th>
                        <th style={{width: '30%'}}>Tên cơ quan</th>
                        <th style={{width: '30%'}}>Vai trò</th>
                      </tr>
                    </thead>
                    {dataEdit?.CoQuanID ? (
                      <tbody>
                        <tr>
                          <td style={{textAlign: 'center'}}>{1}</td>
                          <td>
                            {dataEdit?.CoQuanID
                              ? DanhSachCoQuan.find(
                                  (coquan) =>
                                    coquan.CoQuanID === dataEdit?.CoQuanID,
                                )?.TenCoQuan
                              : null}
                          </td>
                          <td>Chủ trì</td>
                        </tr>
                      </tbody>
                    ) : null}
                    {DanhSachCoQuanPhoiHop.map((item, index) => {
                      return (
                        <tbody>
                          <tr>
                            <td style={{textAlign: 'center'}}>{index + 2}</td>
                            <td>
                              {item?.CQPhoiHopID
                                ? DanhSachCoQuan.find(
                                    (coquan) =>
                                      coquan.CoQuanID === item.CQPhoiHopID,
                                  )?.TenCoQuan
                                : null}
                            </td>
                            <td>Phụ trách</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                {/* ) : (
                    ''
                  )} */}
                <div className="line-break" />
                <div className="info-sub">
                  <p>
                    Hạn giải quyết:{' '}
                    {dataEdit?.HanGiaiQuyet
                      ? dayjs(dataEdit?.HanGiaiQuyet).format('DD/MM/YYYY')
                      : null}
                  </p>
                  <p>Ghi chú: {dataEdit?.GhiChu}</p>
                </div>
                <div className="line-break" />
                <p className="title">Hồ sơ, tài liệu</p>
              </div>
            ) : (
              <></>
            )}

            {!isViewDetails ? (
              <>
                {!checkCTHuyen ? (
                  <>
                    <div className="title-wrapper">
                      <p className="title">Thông tin chung: </p>
                    </div>
                    <Row gutter={[10, 10]}>
                      <Col lg={6} xs={12}>
                        <Item
                          label="Sổ văn bản"
                          name="SoQuyetDinh"
                          className="ant-form-title__left"
                        >
                          <Input />
                        </Item>
                      </Col>
                      <Col lg={6} xs={12}>
                        <Item
                          label="Ngày văn bản"
                          name="NgayQuyetDinh"
                          className="ant-form-title__left"
                        >
                          <DatePicker format={'DD/MM/YYYY'} placeholder="" />
                        </Item>
                      </Col>
                      <Col lg={12} xs={24}>
                        <Item
                          label="Người ban hành"
                          name="QuyetDinh"
                          className="ant-form-title__left"
                        >
                          <Input />
                        </Item>
                      </Col>
                    </Row>
                    <div className="line-break"></div>
                  </>
                ) : null}
                <div className="title-wrapper">
                  <p className="title">
                    {checkCTHuyen
                      ? 'Cơ quan được giao: '
                      : 'Cơ quan thực hiện xác minh:'}{' '}
                  </p>
                </div>
                <Row gutter={[10, 10]}>
                  <Col lg={18} xs={18}>
                    <Item
                      label="Cơ quan chủ trì"
                      name="CoQuanID"
                      className="ant-form-title__left"
                      rules={[REQUIRED]}
                    >
                      <Select>
                        {DanhSachCoQuan &&
                          DanhSachCoQuan.map((item) => (
                            <Option value={item?.CoQuanID}>
                              {item?.TenCoQuan}
                            </Option>
                          ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col lg={24} xs={24}>
                    <div className="title-wrapper">
                      <p className="title">Các cơ quan phối hợp</p>
                      <Button type="primary" onClick={addCoQuanPhoiHop}>
                        Thêm cơ quan
                      </Button>
                    </div>
                    <Row gutter={[10, 10]} style={{marginTop: '10px'}}>
                      {DanhSachCoQuanPhoiHop &&
                        DanhSachCoQuanPhoiHop.map((item, index) => (
                          <>
                            <Col lg={18} xs={18}>
                              <Select
                                style={{width: '100%'}}
                                placeholder="Chọn cơ quan"
                                value={
                                  DanhSachCoQuanPhoiHop[index]?.CQPhoiHopID
                                }
                                onChange={(value) =>
                                  changeCoQuanPhoiHop(index, value)
                                }
                                allowClear={false}
                              >
                                {item.DanhSachCoQuan &&
                                  item.DanhSachCoQuan.map((item) => (
                                    <Option value={item?.CoQuanID}>
                                      {item?.TenCoQuan}
                                    </Option>
                                  ))}
                              </Select>
                            </Col>
                            <Col lg={6} xs={6}>
                              <div className="btn-wrapper">
                                <Button
                                  className="btn-danger"
                                  onClick={() => deleteCoQuanPhoiHop(index)}
                                >
                                  Xóa cơ quan
                                </Button>
                              </div>
                            </Col>
                          </>
                        ))}
                    </Row>
                  </Col>
                </Row>

                <Row gutter={[10, 10]}>
                  <Col lg={6} span={12}>
                    <Item
                      name="HanGiaiQuyet"
                      label={checkCTHuyen ? 'Hạn' : 'Hạn giải quyết'}
                      className="ant-form-title__left"
                    >
                      <DatePicker format={'DD/MM/YYYY'} placeholder="" />
                    </Item>
                  </Col>
                  <Col lg={18} span={12}>
                    <Item
                      name="GhiChu"
                      label="Ghi chú"
                      className="ant-form-title__left"
                    >
                      <Input />
                    </Item>
                  </Col>
                </Row>
                <div className="line-break"></div>
                <div className="file">
                  <p>Hồ sơ, tài liệu</p>
                  <Button
                    type={'primary'}
                    onClick={() => showModalHoSoTaiLieu()}
                  >
                    Thêm hồ sơ, tài liệu
                  </Button>
                </div>
              </>
            ) : null}
            {DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu?.length ? (
              <div style={{marginTop: '10px'}} className={'box-file'}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '5%'}}>STT</th>
                      <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                      <th style={{width: '30%'}}>File đính kèm</th>
                      <th style={{width: '25%'}}>Ngày cập nhật</th>
                      {!isViewDetails ? (
                        <th style={{width: '15%', textAlign: 'center'}}>
                          Thao tác
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  {DanhSachHoSoTaiLieu.map((item, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td
                            rowspan={item.FileDinhKem.length}
                            style={{textAlign: 'center'}}
                          >
                            {index + 1}
                          </td>
                          <td rowspan={item.FileDinhKem.length}>
                            {item?.name || item?.TenFile}
                          </td>
                          <td>
                            <div className="group-file">
                              {item.FileDinhKem[0] ? (
                                <p className="file-item">
                                  <a
                                    href={item.FileDinhKem[0].FileUrl}
                                    target="_blank"
                                  >
                                    {item.FileDinhKem[0].name ||
                                      item.FileDinhKem[0].TenFile}
                                  </a>
                                </p>
                              ) : null}
                            </div>
                          </td>
                          <td rowspan={item.FileDinhKem.length}>
                            <p>{dayjs().format('DD/MM/YYYY')}</p>
                          </td>
                          {!isViewDetails ? (
                            <td
                              rowspan={item.FileDinhKem.length}
                              style={{textAlign: 'center'}}
                            >
                              <div className="action-btn">
                                <Tooltip title={'Sửa hồ sơ,tài liệu'}>
                                  <EditOutlined
                                    onClick={() => showModalHoSoTaiLieu(index)}
                                  />
                                </Tooltip>
                                <Tooltip title={'Xóa hồ sơ,tài liệu'}>
                                  <DeleteOutlined
                                    onClick={() => deteleFile(item, index)}
                                  />
                                </Tooltip>
                              </div>
                            </td>
                          ) : null}
                        </tr>
                        {item.FileDinhKem
                          ? item.FileDinhKem.map((item, index) => {
                              if (index > 0) {
                                return (
                                  <tr>
                                    <td>
                                      <p className="file-item">
                                        <a href={item.FileUrl} target="_blank">
                                          {item.name || item.TenFile}
                                        </a>
                                      </p>
                                    </td>
                                  </tr>
                                );
                              }
                            })
                          : null}
                      </tbody>
                    );
                  })}
                </table>
              </div>
            ) : (
              ''
            )}
            <ModalAddEditHoSoTaiLieu
              visible={visibleModalHoSoTaiLieu}
              dataEdit={dataModalHoSoTaiLieu}
              key={keyModalHoSoTaiLieu}
              onCancel={closeModalHoSoTaiLieu}
              onCreate={submitModalHoSoTaiLieu}
            />
          </div>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default ModalAddEdit;
