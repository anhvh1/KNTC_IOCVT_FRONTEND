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
import {
  Modal,
  Textarea,
} from '../../../../components/uielements/exportComponent';
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
import dayjs from 'dayjs';
import {getLocalKey} from '../../../../helpers/utility';
const DanhSachVaiTro = [
  {
    key: 1,
    value: 'Trưởng đoàn/tổ trưởng',
    visible: true,
  },
  {
    key: 2,
    value: 'Phó trưởng đoàn/tổ phó',
    visible: true,
  },
  {
    key: 3,
    value: 'Thành viên',
    visible: true,
  },
];

const {Item} = Form;
import {StateHoSoTaiLieu} from '../Shared/State/HoSoTaiLieu';
const ModalGiaoXacMinh = (props) => {
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
  const [DanhSachCanBoXacMinh, setDanhSachCanBoXacMinh] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.TrangThaiPheDuyet) {
      formRef &&
        formRef.current.setFieldsValue({
          ...dataEdit,
          HanXuLy: dataEdit?.HanXuLy ? dayjs(dataEdit.HanXuLy) : null,
        });
      onChangeHoSoTaiLieu({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }
    handleAddCanBoXacMinh();
  }, []);

  const onOk = async (type) => {
    const {onCreate} = props;
    formRef.current.validateFields().then((FormValue) => {
      const value = {
        DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
        ...FormValue,
        HanGiaiQuyet: formatDate(FormValue?.HanGiaiQuyet),
      };
      if (type === 1) {
        value.ToXacMinh = DanhSachCanBoXacMinh;
      }
      if (props.XuLyDonID) {
        value.XuLyDonID = props.XuLyDonID;
      }
      const newValue = {...value};
      for (const key in newValue) {
        if (!newValue[key]) {
          delete newValue[key];
        }
      }
      onCreate(newValue, type);
    });
  };

  const handleAddCanBoXacMinh = () => {
    const {DanhSachCanBoGQ, DanhSachTruongPhong} = props;
    const newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
    const isTruongDoan = DanhSachCanBoXacMinh.find((item) => item.VaiTro === 1);
    const isPhoPhong = DanhSachCanBoXacMinh.find((item) => item.VaiTro === 2);
    const newDanhSachCanBoGQ = [];
    const newDanhSachTruongPhong = [];
    const ListCanBoSelected = [];
    DanhSachCanBoXacMinh.forEach((item) => {
      if (item.CanBoID) ListCanBoSelected.push(item.CanBoID);
    });
    DanhSachCanBoGQ.forEach((item) => {
      if (!ListCanBoSelected.includes(item.CanBoID)) {
        newDanhSachCanBoGQ.push(item);
      }
    });
    DanhSachTruongPhong.forEach((item) => {
      if (!ListCanBoSelected.includes(item.CanBoID)) {
        newDanhSachTruongPhong.push(item);
      }
    });
    if (isTruongDoan && isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter(
          (item) => item.key !== 1 && item.key !== 2,
        ),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        // DanhSachTruongPhong: newDanhSachTruongPhong,
      });
    } else if (isTruongDoan) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter((item) => item.key !== 1),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        // // DanhSachTruongPhong: newDanhSachTruongPhong,
      });
    } else if (isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter((item) => item.key !== 2),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        // // DanhSachTruongPhong: newDanhSachTruongPhong,
      });
    } else {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro,
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        // // DanhSachTruongPhong: newDanhSachTruongPhong,
      });
    }
    setDanhSachCanBoXacMinh(newDanhSachCanBoXacMinh);
  };

  const changedCanBoXacMinh = (index, key, value) => {
    const {DanhSachCanBoGQ, DanhSachTruongPhong} = props;
    const ListCanBoSelected = [];
    const ListVaiTroSelected = [];
    let newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
    newDanhSachCanBoXacMinh[index][key] = value;
    if (key) {
      if (key === 'VaiTro') {
        newDanhSachCanBoXacMinh.forEach((item) => {
          if (item.VaiTro) {
            ListVaiTroSelected.push(item.VaiTro);
          }
        });

        newDanhSachCanBoXacMinh = newDanhSachCanBoXacMinh.map(
          (item, indexCanBo) => {
            if (indexCanBo !== index || !item.VaiTro) {
              const currentVaiTro = DanhSachVaiTro.find(
                (vaitro) => vaitro?.key === item.VaiTro,
              );
              const newListVaiTro = DanhSachVaiTro.filter((vaitro) => {
                if (vaitro.key === 3) {
                  // Nếu VaiTro chuyển từ 1 sang 3, giữ nguyên VaiTro3 ở các item khác
                  return true;
                }
                return !ListVaiTroSelected.includes(vaitro.key);
              });
              if (currentVaiTro?.key !== 3 && currentVaiTro?.key) {
                newListVaiTro.push(currentVaiTro);
              }
              const sortArr = newListVaiTro?.sort((a, b) => a?.key - b?.key);
              return {
                ...item,
                DanhSachVaiTro: sortArr,
              };
            }
            return {...item};
          },
        );

        // if (value === 3) {

        // }
      } else if (key === 'CanBoID') {
        newDanhSachCanBoXacMinh.forEach((item) => {
          if (item.CanBoID) {
            ListCanBoSelected.push(item.CanBoID);
          }
        });
        newDanhSachCanBoXacMinh = newDanhSachCanBoXacMinh.map(
          (item, indexCanBo) => {
            if (item.CanBoID !== value || !item.CanBoID) {
              const currentCanBo = DanhSachCanBoGQ.find(
                (canbo) => canbo.CanBoID === item.CanBoID,
              );
              const newListCanBo = DanhSachCanBoGQ.filter(
                (item) => !ListCanBoSelected.includes(item.CanBoID),
              );
              if (currentCanBo) {
                newListCanBo.push(currentCanBo);
              }
              const sortArr = newListCanBo?.sort(
                (a, b) => a?.CanBoID - b?.CanBoID,
              );
              return {
                ...item,
                DanhSachCanBoGQ: sortArr,
              };
            }
            return {...item};
          },
        );
      }
      setDanhSachCanBoXacMinh(newDanhSachCanBoXacMinh);
    }
  };

  const deleteCanBoXacMinh = (index) => {
    const {DanhSachCanBoGQ} = props;
    const newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
    const currentCanBoID = newDanhSachCanBoXacMinh[index]?.CanBoID;
    const currentVaiTro = newDanhSachCanBoXacMinh[index]?.VaiTro;
    newDanhSachCanBoXacMinh.splice(index, 1);
    newDanhSachCanBoXacMinh.forEach((item) => {
      if (item.CanBoID !== currentCanBoID) {
        const dataCanBo = DanhSachCanBoGQ.find(
          (canbo) => canbo?.CanBoID === currentCanBoID,
        );
        if (dataCanBo) {
          item['DanhSachCanBoGQ'] = [
            ...item['DanhSachCanBoGQ'],
            dataCanBo,
          ].sort((a, b) => a?.CanBoID - b?.CanBoID);
        }
      }
      if (item.VaiTro !== currentVaiTro) {
        const dataVaiTro = DanhSachVaiTro.find(
          (vaitro) => vaitro?.key === currentVaiTro,
        );
        if (dataVaiTro) {
          item['DanhSachVaiTro'] = [...item['DanhSachVaiTro'], dataVaiTro].sort(
            (a, b) => a?.key - b?.key,
          );
        }
      }
    });
    setDanhSachCanBoXacMinh(newDanhSachCanBoXacMinh);
  };

  const {
    dataEdit,
    title,
    visible,
    onCreate,
    fileKey,
    onCancel,
    DanhSachTruongPhong,
    DanhSachCanBoGQ,
    SuDungQuyTrinhGQPhucTap,
    loading,
  } = props;
  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;
  const type = dataEdit?.type;
  return (
    <Modal
      title={
        !SuDungQuyTrinhGQPhucTap
          ? 'Cập nhật quyết định thành lập tổ/đoàn xác minh'
          : 'Giao xác minh'
      }
      visible={visible}
      className="center-modal__footer"
      footer={
        <>
          <Button type="primary" onClick={() => onOk(type)} loading={loading}>
            <SaveOutlined /> Lưu
          </Button>
          <Button
            className="btn-danger"
            onClick={() => onCancel()}
            loading={loading}
          >
            Hủy
          </Button>
        </>
      }
      width={800}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef}>
          {type === 1 ? (
            <>
              <p className="title">
                Thông tin đoàn/tổ xác minh
                <span style={{color: 'red', marginLeft: '5px'}}>(*)</span>
              </p>
              <Row gutter={[10, 10]}>
                <Col span={10} className="center-middle">
                  <p>Tên cán bộ</p>
                </Col>
                <Col span={10} className="center-middle">
                  <p>Vai trò</p>
                </Col>
                <Col span={4}>
                  <div className="btns-end center-middle">
                    <Button type="primary" onClick={handleAddCanBoXacMinh}>
                      Thêm
                    </Button>
                  </div>
                </Col>
                {DanhSachCanBoXacMinh &&
                  DanhSachCanBoXacMinh.map((item, index) => (
                    <>
                      <Col span={10} className="center-middle">
                        <Select
                          style={{width: '100%'}}
                          onChange={(value) =>
                            changedCanBoXacMinh(index, 'CanBoID', value)
                          }
                          value={item.CanBoID}
                        >
                          {item?.DanhSachCanBoGQ &&
                            item?.DanhSachCanBoGQ?.map((item) => (
                              <Option value={item.CanBoID}>
                                {item.TenCanBo}
                              </Option>
                            ))}
                        </Select>
                      </Col>
                      <Col span={10} className="center-middle">
                        <Select
                          style={{width: '100%'}}
                          onChange={(value) =>
                            changedCanBoXacMinh(index, 'VaiTro', value)
                          }
                          value={item.VaiTro}
                        >
                          {item?.DanhSachVaiTro?.map((item) => (
                            <Option value={item.key}>{item.value}</Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={4}>
                        <div className="btns-end">
                          <Button
                            className="btn-danger"
                            onClick={() => deleteCanBoXacMinh(index)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </Col>
                    </>
                  ))}
              </Row>
              <Row gutter={[10, 10]}>
                <Col lg={8}>
                  <Item
                    label="Hạn giải quyết"
                    name="HanGiaiQuyet"
                    className="ant-form-title__left"
                  >
                    <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                  </Item>
                </Col>
                <Col lg={16}>
                  <Item
                    label="Ghi chú"
                    name="GhiChu"
                    className="ant-form-title__left"
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>
            </>
          ) : type === 2 ? (
            <>
              <Row gutter={[10, 10]}>
                <Col md={12} span={24}>
                  <Item
                    label="Giao cho"
                    rules={[REQUIRED]}
                    name="TruongPhongID"
                    className="ant-form-title__left"
                  >
                    <Select>
                      {DanhSachTruongPhong &&
                        DanhSachTruongPhong.map((item) => (
                          <Option value={item.CanBoID}>{item.TenCanBo}</Option>
                        ))}
                    </Select>
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    label="Ngày hết hạn"
                    name="HanGiaiQuyet"
                    rules={[REQUIRED]}
                    className="ant-form-title__left"
                  >
                    <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                  </Item>
                </Col>
              </Row>
            </>
          ) : null}
          <div className="file">
            <p>Hồ sơ, tài liệu</p>
            <Button type={'primary'} onClick={() => showModalHoSoTaiLieu()}>
              Thêm hồ sơ, tài liệu
            </Button>
          </div>
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
                                  {item.FileDinhKem[0]?.name ||
                                    item.FileDinhKem[0]?.TenFile}
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
                              <Tooltip title={'Sửa Hồ sơ, tài liệu'}>
                                <EditOutlined
                                  onClick={() => showModalHoSoTaiLieu(index)}
                                />
                              </Tooltip>
                              <Tooltip title={'Xóa Hồ sơ, tài liệu'}>
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
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default ModalGiaoXacMinh;
