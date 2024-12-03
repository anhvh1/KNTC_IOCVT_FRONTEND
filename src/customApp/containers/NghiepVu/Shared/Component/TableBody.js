import React from "react";

// const calculateRowSpan = (row) => {
//   if (!row.Child || !Array.isArray(row.Child) || row.Child.length === 0) {
//     return 1;
//   }
//   return row.Child.reduce((sum, child) => sum + calculateRowSpan(child), 0);
// };

// const renderRows = (data, columns, depth = 0, parentUsedColumns = []) => {
//   if (!Array.isArray(data)) return null;

//   return data
//     .flatMap((row, rowIndex) => {
//       if (!row) return null;

//       const hasChildren =
//         row.Child && Array.isArray(row.Child) && row.Child.length > 0;
//       const rowSpan = calculateRowSpan(row);

//       const currentRowUsedColumns = [];

//       const renderCell = (column, cellData) => {
//         if (parentUsedColumns.includes(column.name)) return null;

//         let cellContent = cellData[column.name];

//         if (column.format) {
//           cellContent = column.format(cellContent, cellData);
//         }

//         if (cellContent !== undefined) {
//           currentRowUsedColumns.push(column.name);
//         }

//         return (
//           <td
//             key={`cell-${depth}-${rowIndex}-${column.name}`}
//             style={column.style ? column.style(depth) : {}}
//             rowSpan={hasChildren && cellContent !== undefined ? rowSpan : 1}
//           >
//             {cellContent}
//           </td>
//         );
//       };

//       const renderRowWithChildren = (currentRow, childrenToRender) => {
//         const cells = columns.map((column) => {
//           if (column.isViewParent) {
//             return renderCell(column, currentRow);
//           } else if (childrenToRender[0]) {
//             return renderCell(column, childrenToRender[0]);
//           }
//           return null;
//         });

//         return <tr key={`row-${depth}-${rowIndex}`}>{cells}</tr>;
//       };

//       if (hasChildren) {
//         const mainRow = renderRowWithChildren(row, row.Child);

//         const childRows = row.Child.flatMap((child, childIndex) =>
//           renderRows([child], columns, depth + 1, [
//             ...parentUsedColumns,
//             ...currentRowUsedColumns,
//           ])
//         );

//         return [mainRow, ...childRows];
//       }

//       return renderRowWithChildren(row, []);
//     })
//     .filter(Boolean);
// };

// const renderRows = (data, columns, depth = 0, parentUsedColumns = []) => {
//   if (!Array.isArray(data)) return null;

//   return data
//     .flatMap((row, rowIndex) => {
//       if (!row) return null;

//       const hasChildren =
//         row.Child && Array.isArray(row.Child) && row.Child.length > 0;
//       const rowSpan = hasChildren ? calculateRowSpan(row) : 1;

//       const currentRowUsedColumns = [];

//       const renderCell = (column, cellData, isParent) => {
//         if (parentUsedColumns.includes(column.name)) return null;

//         let cellContent = cellData[column.name];

//         if (column.format) {
//           cellContent = column.format(cellContent, cellData);
//         }

//         if (cellContent !== undefined) {
//           if (isParent) currentRowUsedColumns.push(column.name);
//           return (
//             <td
//               key={`cell-${depth}-${rowIndex}-${column.name}`}
//               style={column.style ? column.style(depth) : {}}
//               rowSpan={isParent && hasChildren ? rowSpan : 1}
//             >
//               {cellContent}
//             </td>
//           );
//         }
//         return null;
//       };

//       const cells = columns.map((column) => {
//         if (row[column.name] !== undefined) {
//           return renderCell(column, row, true);
//         } else if (hasChildren && row.Child[0][column.name] !== undefined) {
//           return renderCell(column, row.Child[0], false);
//         } else if (
//           hasChildren &&
//           row.Child[0].Child &&
//           row.Child[0].Child[0] &&
//           row.Child[0].Child[0][column.name] !== undefined
//         ) {
//           return renderCell(column, row.Child[0].Child[0], false);
//         }
//         return null;
//       });

//       const mainRow = (
//         <tr key={`row-${depth}-${rowIndex}`}>{cells.filter(Boolean)}</tr>
//       );

