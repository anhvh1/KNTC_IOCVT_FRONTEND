import { message, Spin } from "antd";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { ExportOutlined, RollbackOutlined } from "@ant-design/icons";
import PageWrapper from "./table.styled";
import ModalDetailsReport from "../../NghiepVu/Shared/Modal/ModalChiTietDonThu";
// import ModalDetailsReport from './ModalDetailsReport';
import api from "./config";
import Button from "../../../../components/uielements/button";
import { TYPEEDIT } from "../../../../settings/constants";
import { removeStringToStringNum } from "../../../../helpers/utility";

const Table = React.memo((props) => {
  const [visibleModalDetailsReport, setVisibleModalDetailsReport] =
    useState(false);
  const [dataModalDetailsReport, setDataModalDetailsReport] = useState({});
  const [keyModalDetailsReport, setKeyModalDetailsReport] = useState(0);
  const { ListChangeRowReport, setListChangeRowReport } = props;
  const [keyTbody, setKeyTbody] = useState(0);
  const tbodyRef = useRef();
  const theadRef = useRef();
  const [TableData, setTableData] = useState([]);
  const [maxHeightDefault, setMaxHeightDefault] = useState(0);
  let defaultViewDetails = true;

  if (!props.isViewDetail) {
    defaultViewDetails = false;
  }

  const {
    tableHeader,
    tableData,
    tableDataDetail,
    tableHeaderDetail,
    setStep,
    Step,
    GetChiTietDonThu,
    loading,
    onRollBack,
    onExport,
    DetailsReportPayload,
    DanhSachTenFile,
    setLoadingDetailsReport,
    SubTitle,
    Title,
    BieuSo,
    MaxLevel,
  } = props;

  useEffect(() => {
    const data = Step === 1 ? tableData : tableDataDetail;
    setTableData(data);
    setKeyTbody((prevKey) => prevKey + 1);
  }, [tableData, tableDataDetail]);

  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    const listHeightTop = document.querySelectorAll(".wrap-top");
    const wrapperHeight = wrapper.clientHeight ? wrapper.clientHeight : 0;
    let maxHeight = wrapperHeight;
    for (let i = 0; i < listHeightTop.length; i++) {
      if (listHeightTop[i].clientHeight) {
        maxHeight -= listHeightTop[i].clientHeight;
      }
    }
    const Topbar = document.querySelector(".wrapper-topbar")?.clientHeight || 0;
    const Titlebar =
      document.querySelector(".isoComponentTitle")?.clientHeight || 0;
    const FilterAction =
      document.querySelector(".filter-left")?.clientHeight || 0;
    const footer =
      document.querySelector(".ant-layout-footer")?.clientHeight || 0;
    const antdTableThead =
      document.querySelector("#table thead")?.clientHeight || 0;
    const info = document.querySelector(".info")?.clientHeight || 0;

    const heightBody =
      window.innerHeight -
      Topbar -
      Titlebar -
      FilterAction -
      footer -
      antdTableThead -
      info +
      40;
    setMaxHeightDefault(heightBody < 440 ? 440 : heightBody);

    // const listWrapTable = document.querySelectorAll(".wrapper__table");
    // if (listWrapTable) {
    //   for (let i = 0; i < listWrapTable.length; i++) {
    //     listWrapTable[i].style.maxHeight = `${630}px`;
    //     // (maxHeight - 10 < 550 ? 550 : maxHeight - 10) : 550
    //   }
    // }
  }, [Step, tableData]);

  useEffect(() => {
    if (
      Step === MaxLevel &&
      tbodyRef.current &&
      tbodyRef.current?.children?.length > 0
    ) {
      let totalHeightTbody = tbodyRef.current.clientHeight;
      let totalHeightThead = theadRef.current.clientHeight;
      const table = document.getElementById("wrapper__table__step2");
      const tbody = document.querySelectorAll(
        "#wrapper__table__step2 tbody"
      )[0];
      const compStyles = window.getComputedStyle(table);
      const maxHeightOfTable = compStyles.getPropertyValue("max-height");
      const NumberMaxHeight = Number(
        maxHeightOfTable.toString().replace("px", "")
      );
      document.querySelectorAll(".wrapper__table")[0]?.offsetHeight;
      const tableContainer = document.getElementById("wrapper__table__step2");
      const tableChild = document.getElementById("table_maxLevel");

      const handleScroll = async () => {
        const rootTbody = document.getElementById("rootTbodyMaxLevel");
        if (totalHeightTbody + totalHeightThead > NumberMaxHeight) {
          // table.scrollHeight - table.clientHeight - table.scrollTop
          const theadClientHeight =
            tableChild.querySelector("thead:first-child")?.clientHeight;
          const tbodyClientHeight =
            tableChild.querySelector("tbody:nth-child(2)")?.clientHeight;
          if (
            tableContainer.scrollTop + tableContainer.clientHeight + 0.1 >=
            Math.floor(theadClientHeight + tbodyClientHeight)
          ) {
            let PageNumber = Math.ceil((tbody.childNodes.length + 20) / 20);
            const listData = await GetChiTietDonThu(
              DetailsReportPayload?.CapID,
              DetailsReportPayload?.Index,
              DetailsReportPayload?.CoQuanID,
              "get",
              PageNumber
              // tableDataDetail,
            );
            const rootTbody = document.getElementById("rootTbodyMaxLevel");
            if (listData && listData.length > 0) {
              listData.forEach((itemRow) => {
                const tr = handleRenderEachRowTbody(
                  itemRow,
                  rootTbody,
                  listData
                );
                rootTbody.appendChild(tr);
              });
            }
          }
        }
      };
      table.addEventListener("scroll", handleScroll, {});

      return () => {
        table.removeEventListener("scroll", handleScroll);
      };
    }
  });

  const formatListTree = (list, Cap = 0) => {
    if (list) {
      Cap++;
      list.forEach((item, index) => {
        if (item.DataChild) {
          item.Cap = Cap;
        } else {
          item.Cap = Cap;
        }
        if (index === list.length - 1) {
          const findChilds = list.filter((item) => item.DataChild);
          // Cap++
          findChilds.forEach((item) => {
            formatListTree(item.DataChild, Cap);
          });
        }
      });
    }
  };

  const handleRenderHeaderTreeV2 = (tableHeader) => {
    const propsThead = {
      Name: "",
      props: {
        className: "",
        children: [],
      },
    };
    const mapTree = (list, itemParent) => {
      if (list) {
        list.map((item) => {
          if (item.DataChild) {
            const propsTH = {
              Name: "",
              props: {},
              propsChild: [],
            };
            const propsTR = {
              Name: "",
              props: {},
              propsChild: [],
            };
            if (!item.DataChild.length) {
              propsTH.props.rowSpan = 0;
            }
            propsTR.props.id = itemParent?.Cap;
            propsTH.props.id = item.ID;

            //   propsTH.props = {...propsTH.props}
            let findGroupParent;
            // get group parent of current item
            const getGroupParent = (listITem, Cap) => {
              listITem.forEach((item) => {
                if (item.props.propsChild && item.props.propsChild.length > 0) {
                  if (String(item.props.id) === String(Cap)) {
                    findGroupParent = item;
                  } else {
                    getGroupParent(item.props.propsChild, Cap?.toString());
                  }
                } else {
                  if (String(item.props.id) === String(Cap)) {
                    findGroupParent = item;
                  }
                }
              });
            };
            getGroupParent(
              propsThead.props.children ? propsThead.props.children : [],
              itemParent?.Cap
            );

            propsTH.props.className = "parent__group";
            // caculator colspan for each item
            const getItemColspan = (list, itemFind) => {
              let initColspan = 0;
              const getMaxColSpan = (list, itemFind, maxLengthS = 0) => {
                if (itemFind) {
                  list.map((item) => {
                    if (item.ID === itemFind.ID) {
                      if (item.DataChild) {
                        getMaxColSpan(item.DataChild, null);
                      } else {
                      }
                    } else if (item.DataChild && item.ID !== itemFind.ID) {
                      getMaxColSpan(item.DataChild, itemFind);
                    }
                  });
                } else {
                  list.map((item) => {
                    if (item.DataChild.length) {
                      getMaxColSpan(item.DataChild, null, initColspan);
                    } else {
                      initColspan += 1;
                    }
                  });
                }
              };
              getMaxColSpan(list, itemFind);
              return initColspan;
            };

            propsTH.props.colSpan = getItemColspan(list, item);
            propsTH.Name = item.Name;
            const th = React.createElement("th", { ...propsTH.props }, [
              propsTH.Name,
            ]);
            const tr = React.createElement("tr", { ...propsTR.props }, [th]);
            if (findGroupParent) {
              let isContains = false;
              const arrChilds = findGroupParent.props.children;
              if (arrChilds) {
                for (let i = 0; i < arrChilds.length; i++) {
                  if (Number(arrChilds[i].props?.id) === Number(item.ID)) {
                    isContains = true;
                  }
                }
              }
              // check if group parent not include item
              if (!isContains) {
                findGroupParent.props.children.push(th);
              }
            } else {
              // if not have group parent then push item to rootable
              propsThead.props.children.push(tr);
            }
            mapTree(item.DataChild ? item.DataChild : [], item);
          } else {
            const propsTH = {
              Name: "",
              props: {},
              propsChild: [],
              style: "",
            };
            const propsTR = {
              Name: "",
              props: {},
              propsChild: [],
            };
            const arrStyle = item.Style ? item.Style.toString().split(";") : [];
            arrStyle.forEach((style) => {
              if (style !== "" && style) {
                const propertys = style.split(":")[0];
                const value = style.split(":")[1];
                propsTH.props[propertys] = value;
              }
            });
            propsTH.Name = item.Name;
            // propsTH.style = item?.Style
            propsTR.props.id = itemParent?.Cap ? itemParent?.Cap : 0;
            propsTH.props.id = item.ID;
            if (!item.DataChild.length) {
              propsTH.props.rowSpan = 0;
            }
            propsTR.id = itemParent?.Cap ? itemParent?.Cap : 0;
            let findGroupParent;
            // get group parent of current item
            const getGroupParent = (listITem, Cap) => {
              listITem.forEach((item) => {
                if (item.props.propsChild && item.props.propsChild.length > 0) {
                  if (String(item.props.id) === String(Cap)) {
                    findGroupParent = item;
                  } else {
                    getGroupParent(item.props.propsChild, Cap?.toString());
                  }
                } else {
                  if (String(item.props.id) === String(Cap)) {
                    findGroupParent = item;
                  }
                }
              });
            };
            getGroupParent(propsThead.props.children, itemParent?.Cap);
            const th = React.createElement("th", { ...propsTH.props }, [
              propsTH.Name,
            ]);
            const tr = React.createElement("tr", { ...propsTR.props }, [th]);

            if (findGroupParent) {
              let isContains = false;
              const arrChilds = findGroupParent.props.children;

              if (arrChilds) {
                for (let i = 0; i < arrChilds.length; i++) {
                  if (Number(arrChilds[i].props?.id) === Number(item.ID)) {
                    isContains = true;
                  }
                }
              }
              if (!isContains) {
                findGroupParent.props.children.push(th);
              }
            } else {
              propsThead.props.children.push(tr);
            }
          }
        });
      }
    };
    formatListTree(tableHeader);
    mapTree(tableHeader);
    const thead = React.createElement(
      "thead",
      { ref: Step === MaxLevel ? theadRef : null },
      [...propsThead.props.children]
    );
    return thead;
  };

  const beforeRenderTableData = (tableData, id) => {
    const rootTbody = {
      Name: "",
      props: {
        className: "",
        children: [],
        id: id,
      },
    };
    handleRenderBodyTable(rootTbody, tableData, tableData);
    const tbody = React.createElement(
      "tbody",
      {
        ...rootTbody.props,
        ref: Step === MaxLevel ? tbodyRef : null,
        key: keyTbody,
      },
      [...rootTbody.props.children]
    );
    return tbody;
  };

  const handleRemoveActiveCurrent = (item, rootTbody, list) => {
    // get all item from DOM have same parent active
    const getIdDataChilds = document.querySelectorAll(
      `[data-id__parent="${item.ParentID}"]`
    );
    const listTotalCHild = [...rootTbody.children];
    Array.isArray(listTotalCHild);
    const listIdChilds = [];
    const FindChilds = (list) => {
      list.forEach((item) => {
        if (item.DataChild) {
          if (!listIdChilds.includes(item.ID)) {
            listIdChilds.push(item.ID);
          }
          FindChilds(item.DataChild);
        } else {
          if (!listIdChilds.includes(item.ID)) {
            listIdChilds.push(item.ID);
          }
        }
      });
    };
    const listArrFirstChild = [];
    // loop for each item child
    for (let i = 0; i < getIdDataChilds.length; i++) {
      // Find item from original data based on data get from DOM
      const findChildsData = (list, idChild) => {
        list.forEach((item) => {
          if (item.DataChild) {
            if (Number(item.ID) === Number(idChild)) {
              if (!listArrFirstChild.includes(Number(item))) {
                listArrFirstChild.push(item);
              }
            } else {
              findChildsData(item.DataChild, idChild);
            }
          } else {
            if (Number(item.ID) === Number(idChild)) {
              if (!listArrFirstChild.includes(Number(item))) {
                listArrFirstChild.push(item);
              }
            }
          }
        });
      };
      findChildsData(list, getIdDataChilds[i].getAttribute("id-child"));

      // Take item ID of each item listArrFirstChild
      FindChilds(listArrFirstChild);

      const listElementFromIdChilds = [];
      // get all element child based on list ID child above
      listIdChilds.forEach((ID) => {
        const getIdChildsEle = document.querySelectorAll(`[id-child="${ID}"]`);
        if (getIdChildsEle) {
          listElementFromIdChilds.push(...getIdChildsEle);
        }
      });
      // loop for each item child to remove all attribute and hidden it
      listElementFromIdChilds.forEach((item) => {
        const id = item.getAttribute("id-child");
        item.classList.remove(`active${id}`);
        item.classList.remove(`active`);
        item.setAttribute("data-id__parent", null);
        item.classList.add("disabled-rowItem");
      });
    }
  };

  const handleRenderChildActive = (item, list, rootTbody, listOrign) => {
    const activeParent = document.getElementsByClassName(
      `active${item.ParentID}`
    );
    const listTotalCHild = [...rootTbody.children];
    const obj = listTotalCHild.filter(
      (itemFilter) =>
        Number(itemFilter.getAttribute("data-id")) === Number(item.ParentID)
    )[0];
    let parent;
    const findParentArray = (list, ParentID) => {
      list.forEach((item) => {
        if (item.DataChild) {
          if (item.ID === ParentID) {
            parent = item;
          } else {
            findParentArray(item.DataChild, ParentID);
          }
        } else {
          if (item.ID === ParentID) {
            parent = item;
          }
        }
      });
    };
    //  loop find item parent based on parentID
    findParentArray(listOrign, item.ParentID, parent);
    // const indexParent = docu
    let positionChildAt = parent?.DataChild?.indexOf(item) + 1;
    // find position of child in parent
    if (activeParent.length) {
      const ele = document.querySelectorAll(`[id-child="${item.ID}"]`);
      if (ele.length) {
        const newArrConstainsEleHave = [...ele];
        Array.isArray(newArrConstainsEleHave);
        newArrConstainsEleHave.forEach((itemConstains) => {
          itemConstains.setAttribute("data-id__parent", item.ParentID);
          itemConstains.classList.remove("disabled-rowItem");
        });
      } else {
        const tr = handleRenderEachRowTbody(item, rootTbody, listOrign);
        const arr = [...rootTbody.children];
        Array.isArray(arr);
        if (parent && parent.ID) {
          const arrChildsTbody = [...rootTbody.children];
          for (let i = 0; i < arrChildsTbody.length; i++) {
            if (
              Number(arrChildsTbody[i].getAttribute("data-id")) === parent.ID
            ) {
              positionChildAt += i;
            }
          }
        }
        rootTbody.insertBefore(tr, rootTbody.children[positionChildAt]);
      }
    }
  };

  const handleRenderEachRowTbody = (item, rootTbody, listOrign) => {
    const tr = document.createElement("tr");
    tr.classList.add("trHover");
    item.DataArr.forEach((itemData, indexData) => {
      const td = document.createElement("td");
      td.id = itemData.ID;
      td.classList.add("item-rows");
      let inputEdit;
      if (!itemData?.isEdit) {
        inputEdit = document.createElement("p");
        inputEdit.innerHTML = itemData.Content !== "0" ? itemData.Content : "";
      } else {
        inputEdit = document.createElement("input");
        inputEdit.defaultValue =
          itemData.Content !== "0" ? itemData.Content : "";
        inputEdit.disabled = !item?.isEdit;
        inputEdit.value = itemData.Content !== "0" ? itemData.Content : "";
      }

      inputEdit.style.cssText = itemData?.Style;
      td.appendChild(inputEdit);
      if (indexData === 0) {
        td.addEventListener("click", () => {
          if (item.DataChild) {
            tr.classList.toggle(`active${item.ID}`);
            tr.classList.toggle(`active`);
            handleLoopListChidRows(item.DataChild, item, rootTbody, listOrign);
          } else {
            // message.destroy();
            // message.warning("Không có dữ liệu");
          }
        });
        // .onclick = () => {
        //     if (item.DataChild) {
        //         tr.classList.toggle(`active${item.ID}`)
        //         handleLoopListChidRows(item.DataChild, item, rootTbody, listOrign)
        //     }
        // }
      } else {
        td.addEventListener("click", () => GetChiTietThongTinDonThu(item));
      }
      tr.appendChild(td);
    });
    tr.setAttribute("id-child", item.ID);
    tr.setAttribute("data-id", item.ID);
    // tr.setAttribute('target-id', item.ID);
    tr.setAttribute("data-id__parent", item.ParentID);
    return tr;
  };

  const handleRenderActiveNotChild = (
    item,
    list,
    rootTbody,
    listOrign,
    activeParent
  ) => {
    // select all item
    const ele = document.querySelectorAll(`[data-id="${item.ID}"]`);
    let parent;
    // find parent of current item
    const findParentArray = (list, ParentID) => {
      list.forEach((item) => {
        if (item.DataChild) {
          if (item.ID === ParentID) {
            parent = item;
          } else {
            findParentArray(item.DataChild, ParentID);
          }
        } else {
          if (item.ID === ParentID) {
            parent = item;
          }
        }
      });
    };
    findParentArray(listOrign, item.ParentID);
    // find position of item in list child of parent
    let positionChildAt = parent?.DataChild?.indexOf(item) + 1;
    if (activeParent.length) {
      if (ele.length) {
        const newArrConstainsEleHave = [...ele];
        Array.isArray(newArrConstainsEleHave);
        // loop all item and remove disabled
        newArrConstainsEleHave.forEach((itemConstains) => {
          itemConstains.setAttribute("data-id__parent", item.ParentID);
          itemConstains.classList.remove("disabled-rowItem");
        });
      } else {
        // if DOM not have item, declare new item
        const tr = handleRenderEachRowTbody(item, rootTbody, listOrign);
        // item.DataArr.forEach(itemTD => {
        //     // create id tag for each item in dataArr
        //     const td = document.createElement('td')
        //     // create inputEdit for each td
        //     let inputEdit
        //     if (!itemTD?.isEdit) {
        //         inputEdit = document.createElement('p')
        //         inputEdit.textContent = item.Content !== "0" ? item.Content : ''
        //     } else {
        //         inputEdit = document.createElement('input')
        //         inputEdit.defaultValue = itemTD.Content ? itemTD.Content : ''
        //         inputEdit.disabled = !itemTD.isEdit
        //     }
        //     inputEdit.style.cssText = itemTD?.Style
        //     // push input to td
        //     td.appendChild(inputEdit)
        //     // push td to tr
        //     tr.appendChild(td)
        // })
        // tr.setAttribute('id-child', item.ID)
        // tr.setAttribute('data-id', item.ID)
        // tr.setAttribute('data-id__parent', item.ParentID)
        // create arr is array constains all child of tbody
        const arr = [...rootTbody.children];
        Array.isArray(arr);
        if (parent && parent.ID) {
          const arrChildsTbody = [...rootTbody.children];
          // loop for each child of array and find parent of current item
          for (let i = 0; i < arrChildsTbody.length; i++) {
            if (
              Number(arrChildsTbody[i].getAttribute("data-id")) === parent.ID
            ) {
              positionChildAt += i;
            }
          }
        }
        // insert tr to rootTbody
        rootTbody.insertBefore(tr, rootTbody.children[positionChildAt]);
      }
    }
  };

  const handleLoopListChidRows = (
    list = [],
    itemParents,
    rootTbody,
    listOrign
  ) => {
    list.forEach((item) => {
      const activeParent = document.getElementsByClassName(
        `active${item.ParentID}`
      );
      if (!activeParent.length) {
        // handle remove active item current and hidden child of current item
        handleRemoveActiveCurrent(item, rootTbody, list);
      } else if (item?.DataChild?.length > 0 && activeParent.length) {
        handleRenderChildActive(item, list, rootTbody, listOrign);
      } else if (!item?.DataChild && activeParent.length) {
        handleRenderActiveNotChild(
          item,
          list,
          rootTbody,
          listOrign,
          activeParent,
          rootTbody
        );
      }
    });
  };

  const handleStyleItem = (item, propsStyle) => {
    const arrStyle = item.Style ? item.Style.toString().split(";") : [];
    arrStyle.forEach((style) => {
      if (style !== "" && style) {
        const propertys = style.split(":")[0];
        const value = style.split(":")[1];
        propsStyle.props[propertys] = value;
      }
    });
  };

  const converNumber = (num) => {
    if (num && num !== "") {
      const arrContainsComma = num
        .toString()
        .split("")
        .filter((item) => item === ",");
      if (arrContainsComma.length <= 1) {
        const stringNum = num.toString();
        const index = stringNum.lastIndexOf(",");
        const hundredsNum = stringNum
          .slice(index, index > 0 ? stringNum.length : 0)
          .replaceAll(".", "");
        const converString = stringNum.replace(hundredsNum, " ");
        const convertNum = converString.replaceAll(".", "");
        const resultString = converString
          ? `${convertNum
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              .trim()}`
          : "";
        return hundredsNum ? resultString + hundredsNum : resultString;
      } else {
        message.destroy();
        message.warning("Đã là hàng đơn vị nhỏ nhất");
        const stringNum = num.toString().slice(0, num.lastIndexOf(","));
        const index = stringNum.lastIndexOf(",");
        const hundredsNum = stringNum
          .slice(index, index > 0 ? stringNum.length : 0)
          .replaceAll(".", "");
        const converString = stringNum.replace(hundredsNum, " ");
        const convertNum = converString.replaceAll(".", "");
        const resultString = converString
          ? `${convertNum
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              .trim()}`
          : "";
        return hundredsNum ? resultString + hundredsNum : resultString;
      }
    }
  };

  const convertGiaTri = (num) => {
    // if()
    const StringHave =
      /[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/;
    const testRegax = new RegExp(/[!@#$%^&*()_+{}\[\]:;<>.?~\\/-]|[\sa-zA-Z]/);
    const checkText = testRegax.test(num) || StringHave.test(num);
    if (!checkText) {
      return converNumber(num);
    } else {
      message.destroy();
      message.warning("Giá trị không được chấp nhận");
      const stringNum = removeStringToStringNum(num);
      // const result = converNumber(stringNum) ? converNumber(stringNum) : '';
      return stringNum;
    }
  };

  const formatNumber = (text) => {
    if (text) {
      return text?.replace(".", "").replace(",", ".");
    }
    return "";
  };

  const handleChangedValueEdit = (item, e, parentRow) => {
    const ListDataEdit = [...TableData];

    const itemRow = ListDataEdit.find((item) => item.ID === parentRow.ID);
    let total = 0;
    if (e.target.value && item.TypeEdit === TYPEEDIT.Number) {
      total += Number(formatNumber(convertGiaTri(e.target.value)));
    }

    const parentObj = itemRow.DataArr.find((itemArr) =>
      itemArr?.ListTotal?.includes(item.ID)
    );

    const EleCurrent = document.getElementById(item.ID.toString());

    const parentEle = document.querySelector(
      `[target-id="${itemRow.ID}${parentObj?.ID}"]`
    );

    const otherElementTotal = parentObj?.ListTotal?.filter(
      (itemToTal) => itemToTal !== item.ID
    );

    if (otherElementTotal) {
      otherElementTotal.forEach((ID) => {
        const ele = document.getElementById(ID.toString());
        if (ele.value) {
          total += Number(formatNumber(convertGiaTri(ele.value)));
        }
      });
    }
    const indexDot = total.toString().lastIndexOf(".");

    let mainTotal = total
      .toString()
      .slice(0, indexDot >= 0 ? indexDot : total.toString().length);

    let subTotal;

    const { TypeEdit } = item;
    if (TypeEdit === TYPEEDIT.Number) {
      if (indexDot >= 0) {
        subTotal = total.toString().slice(indexDot + 1);
      }
      if (parentEle) {
        if (subTotal) {
          parentEle.value =
            convertGiaTri(Number(mainTotal)) + "," + subTotal
              ? convertGiaTri(Number(mainTotal)) + "," + subTotal
              : "";
        } else if (total) {
          parentEle.value = convertGiaTri(Number(mainTotal))
            ? convertGiaTri(Number(mainTotal))
            : "";
        } else if (total >= 0 || subTotal >= 0) {
          parentEle.value = "";
        }
      }
      if (EleCurrent) {
        if (e.target.value) {
          EleCurrent.value = convertGiaTri(e.target.value);
        } else {
          EleCurrent.value = "";
        }
      }
    } else if (TypeEdit === TYPEEDIT.String) {
      EleCurrent.value = e.target.value;
    }

    const newItemRow = { ...itemRow };
    const index = newItemRow.DataArr.indexOf(item);
    const newContent = Number(e.target.value.toString().replace(/\./g, ""));
    if (newContent) {
      newItemRow.DataArr[index].Content = Number(
        e.target.value.toString().replace(/\./g, "")
      );
    } else {
      newItemRow.DataArr[index].Content = e.target.value;
    }
    if (parentObj) {
      parentObj.Content = total
        ? converNumber(total.toString().replace(/\./g, ","))
        : null;
    }

    const newListChangeRowReport = [...ListChangeRowReport];
    const indexRow = newListChangeRowReport?.find(
      (itemChange) => itemChange?.ID === parentRow?.ID
    );
    if (item) {
      if (indexRow) {
        newListChangeRowReport.splice(indexRow, 1, parentRow);
      } else {
        newListChangeRowReport.push(parentRow);
      }
    }
    setListChangeRowReport(newListChangeRowReport);
    setTableData(ListDataEdit);
  };

  const handleTrimText = (text) => {
    if (text) {
      return text?.replace(/\s/g, "");
    }
    return "";
  };

  const handleRenderBodyTable = (rootTbody, list = [], listOrign) => {
    list.forEach((itemRows) => {
      // create trProps for each item
      const trProps = {
        Name: "",
        props: {
          className: "",
          children: [],
        },
      };
      if (itemRows.DataArr) {
        itemRows.DataArr.forEach((item, index) => {
          /// handle on each frist rows
          if (index === 0) {
            // create th props
            const thProps = {
              Name: "",
              props: {
                className: "",
                children: [],
              },
            };
            // create input props
            let inputEditProps = {
              Name: "",
              props: {
                className: "",
              },
            };

            if (!item?.isEdit) {
              inputEditProps.props.textContent =
                item.Content !== "0" ? item.Content : "";
            } else {
              inputEditProps.props.defaultValue =
                item.Content !== "0" ? item.Content : "";
              inputEditProps.props.disabled = !item?.isEdit;
            }
            const arrStyle = item.Style ? item.Style.toString().split(";") : [];
            inputEditProps.props.style = {};
            arrStyle.forEach((style) => {
              if (style !== "" && style) {
                const propertys = handleTrimText(style.split(":")[0]);
                const value = style.split(":")[1];
                inputEditProps.props.style[propertys] = value;
              }
            });

            if (item.isEdit) {
              inputEditProps.props.onChange = (e) => {
                handleChangedValueEdit(item, e, itemRows);
              };
            }
            if (item.ListTotal) {
              inputEditProps.props["target-id"] = `${itemRows?.ID}${item.ID}`;
              // thProps.props['target-id'] = `${itemRows?.ID}${item.ID}`;
            }
            // handleStyleItem(item,inputEditProps)
            // const arrStyle = item.Style ? item.Style.toString().split(';') : []
            // arrStyle.forEach(style => {
            //     if (style !== '' && style) {
            //         const propertys = style.split(':')[0]
            //         const value = style.split(':')[1]
            //         inputEditProps.props[propertys] = value
            //     }
            // })
            // check item have edit or not to render html tag
            //   inputEditProps.props.style = item?.Style

            const inputEdit = !item?.isEdit
              ? React.createElement("p", {
                  ...inputEditProps.props,
                  dangerouslySetInnerHTML: {
                    __html: inputEditProps.props?.textContent,
                  },
                })
              : React.createElement("input", {
                  ...inputEditProps.props,
                  // onChange: () => {
                  // },
                });
            // const inputEdit = !item?.isEdit
            //   ? React.createElement(
            //       'p',
            //       {...inputEditProps.props},
            //       inputEditProps.props?.textContent,
            //     )
            //   : React.createElement('input', {...inputEditProps.props});
            // push input is children to html th tags
            thProps.props.children.push(inputEdit);
            inputEditProps.props.id = item.ID;
            thProps.props.className += "item-row";

            thProps.props["data-id"] = itemRows?.ID;
            thProps.props["DonThuID"] = itemRows?.DonThuID;
            thProps.props["XuLyDonID"] = itemRows?.XuLyDonID;

            //   tr.setAttribute('data-id',itemRows.ID)
            const itemParent = list.filter((item) => item.ID === itemRows.ID);
            const listChild = itemParent[0]?.DataChild;
            // handle click to show more child
            const handleRenderListChild = () => {
              const rootTbody = document.getElementById("rootTbody");
              // find parent of current item
              const findParent = list.filter((items) =>
                items.DataArr.includes(item)
              );
              // find parent tag from parent id
              const findParentElement = document.querySelectorAll(
                `[data-id="${findParent[0].ID}"]`
              )[0];
              findParentElement.classList.toggle(`active${findParent[0]?.ID}`);
              findParentElement.classList.toggle(`active`);
              /// toggle class active when item clicked and show children of item
              if (listChild) {
                handleLoopListChidRows(listChild, tr, rootTbody, listOrign);
              } else {
                // message.destroy();
                // message.warning("Không có dữ liệu");
              }
            };
            // assign event onClick to th
            if (!item?.isEdit && defaultViewDetails) {
              thProps.props.onClick = () => {
                handleRenderListChild();
              };
            }

            // decrale th
            const th = React.createElement("td", { ...thProps.props }, [
              ...thProps.props.children,
            ]);
            // push th tag to tr
            trProps.props.children.push(th);
          } else {
            // create th props and set attribute for input
            const propsTH = {
              Name: "",
              props: {
                className: "",
                children: [],
              },
            };
            // create input props and set attribute for input
            let inputEditProps = {
              Name: "",
              props: {
                className: "",
              },
            };

            let value;
            if (item.TypeEdit === TYPEEDIT.Number) {
              value = item.Content !== "0" ? converNumber(item.Content) : "";
            } else if (item.TypeEdit === TYPEEDIT.String) {
              value = item.Content !== "0" ? item.Content : "";
            }
            if (!item?.isEdit) {
              inputEditProps.props.textContent =
                item.Content !== "0" ? item.Content : "";
            } else {
              inputEditProps.props.defaultValue =
                item.Content !== "0" ? item.Content : "";
              inputEditProps.props.disabled = !item.isEdit;
            }
            const arrStyle = item.Style ? item.Style.toString().split(";") : [];
            inputEditProps.props.style = {};
            arrStyle.forEach((style) => {
              if (style !== "" && style) {
                const propertys = handleTrimText(style.split(":")[0]);
                const value = style.split(":")[1];
                inputEditProps.props.style[propertys] = value;
              }
            });

            if (item.isEdit) {
              inputEditProps.props.onChange = (e) => {
                handleChangedValueEdit(item, e, itemRows);
              };
            }
            if (item.ListTotal) {
              inputEditProps.props["target-id"] = `${itemRows?.ID}${item.ID}`;
            }
            // inputEditProps.props.style = item?.Style
            // inputEditProps.props?.textContent
            inputEditProps.props.id = item.ID;

            // declare input from input props
            const inputEdit = !item?.isEdit
              ? React.createElement("p", {
                  ...inputEditProps.props,
                  dangerouslySetInnerHTML: {
                    __html: inputEditProps.props?.textContent,
                  },
                })
              : React.createElement("input", { ...inputEditProps.props });
            // push input is children to th
            propsTH.props.children.push(inputEdit);
            propsTH.props.className = "item-rows";
            // declare th tag from th props
            // CapID,Index,CoQuanID

            if (defaultViewDetails) {
              if (Step < MaxLevel) {
                if (
                  item?.Content !== "0" &&
                  itemRows.isClick == null &&
                  !item.isEdit
                ) {
                  propsTH.props.onClick = () => {
                    // GetChiTietDonThu(
                    //   item.CapID,
                    //   index,
                    //   item.CoQuanID,
                    //   "set",
                    //   null,
                    //   item.LoaiKhieuToID,
                    //   Step + 1
                    // );
                    // setStep(Step + 1);
                  };
                }
              } else if (Step === MaxLevel) {
                propsTH.props.onClick = () => {
                  GetChiTietThongTinDonThu(itemRows, item);
                };
              }
            }
            const th = React.createElement("td", { ...propsTH.props }, [
              ...propsTH.props.children,
            ]);
            // push th tag to tr
            trProps.props.children.push(th);
          }
        });
      }
      trProps.props.id = itemRows.ID;
      trProps.props["data-id"] = itemRows?.ID;
      // trProps.props['target-id'] = itemRows?.ID;
      trProps.props.className += "trHover";
      /// xử lý nốt vấn đề children của bảng
      // declare tr and push to tbody
      const tr = React.createElement("tr", { ...trProps.props }, [
        ...trProps.props.children,
      ]);
      rootTbody.props.children.push(tr);
    });
  };

  const GetChiTietThongTinDonThu = (itemRows, itemCurrent) => {
    const { DonThuID, XuLyDonID } = itemRows;
    setLoadingDetailsReport(true);
    api
      .ChiTietDonThu({ DonThuID, XuLyDonID })
      .then((res) => {
        setLoadingDetailsReport(false);
        if (res.data.Status > 0) {
          setDataModalDetailsReport(res.data.Data);
          setKeyModalDetailsReport((prevKey) => prevKey + 1);
          setVisibleModalDetailsReport(true);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        setLoadingDetailsReport(false);
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleCloseModalDetails = () => {
    setVisibleModalDetailsReport(false);
    setDataModalDetailsReport({});
    // setKeyModalDetailsReport(prevKey => prevKey+1)
  };

  return (
    <PageWrapper>
      <div className="wrap-top">
        {BieuSo ? (
          <div className="right_code">
            <p>{BieuSo}</p>
          </div>
        ) : null}
        {Title ? (
          <div className="title_report">
            <div className="title_main">
              <p>{Title}</p>
            </div>
            <div className="subtitle_report">
              <p>{SubTitle ? `(${SubTitle})` : null}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={loading ? `loadingDetailsReport wrapper` : "wrapper"}
        id="wrapper"
      >
        <Spin className="table-spin__loading" />
        {Step > 1 ? (
          <div
            style={{
              textAlign: "right",
              marginBottom: 10,
              display: "flex",
              gap: "10px",
              justifyContent: "right",
            }}
            className="wrap-top"
          >
            <Button
              onClick={() => {
                onExport();
              }}
            >
              <ExportOutlined />
              Xuất Excel
            </Button>
            <Button
              onClick={() => {
                onRollBack();
              }}
            >
              <RollbackOutlined />
            </Button>
          </div>
        ) : null}
        <div
          className={"wrapper__table"}
          id={"wrapper__table"}
          style={{
            display: Step === 1 ? "" : "none",
            maxHeight: maxHeightDefault,
          }}
        >
          <table
            key={1}
            id="table"
            className={"table_content"}
            style={{ display: Step === 1 ? "" : "none" }}
          >
            {handleRenderHeaderTreeV2(tableHeader)}
            {beforeRenderTableData(tableData, "rootTbody")}
          </table>
        </div>
        <div
          className={"wrapper__table"}
          id={Step === MaxLevel ? "wrapper__table__step2" : ""}
          style={{ display: Step > 1 ? "" : "none" }}
        >
          {Step > 1 ? (
            <table
              key={2}
              id={Step === MaxLevel ? "table_maxLevel" : "table_step2"}
              className={"table_content"}
              style={{ width: "100%" }}
            >
              {handleRenderHeaderTreeV2(tableHeaderDetail)}
              {beforeRenderTableData(
                tableDataDetail,
                Step === MaxLevel ? "rootTbodyMaxLevel" : "rootTbodyStep2"
              )}
            </table>
          ) : null}
        </div>
      </div>
      <ModalDetailsReport
        visible={visibleModalDetailsReport}
        onCancel={handleCloseModalDetails}
        dataEdit={dataModalDetailsReport}
        key={keyModalDetailsReport}
        DanhSachTenFile={DanhSachTenFile}
      />
    </PageWrapper>
  );
});

export { Table };
