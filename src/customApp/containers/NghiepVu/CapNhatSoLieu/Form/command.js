function InsertCapToData(data, currentCap = 1) {
  if (data && data.length > 0) {
    return data.map((item, idx) => {
      const newItem = { ...item, Cap: currentCap, idx };

      if (item.Child && Array.isArray(item.Child) && item.Child.length > 0) {
        newItem.Child = InsertCapToData(item.Child, currentCap + 1);
      }

      return newItem;
    });
  } else {
    return [];
  }
}

function calculateRowSpans(data) {
  function calculateRowSpan(item) {
    if (!item.Child || item.Child.length === 0) {
      item.rowSpan = 1;
      return 1;
    }

    let totalRowSpan = item.Child.reduce(
      (sum, child) => sum + calculateRowSpan(child),
      0
    );
    item.rowSpan = totalRowSpan;
    return totalRowSpan;
  }

  data.forEach((item) => calculateRowSpan(item));
  return data;
}

function transformData(data) {
  function addCapToValues(obj, parent) {
    const newObj = { ...obj };

    Object.keys(newObj).forEach((key) => {
      if (
        key !== "Child" &&
        key !== "Cap" &&
        key !== "idx"
        // &&
        // newObj[key] !== null &&
        // newObj[key] !== undefined
      ) {
        newObj[key] = key?.includes("ID")
          ? newObj[key]
          : `${newObj[key] ? newObj[key] : ""}___${
              newObj.rowSpan !== undefined ? newObj.rowSpan : ""
            } `;
      }
    });
    return newObj;
  }

  return data.map((item) => {
    let newItem = addCapToValues(item);
    let newChildren = [];

    function mergeChildProperties(parent, child) {
      const childWithCap = addCapToValues(child, parent);
      Object.keys(childWithCap).forEach((key) => {
        if (key !== "Child" && key !== "Cap") {
          parent[key] = childWithCap[key];
        }
      });
    }

    function processChildren(children, depth = 0) {
      if (!children || children.length === 0) return;

      // Merge properties from the first child
      mergeChildProperties(newItem, children[0]);

      // Process grandchildren of the first child
      if (children[0].Child && children[0].Child.length > 0) {
        processChildren(children[0].Child, depth + 1);
      }

      // Add remaining children to the new children array
      children.slice(1).forEach((child) => {
        let newChild = addCapToValues(child);
        if (child.Child && child.Child.length > 0) {
          mergeChildProperties(newChild, child.Child[0]);
          newChild.Child = child.Child.slice(1);
        } else {
          delete newChild.Child;
        }
        newChildren.push(newChild);
      });
    }

    if (newItem.Child && newItem.Child.length > 0) {
      processChildren(newItem.Child);
      newItem.Child = newChildren.length > 0 ? newChildren : undefined;
    }

    return newItem;
  });
}

const getRowSpan = (text) => {
  if (text) {
    const rowSpan = typeof text === "string" ? text.split("___")[1] : text;
    return rowSpan ? rowSpan : 1;
  }
};
const getTextView = (text) => {
  if (text) {
    const textRender = typeof text === "string" ? text.split("___")[0] : text;

    return textRender ? textRender : null;
  }
};

const flattenTree = (data) => {
  let result = [];

  const recursiveFlatten = (node) => {
    // Thêm node hiện tại vào mảng kết quả
    result.push(node);

    // Nếu node có Child, đệ quy trên từng phần tử trong Child
    if (node.Child && node.Child.length > 0) {
      node.Child.forEach((child) => recursiveFlatten(child));
    }
  };

  // Bắt đầu đệ quy với mỗi phần tử trong mảng đầu vào
  data.forEach((item) => recursiveFlatten(item));

  return result;
};

function addEmptyChildToLeaves(data, Cap, pushObject = {}) {
  if (data) {
    function processItem(item) {
      if (item.Cap === Cap) {
        item.Child = [{ ...pushObject }, ...(item.Child ? item.Child : [])];
        // Đây là phần tử lá, thêm một mảng rỗng vào Child
      } else {
        // Đây không phải là phần tử lá, xử lý đệ quy các phần tử con
        item.Child = item.Child.map(processItem);
      }
      return item;
    }

    return data.map(processItem);
  }
}

function removeTrailingOne(data) {
  function processItem(item) {
    if (Array.isArray(item)) {
      return item.map(processItem);
    } else if (typeof item === "object" && item !== null) {
      const newItem = {};
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          newItem[key] = processItem(item[key]);
        }
      }
      return newItem;
    } else if (typeof item === "string") {
      // Xóa ___<số>, ___, hoặc ___undefined ở cuối chuỗi
      return item.replace(/___(-?\d+|undefined)?\s*$/, "").trim();
    } else {
      // Giữ nguyên các giá trị khác (number, null, undefined)
      return item;
    }
  }

  return processItem(data);
}

