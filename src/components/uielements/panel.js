import {Collapse} from 'antd';
const {Panel} = Collapse;
import PanelStyle from './styles/panel.style';
import WithDirection from '../../settings/withDirection';

const AntButton = PanelStyle(Panel);
const IsoButton = WithDirection(AntButton);

export default (props) => {
  return <IsoButton className={props?.tyle} />;
};
