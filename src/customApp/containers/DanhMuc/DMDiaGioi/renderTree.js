import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tree, Menu, Dropdown, Modal, message } from "antd";
import Constants from "../../../../settings/constants";
import actions from "../../../redux/DanhMuc/DMDiaGioi/actions";
import api from "./config";
import {
  PlusCircleOutlined,
  CreditCardOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { MarginR } from "./styled";
import { formatTreeDataCoQuan } from "../../../../helpers/utility";
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
  const { TreeNode } = Tree;
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    const { DanhSachCoQuan } = formatTreeDataCoQuan(DanhSachDiaGioi) || {};
    setTreeData(DanhSachCoQuan);
  }, [DanhSachDiaGioi]);
  const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   if (filterData.Keysearch) {
  //     setSearchValue(filterData.Keysearch.toLowerCase());
  //     const newExpandedKeys = getExpandedKeys(treeData, filterData.Keysearch.toLowerCase());
  //     setExpandedKeys(prevKeys => [...new Set([...prevKeys, ...newExpandedKeys])]);
  //   } else {
  //     setSearchValue("");
  //     // Không reset expandedKeys ở đây để giữ lại các key đã mở
  //   }
  // }, [filterData.Keysearch, treeData]);

  useEffect(() => {
    if (filterData.Keysearch) {
      setSearchValue(filterData.Keysearch.toLowerCase());
      const expandedKeys = getExpandedKeys(
        treeData,
        filterData.Keysearch.toLowerCase()
      );
      setExpandedKeys(expandedKeys);
    } else {
      setSearchValue("");
      // setExpandedKeys([]);
    }
  }, [filterData.Keysearch, treeData]);

  const getExpandedKeys = (data, searchValue) => {
    const keys = [];
    const searchTree = (node) => {
      if (
        removeDiacritics(node.Ten?.toLowerCase()).includes(
          removeDiacritics(searchValue)
        )
      ) {
        keys.push(node.key);
        return true;
      }
      if (node.children) {
        return node.children.some((child) => {
          if (searchTree(child)) {
            keys.push(node.key);
            return true;
          }
          return false;
        });
      }
      return false;
    };
    data.forEach(searchTree);
    return keys;
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
                      ? "Thêm mới quận/huyện"
                      : "Thêm mới xã/phường"}
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
              trigger={["contextMenu"]}
            >
              <span>{item.title}</span>
            </Dropdown>
          </div>
        ) : (
          <div>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              trigger={["contextMenu"]}
            >
              <b>{item.title}</b>
            </Dropdown>
          </div>
        );

      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            title={title}
            key={item.key}
            isLeaf={false}
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

    // onLoadData(info.node);
  };

  const onExpandNode = (selectedKeys, info) => {
    if (info.event?.includes("select")) {
      let className = info.nativeEvent.target.outerHTML.toString();
      if (className.includes("ant-dropdown-trigger")) {
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

    // onLoadData(info.node);
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <>
      <Tree
        showLine
        defaultExpandedKeys={expandedKeys}
        expandedKeys={expandedKeys}
        // loadData={onLoadData}
        onSelect={onExpandNode}
        onExpand={onExpand}
        height={heightApp - 290}
        defaultExpandAll={true}
        filterTreeNode={(node) => {
          return searchValue
            ? removeDiacritics(node.dataRef?.Ten?.toLowerCase()).includes(
                removeDiacritics(searchValue?.toLowerCase())
              )
            : false;
        }}
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
