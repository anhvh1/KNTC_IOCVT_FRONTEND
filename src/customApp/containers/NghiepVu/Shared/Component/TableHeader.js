import React from "react";
import TableWrapper from "./style/Table.style";

// Hàm tính toán colspan
const calculateColspan = (node) => {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  return node.children.reduce(
    (colspan, child) => colspan + calculateColspan(child),
    0
  );
};

// Hàm đệ quy render header
const renderHeader = (columns, rowIndex = 0, maxDepth = 1, rows = []) => {
  if (!rows[rowIndex]) {
    rows[rowIndex] = [];
  }

  columns.forEach((col, colIndex) => {
    const colspan = calculateColspan(col);
    const rowspan = col.children ? 1 : maxDepth - rowIndex;
    rows[rowIndex].push(
      <th
        key={`col-${rowIndex}-${colIndex}`}
        colSpan={colspan}
        rowSpan={rowspan}
        width={col?.width}
      >
        {col.title}
      </th>
    );

    if (col.children) {
      renderHeader(col.children, rowIndex + 1, maxDepth, rows);
    }
  });

  return rows;
};

// Hàm tính độ sâu tối đa (để tính rowspan)
const calculateMaxDepth = (columns, depth = 1) => {
  return columns.reduce(
    (maxDepth, col) =>
      Math.max(
        maxDepth,
        col.children ? calculateMaxDepth(col.children, depth + 1) : depth
      ),
    depth
  );
};

// Component chính
const DynamicTableHeader = ({ headerData }) => {
  const maxDepth = calculateMaxDepth(headerData);
  const headerRows = renderHeader(headerData, 0, maxDepth);

  return (
    <thead>
      {headerRows.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>{row}</tr>
      ))}
    </thead>
  );
};

export default DynamicTableHeader;
