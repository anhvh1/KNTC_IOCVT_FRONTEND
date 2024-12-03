import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT_SMALL_2, REQUIRED} from '../../../../settings/constants';
import {Form, Checkbox} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
// import {Select} from 'antd';
import {listKeyOneOptions} from '../../../sidebar';
import Modal from '../../../../components/uielements/modal';
import {useDispatch, useSelector} from 'react-redux';
import actionSidebar from '../../../redux/HeThong/Sidebar/actions';

const {Item, useForm} = Form;

const ModalAddPermission = (props) => {
  const [form] = useForm();
  const [allRight, setAllRight] = useState(false);
  const [DanhSachChucNangThem, setDanhSachChucNangThem] = useState([]);
  const [DanhSachSelect, setDanhSachSelect] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);

  const {dataModalAddPermission, loading, visible, onCancel} = props;
  const {NhomNguoiDungID, DanhSachChucNang} = dataModalAddPermission;
  const DanhSachMenu = ListSideBar;
  const dispatch = useDispatch();

  useEffect(() => {
    // props.checkKeKhai();
    dispatch(actionSidebar.getList());
  }, []);
  // const {Option} = Select;
  useEffect(() => {
    let DanhSachNhomChucNangNews = [];
    DanhSachMenu.forEach((menu) => {
      if (menu.Children && menu.Children.length) {
        menu.Children.some((menuChild) => {
          if (
            DanhSachChucNang.find(
              (chucnang) =>
                chucnang.MaChucNang === menuChild.MaMenu && menuChild.HienThi,
            )
          ) {
            DanhSachNhomChucNangNews.push({
              key: menu.MaMenu,
              label: menu.TenMenu,
              children: menu.Children,
            });
            return true;
          }
          return false;
        });
      } else {
        if (menu.HienThi) {
          DanhSachChucNang.some((option) => {
            //danh sach chuc nang cha
            if (menu.MaMenu === option.MaChucNang) {
              DanhSachNhomChucNangNews.push({
                key: menu.MaMenu,
                label: menu.TenMenu,
              });
              return true;
            }
            return false;
          });
        }
      }
    });
    let DS = [];
    DanhSachNhomChucNangNews.filter((item) => item.key).forEach(
      (groupValue) => {
        let parent = {
          id: groupValue.key,
          key: groupValue.key,
          label: groupValue.label,
          disabled: false,
          isParent: true,
        };

        if (groupValue.children && groupValue.children) {
          parent.children = [];
          let children = [];
          groupValue.children.forEach((value) => {
            const chucnang = DanhSachChucNang.find(
              (item) => item.MaChucNang === value.MaMenu && value.HienThi,
            );
            if (chucnang) {
              children.push({
                id: chucnang.ChucNangID,
                key: chucnang.MaChucNang,
                label: chucnang.TenChucNang,
                disabled: chucnang.disabled,
                children: [],
                isParent: false,
              });
            }
          });
          parent.children = children;
          DS.push(parent);
          children.forEach((childrenItem) => {
            DS.push(childrenItem);
          });
        } else
          DanhSachChucNang.forEach((value) => {
            if (parent.key === value.MaChucNang) {
              parent.id = value.ChucNangID;
              parent.disabled = value.disabled;
              parent.isToggle = value.isToggle;
              DS.push(parent);
            }
          });
      },
    );
    setAllRight(NhomNguoiDungID);
    setDanhSachSelect(DS);
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    await form.validateFields();
    const data = permissions;
    const {onCreate} = props;
    onCreate(data);
  };

  const onChangePermission = (checkedValues, ChucNangID) => {
    if (checkedValues.length) {
      let newPermissions = [...permissions];
      newPermissions.some((item, index) => {
        if (item.ChucNangID === ChucNangID) {
          newPermissions[index] = {
            NhomNguoiDungID: NhomNguoiDungID,
            ChucNangID: ChucNangID,
            Xem: checkedValues.indexOf('Xem') >= 0 ? 1 : 0,
            Them: checkedValues.indexOf('Them') >= 0 ? 1 : 0,
            Sua: checkedValues.indexOf('Sua') >= 0 ? 1 : 0,
            Xoa: checkedValues.indexOf('Xoa') >= 0 ? 1 : 0,
          };
          return true;
        }
        return false;
      });
      setPermissions(newPermissions);
    } else {
      deleteOption(ChucNangID);
    }
  };

  const renderOptions = (ListChucNang) => {
    let optionsComponent = '';
    if (ListChucNang && ListChucNang.length) {
      optionsComponent = ListChucNang.map((item, index) => {
        let options = [],
          defaultValue = [];
        const ChucNangID = item.ChucNangID;
        //get parent item from all list chuc nang
        let parentItem = null;
        const DanhSachChucNangCha = [...DanhSachChucNang];
        DanhSachChucNangCha.some((pItem) => {
          if (pItem.ChucNangID === ChucNangID) {
            parentItem = {...pItem};
            return true;
          }
          return false;
        });
        if (parentItem) {
          options = [
            {label: 'Xem', value: 'Xem', disabled: parentItem.Xem === 0},
            {label: 'Thêm', value: 'Them', disabled: parentItem.Them === 0},
            {label: 'Sửa', value: 'Sua', disabled: parentItem.Sua === 0},
            {label: 'Xóa', value: 'Xoa', disabled: parentItem.Xoa === 0},
          ];
          if (item.Xem) defaultValue.push('Xem');
          if (item.Them) defaultValue.push('Them');
          if (item.Sua) defaultValue.push('Sua');
          if (item.Xoa) defaultValue.push('Xoa');

          return (
            <div key={item.ChucNangID} className="content_row">
              <div
                className="tenchucnang"
                style={{display: 'inline-block', width: 184}}
              >
                <b>{item.TenChucNang}</b>
              </div>
              <div className="chonxoaquyen" style={{display: 'inline-block'}}>
                {listKeyOneOptions.includes(item.MaChucNang) ? (
                  <Checkbox.Group
                    defaultValue={defaultValue}
                    options={[
                      {label: '', value: 'Xem', disabled: parentItem.Xem === 0},
                    ]}
                    onChange={(checkedValue) =>
                      onChangePermission(checkedValue, item.ChucNangID)
                    }
                  />
                ) : (
                  <Checkbox.Group
                    options={options}
                    defaultValue={defaultValue}
                    onChange={(checkedValue) =>
                      onChangePermission(checkedValue, item.ChucNangID)
                    }
                  />
                )}

                <button
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => deleteOption(item.ChucNangID)}
                >
                  ✖
                </button>
              </div>
            </div>
          );
        }
      });
    }
    return optionsComponent;
  };

  const deleteOption = (ChucNangID) => {
    let DanhSachChucNangThemNews = [];
    let DanhSachChucNangThemID = [];
    let permissionsNews = [];
    DanhSachChucNangThem.forEach((item) => {
      if (item.ChucNangID !== ChucNangID) {
        DanhSachChucNangThemNews.push(item);
        DanhSachChucNangThemID.push(item.ChucNangID);
      }
    });
    permissions.forEach((item) => {
      if (item.ChucNangID !== ChucNangID) {
        permissionsNews.push(item);
      }
    });
    setDanhSachChucNangThem(DanhSachChucNangThemNews);
    setPermissions(permissionsNews);
    form.setFieldsValue({DanhSachChucNangThemID});
  };

  const onChange = (MangChucNangID) => {
    let result = [];
    MangChucNangID.forEach((id, index) => {
      if (isNaN(id)) {
        DanhSachSelect.forEach((dsItem) => {
          if (dsItem.id === id) {
            dsItem.children.forEach((childrenItem) => {
              if (childrenItem.disabled === false) {
                result.push(childrenItem.id);
              }
            });
          }
        });
      } else {
        result.push(id);
      }
    });
    //sap xep result, xoa phan tu trung nhau
    let MangID = [];
    if (result.length) {
      DanhSachSelect.forEach((dsItem) => {
        if (!isNaN(dsItem.id) && result.indexOf(dsItem.id) >= 0)
          MangID.push(dsItem.id);
      });
    }
    addOption(MangID);
  };

  const addOption = (MangChucNangID) => {
    let DanhSachChucNangThemNew = [];
    let newPermissions =
      MangChucNangID && MangChucNangID.length ? [...permissions] : [];
    DanhSachChucNang.forEach((parentItem) => {
      if (MangChucNangID.indexOf(parentItem.ChucNangID) >= 0) {
        DanhSachChucNangThemNew.push(parentItem);
        // ---
        let exist = false;
        newPermissions.forEach((itemPermission, indexPermission) => {
          //check exist neu chua thi them
          if (parentItem.ChucNangID === itemPermission.ChucNangID) exist = true;
          //check xem quyen co bi xoa di khong
          if (MangChucNangID.indexOf(itemPermission.ChucNangID) < 0)
            permissions.splice(indexPermission, 1);
        });
        if (!exist) {
          let permission = {
            NhomNguoiDungID: NhomNguoiDungID,
            ChucNangID: parentItem.ChucNangID,
            Xem: parentItem.Xem ? 1 : 0,
            Them: parentItem.Them ? 1 : 0,
            Sua: parentItem.Sua ? 1 : 0,
            Xoa: parentItem.Xoa ? 1 : 0,
          };
          newPermissions.push(permission);
        }
      }
    });
    setDanhSachChucNangThem(DanhSachChucNangThemNew);
    setPermissions(newPermissions);
    form.setFieldsValue({DanhSachChucNangThemID: MangChucNangID});
  };

  if (!allRight) return null;
  return (
    <Modal
      title="Thêm chức năng cho nhóm"
      width={600}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="myForm"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <Item
          label="Chọn chức năng"
          name={'DanhSachChucNangThemID'}
          {...ITEM_LAYOUT_SMALL_2}
          rules={[{...REQUIRED}]}
        >
          <Select
            showSearch
            placeholder="Chọn chức năng"
            onChange={onChange}
            defaultActiveFirstOption={false}
            allowClear
            noGetPopupContainer
            mode="multiple"
            style={{marginTop: 4}}
            className="scroll-select-selection--multiple"
          >
            {DanhSachSelect.map((item) => {
              if (item.isParent) {
                return (
                  <Option
                    key={item.id}
                    value={item.id}
                    disabled={item.disabled}
                    style={{fontWeight: 'bold'}}
                  >
                    {item.label}
                  </Option>
                );
              } else {
                return (
                  <Option
                    key={item.id}
                    value={item.id}
                    disabled={item.disabled}
                    style={{paddingLeft: 20}}
                  >
                    {item.label}
                  </Option>
                );
              }
            })}
          </Select>
        </Item>
        {DanhSachChucNangThem && DanhSachChucNangThem.length
          ? renderOptions(DanhSachChucNangThem)
          : null}
      </Form>
    </Modal>
  );
};

export {ModalAddPermission};
