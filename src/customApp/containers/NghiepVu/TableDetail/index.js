import {Modal, Table, Tooltip, message, DatePicker} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DanhMucDanToc/action';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ChiTietDonThu from './ChiTietDonThu';
const TableDetail = (props) => {
  document.title = 'Xử lý đơn thư';
  const {filterData, setFilterData} = props;

  useEffect(() => {
    const fakeColumns = [
      {
        id: 0,
        report: null,
        kind: '',
        name: 'STT',
        index: 0,
        parentID: null,
        friendlyName: '',
        parent: '',
        onChart: null,
        style: null,
      },
      {
        id: 2,
        report: null,
        kind: '',
        name: 'Chỉ tiêu',
        parentID: null,
        index: 1,
        friendlyName: '',
        parent: 'STT',
        onChart: true,
        style: null,
      },
      {
        id: 3,
        report: null,
        parentID: 0,
        kind: '',
        name: 'KH',
        index: 2,
        friendlyName: '',
        onChart: true,
        style: null,
      },
      {
        id: 3,
        report: null,
        parentID: 2,
        kind: '',
        name: 'KH',
        index: 2,
        friendlyName: '',
        parent: 'Chỉ tiêu',
        onChart: true,
        style: null,
      },
      {
        id: 4,
        report: null,
        parentID: 3,
        kind: '',
        name: 'Thực hiện Tháng 8',
        index: 3,
        friendlyName: '',
        parent: 'KH',
        onChart: true,
        style: null,
      },
      {
        id: 5,
        report: null,
        parentID: 3,
        kind: '',
        name: 'Thực hiện Tháng 9',
        index: 3,
        friendlyName: '',
        parent: 'KH',
        onChart: true,
        style: null,
      },
      {
        id: 6,
        report: null,
        parentID: 5,
        kind: '',
        name: 'Thực hiện Tháng 7',
        index: 3,
        friendlyName: '',
        parent: 'Thực hiện Tháng 9',
        onChart: true,
        style: null,
      },
      {
        id: 7,
        report: null,
        parentID: 6,
        kind: '',
        name: 'Thực hiện Tháng 6',
        index: 3,
        friendlyName: '',
        parent: 'Thực hiện Tháng 7',
        onChart: true,
        style: null,
      },
      {
        id: 2,
        report: null,
        kind: '',
        name: 'Chỉ tiêu 2',
        parentID: null,
        index: 1,
        friendlyName: '',
        parent: 'STT',
        onChart: true,
        style: null,
      },
    ];

    // handle array from api to create tree header table dynamic table
    const listFormatChild = [];
    const formatTreeColumns = (list) => {
      if (list && list.length) {
        const handleLoopThroughTree = (listItem, key, object) => {
          listItem.forEach((item) => {
            if (item.parentID === key) {
              if (!(object.dataChild && object.dataChild.length)) {
                object.dataChild = [];
              }
              const checkContainsObjectDataChild = object.dataChild.filter(
                (itemChild) => itemChild.id === item.id,
              );
              if (!checkContainsObjectDataChild.length) {
                object.dataChild.push(item);
              }
            } else {
            }
          });
        };

        const createTree = (listTree, item, key) => {
          if (item && key) {
            handleLoopThroughTree(listTree, key, item);
          } else {
            listTree.forEach((itemTree) => {
              const obj = {
                ...itemTree,
                dataChild: [],
              };
              const findChilds = listTree.filter(
                (itemChilds) => itemTree.id === itemChilds.parentID,
              );
              // const findChilds = listTree.filter(itemChilds =>  itemTree.name === itemChilds.parent)  // check by name and parent
              if (findChilds.length) {
                findChilds.forEach((itemChilds) => {
                  // const newItemChilds = {...itemChilds}
                  // itemChilds.indexParent = itemTree.id
                  obj.dataChild.push(itemChilds);
                });
                findChilds.forEach((itemChild) => {
                  const ListisParnet = listTree.filter(
                    (itemisParent) => itemChild.id === itemisParent.parentID,
                  );
                  if (ListisParnet && ListisParnet.length) {
                    // createTree(ListisParnet,itemChild,itemChild.name) // check by name and parent
                    createTree(ListisParnet, itemChild, itemChild.id);
                  }
                });
                if (!itemTree.parentID && itemTree.parentID !== 0) {
                  listFormatChild.push(obj);
                }
              } else {
                if (!itemTree.parentID && itemTree.parentID !== 0) {
                  listFormatChild.push(obj);
                }
              }
            });
          }
        };
        createTree(list);
      }
    };
    // formatTreeColumns(fakeColumns)

    const formatListTree = (list, Cap = 0) => {
      Cap++;
      list.forEach((item, index) => {
        if (item.dataChild) {
          item.Cap = Cap;
        } else {
          item.Cap = Cap;
        }
        if (index === list.length - 1) {
          const findChilds = list.filter((item) => item.dataChild);
          Cap + 1;
          findChilds.forEach((item) => {
            formatListTree(item.dataChild, Cap);
          });
        }
      });
    };
    // formatListTree(listFormatChild)
  }, []);

  const {
    DanhSachDanToc,
    TotalRow,
    role,
    step,
    setStep,
    handleDetailRowTable,
    columns,
    dataTable,
    PageNumber,
    PageSize,
    onTableChange,
    rowSelection,
  } = props;

  return (
    <>
      {!filterData?.step ? (
        <>
          <BoxTable
            onRow={(record, rowIndex) => {
              return {
                onClick: (event, event1) =>
                  handleDetailRowTable(record, rowIndex), // click row
              };
            }}
            rowSelection={
              rowSelection
                ? {
                    type: 'radio',
                    ...rowSelection,
                  }
                : null
            }
            columns={columns}
            dataSource={dataTable}
            onChange={onTableChange}
            pagination={{
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
              total: TotalRow,
              current: PageNumber,
              pageSize: PageSize,
            }}
          />
        </>
      ) : parseInt(filterData.step) === 2 ? (
        <ChiTietDonThu
          setFilterData={setFilterData}
          filterData={filterData}
          setStep={setStep}
        />
      ) : (
        <></>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDanToc,
    role: getRoleByKey(state.Auth.role, 'quan-ly-nam-hoc'),
  };
}

export default connect(mapStateToProps, actions)(TableDetail);
