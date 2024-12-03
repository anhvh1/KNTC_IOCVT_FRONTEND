import TableWrapper from "./style/Table.style";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
const Table = () => {
  const headerData = [
    {
      title: "Column 1",
      children: [
        {
          title: "Subcolumn 1-1",
        },
        {
          title: "Subcolumn 1-2",
          children: [
            { title: "Subcolumn 1-2-1" },
            {
              title: "Subcolumn 1-2-2",
              children: [
                { title: "Subcolumn 1-2-1" },
                { title: "Subcolumn 1-2-2" },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Column 2",
    },
  ];
  const bodyData = [
    {
      name: "Parent 1",
      value: "Value 1",
      children: [
        {
          name: "Child 1-1",
          value: "Value 1-1",
          children: [
            {
              name: "Child 1-1-1",
              value: "Value 1-1-1",
            },
            {
              name: "Child 1-1-2",
              value: "Value 1-1-2",
            },
          ],
        },
        {
          name: "Child 1-2",
          value: "Value 1-2",
        },
      ],
    },
    {
      name: "Parent 2",
      value: "Value 2",
    },
  ];

  return (
    <TableWrapper>
      <TableHeader headerData={headerData} />
      <TableBody bodyData={bodyData} />
    </TableWrapper>
  );
};

export default Table;
