import { DatePicker, InputNumber } from "antd";
import AntInputNumber from "./styles/inputNumber.style";
import { message } from "antd";
import WithDirection from "../../settings/withDirection";
import React, { Fragment } from "react";
import { Input } from "./exportComponent";

const WDInputnumber = AntInputNumber(InputNumber);
const Inputnumber = WithDirection(WDInputnumber);

class InputNumberFormat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      subtText: "",
      isMaxSubTitle: false,
      newSubText: "",
    };
  }
  focusInput = (e) => {
    e.target.removeEventListener("keypress", (e) => this.onKeyPress(e));
    e.target.addEventListener("keypress", (e) => this.onKeyPress(e));
  };

  onKeyPress = (e) => {
    const key = e.charCode;
    if (isNaN(e.key) && key !== 44 && key !== 46) {
      e.preventDefault();
    }
  };

  componentDidUpdate() {
    const { value } = this.props;

    const newValue = this.convertGiaTri(value);
    // const newSubText = this.readNumToWord(value);
    this.setState({ value: newValue });
  }

  convertGiaTri = (num) => {
    if (num) {
      const arrContainsComma = num
        .toString()
        .split("")
        .filter((item) => item === ",");
      if (arrContainsComma.length <= 1) {
        const stringNum = num.toString();
        const index = stringNum.lastIndexOf(",");
        const hundredsNum = stringNum.slice(
          index,
          index > 0 ? stringNum.length : 0
        );
        const converString = stringNum.replace(hundredsNum, " ");
        const convertNum = converString.split(".").join("");
        const resultString = converString
          ? `${convertNum
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            .trim()}`
          : "";
        return resultString;
      } else {
        message.destroy();
        message.warning("Đã là hàng đơn vị nhỏ nhất");
      }
    } else {
      return "";
    }
  };

  parseValue = (value) => {
    readNumToWord(value);
    return value;
  };

  onChange = (e, names, form) => {
    const values = this.convertGiaTri(e.target.value);
    const value = e.target.value;
    const newSubText = this.readNumToWord(value);

    // const { getFieldValue } = form;
    // let name = getFieldValue(names);
    e.target.value = values;
    this.setState({ subtText: newSubText, value: values });
  };
  readNumToWord = (num) => {
    const num2 = num.toString();
    if (num) {
      const hundressNumber = num2.toString().lastIndexOf(",");
      const hundredsNum = num2
        .toString()
        .slice(hundressNumber, hundressNumber > 0 ? num2.toString().length : 0);
      const numOrigin = num2.split(".").join("").replace(hundredsNum, "");
      const textNumOrigin = getTextMoney(numOrigin);
      const hundressNumberText = getTextMoney(hundredsNum.replace(",", " "))
        ? getTextMoney(hundredsNum.replace(",", " "))
        : "";
      return `${textNumOrigin}`;
    }
  };
  // <p style={{color : 'red'}}>Bằng chữ : {subtText}</p>

  render() {
    // const {value, newSubText} = this.state;
    const { unitText, onChange, ele } = this.props;
    const { e, names, form } = this.props;
    const { onKeyPress } = this.props;
    return (
      <>
        <Inputnumber
          // onChange
          formatter={(value) => this.convertGiaTri(value)}
          parser={(value) => value.replaceAll(".", "")}
          {...this.props}
          onFocus={this.focusInput}
          style={unitText ? { width: "100%" } : {}}
          min={0}
        />
      </>
    );
  }
}

export default Inputnumber;
export { InputNumberFormat };
