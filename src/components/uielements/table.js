import React, {useEffect, useState} from 'react';
import {Table, Empty} from 'antd';
import PropTypes from 'prop-types';

const TableCustom = (props) => {
  const [maxHeightDefault, setMaxHeightDefault] = useState(0);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const antTable = document.querySelector('.ant-table');
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
      const BoxContent = document.querySelector('.box-content');
      const BoxFilter = document.querySelector('.boxFilter');
      const antTable = document.querySelector('.ant-table');
      const antPagination = document.querySelector('.ant-table-pagination')
        ? document.querySelector('.ant-table-pagination')
        : {offsetHeight: 50};
      const TableWrapper =
        getTotalHeight(antTable) + antPagination.offsetHeight;

      const heightBoxContent = getTotalHeight(BoxContent)
        ? getTotalHeight(BoxContent)
        : 0;
      const heightBoxFilter = getTotalHeight(BoxFilter)
        ? getTotalHeight(BoxFilter)
        : 0;
      const heightTableWrapper = TableWrapper ? TableWrapper : 0;
      const HeightTbody =
        heightBoxContent - heightBoxFilter - heightTableWrapper;
      const handleResize = () => {
        if (HeightTbody) {
          setMaxHeightDefault(HeightTbody < 440 ? 440 : HeightTbody - 30);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isRendered]);

  const {dataSource, keyword, onSearch} = props;
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
    scroll: props.scroll ? props.scroll : {y: maxHeightDefault, x: 900},
    ...props,
    locale: {
      ...localeDefault,
      ...props.locale,
    },
  };

  if (typeof onSearch === 'function') {
    const _dataSource = onSearch(dataSource ? dataSource : [], keyword);
    propsTable = {
      ...props,
      dataSource: _dataSource,
    };
  }
  return <Table {...propsTable} bordered />;
  // }
};
TableCustom.propTypes = {
  onSearch: PropTypes.func,
  keyword: PropTypes.string,
};
TableCustom.defaultProps = {
  keyword: '',
};

export default TableCustom;
