import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT3,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL,
  ITEM_LAYOUT_FULL,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import Wrapper from './ModalDetailsReport.styled';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Constants from '../../../../settings/constants';
import {Form, Radio, Row, Col} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
  Collapse,
  DatePicker,
  ItemForm as Item,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';

const {useForm} = Form;

const {
  COL_ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  REQUIRED,
} = Constants;

const {Panel} = Collapse;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [isViewDetails, setIsViewDetails] = useState(false);
  // const [dat]
  const {dataEdit, loading, visible, action, data} = props;

  return (
    <Modal
      title={`Chi tiết thông tin đơn thư`}
      width={1800}
      visible={true}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button key="back" onClick={props.onCancel}>
          In phiếu
        </Button>,
        <Button key="back" onClick={props.onCancel}>
          Sửa
        </Button>,
        <Button key="back" onClick={props.onCancel}>
          Xóa
        </Button>,
      ]}
    >
      <Form
        form={form}
        // name={"formhuonggiaiquyet"}
        initialValues={{
          TrangThai: 1,
        }}
      >
        <Wrapper>
          <Collapse
            ghost
            expandIconPosition={'end'}
            // textColor = 'red'
            // iconColor = 'red'
          >
            <Panel header="Thông tin đơn thư" key="1">
              <Row gutter={15}>
                <Col lg={8} md={12}>
                  <Item
                    label="Số đơn thư"
                    name={'SoDonThu'}
                    {...ITEM_LAYOUT3}
                    type="primary"
                  >
                    <Input />
                  </Item>
                </Col>
                <Col lg={5} md={12}>
                  <Item
                    type="primary"
                    label="Ngày tiếp nhận"
                    name={'NgayTiepNhan'}
                    {...ITEM_LAYOUT3}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col lg={5} md={12}>
                  <Item
                    type="primary"
                    label="Họ và tên"
                    name={'HoVaTen'}
                    {...ITEM_LAYOUT3}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col lg={6} md={12}>
                  <Item
                    type="primary"
                    label="Địa chỉ"
                    name={'DiaChi'}
                    {...ITEM_LAYOUT3}
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row gutter={25}>
                <Col span={24}>
                  <Item
                    type="primary"
                    label="Loại khiếu tố"
                    name={'LoaiKhieuTo'}
                    {...ITEM_LAYOUT_FULL}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item
                    type="primary"
                    label="Nội dung đơn"
                    name={'NoiDung'}
                    {...ITEM_LAYOUT_FULL}
                  >
                    <Textarea />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col {...COL_ITEM_LAYOUT_HALF}>
                  <Item
                    type="primary"
                    label="Hạn xử lý"
                    name={'HanXuLy'}
                    {...ITEM_LAYOUT_HALF}
                  >
                    <DatePicker style={{width: '100%'}} />
                  </Item>
                </Col>
                <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                  <Row>
                    <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                      <Item
                        type="primary"
                        label="Trạng thái xử lý"
                        name={'TrangThaiXuLy'}
                        {...ITEM_LAYOUT_HALF}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col {...COL_ITEM_LAYOUT_HALF}>
                  <Item
                    type="primary"
                    label="Hạn giải quyết"
                    name={'HanGiaiQuyet'}
                    {...ITEM_LAYOUT_HALF}
                  >
                    <DatePicker style={{width: '100%'}} />
                  </Item>
                </Col>
                <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                  <Row>
                    <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                      <Item
                        type="primary"
                        label="Trạng thái giải quyết"
                        name={'TrangThaiGiaiQuyet'}
                        {...ITEM_LAYOUT_HALF}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Button
                backgroundSub="#fff"
                contentsub="123"
                position="top-left"
                type="second"
                onClick={() => setIsViewDetails(true)}
              >
                Xem chi tiết
              </Button>
              {isViewDetails ? (
                <div className="wrapper">
                  <p className="wrapper-title">Thông tin chung: </p>
                  <Row gutter={8}>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Nguồn đơn đến"
                        name={'NguonDonDen'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={5} md={12}>
                      <Item
                        type="primary"
                        label="Cán bộ tiếp nhận"
                        name={'CanBoTiepNhan'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={5} md={12}>
                      <Item
                        type="primary"
                        label="Số đơn"
                        name={'SoDon'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={6} md={12}>
                      <Item
                        type="primary"
                        label="Ngày tiếp nhận"
                        name={'NgayTiepNhan'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col span={24}>
                      <Item
                        type="primary"
                        label="Đối tượng khiếu tố"
                        name={'DoiTuongKhieuTo'}
                        {...ITEM_LAYOUT_FULL}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Họ và tên"
                        name={'HoVaTen'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={4} md={12}>
                      <Item
                        type="primary"
                        label="Giới tính"
                        name={'GioiTinh'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={5} md={12}>
                      <Item
                        type="primary"
                        label="Dân tộc"
                        name={'DanToc'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12}>
                      <Item
                        type="primary"
                        label="Địa chỉ"
                        name={'DiaChi'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col {...COL_ITEM_LAYOUT_HALF}>
                      <Item
                        type="primary"
                        label="Loại khiếu tố"
                        name={'LoaiKhieuTo'}
                        {...ITEM_LAYOUT_HALF}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                      <Row>
                        <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                          <Item
                            type="primary"
                            label="Nơi phát sinh"
                            name={'NoiPhatSinh'}
                            {...ITEM_LAYOUT_HALF}
                          >
                            <Input />
                          </Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Item
                        type="primary"
                        label="Nội dung đơn"
                        name={'NoiĐungon'}
                        {...ITEM_LAYOUT_FULL}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>

                  <p className="wrapper-title">Thông tin xử lý: </p>
                  <Row>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Ngày phân công"
                        name={'NgayPhanCong'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={1}>
                      <Item
                        type="primary"
                        label="Hạn xử lý"
                        name={'HanXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={2}>
                      <Item
                        type="primary"
                        label="Cơ quan xử lý"
                        name={'CoQuanXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Cán bộ xử lý"
                        name={'CanBoXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={1}>
                      <Item
                        type="primary"
                        label="Ngày xử lý"
                        name={'NgayXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={2}>
                      <Item
                        type="primary"
                        label="Hướng xử lý"
                        name={'HuongXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <p className="wrapper-title">Thông tin giải quyết: </p>
                  <Row>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Cơ quan giao"
                        name={'CoQuanGiao'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={1}>
                      <Item
                        type="primary"
                        label="Ngày giao"
                        name={'NgayGiao'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={2}>
                      <Item
                        type="primary"
                        label="Cơ quan trị trách"
                        name={'CoQuanTriTrach'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Cơ quan phối hợp"
                        name={'CoQuanPhoiHop'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={1}>
                      <Item
                        type="primary"
                        label="Hạn giải quyết"
                        name={'HanGiaiQuyet'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={2}>
                      <Item
                        type="primary"
                        label="Trạng thái"
                        name={'TrangThai'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <p className="wrapper-title">Thông tin tổ xác minh: </p>
                  <Row>
                    <Col lg={8} md={12}>
                      <Item
                        type="primary"
                        label="Cán bộ phụ trách"
                        name={'CanBoPhuTrach'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={12} push={1}>
                      <Item
                        type="primary"
                        label="Cán bộ phối hợp"
                        name={'CanBoPhoiHop'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col lg={7} md={24} push={2}>
                      <Item
                        type="primary"
                        label="Cán bộ theo dõi"
                        name={'CanBoTheoDoi'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Panel>
            <Panel header="Thông tin đơn thư" key="2">
              <Collapse ghost expandIconPosition={'end'}>
                <Panel header="Hồ sơ, tài liệu chính" key="3">
                  <div className="file-wrapper">
                    {data &&
                      data.DanhSachHoSoTaiLieuChinh.map((item) => {
                        <div className="file-items">
                          <div className="file-items__image"></div>
                          <div className="file-items__info">
                            <div className="file-items__type">
                              <Select></Select>
                              {item?.isEdit ? (
                                <SaveOutlined />
                              ) : (
                                <EditOutlined />
                              )}
                            </div>
                            <div className="file-items__desc">
                              <p>{item?.ThongTin}</p>
                            </div>
                          </div>
                        </div>;
                      })}
                  </div>
                </Panel>
                <Panel header="Hồ sơ, tài liệu liên quan" key="4">
                  <div className="file-wrapper">
                    {data &&
                      data.DanhSachHoSoTaiLieuChinh.map((item) => {
                        <div className="file-items">
                          <div className="file-items__image"></div>
                          <div className="file-items__info">
                            <div className="file-items__type">
                              <Select></Select>
                              {item?.isEdit ? (
                                <SaveOutlined />
                              ) : (
                                <EditOutlined />
                              )}
                            </div>
                            <div className="file-items__desc">
                              <p>{item?.ThongTin}</p>
                            </div>
                          </div>
                        </div>;
                      })}
                  </div>
                </Panel>
              </Collapse>
            </Panel>
            <Panel header="Tiến trình xử lý" key="5">
              <div className="wrapper-progress">
                {data &&
                  data.TienTrinhXuLy.map((item, index) => {
                    <div
                      className={`${
                        index % 2 === 0 ? 'pogress-even' : 'progress-old'
                      } progress-item`}
                    >
                      <div className="progress-circle">{index + 1}</div>
                      <div className="progress-title">{item?.Ten}</div>
                      <div className="progress-time">
                        {item?.ThoiGianThucHien}
                      </div>
                      <div className="progress-user__update">
                        {item?.NguoiCapNhat}
                      </div>
                      <div className="progress-action">{item?.ThaoTac}</div>
                      <div className="progress-opinion">
                        {item?.YKienCanBoThucHien}
                      </div>
                    </div>;
                  })}
              </div>
            </Panel>
          </Collapse>
        </Wrapper>
      </Form>
    </Modal>
  );
};
