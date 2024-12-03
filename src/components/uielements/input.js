import { Input } from "antd";
import { useState, useEffect, useRef } from "react";
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from "./styles/input.style";
import WithDirection from "../../settings/withDirection";
import { removeAscent2 } from "../../helpers/utility";
const { Search, TextArea, Group } = Input;

const SearchInputCustomize = (props) => {
  return <Search {...props} className={`${props.className} search-input`} />;
};

const InputCustomize = (props) => {
  const { onChange, value } = props;
  const [valueInput, setValueInput] = useState(value);
  const inputRef = useRef(null); // Thêm ref để quản lý input

  useEffect(() => {
    if (props.isClearSpace && value && props.isRemoveAcent) {
      let newValue = removeAscent2(value);
      newValue = newValue.replace(/\s+/g, "");
      setValueInput(newValue);
    } else {
      setValueInput(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const cursorPosition = e.target.selectionStart; // Lưu vị trí con trỏ
    onChange(e);
    setValueInput(e.target.value);
    // Đặt lại vị trí con trỏ
    setTimeout(() => {
      if (inputRef.current) {
        if (props.type !== "email") {
          inputRef?.current?.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    }, 0);
  };

  return (
    <Input
      {...props}
      ref={inputRef} // Gán ref cho input
      className={`${props.className} input-customize`}
      onChange={handleChange} // Sử dụng hàm handleChange
      value={valueInput}
    />
  );
};

const WDStyledInput = InputWrapper(InputCustomize);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(SearchInputCustomize);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export { InputSearch, InputGroup, Textarea };
