import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

export default function (props) {
  const {excelRef, printRef} = props;

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

  const {DanhSachVuViec, isPrint} = props;
  return (
    <div style={{display: 'none', width: '100%'}} ref={printRef}>
      <div className="title-table">
        <p
          style={{
            fontWeight: 500,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          cộng hòa xã hội chủ nghĩa việt nam
        </p>
        <p
          style={{
            fontWeight: 500,
            textTransform: 'capitalize',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          độc lập - tự do - hạnh phúc
        </p>
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          danh sách vụ việc phức tạp
        </p>
      </div>

      <div className="table-scroll" ref={excelRef}>
        <table id="table-to-xls" className="table-scroll__wrapper">
          <thead>
            <th style={{...styleTable.th, width: '3%'}}>STT</th>
            <th style={{...styleTable.th, width: '10%'}}>Số đơn</th>
            <th style={{...styleTable.th, width: '15%'}}>Thông tin chủ đơn</th>
            <th style={{...styleTable.th, width: '25%'}}>Nội dung đơn</th>
            <th style={{...styleTable.th, width: '10%'}}>Loại khiếu tố</th>
            <th style={{...styleTable.th, width: '7%'}}>Ngày tiếp nhận</th>
            <th style={{...styleTable.th, width: '10%'}}>Cơ quan tiếp nhận</th>
          </thead>
          <tbody>
            {DanhSachVuViec &&
              DanhSachVuViec?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td style={styleTable.td}>
                        <p style={{textAlign: 'center'}}>{index + 1}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.SoDonThu}</p>
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
                        <p>{item.TenLoaiKhieuTo}</p>
                      </td>
                      <td style={styleTable.td}>
                        <p>
                          {item.NgayTiepNhan
                            ? dayjs(item.NgayTiepNhan).format('DD/MM/YYYY')
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td}>
                        <p>{item.TenCoQuan}</p>
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
