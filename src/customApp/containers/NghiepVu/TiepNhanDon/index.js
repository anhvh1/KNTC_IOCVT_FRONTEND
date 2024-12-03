import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/TiepNhanDon/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import ModalTiepDanCacBanNganh from '../Shared/Modal/ModalTiepDanCacBanNganh';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './TiepNhanDon.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {handleTextLong} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import actionsApp from '../../../../redux/app/actions';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import moment from 'moment';
import icons from '../icons';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
const TiepNhanDon = (props) => {
  document.title = 'Tiếp nhận đơn';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [confirmLoading, setConfirmLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    DanhSachTiepNhanDon,
    tableLoading,
    DanhSachLoaiKhieuTo,
    DanhSachQuocTich,
    DanhSachDanToc,
    DanhSachTinh,
    DanhSachHuyen,
    DanhSachXa,
    DanhSachChucVu,
    isDone,
    DanhSachHinhThucDaGiaiQuyet,
    DanhSachCanBoXuLy,
    DanhSachTenFile,
    DanhSachCap,
    DanhSachCoQuan,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    // props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    if (isDone) {
      api.GetSTTHoSo().then((res) => {
        const tabsKey = filterData.tabsKey ? Number(filterData.tabsKey) : 1;
        if (res.data.Status > 0) {
          setAction('add');
          setDataModalAddEdit({
            SoDonThu: res.data.Data,
          });
          inceaseModalKey();
          setConfirmLoading(false);
        }
      });
    }
  }, [isDone]);

  useEffect(() => {
    if (!tableLoading) {
      if (Number(filterData.XuLyDonID)) {
        const XuLyDonID = filterData.XuLyDonID;
        setAction('edit');
        api
          .ChiTietDonThu({XuLyDonID})
          .then((res) => {
            if (res.data.Status > 0) {
              setDataModalAddEdit(res.data.Data ? res.data.Data : {});
              inceaseModalKey();
              setVisibleModalAddEdit(true);
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
            setAction('add');
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

  useEffect(() => {
    props.getData();
  }, []);

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
    inceaseModalKey();
  };

  const submitModalAddEdit = async (data) => {
    // data.KQQuaTiepDan = null;
    setLoading(true);
    if (!data.XuLyDonID) {
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
                  setLoading(false);
                  message.destroy();
                  message.warning(res.data.Message);
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
        //     if (!files.FileID) {
        //       const formDataFile = new FormData();
        //       formDataFile.append('files', files);
        //       formDataFile.append(
        //         'FileDinhKemStr',
        //         JSON.stringify({
        //           FileType: item.FileType,
        //           TenFile: item.name || item.TenFile,
        //         }),
        //       );
        //       Promise_Files.push(
        //         api.UploadFile(formDataFile).then((res) => {
        //           if (res.data.Status > 0) {
        //             item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
        //             return res.data.Data[0];
        //           } else {
        //             setLoading(false);
        //             message.destroy();
        //             message.warning(res.data.Data);
        //           }
        //         }),
        //       );
        //     }
        //   });
        // });
        Promise.all(Promise_Files).then((list) => {
          api.ThemMoiDonThu(data).then((res) => {
            setLoading(false);
            if (!res || !res.data || res.data.Status !== 1) {
              message.error(
                `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
              );
            } else {
              message.success(res.data.Message);
              hideModalAddEdit();
              history.push(`xu-ly-don-thu`);
              dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
              // inceaseModalKey();
              // props.getInitData(filterData);
            }
          });
        });
      } else {
        api.ThemMoiDonThu(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            hideModalAddEdit();
            history.push(`xu-ly-don-thu`);
            dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
            // props.getInitData(filterData);
          }
        });
      }
    } else {
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
                  setLoading(false);
                  message.destroy();
                  message.warning(res.data.Message);
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
        //     if (!files.FileID) {
        //       const formDataFile = new FormData();
        //       formDataFile.append('files', files);
        //       formDataFile.append(
        //         'FileDinhKemStr',
        //         JSON.stringify({
        //           FileType: item.FileType,
        //           TenFile: item.name || item.TenFile,
        //         }),
        //       );
        //       Promise_Files.push(
        //         api.UploadFile(formDataFile).then((res) => {
        //           if (res.data.Status > 0) {
        //             item.DanhSachFileDinhKemID.push(res.data.Data[0]?.FileID);
        //             return res.data.Data;
        //           } else {
        //             setLoading(false);
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
            .SuaDonThu(data)
            .then((res) => {
              setLoading(false);
              if (res.data.Status > 0) {
                message.destroy();
                message.success(res.data.Message);
                hideModalAddEdit();
                history.push(`xu-ly-don-thu`);
                dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
                // props.getInitData(filterData);
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
          .SuaDonThu(data)
          .then((res) => {
            setLoading(false);
            if (res.data.Status > 0) {
              message.destroy();
              message.success(res.data.Message);
              hideModalAddEdit();
              history.push(`xu-ly-don-thu`);
              dispatch(actionsApp.changeCurrent('xu-ly-don-thu'));
              // props.getInitData(filterData);
            } else {
              // setState({ confirmLoading: false });
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
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Tiếp nhận đơn</PageHeader>
      </PageWrap>
      <Box isFullHeight={true}>
        <Wrapper></Wrapper>
        <ModalTiepDanCacBanNganh
          TiepNhanDon={true}
          visible={visibleModalAddEdit}
          dataEdit={dataModalAddEdit}
          action={action}
          loading={confirmLoading}
          key={modalKey}
          onCreate={submitModalAddEdit}
          onCancel={hideModalAddEdit}
          dataSource={DanhSachTiepNhanDon}
          DanhSachLoaiKhieuTo={DanhSachLoaiKhieuTo}
          DanhSachQuocTich={DanhSachQuocTich}
          DanhSachDanToc={DanhSachDanToc}
          DanhSachTinh={DanhSachTinh}
          DanhSachCoQuan={DanhSachCoQuan}
          DanhSachHuyen={DanhSachHuyen}
          DanhSachXa={DanhSachXa}
          DanhSachCap={DanhSachCap}
          DanhSachChucVu={DanhSachChucVu}
          DanhSachHinhThucDaGiaiQuyet={DanhSachHinhThucDaGiaiQuyet}
          DanhSachCanBoXuLy={DanhSachCanBoXuLy}
          DanhSachTenFile={DanhSachTenFile}
          LoaiKhieuTo1ID={filterData.tabsKey ? filterData.tabsKey : 1}
          loadingSave={loading}
        />
      </Box>
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.TiepNhanDon,
    role: getRoleByKey(state.Auth.role, 'tiep-nhan-don'),
  };
}

export default connect(mapStateToProps, actions)(TiepNhanDon);