//       if (hasChildren) {
//         const childRows = row.Child.flatMap((child, childIndex) => {
//           if (childIndex === 0) {
//             if (child.Child && child.Child.length > 1) {
//               return renderRows(child.Child.slice(1), columns, depth + 2, [
//                 ...parentUsedColumns,
//                 ...currentRowUsedColumns,
//               ]);
//             }
//             return null;
//           }

//           return renderRows([child], columns, depth + 1, [
//             ...parentUsedColumns,
//             ...currentRowUsedColumns,
//           ]);
//         }).filter(Boolean);

//         return [mainRow, ...childRows];
//       }

//       return mainRow;
//     })
//     .filter(Boolean);
// };

const calculateRowSpan = (row) => {
  if (!row.Child || !Array.isArray(row.Child) || row.Child.length === 0) {
    console.log(row, "row return");
    return 1;
  }
  return row.Child.reduce((sum, child) => sum + calculateRowSpan(child), 0);
};

const getDeepestChild = (row) => {
  let current = row;
  const path = [current];
  while (current.Child && current.Child.length > 0) {
    current = current.Child[0];
    path.push(current);
  }
  return path;
};

const renderRows = (data, columns, depth = 0, parentUsedColumns = []) => {
  if (!Array.isArray(data)) return null;

  return data
    .flatMap((row, rowIndex) => {
      if (!row) return null;

      const hasChildren =
        row.Child && Array.isArray(row.Child) && row.Child.length > 0;

      const currentRowUsedColumns = [];

      const renderCell = (column, cellData, isParent) => {
        if (parentUsedColumns.includes(column.name)) return null;
        let cellContent = cellData[column.name];
        console.log(
          "cellContent",
          cellContent,
          parentUsedColumns,
          "parentUsedColumns"
        );
        if (column.format) {
          cellContent = column.format(cellContent, cellData);
        }
        const rowSpan = hasChildren ? calculateRowSpan(cellData) : 1;
        if (cellContent !== undefined) {
          if (isParent) currentRowUsedColumns.push(column.name);
          return (
            <td
              key={`cell-${depth}-${rowIndex}-${column.name}`}
              style={column.style ? column.style(depth) : {}}
              rowSpan={isParent ? rowSpan : 1}
            >
              {cellContent}
            </td>
          );
        }
        return null;
      };

      const deepestPath = getDeepestChild(row);
      const cells = columns.map((column) => {
        for (const item of deepestPath) {
          if (item[column.name] !== undefined) {
            // check parent : item === row
            return renderCell(column, item, item?.Child?.length > 0);
          }
        }
        return null;
      });
      console.log("row-data", row, columns, "columns");
      const mainRow = (
        <tr key={`row-${depth}-${rowIndex}`}>{cells.filter(Boolean)}</tr>
      );

      if (hasChildren) {
        const renderRemainingChildren = (children, currentDepth) => {
          return children
            .flatMap((child, childIndex) => {
              if (childIndex === 0 && child.Child && child.Child.length > 0) {
                return renderRemainingChildren(child.Child, currentDepth + 1);
              } else if (childIndex > 0) {
                return renderRows([child], columns, currentDepth, [
                  ...parentUsedColumns,
                  ...currentRowUsedColumns,
                ]);
              }
              return null;
            })
            .filter(Boolean);
        };

        const childRows = renderRemainingChildren(row.Child, depth + 1);

        return [mainRow, ...childRows];
      }

      return mainRow;
    })
    .filter(Boolean);
};

const DynamicTableBody = ({ bodyData, columns }) => {
  function addCapToData(data, currentCap = 1) {
    if (data) {
      return data.map((item) => {
        const newItem = { ...item, Cap: currentCap };

        if (item.Child && Array.isArray(item.Child) && item.Child.length > 0) {
          newItem.Child = addCapToData(item.Child, currentCap + 1);
        }

        return newItem;
      });
    } else {
      return [];
    }
  }
  // Sử dụng hàm
  const dataWithCap = addCapToData(bodyData || []);
  console.log(dataWithCap, "dataWithCap");
  return <tbody>{renderRows(dataWithCap, columns)}</tbody>;
};

export default DynamicTableBody;
