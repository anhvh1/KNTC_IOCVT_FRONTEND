import React from "react";
import Select, { Option } from "../../../../components/uielements/select";
import { Input } from "antd";

import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
const TreeData = (props) => {
  return (
    <>
      <Box style={{ minHeight: "calc(100vh - 265px)", with: "100%" }}>
        <BoxFilter>
          <Select
            style={{ width: "200px" }}
            defaultValue={props.dataValues}
            placeholder={"Chọn cấp"}
            allowClear
            onChange={(value) => onFilter(value, "Status")}
          >
            {props.DanhSachCacCap.map((item, index) => (
              <Option key={index} value={item.Cap}>
                {item.TenCap}
              </Option>
            ))}
          </Select>
          <Input.Search
            allowClear={true}
            defaultValue={props.keyWord}
            placeholder="Tìm kiếm theo tên cơ quan, đơn vị"
            onSearch={(value) => this.onFilter(value, "Keyword")}
            style={{ width: 300 }}
          />
        </BoxFilter>
        <div key={props.key} style={{ userSelect: "none" }} className="mg-top">
          {props.renderContent()}
        </div>
      </Box>
    </>
  );
};

export default TreeData;
