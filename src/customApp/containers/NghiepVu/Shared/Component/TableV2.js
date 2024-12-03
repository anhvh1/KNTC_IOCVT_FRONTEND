import React from "react";
import TableWrapper from "./style/Table.style";
import DynamicTableHeader from "./TableHeader";
import { formatNumberStr } from "../../../../../helpers/utility";
// Hàm tính tổng số Child ở cấp sâu nhất
const countTotalDeepChildren = (item) => {
  let count = 0;

  const countChild = (children) => {
    children.forEach((child) => {
      if (child.Child && child.Child.length > 0) {
        countChild(child.Child);
      } else {
        count += 1; // Đếm Child chỉ có ở cấp cuối
      }
    });
  };

  // Bắt đầu đếm từ Child của item
  if (item.Child && item.Child.length > 0) {
    countChild(item.Child);
  }

  return count;
};

// Hàm đệ quy để render các hàng
const renderRecursiveRows = (item, isFirstChild = true, onRenderAction) => {
  const totalDeepChildren = countTotalDeepChildren(item); // Tính tổng số Child ở cấp sâu nhất

  return (
    <React.Fragment key={item.CuocThanhTraID || item.CapNhapLoaiSoLieuID}>
      <tr>
        {/* Kết luận chỉ render ở hàng đầu tiên với rowspan */}
        {isFirstChild && (
          <td className="center" rowSpan={totalDeepChildren}>
            {item.SoVanBan}
          </td>
        )}

        {/* Chỉ render hàng đầu tiên của Child mà không phải là Child ẩn */}
        {item.Child &&
        item.Child.length > 0 &&
        item.Child[0].Child &&
        item.Child[0].Child.length > 0 ? (
          <>
            <td className="center">{item?.Child[0]?.Child[0]?.TenDoiTuong}</td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.TongSoTienViPham)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.ToChuc)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.CaNhan)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.TongSoTienKienNghi)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.SoTienNSNN)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.SoTienDVTC)}
            </td>
            <td className="center">
              {formatNumberStr(item?.Child[0]?.Child[0]?.XuLyKhac)}
            </td>
            {/* Render cột "Thao tác" với rowspan */}
            {isFirstChild && (
              <td rowSpan={countTotalDeepChildren(item.Child[0])}>
                {onRenderAction(item.Child[0])}
              </td>
            )}
          </>
        ) : (
          // Nếu không có Child, hiển thị cột trống
          <>
            {/* <td colSpan={8}>Không có dữ liệu</td> */}
            {isFirstChild && (
              <td rowSpan={countTotalDeepChildren(item.Child[0])}>
                {onRenderAction(item.Child[0])}
              </td>
            )}
          </>
        )}
      </tr>

      {/* Đệ quy render các Child tiếp theo của item[0] */}
      {item.Child &&
        item.Child[0].Child && // Kiểm tra sự tồn tại của Child[0].Child
        item.Child[0].Child.length > 0 &&
        item.Child[0].Child.slice(1).map((child) => (
          <tr key={child.CapNhapSoLieuID}>
            <td className="center">{child.TenDoiTuong}</td>
            <td className="center">
              {formatNumberStr(child.TongSoTienViPham)}
            </td>
            <td className="center">{formatNumberStr(child.ToChuc)}</td>
            <td className="center">{formatNumberStr(child.CaNhan)}</td>
            <td className="center">
              {formatNumberStr(child.TongSoTienKienNghi)}
            </td>
            <td className="center">{formatNumberStr(child.SoTienNSNN)}</td>
            <td className="center">{formatNumberStr(child.SoTienDVTC)}</td>
            <td className="center">{formatNumberStr(child.XuLyKhac)}</td>
          </tr>
        ))}

      {/* Đệ quy render các Child tiếp theo */}
      {item.Child &&
        item.Child.map((child, index) =>
          child.Child && child.Child.length > 0
            ? child.Child.map((subChild, subIndex) => {
                if (index > 0) {
                  return (
                    <tr key={subChild.CapNhapSoLieuID}>
                      <td className="center">{subChild.TenDoiTuong}</td>
                      <td className="center">
                        {formatNumberStr(subChild.TongSoTienViPham)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.ToChuc)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.CaNhan)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.TongSoTienKienNghi)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.SoTienNSNN)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.SoTienDVTC)}
                      </td>
                      <td className="center">
                        {formatNumberStr(subChild.XuLyKhac)}
                      </td>
                      {/* Nếu là hàng đầu tiên của cấp con, render thêm cột Thao tác */}
                      {subIndex === 0 && isFirstChild && (
                        <td rowSpan={countTotalDeepChildren(child)}>
                          {onRenderAction(child)}
                        </td>
                      )}
                    </tr>
                  );
                }
              })
            : null
        )}
    </React.Fragment>
  );
};

// Component chính để render bảng
const DataTable = ({ data, onRenderAction, headerData, onRenderTotal }) => {
  return (
    <TableWrapper>
      <table border="1">
        <DynamicTableHeader headerData={headerData} />
        <tbody>
          {data.map((item) => renderRecursiveRows(item, true, onRenderAction))}
          {onRenderTotal ? onRenderTotal() : null}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default DataTable;
