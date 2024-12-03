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

const StateHoSoTaiLieu = (props) => {
  const [stateHoSoTaiLieu, setStateHoSoTaiLieu] = useState({
    DanhSachHoSoTaiLieu: [],
    dataModalHoSoTaiLieu: {},
    keyModalHoSoTaiLieu: 0,
    visibleModalHoSoTaiLieu: false,
    loading: false,
  });

  // useEffect(() => {
  //   const {dataEdit} = props;
  //   if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
  //     setStateHoSoTaiLieu((prevState) => ({
  //       ...prevState,
  //       DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
  //         ? dataEdit.DanhSachHoSoTaiLieu
  //         : [],
  //     }));
  //   }
  // }, []);

  const onChangeHoSoTaiLieu = (data) => {
    setStateHoSoTaiLieu((prevState) => ({...prevState, ...data}));
    // const newData = {}
    // if(data){
    //   for (const key in data) {
    //     if (Object.hasOwnProperty.call(data, key)) {
    //       const element = object[key];

    //     }
    //   }
    // }
  };

  const deteleFile = (item, index) => {
    const {DanhSachHoSoTaiLieu} = stateHoSoTaiLieu;
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
          const index = newDanhSachHoSoTaiLieu.indexOf(item);
          newDanhSachHoSoTaiLieu.splice(index, 1);
          setStateHoSoTaiLieu((prevState) => ({
            ...prevState,
            DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
          }));
        },
      });
    } else {
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
    }
  };

  const showModalHoSoTaiLieu = (index) => {
    const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = stateHoSoTaiLieu;
    if (index || index === 0) {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        DanhSachHoSoTaiLieu: {...DanhSachHoSoTaiLieu[index], index},
      }));
    } else {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
      }));
    }
  };

  const closeModalHoSoTaiLieu = (index) => {
    setStateHoSoTaiLieu((prevState) => ({
      ...prevState,
      visibleModalHoSoTaiLieu: false,
      dataModalHoSoTaiLieu: {},
    }));
  };

  const submitModalHoSoTaiLieu = (value) => {
    const {index} = value;
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu} = stateHoSoTaiLieu;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = stateHoSoTaiLieu;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.push(value);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
  };

  const {
    visibleModalHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    DanhSachHoSoTaiLieu,
  } = stateHoSoTaiLieu;

  return [
    visibleModalHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    DanhSachHoSoTaiLieu,
    showModalHoSoTaiLieu,
    closeModalHoSoTaiLieu,
    submitModalHoSoTaiLieu,
    deteleFile,
    onChangeHoSoTaiLieu,
  ];
};

export {StateHoSoTaiLieu};
