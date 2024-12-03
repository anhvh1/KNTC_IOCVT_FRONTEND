import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

export default function (props) {
  const {excelRef} = props;

  const styleTable = {
    th: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      border: 'solid 0.5pt #ccc',
    },
    td: {
      padding: 5,
      border: 'solid 0.5pt #ccc',
    },
  };

  const {DanhSachBieuMau} = props;
  return (
    <div style={{display: 'none', width: '100%'}} ref={excelRef}>
      <div className="table-scroll">
        <table className="table-scroll__wrapper">
          <thead>
            <th style={{...styleTable.th, width: '5%'}}>STT</th>
            <th style={{...styleTable.th, width: '15%'}}>Mã biểu mẫu</th>
            <th style={{...styleTable.th, width: '45%'}}>Tên biểu mẫu</th>
            <th style={{...styleTable.th, width: '15%'}}>Cấp sử dụng</th>
            <th style={{...styleTable.th, width: '5%'}}>Đang sử dụng</th>
          </thead>
          <tbody>
            {DanhSachBieuMau &&
              DanhSachBieuMau?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td style={styleTable.td}>
                        <p>{index + 1}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.MaPhieuIn}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenBieuMau}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenCap}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.DuocSuDung ? 'Có' : 'Không'}</p>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
