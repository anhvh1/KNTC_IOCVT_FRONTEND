import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import actions from '../../../redux/DanhMuc/DMCoQuan/actions';
import api from './config';
import Constants from '../../../../settings/constants';
import Select, {Option} from '../../../../components/uielements/select';

import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import {EmptyTable} from '../../../../components/utility/boxTable';

import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import {Modal, message, Input, Tree, Menu, Dropdown} from 'antd';
import Button from '../../../../components/uielements/button';
import {changeUrlFilter, getFilterData} from '../../../../helpers/utility';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import TreeData from './treeData';
import {RedTree, StyledBoxDMCoQuan} from './styled';
import {getRoleByKey} from '../../../../helpers/utility';
import PageWrap from '../../../../components/utility/PageWrap';
const {TreeNode} = Tree;
import {getLocalKey} from '../../../../helpers/utility';
class DMCoQuan extends Component {
  constructor(props) {
    super(props);
    document.title = 'Danh mục cơ quan đơn vị';
    const filterData = '';
    this.state = {
      setKey: [],
      expandedKeys: [],
      filterData: {...filterData},
      treeKey: 0,
      modalKey: 0,
      DanhSachCoQuan: [],
      confirmLoading: false,
      visibleModalAdd: false,
      dataModalAdd: null,
      visibleModalEdit: false,
      dataModalEdit: {
        DanhSachTinh: [],
        Data: null,
      },
      danhSachCacCap: [],
    };

    // const { heightApp } = this.props;
  }
  // get api danhsachcaccap
  danhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      this.setState({
        ...this.state,
        danhSachCacCap: res.data.Data,
      });
    } catch (error) {}
  };

  //Get initData---------------------------------------------
  componentDidMount = () => {
    this.props.getInitData(this.state.filterData);
    this.danhSachCacCap();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.DanhSachCoQuan !== this.props.DanhSachCoQuan) {
      let treeKey = this.state.treeKey + 1;
      this.setState({
        DanhSachCoQuan: this.props.DanhSachCoQuan,
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
    this.setState({filterData}, () => {
      let Cap = this.state.filterData.Cap ? this.state.filterData.Cap : '';
      changeUrlFilter({Cap}); //change url
      this.props.getList(this.state.filterData);
      //get list
    });
  };

  //Delete-----------------------------------------------------
  deleteData = (CoQuanID) => {
    if (!this.props.role.delete) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      Modal.confirm({
        title: 'Xóa dữ liệu',
        content: 'Bạn có muốn xóa cơ quan đơn vị này không?',
        cancelText: 'Không',
        okText: 'Có',
        onOk: () => {
          api
            .xoaCoQuan(CoQuanID)
            .then((response) => {
              if (response.data.Result.Status > 0) {
                //reset tree
                this.props.getList(this.state.filterData); //get list
                //message success
                message.destroy();
                message.success(response.data.Result.Message);
              } else {
                Modal.error({
                  title: 'Lỗi',
                  content: response.data.Result.Message,
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

  //Modal add -----------------------------------------------------
  showModalAdd = (CoQuanChaID, TenCoQuanCha) => {
    if (!this.props.role.add) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      if (!CoQuanChaID) {
        let modalKey = this.state.modalKey + 1;
        this.setState({
          visibleModalAdd: true,
          dataModalAdd: {
            // DanhSachTinh: [...this.props.DanhSachDiaGioi],
            CoQuanChaID,
            TenCoQuanCha,
          },
          confirmLoading: false,
          modalKey,
        });
      } else
        api
          .chiTietCoQuan({ID: CoQuanChaID})
          .then((response) => {
            if (response.data.Status > 0) {
              let modalKey = this.state.modalKey + 1;
              let Data = response.data.Data;
              this.setState({
                visibleModalAdd: true,
                dataModalAdd: {
                  Data,
                  // DanhSachTinh: [...this.props.DanhSachDiaGioi],
                  CoQuanChaID,
                  TenCoQuanCha,
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
      // let modalKey = this.state.modalKey + 1;
      // this.setState({
      //   visibleModalAdd: true,
      //   dataModalAdd: {
      //     // DanhSachTinh: [...this.props.DanhSachDiaGioi],
      //     CoQuanChaID,
      //     TenCoQuanCha,
      //   },
      //   confirmLoading: false,
      //   modalKey,
      // });
    }
  };

  hideModalAdd = () => {
    this.setState({
      visibleModalAdd: false,
      dataModalAdd: null,
    });
  };

  submitModalAdd = (data) => {
    this.setState({confirmLoading: true}, () => {
      api
        .themCoQuan(data)
        .then((response) => {
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success('Thêm thành công');
            //hide modal
            this.hideModalAdd();
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
  };

  //Modal edit -----------------------------------------------------
  showModalEdit = (CoQuanID, TenCoQuanCha) => {
    if (!this.props.role.edit) {
      message.destroy();
      message.warning('Bạn không có quyền thực hiện chức năng này');
    } else {
      api
        .chiTietCoQuan({ID: CoQuanID})
        .then((response) => {
          if (response.data.Status > 0) {
            let modalKey = this.state.modalKey + 1;
            let Data = response.data.Data;
            this.setState({
              visibleModalEdit: true,
              dataModalEdit: {
                // DanhSachTinh: [...this.props.DanhSachDiaGioi],
                Data,
                CoQuanID,
                TenCoQuanCha,
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

  hideModalEdit = () => {
    this.setState({visibleModalEdit: false});
  };

  submitModalEdit = (data) => {
    this.setState({confirmLoading: true}, () => {
      api
        .suaCoQuan(data)
        .then((response) => {
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success('Cập nhật thành công');
            //hide modal
            this.hideModalEdit();
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
          this.setState({setKey: selectedKeys});
        }
      }
    }
  };

  renderTreeNodes = (data) =>
    data?.map((item) => {
      let menu = (
        <Menu>
          {item.Cap <= 4 || item.Cap === 6 || item.Cap === 7 ? ( //if Cap = 1 or 2
            <Menu.Item
              onClick={() => this.showModalAdd(item.ID, item.Ten, item.Cap)}
            >
              <span>Thêm đơn vị</span>
            </Menu.Item>
          ) : null}
          <Menu.Item
            onClick={() => this.showModalEdit(item.ID, item.Ten, item.Cap)}
          >
            <span>Sửa</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => this.deleteData(item.ID)}
            disabled={!item.children ? false : true}
          >
            <span>Xóa</span>
          </Menu.Item>
        </Menu>
      );
      let title = (
        <div
        //  onClick={() => this.props.dispatch(item.ID)}
        >
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={['contextMenu']}
          >
            <span
              className="title-tree"
              style={item.ID === this.props.styled ? {color: 'red'} : {}}
            >
              {item.title}
            </span>
          </Dropdown>
        </div>
      );

      if (item.children) {
        return (
          <TreeNode
            title={title}
            key={item.key}
            isLeaf={item.isLeaf}
            children={item.children}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          key={item.key}
          isLeaf={item.isLeaf}
          children={item.children}
          dataRef={item}
        />
      );
    });

  renderContent = () => {
    if (this.state.DanhSachCoQuan.length) {
      const DSFilter = this.filterTreeNode(this.state.DanhSachCoQuan);
      return (
        <RedTree>
          <Tree
            showLine
            // switcherIcon={<Icon type="down" />}
            filterTreeNode={(treeNode) =>
              treeNode.props.dataRef.Highlight === 1
            }
            onSelect={this.onExpandNode}
            onExpand={this.onExpandNode}
            defaultExpandedKeys={this.state.setKey}
            expandedKeys={
              this.state.filterData.Keyword
                ? this.props.expandedKeys
                : this.state.expandedKeys
            }
            // height={heightApp - 290}
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
    // const { filterData } = this.state;
    // const { Keyword } = filterData;
    // if (Keyword) {
    //   const DataFilter = [];
    //   dataRoot &&
    //     dataRoot.forEach((parents) => {
    //       const newParents = { ...parents };
    //       if (newParents.children && newParents.children.length) {
    //         if (newParents.Ten.toLowerCase().includes(Keyword.toLowerCase())) {
    //           newParents.children = this.filterTreeNode(newParents.children);
    //           DataFilter.push(newParents);
    //         } else {
    //           const newChildren = this.filterTreeNode(newParents.children);
    //           if (newChildren.length) {
    //             newParents.children = newChildren;
    //             DataFilter.push(newParents);
    //           }
    //         }
    //       } else {
    //         if (newParents.Ten.toLowerCase().includes(Keyword.toLowerCase())) {
    //           DataFilter.push(newParents);
    //         }
    //       }
    //     });
    //   return DataFilter;
    // }
    return dataRoot;
  };

  //Render action ---------------------------------------------
  renderActionAdd = () => {
    return (
      <span>
        <Button
          type="primary"
          onClick={() => this.showModalAdd('', '', '')}
          className="d-none"
        >
          <PlusOutlined />
          Thêm mới
        </Button>
        <ModalAdd
          confirmLoading={this.state.confirmLoading}
          visible={this.state.visibleModalAdd}
          onCancel={this.hideModalAdd}
          onCreate={this.submitModalAdd}
          dataModalAdd={this.state.dataModalAdd}
          key={this.state.modalKey}
          DanhSachCoQuan={this.state.DanhSachCoQuan}
        />
      </span>
    );
  };

  renderActionEdit = () => {
    return (
      <span>
        <ModalEdit
          confirmLoading={this.state.confirmLoading}
          visible={this.state.visibleModalEdit}
          onCancel={this.hideModalEdit}
          onCreate={this.submitModalEdit}
          dataModalEdit={this.state.dataModalEdit}
          key={this.state.modalKey}
        />
      </span>
    );
  };

  //Render ----------------------------------------------------
  render() {
    const {role} = this.props;
    const user = getLocalKey('user', {});
    const vaiTroAdmin = user.VaiTro;
    return (
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>DANH MỤC CƠ QUAN, ĐƠN VỊ</PageHeader>
          <PageAction>
            {this.renderActionAdd()}
            {role?.edit ? this.renderActionEdit() : ''}
          </PageAction>
        </PageWrap>
        <StyledBoxDMCoQuan>
          <Box className="box">
            <BoxFilter>
              <Select
                allowClear
                style={{width: '200px'}}
                defaultValue={this.state.filterData.Cap}
                placeholder={'Chọn cấp'}
                onChange={(value) => this.onFilter(value, 'Cap')}
              >
                {this.state.danhSachCacCap?.map((item) => (
                  <Option value={item.Cap}>{item.TenCap}</Option>
                ))}
              </Select>
              <Input.Search
                allowClear
                defaultValue={this.state.filterData.Keyword}
                placeholder="Tìm kiếm theo tên cơ quan, đơn vị"
                onSearch={(value) => this.onFilter(value, 'Keyword')}
                style={{width: 300}}
              />
            </BoxFilter>
            <div
              key={this.state.treeKey}
              style={{userSelect: 'none'}}
              className="mg-top"
            >
              {this.renderContent()}
            </div>
          </Box>
        </StyledBoxDMCoQuan>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.DMCoQuan,
    role: getRoleByKey(state.Auth.role, 'danh-muc-co-quan'),
  };
}

export default connect(mapStateToProps, actions)(DMCoQuan);
