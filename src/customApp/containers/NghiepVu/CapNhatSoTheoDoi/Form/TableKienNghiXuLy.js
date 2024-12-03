import React from "react";
import TableWrapper from "../../Shared/Component/style/Table.style";
import DynamicTableHeader from "../../Shared/Component/TableHeader";

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

        {/* Render Child đầu tiên của item */}
        {item.Child && item.Child.length > 0 ? (
          <>
            <td className="center">{item.Child[0].QuyetDinhThuHoi}</td>
            <td className="center">{item.Child[0].Child[0].TenDoiTuong}</td>
            <td className="center">{item.Child[0].Child[0].SoTienXuPhat}</td>
            <td className="center">
              {item.Child[0].Child[0].SoTienXuPhatDaThu}
            </td>
            <td className="center">
              {item.Child[0].Child[0].NoiDungXuPhatKhacDaThu}
            </td>

            {isFirstChild && (
              <td rowSpan={countTotalDeepChildren(item.Child[0])}>
                {onRenderAction(item.Child[0])}
              </td>
            )}
          </>
        ) : (
          <td colSpan={5}>Không có dữ liệu</td>
        )}
      </tr>

      {/* Đệ quy render các Child tiếp theo */}
      {item.Child &&
        item.Child.map((child, index) =>
          child.Child && child.Child.length > 0
            ? child.Child.map((subChild, subIndex) => {
                console.log(child, "child");
                if (!(index === 0 && subIndex === 0))
                  return (
                    <tr key={subChild.CapNhapSoLieuID}>
                      <td className="center">{child.QuyetDinhThuHoi}</td>
                      <td className="center">{subChild.TenDoiTuong}</td>
                      <td className="center">{subChild.SoTienXuPhat}</td>
                      <td className="center">{subChild.SoTienXuPhatDaThu}</td>
                      <td className="center">
                        {subChild.NoiDungXuPhatKhacDaThu}
                      </td>
                      {subIndex === 0 && isFirstChild && (
                        <td rowSpan={countTotalDeepChildren(child)}>
                          {onRenderAction(child)}
                        </td>
                      )}
                    </tr>
                  );
              })
            : null
        )}
    </React.Fragment>
  );
};

// Component chính để render bảng
const TableKienNghiXuLy = ({
  data,
  onRenderAction,
  headerData,
  onRenderTotal,
}) => {
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

export default TableKienNghiXuLy;
