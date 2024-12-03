import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/DMDiaGioi/actions';
import api from './config';
import Constants from '../../../../settings/constants';
// import "antd/dist/antd.min.css";
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {EmptyTable} from '../../../../components/utility/boxTable';

import {ModalEdit} from './modalEdit';
import {Button} from '../../../../components/uielements/exportComponent';
import {Modal, message, Input, Tree, Menu, Dropdown} from 'antd';
// import Button from "../../../../components/uielements/button";
import {changeUrlFilter, getFilterData} from '../../../../helpers/utility';
import {usePrevious} from '../../../CustomHook/usePrevious';
import {
  PlusOutlined,
  PlusCircleOutlined,
  CreditCardOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import RedFilterTree, {MarginR} from './styled';
import RenderTree from './renderTree';
import PageWrap from '../../../../components/utility/PageWrap';

const {TreeNode} = Tree;
const DMCoQuan = (props) => {
  document.title = 'Danh Mục Địa Giới Hành Chính';
  const FilterData = queryString.parse(props.location.search);
  const [filterData, setFilterData] = useState({
    ...FilterData,
    ID: 0,
    Cap: 1,
  });
  const [treeKey, setTreeKey] = useState(0);
  const [DanhSachDiaGioi, setDanhSachDiaGioi] = useState([]);
  const prevDanhSachDiaGioi = usePrevious(props.DanhSachDiaGioi);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [modalKey, setModalKey] = useState(0);
  const [action, setAction] = useState('');
  const [isActionCompleted, setIsActionCompleted] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState({
    DanhSachTinh: [],
    Cap: '',
    ID: '',
    TinhID: '',
    HuyenID: '',
    Key: '',
    Ten: '',
    TenDayDu: '',
  });
  const [onpenTree, setOpenTree] = useState([]);
  const {heightApp} = props;
  const upDateRef = useRef(false);

  const [dataSubmit, setDataSubmit] = useState({
    action: 'add',
    data: null,
  });

  useEffect(() => {
    props.getInitData(filterData);
  }, []);

  useEffect(() => {
    if (prevDanhSachDiaGioi !== props.DanhSachDiaGioi) {
      let treeKeys = treeKey + 1;
      setDanhSachDiaGioi(props.DanhSachDiaGioi);
      setExpandedKeys([]);
      setTreeKey(treeKeys);
    }
  });

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData); //get list
  }, [filterData]);

  //filter --------------------------------------------------
  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onFilter = {value, property};
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData({...newFilterData, ID: 0, Cap: 1});
  };

  //Delete-----------------------------------------------------
  const deleteData = (ID, Cap, Key) => {
    setAction('delete');
    // if (!props.role.delete) {
    //   message.destroy();
    //   message.warning("Bạn không có quyền thực hiện chức năng này");
    // } else {
    let diagioi = 'xã/phường';
    if (Cap === 1) {
      diagioi = 'tỉnh/thành phố';
    } else if (Cap === 2) {
      diagioi = 'quận/huyện';
    }
    Modal.confirm({
      icon: <QuestionCircleOutlined />,
      title: 'Xóa dữ liệu',
      content: `Bạn có muốn xóa ${diagioi} này không?`,
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .xoaDiaGioi({ID, Cap})
          .then((response) => {
            if (response.data.Status > 0) {
              //reset tree
              // resetTree(ID, Cap, Key, "delete");
              // props.getList(filterData)
              //message success
              message.destroy();
              message.success(response.data.Message);
              setIsActionCompleted(true);
              setDataSubmit({
                action: 'delete',
                data: {
                  ID,
                  Cap,
                  Key,
                },
              });
            } else {
              message.destroy();
              message.error({
                title: 'Lỗi',
                content: response.data.Message,
              });
              setIsActionCompleted(false);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(Constants.API_ERROR);
            setIsActionCompleted(false);
          });
      },
    });
    // }
  };

  //Modal add -----------------------------------------------------
  const showModalAdd = (parentID, parentCap, parentKey, DanhSachDiaGioi) => {
    setAction('add');
    setIsActionCompleted(false);
    // if (!props.role.add) {
    //   message.destroy();
    //   message.warning("Bạn không có quyền thực hiện chức năng này");
    // } else {
    if (parentID) {
      api
        .chiTietDiaGioi({ID: parentID, Cap: parentCap})
        .then((response) => {
          if (response.data.Status > 0) {
            let modalKeys = modalKey + 1;
            let Item = response.data.Data;
            setDataModalEdit({
              DanhSachTinh: DanhSachDiaGioi,
              Cap: parseInt(Item.Cap) + 1,
              TinhID: Item.TinhID ? Item.TinhID : '',
              HuyenID: Item.HuyenID ? Item.HuyenID : '',
              Key: parentKey,
              ID: '',
              Ten: '',
              TenDayDu: '',
            });
            setVisibleModal(true);
            setModalKey(modalKeys);
          } else {
            message.destroy();
            message.error({
              title: 'Lỗi',
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(Constants.API_ERROR);
        });
    } else {
      let modalKeys = modalKey + 1;
      setVisibleModal(true);
      setDataModalEdit({
        DanhSachTinh: DanhSachDiaGioi,
        Cap: Constants.TINH,
        TinhID: '',
        HuyenID: '',
        Key: '',
        ID: '',
        Ten: '',
        TenDayDu: '',
      });
      setModalKey(modalKeys);
    }
    // }
  };

  const hideModal = () => {
    // setSelec([])
    setVisibleModal(false);
    setIsActionCompleted(true);
    // setDataSubmit({
    //     action: null,
    //     data: null,
    // });
  };

  const submitModal = async (data) => {
    if (action === 'add') {
      setConfirmLoading(true);
      let ParentID = '0';
      if (data.Cap.toString() === Constants.HUYEN) {
        ParentID = data.TinhID;
      } else if (data.Cap.toString() === Constants.XA) {
        ParentID = data.HuyenID;
      }
      data = {
        Cap: data.Cap,
        Ten: data.Ten,
        TenDayDu: data.TenDayDu ? data.TenDayDu : 'pending',
        ParentID: ParentID,
        Key: data.Key,
      };

      await api
        .themDiaGioi(data)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);

            new Promise((resolve, reject) => {
              setDataSubmit({
                action: 'add',
                data: {
                  ...data,
                  ID: response.data.Data,
                },
              });
              resolve();
            }).then(() => {
              //hide modal
              hideModal();
            });

            // props.getList(filterData);
            // if (data.Key) {
            //   resetTree(response.data.Data, data.Cap, data.Key, "add");
            // } else {
            //   // props.getList(filterData); //get list
            // }
          } else {
            message.destroy();
            message.error({
              title: 'Lỗi',
              content: response.data.Message,
            });
            setIsActionCompleted(false);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(Constants.API_ERROR);
          setIsActionCompleted(false);
        });
    }
    if (action == 'edit') {
      setConfirmLoading(true);
      let ParentID = '0';
      if (data.Cap.toString() === Constants.HUYEN) {
        ParentID = data.TinhID;
      } else if (data.Cap.toString() === Constants.XA) {
        ParentID = data.HuyenID;
      }
      data = {
        ID: data.ID,
        Cap: data.Cap,
        Ten: data.Ten,
        TenDayDu: data.TenDayDu,
        ParentID: ParentID,
        Key: data.Key,
      };

      api
        .suaDiaGioi(data)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModal();
            setDataSubmit({
              action: 'edit',
              data: {
                ...data,
              },
            });
            // resetTree(data.ID, data.Cap, data.Key, "edit");
            // props.getList(filterData);
          } else {
            message.destroy();
            message.error({
              title: 'Lỗi',
              content: response.data.Message,
            });
            setIsActionCompleted(false);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(Constants.API_ERROR);
          setIsActionCompleted(false);
        });
    }
  };

  //Modal edit -----------------------------------------------------
  const showModalEdit = (ID, Cap, Key, DanhSachDiaGioi) => {
    setAction('edit');
    setIsActionCompleted(false);
    // if (!props.role.edit) {
    //   message.destroy();
    //   message.warning("Bạn không có quyền thực hiện chức năng này");
    // } else {
    api
      .chiTietDiaGioi({ID, Cap})
      .then((response) => {
        if (response.data.Status > 0) {
          let modalKeys = modalKey + 1;
          let Item = response.data.Data;
          setVisibleModal(true);
          setDataModalEdit({
            DanhSachTinh: DanhSachDiaGioi,
            ID: Item.ID,
            Cap: Item.Cap,
            Key: Key,
            TinhID: Item.TinhID,
            HuyenID: Item.HuyenID,
            Ten: Item.Ten,
            TenDayDu: Item.TenDayDu,
          });
          setModalKey(modalKeys);
        } else {
          message.destroy();
          message.error({
            title: 'Lỗi',
            content: response.data.Message,
          });
        }
      })
      .catch((error) => alert(error));
    // }
  };

  //Render action ---------------------------------------------
  const renderActionAdd = () => {
    return (
      <span>
        <Button type="primary" onClick={() => showModalAdd('', '', '')}>
          <PlusOutlined />
          Thêm mới
        </Button>
      </span>
    );
  };
  const renderActionEdit = () => {
    return <span></span>;
  };

  //Render ----------------------------------------------------
  const {role} = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>DANH MỤC TỈNH - HUYỆN - XÃ</PageHeader>
        <PageAction>
          {role?.add ? renderActionAdd() : null}
          {role?.edit ? renderActionEdit() : null}
        </PageAction>
      </PageWrap>
      <Box style={{minHeight: 'calc(100vh - 265px)'}}>
        <BoxFilter>
          <Input.Search
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Tìm kiếm theo tên địa giới hành chính"
            onSearch={(value) => onFilter(value, 'Keyword')}
            style={{width: 300}}
          />
        </BoxFilter>
        {/* <RedFilterTree ref={upDateRef} key={treeKey} style={{ userSelect: "none" }}>
          {renderContent()}
        </RedFilterTree> */}
        <RenderTree
          filterData={filterData}
          onShowModalAdd={showModalAdd}
          onShowModalEdit={showModalEdit}
          onDeleteData={deleteData}
          dataSubmit={dataSubmit}
          setDataModalEdit={setDataModalEdit}
          isActionCompleted={isActionCompleted}
          action={action}
          role={role}
        />
      </Box>
      <ModalEdit
        DanhSachDiaGioi={DanhSachDiaGioi}
        confirmLoading={confirmLoading}
        visible={visibleModal}
        onCancel={hideModal}
        onCreate={submitModal}
        dataModalEdit={dataModalEdit}
        key={modalKey}
        action={action}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhMucDiaGioi,
    heightApp: state.App.height,
  };
}

export default connect(mapStateToProps, actions)(DMCoQuan);
