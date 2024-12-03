import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useKey } from "../../../../CustomHook/useKey";
import { Table, Select, Input, Space, Tooltip, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "../../../../../components/uielements/exportComponent";
import BoxTable from "../../../../../components/utility/boxTable";
import api, { apiUrl } from "../config";
import dayjs from "dayjs";
import { styles } from "./style";
import AddIcon from "../../../../../components/utility/AddIcon";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import EyeIcon from "../../../../../components/utility/EyeIcon";
import Pencil from "../../../../../components/utility/PenCilIcon2";
import DownLeftIcon from "../../../../../components/utility/DownLeftIcon";
import ModalAdd from "./Modal/modalAddTDKhac";
import ModalEdit from "./Modal/modalEdit";
import ModalChiTiet from "./Modal/ModalChiTietTDKhac";
import ModalTienDat from "./Modal/modalRKN";
import { formDataCaller } from "../../../../../api/formDataCaller";
const FormMember = ({ form, title, CuocThanhTraID }) => {
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [capNhapLoaiSoLieuID, setCapNhapLoaiSoLieuID] = useState(null);
  useEffect(() => {
    fetchData();
  }, [CuocThanhTraID]);
  const [visibleModalTienDat, setVisibleModalTienDat] = useState(false);

  const fetchData = () => {
    api
      .GetListPagingSoLieuByLoaiSoLieu(CuocThanhTraID, 2) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setData(res.data.Data); // Set fetched data
        } else {
          message.destroy();
          message.error(res.data.Message); // Error message if the API response fails
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString()); // Catch any API errors
      });
  };

  // ... existing code ...

  // const renderTable = () => {
  //   return (
  //     <table style={styles.customTable}>
  //       <thead>
  //         <tr>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} rowSpan={2}>
  //             Kết luận
  //           </th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} rowSpan={2}>
  //             Lĩnh vực
  //           </th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} rowSpan={2}>
  //             Đơn vị, cá nhân bị xử lý
  //           </th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} colSpan={3}>
  //             Tiền
  //           </th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} colSpan={3}>
  //             Đất
  //           </th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }} rowSpan={2}>
  //             Chức năng
  //           </th>
  //         </tr>
  //         <tr>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Nội dung xử lý</th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Số tiền phải thu</th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Số tiền đã thu</th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Nội dung xử lý</th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Số đất phải thu</th>
  //           <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Số đất đã thu</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((item, index) => {
  //           let rowIndex = 0;
  //           return item.Child.map((capNhap, capNhapIndex) => {
  //             const detailsCount = capNhap.Child.length; // Count of child items
  //             rowIndex++;
  //             return capNhap.Child.map((childItem, childIndex) => (
  //               <tr key={`${index}-${capNhapIndex}-${childIndex}`} style={rowIndex % 2 === 0 ? styles.tableRowEven : {}}>
  //                 {childIndex === 0 && (
  //                   <>
  //                     <td style={styles.tableCell} rowSpan={detailsCount}>
  //                       {item.SoVanBan}
  //                     </td>
  //                     <td style={styles.tableCell} rowSpan={detailsCount}>
  //                       {item.TenLoaiThanhTra}
  //                     </td>
  //                   </>
  //                 )}
  //                 <td style={styles.tableCell}>{childItem.TenDoiTuong}</td>
  //                 <td style={styles.tableCell}>{childItem.NoiDung}</td>
  //                 <td style={styles.tableCell}>{formatNumber(childItem.SoTienPhaiThu) || 0}</td>
  //                 <td style={styles.tableCell}>{formatNumber(childItem.SoTienDaThu) || 0}</td>
  //                 <td style={styles.tableCell}>{childItem.NoiDung}</td>
  //                 <td style={styles.tableCell}>{formatNumber(childItem.SoDatPhaiThu) || 0}</td>
  //                 <td style={styles.tableCell}>{formatNumber(childItem.SoDatDaThu) || 0}</td>
  //                 <td style={{ ...styles.tableCell, whiteSpace: "nowrap" }}>
  //                   <Space size="middle">
  //                     <Tooltip title="Xem chi tiết">
  //                       <EyeIcon onClick={() => showModalChiTiet(capNhap.CapNhapLoaiSoLieuID)} />
  //                     </Tooltip>
  //                     <Tooltip title="Cập nhật">
  //                       <Pencil onClick={() => {
  //                         showModalEditSoLieu(capNhap.CapNhapLoaiSoLieuID);
  //                         setCapNhapLoaiSoLieuID(capNhap.CapNhapLoaiSoLieuID);
  //                       }} />
  //                     </Tooltip>
  //                     <Tooltip title="Cập nhật thu hồi">
  //                       <DownLeftIcon onClick={() => showModalEdit(capNhap.CapNhapLoaiSoLieuID)} />
  //                     </Tooltip>
  //                     <Tooltip title="Xóa">
  //                       <DeleteIcon onClick={() => deleteModalAddEdit(capNhap.CapNhapLoaiSoLieuID)} />
  //                     </Tooltip>
  //                   </Space>
  //                 </td>
  //               </tr>
  //             ));
  //           });
  //         })}
  //       </tbody>
  //     </table>
  //   );
  // };
  const renderTable = () => {
    return (
      <table style={styles.customTable}>
        <thead>
          <tr>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Kết luận
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Lĩnh vực chính
            </th>
            {/* <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Quyết định thu hồi
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Thời hạn
            </th> */}
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Đơn vị, cá nhân bị xử lý
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              colSpan={3}
            >
              Tiền
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              colSpan={3}
            >
              Đất
            </th>
            <th
              style={{ ...styles.tableCell, ...styles.tableHeader }}
              rowSpan={2}
            >
              Chức năng
            </th>
          </tr>
          <tr>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Nội dung
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Số tiền phải thu
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Số tiền đã thu
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Nội dung
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Số đất phải thu
            </th>
            <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
              Số đất đã thu
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            let rowIndex = 0;
            return item.Child.map((capNhap, capNhapIndex) => {
              const detailsCount = capNhap.Child.length;
              const rows = capNhap.Child.map((detail, detailIndex) => {
                const isFirstRow = detailIndex === 0;
                rowIndex++;
                return (
                  <tr
                    key={`${index}-${capNhapIndex}-${detailIndex}`}
                    style={rowIndex % 2 === 0 ? styles.tableRowEven : {}}
                  >
                    {isFirstRow && capNhapIndex === 0 && (
                      <>
                        <td
                          style={styles.tableCell}
                          rowSpan={item.Child.reduce(
                            (sum, cn) => sum + cn.Child.length,
                            0
                          )}
                        >
                          {item.SoVanBan}
                        </td>
                        <td
                          style={styles.tableCell}
                          rowSpan={item.Child.reduce(
                            (sum, cn) => sum + cn.Child.length,
                            0
                          )}
                        >
                          {item.TenLoaiThanhTra}
                        </td>
                      </>
                    )}
                    {/* {isFirstRow && (
                      <>
                        <td style={styles.tableCell} rowSpan={detailsCount}>
                          {capNhap.QuyetDinhThuHoi}
                        </td>
                        <td style={styles.tableCell} rowSpan={detailsCount}>
                          {dayjs(capNhap.ThoiHan).format("DD/MM/YYYY")}
                        </td>
                      </>
                    )} */}
                    <td style={styles.tableCell}>{detail.TenDoiTuong}</td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.NoiDung) || 0}
                    </td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.SoTienPhaiThu) || 0}
                    </td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.SoTienDaThu) || 0}
                    </td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.NoiDung) || 0}
                    </td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.SoDatPhaiThu) || 0}
                    </td>
                    <td style={styles.tableCell}>
                      {formatNumber(detail.SoDatDaThu) || 0}
                    </td>
                    {isFirstRow && (
                      <td
                        style={{ ...styles.tableCell, whiteSpace: "nowrap" }}
                        rowSpan={detailsCount}
                      >
                        <Space size="middle">
                          <Tooltip title="Xem chi tiết">
                            <EyeIcon
                              onClick={() =>
                                showModalChiTiet(capNhap.CapNhapLoaiSoLieuID)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Cập nhật">
                            <Pencil
                              onClick={() => {
                                showModalEditSoLieu(
                                  capNhap.CapNhapLoaiSoLieuID
                                );
                                setCapNhapLoaiSoLieuID(
                                  capNhap.CapNhapLoaiSoLieuID
                                );
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Cập nhật thu hồi">
                            <DownLeftIcon
                              onClick={() =>
                                showModalEdit(capNhap.CapNhapLoaiSoLieuID)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <DeleteIcon
                              onClick={() =>
                                deleteModalAddEdit(capNhap.CapNhapLoaiSoLieuID)
                              }
                            />
                          </Tooltip>
                        </Space>
                      </td>
                    )}
                  </tr>
                );
              });
              return rows;
            });
          })}
        </tbody>
      </table>
    );
  };
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
  };
  const [dataModalEditTienDat, setDataModalEditTienDat] = useState({});

  const showModalEditSoLieu = (capNhapLoaiSoLieuID) => {
    setAction("editSoLieu");
    api
      .GetSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalTienDat(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
    api
      .GetCapNhapSoLieuByID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalEditTienDat(res.data.Data.Data);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalChiTiet, setVisibleModalChiTiet] = useState(false);

  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [dataModalChiTiet, setDataModalChiTiet] = useState({});

  const hideModalAddEdit = () => {
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
    setVisibleModalEdit(false);
    setVisibleModalChiTiet(false);
    setVisibleModalTienDat(false);
  };
  const showModalEdit = (capNhapLoaiSoLieuID) => {
    setAction("edit");
    api
      .GetChiTietSoLieuByCapNhapLoaiSoLieuID(capNhapLoaiSoLieuID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
          setVisibleModalEdit(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const showModalChiTiet = (capNhapLoaiSoLieuID) => {
    setAction("chitiet2");
    api
      .GetThongTinQuyetDinh(capNhapLoaiSoLieuID, 2)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalChiTiet(res.data.Data);
          inceaseModalKey();
          setVisibleModalChiTiet(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const showModalAdd = () => {
    setAction("addkhac");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };
  const submitModalAddEdit = (data, CapNhapChiTietSoLieuID) => {
    setConfirmLoading(true);

    if (action === "addkhac") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.InsertCapNhapLoaiSoLieu}?type=2`, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success("Thêm thành công");
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "edit") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));

      // formDataCaller(`${apiUrl.UpdateChiTietSoLieu}?type=2&deleteIDstr=${JSON.stringify(CapNhapChiTietSoLieuID)}`, formSave)
      formDataCaller(
        `${apiUrl.UpdateChiTietSoLieu}?type=2${
          CapNhapChiTietSoLieuID
            ? `&deleteIDstr=${JSON.stringify(CapNhapChiTietSoLieuID)}`
            : ""
        }`,
        formSave
      )
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success(response.data.Message);
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "editSoLieu") {
      const formSave = new FormData();
      // formSave.append("files", FileData);
      formSave.append("jsonModel", JSON.stringify(data));

      formDataCaller(`${apiUrl.UpdateCapNhapLoaiSoLieu}?type=2`, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            hideModalAddEdit();
            fetchData();
            message.success("Sửa thành công");
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const deleteModalAddEdit = (CapNhapLoaiSoLieuID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa dữ liệu này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .DeleteCapNhapSoLieu({ ListID: [CapNhapLoaiSoLieuID] })
          .then((res) => {
            if (res.data.Status > 0) {
              fetchData();
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };
  return (
    <div style={styles.formImportContainer}>
      <h2 style={styles.title}>{title}</h2>
      <div className="actions-wrapper">
        <Button type="add-content" icon={<AddIcon />} onClick={showModalAdd}>
          Thêm mới nội dung xử lý
        </Button>
      </div>
      {renderTable()}
      <ModalTienDat
        visible={visibleModalTienDat}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        dataModalEditTienDat={dataModalEditTienDat}
        capNhapLoaiSoLieuID={capNhapLoaiSoLieuID}
      />
      <ModalAdd
        visible={visibleModalAddEdit}
        // dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
      />
      <ModalEdit
        visible={visibleModalEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
      />
      <ModalChiTiet
        visible={visibleModalChiTiet}
        dataEdit={dataModalChiTiet}
        loading={confirmLoading}
        key={modalKey}
        CuocThanhTraID={CuocThanhTraID}
        onCancel={hideModalAddEdit}
        action={action}
      />
    </div>
  );
};

export default FormMember;