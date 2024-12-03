import {DatePicker, Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import dayjs from 'dayjs';
import CapNhatQDGiaiQuyet from '../CapNhatQDGiaiQuyet';
import queryString from 'query-string';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import TheoDoiGiaiQuyetKNTC from '../TheoDoiGiaiQuyetKNTC';
import GiaoXacMinh from '../GiaoXacMinh';
import {getRoleByKey} from '../../../../helpers/utility';
import {useSelector} from 'react-redux';
import {getLocalKey} from '../../../../helpers/utility';
const GiaiQuyetDonGroup = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const role = useSelector((state) =>
    getRoleByKey(state.Auth.role, 'giai-quyet-don-thu'),
  );
  const user = getLocalKey('user', {});
  const CapID = user?.CapID;
  const ChuTichUBND = user?.ChuTichUBND;
  const RoleID = user?.RoleID;
  const CTT = ChuTichUBND && RoleID === 1;

  return (
    <LayoutWrapper>
      {CTT ? (
        <TheoDoiGiaiQuyetKNTC
          role={role}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      ) : (
        <GiaoXacMinh
          role={role}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    // ...state.GiaiQuyetDonGroup,
    // role: getRoleByKey(state.Auth.role, 'phe-duyet-ket-qua-xu-ly'),
  };
}

export default connect(mapStateToProps)(GiaiQuyetDonGroup);
