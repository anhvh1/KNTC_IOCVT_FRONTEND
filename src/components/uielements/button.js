import { Button } from "antd";
import { Buttons, ButtonsGroup } from "./styles/button.style";
import WithDirection from "../../settings/withDirection";

const AntButton = Buttons(Button);
const IsoButton = WithDirection(AntButton);
const AntButtonGroup = ButtonsGroup(Button.Group);
const ButtonGroup = WithDirection(AntButtonGroup);

export default (props) => {
  let top;
  let bottom;
  let left;
  let right;
  let center;
  const { position } = props;
  switch (position) {
    case "top-left":
      top = 0;
      left = 0;
      break;
    case "top-right":
      top = 0;
      right = 0;
      break;
    case "top-center":
      top = 0;
      left = 0;
      right = 0;
      center = true;
      break;
    case "bottom-left":
      bottom = 0;
      left = 0;
      break;
    case "bottom-right":
      bottom = 0;
      right = 0;
      break;
    case "bottom-center":
      bottom = 0;
      right = 0;
      left = 0;
      center = true;
      break;
  }

  return (
    <IsoButton
      {...props}
      center={center}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
    />
  );
};
export { ButtonGroup };
