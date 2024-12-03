import React from "react";
import { WrapperTable } from "./index.styled";
import { Checkbox } from "antd";
import { convertToRoman } from "../../../../helpers/utility";
import { Spin } from "antd";
import { DONVIHANHCHINH } from "../../../../settings/constants";
import { Textarea } from "../../../../components/uielements/input";
const TableCheck = ({
  data,
  excelRef,
  loading,
  onChecked,
  isCheck,
  year,
  DoiTuongTT,
  filterNoiDung,
  filterThoiGian,
  onSplit,
  onChangeNote,
  isExport,
  checkIsView,
}) => {
  const isFullColumns = 9;

  const renderNote = (data, item) => {
    return (
      <div className="note-area">
        {!isExport ? (
          <Textarea
            value={data}
            onChange={(e) => onChangeNote(e.target.value, item)}
            className="note-area"
            disabled={checkIsView}
          />
        ) : (
          <p>{data}</p>
        )}
      </div>
    );
  };

  const checkDuocThucHienCheckbox = (DuocThucHien, ChildChecked) => {
    const str = DuocThucHien ? "Được thực hiện" : "Không được thực hiện";
    return !excelRef ? (
      <Checkbox
        defaultChecked={DuocThucHien}
        onChange={(value) => onChecked(value, ChildChecked)}
        disabled={checkIsView}
      />
    ) : (
      str
    );
  };

  const renderDepartments = (departments, prefix) => {
    if (!departments) return null;

    return departments.flatMap((department, dIndex) => {
      const checkHightlightNoidung =
        department.isHightLightNoidung && filterNoiDung;
      const checkHightlightThoiGian =
        department.isHightlightThoiGian && filterThoiGian;
      const hasChildren = department.Child && department.Child.length > 0;

      const rows = [];

      if (
        department.TieuDe &&
        !department.Child.every((child) => !child.TieuDe)
      ) {
        rows.push(
          <tr key={`${department.CoQuanID}-title`} className="parent-row">
            <td colSpan={isFullColumns}>
              {prefix}.{dIndex + 1} {department.TenCoQuan}
            </td>
          </tr>
        );
      }

      if (hasChildren && department.Child.some((child) => !child.TieuDe)) {
        const rowSpan = hasChildren ? department.Child.length : 1;

        rows.push(
          <tr key={department.CoQuanID} className={department.class}>
            <td className="center" rowSpan={rowSpan}>{`${prefix}.${
              dIndex + 1
            }`}</td>
            <td rowSpan={rowSpan}>{department.TenCoQuan}</td>
            {hasChildren ? (
              // Render thông tin của phần tử con đầu tiên
              <>
                <td>
                  <div className="count-column">
                    {department.Child[0].isHightLightNoidung &&
                      filterNoiDung && (
                        <p className="hightlight-count">
                          {department.Child[0].TypeNoiDung}
                        </p>
                      )}
                    <p
                      className={
                        department.Child[0].isHightLightNoidung && filterNoiDung
                          ? "hightlight-content"
                          : ""
                      }
                    >
                      {department.Child[0].NoiDung}
                    </p>
                  </div>
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {department.Child[0].LinhVuc}
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {department.Child[0].ThoiHanThanhTra}
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="count-column__time">
                    {department.Child[0].isHightlightThoiGian &&
                      filterThoiGian && (
                        <p className="hightlight-count">
                          {department.Child[0].TypeThoiGianThanhTra}
                        </p>
                      )}
                    <p
                      className={`center ${
                        department.Child[0].isHightlightThoiGian &&
                        filterThoiGian
                          ? "hightlight-content"
                          : ""
                      }`}
                    >
                      {department.Child[0].ThoiGianTienHanh}
                    </p>
                  </div>
                </td>
                <td>{department.Child[0].DonViChuTri}</td>
                <td style={{ textAlign: "center" }} className="center">
                  {isCheck
                    ? checkDuocThucHienCheckbox(
                        department.Child[0].DuocThucHien,
                        department.Child[0]
                      )
                    : // <Checkbox
                      //   defaultChecked={department.Child[0].DuocThucHien}
                      //   onChange={(value) =>
                      //     onChecked(value, department.Child[0])
                      //   }
                      //   disabled={checkIsView}
                      // />
                      department.Child[0].DonViPhoiHop}
                </td>
                <td>
                  {renderNote(department.Child[0].GhiChu, department.Child[0])}
                </td>
              </>
            ) : (
              // Render thông tin của phần tử không có con
              <>
                <td>
                  <div className="count-column">
                    {checkHightlightNoidung && (
                      <p className="hightlight-count">
                        {department.TypeNoiDung}
                      </p>
                    )}
                    <p
                      className={
                        checkHightlightNoidung ? "hightlight-content" : ""
                      }
                    >
                      {department.NoiDung}
                    </p>
                  </div>
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {department.LinhVuc}
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {department.ThoiHanThanhTra}
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="count-column__time">
                    {checkHightlightThoiGian && (
                      <p className="hightlight-count">
                        {department.TypeThoiGianThanhTra}
                      </p>
                    )}
                    <p
                      className={`center ${
                        checkHightlightThoiGian ? "hightlight-content" : ""
                      }`}
                    >
                      {department.ThoiGianTienHanh}
                    </p>
                  </div>
                </td>
                <td>{department.DonViChuTri}</td>
                <td style={{ textAlign: "center" }} className="center">
                  {isCheck
                    ? checkDuocThucHienCheckbox(
                        department.DuocThucHien,
                        department
                      )
                    : // <Checkbox
                      //   defaultChecked={department.DuocThucHien}
                      //   onChange={(value) => onChecked(value, department)}
                      //   disabled={checkIsView}
                      // />
                      department.DonViPhoiHop}
                </td>
                <td>{renderNote(department.GhiChu, department)}</td>
              </>
            )}
          </tr>
        );

        if (hasChildren) {
          department.Child.slice(1).forEach((child, childIndex) => {
            rows.push(
              <tr
                className={department.class}
                key={`${department.CoQuanID}-child-${childIndex}`}
              >
                <td>
                  <div className="count-column">
                    {child.isHightLightNoidung && filterNoiDung && (
                      <p className="hightlight-count">{child.TypeNoiDung}</p>
                    )}
                    <p
                      className={
                        child.isHightLightNoidung && filterNoiDung
                          ? "hightlight-content"
                          : ""
                      }
                    >
                      {child.NoiDung}
                    </p>
                  </div>
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {child.LinhVuc}
                </td>
                <td style={{ textAlign: "center" }} className="center">
                  {child.ThoiHanThanhTra}
                </td>
                <td style={{ textAlign: "center" }}>
                  <div className="count-column__time">
                    {child.isHightlightThoiGian && filterThoiGian && (
                      <p className="hightlight-count">
                        {child.TypeThoiGianThanhTra}
                      </p>
                    )}
                    <p
                      className={`center ${
                        child.isHightlightThoiGian && filterThoiGian
                          ? "hightlight-content"
                          : ""
                      }`}
                    >
                      {child.ThoiGianTienHanh}
                    </p>
                  </div>
                </td>
                <td>{child.DonViChuTri}</td>
                <td style={{ textAlign: "center" }} className="center">
                  {isCheck
                    ? checkDuocThucHienCheckbox(child.DuocThucHien, child)
                    : // <Checkbox
                      //   defaultChecked={child.DuocThucHien}
                      //   onChange={(value) => onChecked(value, child)}
                      //   disabled={checkIsView}
                      // />
                      child.DonViPhoiHop}
                </td>
                <td>{renderNote(child.GhiChu, child)}</td>
              </tr>
            );
          });
        }
      }

      if (hasChildren) {
        rows.push(
          ...department.Child.flatMap((child, childIndex) =>
            renderDepartments([child], `${prefix}.${dIndex + 1}`)
          )
        );
      }

      return rows;
    });
  };

  const renderInspectionData = (data) => {
    console.log(data, "data");
    if (data) {
      return data.map((item, index) => (
        <React.Fragment key={item.CuocThanhTraID}>
          <tr className={item.Cap <= 2 ? "parent-row" : ""}>
            <td className="center">{item.STT}</td>
            <td>{item.TenCoQuan ? onSplit(item.TenCoQuan) : ""}</td>
            <td>{item.NoiDung}</td>
            <td>{item.LinhVuc}</td>
            <td style={{ textAlign: "center" }} className="center">
              {item.ThoiHanThanhTra}
            </td>
            <td style={{ textAlign: "center" }} className="center">
              {item.ThoiGianTienHanh}
            </td>
            <td>{item.DonViChuTri}</td>
            <td>{item.DonViPhoiHop}</td>
            <td>{item.GhiChu}</td>
          </tr>
        </React.Fragment>
      ));
    }
  };

  return (
    <WrapperTable>
      <div ref={excelRef} className="wrapper-table">
        <div style={{ display: "none" }} className="top-table">
          <p>BẢNG TỔNG HỢP XỬ LÝ CHỒNG CHÉO, TRÙNG LẶP</p>
          <p>TRONG DỰ THẢO KẾ HOẠCH THANH TRA, KIỂM TRA NĂM {year}</p>
          <p>
            ĐỐI TƯỢNG THANH TRA LÀ CÁC{" "}
            {DoiTuongTT === DONVIHANHCHINH
              ? "ĐƠN VỊ HÀNH CHÍNH "
              : "DOANH NGHIỆP, HỘ KINH DOANH "}
            TRÊN ĐỊA BÀN TỈNH
          </p>
        </div>
        <table className="inspection-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: 50 }} className="center">
                STT
              </th>
              <th style={{ width: 300 }}>Đối tượng thanh tra, kiểm tra</th>
              <th style={{ width: 400 }}>Nội dung thanh tra, kiểm tra</th>
              <th style={{ width: 150 }}>Lĩnh vực chính</th>
              <th
                style={{ textAlign: "center", width: 150 }}
                className="center"
              >
                {isCheck
                  ? "Thời hạn thanh tra, kiểm tra"
                  : "Thời hạn thanh tra (ngày)"}
              </th>
              <th
                style={{ textAlign: "center", width: 150 }}
                className="center"
              >
                {isCheck
                  ? "Thời gian tiến hành thanh tra, kiểm tra"
                  : "Thời gian thanh tra"}
              </th>
              <th
                style={{ textAlign: "center", width: 200 }}
                className="center"
              >
                Đơn vị chủ trì
              </th>
              <th
                style={{ textAlign: "center", width: 150 }}
                className="center"
              >
                {isCheck ? "Xử lý chồng chéo, trùng lặp" : "Đơn vị phối hợp"}
              </th>

              <th
                style={{ textAlign: "center", width: 200 }}
                className="center"
              >
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody className={data && data?.length ? "" : "default-body"}>
            {data && data?.length && isCheck ? (
              data.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="parent-row">
                    <td colSpan={isFullColumns}>
                      {convertToRoman(index + 1)}. {item.TenCoQuan}
                    </td>
                  </tr>
                  {renderDepartments(
                    item.Child,
                    `${convertToRoman(index + 1)}`
                  )}
                </React.Fragment>
              ))
            ) : isCheck === false ? (
              <>{renderInspectionData(data)}</>
            ) : (
              <div className="default-div"></div>
            )}
          </tbody>
        </table>
        {loading ? <Spin className="loading-table" /> : null}
      </div>
    </WrapperTable>
  );
};

export default TableCheck;
