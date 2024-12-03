import {DatePicker, InputNumber} from 'antd';
import AntInputNumber from './styles/inputNumber.style';
import {message} from 'antd';
import WithDirection from '../../settings/withDirection';
import React, {Fragment} from 'react';
import {Input} from './exportComponent';
import {removeAscent2} from '../../helpers/utility';

class InputFormatSpecific extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      subtText: '',
      isMaxSubTitle: false,
      newSubText: '',
    };
  }
  focusInput = (e) => {
    e.target.removeEventListener('keypress', (e) => this.onKeyPress(e));
    e.target.addEventListener('keypress', (e) => this.onKeyPress(e));
  };

  onKeyPress = (e) => {
    const key = e.charCode;
    if (isNaN(e.key) && key !== 44 && key !== 46) {
      e.preventDefault();
    }
  };

  removeAllSpecificCharacter = (str) => {
    // const strNew = str.replace(/[^a-zA-Z0-9 ]/g, "")
    removeAscent2(str);
    return str;
  };

  render() {
    const {unitText} = this.props;
    const formatProps = {...this.props, value: removeAscent2(this.props.value)};
    return (
      <>
        <Input {...formatProps} style={unitText ? {width: '80%'} : {}} />
      </>
    );
  }
}

export {InputFormatSpecific};
