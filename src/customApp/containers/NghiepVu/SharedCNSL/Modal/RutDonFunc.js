import ModalRutDon from './ModalRutDon';
import api from '../../SoTiepDan/config';
import {useState} from 'react';
import {mapFileToPromiseArray} from '../../../../../helpers/utility';
import {LoaiFileDinhKem} from '../../../../../settings/constants';
import {message} from 'antd';
const RutDonFunc = (props) => {
  const {selectedRowsKey, setSelectedRowsKey, XuLyDonID} = props;
  const [visibleModalRutDon, setVisibleModalRutDon] = useState(false);
  const [keyModalRutDon, setKeyModalRutDon] = useState(0);
  const [loading, setLoading] = useState(false);

  const showModalRutDon = () => {
    setKeyModalRutDon((prevKey) => prevKey + 1);
    setVisibleModalRutDon(true);
  };

  const hideModalRutDon = () => {
    setVisibleModalRutDon(false);
  };

  const submitModalRutDon = (data) => {
    console.log(XuLyDonID);
    if (XuLyDonID) {
      setLoading(true);
      data.XuLyDonID = XuLyDonID;
      const LoaiFile = {
        FileType: LoaiFileDinhKem.FileRutDon,
      };

      const Promise_Files = [];
      if (data.DanhSachHoSoTaiLieu) {
        mapFileToPromiseArray(
          data.DanhSachHoSoTaiLieu,
          Promise_Files,
          LoaiFile,
          api,
        );
      }
      Promise.all(Promise_Files).then((list) => {
        api.RutDon(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            hideModalRutDon();
            props.reloadData();
            setSelectedRowsKey([]);
          }
        });
      });
    }
  };

  return {
    visibleModalRutDon,
    keyModalRutDon,
    showModalRutDon,
    submitModalRutDon,
    hideModalRutDon,
    loadingModalRutDon: loading,
  };
};

export default RutDonFunc;
