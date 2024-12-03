import React, { useEffect, useState } from "react";
import { Form } from "antd";
import ModalForm from "../../Shared/Modal/ModalForm";
import FormDynamic from "../../Shared/Component/Form";
import { useModal } from "../../../../CustomHook/useModal";
import BoxTable from "../../../../../components/utility/boxTable";
import { FORM, FORMCOL } from "../../../../../settings/constants";
import { Button } from "../../../../../components/uielements/exportComponent";
import AddIcon from "../../../../../components/utility/AddIcon";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import EditIcon from "../../../../../components/utility/EditIcon";
import { useForm } from "../../../../../components/uielements/formValidator";
import { Tooltip, message } from "antd";
import dayjs from "dayjs";
import DynamicTableHeader from "../../Shared/Component/TableHeader";
import ModalKienNghiXuLyViPhamKinhTe from "../Form/Modal/ModalKienNghiXuLyViPhamKinhTe";
import { CapNhatHoSoTaiLieu } from "../../../../../settings/constants";
import { EnumLoaiSoLieu } from "../../../../../settings/constants";
import api, { apiUrl } from "../config";
import DynamicTableBody from "../../Shared/Component/TableBody";
import EyeIcon from "../../../../../components/utility/EyeIcon";
import { Modal as ModalAntd } from "antd";
import { formDataCaller } from "../../../../../api/formDataCaller";
import { removeEmptyChildren } from "./command";
import { addParentPropertyToChildren } from "./command";
import DataTable from "../../Shared/Component/TableV2";
import { styles } from "./style";
import {
  InsertCapToData,
  calculateRowSpans,
  transformData,
  getRowSpan,
  getTextView,
  flattenTree,
  removeTrailingOne,
  addListIDChilds,
  addTotalRow,
} from "./command";
import DownLeftIcon from "../../../../../components/utility/DownLeftIcon";
import { formatNumberStr } from "../../../../../helpers/utility";
const ACTION = {
  ADD: 1,
  EDIT: 2,
  VIEW: 3,
  UPDATE: 4,
};
const FormResult = ({
  form,
  title,
  CuocThanhTraID,
  ListDoiTuong,
  isNotAction,
}) => {
  const [data, setData] = useState({});
  const { showModal, hideModal, stateModal } = useModal();
  const [ListKienNghiXuLy, setListKienNghiXuLy] = useState([]);
  const [ListKetLuan, setListKetLuan] = useState();

  const GetCongBoKL = () => {
    api
      .GetCongBoKL(CuocThanhTraID) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setListKetLuan(res.data.Data); // Set fetched data
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

  const GetListDoiTuong = () => {
    api
      .GetListPagingSoLieuByLoaiSoLieu(
        CuocThanhTraID,
        EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamKinhTe
      )
      .then((res) => {
        if (res.data.Status > 0) {
          setListKienNghiXuLy(res.data.Data);
        } else {
          message.error(res.data.Message);
        }
      });
  };

  const onOK = (data) => {
    const formData = new FormData();
    const listDateRemoved = removeTrailingOne(data.ListDoiTuongXuLy);

    const dataInsert =
      stateModal.action === ACTION.ADD || stateModal.action === ACTION.UPDATE
        ? {
            ...data,
            CuocThanhTraID,
            LoaiSoLieu: EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamKinhTe,
          }
        : listDateRemoved
        ? listDateRemoved
        : [];
    if (dataInsert.ListDoiTuongXuLy) {
      dataInsert.Child = dataInsert.ListDoiTuongXuLy;
      delete dataInsert.ListDoiTuongXuLy;
    }

    const formatChildListDoiTuong = (data) => {
      if (data && data?.length > 0) {
        const newListData = data ? [...data] : [];
        const loopData = (data) => {
          if (data) {
            data.forEach((item, index) => {
              if (item.Child && item.Child?.length > 0) {
                if (index === 0) {
                  item.Child = item.Child.filter((item, index) => index !== 0);
                }
              }
              if (item.Child) {
                loopData(item.Child);
              }
            });
          }
        };
        loopData(newListData);
        return newListData;
      }
    };
    const newListDoiTuongXuLy = formatChildListDoiTuong(dataInsert);

    const newData =
      stateModal.action === ACTION.ADD || stateModal.action === ACTION.UPDATE
        ? dataInsert
        : newListDoiTuongXuLy;
    if (
      stateModal.action === ACTION.ADD ||
      stateModal.action === ACTION.UPDATE
    ) {
      if (newData.Child) {
        newData.Child = newData.Child.filter((item, index) => index !== 0).map(
          (item) => ({
            ...item,
            CapNhapLoaiSoLieuID: newData.CapNhapLoaiSoLieuID,
          })
        );
      }
    }
    formData.append("jsonModel", JSON.stringify(newData));

    const urlApi =
      stateModal.action === ACTION.ADD
        ? apiUrl.InsertCapNhapLoaiSoLieu
        : stateModal.action === ACTION.UPDATE
        ? apiUrl.UpdateCapNhapLoaiSoLieu
        : apiUrl.UpdateChiTietSoLieu;
    formDataCaller(urlApi, formData, {
      type: EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamKinhTe,
    }).then((res) => {
      if (res.data.Status > 0) {
        message.success(res.data.Message);
        hideModal();
        GetListDoiTuong();
      } else {
        message.error(res.data.Message);
      }
    });
  };

  useEffect(() => {
    GetCongBoKL();

    GetListDoiTuong();
  }, []);

  const handleEdit = (record, type) => {
    api
      .GetSoLieuByCapNhapLoaiSoLieuID(getTextView(record.CapNhapLoaiSoLieuID))
      .then((res) => {
        if (res.data.Status > 0) {
          showModal(...res.data.Data, ACTION.UPDATE);
        } else {
          message.error(res.data.Message);
        }
      });
  };

  const handleUpdate = (record, type) => {
    api
      .GetChiTietSoLieuByCapNhapLoaiSoLieuID(
        getTextView(record.CapNhapLoaiSoLieuID)
      )
      .then((res) => {
        if (res.data.Status > 0) {
          showModal({ ListDoiTuongXuLy: res.data.Data }, ACTION.EDIT);
        } else {
          message.error(res.data.Message);
        }
      });
  };
  const handleViewDetail = (record, type) => {
    api
      .GetChiTietSoLieuByCapNhapLoaiSoLieuID(
        getTextView(record.CapNhapLoaiSoLieuID)
      )
      .then((res) => {
        if (res.data.Status > 0) {
          showModal({ ListDoiTuongXuLy: res.data.Data }, ACTION.VIEW);
        } else {
          message.error(res.data.Message);
        }
      });
  };

  const handleDelete = (record, type) => {
    ModalAntd.confirm({
      title: "Bạn có chắc chắn muốn xóa kết luận này không?",
      onOk: () => {
        api
          .DeleteCapNhapSoLieu({
            ListID: [record.CapNhapLoaiSoLieuID],
          })
          .then((res) => {
            if (res.data.Status > 0) {
              message.success(res.data.Message);
              GetListDoiTuong();
            } else {
              message.error(res.data.Message);
            }
          });
      },
    });
  };
  const dataWidthCap = InsertCapToData(ListKienNghiXuLy);
  const dataWithRowSpans = calculateRowSpans(dataWidthCap);
  // const dataTransform = transformData(dataWithRowSpans);
  // Gọi hàm với dữ liệu đầu vào
  const flatData = flattenTree(dataWithRowSpans);
  const updatedFlatData = addListIDChilds(ListKienNghiXuLy, flatData);
  const propertiesToSum = [
    "TongSoTienViPham",
    "ToChuc",
    "CaNhan",
    "TongSoTienKienNghi",
    "SoTienNSNN",
    "SoTienDVTC",
    "XuLyKhac",
  ];
  const totalUpdatedFlatData = addTotalRow(updatedFlatData, propertiesToSum);
  const renderTotal = () => {
    return (
      <tr>
        {totalUpdatedFlatData &&
          totalUpdatedFlatData.map((item) => {
            return (
              item.isTotal && (
                <>
                  <td colspan={2} className="center bold">
                    Tổng cộng
                  </td>
                  <td className="center bold">
                    {item?.totalTongSoTienViPham
                      ? formatNumberStr(item?.totalTongSoTienViPham)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalToChuc
                      ? formatNumberStr(item?.totalToChuc)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalCaNhan
                      ? formatNumberStr(item?.totalCaNhan)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalTongSoTienKienNghi
                      ? formatNumberStr(item?.totalTongSoTienKienNghi)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalSoTienNSNN
                      ? formatNumberStr(item?.totalSoTienNSNN)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalSoTienDVTC
                      ? formatNumberStr(item?.totalSoTienDVTC)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalXuLyKhac
                      ? formatNumberStr(item?.totalXuLyKhac)
                      : null}
                  </td>
                  <td className="center bold"></td>
                </>
              )
            );
          })}
      </tr>
    );
  };

  const renderAction = (record) => {
    return (
      <div className="action-btn">
        {!isNotAction ? (
          <>
            <Tooltip title="Xem chi tiết">
              <EyeIcon onClick={() => handleViewDetail(record, 1)} />
            </Tooltip>
            <Tooltip title="Cập nhật">
              <EditIcon onClick={() => handleEdit(record, 1)} />
            </Tooltip>
          </>
        ) : null}
        <Tooltip title="Cập nhật xử lý">
          <DownLeftIcon onClick={() => handleUpdate(record, 1)} />
        </Tooltip>
        {!isNotAction ? (
          <Tooltip title="Xóa">
            <DeleteIcon onClick={() => handleDelete(record, 1)} />
          </Tooltip>
        ) : null}
      </div>
    );
  };

  const headerData = [
    {
      title: "Kết luận",
      width: "7%",
    },
    {
      title: "Tên tổ chức, cá nhân vi phạm",
      width: "20%",
    },

    {
      title: "Tổng số tiền vi phạm (tiền và tài sản quy thành tiền)",
      children: [
        {
          title: "Tổ chức",
          width: "7%",
        },
        {
          title: "Cá nhân",
          width: "7%",
        },
        {
          title: "Tổng số",
          width: "10%",
        },
      ],
    },

    {
      title: "Số tiền kiến nghị thu hồi (tiền và tài sản quy thành tiền)",
      children: [
        {
          title: "Về ngân sách nhà nước",
          width: "7%",
        },
        {
          title: "Về tổ chức đơn vị",
          width: "7%",
        },
        {
          title: "Tổng số",
          width: "10%",
        },
      ],
    },
    {
      title: "Số tiền kiến nghị xử lý khác",
      width: "10%",
    },
    {
      title: "Chức năng",
      width: "10%",
    },
  ];

  return (
    <div style={styles.formImportContainer}>
      <h2 style={styles.title}>{title}</h2>
      {!isNotAction ? (
        <div className="actions-wrapper">
          <Button
            icon={<AddIcon />}
            onClick={() => showModal(null, 1)}
            type="add-content"
          >
            Thêm nội dung xử lý
          </Button>
        </div>
      ) : null}
      <p className="note">(Tiền: triệu đồng)</p>

      <DataTable
        data={ListKienNghiXuLy}
        onRenderAction={renderAction}
        headerData={headerData}
        onRenderTotal={renderTotal}
      />
      <ModalKienNghiXuLyViPhamKinhTe
        ListDoiTuong={ListDoiTuong}
        ListKetLuan={ListKetLuan}
        visible={stateModal.visible}
        loading={stateModal.loading}
        dataEdit={stateModal.data}
        key={stateModal.key}
        onCancel={hideModal}
        actionType={stateModal.action}
        onData={setData}
        onOk={onOK}
        action={ACTION}
      />
    </div>
  );
};

export default FormResult;
