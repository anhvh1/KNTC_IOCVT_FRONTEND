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

  const {DanhSachDonThuCanDonDoc} = props;
  return (
    <div style={{display: 'none', width: '100%'}} ref={excelRef}>
      <div className="table-scroll">
        <table className="table-scroll__wrapper">
          <thead>
            <th style={{...styleTable.th, width: '5%'}}>Số đơn thư</th>
            <th style={{...styleTable.th, width: '15%'}}>Nguồn đơn đến</th>
            <th style={{...styleTable.th, width: '15%'}}>Thông tin chủ đơn</th>
            <th style={{...styleTable.th, width: '25%'}}>Nội dung đơn</th>
            <th style={{...styleTable.th, width: '5%'}}>Loại khiếu tố</th>
            <th style={{...styleTable.th, width: '5%'}}>Hướng xử lý</th>
            <th style={{...styleTable.th, width: '10%'}}>Cơ quan xử lý</th>
            <th style={{...styleTable.th, width: '10%'}}>Hạn xử lý </th>
            <th style={{...styleTable.th, width: '5%'}}>Trạng thái </th>
            <th style={{...styleTable.th, width: '10%'}}>
              Trạng thái đôn đốc{' '}
            </th>
          </thead>
          <tbody>
            {DanhSachDonThuCanDonDoc &&
              DanhSachDonThuCanDonDoc?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td style={styleTable.td}>
                        <p>{item.SoDonThu}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.NguonDonDen}</p>
                      </td>
                      <td style={styleTable.td}>
                        <div>
                          {item?.listDoiTuongKN
                            ? item.listDoiTuongKN.map((item) => (
                                <div>
                                  <p
                                    style={{
                                      fontWeight: '600',
                                      color:
                                        item.TrangThaiQuaHan === 1 ? 'red' : '',
                                      textTransform: 'capitalize',
                                    }}
                                  >
                                    {item.HoTen}
                                  </p>
                                  <p
                                    style={{
                                      color:
                                        item.TrangThaiQuaHan === 1 ? 'red' : '',
                                    }}
                                  >
                                    {item.DiaChiCT}
                                  </p>
                                </div>
                              ))
                            : null}
                        </div>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.NoiDungDon}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.PhanLoai}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenHuongXuLy}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenCoQuan}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.HanXuLy}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenTrangThai}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenTrangThaiDonDoc}</p>
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
