import { Tooltip } from "antd";

const CustomizeTooltip = (props) => (
  <Tooltip
    overlayInnerStyle={{
      backgroundColor: "rgba(222, 240, 255, 1)",
      color: "#000000",
      border: "1px solid rgba(76, 153, 227, 1)",
      borderRadius: "3px",
      minHeight: "16px",
      padding: "0 5px",
      maxWidth: props.maxWidth ? props.maxWidth : "auto",
    }}
    arrow={false}
    title={props.title}
  >
    {props.children}
  </Tooltip>
);

export default CustomizeTooltip;
