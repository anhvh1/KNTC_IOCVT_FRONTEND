import React, { useEffect, useState } from "react";
import { Table, Empty } from "antd";
import PropTypes from "prop-types";

const TableCustom = (props) => {
  const [maxHeightDefault, setMaxHeightDefault] = useState(0);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const antTable = document.querySelector(".ant-table");
    if (antTable && isRendered === false) {
      setIsRendered(true);
    }
  }, []);

  const getTotalHeight = (element) => {
    if (element) {
      // Lấy đối tượng CSSStyleDeclaration cho phần tử
      const computedStyle = window.getComputedStyle(element);

      // Lấy giá trị của margin-top, margin-bottom, padding-top và padding-bottom
      const marginTop = parseFloat(computedStyle.marginTop);
      const marginBottom = parseFloat(computedStyle.marginBottom);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      // Lấy chiều cao của phần tử không tính margin và padding
      const elementHeight = element.offsetHeight;

      // Tính toán chiều cao tổng cộng bao gồm cả margin và padding
      const totalHeight =
        elementHeight + marginTop + marginBottom + paddingTop + paddingBottom;

      return totalHeight;
    }
  };

  // const maxScrollTable = document.querySelector('.ant-table');
  useEffect(() => {
    if (isRendered) {
      const handleResize = () => {
        const Topbar =
          document.querySelector(".wrapper-topbar")?.clientHeight || 0;
        const Titlebar =
          document.querySelector(".isoComponentTitle")?.clientHeight || 0;
        const FilterAction =
          document.querySelector(".filter-left")?.clientHeight || 0;
        const boxWrapper =
          document.querySelector(".isoBoxWrapper")?.clientHeight || 0;
        const antTab =
          document.querySelector(".ant-tabs-nav-wrap")?.clientHeight || 52;
        const footer =
          document.querySelector(".ant-layout-footer")?.clientHeight || 0;
        const pagination = props.pagination ? 52 : 0;
        const antdTableThead =
          document.querySelector(".ant-table-thead")?.clientHeight || 0;
        const info = document.querySelector(".info")?.clientHeight || 0;
        // console.log(
        //   `Topbar -- ${Topbar} | Titlebar -- ${Titlebar} | FilterAction -- ${FilterAction} | AntTab -- ${antTab}
        //   | Foooter -- ${footer} | pagination -- ${pagination} | antdTableThead -- ${antdTableThead} | innerHeightWindow -- ${window.innerHeight}`
        // );
        const heightBody =
          window.innerHeight -
          Topbar -
          Titlebar -
          FilterAction -
          antTab -
          footer -
          pagination -
          antdTableThead -
          info -
          75;

        setMaxHeightDefault(heightBody < 350 ? 350 : heightBody);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isRendered]);

  const { dataSource, keyword, onSearch } = props;
  let localeDefault = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Không có dữ liệu"
      />
    ),
  };
  // customimze height table
  let propsTable = {
    scroll: props.scroll ? props.scroll : { y: maxHeightDefault, x: 900 },
    ...props,
    locale: {
      ...localeDefault,
      ...props.locale,
    },
  };

  if (typeof onSearch === "function") {
    const _dataSource = onSearch(dataSource ? dataSource : [], keyword);
    propsTable = {
      ...props,
      dataSource: _dataSource,
    };
  }
  return <Table className="custom-table-scrollbar" {...propsTable} bordered />;
  // }
};
TableCustom.propTypes = {
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
};
TableCustom.defaultProps = {
  keyword: "",
};

export default TableCustom;
