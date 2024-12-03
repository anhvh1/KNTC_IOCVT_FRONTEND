import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import {HuongGiaiQuyet} from '../../../../settings/constants';
import {
  getLocalKey,
  handleRenderTenNguonDonDen,
} from '../../../../helpers/utility';
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

  const user = getLocalKey('user', {});
  const isBanTiepDan = user?.BanTiepDan
    ? user.BanTiepDan && user?.CapID === 4
    : false;
  const {DanhSachTiepDan} = props;
  return (
    <div style={{display: 'none', width: '100%'}} ref={excelRef}>
      <div className="table-scroll">
        <table className="table-scroll__wrapper">
          <thead>
            <tr>
              <th rowSpan={2} style={{...styleTable.th, width: '3%'}}>
                STT
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '5%'}}>
                Số đơn thư
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '5%'}}>
                Nguồn đơn đến
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '10%'}}>
                Ngày tiếp
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '15%'}}>
                Họ tên - Địa chỉ
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '20%'}}>
                Nội dung vụ việc
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '5%'}}>
                Phân loại đơn/Số người
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '5%'}}>
                CMND/Hộ chiếu của công dân
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '10%'}}>
                Cơ quan đã giải quyết
              </th>
              <th colSpan={3} style={{...styleTable.th, width: '10%'}}>
                Hướng xử lý
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '10%'}}>
                Cán bộ tiếp
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '10%'}}>
                Theo dõi giải quyết kết quả giải quyết
              </th>
              <th rowSpan={2} style={{...styleTable.th, width: '10%'}}>
                Ghi chú
              </th>
            </tr>
            <tr>
              <th style={{...styleTable.th, width: '7%'}}>
                Thụ lý để giải quyết
              </th>
              <th style={{...styleTable.th, width: '7%'}}>
                Trả lại đơn và hướng dẫn
              </th>
              <th style={{...styleTable.th, width: '7%'}}>
                Chuyển đơn đến cơ quan, tổ chức đơn vị có thẩm quyền
              </th>
            </tr>
          </thead>
          <tbody>
            {DanhSachTiepDan &&
              DanhSachTiepDan?.map((item, index) => {
                if (item) {
                  return (
                    <tr>
                      <td style={styleTable.td} className="table-primary">
                        <p>{index + 1}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{item?.SoDonThu}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{handleRenderTenNguonDonDen(item)}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item.NgayTiep
                            ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item?.listDoiTuongKN
                            ? item.listDoiTuongKN.map((item) => (
                                <div>
                                  <p
                                    style={{
                                      fontWeight: '600',
                                      textTransform: 'capitalize',
                                    }}
                                  >
                                    {item.HoTen}
                                  </p>
                                  <p>
                                    {item.DiaChiCT
                                      ? `ĐC: ${item.DiaChiCT}`
                                      : ''}
                                  </p>
                                  {/* <p>{item.CMND ? `CMND/CCCD: ${item.CMND}` : ''}</p> */}
                                </div>
                              ))
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{item.NoiDungDon}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item.SoLuong ? (
                            <p>
                              {item?.NhomKN?.LoaiDoiTuongKNID === 1
                                ? 'Cá nhân'
                                : item?.NhomKN?.LoaiDoiTuongKNID === 2
                                ? 'Tổ chức'
                                : item?.NhomKN?.LoaiDoiTuongKNID === 3
                                ? 'Tập thể'
                                : ''}
                              : {item.SoLuong}
                            </p>
                          ) : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{item?.CMND}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{item?.CQDaGiaiQuyetID}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item.HuongGiaiQuyetID === HuongGiaiQuyet.DeXuatThuLy
                            ? 'x'
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item.HuongGiaiQuyetID === HuongGiaiQuyet.TraDon ||
                          item.HuongGiaiQuyetID === HuongGiaiQuyet.HuongDan
                            ? 'x'
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>
                          {item.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon
                            ? 'x'
                            : null}
                        </p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p>{item?.TenCanBo}</p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p></p>
                      </td>
                      <td style={styleTable.td} className="table-primary">
                        <p></p>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
