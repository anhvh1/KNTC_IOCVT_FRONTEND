import { Collapse } from 'antd';
import CollapseStyle from './styles/collapse.style';
import WithDirection from '../../settings/withDirection';

const AntCollapse = CollapseStyle(Collapse);
const isCollpse = WithDirection(AntCollapse);

export default AntCollapse
