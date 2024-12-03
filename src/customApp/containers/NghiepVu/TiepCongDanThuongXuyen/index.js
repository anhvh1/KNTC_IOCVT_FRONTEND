import {Modal, Table, Tabs, Tooltip, message, Spin} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import actions from '../../../redux/NghiepVu/TiepCongDanThuongXuyen/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './index.styled';
import {useHistory, useLocation} from 'react-router';
import {Input} from 'antd';
import icons from '../icons';
import dayjs from 'dayjs';
import {
  Button,
  // InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  LoaiFileDinhKem,
  LoaiMaIn,
  LoaiTiepDan as TypeLoaiTiepDan,
} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getConfigLocal,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  handleTextLong,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalDanKhongDen from '../Shared/Modal/ModalDanKhongDen';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {getLocalKey} from '../../../../helpers/utility';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import moment from 'moment';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import ModalTiepDanCacBanNganh from '../Shared/Modal/ModalTiepDanCacBanNganh';
import actionsApp from '../../../../redux/app/actions';
import {useParams} from 'react-router';
import ModalInPhieu from '../Shared/Modal/modalInPhieu';
import PageWrap from '../../../../components/utility/PageWrap';
import {mapFileToPromiseArray} from '../../../../helpers/utility';
const TiepCongDanThuongXuyen = (props) => {
  const url = props.location.pathname
    .toString()
    .slice(props.location.pathname.lastIndexOf('/') + 1);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [modalKey, inceaseModalKey] = useKey();
  const [confirmLoading, setConfirmLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  const [DanhSachBieuMau, setDanhSachBieuMau] = useState([]);
  const [visibleModalDanKhongDen, setVisibleModalDanKhongDen] = useState(false);
  const [keyModalDanKhongDen, setKeyModalDanKhongDen] = useState(0);
  const [visibleModalInPhieu, setVisibleModalInPhieu] = useState(false);
  const [keyModalInPhieu, setKeyModalInPhieu] = useState(0);
  const [LoaiTiepDanID, setLoaiTiepDanID] = useState(0);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    DanhSachLoaiKhieuTo,
    DanhSachQuocTich,
    DanhSachDanToc,
    DanhSachTinh,
    tableLoading,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    // props.getInitData(filterData);
  }, [filterData]);

  const handleRenderTitle = () => {
    const url = props.location.pathname
      .toString()
      .slice(props.location.pathname.lastIndexOf('/') + 1);
    switch (url) {
      case 'tiep-thuong-xuyen':
        document.title = 'Tiếp thường xuyên';
        return 'Tiếp thường xuyên';
      case 'tiep-dot-xuat':
        document.title = 'Tiếp đột xuất';
        return 'Tiếp đột xuất';
      case 'tiep-dinh-ky':
        document.title = 'Tiếp định kỳ';
        return 'Tiếp định kỳ';
      default:
        return false;
    }
  };

  useEffect(() => {
    const route = location.pathname.slice(
      location.pathname.lastIndexOf('/') + 1,
    );

    let LoaiTiepDanID = 0;
    if (route === 'tiep-thuong-xuyen') {
      LoaiTiepDanID = TypeLoaiTiepDan.ThuongXuyen;
    } else if (route === 'tiep-dinh-ky') {
      LoaiTiepDanID = TypeLoaiTiepDan.DinhKy;
    } else if (route === 'tiep-dot-xuat') {
      LoaiTiepDanID = TypeLoaiTiepDan.DotXuat;
    }
    setLoaiTiepDanID(LoaiTiepDanID);
    props.getData();
  }, []);

  useEffect(() => {
    if (!tableLoading) {
      if (Number(filterData.TiepDanKhongDonID)) {
        const TiepDanID = filterData.TiepDanKhongDonID;
        api
          .ChiTietDonThu({TiepDanID})
          .then((res) => {
            if (res.data.Status > 0) {
              setDataModalAddEdit(
                res.data.Data ? {...res.data.Data, isReload: true} : {},
              );
              inceaseModalKey();
              setConfirmLoading(false);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      } else {
        api.GetSTTHoSo().then((res) => {
          if (res.data.Status > 0) {
            setDataModalAddEdit({
              SoDonThu: res.data.Data,
              isReload: true,
            });
            inceaseModalKey();
            setConfirmLoading(false);
          }
        });
      }
    }
  }, [tableLoading]);

  const resetDataForm = () => {
    setDataModalAddEdit({});
    inceaseModalKey();
  };

  // Hàm để gọi một API với Promise
  function callAPIFile(formDataFile, item) {
    return new Promise((resolve, reject) => {
      api
        .UploadFile(formDataFile)
        .then((res) => {
          if (res.data.Status > 0 && item) {
            item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
            return res.data.Data[0];
          } else {
            setLoadingSave(false);
            message.destroy();
            message.warning(res.data.Data);
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      // fetch(url)
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     resolve(data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  }

  // Hàm để gọi danh sách các API theo thứ tự và chờ đợi trước khi gọi API tiếp theo
  function callAPIsSequentially() {
    let results = [];

    // Sử dụng reduce để gọi API một cách tuần tự
    return urls
      .reduce((previousPromise, url) => {
        return previousPromise.then(() => {
          // Gọi API và thêm kết quả vào mảng results
          return callAPIFile(formDataFile).then((data) => {
            results.push(data);
          });
        });
      }, Promise.resolve()) // Trả về một Promise resolved để bắt đầu chuỗi
      .then(() => {
        // Trả về kết quả sau khi tất cả các API đã được gọi
        return results;
      });
  }

  const submitModalAddEdit = async (data) => {
    const TiepDanKhongDonID = Number(filterData.TiepDanKhongDonID);
    const XuLyDonID = Number(filterData.XuLyDonID);
    const DonThuID = Number(filterData.DonThuID);
    const url = window.location.href.slice(
      0,
      window.location.href.lastIndexOf('/'),
    );
    setLoadingSave(true);
    // const LoaiFile = {
    //   FileType: LoaiFileDinhKem.FileHoSo,
    // };
    if (!TiepDanKhongDonID && !XuLyDonID && !DonThuID) {
      if (data.DanhSachHoSoTaiLieu) {
        const Promise_Files = [];

        async function uploadFiles(files, item) {
          for (const file of files) {
            if (!file.FileID) {
              const formDataFile = new FormData();
              formDataFile.append('files', file);
              formDataFile.append(
                'FileDinhKemStr',
                JSON.stringify({
                  FileType: item.FileType,
                  TenFile: item?.TenFile || item.name,
                }),
              );

              try {
                const res = await api.UploadFile(formDataFile);
                if (res.data.Status > 0) {
                  item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
                  Promise_Files.push(res.data.Data[0]);
                } else {
                  setLoadingSave(false);
                  message.destroy();
                  message.warning(res.data.Data);
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
            }
          }
        }

        // Sử dụng vòng lặp for...of thay vì map
        if (data?.DanhSachHoSoTaiLieu) {
          for (const item of data.DanhSachHoSoTaiLieu) {
            item.DanhSachFileDinhKemID = [];
            if (item?.FileDinhKem && item) {
              await uploadFiles(item.FileDinhKem, item);
            }
          }
        }

        // const Promise_Files = [];
        // data.DanhSachHoSoTaiLieu.map(async (item, index) => {
        //   item.DanhSachFileDinhKemID = [];
        //   return item.FileDinhKem.map(async (files) => {
        //     // if (files.FileID) {
        //     //   item.DanhSachFileDinhKemID.push(files.FileID);
        //     // }
        //     if (!files.FileID) {
        //       const formDataFile = new FormData();
        //       formDataFile.append('files', files);
        //       formDataFile.append(
        //         'FileDinhKemStr',
        //         JSON.stringify({
        //           FileType: item.FileType,
        //           TenFile: item?.TenFile || item.name,
        //         }),
        //       );

        //       Promise_Files.push(
        //         api.UploadFile(formDataFile).then((res) => {
        //           if (res.data.Status > 0) {
        //             item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
        //             return res.data.Data[0];
        //           } else {
        //             setLoadingSave(false);
        //             message.destroy();
        //             message.warning(res.data.Data);
        //           }
        //         }),
        //       );
        //     }
        //   });
        // });
        Promise.all(Promise_Files).then((list) => {
          api.ThemMoiDonThu({...data, LoaiTiepDanID}).then((res) => {
            setLoadingSave(false);
            if (!res || !res.data || res.data.Status !== 1) {
              message.error(
                `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
              );
            } else {
              message.success(res.data.Message);
              resetDataForm();
              inceaseModalKey();

              handleRedirectXuLyDon(data?.isPrint, res.data.Data.XuLyDonID);
            }
          });
        });
      } else {
        api.ThemMoiDonThu({...data, LoaiTiepDanID}).then((res) => {
          setLoadingSave(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            resetDataForm();
            inceaseModalKey();
            handleRedirectXuLyDon(data?.isPrint, res.data.Data.XuLyDonID);
          }
        });
      }
    } else {
      data.XuLyDonID = XuLyDonID;
      data.TiepDanKhongDonID = TiepDanKhongDonID;
      data.DonThuID = DonThuID;
      if (data.DanhSachHoSoTaiLieu) {
        const Promise_Files = [];

        async function uploadFiles(files, item) {
          for (const file of files) {
            if (!file.FileID) {
              const formDataFile = new FormData();
              formDataFile.append('files', file);
              formDataFile.append(
                'FileDinhKemStr',
                JSON.stringify({
                  FileType: item.FileType,
                  TenFile: item?.TenFile || item.name,
                }),
              );

              try {
                const res = await api.UploadFile(formDataFile);
                if (res.data.Status > 0) {
                  item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
                  Promise_Files.push(res.data.Data[0]);
                } else {
                  setLoadingSave(false);
                  message.destroy();
                  message.warning(res.data.Data);
                }
              } catch (error) {
                console.error('Error uploading file:', error);
              }
            }
          }
        }

        // Sử dụng vòng lặp for...of thay vì map
        if (data?.DanhSachHoSoTaiLieu) {
          for (const item of data.DanhSachHoSoTaiLieu) {
            item.DanhSachFileDinhKemID = [];
            if (item?.FileDinhKem && item) {
              await uploadFiles(item.FileDinhKem, item);
            }
          }
        }
        // const Promise_Files = [];
        // data.DanhSachHoSoTaiLieu.map(async (item, index) => {
        //   item.DanhSachFileDinhKemID = [];
        //   if (!item.FileDinhKemDelete) {
        //     item.FileDinhKemDelete = [];
        //   }
        //   // item.FileDinhKem.map((files) => {
        //   // });
        //   return item.FileDinhKem.map(async (files) => {
        //     if (files.FileID) {
        //       item.DanhSachFileDinhKemID.push(files.FileID);
        //     }
        //     if (!files.FileID) {
        //       const formDataFile = new FormData();
        //       formDataFile.append('files', files);
        //       formDataFile.append(
        //         'FileDinhKemStr',
        //         JSON.stringify({
        //           // ...LoaiFile,
        //           FileType: item.FileType,
        //           TenFile: item?.TenFile || item.name,
        //         }),
        //       );
        //       Promise_Files.push(
        //         api.UploadFile(formDataFile).then((res) => {
        //           if (res.data.Status > 0) {
        //             item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
        //             return res.data.Data;
        //           } else {
        //             setLoadingSave(false);
        //             message.destroy();
        //             message.warning(res.data.Data);
        //           }
        //         }),
        //       );
        //     }
        //   });
        // });
        Promise.all(Promise_Files).then((list) => {
          api
            .SuaDonThu({...data, LoaiTiepDanID})
            .then((res) => {
              setLoadingSave(false);
              if (res.data.Status > 0) {
                message.destroy();
                message.success(res.data.Message);
                resetDataForm();
                handleRedirectXuLyDon(data?.isPrint, res.data.Data.XuLyDonID);
              } else {
                message.destroy();
                message.error(`${res.data.Message}`);
              }
            })
            .catch((err) => {
              message.destroy();
              message.error(`${err.toString()}`);
            });
        });
      } else {
        delete data.FileDinhKem;
        api
          .SuaDonThu({...data, LoaiTiepDanID})
          .then((res) => {
            setLoadingSave(false);
            if (res.data.Status > 0) {
              message.destroy();
              message.success(res.data.Message);
              resetDataForm();
              handleRedirectXuLyDon(data?.isPrint, res.data.Data.XuLyDonID);
            } else {
              message.destroy();
              message.error(`${res.data.Message}`);
            }
          })
          .catch((err) => {
            message.destroy();
            message.error(`${err.toString()}`);
          });
      }
    }
  };

  const handleRedirectXuLyDon = (isPrint, XuLyDonID) => {
    if (isPrint) {
      history.push(`xu-ly-don-thu?isPrint=${isPrint}&XuLyDonID=${XuLyDonID}`);
      dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
    } else {
      history.push(`xu-ly-don-thu`);
      dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
    }
  };

  const showModalDanKhongDen = () => {
    setKeyModalDanKhongDen((prevKey) => prevKey + 1);
    setVisibleModalDanKhongDen(true);
  };

  const hideModalDanKhongDen = () => {
    setVisibleModalDanKhongDen(false);
  };

  const submitModalDanKhongDen = (value) => {
    value.LoaiTiepDanID = LoaiTiepDanID;
    api
      .TiepDanKhongDen(value)
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          hideModalDanKhongDen();
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const closeModalBieuMau = () => {
    setVisibleModalInPhieu(false);
  };

  const checkTiepDan = () => {
    const url = props.location.pathname
      .toString()
      .slice(props.location.pathname.lastIndexOf('/') + 1);
    switch (url) {
      case 'tiep-thuong-xuyen':
        return false;
      case 'tiep-dot-xuat':
        return true;
      case 'tiep-dinh-ky':
        return true;
      default:
        return false;
    }
  };

  const SaveAndPrint = () => {
    setKeyModalInPhieu((prevKey) => prevKey + 1);
    setVisibleModalInPhieu(true);
    hideModalDanKhongDen();
  };

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>{handleRenderTitle()}</PageHeader>
        <PageAction>
          {url === 'tiep-dinh-ky' ? (
            <Button
              type="primary"
              className="btn-center"
              onClick={showModalDanKhongDen}
            >
              Dân không đến
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box isFullHeight={true}>
        <Wrapper></Wrapper>
        <ModalTiepDanCacBanNganh
          showThanhPhanTiepDan={checkTiepDan()}
          dataEdit={dataModalAddEdit}
          loading={confirmLoading}
          loadingSave={loadingSave}
          key={modalKey}
          onCreate={submitModalAddEdit}
          onCancel={resetDataForm}
          DanhSachLoaiKhieuTo={DanhSachLoaiKhieuTo}
          DanhSachQuocTich={DanhSachQuocTich}
          DanhSachDanToc={DanhSachDanToc}
          DanhSachTinh={DanhSachTinh}
          tableLoading={tableLoading}
          LoaiKhieuTo1ID={filterData.tabsKey ? filterData.tabsKey : 1}
        />
      </Box>
      <ModalDanKhongDen
        visible={visibleModalDanKhongDen}
        onCancel={hideModalDanKhongDen}
        key={keyModalDanKhongDen}
        onCreate={submitModalDanKhongDen}
        onPrint={SaveAndPrint}
      />
      <ModalInPhieu
        visible={visibleModalInPhieu}
        DanhSachBieuMau={DanhSachBieuMau}
        key={keyModalInPhieu}
        onCancel={closeModalBieuMau}
        LoaiMaIn={LoaiMaIn.BienBanTiepCongDan}
      />

      <ModalInPhieu />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.TiepDanThuongXuyen,
    role: getRoleByKey(state.Auth.role, 'tiep-thuong-xuyen'),
  };
}

export default connect(mapStateToProps, actions)(TiepCongDanThuongXuyen);
