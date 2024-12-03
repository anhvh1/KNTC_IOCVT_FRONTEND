import { DONVIHANHCHINH } from "../../../../settings/constants";
import { WrapperExcel } from "../TongHopRaSoatChongCheo/index.styled";
const TableExport = ({ data, excelRef, DoiTuongTT, year, onRemove }) => {
  return (
    <WrapperExcel>
      <div style={{ display: "none" }} ref={excelRef}>
        <div className="title-report">
          <p className="title">Danh sách cuộc thanh tra, kiểm tra năm {year}</p>
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
              <th style={{ width: 300, textAlign: "center" }}>Đối tượng</th>
              <th style={{ width: 400, textAlign: "center" }}>Nội dung</th>
              <th style={{ width: 150, textAlign: "center" }}>
                Thời hạn thanh tra
              </th>
              <th style={{ width: 150, textAlign: "center" }}>
                Thời gian thanh tra
              </th>
              <th style={{ width: 150, textAlign: "center" }}>Trạng thái</th>
              <th style={{ width: 150, textAlign: "center" }}>
                Đơn vị phối hợp
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              if (item.isParent) {
                return (
                  <tr key={item.key}>
                    <td
                      colSpan="7"
                      style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
                    >
                      {item.idx}. {onRemove(item.TenPhanLoaiThanhTra)}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={item.key}>
                  <td>{item.index + 1}</td>
                  <td>{onRemove(item.CoQuanBiThanhTra)}</td>
                  <td>{item.NoiDung || ""}</td>
                  <td>{item.ThoiHanThanhTra || ""}</td>
                  <td>{item.ThoiGianTienHanh || ""}</td>
                  <td>{item.StateName || ""}</td>
                  <td>{item.DonViPhoiHop || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WrapperExcel>
  );
};

export { TableExport };
