import React from "react";
import { WrapperExcel } from "./index.styled";
import { DONVIHANHCHINH } from "../../../../settings/constants";
const TableExport = ({
  data,
  excelRef,
  year,
  DoiTuongTT,
  onRemove,
  ListFields = [],
}) => {
  const handleRenderKey = (Cap, CuocThanhTraID, index, DoiTuongTT) => {
    const dmkey = DoiTuongTT === DONVIHANHCHINH ? "DVHC" : "DN";
    const newCap = Cap > 0 ? Cap : 0;
    const newCuocThanhTraID = CuocThanhTraID > 0 ? CuocThanhTraID : 0;
    const newIndex = index > 0 ? index : 0;
    const newDoiTuongTT = DoiTuongTT > 0 ? DoiTuongTT : 0;

    const resultKey =
      dmkey +
      Number(newCap) +
      Number(newCuocThanhTraID) +
      Number(newIndex) +
      Number(newDoiTuongTT);

    return resultKey;
  };
  return (
    <WrapperExcel>
      <div style={{ display: "none" }} ref={excelRef}>
        <div className="title-report">
          <p className="title">
            Tổng hợp rà soát chồng chéo kế hoạch năm {year}
          </p>
          <span>
            (Đối tượng thanh tra, kiểm tra:
            {DoiTuongTT === DONVIHANHCHINH
              ? " Đơn vị hành chính, sự nghiệp"
              : " Doanh nghiệp"}
            )
          </span>
        </div>
        <table className="custom-expandable-table">
          <thead>
            <tr>
              <th style={{ width: 50, textAlign: "center" }}>STT</th>
              <th style={{ width: 300, textAlign: "left" }}>
                Đối tượng thanh tra, kiểm tra
              </th>
              <th style={{ width: 400, textAlign: "left" }}>
                Nội dung thanh tra, kiểm tra
              </th>
              <th style={{ width: 150, textAlign: "left " }}>Lĩnh vực chính</th>
              <th style={{ width: 150, textAlign: "left " }}>
                Lĩnh vực thanh tra
              </th>
              <th style={{ width: 150, textAlign: "left" }}>
                Thời hạn thanh tra (ngày)
              </th>
              <th style={{ width: 150, textAlign: "left " }}>
                Thời gian thanh tra, kiểm tra
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
            {data.map((item, index) => {
              if (item.Cap === 1 || item.Cap === 2 || item.Cap === 3) {
                return (
                  <tr
                    key={handleRenderKey(
                      item.Cap,
                      item.CuocThanhTraID,
                      index,
                      DoiTuongTT
                    )}
                  >
                    <td
                      colSpan="10"
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#f0f0f0",
                        textAlign: "left",
                      }}
                    >
                      {item.STT}. {onRemove(item.TenCoQuan)}
                    </td>
                  </tr>
                );
              } else if (item.Cap === 4) {
                return (
                  <tr
                    key={handleRenderKey(
                      item.Cap,
                      item.CuocThanhTraID,
                      index,
                      DoiTuongTT
                    )}
                  >
                    <td style={{ textAlign: "center" }}>{item.STT}</td>
                    <td style={{ textAlign: "left" }}>
                      {onRemove(item.TenCoQuan)}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.NoiDung || ""}</td>
                    <td style={{ textAlign: "left" }}>{item.LinhVuc || ""}</td>
                    <td style={{ textAlign: "left" }}>
                      {item.LinhVucPhuIDs &&
                        item.LinhVucPhuIDs.split(",").map((id) => {
                          const data = ListFields.find(
                            (item) => item.PhanLoaiThanhTraID === Number(id)
                          );
                          return data ? (
                            <p>{data.TenPhanLoaiThanhTra}</p>
                          ) : null;
                        })}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {item.ThoiHanThanhTra || ""}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {item.ThoiGianTienHanh || ""}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.DonViChuTri || ""}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {item.DonViPhoiHop || ""}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.GhiChu || ""}</td>
                  </tr>
                );
              }
              return null; // Trả về null nếu không khớp với điều kiện
            })}
          </tbody>
        </table>
      </div>
    </WrapperExcel>
  );
};

export default TableExport;
