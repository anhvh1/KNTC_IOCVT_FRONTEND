import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import clone from "clone";
import { Link } from "react-router-dom";
import { Layout, Tooltip } from "antd";
import options, { optionsCanBo } from "./options";
import Scrollbars from "../../components/utility/customScrollBar.js";
import Menu from "../../components/uielements/menu";
import SidebarWrapper from "./sidebar.style";
import appActions from "../../redux/app/actions";
import actionSidebar from "../../customApp/redux/HeThong/Sidebar/actions";
import { RightOutlined } from "@ant-design/icons";
import Logo from "../../components/utility/logo";
import { store } from "../../redux/store";
import { getRoleByKey } from "../../helpers/utility";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { handleTextLong } from "../../helpers/utility";
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const { Item } = Menu;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
  checkKeKhai,
  changeListChild,
  changeMaMenuActive,
} = appActions;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};

const Sidebar = (props) => {
  const [width, setWidth] = useState(0);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [visibleBow, setVisibleBow] = useState({
    bowUp: false,
    bowDown: false,
  });
  const [MaRedirect, setMaRedirect] = useState();
  const history = useHistory();
  const { ListChild, MaMenuActive } = props;

  useEffect(() => {
    props.checkKeKhai();
    setWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setWidth(e.target.innerWidth);
    });
  }, []);

  const handleClick = (e) => {
    props.changeCurrent([e.key]);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // props.checkKeKhai();
    dispatch(actionSidebar.getList());
  }, []);

  const { app } = props;

  // useEffect(() => {
  //   const open = document.querySelectorAll('.ant-menu-submenu-open')[0];
  //   const itemPonter = document.getElementById('popupSubMenuInline__pointer');
  //   const key = open?.getAttribute('data_key');

  //   let isConstantChild;
  //   const listOptions = getListOption(ListSideBar);
  //   if (key) {
  //     let obj = {};
  //     handleFindParent(listOptions, key.toString(), obj);
  //     isConstantChild =
  //       obj?.parent?.Children && obj?.parent?.Children?.length > 0
  //         ? true
  //         : false;
  //   }
  //   let top;
  //   if (open) {
  //     top =
  //       window.pageYOffset +
  //       open.getBoundingClientRect().top +
  //       open.clientHeight / 4;
  //   }
  //   if (open) {
  //     const dataKeyCurrentActive = open
  //       .querySelectorAll('.isoMenuHolder')[0]
  //       .getAttribute('data_key');
  //     const menuOpen = document.querySelectorAll('.popupSubMenuInline');
  //     let elementTarget;
  //     for (let i = 0; i < menuOpen.length; i++) {
  //       const element = menuOpen[i];
  //       const listChild = [...menuOpen[i].children[0].children];
  //       Array.from(listChild);
  //       // listChild.forEach((item) =>
  //       // );
  //       const checkedCurrent = listChild.every(
  //         (item) => item.getAttribute('data_key') === dataKeyCurrentActive,
  //       );
  //       if (checkedCurrent && listChild.length > 0) {
  //         elementTarget = menuOpen[i];
  //       }
  //     }

  //     const icon = open.querySelectorAll('.isoMenuHolder ion-icon')[0];
  //     const topIcon = icon.getBoundingClientRect().top;
  //     const heightIcon = icon.clientHeight / 4;

  //     if (open && isConstantChild && elementTarget) {
  //       // itemPonter.style.display = `inline-block`;
  //       const topEle = elementTarget.offsetTop ? elementTarget.offsetTop : 60;
  //       //   topIcon + heightIcon - topEle,
  //       //   'topIcon + heightIcon - topEle',
  //       // );
  //       elementTarget.style.setProperty(
  //         '--menu-top',
  //         `${topIcon + heightIcon - topEle}px`,
  //       );
  //       // itemPonter.style.top = `${top}px`;
  //     } else {
  //       // itemPonter.style.top = `0px`;
  //       // itemPonter.style.display = `none`;
  //     }
  //   }
  // }, [app.openKeys]);

  // useEffect(() => {
  //   const listOptions = getListOption(ListSideBar);
  //   const pathName = window.location.pathname.slice(
  //     window.location.pathname.lastIndexOf('/') + 1,
  //   );
  //   const checkOptions = listOptions.find((item) =>
  //     item.Children.find((item) => item.MaMenu === pathName.toString()),
  //   );
  //   if (pathName === 'dashboard' || pathName === '') {
  //     dispatch(changeListChild([]));
  //     dispatch(changeMaMenuActive(''));
  //   } else if (checkOptions && MaMenuActive !== checkOptions.MaMenu) {
  //     dispatch(changeMaMenuActive(checkOptions.MaMenu));
  //     dispatch(changeListChild(checkOptions.Children));
  //   }
  // }, [ListSideBar]);

  useEffect(() => {}, [ListChild]);
  const pathName = window.location.pathname.slice(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const handleFindParent = (list, child, obj) => {
    list.forEach((item) => {
      if (item && item.Children) {
        if (item && item.MaMenu === child) {
          obj["parent"] = item;
        } else {
          const CheckedChild = item.Children.find(
            (itemChild) => itemChild.MaMenu === child
          );
          if (CheckedChild && obj) {
            obj["parent"] = item;
          }
        }
      }
    });
  };

  const onOpenChange = (newOpenKeys) => {
    // const newNode = document.createElement("div");
    // newNode.classList.add('sub-menu__items')
    // if(wrapperMenubar){
    //   wrapperMenubar.appendChild(newNode)

    // }
    // const rect = window.pageYOffset + itemOpen[0].getBoundingClientRect().top
    const { app, changeOpenKeys } = props;

    const latestOpenKey = newOpenKeys.find(
      (key) => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    const checkLocalStorge = localStorage.getItem("openKeySideBar");
    if (checkLocalStorge) {
      localStorage.removeItem("openKeySideBar");
    }
    localStorage.setItem("openKeySideBar", JSON.stringify(nextOpenKeys));

    changeOpenKeys(nextOpenKeys);
  };

  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const handleRedirect = (MaMenu) => {
    if (MaRedirect !== MaMenu) {
      setMaRedirect(MaMenu);
    }
    // const a = document.createElement('a');
    // a.href = `${url}/${MaMenu}`;
    // a.click();
    // window.location.replace('/dashboard/');
    // history.push(url);
    // <Redirect push to="/dashboard/bao-cao-2a" />;
  };

  const getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const { TenMenu, Icon, Children, HienThi, MaMenu, isHover } = singleOption;
    const checkBaoCao = isHover;
    const url = stripTrailingSlash(props.url);

    if (Children && Children.length > 0) {
      return (
        HienThi && (
          <SubMenu
            key={MaMenu}
            className={`parent-menu__item ${MaMenu}`}
            data_key={MaMenu}
            title={
              <span className="isoMenuHolder" data_key={MaMenu}>
                <div className="wrapper-content__item">
                  <img src={Icon} />
                  <span className="nav-text">{TenMenu}</span>
                </div>
              </span>
            }
            // style={{display: 'flex'}}
            popupClassName={
              Children.length > 2
                ? "menu-topbar popupSubMenuInline"
                : Children.length === 2
                ? "menu-topbar_SubMenuInline popupSubMenuInline"
                : "popupSubMenuInline"
            }
          >
            {Children.map((child, indexChild) => {
              const linkTo = `${url}/${child.MaMenu}`;
              if (child.HienThi) {
                return !checkBaoCao ? (
                  <Item
                    key={child.MaMenu}
                    data_key={MaMenu}
                    className={child.MaMenu}
                  >
                    <Link
                      key={child.MaMenu}
                      to={`${url}/${child.MaMenu}`}
                      class="parent nav-text"
                    >
                      {child.TenMenu}
                    </Link>
                  </Item>
                ) : (
                  <Item
                    key={child.MaMenu}
                    data_key={MaMenu}
                    className={child.MaMenu}
                  >
                    <Tooltip title={child.TenMenu} placement="right">
                      <Link
                        key={child.MaMenu}
                        to={`${url}/${child.MaMenu}`}
                        class="parent nav-text"
                      >
                        {child.TenMenu}
                      </Link>
                    </Tooltip>
                  </Item>
                );
              }
            })}
          </SubMenu>
        )
      );
    }
    return (
      <Item key={MaMenu}>
        <Link key={MaMenu} to={`${url}/${MaMenu}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <ion-icon name={Icon} />
            <span className="nav-text">{TenMenu}</span>
          </span>
        </Link>
      </Item>
    );
  };

  const getListOption = (optionsUsing) => {
    const { CheckKeKhai } = props;
    let role = store.getState().Auth.role;
    if (!role) {
      let roleStore = localStorage.getItem("role");
      role = JSON.parse(roleStore);
    }
    let user = store.getState().Auth.user;
    if (!user) {
      let userStore = localStorage?.getItem("user");
      user = JSON.parse(userStore);
    }
    const isAdmin = user?.NguoiDungID === 1;
    let listOptions = [];
    optionsUsing?.forEach((menu) => {
      if (menu.Children && menu.Children.length) {
        let Children = [];
        menu.Children.forEach((menuChild) => {
          //if menuChild has permission
          // if ((role && role[menuChild.key] && role[menuChild.key].view) && menuChild.showMenu || menuChild.noRole) {
          if (isAdmin) {
            if (menuChild.showAdmin) {
              Children.push(menuChild);
            }
          } else {
            Children.push(menuChild);
          }
          // }
        });
        if (Children.length) listOptions.push({ ...menu, Children });
      } else {
        // if ((role && role[menu.key] && role[menu.key].view) && menu.showMenu || menu.noRole) {
        if (isAdmin) {
          if (menu.showAdmin) {
            listOptions.push(menu);
          }
        } else {
          listOptions.push(menu);
        }
      }
    });
    return listOptions;
  };

  const { toggleOpenDrawer, customizedTheme, height } = props;
  const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
  const { openDrawer } = app;
  const mode = collapsed === true ? "vertical" : "inline";
  const onMouseEnter = () => {
    if (openDrawer === false) {
      toggleOpenDrawer();
    }
  };
  const onMouseLeave = () => {
    if (openDrawer === true) {
      toggleOpenDrawer();
    }
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  //get list option ------- #################
  let role = store.getState().Auth.role;
  if (!role) {
    let roleStore = localStorage.getItem("role");
    role = JSON.parse(roleStore);
  }
  // const roleQuanLy = getRoleByKey(role, 'quan-ly');
  // const optionsUsing = roleQuanLy && roleQuanLy.view ? [...options] : [...optionsCanBo];
  const listOptions = getListOption(ListSideBar);
  // let parent = {}
  // if(mode==='inline' && app?.current?.length > 0){
  //   handleFindParent(listOptions,app?.current[0],parent)
  // }
  // const ListChildMenuActive = parent && parent?.parent?.Children
  // const url = stripTrailingSlash(props.url);

  // khi hover vào menu top của icon trỏ vào menu đang được select sẽ phụ thuộc vào top của element được select
  // const listChildSidebar = parent && parent.Children

  // useEffect(() => {
  //   handleRenderListChildActive();
  // }, [MaMenu]);

  const handleLinkItem = (item) => {
    if (item) {
      const a = document.createElement("a");
      a.href = item.MaMenu;
    }
  };

  useEffect(() => {}, []);

  const handleRenderListChildActive = (ListChildParams) => {
    const itemActive = document.querySelector(".sidebar-item__active");
    const itemID = itemActive?.getAttribute("id");
    const listOptions = getListOption(ListSideBar);
    const item = listOptions.find(
      (item) => Number(item.MenuID) === Number(itemID)
    );
    const ListChildMenuActive = ListChildParams
      ? ListChildParams
      : item?.Children;
    const newUrl = window.location.pathname;
    return (
      <ul
        id="menu-child__active"
        style={{
          visibility:
            ListChildMenuActive && ListChildMenuActive.length > 0
              ? ""
              : "hidden",
        }}
      >
        <li
          style={{ display: visibleBow.bowUp ? "" : "none" }}
          className="bow-up__menu"
          onClick={handleScrollUpMenu}
        >
          <ion-icon name="caret-up-outline"></ion-icon>
        </li>
        {ListChildMenuActive
          ? ListChildMenuActive.map((item) => {
              if (item?.HienThi) {
                return (
                  <li data_name={item.MaMenu} id={item.MenuID}>
                    <div
                      data_menu={item.MaMenu}
                      id={item.MenuID}
                      className={`item-child ${
                        `${url}/${item.MaMenu}` === newUrl
                          ? "item-child__active"
                          : ""
                      }`}
                      data_key={item.MaMenu}
                      // onClick={() => setItemActive(item)}
                    >
                      <Link key={item.MaMenu} to={`${url}/${item.MaMenu}`}>
                        <p className="title-child">{item.TenMenu}</p>
                      </Link>
                    </div>
                  </li>
                );
              }
            })
          : null}
        {visibleBow.bowDown ? (
          <div className="bow-down__menu" onClick={handleScrolDownMenu}>
            <ion-icon name="caret-down-outline"></ion-icon>
          </div>
        ) : null}
      </ul>
    );
  };

  const handleScrollUpMenu = () => {
    const MenuActive = document.getElementById("wrapper-child__active");
    MenuActive.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrolDownMenu = () => {
    const MenuActive = document.getElementById("wrapper-child__active");
    MenuActive.scrollTo({
      top: MenuActive.clientHeight,
      behavior: "smooth",
    });
  };

  const url = stripTrailingSlash(props.url);
  useEffect(() => {
    if (MaRedirect || MaRedirect === "") {
      history.push(`${url}/${MaRedirect}`);
    }
  }, [MaRedirect]);

  return (
    <>
      <SidebarWrapper
        style={{
          userSelect: "none",
          gridTemplateColumns:
            ListChild && ListChild.length > 0 ? "80px 210px" : "75px",
        }}
      >
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width={220}
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            style={{
              height,
              maxHeight: height,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0 10px",
            }}
          >
            <Menu
              forceSubMenuRender
              onClick={handleClick}
              theme="light"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={onOpenChange}
            >
              {listOptions.map((singleOption) =>
                getMenuItem({ submenuStyle, submenuColor, singleOption })
              )}
            </Menu>
          </div>
        </Sider>
        {/* <div className="sidebar-wrapper">
          {listOptions && listOptions.length
            ? listOptions.map((item) => {
                if (item.Children.length) {
                  return (
                    <div
                      className={`sidebar-item ${
                        MaMenuActive === item.MaMenu
                          ? 'sidebar-item__active'
                          : ''
                      }`}
                      onClick={(e) =>
                        handleClickedSidebar(item.MaMenu, item?.Children)
                      }
                      data_name={item.TenMenu}
                      id={item.MenuID}
                    >
                      <div className="sidebar-icon__wrapper">
                        <img src={item?.Icon} />
                      </div>
                      <p className="sidebar-title">{item.TenMenu}</p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`sidebar-item ${
                        MaMenuActive === item.MaMenu
                          ? 'sidebar-item__active'
                          : ''
                      }`}
                      onClick={(e) => handleClickedSidebarNotChild(item.MaMenu)}
                      data_name={item.TenMenu}
                      id={item.MenuID}
                    >
                      <div className="sidebar-icon__wrapper">
                        <img src={item?.Icon} />
                      </div>
                      <p className="sidebar-title">{item.TenMenu}</p>
                    </div>
                  );
                }
              })
            : null}
        </div>
        <div
          className={
            ListChild && ListChild.length ? 'wrapper-child__active' : ''
          }
          id="wrapper-child__active"
        >
          {handleRenderListChildActive(ListChild)}
        </div> */}
      </SidebarWrapper>
    </>
  );
};

export default connect(
  (state) => ({
    ...state.App,
    app: state.App,
    customizedTheme: state.ThemeSwitcher.sidebarTheme,
    height: state.App.height,
    ListChild: state.App.ListChild,
    MaMenuActive: state.App.MaMenuActive,
  }),
  {
    toggleOpenDrawer,
    changeOpenKeys,
    changeListChild,
    changeCurrent,
    toggleCollapsed,
    checkKeKhai,
    changeMaMenuActive,
  }
)(Sidebar);
