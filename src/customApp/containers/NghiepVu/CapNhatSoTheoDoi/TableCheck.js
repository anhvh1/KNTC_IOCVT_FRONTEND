import React from "react";
import { WrapperTable } from "./index.styled";
import { Checkbox } from "antd";
import { convertToRoman } from "../../../../helpers/utility";
import { Spin } from "antd";
const TableCheck = ({ data, excelRef, loading, onChecked, isCheck }) => {
  const isFullColumns = isCheck ? 7 : 8;

  console.log(isCheck, "isCheck");

  const renderDepartments = (departments, prefix) => {
    if (departments) {
      return departments.map((department, dIndex) => {
        return (
          <React.Fragment key={department.CoQuanID}>
            <tr>
              {department.Child.length > 0 ? (
                <>
                  <td
                    className="center"
                    rowSpan={
                      department.Child.length > 0
                        ? department.Child.length + 1
                        : null
                    }
                  >
                    {prefix}.{dIndex + 1}
                  </td>
                  <td
                    rowSpan={
                      department.Child.length > 0
                        ? department.Child.length + 1
                        : null
                    }
                  >
                    {department.TenCoQuan}
                  </td>
                </>
              ) : (
                <>
                  <td>{department.NoiDung}</td>
                  <td style={{ textAlign: "center" }} className="center">
                    {department.ThoiHanThanhTra}
                  </td>
                  <td style={{ textAlign: "center" }} className="center">
                    {department.ThoiGianTienHanh}
                  </td>
                  <td>{department.DonViChuTri}</td>
                  <td style={{ textAlign: "center" }} className="center">
                    {isCheck ? (
                      <Checkbox
                        defaultChecked={department.DuocThucHien}
                        onChange={(value) => onChecked(value, department)}
                      />
                    ) : null}
                  </td>
                  {!isCheck ? <td>{department.DonViChuTri}</td> : null}
                </>
              )}
            </tr>
            {renderDepartments(department.Child, `${prefix}.${dIndex + 1}`)}
          </React.Fragment>
        );
      });
    }
  };

  const renderInspectionData = (data) => {
    if (data) {
      return data.map((item, index) => (
        <React.Fragment key={item.CuocThanhTraID}>
          <tr className={item.Cap <= 2 ? "parent-row" : ""}>
            <td className="center">{item.STT}</td>
            <td>{item.TenCoQuan}</td>
            <td>{item.NoiDung}</td>
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
      <div ref={excelRef}>
        <table className="inspection-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: 50 }} className="center">
                STT
              </th>
              <th style={{ width: 300 }}>Đối tượng thanh tra, kiểm tra</th>
              <th style={{ width: 400 }}>Nội dung thanh tra, kiểm tra</th>
              <th
                style={{ textAlign: "center", width: 150 }}
                className="center"
              >
                {isCheck
                  ? " Thời gian tiến hành thanh tra, kiểm tra"
                  : "Thời hạn thanh tra (ngày)"}
              </th>
              <th
                style={{ textAlign: "center", width: 150 }}
                className="center"
              >
                {isCheck
                  ? " Thời gian tiến hành thanh tra, kiểm tra"
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
              {!isCheck ? (
                <th
                  style={{ textAlign: "center", width: 200 }}
                  className="center"
                >
                  Ghi chú
                </th>
              ) : null}
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
                  {renderDepartments(item.Child, `${index + 1}`)}
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
