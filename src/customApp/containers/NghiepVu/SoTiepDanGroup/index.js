import SoTiepDanBanNganh from '../SoTiepDanBanNganh';
import SoTiepDan from '../SoTiepDan';
import {useState} from 'react';
import queryString from 'query-string';
import {getLocalKey} from '../../../../helpers/utility';
const SoTiepDanGroup = (props) => {
  document.title = 'Sổ tiếp dân';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );

  const user = getLocalKey('user', {});

  return (
    <>
      <SoTiepDan filterData={filterData} setFilterData={setFilterData} />
    </>
  );
};

export default SoTiepDanGroup;
