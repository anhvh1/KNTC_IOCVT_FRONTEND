import React from "react";
import { Menu } from "antd";

const MenuComponent = ({ activeMenu, onMenuClick, menuItems }) => {
  return (
    <div className="menu-custom">
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={({ key }) => onMenuClick(key)}
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={item.key}>
            {index + 1}. {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default MenuComponent;
