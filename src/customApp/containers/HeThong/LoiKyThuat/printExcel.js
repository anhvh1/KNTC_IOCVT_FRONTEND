import React from "react";
import moment from "moment";

export default function (props) {
  const {NhatKyHeThong, excelRef} = props;

  const styleTable = {
    th: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
      border: 'solid 0.5pt #ccc'
    },
    td: {
      padding: 5,
      border: 'solid 0.5pt #ccc'
    }
  };

  return (
    <div style={{display: 'none'}} ref={excelRef}>
      <table style={{fontFamily: 'Times New Roman'}}>
        <tr>
          <th style={{...styleTable.th, width: 50}}>STT</th>
          <th style={{...styleTable.th, width: 250}}>Tên người dùng</th>
          <th style={{...styleTable.th, width: 450}}>Lịch sử thao tác</th>
          <th style={{...styleTable.th, width: 180}}>Thời gian</th>
        </tr>
        {NhatKyHeThong ? NhatKyHeThong.map((item, index) => (
          <tr>
            <td style={{...styleTable.td, textAlign: 'center'}}>{index + 1}</td>
            <td style={styleTable.td}>{item.TenCanBo}</td>
            <td style={styleTable.td}>{item.LogInfo}</td>
            <td style={{...styleTable.td, textAlign: 'center'}}>
              {item.LogTime ? moment(item.LogTime).format('DD/MM/YYYY HH:mm:ss') : ""}
            </td>
          </tr>
        )) : null}
      </table>
    </div>
  )
}