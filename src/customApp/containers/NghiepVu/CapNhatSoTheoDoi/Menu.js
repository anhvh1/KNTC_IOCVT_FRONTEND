import React from "react";
import { Menu } from "antd";

const MenuComponent = ({ activeMenu, onMenuClick, menuItems }) => {
  return (
    <Menu
      mode="inline"
      selectedKeys={[activeMenu]}
      onClick={({ key }) => onMenuClick(key)}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuComponent;
