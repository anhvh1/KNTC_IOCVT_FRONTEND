// import {DatePicker} from '../../../../../components/uielements/exportComponent';
// import {disabledDate} from '../../../../../helpers/utility';
// import dayjs from 'dayjs';
// const FilterTime = (props) => {
//   const {onFilter, filterData} = props;

//   return (
//     <div style={{display: 'flex', gap: 10}}>
//       <DatePicker
//         placeholder="Từ ngày"
//         format={'DD/MM/YYYY'}
//         value={
//           filterData.TuNgay ? dayjs(filterData.TuNgay, 'MM/DD/YYYY') : null
//         }
//         onChange={(value, valueStr) =>
//           onFilter(value ? dayjs(value).format('MM/DD/YYYY') : null, 'TuNgay')
//         }
//         disabledDate={(currentDate) =>
//           disabledDate(currentDate, filterData.DenNgay)
//         }
//       ></DatePicker>
//       <DatePicker
//         value={
//           filterData.DenNgay ? dayjs(filterData.DenNgay, 'MM/DD/YYYY') : null
//         }
//         onChange={(value, valueStr) =>
//           onFilter(value ? dayjs(value).format('MM/DD/YYYY') : null, 'DenNgay')
//         }
//         placeholder="Đến ngày"
//         format={'DD/MM/YYYY'}
//         disabledDate={(currentDate) =>
//           disabledDate(filterData.TuNgay, currentDate, 2)
//         }
//       ></DatePicker>
//     </div>
//   );
// };

// export default FilterTime;

import {DatePicker} from '../../../../../components/uielements/exportComponent';
import {disabledDate, formatDate} from '../../../../../helpers/utility';
import dayjs from 'dayjs';
const FilterTime = (props) => {
  const {onFilter, filterData} = props;

  return (
    <div style={{display: 'flex', gap: 10}}>
      <DatePicker
        placeholder="Từ ngày"
        format={'DD/MM/YYYY'}
        value={
          filterData.TuNgay ? dayjs(filterData.TuNgay, 'YYYY/MM/DD') : null
        }
        onChange={(value, valueStr) =>
          onFilter(value ? formatDate(value) : null, 'TuNgay')
        }
        disabledDate={(currentDate) =>
          disabledDate(currentDate, filterData.DenNgay)
        }
      ></DatePicker>
      <DatePicker
        value={
          filterData.DenNgay ? dayjs(filterData.DenNgay, 'YYYY/MM/DD') : null
        }
        onChange={(value, valueStr) =>
          onFilter(value ? formatDate(value) : null, 'DenNgay')
        }
        placeholder="Đến ngày"
        format={'DD/MM/YYYY'}
        disabledDate={(currentDate) =>
          disabledDate(filterData.TuNgay, currentDate, 2)
        }
      ></DatePicker>
    </div>
  );
};

export default FilterTime;
