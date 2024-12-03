import React from "react";

const calculateColspan = (header) => {
  if (!header.children || header.children.length === 0) {
    return 1; // Nếu không có children, colspan = 1
  }
  return header.children.reduce(
    (total, child) => total + calculateColspan(child),
    0
  );
};

const TableHeader = ({ headers }) => {
  const propsThead = {
    props: {
      className: "",
      children: [],
    },
  };

  const formatListTree = (list, Cap = 0) => {
    if (list) {
      Cap++;
      list.forEach((item) => {
        item.Cap = Cap; // Gán giá trị Cap cho item
        if (item.children) {
          formatListTree(item.children, Cap); // Đệ quy cho children
        }
      });
    }
  };

  formatListTree(headers); // Gọi hàm để gán Cap cho các item

  const mapTree = (list) => {
    const groupedByCap = {};

    // Nhóm các item theo Cap
    list.forEach((header) => {
      const cap = header.Cap;
      if (!groupedByCap[cap]) {
        groupedByCap[cap] = [];
      }
      groupedByCap[cap].push(header);
    });

    return Object.keys(groupedByCap).map((cap) => (
      <tr key={cap}>
        {groupedByCap[cap].map((header) => {
          const propsTH = {
            Name: header.title,
            props: {
              colSpan: calculateColspan(header),
              id: header.dataIndex || header.title,
            },
          };

          return (
            <th key={propsTH.props.id} colSpan={propsTH.props.colSpan}>
              {propsTH.Name}
            </th>
          );
        })}
      </tr>
    ));
  };

  return (
    <thead>
      {mapTree(headers)} {/* Render all headers grouped by Cap */}
    </thead>
  );
};
const TableBody = ({ data, headers }) => {
  return (
    <>
      {data.map((record, index) => (
        <React.Fragment key={index}>
          <tr>
            {headers.map((header) => {
              const hasChildren = header.children && header.children.length > 0;
              return hasChildren ? (
                header.children.map((child, subIndex) => (
                  <td key={`${index}-${header.title}-${subIndex}`}>
                    {record[child.dataIndex] || ""}
                  </td>
                ))
              ) : (
                <td key={header.title}>{record[header.dataIndex] || ""}</td>
              );
            })}
          </tr>
          {record.children &&
            record.children.map((childRecord, childIndex) => (
              <tr key={`${index}-child-${childIndex}`}>
                {headers.map((header) =>
                  header.children ? (
                    header.children.map((child, subIndex) => (
                      <td key={`${index}-${header.title}-${subIndex}`}>
                        {childRecord[child.dataIndex] || ""}
                      </td>
                    ))
                  ) : (
                    <td key={header.title}></td>
                  )
                )}
              </tr>
            ))}
        </React.Fragment>
      ))}
    </>
  );
};

const DynamicTable = ({ headers, data }) => {
  return (
    <table>
      <thead>
        <TableHeader headers={headers} />
      </thead>
      <tbody>
        <TableBody data={data} headers={headers} />
      </tbody>
    </table>
  );
};

const App = () => {
  const headers = [
    {
      title: "Tên tổ chức, cá nhân vi phạm",
      dataIndex: "tenToChuc",
      children: [
        { title: "Số tiền kiến nghị xử lý khác", dataIndex: "soTienXuLyKhac" },
      ],
    },
    {
      title: "Phải xử lý",
      children: [
        {
          title: "Số tiền kiến nghị thu hồi (tiền và tài sản quy thành tiền)",
          children: [
            { title: "Về ngân sách nhà nước", dataIndex: "veNganSach" },
            { title: "Về tổ chức đơn vị", dataIndex: "veToChuc" },
          ],
        },
      ],
    },
    {
      title: "Phải xử lý",
      children: [
        {
          title: "Số tiền kiến nghị thu hồi (tiền và tài sản quy thành tiền)",
          children: [
            { title: "Về ngân sách nhà nước", dataIndex: "veNganSach" },
            { title: "Về tổ chức đơn vị", dataIndex: "veToChuc" },
          ],
        },
      ],
    },
  ];

  const data = [
    {
      tenToChuc: "Công ty cổ phần ABC",
      soTienXuLyKhac: "100.000",
      veNganSach: "50.000",
      veToChuc: "50.000",
    },
    {
      tenToChuc: "Giám đốc công ty cổ phần ABC",
      soTienXuLyKhac: "0",
      veNganSach: "0",
      veToChuc: "0",
    },
  ];

  return (
    <div>
      <h1>Bảng Vi Phạm</h1>
      <DynamicTable headers={headers} data={data} />
    </div>
  );
};

export default App;