const checkRowspanItem = (record) => {
  if (!record.Child || record.Child.length === 0) return 1;
  return record.Child.reduce((sum, child) => sum + checkRowspanItem(child), 0);
};

function addParentPropertyToChildren(data, parentProperty) {
  if (data && data.length) {
    function processItem(item, parentValue) {
      // Tạo một bản sao của item để không thay đổi dữ liệu gốc
      const newItem = { ...item };

      // Thêm thuộc tính của parent vào item hiện tại
      if (parentValue !== undefined) {
        newItem[parentProperty] = parentValue;
      }

      // Nếu item có Child, xử lý đệ quy
      if (newItem.Child && Array.isArray(newItem.Child)) {
        newItem.Child = newItem.Child.map((childItem) =>
          processItem(childItem, newItem[parentProperty])
        );
      }

      return newItem;
    }

    // Xử lý mảng dữ liệu gốc
    return data.map((item) => processItem(item, item[parentProperty]));
  }
}
function getChildInfo(item) {
  let info = {
    ids: [],
    totalSoTienXuPhat: 0,
    totalSoTienXuPhatDaThu: 0,
  };

  if (item.CapNhapLoaiSoLieuID) {
    info.ids.push(item.CapNhapLoaiSoLieuID);
  }

  // Cộng dồn SoTienXuPhat và SoTienXuPhatDaThu
  info.totalSoTienXuPhat += parseFloat(item.SoTienXuPhat) || 0;
  info.totalSoTienXuPhatDaThu += parseFloat(item.SoTienXuPhatDaThu) || 0;

  if (item.Child && Array.isArray(item.Child)) {
    item.Child.forEach((child) => {
      const childInfo = getChildInfo(child);
      info.ids = info.ids.concat(childInfo.ids);
      info.totalSoTienXuPhat += childInfo.totalSoTienXuPhat;
      info.totalSoTienXuPhatDaThu += childInfo.totalSoTienXuPhatDaThu;
    });
  }

  return info;
}

function addListIDChilds(treeData, flatData) {
  const infoMap = new Map();

  // Tạo map của CuocThanhTraID với thông tin tổng hợp
  treeData.forEach((item) => {
    const info = getChildInfo(item);
    infoMap.set(item.CuocThanhTraID, info);
  });

  // Thêm ListIDChilds và tổng tiền vào mảng đã làm phẳng
  return flatData.map((item) => {
    const info = infoMap.get(item.CuocThanhTraID) || {
      ids: [],
      totalSoTienXuPhat: 0,
      totalSoTienXuPhatDaThu: 0,
    };
    return {
      ...item,
      ListIDChilds: info.ids,
      totalSoTienXuPhat: info.totalSoTienXuPhat,
      totalSoTienXuPhatDaThu: info.totalSoTienXuPhatDaThu,
    };
  });
}

function addTotalRow(data, propertiesToSum) {
  // Tính tổng cho mỗi thuộc tính
  const totals = propertiesToSum.reduce((acc, prop) => {
    const totalProp = `total${prop.charAt(0).toUpperCase() + prop.slice(1)}`;

    acc[totalProp] = data.reduce((sum, item) => {
      const newtotal = String(item[prop]).includes("|")
        ? item[prop]
            .split("|")
            .reduce((sum, total) => (sum += Number(total)), 0)
        : item[prop];

      return sum + (parseFloat(newtotal) || 0);
    }, 0);
    return acc;
  }, {});

  // Tạo đối tượng tổng
  const totalRow = {
    isTotal: true,
    ...totals,
    // Thêm các trường khác nếu cần
  };

  // Thêm các thuộc tính gốc vào totalRow với giá trị là chuỗi rỗng
  propertiesToSum.forEach((prop) => {
    totalRow[prop] = "";
  });

  // Thêm đối tượng tổng vào cuối mảng
  return [totalRow];
}

function removeEmptyChildren(data) {
  // Helper function to check if an object is empty (all properties are null, undefined, or empty string)
  function isEmptyObject(obj) {
    return Object.values(obj).every(
      (value) => value === null || value === undefined || value === ""
    );
  }

  // If data has a 'Child' key and it's an array
  if (Array.isArray(data.Child)) {
    // Recursively process children and remove any empty ones
    data.Child = data.Child.map(removeEmptyChildren) // Recursively clean children
      .filter((child) => !isEmptyObject(child))
      .map((item) => ({
        ...item,
        CapNhapLoaiSoLieuID: data.CapNhapLoaiSoLieuID,
      })); // Filter out empty objects
  }

  return data;
}

export {
  InsertCapToData,
  calculateRowSpans,
  transformData,
  getRowSpan,
  getTextView,
  flattenTree,
  addEmptyChildToLeaves,
  removeTrailingOne,
  checkRowspanItem,
  addParentPropertyToChildren,
  addListIDChilds,
  addTotalRow,
  removeEmptyChildren,
};
