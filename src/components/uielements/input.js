import {Input} from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '../../settings/withDirection';

const {Search, TextArea, Group} = Input;

const SearchInputCustomize = (props) => {
  return <Search {...props} className={`${props.className} search-input`} />;
};

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(SearchInputCustomize);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export {InputSearch, InputGroup, Textarea};
