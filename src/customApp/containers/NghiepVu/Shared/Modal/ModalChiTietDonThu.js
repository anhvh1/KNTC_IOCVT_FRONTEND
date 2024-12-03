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
  Tabs,
} from 'antd';
import Button from '../../../../../components/uielements/button';
import Select, {Option} from '../../../../../components/uielements/select';
import {Textarea} from '../../../../../components/uielements/exportComponent';
import Wrapper from './ModalStyle/ModalChiTietDonThu.styled';
import {
  handleRenderTenNguonDonDen,
  handleTextLong,
} from '../../../../../helpers/utility';
import {formatNumberStr} from '../../../../../helpers/utility';
import api from '../config';
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
  LoaiKhieuTo,
} from '../../../../../settings/constants';
import {
  InputNumberFormat,
  Modal,
} from '../../../../../components/uielements/exportComponent';
import moment from 'moment';
import {
  getValueConfigLocalByKey,
  renderContentDownload,
} from '../../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from './ModalAddEditFileTaiLieu';
import {Popover} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {getLocalKey} from '../../../../../helpers/utility';
const {Item} = Form;
class ModalChiTietDonThu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      DanhSachHoSoKhieuNai: [],
      IsUpdateProgres: {
        Large: {
          isReSize: false,
        },
        Normal: {
          isReSize: false,
        },
        Small: {
          isReSize: false,
        },
      },
      ListProgress: [],
      keyModalHoSoTaiLieu: 0,
      visibleModalHoSoTaiLieu: false,
      DanhSachQuocTich: [],
      DanhSachDanToc: [],
      DanhSachCanBo: [],
      loading: false,
      QuyetDinh: 1,
      currentKey: 1,
      NoiDungQuyetDinh: null,
      UpdateProgress: {
        xl: false,
        lg: false,
        md: false,
        xs: window.innerWidth < 560,
      },
      loadingProgress: false,
    };
    this.formRef = React.createRef();
    this.progressRef = React.createRef();
  }

  handleCustomizeItemProgres = (num = 4) => {
    const {dataEdit} = this.props;
    const {TienTrinhXuLy} = dataEdit;
    const newArr = [];
    if (TienTrinhXuLy) {
      for (let i = 0; i < TienTrinhXuLy.length; i += num) {
        const dataChild = TienTrinhXuLy.slice(i, i + num);
        newArr.push({
          dataChild: dataChild,
        });
      }
      this.setState({ListProgress: newArr}, () => {});
    }
  };

  handleCheckProgress = (List) => {
    const {ListProgress, IsUpdateProgres, UpdateProgress} = this.state;
    const newListProgress = List ? List : ListProgress;
    if (
      !UpdateProgress.lg &&
      window.innerWidth < 1100 &&
      window.innerWidth > 800
    ) {
      this.handleCustomizeItemProgres(3);
      this.setState({UpdateProgress: {...UpdateProgress, lg: true}});
    } else if (UpdateProgress.lg && window.innerWidth > 1100) {
      this.handleCustomizeItemProgres(4);
      this.setState({UpdateProgress: {...UpdateProgress, lg: false}});
    } else if (
      !UpdateProgress.md &&
      window.innerWidth < 800 &&
      window.innerWidth > 560
    ) {
      this.handleCustomizeItemProgres(2);
      this.setState({UpdateProgress: {...UpdateProgress, xs: true, lg: false}});
    } else if (UpdateProgress.xs && window.innerWidth < 560) {
      this.handleCustomizeItemProgres(1);
      this.setState({UpdateProgress: {...UpdateProgress, md: false}});
    }
  };

  componentDidMount() {
    this.handleCustomizeItemProgres(4);
    const {dataEdit} = this.props;
    const {TienTrinhXuLy} = dataEdit;
    const newArr = [];
    if (TienTrinhXuLy) {
      for (let i = 0; i < TienTrinhXuLy.length; i += 4) {
        const dataChild = TienTrinhXuLy.slice(i, i + 4);
        newArr.push({
          dataChild: dataChild,
        });
      }
      this.handleCheckProgress(newArr);
    }
    if (dataEdit && dataEdit.CoQuanBanHanh) {
      this.formRef.current &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
          NgayThiHanh: dataEdit.NgayThiHanh
            ? dayjs(dataEdit.NgayThiHanh)
            : null,
        });
      this.setState({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }

    window.addEventListener('resize', (e) => {
      this.handleCheckProgress();
    });
    const isPublic = this.props?.isPublic;
    api.GetAllCoQuan({isPublic}).then((res) => {
      if (res.data.Status > 0) {
        this.setState({DanhSachCoQuan: res.data.Data});
      }
    });
    // if (isPublic) {
    //   // api.GetAllDanToc({isPublic}).then((res) => {
    //   //   if (res.data.Status > 0) {
    //   //     this.setState({DanhSachDanToc: res.data.Data});
    //   //   }
    //   // });
    //   // api.GetAllQuocTich({isPublic}).then((res) => {
    //   //   if (res.data.Status > 0) {
    //   //     this.setState({DanhSachQuocTich: res.data.Data});
    //   //   }
    //   // });
    //   api.GetAllCoQuan({isPublic}).then((res) => {
    //     if (res.data.Status > 0) {
    //       this.setState({DanhSachCoQuan: res.data.Data});
    //     }
    //   });
    // }
  }

  componentDidUpdate() {
    const wrapper = document.querySelector('.progress');
    const children = wrapper?.children;
    if (children) {
      const progressEndElement = document.querySelector('.progress-end');
      let indexEnd;
      for (let i = 0; i < children.length; i++) {
        const className = children[i].getAttribute('class').toString();
        const isEnd = className.includes('progress-end');
        if (isEnd) {
          indexEnd = i + 1;
        }
      }
      if (indexEnd > 0 && indexEnd % 2 === 0) {
        progressEndElement.classList.add('justifyEnd');
      }
    }
    if (this.progressRef.current) {
      const progressWrapper =
        this.progressRef.current.querySelectorAll('.progress-wrapper');
      if (progressWrapper) {
        for (let i = 0; i < progressWrapper.length; i++) {
          const child = progressWrapper[i].children;
          let maxHeight = 0;
          for (let j = 0; j < child.length; j++) {
            const itemTitle = child[j].querySelector('.progress-items__title');
            const heightItemTitle = itemTitle.scrollHeight;
            if (heightItemTitle > maxHeight) {
              maxHeight = heightItemTitle;
            }
          }
          for (let k = 0; k < child.length; k++) {
            const itemTitle = child[k].querySelector('.progress-items__title');
            itemTitle.style.height = `${maxHeight}px`;
          }
        }
      }
    }
  }

  handleClickTabs = () => {};

  deteleFile = (item, index) => {
    const {DanhSachHoSoTaiLieu} = this.state;
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...DanhSachHoSoTaiLieu];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          // DanhSachHoSoTaiLieu[index] = item;
          this.setState({
            DanhSachHoSoTaiLieu: newArr,
            isFalseFile: false,
            messErr: '',
          });
        },
      });
    } else {
      DanhSachHoSoTaiLieu.splice(index, 1);
      this.setState({
        DanhSachHoSoTaiLieu,
        isFalseFile: false,
        messErr: '',
      });
    }
  };

  onOk = async (IsTrinh = false, isCreate) => {
    const {DanhSachHoSoTaiLieu, currentKey} = this.state;
    const {onCreate, dataEdit} = this.props;

    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const user = getLocalKey('user', {});
        const NguoiSuaID = user && user.CanBoID ? user.CanBoID : null;
        const value = {
          ...FormValue,
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          LoaiKetQuaID: currentKey,
        };
        if (this.props.XuLyDonID) {
          value.XuLyDonID = this.props.XuLyDonID;
        }
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  showModalHoSoTaiLieu = (index) => {
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newKey = keyModalHoSoTaiLieu + 1;
      this.setState({
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        dataModalHoSoTaiLieu: {...DanhSachHoSoTaiLieu[index], index},
      });
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newKey = keyModalHoSoTaiLieu + 1;
      this.setState({
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        // dataModalHoSoTaiLieu: DanhSachHoSoTaiLieu[index],
      });
    }
  };

  closeModalHoSoTaiLieu = (index) => {
    this.setState({
      visibleModalHoSoTaiLieu: false,
      dataModalHoSoTaiLieu: {},
    });
  };

  deleteHoSoTaiLieu = (index) => {
    ModalAnt.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa Hồ sơ, tài liệu này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
        DanhSachHoSoTaiLieu.splice(index, 1);
        message.destroy();
        message.success('Xóa thành công');
      },
    });
  };

  submitModalHoSoTaiLieu = (value) => {
    const {index} = value;
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu} = this.state;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      this.setState({
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      });
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.push(value);
      this.setState({
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
        // dataModalHoSoTaiLieu: DanhSachHoSoTaiLieu[index],
      });
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
  };

  handleChecked = (e, value) => {
    if (e.target.checked) {
      this.setState({
        NoiDungQuyetDinh: value,
      });
    } else {
      this.setState({
        NoiDungQuyetDinh: null,
      });
    }
  };

  handleRenderDanhSachDonThu = (data) => {
    return data && data?.length ? (
      <div style={{marginTop: '10px'}} className={'box-file'}>
        <table>
          <thead>
            <tr>
              <th style={{width: '5%'}}>STT</th>
              <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
              <th style={{width: '25%'}}>Ngày cập nhật</th>
              <th style={{width: '25%'}}>Người cập nhật</th>
              <th style={{width: '30%'}}>File đính kèm</th>
            </tr>
          </thead>
          {data.map((item, index) => {
            return (
              <tbody>
                <tr>
                  <td
                    rowspan={item?.FileDinhKem?.length}
                    style={{textAlign: 'center'}}
                  >
                    {index + 1}
                  </td>
                  <td rowspan={item?.FileDinhKem?.length}>
                    {item?.name || item?.TenFile}
                  </td>
                  <td rowspan={item?.FileDinhKem?.length}>
                    <p>
                      {item.NgayCapNhat
                        ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                        : null}
                    </p>
                  </td>
                  <td rowspan={item?.FileDinhKem?.length}>
                    <p>{item.TenNguoiCapNhat}</p>
                  </td>
                  <td>
                    <div className="group-file">
                      {item?.FileDinhKem[0] ? (
                        <p className="file-item">
                          <a
                            target="_blank"
                            href={item?.FileDinhKem[0].FileUrl}
                          >
                            {item?.FileDinhKem[0].name ||
                              item?.FileDinhKem[0]?.TenFile}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </td>
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
    );
  };

  handleRenderDefaultLocation = (TenTinh, TenHuyen, TenXa, SoNha) => {
    let location = '';
    const order = ['SoNha', 'TenXa', 'TenHuyen', 'TenTinh'];

    let count = 0;

    order.forEach((param) => {
      if (
        (param === 'SoNha' && SoNha) ||
        (param === 'TenXa' && TenXa) ||
        (param === 'TenHuyen' && TenHuyen) ||
        (param === 'TenTinh' && TenTinh)
      ) {
        if (count >= 1) {
          location += ', ';
        }

        if (param === 'SoNha') {
          location += `${SoNha} `;
        } else if (param === 'TenXa') {
          location += `${TenXa} `;
        } else if (param === 'TenHuyen') {
          location += `${TenHuyen} `;
        } else if (param === 'TenTinh') {
          location += `${TenTinh}`;
        }

        count++;
      }
    });

    return location;
  };

  handleRenderContentKhieuNai = (tab) => {
    const isViewDetails = this.props?.dataEdit?.isViewDetails;
    const {dataEdit} = this.props;
    const {DanhSachCoQuan, ListProgress} = this.state;
    const ThongTinQuyetDinhGQ = dataEdit?.ThongTinQuyetDinhGQ;
    const ThongTinThiHanh = dataEdit?.ThongTinThiHanh;
    const KetQuaXuLy = dataEdit?.KetQuaXuLy;
    const KetQuaXacMinh = dataEdit?.KetQuaXacMinh;
    const DoiTuongBiKN = dataEdit?.DoiTuongBiKN;
    const {
      DonThu,
      DoiTuongKN,
      DanhSachHoSoTaiLieu,
      NhomKN,
      KetQuaTranhChap,
      ThongTinDonDoc,
      TiepDanInfo,
      DanhSachDoiTuongBiKN,
      ThongTinRutDon,
    } = dataEdit;
    const LoaiKhieuTo1ID = DonThu?.LoaiKhieuTo1ID;
    if (tab == 1) {
      return (
        <>
          <div className="step-title box-title">
            <p className="title">Thông tin chung</p>
          </div>
          <div className="wrapper-info__shared">
            <p className="label">
              Số đơn thư: <span>{DonThu?.SoDonThu}</span>
            </p>
            <p className="label">
              Ngày tiếp nhận:{' '}
              <span>
                {DonThu?.NgayTiep
                  ? dayjs(DonThu?.NgayTiep).format('DD/MM/YYYY')
                  : ''}
              </span>
            </p>
            <p className="label">
              Ngày ghi đơn:{' '}
              <span>
                {DonThu?.NgayVietDon
                  ? dayjs(DonThu?.NgayVietDon).format('DD/MM/YYYY')
                  : ''}
              </span>
            </p>
            <p className="label">
              Cơ quan tiếp nhận: <span>{DonThu?.TenCoQuanTiepNhan}</span>
            </p>
            <p className="label">
              Cán bộ tiếp nhận: <span>{DonThu?.TenCanBoTiepNhan}</span>
            </p>
            <p className="label">
              Nguồn đơn đến: <span>{handleRenderTenNguonDonDen(DonThu)}</span>
            </p>
          </div>
          <div className="step-title box-title ">
            <p className="title">Thông tin đối tượng khiếu nại, tố cáo, PAKN</p>
          </div>
          <div className="wrapper-info__userComplaint">
            <p className="label">
              Đối tượng khiếu nại, tố cáo, PAKN là:{' '}
              {NhomKN?.LoaiDoiTuongKNID
                ? NhomKN?.LoaiDoiTuongKNID === 1
                  ? 'Cá nhân'
                  : NhomKN?.LoaiDoiTuongKNID === 2
                  ? 'Cơ quan tổ chức'
                  : NhomKN?.LoaiDoiTuongKNID === 3
                  ? 'Tập thể'
                  : ''
                : ''}
            </p>
            {NhomKN?.DanhSachDoiTuongKN &&
              NhomKN?.DanhSachDoiTuongKN.map((item, index) => (
                <>
                  {index > 0 ? (
                    <p className="label">
                      Đối tượng khiếu nại, tố cáo, PAKN: <span>{index}</span>
                    </p>
                  ) : null}
                  <div className="wrapper-info">
                    <div className="wrapper-info__top">
                      <p className="label">
                        Họ và tên: <span>{item?.HoTen}</span>
                      </p>
                      <p className="label">
                        Số CMND/CCCD: <span>{item?.CMND}</span>
                      </p>
                      <p className="label">
                        Ngày cấp:{' '}
                        <span>
                          {item?.NgayCap
                            ? moment(item?.NgayCap).format('DD/MM/YYYY')
                            : null}
                        </span>
                      </p>
                      <p className="label">
                        Nơi cấp: <span>{item?.NoiCap}</span>
                      </p>
                    </div>
                    <div className="wrapper-info__bottom">
                      <p className="label">
                        Giới tính:{' '}
                        <span>
                          {item?.GioiTinh === 1
                            ? 'Nam'
                            : item?.GioiTinh === 2
                            ? 'Nữ'
                            : ''}
                        </span>
                      </p>
                      <p className="label">
                        Điện thoại: <span>{item?.SoDienThoai}</span>
                      </p>
                      <p className="label">
                        Dân tộc: <span>{item.TenDanToc}</span>
                      </p>
                      <p className="label">
                        Quốc tịch: <span>{item.TenQuocTich}</span>
                      </p>
                      <p className="label">
                        Nghề nghiệp: <span>{item.NgheNghiep}</span>
                      </p>
                    </div>
                    <div className="wrapper-info__hidden">
                      <p className="label">
                        Họ và tên: <span>{item?.HoTen}</span>
                      </p>
                      <p className="label">
                        Số CMND/CCCD: <span>{item?.CMND}</span>
                      </p>
                      <p className="label">
                        Ngày cấp:{' '}
                        <span>
                          {item?.NgayCap
                            ? moment(item?.NgayCap).format('DD/MM/YYYY')
                            : null}
                        </span>
                      </p>
                      <p className="label">
                        Nơi cấp: <span>{item?.NoiCap}</span>
                      </p>
                      <p className="label">
                        Giới tính:{' '}
                        <span>
                          {item?.GioiTinh === 1
                            ? 'Nam'
                            : item?.GioiTinh === 2
                            ? 'Nữ'
                            : ''}
                        </span>
                      </p>
                      <p className="label">
                        Điện thoại: <span>{item?.SoDienThoai}</span>
                      </p>
                      <p className="label">
                        Dân tộc: <span>{item.TenDanToc}</span>
                      </p>
                      <p className="label">
                        Quốc tịch: <span>{item.TenQuocTich}</span>
                      </p>
                      <p className="label">
                        Nghề nghiệp: <span>{item.NgheNghiep}</span>
                      </p>
                    </div>
                  </div>
                  <p className="label">
                    Địa chỉ: <span>{item.DiaChiCT}</span>
                  </p>
                </>
              ))}
          </div>
          <div className="step-title box-title">
            <p className="title">Thông tin đơn thư</p>
          </div>
          <div className="wraper-info__report">
            <p className="label">
              Phân loại vụ việc{' '}
              <span>{`${DonThu?.TenLoaiKhieuTo1} > ${DonThu?.TenLoaiKhieuTo2} > ${DonThu?.TenLoaiKhieuTo3}`}</span>
            </p>
            <p className="label">
              Nơi phát sinh vụ việc{' '}
              <span>
                {DonThu?.DiaChiPhatSinh}
                {DonThu?.TenXa ? `, xã ${DonThu?.TenXa}` : ''}
                {DonThu?.TenHuyen ? `, huyện ${DonThu?.TenHuyen}` : ''}
                {DonThu?.TenTinh ? `, tỉnh ${DonThu?.TenTinh}` : ''}
              </span>
            </p>
            <p className="label">
              Nội dung vụ việc: <span>{DonThu?.NoiDungDon}</span>
            </p>
            {/* <p className="label">
              Đơn vị giải quyết: <span>{DonThu?.CQDaGiaiQuyetID}</span>
            </p> */}
            <p className="label">
              Ngày ban hành quyết định giải quyết{' '}
              <span>
                {DonThu?.NgayBanHanhQuyetDinhGiaiQuyet
                  ? dayjs(DonThu?.NgayBanHanhQuyetDinhGiaiQuyet).format(
                      'DD/MM/YYYY',
                    )
                  : ''}
              </span>
            </p>
            {/* <p className="label label-line">Thông tin đã giải quyết:</p> */}
            <p className="label label-line">
              Đơn vị đã giải quyết: <span>{DonThu?.CQDaGiaiQuyetID}</span>
            </p>
            {DonThu?.FileCQGiaiQuyet ? (
              <>
                <p className="label label-line">
                  Thông tin tài liệu đơn vị đã giải quyết:
                </p>
                {this.handleRenderDanhSachDonThu(DonThu?.FileCQGiaiQuyet)}
              </>
            ) : null}
            <p className="label label-line">
              Kết quả tiếp:{' '}
              <span>
                {TiepDanInfo?.KetQuaTiep ? TiepDanInfo?.KetQuaTiep : ''}
              </span>
            </p>
            {DonThu?.FileKQTiep ? (
              <>
                <p className="label label-line">
                  Thông tin tài liệu kết quả tiếp:
                </p>
                {this.handleRenderDanhSachDonThu(DonThu?.FileKQTiep)}
              </>
            ) : null}
            <p className="label label-line">
              Kết quả giải quyết:{' '}
              <span>
                {TiepDanInfo?.KetQuaGiaiQuyet
                  ? TiepDanInfo?.KetQuaGiaiQuyet
                  : ''}
              </span>
            </p>
            {DonThu?.FileKQGiaiQuyet ? (
              <>
                <p className="label label-line">
                  Thông tin tài liệu kết quả giải quyết:
                </p>
                {this.handleRenderDanhSachDonThu(DonThu?.FileKQGiaiQuyet)}
              </>
            ) : null}
          </div>
          <div className="step-title box-title">
            <p className="title">
              Thông tin đối tượng bị khiếu nại, tố cáo, PAKN
            </p>
          </div>
          <div className="wrapper-info__userReport">
            <div className="wrapper-info">
              {DanhSachDoiTuongBiKN
                ? DanhSachDoiTuongBiKN.map((item, index) => (
                    <>
                      <p className="title-user__claims">
                        Thông tin đối tượng khiếu nại {index + 1}
                      </p>
                      <p className="label">
                        Đối tượng bị khiếu nại, tố cáo, PAKN là:{' '}
                        <span>
                          {item?.LoaiDoiTuongBiKNID === 1
                            ? 'Cá nhân'
                            : item?.LoaiDoiTuongBiKNID === 1
                            ? 'Cơ quan, tổ chức'
                            : ''}
                        </span>
                      </p>
                      <div className="wrapper-info__report">
                        <p className="label">
                          Họ và tên: <span>{item?.TenDoiTuongBiKN}</span>
                        </p>
                        <p className="label">
                          Nơi công tác :{' '}
                          <span>{item?.NoiCongTacDoiTuongBiKN}</span>
                        </p>
                        <p className="label">
                          Chức vụ: <span>{item?.TenChucVu}</span>
                        </p>
                      </div>
                      <div className="wrapper-info__bottom2">
                        <p className="label">
                          Giới tính:{' '}
                          <span>
                            {item?.GioiTinhDoiTuongBiKN === 1
                              ? 'Nam'
                              : item?.GioiTinhDoiTuongBiKN === 2
                              ? 'Nữ'
                              : null}
                          </span>
                        </p>
                        <p className="label">
                          Điện thoại: <span>{item?.SoDienThoai}</span>
                        </p>
                        <p className="label">
                          Dân tộc: <span>{item?.TenDanToc}</span>
                        </p>
                        <p className="label">
                          Quốc tịch: <span>{item?.TenQuocTich}</span>
                        </p>
                        <p className="label">
                          Nghề nghiệp: <span>{item?.TenNgheNghiep}</span>
                        </p>
                      </div>
                      <div className="wrapper-info__hidden">
                        <p className="label">
                          Họ và tên: <span>{item?.TenDoiTuongBiKN}</span>
                        </p>
                        <p className="label">
                          Nơi công tác:{' '}
                          <span>{item?.NoiCongTacDoiTuongBiKN}</span>
                        </p>
                        <p className="label">
                          Chức vụ: <span>{item?.TenChucVu}</span>
                        </p>
                        <p className="label">
                          Giới tính:{' '}
                          <span>
                            {item?.GioiTinhDoiTuongBiKN === 1
                              ? 'Nam'
                              : item?.GioiTinhDoiTuongBiKN === 2
                              ? 'Nữ'
                              : null}
                          </span>
                        </p>
                        <p className="label">
                          Điện thoại: <span>{item?.SoDienThoai}</span>
                        </p>
                        <p className="label">
                          Dân tộc: <span>{item?.TenDanToc}</span>
                        </p>
                        <p className="label">
                          Quốc tịch: <span>{item?.TenQuocTich}</span>
                        </p>
                        <p className="label">
                          Nghề nghiệp: <span>{item?.TenNgheNghiep}</span>
                        </p>
                      </div>
                      <p className="label">Địa chỉ: {item?.DiaChiCT}</p>
                    </>
                  ))
                : null}
            </div>
          </div>
          <div className="step-title box-title">
            <p className="title">Thông tin tài liệu, bằng chứng</p>
          </div>
          {this.handleRenderDanhSachDonThu(DanhSachHoSoTaiLieu)}
          {/* {DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                    <th style={{width: '25%'}}>Ngày cập nhật</th>
                    <th style={{width: '25%'}}>Người cập nhật</th>
                    <th style={{width: '30%'}}>File đính kèm</th>
                  </tr>
                </thead>
                {DanhSachHoSoTaiLieu.map((item, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td
                          rowspan={item?.FileDinhKem?.length}
                          style={{textAlign: 'center'}}
                        >
                          {index + 1}
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          {item?.name || item?.TenFile}
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          <p>
                            {item.NgayCapNhat
                              ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                              : null}
                          </p>
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          <p>{item.TenNguoiCapNhat}</p>
                        </td>
                        <td>
                          <div className="group-file">
                            {item?.FileDinhKem[0] ? (
                              <p className="file-item">
                                <a
                                  target="_blank"
                                  href={item?.FileDinhKem[0].FileUrl}
                                >
                                  {item?.FileDinhKem[0].name ||
                                    item?.FileDinhKem[0]?.TenFile}
                                </a>
                              </p>
                            ) : null}
                          </div>
                        </td>
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
          )} */}
        </>
      );
    } else if (tab === 2) {
      return (
        <>
          <p className="label">Trạng thái xử lý: {KetQuaXuLy?.TrangThaiXuLy}</p>
          <div className="wrapper-result">
            <p className="label">
              Cơ quan xử lý: <span>{KetQuaXuLy?.CoQuanXuLy}</span>
            </p>
            <p className="label">
              Cán bộ xử lý: <span>{KetQuaXuLy?.CanBoXuLy}</span>
            </p>
            <p className="label">
              Ngày xử lý:{' '}
              <span>
                {KetQuaXuLy?.NgayXuLy
                  ? dayjs(KetQuaXuLy?.NgayXuLy).format('DD/MM/YYYY')
                  : null}
              </span>
            </p>
            <p className="label">
              Hướng xử lý: <span>{KetQuaXuLy?.HuongXuLy}</span>
            </p>
          </div>
          <p className="label">Nội dung xử lý: {KetQuaXuLy?.NoiDungXuLy}</p>
          <p className="label">
            Chuyển cho cơ quan: {KetQuaXuLy?.ChuyenChoCoQuan}
          </p>
          <p className="label">
            Lãnh đạo phê duyệt: {KetQuaXuLy?.LanhDaoPheDuyet}
          </p>
          <p className="title">Hồ sơ, tài liệu </p>
          {KetQuaXuLy?.DanhSachHoSoTaiLieu &&
          KetQuaXuLy?.DanhSachHoSoTaiLieu?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                    <th style={{width: '25%'}}>Ngày cập nhật</th>
                    <th style={{width: '25%'}}>Người cập nhật</th>
                    <th style={{width: '30%'}}>File đính kèm</th>
                    {/* {!isViewDetails ? (
                      <th style={{width: '15%'}}>Thao tác</th>
                    ) : null} */}
                  </tr>
                </thead>
                {KetQuaXuLy?.DanhSachHoSoTaiLieu.map((item, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td
                          rowspan={item?.FileDinhKem?.length}
                          style={{textAlign: 'center'}}
                        >
                          {index + 1}
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          {item?.name || item?.TenFile}
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          <p>
                            {item.NgayCapNhat
                              ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                              : null}
                          </p>
                        </td>
                        <td rowspan={item?.FileDinhKem?.length}>
                          <p>{item.TenNguoiCapNhat}</p>
                        </td>
                        <td>
                          <div className="group-file">
                            {item?.FileDinhKem[0] ? (
                              <p className="file-item">
                                <a
                                  target="_blank"
                                  href={item?.FileDinhKem[0].FileUrl}
                                >
                                  {item?.FileDinhKem[0].name ||
                                    item?.FileDinhKem[0]?.TenFile}
                                </a>
                              </p>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                      {item.FileDinhKem
                        ? item.FileDinhKem.map((item, index) => {
                            if (index > 0) {
                              return (
                                <tr>
                                  <td>
                                    <p className="file-item">
                                      <a target="_blank" href={item.FileUrl}>
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
        </>
      );
    } else if (tab === 3) {
      return (
        <>
          <div className="step-title box-title">
            <p className="title">Thông tin đơn vị thực hiện xác minh</p>
          </div>
          <div className="wrapper-top__result">
            <p className="label">
              Số văn bản giao xác minh:{' '}
              {KetQuaXacMinh?.GiaoXacMinh?.SoQuyetDinh}
            </p>
            <p className="label">
              Ngày văn bản:{' '}
              {KetQuaXacMinh?.GiaoXacMinh?.NgayQuyetDinh
                ? dayjs(KetQuaXacMinh?.GiaoXacMinh?.NgayQuyetDinh).format(
                    'DD/MM/YYYY',
                  )
                : null}
            </p>
            <p className="label">
              Người ban hành: {KetQuaXacMinh?.GiaoXacMinh?.QuyetDinh}
            </p>
            <p className="label">
              Hạn giải quyết: {KetQuaXacMinh?.GiaoXacMinh?.HanGiaiQuyet}
            </p>
            <p className="label">
              Ghi chú: {KetQuaXacMinh?.GiaoXacMinh?.GhiChu}
            </p>
          </div>
          <p className="title">Cơ quan thực hiện xác minh</p>
          <div style={{marginTop: '10px'}} className={'box-file'}>
            <table>
              <thead>
                <tr>
                  <th style={{width: '5%'}}>STT</th>
                  <th style={{width: '30%'}}>Tên cơ quan</th>
                  <th style={{width: '30%'}}>Vai trò</th>
                </tr>
              </thead>
              <tbody>
                {KetQuaXacMinh?.GiaoXacMinh?.CoQuanID ? (
                  <tr>
                    <td style={{textAlign: 'center'}}>1</td>
                    <td>
                      {KetQuaXacMinh?.GiaoXacMinh?.CoQuanID
                        ? DanhSachCoQuan?.find(
                            (item) =>
                              item.CoQuanID ===
                              KetQuaXacMinh?.GiaoXacMinh?.CoQuanID,
                          )?.TenCoQuan
                        : ''}
                    </td>
                    <td>
                      {KetQuaXacMinh?.GiaoXacMinh?.CoQuanID ? 'Chủ trì' : ''}
                    </td>
                  </tr>
                ) : null}
              </tbody>
              {KetQuaXacMinh?.GiaoXacMinh?.CQPhoiHopGQ?.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'center'}}>{index + 2}</td>
                      <td>{item.TenCoQuan ? item.TenCoQuan : ''}</td>
                      <td>Phối hợp</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          <p className="title">Thông tin đoàn/tổ xác minh</p>
          {KetQuaXacMinh?.GiaoXacMinh?.ToXacMinh &&
          KetQuaXacMinh?.GiaoXacMinh?.ToXacMinh?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Tên cán bộ</th>
                    <th style={{width: '30%'}}>Vai trò</th>
                  </tr>
                </thead>
                {KetQuaXacMinh?.GiaoXacMinh?.ToXacMinh.map((item, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td style={{textAlign: 'center'}}>{index + 1}</td>
                        <td>{item?.TenCanBo}</td>
                        <td>
                          {item?.VaiTro === 1
                            ? 'Phụ trách'
                            : item?.VaiTro === 2
                            ? 'Phối hợp'
                            : item?.VaiTro === 3
                            ? 'Theo dõi'
                            : ''}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            ''
          )}
          <p className="title">Hồ sơ, tài liệu:</p>
          {KetQuaXacMinh?.GiaoXacMinh?.DanhSachHoSoTaiLieu &&
          KetQuaXacMinh?.GiaoXacMinh?.DanhSachHoSoTaiLieu?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                    <th style={{width: '25%'}}>Ngày cập nhật</th>
                    <th style={{width: '25%'}}>Người cập nhật</th>
                    <th style={{width: '30%'}}>File đính kèm</th>
                  </tr>
                </thead>
                {KetQuaXacMinh?.GiaoXacMinh?.DanhSachHoSoTaiLieu.map(
                  (item, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td
                            rowspan={item?.FileDinhKem?.length}
                            style={{textAlign: 'center'}}
                          >
                            {index + 1}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            {item?.name || item?.TenFile}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>
                              {item.NgayCapNhat
                                ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                                : null}
                            </p>
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>{item.NguoiCapNhat}</p>
                          </td>
                          <td>
                            <div className="group-file">
                              {item?.FileDinhKem[0] ? (
                                <p className="file-item">
                                  <a
                                    href={item?.FileDinhKem[0].FileUrl}
                                    target="_blank"
                                  >
                                    {item?.FileDinhKem[0].name ||
                                      item?.FileDinhKem[0]?.TenFile}
                                  </a>
                                </p>
                              ) : null}
                            </div>
                          </td>
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
                  },
                )}
              </table>
            </div>
          ) : (
            ''
          )}
          <div className="step-title box-title">
            <p className="title">Kết quả xác minh</p>
          </div>
          <p className="label">
            Trạng thái xác minh: <span></span>
          </p>
          <p className="title">Kết quả xác minh</p>
          {KetQuaXacMinh?.BuocXacMinh && KetQuaXacMinh?.BuocXacMinh?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Trình tự thủ tục giải quyết</th>
                    <th style={{width: '30%'}}>Hồ sơ, tài liệu</th>
                    <th style={{width: '10%'}}>Ngày cập nhật</th>
                    <th style={{width: '15%'}}>Cán bộ cập nhật </th>
                    <th style={{width: '10%'}}>Trạng thái </th>
                  </tr>
                </thead>
                {KetQuaXacMinh?.BuocXacMinh.map((item, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td
                          rowspan={item?.DanhSachHoSoTaiLieu?.length}
                          style={{textAlign: 'center'}}
                        >
                          {item.OrderBy}
                        </td>
                        <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                          {item?.TenBuoc}
                        </td>
                        <td>
                          <div className="group-file">
                            {item.DanhSachHoSoTaiLieu &&
                            item.DanhSachHoSoTaiLieu[0] ? (
                              <p className="file-item">
                                {item.DanhSachHoSoTaiLieu[0] &&
                                item.DanhSachHoSoTaiLieu[0].FileDinhKem
                                  ? item.DanhSachHoSoTaiLieu[0].FileDinhKem.map(
                                      (item, index) => (
                                        <a href={item.FileUrl} target="_blank">
                                          {item.name || item?.TenFile}
                                        </a>
                                      ),
                                    )
                                  : null}
                              </p>
                            ) : null}
                          </div>
                        </td>
                        <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                          <p>
                            {item?.NgayCapNhat
                              ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                              : null}
                          </p>
                        </td>
                        <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                          <p>{item?.TenCanBo}</p>
                        </td>
                        <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                          <p>{item?.TenTrangThai}</p>
                        </td>
                      </tr>
                      {item.DanhSachHoSoTaiLieu
                        ? item.DanhSachHoSoTaiLieu.map((item, index) => {
                            if (index > 0) {
                              return (
                                <tr>
                                  <td>
                                    <p className="file-item">
                                      {item.FileDinhKem
                                        ? item.FileDinhKem.map(
                                            (item, index) => (
                                              <a
                                                target="_blank"
                                                href={item.FileUrl}
                                              >
                                                {item.name || item?.TenFile}
                                              </a>
                                            ),
                                          )
                                        : null}
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
        </>
      );
    } else if (tab === 4) {
      return !isViewDetails && LoaiKhieuTo1ID !== LoaiKhieuTo.TranhChap ? (
        <>
          <Row gutter={[30, 10]} className="wrapper-row">
            <Col xl={12} span={24}>
              <p className="title line-bottom">
                THÔNG TIN QUYẾT ĐỊNH GIẢI QUYẾT
              </p>
              <div className="group-info">
                <p className="label">
                  Số quyết định:{' '}
                  <span> {ThongTinQuyetDinhGQ?.SoQuyetDinh}</span>
                </p>
                <p className="label">
                  Ngày ra quyết định:{' '}
                  <span>{ThongTinQuyetDinhGQ?.NgayQuyetDinhStr}</span>
                </p>
                <p className="label">
                  Cơ quan ban hành:{' '}
                  <span>{ThongTinQuyetDinhGQ?.TenCoQuanBanHanh}</span>
                </p>
                <p className="label">
                  Thời hạn thi hành:{' '}
                  <span>
                    {ThongTinQuyetDinhGQ?.ThoiHanThiHanh
                      ? dayjs(ThongTinQuyetDinhGQ?.ThoiHanThiHanh).format(
                          'DD/MM/YYYY',
                        )
                      : null}
                  </span>
                </p>
              </div>
              <p className="label" style={{marginBottom: '7px', marginTop: 5}}>
                Tóm tắt nội dung giải quyết:{' '}
                <span>{ThongTinQuyetDinhGQ?.TomTatNoiDungGQ}</span>
              </p>
              <div className="line-break" />
              <p className="title">Văn bản quyết định</p>
              {ThongTinQuyetDinhGQ?.DanhSachHoSoTaiLieu &&
              ThongTinQuyetDinhGQ?.DanhSachHoSoTaiLieu?.length ? (
                <div style={{marginTop: '10px'}} className={'box-file'}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: '5%'}}>STT</th>
                        <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                        <th style={{width: '30%'}}>File đính kèm</th>
                        <th style={{width: '25%'}}>Ngày cập nhật</th>
                        {/* {!isViewDetails ? (
                          <th style={{width: '15%'}}>Thao tác</th>
                        ) : null} */}
                      </tr>
                    </thead>
                    {ThongTinQuyetDinhGQ?.DanhSachHoSoTaiLieu.map(
                      (item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td
                                rowspan={item?.FileDinhKem?.length}
                                style={{textAlign: 'center'}}
                              >
                                {index + 1}
                              </td>
                              <td rowspan={item?.FileDinhKem?.length}>
                                {item?.name || item?.TenFile}
                              </td>
                              <td>
                                <div className="group-file">
                                  {item?.FileDinhKem[0] ? (
                                    <p className="file-item">
                                      <a
                                        href={item?.FileDinhKem[0].FileUrl}
                                        target="_blank"
                                      >
                                        {item?.FileDinhKem[0].name ||
                                          item?.FileDinhKem[0]?.TenFile}
                                      </a>
                                    </p>
                                  ) : null}
                                </div>
                              </td>
                              <td rowspan={item?.FileDinhKem?.length}>
                                <p>
                                  {item.NgayCapNhat
                                    ? dayjs(item.NgayCapNhat).format(
                                        'DD/MM/YYYY',
                                      )
                                    : null}
                                </p>
                              </td>
                            </tr>
                            {item.FileDinhKem
                              ? item.FileDinhKem.map((item, index) => {
                                  if (index > 0) {
                                    return (
                                      <tr>
                                        <td>
                                          <p className="file-item">
                                            <a
                                              href={item.FileUrl}
                                              target="_blank"
                                            >
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
                      },
                    )}
                  </table>
                </div>
              ) : (
                ''
              )}
              <div className="line-break" />
              {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.KienNghiPhanAnh ? (
                <>
                  <div className="group">
                    <p className="label">
                      Phân tích kết quả:{' '}
                      <span>
                        {ThongTinQuyetDinhGQ?.PhanTichKetQua === 1
                          ? 'Đúng'
                          : ThongTinQuyetDinhGQ?.PhanTichKetQua === 2
                          ? 'Đúng 1 phần'
                          : ThongTinQuyetDinhGQ?.PhanTichKetQua === 3
                          ? 'Sai'
                          : ''}
                      </span>
                    </p>
                    <p className="label">
                      Quyết định lần 2:{' '}
                      <span>
                        {ThongTinQuyetDinhGQ?.PhanTichKetQua === 1
                          ? 'Công nhận quyết định lần 1'
                          : ThongTinQuyetDinhGQ?.PhanTichKetQua === 2
                          ? 'Hủy, sửa quyết định lần 1'
                          : ''}
                      </span>
                    </p>
                  </div>
                  <div className="line-break" />
                  <p className="title">
                    Nội dung quyết định giải quyết và phân công thi hành quyết
                    định:
                  </p>
                  {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.KienNghiPhanAnh ? (
                    <>
                      <div className="step-title box-title">
                        <p className="title ">Kiến nghị thu hồi cho nhà nước</p>
                      </div>
                      <div className="wrapper-content">
                        <p className="label">
                          Số tiền:{' '}
                          <span>
                            {formatNumberStr(ThongTinQuyetDinhGQ?.SoTienThuHoi)}
                          </span>
                          <span>(đồng)</span>
                        </p>
                        <p className="label">
                          Số đẩt:{' '}
                          <span>
                            {formatNumberStr(ThongTinQuyetDinhGQ?.SoDatThuHoi)}
                            (m2)
                          </span>
                        </p>
                      </div>
                      <div className="step-title box-title">
                        <p className="title">Đã trả lại cho tổ chức, cá nhân</p>
                      </div>
                      <div className="wrapper-content__group">
                        <p className="label">
                          Số tổ chức được trả quyền lợi:{' '}
                          <span>
                            {formatNumberStr(ThongTinQuyetDinhGQ?.SoToChuc)}
                          </span>
                        </p>
                        <p className="label">
                          Số tiền:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoTienToChucTraLai,
                            )}{' '}
                            (Nghìn đồng)
                          </span>
                        </p>
                        <p className="label">
                          Số đất:
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoDatToChucTraLai,
                            )}{' '}
                            (m2)
                          </span>
                        </p>
                        <p className="label">
                          Số cá nhân được trả quyền lợi:{' '}
                          <span>
                            {formatNumberStr(ThongTinQuyetDinhGQ?.SoCaNhan)}
                          </span>{' '}
                        </p>
                        <p className="label">
                          Số tiền:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoTienCaNhanTraLai,
                            )}{' '}
                            (Nghìn đồng)
                          </span>
                        </p>
                        <p>
                          Số đất:
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoDatCaNhanTraLai,
                            )}{' '}
                            (m2)
                          </span>
                        </p>
                      </div>
                      <div className="step-title box-title">
                        <p className="title">Kiến nghị xử lý hành chính</p>
                      </div>
                      <div className="wrapper-content">
                        <p className="label">
                          Tổng số người bị kiến nghị xử lý:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoNguoiBiKienNghiXuLy,
                            )}
                          </span>
                        </p>
                        <p className="label">
                          Trong đó số cán bộ, công chức, viên chức:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoCanBoBiXuLy,
                            )}{' '}
                          </span>
                        </p>
                      </div>
                      <div className="step-title box-title">
                        <p className="title">Chuyển cơ quan điều tra</p>
                      </div>
                      <div className="wrapper-content">
                        <p className="label">
                          Tổng số người:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoNguoiChuyenCoQuanDieuTra,
                            )}
                          </span>{' '}
                        </p>
                        <p className="label">
                          Trong đó số cán bộ, công chức, viên chức:{' '}
                          <span>
                            {formatNumberStr(
                              ThongTinQuyetDinhGQ?.SoCanBoChuyenCoQuanDieuTra,
                            )}{' '}
                          </span>
                        </p>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </Col>
            <Col xl={12} span={24}>
              <p className="title line-bottom">
                Kết quả thi hành quyết định giải quyết khiếu nại
              </p>
              <div className="group-info">
                <p className="label">
                  Cơ quan thi hành: <span> {ThongTinThiHanh?.TenCoQuan}</span>
                </p>
                <p className="label">
                  Ngày thi hành:{' '}
                  <span>
                    {ThongTinThiHanh?.NgayThiHanh
                      ? dayjs(ThongTinThiHanh?.NgayThiHanh).format('DD/MM/YYYY')
                      : null}
                  </span>
                </p>
                <p className="label">
                  Ghi chú: <span>{ThongTinThiHanh?.GhiChu}</span>
                </p>
              </div>
              <p className="title">Văn bản theo dõi</p>
              {ThongTinThiHanh?.DanhSachHoSoTaiLieu &&
              ThongTinThiHanh?.DanhSachHoSoTaiLieu?.length ? (
                <div style={{marginTop: '10px'}} className={'box-file'}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: '5%'}}>STT</th>
                        <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                        <th style={{width: '30%'}}>File đính kèm</th>
                        <th style={{width: '25%'}}>Ngày cập nhật</th>
                        {/* {!isViewDetails ? (
                          <th style={{width: '15%'}}>Thao tác</th>
                        ) : null} */}
                      </tr>
                    </thead>
                    {ThongTinThiHanh?.DanhSachHoSoTaiLieu?.map(
                      (item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td
                                rowspan={item?.FileDinhKem?.length}
                                style={{textAlign: 'center'}}
                              >
                                {index + 1}
                              </td>
                              <td rowspan={item?.FileDinhKem?.length}>
                                {item?.name || item?.TenFile}
                              </td>
                              <td>
                                <div className="group-file">
                                  {item?.FileDinhKem[0] ? (
                                    <p className="file-item">
                                      <a
                                        href={item?.FileDinhKem[0].FileUrl}
                                        target="_blank"
                                      >
                                        {item?.FileDinhKem[0].name ||
                                          item?.FileDinhKem[0]?.TenFile}
                                      </a>
                                    </p>
                                  ) : null}
                                </div>
                              </td>
                              <td rowspan={item?.FileDinhKem?.length}>
                                <p>
                                  {item.NgayCapNhat
                                    ? dayjs(item.NgayCapNhat).format(
                                        'DD/MM/YYYY',
                                      )
                                    : null}
                                </p>
                              </td>
                              {/* {!isViewDetails ? (
                              <td
                                rowspan={item?.FileDinhKem?.length}
                                style={{textAlign: 'center'}}
                              >
                                <div className="action-btn">
                                  <Tooltip title={'Sửa Hồ sơ, tài liệu'}>
                                    <EditOutlined
                                      onClick={() =>
                                        this.showModalHoSoTaiLieu(index)
                                      }
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Xóa Hồ sơ, tài liệu'}>
                                    <DeleteOutlined
                                      onClick={() =>
                                        this.deteleFile(item, index)
                                      }
                                    />
                                  </Tooltip>
                                </div>
                              </td>
                            ) : null} */}
                            </tr>
                            {item.FileDinhKem
                              ? item.FileDinhKem.map((item, index) => {
                                  if (index > 0) {
                                    return (
                                      <tr>
                                        <td>
                                          <p className="file-item">
                                            <a
                                              href={item.FileUrl}
                                              target="_blank"
                                            >
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
                      },
                    )}
                  </table>
                </div>
              ) : (
                ''
              )}
              <div className="line-break" />
              <p className="title">
                Nội dung đã thi hành quyết định giải quyết
              </p>
              <div className="step-title box-title">
                <p className="title">Kiến nghị thu hồi cho nhà nước</p>
              </div>
              <div className="wrapper-content">
                <p className="label">
                  Số tiền:{' '}
                  <span>{formatNumberStr(ThongTinThiHanh?.SoTienThuHoi)}</span>
                  <span>(đồng)</span>
                </p>
                <p className="label">
                  Số đẩt:{' '}
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoDatThuHoi)}(m2)
                  </span>
                </p>
              </div>
              <div className="step-title box-title">
                <p className="title">Đã trả lại cho tổ chức, cá nhân</p>
              </div>
              <div className="wrapper-content__group">
                <p className="label">
                  Số tổ chức được trả quyền lợi:{' '}
                  <span>{formatNumberStr(ThongTinThiHanh?.SoToChuc)}</span>
                </p>
                <p className="label">
                  Số tiền:{' '}
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoTienToChucTraLai)}{' '}
                    (Nghìn đồng)
                  </span>
                </p>
                <p className="label">
                  Số đất:
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoDatToChucTraLai)} (m2)
                  </span>
                </p>
                <p className="label">
                  Số cá nhân được trả quyền lợi:{' '}
                  <span>{formatNumberStr(ThongTinThiHanh?.SoCaNhan)}</span>{' '}
                </p>
                <p className="label">
                  Số tiền:{' '}
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoTienCaNhanTraLai)}{' '}
                    (Nghìn đồng)
                  </span>
                </p>
                <p>
                  Số đất:
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoDatCaNhanTraLai)} (m2)
                  </span>
                </p>
              </div>
              <div className="step-title box-title">
                <p className="title">Kiến nghị xử lý hành chính</p>
              </div>
              <div className="wrapper-content">
                <p className="label">
                  Tổng số người bị kiến nghị xử lý:{' '}
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoNguoiBiKienNghiXuLy)}
                  </span>
                </p>
                <p className="label">
                  Trong đó số cán bộ, công chức, viên chức:{' '}
                  <span>
                    {formatNumberStr(ThongTinThiHanh?.SoCanBoBiXuLy)}{' '}
                  </span>
                </p>
              </div>
              <div className="step-title box-title">
                <p className="title">Chuyển cơ quan điều tra</p>
              </div>
              <div className="wrapper-content">
                <p className="label">
                  Tổng số người:{' '}
                  <span>
                    {formatNumberStr(
                      ThongTinThiHanh?.SoNguoiChuyenCoQuanDieuTra,
                    )}
                  </span>{' '}
                </p>
                <p className="label">
                  Trong đó số cán bộ, công chức, viên chức:{' '}
                  <span>
                    {formatNumberStr(
                      ThongTinThiHanh?.SoCanBoChuyenCoQuanDieuTra,
                    )}{' '}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div>
            <p className="title">Kết quả tranh chấp</p>
            <p className="title">Thông tin hội đồng tranh chấp </p>
            {KetQuaTranhChap?.lstHoiDong &&
            KetQuaTranhChap?.lstHoiDong?.length ? (
              <div style={{marginTop: '10px'}} className={'box-file'}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '5%', textAlign: 'center'}}>STT</th>
                      <th style={{width: '60%'}}>Tên cán bộ</th>
                      <th style={{width: '35%'}}>Nhiệm vụ</th>
                    </tr>
                  </thead>
                  {KetQuaTranhChap?.lstHoiDong.map((item, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td style={{textAlign: 'center'}}>{index + 1}</td>
                          <td>{item?.TenCanBo}</td>
                          <td>
                            <p>{item.NhiemVu}</p>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            ) : (
              ''
            )}
            <p className="title">
              Nội dung tranh chấp: <span>{KetQuaTranhChap?.NDHoaGiai}</span>
            </p>
            <p className="title">
              Kết quả tranh chấp: <span>{KetQuaTranhChap?.KetQuaHoaGiai}</span>
            </p>
            <p className="title">Hồ sơ, tài liệu</p>
            {KetQuaTranhChap?.DanhSachHoSoTaiLieu &&
            KetQuaTranhChap?.DanhSachHoSoTaiLieu?.length ? (
              <div style={{marginTop: '10px'}} className={'box-file'}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '5%', textAlign: 'center'}}>STT</th>
                      <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                      <th style={{width: '25%'}}>Ngày cập nhật</th>
                      <th style={{width: '25%'}}>Người cập nhật</th>
                      <th style={{width: '30%'}}>File đính kèm</th>
                    </tr>
                  </thead>
                  {KetQuaTranhChap?.DanhSachHoSoTaiLieu.map((item, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td
                            rowspan={item?.FileDinhKem?.length}
                            style={{textAlign: 'center'}}
                          >
                            {index + 1}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            {item?.name || item?.TenFile}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>
                              {item.NgayCapNhat
                                ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                                : null}
                            </p>
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>{item.TenNguoiCapNhat}</p>
                          </td>
                          <td>
                            <div className="group-file">
                              {item?.FileDinhKem[0] ? (
                                <p className="file-item">
                                  <a
                                    target="_blank"
                                    href={item?.FileDinhKem[0].FileUrl}
                                  >
                                    {item?.FileDinhKem[0].name ||
                                      item?.FileDinhKem[0]?.TenFile}
                                  </a>
                                </p>
                              ) : null}
                            </div>
                          </td>
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

            {/* <p>Tổng số người: {formatNumberStr(dataEdit.SoTien)} </p>
            <p>
              Trong đó số cán bộ, công chức, viên chức:{' '}
              {formatNumberStr(dataEdit.SoDat)} (m2)
            </p> */}
          </div>
        </>
      );
    } else if (tab === 5) {
      return (
        <div className="progress" ref={this.progressRef}>
          {ListProgress &&
            ListProgress.map((item, index) => (
              <div
                className={`progress-wrapper ${
                  index === ListProgress.length - 1 ? 'progress-end' : ''
                }`}
              >
                {item.dataChild.map((item) => (
                  <div
                    className={`progress-items ${
                      item.TrangThai === 0 ? 'progress-items__unfulfilled' : ''
                    }`}
                  >
                    <div className="progress-items__wrap">
                      <div className="progress-items__title">
                        <Tooltip title={item.BuocThucHien}>
                          <p>{item.BuocThucHien}</p>
                        </Tooltip>
                      </div>
                      <div className="progress-items__content">
                        <div className="time">
                          <ion-icon
                            class="progress-icon"
                            name="calendar-clear-outline"
                          ></ion-icon>
                          <p>
                            {item?.ThoiGianThucHien
                              ? dayjs(item?.ThoiGianThucHien).format(
                                  'DD/MM/YYYY',
                                )
                              : null}
                          </p>
                        </div>
                        <div className="user">
                          <ion-icon
                            class="progress-icon"
                            name="person-outline"
                          ></ion-icon>
                          <p>{item?.CanBoThucHien}</p>
                        </div>
                        <div className="location">
                          <ion-icon
                            class="progress-icon"
                            name="business-outline"
                          ></ion-icon>
                          <p>{item?.TenCoQuan}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      );
    } else if (tab === 6) {
      return (
        <div className="wrap-table" ref={this.progressRef}>
          <p className="title">Thông tin văn bản đôn đốc</p>
          {ThongTinDonDoc && ThongTinDonDoc?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%', textAlign: 'center'}}>STT</th>
                    <th style={{width: '30%'}}>Cơ quan đôn đốc</th>
                    <th style={{width: '25%'}}>Ngày đôn đốc</th>
                    <th style={{width: '25%'}}>Nội dung đôn đốc</th>
                    <th style={{width: '30%', textAlign: 'center'}}>
                      File đôn đốc
                    </th>
                  </tr>
                </thead>
                {ThongTinDonDoc?.map((item, index) => {
                  const FileDinhKem = [];
                  const DanhSachHoSoTaiLieu = item.DanhSachHoSoTaiLieu;
                  if (DanhSachHoSoTaiLieu) {
                    DanhSachHoSoTaiLieu.forEach((item) => {
                      if (item?.FileDinhKem) {
                        item.FileDinhKem.forEach((file) =>
                          FileDinhKem.push(file),
                        );
                      }
                    });
                  }
                  return (
                    <tbody>
                      <tr>
                        <td style={{textAlign: 'center'}}>{index + 1}</td>
                        <td>{DonThu?.TenCoQuanXL}</td>
                        <td>
                          <p>
                            {item?.NgayDonDoc
                              ? dayjs(item.NgayDonDoc).format('DD/MM/YYYY')
                              : null}
                          </p>
                        </td>
                        <td>
                          <p>{item?.NoiDungDonDoc}</p>
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <div className="group-file">
                            {FileDinhKem.length > 0 ? (
                              <Popover
                                content={renderContentDownload(FileDinhKem)}
                              >
                                <DownloadOutlined
                                  style={{fontSize: 15, color: 'blue'}}
                                />
                              </Popover>
                            ) : (
                              ''
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    } else if (tab === 7) {
      return ThongTinRutDon?.RutDonID ? (
        <>
          <div>
            <p className="label">
              Lý do rút đơn: <span>{ThongTinRutDon?.LyDoRutDon}</span>
            </p>
            {/* <p className="title">
              Lý do rút đơn: <span>{ThongTinRutDon?.LyDoRutDon}</span>
            </p> */}
            <p className="title">Hồ sơ, tài liệu</p>
            {ThongTinRutDon?.DanhSachHoSoTaiLieu &&
            ThongTinRutDon?.DanhSachHoSoTaiLieu?.length ? (
              <div style={{marginTop: '10px'}} className={'box-file'}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '5%', textAlign: 'center'}}>STT</th>
                      <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                      <th style={{width: '25%'}}>Ngày cập nhật</th>
                      <th style={{width: '25%'}}>Người cập nhật</th>
                      <th style={{width: '30%'}}>File đính kèm</th>
                    </tr>
                  </thead>
                  {ThongTinRutDon?.DanhSachHoSoTaiLieu.map((item, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td
                            rowspan={item?.FileDinhKem?.length}
                            style={{textAlign: 'center'}}
                          >
                            {index + 1}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            {item?.name || item?.TenFile}
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>
                              {ThongTinRutDon?.NgayCapNhap
                                ? dayjs(ThongTinRutDon.NgayCapNhap).format(
                                    'DD/MM/YYYY',
                                  )
                                : null}
                            </p>
                          </td>
                          <td rowspan={item?.FileDinhKem?.length}>
                            <p>{ThongTinRutDon?.TenCanBo}</p>
                          </td>
                          <td>
                            <div className="group-file">
                              {item?.FileDinhKem[0] ? (
                                <p className="file-item">
                                  <a
                                    target="_blank"
                                    href={item?.FileDinhKem[0].FileUrl}
                                  >
                                    {item?.FileDinhKem[0].name ||
                                      item?.FileDinhKem[0]?.TenFile}
                                  </a>
                                </p>
                              ) : null}
                            </div>
                          </td>
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
            ) : null}
          </div>
        </>
      ) : null;
    }
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
      DanhSachHuongXuLy,
      DanhSachCanBoXuLy,
      TabsKey,
    } = this.props;
    const {DonThu, ThongTinRutDon, ThongTinDonDoc} = dataEdit;

    const {
      ListFileDinhKem,
      loading,
      isFile,
      DanhSachHoSoTaiLieu,
      currentKey,
      DanhSachHoSoKhieuNai,
      ListProgress,
    } = this.state;

    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;

    const itemsTabs = [
      {
        key: 1,
        forceRender: true,
        // label: <div className="ant-tabs__title">Thông tin đơn thư</div>,
        children: <>{this.handleRenderContentKhieuNai(1)}</>,
      },
      {
        key: 2,
        forceRender: true,
        // label: <div className="ant-tabs__title">Kết quả xử lý</div>,
        children: <>{this.handleRenderContentKhieuNai(2)}</>,
      },
      {
        key: 3,
        forceRender: true,
        // label: <div className="ant-tabs__title">Kết quả xác minh</div>,
        children: <>{this.handleRenderContentKhieuNai(3)}</>,
      },
      {
        key: 4,
        forceRender: true,
        // label: (
        //   <div className="ant-tabs__title">Kết quả giải quyết và thi hành</div>
        // ),
        children: <>{this.handleRenderContentKhieuNai(4)}</>,
      },
      {
        key: 6,
        forceRender: true,
        // label: (
        //   <div className="ant-tabs__title">Kết quả giải quyết và thi hành</div>
        // ),
        children: <>{this.handleRenderContentKhieuNai(6)}</>,
      },
      {
        key: 7,
        forceRender: true,
        // label: (
        //   <div className="ant-tabs__title">Kết quả giải quyết và thi hành</div>
        // ),
        children: <>{this.handleRenderContentKhieuNai(7)}</>,
      },
      // {
      //   key: 5,
      //   forceRender: true,
      //   // label: (
      //   //   <div className="ant-tabs__title">
      //   //     Tiến trình xử lý, giải quyết và thi hành
      //   //   </div>
      //   // ),
      //   children: <>{this.handleRenderContentKhieuNai(5)}</>,
      // },
    ];

    const checkRutDon = ThongTinRutDon?.RutDonID;

    return (
      <Modal
        title={`Chi tiết đơn thư`}
        visible={visible}
        className="center-modal__footer"
        footer={
          <Button className="btn-danger" onClick={() => onCancel()}>
            Đóng
          </Button>
        }
        width={1300}
        onCancel={() => onCancel()}
        padding={0}
        key={fileKey}
      >
        <Wrapper>
          <div className="wrap-swiper">
            <Swiper
              slidesPerView={1}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                660: {
                  slidesPerView: 3,
                },
                850: {
                  slidesPerView: 3,
                },
                1100: {
                  slidesPerView: 4,
                },
                1500: {
                  slidesPerView: 5,
                },
                1750: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              // navigation={{
              //   nextEl: '.swiper-button-next',
              //   prevEl: '.swiper-button-prev',
              // }}
              // slidesOffsetBefore={20}
              // slidesOffsetAfter={20}
              modules={[Navigation]}
              className="toolbar ant-tabs "
            >
              <SwiperSlide>
                <div
                  className={`nav-item ant-tabs-tab ${
                    this.state.currentKey === 1 ? 'ant-tabs-tab-active' : ''
                  }`}
                  onClick={() => {
                    this.setState({currentKey: 1});
                  }}
                >
                  <p className="ant-tabs__title">Thông tin đơn thư</p>
                </div>
              </SwiperSlide>
              {checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 7 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 7});
                    }}
                  >
                    <p className="ant-tabs__title">Thông tin rút đơn</p>
                  </div>
                </SwiperSlide>
              ) : null}
              {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.TranhChap &&
              !checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 2 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 2});
                    }}
                  >
                    <p className="ant-tabs__title">Kết quả xử lý</p>
                  </div>
                </SwiperSlide>
              ) : null}
              {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.TranhChap &&
              !checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 3 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 3});
                    }}
                  >
                    <p className="ant-tabs__title">Kết quả xác minh</p>
                  </div>
                </SwiperSlide>
              ) : null}
              {!checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 4 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 4});
                    }}
                  >
                    <p className="ant-tabs__title">
                      {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.TranhChap
                        ? 'Kết quả giải quyết và thi hành'
                        : 'Kết quả tranh chấp'}
                    </p>
                  </div>
                </SwiperSlide>
              ) : null}
              {!checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 5 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 5});
                    }}
                  >
                    <p className="ant-tabs__title">
                      {DonThu?.LoaiKhieuTo1ID !== LoaiKhieuTo.TranhChap
                        ? 'Tiến trình xử lý, giải quyết và thi hành'
                        : 'Tiến trình xử lý'}{' '}
                    </p>
                  </div>
                </SwiperSlide>
              ) : null}
              {ThongTinDonDoc?.length && !checkRutDon ? (
                <SwiperSlide>
                  <div
                    className={`nav-item ant-tabs-tab ${
                      this.state.currentKey === 6 ? 'ant-tabs-tab-active' : ''
                    }`}
                    onClick={() => {
                      this.setState({currentKey: 6});
                    }}
                  >
                    <p className="ant-tabs__title">Văn bản đôn đốc</p>
                  </div>
                </SwiperSlide>
              ) : null}
            </Swiper>
          </div>
          <Tabs
            onTabClick={this.handleClickTabs}
            items={itemsTabs}
            activeKey={this.state.currentKey}
            onChange={(key) => {
              this.setState({currentKey: Number(key)});
            }}
          ></Tabs>
          <div
            className="ant-tabs"
            style={{display: this.state.currentKey === 5 ? '' : 'none'}}
          >
            {this.handleRenderContentKhieuNai(5)}
          </div>
          <ModalAddEditHoSoTaiLieu
            visible={this.state.visibleModalHoSoTaiLieu}
            dataEdit={this.state.dataModalHoSoTaiLieu}
            key={this.state.keyModalHoSoTaiLieu}
            onCancel={this.closeModalHoSoTaiLieu}
            onCreate={this.submitModalHoSoTaiLieu}
          />
        </Wrapper>
      </Modal>
    );
  }
}

export default ModalChiTietDonThu;
