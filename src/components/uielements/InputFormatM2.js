import {DatePicker, InputNumber} from 'antd';
import AntInputNumber from './styles/inputNumber.style';
import {message} from 'antd';
import WithDirection from '../../settings/withDirection';
import React, {Fragment} from 'react';
import {Input} from './exportComponent';

const WDInputnumber = AntInputNumber(InputNumber);
const InputnumberM2 = WithDirection(WDInputnumber);

class InputNumberFormatM2 extends React.PureComponent {
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

  componentDidMount() {
    const {value} = this.props;
    if (value) {
      const newValue = this.convertGiaTri(value);
      const newSubText = this.readNumToWord(value);
      this.setState({value: newValue, subtText: newSubText});
    }
  }

  convertGiaTri = (num) => {
    // if()
    const testRegax = new RegExp(/[a-zA-Z]/);
    const checkText = testRegax.test(num);
    if (!checkText) {
      if (num && num !== '') {
        const arrContainsComma = num
          .toString()
          .split('')
          .filter((item) => item === ',');
        if (arrContainsComma.length <= 1) {
          const stringNum = num.toString();
          const index = stringNum.lastIndexOf(',');
          const hundredsNum = stringNum
            .slice(index, index > 0 ? stringNum.length : 0)
            .replaceAll('.', '');
          const converString = stringNum.replace(hundredsNum, ' ');
          const convertNum = converString.replaceAll('.', '');
          const resultString = converString
            ? `${convertNum
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                .trim()}`
            : '';
          const content = resultString.split('.').join('').split(',').join('');
          return hundredsNum ? resultString + hundredsNum : resultString;
        } else {
          message.destroy();
          message.warning('Đã là hàng đơn vị nhỏ nhất');
          const stringNum = num.toString().slice(0, num.lastIndexOf(','));
          const index = stringNum.lastIndexOf(',');
          const hundredsNum = stringNum
            .slice(index, index > 0 ? stringNum.length : 0)
            .replaceAll('.', '');
          const converString = stringNum.replace(hundredsNum, ' ');
          const convertNum = converString.replaceAll('.', '');
          const resultString = converString
            ? `${convertNum
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                .trim()}`
            : '';
          const content = resultString.split('.').join('').split(',').join('');
          return hundredsNum ? resultString + hundredsNum : resultString;
        }
      }
    } else {
      message.destroy();
      message.warning('Giá trị không được chấp nhận');
      return '';
    }
  };

  readNumToWord = (num) => {
    const num2 = num.toString();
    if (num !== '') {
      const hundressNumber = num2.toString().lastIndexOf(',');
      const hundredsNum = num2
        .toString()
        .slice(hundressNumber, hundressNumber > 0 ? num2.toString().length : 0);
      const numOrigin = num2.split('.').join('').replace(hundredsNum, '');
      const textNumOrigin = getTextM2(numOrigin);
      const hundressNumberText =
        hundredsNum && getTextM2(hundredsNum.replace(',', ' '))
          ? getTextM2(hundredsNum.replace(',', ' '))
          : '';
      if (hundressNumberText && hundressNumberText !== '') {
        const newtextNumOrigin = textNumOrigin.replace('mét', ' ');
        return `${newtextNumOrigin} phẩy ${hundressNumberText.toLowerCase()} `;
      } else {
        return `${textNumOrigin} `;
      }
    }
  };

  render() {
    const {newSubText} = this.state;
    const {unitText, onChange, ele, value} = this.props;
    const {e, names, form} = this.props;
    const {onKeyPress} = this.props;
    const formatProps = {
      ...this.props,
      value: this.convertGiaTri(this.props.value),
    };
    const valueFormat =
      formatProps && formatProps.value ? formatProps.value : '';
    return (
      <>
        <Input
          // value = {this.props.value}
          {...formatProps}
          onFocus={this.focusInput}
          style={unitText ? {width: '80%'} : {}}
        />
        <div className={'text-money'}>
          <p>Bằng chữ: {this.readNumToWord(value)}</p>
        </div>
      </>
    );
  }
}

export default InputnumberM2;
export {InputNumberFormatM2};
