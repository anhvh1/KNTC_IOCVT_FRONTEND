import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import actions from "../../../redux/DanhMuc/DMCoQuan/actions";
import api, { apiUrl } from "./config";
import Constants from "../../../../settings/constants";
import Select, { Option } from "../../../../components/uielements/select";
import axios from "axios";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import { EmptyTable } from "../../../../components/utility/boxTable";
import { saveAs } from "file-saver";
import ModalEdit from "./modalAddEdit";
import { Modal, message, Input, Tree, Menu, Dropdown } from "antd";
import Button from "../../../../components/uielements/button";
import { changeUrlFilter, getFilterData } from "../../../../helpers/utility";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import TreeData from "./treeData";
import { RedTree, StyledBoxDMCoQuan } from "./styled";
import { getRoleByKey } from "../../../../helpers/utility";
import PageWrap from "../../../../components/utility/PageWrap";
import { InputSearch } from "../../../../components/uielements/input";
import AddIcon from "../../../../components/utility/AddIcon";
const { TreeNode } = Tree;
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
const DMCoQuan = (props) => {
  document.title = "Danh mục cơ quan đơn vị";
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [keyState, setKeyState] = useState({
    key: 0,
    treeKey: 0,
  });
  const access_token = localStorage.getItem("access_token");
  const [stateModalAddEdit, setStateModalAddEdit] = useState({
    confirmLoading: false,
    visibleModalAddEdit: false,
    action: "",
    dataModalAddEdit: {
      DanhSachTinh: [],
      Data: null,
    },
    modalKey: 0,
  });
  const { DanhSachCoQuan } = props;
  const [searchValue, setSearchValue] = useState("");
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const [matchedKeys, setMatchedKeys] = useState([]);
  const {
    confirmLoading,
    visibleModalAddEdit,
    action,
    dataModalAddEdit,
    modalKey,
  } = stateModalAddEdit;

  const { treeKey, key } = keyState;
  // get api danhsachcaccap
  const danhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    props.getInitData(filterData);
    danhSachCacCap();
  }, []);

  // useEffect(() => {
  //   if (filterData.Keysearch) {
  //     const matches = findMatchedKeys(DanhSachCoQuan, filterData.Keysearch);
  //     const allExpandedKeys = matches.reduce((acc, key) => {
  //       return [...acc, ...getParentKeys(DanhSachCoQuan, key), key];
  //     }, []);

  //     setMatchedKeys(matches);
  //     setExpandedKeys([...new Set(allExpandedKeys)]);
  //   } else {
  //     setMatchedKeys([]);
  //     setExpandedKeys([]);
  //   }
  // }, [filterData.Keysearch, DanhSachCoQuan]);

  const getExpandedKeys = (data, searchValue) => {
    const keys = [];

    const searchTree = (node) => {
      // Kiểm tra nếu node hiện tại có chứa giá trị searchValue
      const checkIncludes =
        removeDiacritics(node.TenCoQuan?.toLowerCase())?.includes(
          removeDiacritics(searchValue.toLowerCase())
        ) ||
        removeDiacritics(node.MaCQ?.toLowerCase())?.includes(
          removeDiacritics(searchValue.toLowerCase())
        );

      let foundInChildren = false;

      // Nếu node hiện tại có children, đệ quy tìm kiếm trong tất cả các node con
      if (node.Children) {
        node.Children.forEach((child) => {
          if (searchTree(child)) {
            foundInChildren = true;
          }
        });
      }

      // Nếu tìm thấy searchValue trong node hiện tại hoặc trong node con, đẩy key vào mảng
      if (checkIncludes || foundInChildren) {
        keys.push(node.key);
        return true;
      }
      return false;
    };

    // Duyệt qua toàn bộ data
    data.forEach(searchTree);

    return keys;
  };

  useEffect(() => {
    if (filterData.Keysearch) {
      setSearchValue(filterData.Keysearch.toLowerCase());
      const expandedKeys = getExpandedKeys(
        DanhSachCoQuan,
        filterData.Keysearch.toLowerCase()
      );

      setExpandedKeys(expandedKeys);
    } else {
      setSearchValue("");
    }
  }, [filterData.Keysearch, DanhSachCoQuan]);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData);
  }, [filterData]);

  //filter --------------------------------------------------
  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newFilterData);
  };

  //Delete-----------------------------------------------------
  const deleteData = (CoQuanID) => {
    Modal.confirm({
      title: "Xóa dữ liệu",
      content: "Bạn có muốn xóa cơ quan đơn vị này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .xoaCoQuan(CoQuanID)
          .then((response) => {
            if (response.data.Status > 0) {
              //reset tree
              props.getList(filterData); //get list
              //message success
              message.destroy();
              message.success(response.data.Message);
            } else {
              Modal.error({
                title: "Lỗi",
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error({
              title: "Lỗi",
              content: "Có lỗi xảy ra khi thực hiện yêu cầu.",
            });
          });
      },
    });
  };
  //Modal add -----------------------------------------------------
  const showModalAdd = (CoQuanID, CoQuanChaID, TenCoQuan) => {
    if (!CoQuanChaID) {
      let newModalKey = modalKey + 1;
      setStateModalAddEdit((prevState) => ({
        ...prevState,
        visibleModalAddEdit: true,
        dataModalAddEdit: {
          CoQuanChaID: CoQuanID,
          TenCoQuanCha: TenCoQuan,
        },
        confirmLoading: false,
        modalKey: newModalKey,
        action: "add",
      }));
    } else
      api
        .chiTietCoQuan({ coQuanID: CoQuanID })
        .then((response) => {
          if (response.data.Status > 0) {
            let Data = response.data.Data;
            let newModalKey = modalKey + 1;
            setStateModalAddEdit((prevState) => ({
              ...prevState,
              visibleModalAddEdit: true,
              dataModalAddEdit: {
                CoQuanChaID: CoQuanID,
                TenCoQuanCha: Data.TenCoQuan,
              },
              confirmLoading: false,
              modalKey: newModalKey,
              action: "add",
            }));
          } else {
            Modal.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          message.destroy();
          message.warning(error.toString());
        });
    // }
  };

  //Modal edit -----------------------------------------------------
  const showModalEdit = (CoQuanID, TenCoQuanCha) => {
    api
      .chiTietCoQuan({ coQuanID: CoQuanID })
      .then((response) => {
        if (response.data.Status > 0) {
          let Data = response.data.Data;
          let newModalKey = modalKey + 1;
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            visibleModalAddEdit: true,
            dataModalAddEdit: {
              Data,
              CoQuanID,
              TenCoQuanCha: Data.TenCoQuanCha,
            },

            confirmLoading: false,
            modalKey: newModalKey,
            action: "edit",
          }));
        } else {
          Modal.error({
            title: "Lỗi",
            content: response.data.Message,
          });
        }
      })
      .catch((error) => {
        Modal.error(Constants.API_ERROR);
      });
  };

  const hideModalEdit = () => {
    setStateModalAddEdit((prevState) => ({
      dataModalAddEdit: {},
      visibleModalAddEdit: false,
      action: "",
    }));
  };

  const submitModalEdit = (data) => {
    setStateModalAddEdit((prevState) => ({
      ...prevState,
      confirmLoading: true,
    }));
    if (action === "add") {
      api
        .themCoQuan(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getList(filterData); //get list
          } else {
            Modal.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          Modal.error(Constants.API_ERROR);
        });
    } else {
      api
        .suaCoQuan(data)
        .then((response) => {
          setStateModalAddEdit((prevState) => ({
            ...prevState,
            confirmLoading: false,
          }));
          if (response.data.Status > 0) {
            //message success
            message.destroy();
            message.success(response.data.Message);
            //hide modal
            hideModalEdit();
            props.getList(filterData); //get list
          } else {
            Modal.error({
              title: "Lỗi",
              content: response.data.Message,
            });
          }
        })
        .catch((error) => {
          Modal.error(Constants.API_ERROR);
        });
    }
  };

  //Tree -------------------------------------------------------------
  const onExpandNode = (selectedKeys, info) => {
    let className = info.nativeEvent.target.outerHTML.toString();
    let parentClassName =
      info.nativeEvent.target.parentElement.className.toString();
    let checkMenu = className.includes("ant-dropdown-menu");
    let checkNearMenu = parentClassName.includes("ant-dropdown-menu");
    if (!checkMenu && !checkNearMenu) {
      //neu dang k click menu drop
      let key = info.node.props.eventKey.toString();
      if (key) {
        if (!info.node.props.isLeaf) {
          let newExpandedKeys = [...expandedKeys];
          let index = newExpandedKeys.indexOf(key);
          if (index > -1) {
            newExpandedKeys.splice(index, 1);
          } else {
            newExpandedKeys = newExpandedKeys.concat([key]);
          }
          setExpandedKeys(newExpandedKeys);
          setKeyState((prevKey) => ({ ...prevKey, key: selectedKeys }));
        }
      }
    }
  };
  const [openedMenuKey, setOpenedMenuKey] = useState(null);

  const handleMenuOpen = (key) => {
    setOpenedMenuKey(key);
  };

  const handleMenuClose = () => {
    setOpenedMenuKey(null);
  };
  const renderTreeNodes = (data) =>
    data?.map((item) => {
      let menu = (
        <Menu>
          <Menu.Item
            key="add"
            onClick={() => {
              handleMenuClose();
              showModalAdd(item.CoQuanID, item.CoQuanChaID, item.TenCoQuan);
            }}
          >
            <span>Thêm đơn vị</span>
          </Menu.Item>
          <Menu.Item
            key="edit"
            onClick={() => {
              handleMenuClose();
              showModalEdit(item.CoQuanID, item.TenCoQuan, item.CapID);
            }}
          >
            <span>Sửa</span>
          </Menu.Item>
          <Menu.Item
            key="delete"
            onClick={() => {
              handleMenuClose();
              deleteData(item.CoQuanID);
            }}
            disabled={item.Children && item.Children.length > 0} // Disable if item has children
          >
            <span>Xóa</span>
          </Menu.Item>
        </Menu>
      );
      let title = (
        <Dropdown
          key={item.CoQuanID}
          overlay={menu}
          trigger={["contextMenu"]}
          onOpenChange={(visible) => {
            if (visible) {
              handleMenuOpen(item.key);
            } else {
              handleMenuClose();
            }
          }}
        >
          <span
            className="title-tree"
            // style={item.ID === props.styled ? { color: "red" } : {}}
          >
            {item.MaCQ ? `${item.MaCQ} - ` : ""}
            {item.TenCoQuan}
          </span>
        </Dropdown>
      );

      if (item.Children && item.Children.length > 0) {
        return (
          <TreeNode
            title={title}
            key={item.key}
            isLeaf={item.isLeaf}
            Children={item.Children}
            dataRef={item}
          >
            {renderTreeNodes(item.Children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={title}
          key={item.key}
          isLeaf={item.isLeaf}
          Children={item.Children}
          dataRef={item}
        />
      );
    });

  const removeDiacritics = (str) => {
    if (str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  };
  const getParentKeys = (data, targetKey, parentKeys = []) => {
    for (const item of data) {
      if (item.key === targetKey) {
        return parentKeys;
      }
      if (item.Children) {
        const result = getParentKeys(item.Children, targetKey, [
          ...parentKeys,
          item.key,
        ]);
        if (result.length) {
          return result;
        }
      }
    }
    return [];
  };

  const findMatchedKeys = (data, searchValue) => {
    const matches = [];
    const normalizedSearch = removeDiacritics(searchValue.toLowerCase());

    const traverse = (node) => {
      const normalizedTenCoQuan = removeDiacritics(
        node.TenCoQuan?.toLowerCase() || ""
      );
      const normalizedMaCQ = removeDiacritics(node.MaCQ?.toLowerCase() || "");

      if (
        normalizedTenCoQuan.includes(normalizedSearch) ||
        normalizedMaCQ.includes(normalizedSearch)
      ) {
        matches.push(node.key);
      }

      if (node.Children) {
        node.Children.forEach(traverse);
      }
    };

    data.forEach(traverse);
    return matches;
  };

  const renderContent = () => {
    if (DanhSachCoQuan?.length) {
      // const DSFilter = filterTreeNode(DanhSachCoQuan);
      // console.log(
      //   expandedKeys,
      //   "expandedKeys render",
      //   DanhSachCoQuan,
      //   "DanhSachCoQuan"
      // );
      return (
        <RedTree>
          <Tree
            showLine
            filterTreeNode={(node) => {
              return searchValue
                ? removeDiacritics(
                    node.dataRef?.TenCoQuan?.toLowerCase()
                  ).includes(removeDiacritics(searchValue?.toLowerCase()))
                : false;
              // return checkFIlterNode(node);
            }}
            onSelect={onExpandNode}
            onExpand={onExpandNode}
            // defaultExpandedKeys={key}
            expandedKeys={expandedKeys}
          >
            {renderTreeNodes(DanhSachCoQuan)}
          </Tree>
        </RedTree>
      );
    } else {
      return <EmptyTable loading={props.TableLoading} />;
    }
  };

  const filterTreeNode = (dataRoot) => {
    return dataRoot;
  };

  //Render action ---------------------------------------------
  const renderActionAdd = () => {
    return (
      <span>
        <Button
          type="add"
          onClick={() => showModalAdd("", "", "")}
          className="d-none"
        >
          <AddIcon />
          Thêm mới
        </Button>
      </span>
    );
  };

  //Render ----------------------------------------------------
  const { role } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const DownloadDanhSach = async () => {
    try {
      const response = await axios.get(apiUrl.downloadDanhSach, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, "Danh Sách Cơ Quan Đơn Vị.xlsx");
      } else {
        console.error("Error downloading the file:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          <Button type="dowloadlist" onClick={DownloadDanhSach}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cloud-arrow-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"
              />
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg>
            Tải danh sách
          </Button>
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <InputSearch
            allowClear
            defaultValue={filterData.Keysearch}
            placeholder="Tìm kiếm theo tên cơ quan, đơn vị"
            onSearch={(value) => onFilter(value, "Keysearch")}
            style={{ width: 300 }}
          />
        </div>
      </PageAction>
      <StyledBoxDMCoQuan>
        <Box className="box">
          <div key={treeKey} style={{ userSelect: "none" }} className="mg-top">
            {renderContent()}
          </div>
        </Box>
      </StyledBoxDMCoQuan>
      <ModalEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalEdit}
        onCreate={submitModalEdit}
        dataModalEdit={dataModalAddEdit}
        key={modalKey}
        DanhSachCoQuan={DanhSachCoQuan}
        action={action}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMCoQuan,
  };
}

export default connect(mapStateToProps, actions)(DMCoQuan);
