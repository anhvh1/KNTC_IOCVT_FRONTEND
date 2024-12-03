import {Form} from 'antd';
import FormStyle from './styles/itemForm.style';
import WithDirection from '../../settings/withDirection';
const {Item} = Form;
const AntItem = FormStyle(Item);
const ItemForm = WithDirection(AntItem);

export default (props) => {
  return <ItemForm {...props} className={props?.type} />;
};
