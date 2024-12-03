import React from "react";
import { WrapperExcel } from "./index.styled";
const TableExport = ({ data, excelRef }) => {
  return (
    data && (
      <WrapperExcel>
        <div style={{ display: "none" }} ref={excelRef}>
          <table className="custom-expandable-table">
            <thead>
              <tr>
                <th style={{ width: 50, textAlign: "center" }}>STT</th>
                <th style={{ width: 300, textAlign: "center" }}>
                  Đối tượng thanh tra, kiểm tra
                </th>
                <th style={{ width: 400, textAlign: "center" }}>
                  Nội dung thanh tra, kiểm tra
                </th>
                <th style={{ width: 150, textAlign: "center" }}>
                  Thời hạn thanh tra (ngày)
                </th>
                <th style={{ width: 150, textAlign: "center " }}>
                  Thời gian thanh tra
                </th>
                <th style={{ width: 200, textAlign: "center" }}>
                  Đơn vị chủ trì
                </th>
                <th style={{ width: 200, textAlign: "center" }}>
                  Đơn vị phối hợp
                </th>
                <th style={{ width: 150, textAlign: "center" }}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                if (item.Cap === 1 || item.Cap === 2 || item.Cap === 3) {
                  return (
                    <tr key={item.STT}>
                      <td
                        colSpan="8"
                        style={{
                          fontWeight: "bold",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        {item.STT}. {item.TenCoQuan}
                      </td>
                    </tr>
                  );
                } else if (item.Cap === 4) {
                  return (
                    <tr key={item.STT}>
                      <td>{item.STT}</td>
                      <td>{item.TenCoQuan}</td>
                      <td>{item.NoiDung || ""}</td>
                      <td>{item.ThoiHanThanhTra || ""}</td>
                      <td>{item.ThoiGianTienHanh || ""}</td>
                      <td>{item.DonViChuTri || ""}</td>
                      <td>{item.DonViPhoiHop || ""}</td>
                      <td>{item.GhiChu || ""}</td>
                    </tr>
                  );
                }
                return null; // Trả về null nếu không khớp với điều kiện
              })}
            </tbody>
          </table>
        </div>
      </WrapperExcel>
    )
  );
};

export default TableExport;
