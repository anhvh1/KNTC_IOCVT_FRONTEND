import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition} from '../../../settings/style-util';

const Collapse = ComponentName => styled(ComponentName)`
  .red-panel {
    color: ${palette('text', 5)};
    &::before {
      position: absolute;
      content: '';
      width: 35%;
      background-color: ${palette('text', 5)};;
      height: 2px;
      bottom: 0;
    }
  }
  .black-panel {
    color: ${palette('text', 6)};
  }
`;

export default Collapse;
