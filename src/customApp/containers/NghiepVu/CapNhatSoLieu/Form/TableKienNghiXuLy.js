import React from "react";
import TableWrapper from "../../Shared/Component/style/Table.style";
import DynamicTableHeader from "../../Shared/Component/TableHeader";
import { formatNumberStr } from "../../../../../helpers/utility";
import { Checkbox } from "antd";

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

const handleRenderBangHinhThucKhac = (data) => {
  if (data?.includes("|")) {
    const arrData = data.split("|");
    return (
      <>
        {arrData.map((item) => {
          return <p>{formatNumberStr(Number(item))}</p>;
        })}
      </>
    );
  } else {
    return formatNumberStr(data);
  }
};

// Hàm đệ quy để render các hàng
const renderRecursiveRows = (item, isFirstChild = true, onRenderAction) => {
  const totalDeepChildren = countTotalDeepChildren(item); // Tính tổng số Child ở cấp sâu nhất
  console.log(item, "item");
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
            <td rowSpan={item.Child.length} className="center">
              {item.Child[0].QuyetDinhThuHoi}
            </td>
            <td className="center">{item.Child[0].Child[0].TenDoiTuong}</td>
            <td>{formatNumberStr(item.Child[0].Child[0].SoTienXuPhat)}</td>
            <td>{formatNumberStr(item.Child[0].Child[0].SoTienXuPhatDaThu)}</td>
            <td>
              {handleRenderBangHinhThucKhac(
                item.Child[0].Child[0].XuPhatBangHinhThucKhac
              )}
            </td>
            <td className="center">
              <Checkbox checked={item.Child[0].Child[0].DuocThucHien} />
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
                if (!(index === 0 && subIndex === 0))
                  return (
                    <tr key={subChild.CapNhapSoLieuID}>
                      {subIndex === 0 && isFirstChild ? (
                        <td
                          rowSpan={countTotalDeepChildren(child)}
                          className="center"
                        >
                          {child.QuyetDinhThuHoi}
                        </td>
                      ) : null}
                      <td className="center">{subChild.TenDoiTuong}</td>
                      <td>{formatNumberStr(subChild.SoTienXuPhat)}</td>
                      <td>{formatNumberStr(subChild.SoTienXuPhatDaThu)}</td>
                      <td>
                        {handleRenderBangHinhThucKhac(
                          subChild.XuPhatBangHinhThucKhac
                        )}
                      </td>
                      <td className="center">
                        <Checkbox checked={subChild.DuocThucHien} />
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
