import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/DMLoaiKhieuTo/actions';
import api from './config';
import Constants from '../../../../settings/constants';

import {
  PlusCircleOutlined,
  CreditCardOutlined,
  StopOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {EmptyTable} from '../../../../components/utility/boxTable';

import ModalAddEdit from './modalAddEdit';
// import ModalEdit from './modalEdit';
import {Modal, message, Input, Tree, Menu, Dropdown} from 'antd';
import Button from '../../../../components/uielements/button';
import {changeUrlFilter, getFilterData} from '../../../../helpers/utility';
import {MarginR, RedTree, RenderTree, TextDecoration} from './styled';
import PageWrap from '../../../../components/utility/PageWrap';
import {getLocalKey} from '../../../../helpers/utility';
const {TreeNode} = Tree;

class DanhMucLoaiKhieuTo extends Component {
  constructor(props) {
    super(props);
    document.title = 'Danh Mục Loại Khiếu Tố';
    const filterData = queryString.parse(this.props.location.search);
    this.state = {
      action: '',
      visibleModalAddEdit: false,
      dataModalAddEdit: {},

      expandedKeys: [],
      filterData: {...filterData},
      treeKey: 0,
      modalKey: 0,
      DanhSachLoaiKhieuTo: [],
      confirmLoading: false,

      openTree: [],
      // visibleModalAdd: false,
      // dataModalAdd: null,
      // visibleModalEdit: false,
      // dataModalEdit: {
      //     // DanhSachTinh: [],
      //     Data: null,
      // },
    };
  }

  //Get initData---------------------------------------------
  componentDidMount = () => {
    this.props.getInitData(this.state.filterData);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.DanhSachLoaiKhieuTo !== this.props.DanhSachLoaiKhieuTo &&
      this.props.DanhSachLoaiKhieuTo
    ) {
      let treeKey = this.state.treeKey + 1;
      this.setState({
        DanhSachLoaiKhieuTo: this.props.DanhSachLoaiKhieuTo,
        treeKey,
      });
    }
  }

  //filter --------------------------------------------------
  onFilter = (value, property) => {
    //get filter data
    let oldFilterData = {...this.state.filterData};
    let onFilter = {value, property};
    let filterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    this.setState({filterData}, () => {
      let Keyword = this.state.filterData.Keyword
        ? this.state.filterData.Keyword
        : '';
      changeUrlFilter({Keyword}); //change url
      this.props.getList(this.state.filterData); //get list
    });
  };
  //Delete-----------------------------------------------------
  deleteData = (ID) => {
    if (!this.props.role.delete) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      Modal.confirm({
        title: 'Xóa dữ liệu',
        content: 'Bạn có muốn xóa loại khiếu tố này không?',
        cancelText: 'Không',
        okText: 'Có',
        onOk: () => {
          api
            .xoaCoQuan(ID)
            .then((response) => {
              if (response.data.Status > 0) {
                //reset tree
                //message success
                message.destroy();
                message.success('Xóa thành công');
                this.props.getInitData(this.state.filterData);
              } else {
                Modal.error({
                  title: 'Lỗi',
                  content: response.data.Message,
                });
              }
            })
            .catch((error) => {
              Modal.error(Constants.API_ERROR);
            });
        },
      });
    }
  };

  submitModalAddEdit = (data) => {
    this.setState({
      confirmLoading: true,
    });
    if (this.state.action === 'add') {
      api
        .themCoQuan({
          ...this.state.dataModalAddEdit,
          ...data,
          ThuTu: data.ThuTu || this.state.DanhSachLoaiKhieuTo.length + 1,
        })
        .then((res) => {
          this.setState({
            confirmLoading: true,
          });
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            this.hideModalAddEdit();
            this.props.getInitData(this.state.filterData);
          } else {
            this.setState({
              setConfirmLoading: false,
            });
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          this.setState({
            setConfirmLoading: false,
          });
          message.destroy();
          message.error(error.toString());
        });
    }
    if (this.state.action === 'edit') {
      this.setState({confirmLoading: true}, () => {
        api
          .suaCoQuan(data)
          .then((response) => {
            if (response.data.Status > 0) {
              //hide modal
              //message success
              message.destroy();
              message.success('Cập nhật thành công');
              this.hideModalAddEdit();
              this.props.getList(this.state.filterData); //get list
            } else {
              this.setState({confirmLoading: false});
              Modal.error({
                title: 'Lỗi',
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      });
    }
  };

  showModalEdit = (LoaiKhieuToID) => {
    if (!this.props.role.edit) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      this.setState({
        action: 'edit',
      });
      api
        .chiTietCoQuan({LoaiKhieuToID})
        .then((response) => {
          if (response.data.Status > 0) {
            let modalKey = this.state.modalKey + 1;
            let Data = response.data.Data;
            this.setState({
              visibleModalAddEdit: true,
              dataModalAddEdit: {
                // DanhSachTinh: [...this.props.DanhSachDiaGioi],
                ...Data,
              },
              confirmLoading: false,
              modalKey,
            });
          } else {
            Modal.error({
              title: 'Lỗi',
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          Modal.error(Constants.API_ERROR);
        });
    }
  };
  //Modal add -----------------------------------------------------
  showModalAdd = (ID, Cap, Ten, key) => {
    let modalKey = this.state.modalKey + 1;
    this.setState({
      action: 'add',
      visibleModalAddEdit: true,
      dataModalAddEdit: {
        // DanhSachTinh: [...this.props.DanhSachDiaGioi],
        LoaiKhieuToCha: ID,
        Cap: Cap + 1,
        Ten,
      },
      confirmLoading: false,
      modalKey,
    });
    // }
  };
  showModalAddbtn = () => {
    let modalKey = this.state.modalKey + 1;
    this.setState({
      action: 'add',
      visibleModalAddEdit: true,
      dataModalAddEdit: {
        // DanhSachTinh: [...this.props.DanhSachDiaGioi],
        LoaiKhieuToCha: -1,
        Cap: 0,
      },
      confirmLoading: false,
      modalKey,
    });
    // }
  };

  setStatusItem = (LoaiKhieuToID, SuDung) => {
    api
      .setSuDung({
        LoaiKhieuToID,
        SuDung,
      })
      .then((response) => {
        if (response.data.Status > 0) {
          //reset tree
          //message success
          message.destroy();
          message.success('Cập nhật thành công');
          this.props.getInitData(this.state.filterData);
        } else {
          Modal.error({
            title: 'Lỗi',
            content: response.data.Message,
          });
        }
      })
      .catch((error) => {
        Modal.error(Constants.API_ERROR);
      });
  };

  hideModalAddEdit = () => {
    this.setState({
      dataModalAddEdit: {},
      visibleModalAddEdit: false,
    });
  };

  //Tree -------------------------------------------------------------
  onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes('ant-dropdown-menu');
    let checkNearMenu = parentClassName.includes('ant-dropdown-menu');

    if (!checkMenu && !checkNearMenu) {
      //neu dang k click menu drop
      let key = info.node.props.eventKey.toString();
      if (key) {
        if (!info.node.props.isLeaf) {
          let expandedKeys = [...this.state.expandedKeys];
          let index = expandedKeys.indexOf(key);
          if (index > -1) {
            expandedKeys.splice(index, 1);
          } else {
            expandedKeys = this.state.expandedKeys.concat([key]);
          }
          this.setState({expandedKeys});
          this.setState({
            openTree: selectedKeys,
          });
        }
      }
    }
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      let menu = (
        <Menu>
          <Menu.Item
            disabled={item.SuDung === false ? true : false}
            onClick={() =>
              this.showModalAdd(
                item.LoaiKhieuToID,
                item.Cap,
                item.TenLoaiKhieuTo,
              )
            }
          >
            <MarginR>
              <PlusCircleOutlined className="add" /> Thêm mới
            </MarginR>
          </Menu.Item>
          <Menu.Item onClick={() => this.showModalEdit(item.LoaiKhieuToID)}>
            <MarginR>
              <CreditCardOutlined className="edit" /> Sửa
            </MarginR>
          </Menu.Item>
          <Menu.Item
            onClick={() => this.setStatusItem(item.LoaiKhieuToID, !item.SuDung)}
          >
            {item.SuDung ? (
              <MarginR>
                <StopOutlined className="stop" /> Không sử dụng
              </MarginR>
            ) : (
              <MarginR>
                <CheckOutlined className="check" /> Sử dụng
              </MarginR>
            )}
          </Menu.Item>
          <Menu.Item
            disabled={item.DanhMucLoaiKhieuToCon.length ? true : false}
            onClick={() => this.deleteData(item.LoaiKhieuToID)}
          >
            <MarginR>
              <CloseCircleOutlined className="delete" /> Xóa
            </MarginR>
          </Menu.Item>
        </Menu>
      );
      let title = (
        <div>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={['contextMenu']}
          >
            <span
              style={
                item.SuDung === false ? {textDecoration: 'line-through'} : {}
              }
            >
              {item.TenLoaiKhieuTo}
            </span>
          </Dropdown>
        </div>
      );
      if (item.DanhMucLoaiKhieuToCon) {
        return (
          <TreeNode
            title={title}
            key={item.key}
            isLeaf={item.isLeaf}
            children={item.DanhMucLoaiKhieuToCon}
            dataRef={item}
          >
            {this.renderTreeNodes(item.DanhMucLoaiKhieuToCon)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          key={item.key}
          isLeaf={item.isLeaf}
          children={item.DanhMucLoaiKhieuToCon}
          dataRef={item}
        />
      );
    });

  renderContent = () => {
    if (this.state.DanhSachLoaiKhieuTo.length) {
      const DSFilter = this.filterTreeNode(this.props.DanhSachLoaiKhieuTo);

      return (
        <RedTree>
          <Tree
            showLine
            // switcherIcon={<Icon type="down"/>}
            filterTreeNode={(treeNode) =>
              treeNode.props.dataRef.Highlight === 1
            }
            onSelect={this.onExpandNode}
            onExpand={this.onExpandNode}
            defaultExpandedKeys={this.state.openTree}
            expandedKeys={
              this.state.filterData.Keyword
                ? this.props.expandedKeys
                : this.state.expandedKeys
            }
          >
            {this.renderTreeNodes(DSFilter)}
          </Tree>
        </RedTree>
      );
    } else {
      return <EmptyTable loading={this.props.TableLoading} />;
    }
  };

  filterTreeNode = (dataRoot) => {
    return dataRoot;
  };

  //Render action ---------------------------------------------
  renderActionAddEdit = () => {
    return (
      <span>
        <Button type="primary" onClick={() => this.showModalAdd(-1, -1, null)}>
          <PlusOutlined />
          Thêm mới
        </Button>
        <ModalAddEdit
          confirmLoading={this.state.confirmLoading}
          visible={this.state.visibleModalAddEdit}
          onCancel={this.hideModalAddEdit}
          onCreate={this.submitModalAddEdit}
          dataModalAdd={this.state.dataModalAddEdit}
          key={this.state.modalKey}
          action={this.state.action}
          DanhSachLoaiKhieuTo={this.state.DanhSachLoaiKhieuTo}
        />
      </span>
    );
  };

  // renderActionEdit = () => {
  //     return (
  //         <span>
  //             <ModalEdit
  //                 confirmLoading={this.state.confirmLoading}
  //                 visible={this.state.visibleModalEdit}
  //                 onCancel={this.hideModalEdit}
  //                 DanhSachLoaiKhieuTo={this.state.DanhSachLoaiKhieuTo}
  //                 onCreate={this.submitModalEdit}
  //                 dataModalEdit={this.state.dataModalEdit}
  //                 key={this.state.modalKey}
  //             />
  //         </span>
  //     );
  // };

  //Render ----------------------------------------------------
  render() {
    const {role} = this.props;
    const user = getLocalKey('user', {});
    const vaiTroAdmin = user.VaiTro;
    return (
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>DANH MỤC LOẠI KHIẾU TỐ</PageHeader>
          <PageAction>
            {role.add ? this.renderActionAddEdit() : null}
          </PageAction>
        </PageWrap>
        <Box style={{minHeight: 'calc(100vh - 265px)'}}>
          <BoxFilter>
            <Input.Search
              allowClear={true}
              defaultValue={this.state.filterData.Keyword}
              placeholder="Tìm kiếm theo tên loại khiếu tố"
              onSearch={(value) => this.onFilter(value, 'Keyword')}
              style={{width: 300}}
            />
          </BoxFilter>
          <RenderTree key={this.state.treeKey} style={{userSelect: 'none'}}>
            {this.renderContent()}
          </RenderTree>
        </Box>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.DanhMucLoaiKhieuTo,
  };
}

export default connect(mapStateToProps, actions)(DanhMucLoaiKhieuTo);
