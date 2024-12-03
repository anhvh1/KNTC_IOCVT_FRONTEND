import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import {HuongGiaiQuyet} from '../../../../settings/constants';
import {
  getLocalKey,
  handleRenderTenNguonDonDen,
} from '../../../../helpers/utility';
export default function (props) {
  const {excelRef, onRenderLoaiTiepDan} = props;

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
  const {DanhSachTiepDan, type} = props;
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
                Loại tiếp dân
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
                        <div>
                          {item?.listDoiTuongKN
                            ? item.listDoiTuongKN?.map((item) => (
                                <div>
                                  <p>
                                    {item?.CMND && item?.CMND !== '' ? (
                                      <>
                                        <p
                                          style={{
                                            fontWeight: '600',
                                            textTransform: 'capitalize',
                                          }}
                                        >
                                          {item.HoTen}:
                                          <span
                                            style={{
                                              fontWeight: '400',
                                              marginLeft: '2px',
                                            }}
                                          >
                                            {item.CMND}
                                          </span>
                                        </p>
                                      </>
                                    ) : (
                                      ''
                                    )}
                                  </p>
                                </div>
                              ))
                            : null}
                        </div>
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
                        <p>{onRenderLoaiTiepDan(item?.LoaiTiepDanID)}</p>
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

  // isBanTiepDan && type === 1 ? (
  // ) : (
  //   <div style={{display: 'none', width: '100%'}} ref={excelRef}>
  //     <div className="table-scroll">
  //       <table className="table-scroll__wrapper">
  //         <thead>
  //           {/* <th style={{width: '3%', ...styleTable.th}}></th> */}
  //           <th style={{width: '5%', ...styleTable.th}}>STT</th>
  //           <th style={{width: '15%', ...styleTable.th}}>
  //             Tên chủ đơn/ Địa chỉ
  //           </th>
  //           <th style={{width: '5%', ...styleTable.th}}>Số lượng người</th>
  //           <th style={{width: '25%', ...styleTable.th}}>Nội dung vụ việc</th>
  //           {/* <th style={{width: '5%'}}>Trùng đơn</th> */}
  //           <th style={{width: '15%', ...styleTable.th}}>Kết quả tiếp</th>
  //           <th style={{width: '15%', ...styleTable.th}}>
  //             Kết quả giải quyết của các ngành
  //           </th>
  //           <th style={{width: '15%', ...styleTable.th}}>Thông tin tài liệu</th>
  //         </thead>
  //         <tbody>
  //           {DanhSachTiepDan &&
  //             DanhSachTiepDan?.map((item, index) => {
  //               if (item) {
  //                 if (item.Children) {
  //                   return (
  //                     <>
  //                       <tr>
  //                         <td
  //                           style={styleTable.td}
  //                           colSpan={1}
  //                           className="table-primary"
  //                         >
  //                           <p>
  //                             {item.NgayTiep
  //                               ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
  //                               : null}
  //                           </p>
  //                         </td>
  //                         <td
  //                           style={styleTable.td}
  //                           className="table-primary"
  //                           colSpan={2}
  //                         >
  //                           <div>
  //                             <p>Chủ trì: </p>
  //                             <p>{item?.TenLanhDaoTiep}</p>
  //                             <p>{item?.ChucVu ? `(${item?.ChucVu})` : null}</p>
  //                           </div>
  //                         </td>
  //                         <td
  //                           style={styleTable.td}
  //                           className="table-primary"
  //                           colSpan={4}
  //                         >
  //                           <div>
  //                             <p>
  //                               {item?.ThanhPhanThamGia?.length
  //                                 ? 'Thành phần:'
  //                                 : null}{' '}
  //                             </p>
  //                             {item?.ThanhPhanThamGia
  //                               ? item?.ThanhPhanThamGia.map((item, index) => (
  //                                   <p>
  //                                     {index + 1}. {item.TenCanBo}{' '}
  //                                     <span style={{fontStyle: 'italic'}}>
  //                                       ({item.ChucVu})
  //                                     </span>
  //                                   </p>
  //                                 ))
  //                               : null}
  //                           </div>
  //                         </td>
  //                       </tr>
  //                       {item.Children?.map((itemChild, indexChild) => {
  //                         return (
  //                           <tr>
  //                             <td colSpan={1} style={styleTable.td}>
  //                               {indexChild + 1}
  //                             </td>
  //                             <td style={styleTable.td}>
  //                               <div>
  //                                 {itemChild.NhomKN?.DanhSachDoiTuongKN
  //                                   ? itemChild.NhomKN.DanhSachDoiTuongKN.map(
  //                                       (item) => {
  //                                         return (
  //                                           <>
  //                                             <p
  //                                               style={{
  //                                                 fontWeight: '600',
  //                                               }}
  //                                             >
  //                                               {item.HoTen}
  //                                             </p>
  //                                             <p>{item.DiaChiCT}</p>
  //                                             <p>{item.CMND}</p>
  //                                           </>
  //                                         );
  //                                       },
  //                                     )
  //                                   : null}
  //                               </div>
  //                             </td>
  //                             <td
  //                               style={styleTable.td}
  //                               // style={{textAlign: 'right'}}
  //                             >
  //                               {itemChild.NhomKN?.SoLuong}
  //                             </td>
  //                             <td style={styleTable.td}>
  //                               {itemChild?.NoiDungTiep}
  //                             </td>
  //                             <td style={styleTable.td}>
  //                               {itemChild?.KetQuaTiep}
  //                             </td>
  //                             <td style={styleTable.td}>
  //                               {itemChild?.KetQuaGQCacNganh}
  //                             </td>
  //                             <td style={styleTable.td}>
  //                               {itemChild?.DanhSachHoSoTaiLieu
  //                                 ? itemChild?.DanhSachHoSoTaiLieu.map(
  //                                     (item, index) => (
  //                                       <p>
  //                                         {index + 1}. {item.TenFile}
  //                                       </p>
  //                                     ),
  //                                   )
  //                                 : null}
  //                             </td>
  //                           </tr>
  //                         );
  //                       })}
  //                     </>
  //                   );
  //                 }
  //                 return (
  //                   <tr>
  //                     <td
  //                       style={styleTable.td}
  //                       colSpan={2}
  //                       className="table-primary"
  //                     >
  //                       <p>
  //                         {item.NgayTiep
  //                           ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
  //                           : null}
  //                       </p>
  //                     </td>
  //                     <td
  //                       style={styleTable.td}
  //                       className="table-primary"
  //                       colSpan={2}
  //                     >
  //                       <p>{item?.TenLanhDaoTiep}</p>
  //                     </td>
  //                     <td
  //                       style={styleTable.td}
  //                       className="table-primary"
  //                       colSpan={5}
  //                     >
  //                       <p>{item?.NoiDungTiep}</p>
  //                     </td>
  //                   </tr>
  //                 );
  //               }
  //             })}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
