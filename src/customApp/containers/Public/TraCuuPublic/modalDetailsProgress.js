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
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import {Textarea} from '../../../../components/uielements/exportComponent';
import Wrapper from './modalDetailsProgress.styled';
import {handleTextLong} from '../../../../helpers/utility';
import api from './config';
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
  InputNumberFormat,
  Modal,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {formatNumberStr} from '../../../../helpers/utility';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {getLocalKey} from '../../../../helpers/utility';
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
      fileView: {},
      fileKey: 0,
      loading: false,
      QuyetDinh: 1,
      isFile: false,
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
    const TienTrinhXuLy = dataEdit?.TienTrinhXuLy;
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
    const TienTrinhXuLy = dataEdit?.TienTrinhXuLy;
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

  // componentDidUpdate() {
  //   const wrapper = document.querySelector('.progress');
  //   const children = wrapper?.children;
  //   if (children) {
  //     const progressEndElement = document.querySelector('.progress-end');
  //     let indexEnd;
  //     for (let i = 0; i < children.length; i++) {
  //       const className = children[i].getAttribute('class').toString();
  //       const isEnd = className.includes('progress-end');
  //       if (isEnd) {
  //         indexEnd = i + 1;
  //       }
  //     }
  //     if (indexEnd > 0 && indexEnd % 2 === 0) {
  //       progressEndElement.classList.add('justifyEnd');
  //     }
  //   }
  //   if (this.progressRef.current) {
  //     const progressWrapper =
  //       this.progressRef.current.querySelectorAll('.progress-wrapper');
  //     if (progressWrapper) {
  //       for (let i = 0; i < progressWrapper.length; i++) {
  //         const child = progressWrapper[i].children;
  //         let maxHeight = 0;
  //         for (let j = 0; j < child.length; j++) {
  //           const itemTitle = child[j].querySelector('.progress-items__title');
  //           const heightItemTitle = itemTitle.scrollHeight;
  //           if (heightItemTitle > maxHeight) {
  //             maxHeight = heightItemTitle;
  //           }
  //         }
  //         for (let k = 0; k < child.length; k++) {
  //           const itemTitle = child[k].querySelector('.progress-items__title');
  //           itemTitle.style.height = `${maxHeight}px`;
  //         }
  //       }
  //     }
  //   }
  // }

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

  handleRenderContentKhieuNai = (tab) => {
    const {ListProgress} = this.state;
    if (tab === 5) {
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

    return (
      <Modal
        title={`Chi tiết tiến trình xử lý hồ sơ`}
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
        <Wrapper>{this.handleRenderContentKhieuNai(5)}</Wrapper>
      </Modal>
    );
  }
}

export default ModalChiTietDonThu;
