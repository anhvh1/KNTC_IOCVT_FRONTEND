import React, {useEffect, useRef, useState} from 'react';
import {
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT2,
  COL_ITEM_LAYOUT_HALF,
  ITEM_LAYOUT_HALF_SMALL,
  ITEM_LAYOUT_SMALL,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  ITEM_LAYOUT_HALF2,
} from '../../../../settings/constants';
import {Form, Radio, Row, Col, Modal as ModalAnt} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import apiTiepDan from '../../NghiepVu/TiepCongDanThuongXuyen/config';
import TextArea from 'antd/lib/input/TextArea';
import {DeleteOutlined} from '@ant-design/icons';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [Status, setStatus] = useState(1);
  const {dataEdit, loading, visible, action} = props;
  const [DanhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [DanhSachCoQuanChiaTachSatNhap, setDanhSachCoQuanChiaTachSatNhap] =
    useState([{}, {}]);

  useEffect(() => {
    if (!dataEdit.DanhSachCoQuan) {
      apiTiepDan.GetAllCoQuan().then((res) => {
        if (res.data.Status > 0) {
          setDanhSachCoQuan(res.data.Data);
          const newDanhSachCoQuanChiaTachSatNhap = [
            ...DanhSachCoQuanChiaTachSatNhap,
          ];
          newDanhSachCoQuanChiaTachSatNhap.forEach((item, index) => {
            newDanhSachCoQuanChiaTachSatNhap[index]['DanhSachCoQuan'] =
              res.data.Data;
            newDanhSachCoQuanChiaTachSatNhap[index]['TrangThai'] = 1;
          });
          setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuanChiaTachSatNhap);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (dataEdit && dataEdit.DanhSachCoQuan) {
      setDanhSachCoQuan(
        dataEdit.DanhSachCoQuanCu ? dataEdit.DanhSachCoQuanCu : [],
      );
      const newDanhSachCoQuanChiaTachSatNhap = [];
      const newDanhSachCoQuan = [...dataEdit.DanhSachCoQuan]
        .filter((item) => item.CoQuanCuID || item.CoQuanMoiID)
        .map((item) => {
          return {
            CoQuanID:
              item.laSapNhap === true ? item.CoQuanCuID : item.CoQuanMoiID,
            TrangThai: item.TrangThai,
          };
        });
      // .map((item) => ({
      //   CoQuanID: item.CoQuanCuID || item.CoQuanMoiID,
      //   TrangThai: item.TrangThai,
      // }));
      const ListIDSelect = newDanhSachCoQuan.map((item) => item.CoQuanID);
      newDanhSachCoQuan.forEach((item) => {
        if (item.CoQuanID) {
          const ListOther = ListIDSelect.filter((ID) => ID !== item.CoQuanID);
          newDanhSachCoQuanChiaTachSatNhap.push({
            DanhSachCoQuan: dataEdit.DanhSachCoQuanCu.filter(
              (item) => !ListOther.includes(item.CoQuanID),
            ),
            CoQuanID: item.CoQuanID,
            TrangThai: item.TrangThai,
          });
        }
      });
      const dataCoQuanID = {};
      newDanhSachCoQuanChiaTachSatNhap.forEach(
        (item, index) => (dataCoQuanID[`CoQuanID_${index}`] = item.CoQuanID),
      );
      form &&
        form.setFieldsValue({
          ...dataEdit,
          ...dataCoQuanID,
          laSapNhap: dataEdit.laSapNhap === true ? 1 : 2,
        });
      setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuanChiaTachSatNhap);
      if (dataEdit.laSapNhap) {
        setStatus(1);
      }
      if (!dataEdit.laSapNhap) {
        setStatus(2);
      }
    }
  }, []);

  //   useEffect(() => {
  //     const newDanhSachCoQuanMoi = [];
  //     const DanhSachSelected = [];
  //     DanhSachCoQuanChiaTachSatNhap.filter((item) => item.CoQuanID)
  //       .map((item) => ({CoQuanID: item.CoQuanID}))
  //       .forEach((item) => DanhSachSelected.push(item.CoQuanID));
  //     DanhSachCoQuan.forEach((item) => {
  //       if (!DanhSachSelected.includes(item.CoQuanID)) {
  //         newDanhSachCoQuanMoi.push(item);
  //       }
  //     });
  //     setDanhSachCoQuanMoi(newDanhSachCoQuanMoi);
  //   }, [DanhSachCoQuanChiaTachSatNhap]);

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const changeCoQuan = (CoQuanID, index) => {
    const newDanhSachCoQuan = [...DanhSachCoQuanChiaTachSatNhap];
    newDanhSachCoQuan[index]['CoQuanID'] = CoQuanID;
    const otherCoQuan = newDanhSachCoQuan.filter(
      (item, indexFilter) => index !== indexFilter,
    );
    const ListCoQuanSelected = newDanhSachCoQuan
      .filter((item) => item.CoQuanID)
      .map((item) => ({CoQuanID: item.CoQuanID}));
    otherCoQuan.forEach((itemOther) => {
      const ListOther = ListCoQuanSelected.filter(
        (item) => item.CoQuanID !== itemOther.CoQuanID,
      );
      const ListIDCoQuan = [];
      ListOther.forEach((item) => ListIDCoQuan.push(item.CoQuanID));
      if (itemOther.DanhSachCoQuan) {
        itemOther.DanhSachCoQuan = DanhSachCoQuan.filter((item) => {
          return !ListIDCoQuan.includes(item.CoQuanID);
        });
      }
    });
    setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuan);
  };

  const handleAddCoQuan = () => {
    const newDanhSachCoQuan = [...DanhSachCoQuanChiaTachSatNhap];
    const ListCoQuanSelected = newDanhSachCoQuan
      .filter((item) => item.CoQuanID)
      .map((item) => ({CoQuanID: item.CoQuanID}));
    const ListIDCoQuan = [];
    ListCoQuanSelected.forEach((item) => ListIDCoQuan.push(item.CoQuanID));
    newDanhSachCoQuan.push({
      DanhSachCoQuan: DanhSachCoQuan.filter((item) => {
        return !ListIDCoQuan.includes(item.CoQuanID);
      }),
      TrangThai: 1,
    });
    setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuan);
  };

  const handleDeleteCoQuan = (CoQuanID, index) => {
    ModalAnt.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa cơ quan này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        const newDanhSachCoQuan = [...DanhSachCoQuanChiaTachSatNhap];
        const otherCoQuan = newDanhSachCoQuan.filter(
          (item, indexFilter) => index !== indexFilter,
        );
        if (CoQuanID) {
          otherCoQuan.forEach((item, index) => {
            const newDanhSachCoQuan = item.DanhSachCoQuan;

            newDanhSachCoQuan.push({
              ...DanhSachCoQuan.find((item) => item.CoQuanID === CoQuanID),
            });
          });
        }
        newDanhSachCoQuan.splice(index, 1);
        setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuan);
      },
    });
  };

  const handleFilterCoQuanBySelect = (value) => {
    const newDanhSachCoQuanChiaTachSatNhap = [...DanhSachCoQuanChiaTachSatNhap];
    newDanhSachCoQuanChiaTachSatNhap.forEach((item) => {
      const DanhSachCoQuan = item.DanhSachCoQuan;
      item.DanhSachCoQuan = DanhSachCoQuan.filter(
        (item) => item.CoQuanID !== value,
      );
    });

    setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuanChiaTachSatNhap);
  };

  const changeStatusCoQuan = (status, index) => {
    const newDanhSachCoQuan = [...DanhSachCoQuanChiaTachSatNhap];
    newDanhSachCoQuan[index]['TrangThai'] = status;
    setDanhSachCoQuanChiaTachSatNhap(newDanhSachCoQuan);
  };

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    value.laSapNhap = value.laSapNhap === 1 ? true : false;
    if (value.laSapNhap) {
      value.DanhSachCoQuan = DanhSachCoQuanChiaTachSatNhap.map((item) => ({
        ...item,
        CoQuanCuID: item.CoQuanID,
        DanhSachCoQuan: [],
      }));
    } else {
      value.DanhSachCoQuan = DanhSachCoQuanChiaTachSatNhap.map((item) => ({
        ...item,
        CoQuanMoiID: item.CoQuanID,
        DanhSachCoQuan: [],
      }));
    }
    props.onCreate(value);
  };

  const {disabled} = props;

  return (
    <Modal
      title={`Cấu hình chia tách, sát nhập cơ quan`}
      width={1000}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        !disabled ? (
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            form="formmonhoc"
            loading={loading}
            onClick={onOk}
          >
            Lưu
          </Button>
        ) : null,
      ]}
    >
      <Form form={form} initialValues={{laSapNhap: 1, TrangThai: 1}}>
        {/* {action === 'edit' ? <Item name={'ChucVuID'} hidden /> : ''} */}
        <Item
          label="Chọn Trạng thái"
          name={'laSapNhap'}
          className="ant-form-title__left"
          {...REQUIRED}
        >
          <Select onChange={handleChangeStatus} disabled={disabled}>
            <Option value={1}>Sát nhập</Option>
            <Option value={2}>Chia tách</Option>
          </Select>
        </Item>
        <div
          className="btn-right"
          style={{textAlign: 'right', marginTop: '10px'}}
        >
          <Button type="primary" onClick={handleAddCoQuan} disabled={disabled}>
            Thêm cơ quan
          </Button>
        </div>
        {Status !== 1 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 300px',
              alignItems: 'end',
              gap: '10px',
            }}
          >
            <Item
              label="Cơ quan cũ"
              className="ant-form-title__left"
              name={'CoQuanCuID'}
              {...REQUIRED}
            >
              <Select
                disabled={disabled}
                //   onChange={handleFilterCoQuanBySelect}
              >
                {DanhSachCoQuan.map((item) => (
                  <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
                ))}
              </Select>
            </Item>
            <Item className="ant-form-title__left" name={'TrangThai'}>
              <Select
                disabled={disabled}
                placeholder={'Chọn trạng thái'}
                style={{width: '100%'}}
              >
                <Option value={1}>Tạm dừng</Option>
                <Option value={2}>Hoạt động</Option>
              </Select>
            </Item>
          </div>
        ) : null}
        {DanhSachCoQuanChiaTachSatNhap
          ? DanhSachCoQuanChiaTachSatNhap.map((item, index) => {
              return (
                <>
                  <p style={{marginTop: '10px'}}>
                    {Status === 1 ? 'Cơ quan cũ' : 'Cơ quan mới'}
                  </p>
                  <div
                    gutter={[10]}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        Status === 1 ? '60% auto 100px' : 'auto 100px',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <Item
                      style={{marginBottom: 0}}
                      name={`CoQuanID_${index}`}
                      {...REQUIRED}
                    >
                      <Select
                        disabled={disabled}
                        style={{width: '100%'}}
                        onChange={(value) => changeCoQuan(value, index)}
                        value={item.CoQuanID}
                      >
                        {item.DanhSachCoQuan?.map((item) => (
                          <Option value={item.CoQuanID}>
                            {item.TenCoQuan}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                    {Status !== 2 ? (
                      <Select
                        disabled={disabled}
                        placeholder={'Chọn trạng thái'}
                        style={{width: '100%'}}
                        value={item.TrangThai}
                        onChange={(value) => changeStatusCoQuan(value, index)}
                      >
                        <Option value={1}>Tạm dừng</Option>
                        <Option value={2}>Hoạt động</Option>
                      </Select>
                    ) : null}
                    <div style={{textAlign: 'right'}}>
                      <Button
                        disabled={disabled}
                        onClick={() => handleDeleteCoQuan(item.CoQuanID, index)}
                        type="danger"
                      >
                        <DeleteOutlined />
                        Xóa
                      </Button>
                    </div>
                  </div>
                </>
              );
            })
          : null}
        {Status !== 2 ? (
          <Item
            label="Cơ quan mới"
            className="ant-form-title__left"
            name={'CoQuanMoiID'}
            {...REQUIRED}
          >
            <Select disabled={disabled}>
              {DanhSachCoQuan.map((item) => (
                <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
              ))}
            </Select>
          </Item>
        ) : null}
      </Form>
    </Modal>
  );
};
