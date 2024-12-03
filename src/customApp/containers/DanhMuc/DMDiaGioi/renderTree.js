import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Tree, Menu, Dropdown, Modal, message} from 'antd';
import Constants from '../../../../settings/constants';
import actions from '../../../redux/DanhMuc/DMDiaGioi/actions';
import api from './config';
import {
  PlusCircleOutlined,
  CreditCardOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {MarginR} from './styled';

const updateTreeData = (list, key, children = []) =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        isLeaf: children.length < 1,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const RenderTree = ({
  DanhSachDiaGioi,
  heightApp,
  filterData,
  onShowModalAdd,
  onShowModalEdit,
  onDeleteData,
  dataSubmit,
  setdataSubmit,
  isActionCompleted,
  role,
}) => {
  const {TreeNode} = Tree;
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    setTreeData(handleConvertNormalDataToTreeData(DanhSachDiaGioi, 0));
  }, [DanhSachDiaGioi]);

  useEffect(() => {
    if (isActionCompleted && dataSubmit.data) handleResetTree(dataSubmit);
  }, [isActionCompleted, dataSubmit]);

  const handleCallApi = async (filterData) => {
    return await api.danhSachDiaGioi(filterData);
  };

  const handleConvertNormalDataToTreeData = (data, key) => {
    let newData = data?.reduce((result, item, index) => {
      let node = {
        ID: item.ID,
        Highlight: item.Highlight,
        ParentID: item.ParentID,
        Ten: item.Ten,
        title: item.Ten,
        key: `${key}-${index}`,
        children: null,
        isLeaf: item.TotalChildren < 1,
        Cap: item.Cap,
        TenDayDu: item.TenDayDu,
        TotalChildren: item.TotalChildren,
      };

      if (node.TotalChildren > 0 && expandedKeys.includes(node.key)) {
        let res = handleCallApi({
          ...filterData,
          ID: item.ID,
          Cap: item.Cap + 1,
        });
        const {Data, Status} = res;
        if (Status === 1) {
          node.children = Data.map((itemChild, index) => ({
            ID: itemChild.ID,
            Highlight: itemChild.Highlight,
            ParentID: itemChild.ParentID,
            Ten: itemChild.Ten,
            title: itemChild.Ten,
            key: `${node.key}-${index}`,
            children: null,
            isLeaf: itemChild.TotalChildren < 1,
            Cap: itemChild.Cap,
            TenDayDu: itemChild.TenDayDu,
            TotalChildren: itemChild.TotalChildren,
          }));
          result.push(node);
        }
      } else result.push(node);
      return result;
    }, []);

    return newData;
  };

  const showModalAdd = (parentID, parentCap, parentKey, treeData) => {
    onShowModalAdd(parentID, parentCap, parentKey, treeData);
  };

  const showModalEdit = (ID, Cap, Key, treeData) => {
    onShowModalEdit(ID, Cap, Key, treeData);
  };

  const deleteData = (ID, Cap, Key) => {
    onDeleteData(ID, Cap, Key);
  };

  const onLoadData = ({key, children, dataRef}) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      api
        .danhSachDiaGioi({
          ...filterData,
          ID: dataRef.ID,
          Cap: dataRef.Cap + 1 > 3 ? 3 : dataRef.Cap + 1,
        })
        .then((res) => {
          setTreeData((origin) =>
            updateTreeData(
              origin,
              key,
              handleConvertNormalDataToTreeData(res.data.Data, key),
            ),
          );

          resolve();
        });
    });

  const customTreeNodes = (data) => {
    return data.map((item) => {
      let menu =
        role?.add || role?.edit || role?.delete ? (
          <Menu>
            {item.Cap.toString() !== Constants.XA && role?.add && (
              <Menu.Item
                key={item}
                onClick={() =>
                  showModalAdd(item.ID, item.Cap, item.key, treeData)
                }
              >
                <MarginR>
                  <PlusCircleOutlined className="add" />
                  <span>
                    {item.Cap.toString() === Constants.TINH
                      ? 'Thêm mới quận/huyện'
                      : 'Thêm mới xã/phường'}
                  </span>
                </MarginR>
              </Menu.Item>
            )}
            {role?.edit ? (
              <Menu.Item
                onClick={() =>
                  showModalEdit(item.ID, item.Cap, item.key, treeData)
                }
              >
                <MarginR>
                  <CreditCardOutlined className="edit" />
                  <span>Sửa</span>
                </MarginR>
              </Menu.Item>
            ) : null}
            {role?.delete ? (
              <Menu.Item
                onClick={() => deleteData(item.ID, item.Cap, item.key)}
              >
                <MarginR>
                  <CloseCircleOutlined className="delete" />
                  <span>Xóa</span>
                </MarginR>
              </Menu.Item>
            ) : null}
          </Menu>
        ) : (
          <></>
        );

      let title =
        item.Cap > 1 ? (
          <div>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              trigger={['contextMenu']}
            >
              <span>{item.title}</span>
            </Dropdown>
          </div>
        ) : (
          <div>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              trigger={['contextMenu']}
            >
              <b>{item.title}</b>
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
            {customTreeNodes(item.children)}
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
  };

  const onExpand = (keys, info) => {
    let key = info.node.key;

    if (info.expanded) {
      setExpandedKeys((pre) => [...pre, key]);
    } else {
      let index = expandedKeys.indexOf(key);
      let newExpandedKeys = [...expandedKeys];
      newExpandedKeys.splice(index, 1);
      setExpandedKeys(newExpandedKeys);
    }

    onLoadData(info.node);
  };

  const onExpandNode = (selectedKeys, info) => {
    if (info.event?.includes('select')) {
      let className = info.nativeEvent.target.outerHTML.toString();
      if (className.includes('ant-dropdown-trigger')) {
        let key = info.node.props.eventKey.toString();

        if (key) {
          let index = expandedKeys.indexOf(key);
          if (index !== -1) {
            let newExpandedKeys = [...expandedKeys];
            newExpandedKeys.splice(index, 1);
            setExpandedKeys(newExpandedKeys);
          } else {
            let newExpandedKeys = [...expandedKeys, key];
            setExpandedKeys(newExpandedKeys);
          }
        }
      }
    }

    onLoadData(info.node);
  };

  const handleResetTree = async (treeInfo) => {
    const {data, action} = treeInfo;
    let index = data.Key.split('-');
    let indexLength = index.length;

    let DS = [...treeData];

    let res = await api.chiTietDiaGioi({
      ID: data.ID,
      Cap: data.Cap,
    });
    let newTreeNode = res.data.Data;

    let parentID = 0;

    switch (newTreeNode.Cap) {
      case 2:
        parentID = newTreeNode.TinhID;
        break;
      case 3:
        parentID = newTreeNode.HuyenID;
        break;
      default:
        parentID = 0;
        break;
    }

    let node = {
      ID: newTreeNode.ID,
      Highlight: newTreeNode.Highlight,
      ParentID: parentID,
      Ten: newTreeNode.Ten,
      title: newTreeNode.Ten,
      children: null,
      isLeaf: newTreeNode.TotalChildren < 1,
      Cap: parseInt(newTreeNode.Cap),
      TenDayDu: newTreeNode.TenDayDu,
      TotalChildren: newTreeNode.TotalChildren,
    };

    switch (action) {
      case 'add': {
        if (indexLength <= 1) {
          node.key = `0-${treeData.length}`;
          setTreeData([...treeData, node]);
        } else if (indexLength >= 2) {
          let children = [];

          if (indexLength == 2) {
            let TinhIndex = index[1];
            children = DS[TinhIndex]?.children || [];
          } else if (indexLength == 3) {
            let TinhIndex = index[1];
            let HuyenIndex = index[2];
            children = DS[TinhIndex]?.children[HuyenIndex]?.children || [];
          }

          if (children.length > 0) {
            node.key = `${data.Key}-${children.length}`;
            setTreeData(
              updateTreeData(treeData, data.Key, [...children, node]),
            );
          } else {
            node.key = `${data.Key}-0`;
            setTreeData(updateTreeData(treeData, data.Key, [node]));
          }
        }

        break;
      }
      case 'edit': {
        if (indexLength == 2) {
          let TinhIndex = index[1];
          DS[TinhIndex] = {
            ...node,
            key: DS[TinhIndex].key,
            children: [...DS[TinhIndex].children],
          };
        } else if (indexLength == 3) {
          let TinhIndex = index[1];
          let HuyenIndex = index[2];
          DS[TinhIndex].children[HuyenIndex] = {
            ...node,
            key: DS[TinhIndex].children[HuyenIndex].key,
            children: [...DS[TinhIndex].children[HuyenIndex].children],
          };
        } else if (indexLength == 4) {
          let TinhIndex = index[1];
          let HuyenIndex = index[2];
          let XaIndex = index[3];
          DS[TinhIndex].children[HuyenIndex].children[XaIndex] = {
            ...node,
            key: DS[TinhIndex].children[HuyenIndex].children[XaIndex].key,
            children: [
              ...DS[TinhIndex].children[HuyenIndex].children[XaIndex].children,
            ],
          };
        }
        setTreeData(DS);
        break;
      }
      case 'delete': {
        if (indexLength <= 1) break;
        else if (indexLength == 2) {
          let TinhIndex = index[1];
          DS.splice(TinhIndex, 1);
          DS = DS.map((item, index) => {
            let newItem = {...item};
            newItem.key = `0-${index}`;
            return newItem;
          });
        } else if (indexLength == 3) {
          let TinhIndex = index[1];
          let HuyenIndex = index[2];
          DS[TinhIndex].children.splice(HuyenIndex, 1);
          DS[TinhIndex].children = DS[TinhIndex].children.map((item, index) => {
            let newItem = {...item};
            newItem.key = `0-${TinhIndex}-${index}`;
            return newItem;
          });
          DS[TinhIndex].isLeaf = DS[TinhIndex].children.length < 1;
        } else if (indexLength == 4) {
          let TinhIndex = index[1];
          let HuyenIndex = index[2];
          let XaIndex = index[3];
          DS[TinhIndex].children[HuyenIndex].children.splice(XaIndex, 1);
          DS[TinhIndex].children[HuyenIndex].children = DS[TinhIndex].children[
            HuyenIndex
          ].children.map((item, index) => {
            let newItem = {...item};
            newItem.key = `0-${TinhIndex}-${HuyenIndex}-${index}`;
            return newItem;
          });
          DS[TinhIndex].children[HuyenIndex].isLeaf =
            DS[TinhIndex].children[HuyenIndex].children.length < 1;
        }
        setTreeData(DS);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <Tree
        showLine
        defaultExpandedKeys={expandedKeys}
        expandedKeys={expandedKeys}
        loadData={onLoadData}
        onSelect={onExpandNode}
        onExpand={onExpand}
        height={heightApp - 290}
      >
        {customTreeNodes(treeData)}
      </Tree>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.DanhMucDiaGioi,
    heightApp: state.App.height,
  };
};

export default connect(mapStateToProps, actions)(RenderTree);
