import React from "react";

import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getPath } from "../../../../../helpers/utility";

import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledBreadCrumb = styled.div`
  .link-home {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ant-breadcrumb-link {
    display: flex;
    align-items: center;
  }
  p {
    margin-block-end: 0;
    margin-block-start: 0;
    margin: 0;
    padding: 0;
    line-height: 1;
    text-transform: none;
    font-weight: 400;
  }
  li {
    display: flex;
    align-items: center;
  }
  a {
    padding: 0;
    height: auto;
    margin-inline: 0px;
    &:hover {
      background: none;
    }
  }
`;

const BreadCrumb = () => {
  const location = useLocation();
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const path = location ? getPath(location?.pathname) : "";
  const findMenuWithParents = (data, maMenuCanTim) => {
    const result = [];

    const recursiveSearch = (items) => {
      for (const item of items) {
        if (item.MaMenu === maMenuCanTim) {
          result.unshift(item); // Thêm item tìm thấy
          return true; // Dừng tìm kiếm
        }
        if (item.Children && item.Children.length) {
          if (recursiveSearch(item.Children)) {
            result.unshift(item); // Thêm cha vào kết quả
            return true; // Dừng tìm kiếm
          }
        }
      }
      return false; // Không tìm thấy
    };

    recursiveSearch(data);
    return result;
  };
  const menuList = findMenuWithParents(ListSideBar, path);
  const homeItem = ListSideBar.find((item) => item.MaMenu === "dashboard");

  const breadcrumbItems = menuList.map((menu, index) => {
    return menu.MaMenu !== "dashboard"
      ? {
          title: (
            <>
              <p>{menu.TenMenu}</p>
            </>
          ),
        }
      : {};
  });

  const newBreadcrumbItems = [
    {
      title: (
        <>
          <Link to={"/dashboard/dashboard"} className="link-home">
            <img
              src={
                "https://ttkt-quangtri-dev.gosol.com.vn/UploadFiles/Icon/Union.svg"
              }
              alt={homeItem?.TenMenu}
              style={{ width: 16 }}
            />

            <p>Trang chủ</p>
          </Link>
        </>
      ),
    },
    ...(breadcrumbItems?.filter((item) => item?.title)?.length > 0
      ? breadcrumbItems
      : []),
  ];

  return (
    <StyledBreadCrumb>
      <Breadcrumb separator=">" items={newBreadcrumbItems} />
    </StyledBreadCrumb>
  );
};

export default BreadCrumb;
