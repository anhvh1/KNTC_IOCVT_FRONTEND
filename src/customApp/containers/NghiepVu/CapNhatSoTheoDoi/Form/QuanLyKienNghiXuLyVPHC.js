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
import ModalKienNghiXuLyVPHC from "../Form/Modal/ModalKienNghiXuLyViPhamHC";
import { CapNhatHoSoTaiLieu } from "../../../../../settings/constants";
import { EnumLoaiSoLieu } from "../../../../../settings/constants";
import api, { apiUrl } from "../config";
import DynamicTableBody from "../../Shared/Component/TableBody";
import EyeIcon from "../../../../../components/utility/EyeIcon";
import { Modal as ModalAntd } from "antd";
import { formDataCaller } from "../../../../../api/formDataCaller";
import DownLeftIcon from "../../../../../components/utility/DownLeftIcon";
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
import TableKienNghiXuLy from "./TableKienNghiXuLy";
import { formatNumberStr } from "../../../../../helpers/utility";
const ACTION = {
  ADD: 1,
  EDIT: 2,
  VIEW: 3,
  UPDATE: 4,
};
const FormResult = ({ form, title, CuocThanhTraID, ListDoiTuong }) => {
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
        EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamHanhChinh
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
            LoaiSoLieu: EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamHanhChinh,
          }
        : listDateRemoved
        ? listDateRemoved
        : [];

    if (dataInsert.ListDoiTuongXuLy) {
      dataInsert.Child = [...dataInsert.ListDoiTuongXuLy];
      delete dataInsert.ListDoiTuongXuLy;
    }
    if (
      stateModal.action === ACTION.ADD ||
      stateModal.action === ACTION.UPDATE
    ) {
      dataInsert.Child = dataInsert.Child.filter(
        (item) =>
          (item.SoTienXuPhat || item.XuPhatBangHinhThucKhac) &&
          item.DoiTuongID &&
          item.LoaiDoiTuong
      );
    }
    formData.append("jsonModel", JSON.stringify(dataInsert));
    const urlApi =
      stateModal.action === ACTION.ADD
        ? apiUrl.InsertCapNhapLoaiSoLieu
        : stateModal.action === ACTION.UPDATE
        ? apiUrl.UpdateCapNhapLoaiSoLieu
        : apiUrl.UpdateChiTietSoLieu;
    formDataCaller(urlApi, formData, {
      type: EnumLoaiSoLieu.QuanLyKienNghiXuLyViPhamHanhChinh,
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

  // const handleEdit = (record, type) => {
  //   api
  //     .GetChiTietSoLieuByCapNhapLoaiSoLieuID(
  //       getTextView(record.CapNhapLoaiSoLieuID)
  //     )
  //     .then((res) => {
  //       if (res.data.Status > 0) {
  //         showModal({ ListDoiTuongXuLy: res.data.Data }, ACTION.EDIT);
  //       } else {
  //         message.error(res.data.Message);
  //       }
  //     });
  // };

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
            ListID: record?.ListIDChilds
              ? record?.ListIDChilds
              : [getTextView(record.CapNhapLoaiSoLieuID)],
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
    "SoTienXuPhat",
    "SoTienXuPhatDaThu",
    "NoiDungXuPhatKhacDaThu",
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
                  <td className="center bold"></td>
                  <td className="center bold">
                    {item?.totalSoTienXuPhat
                      ? formatNumberStr(item?.totalSoTienXuPhat)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalSoTienXuPhatDaThu
                      ? formatNumberStr(item?.totalSoTienXuPhatDaThu)
                      : null}
                  </td>
                  <td className="center bold">
                    {item?.totalNoiDungXuPhatKhacDaThu
                      ? formatNumberStr(item?.totalNoiDungXuPhatKhacDaThu)
                      : null}
                  </td>
                  <td className="center bold"></td>
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
      width: "10%",
    },
    {
      title: "Quyết định xử phạt",
      width: "10%",
    },
    {
      title: "Tên tổ chức, cá nhân vị phạm",
      width: "20%",
    },
    {
      title: "Hình thức xử phạt vi phạm hành chính",
      children: [
        {
          title: "Bằng tiền",
          children: [
            {
              title: "Số tiền xử phạt",
              width: "10%",
            },
            {
              title: "Số tiền đã thu",
              width: "10%",
            },
          ],
        },
        {
          title: "Bằng hình thức khác",
          width: "10%",
        },
        {
          title: "Đã thực hiện",
          width: "5%",
        },
      ],
    },

    {
      title: "Chức năng",
      width: "15%",
    },
  ];

  const checkTotal = (record) => record.isTotal;

  return (
    <div style={styles.formImportContainer}>
      <h2 style={styles.title}>{title}</h2>
      <div className="actions-wrapper">
        <Button
          icon={<AddIcon />}
          onClick={() => showModal(null, 1)}
          type="add-content"
        >
          Thêm nội dung xử lý
        </Button>
      </div>
      <p className="note">(Tiền: triệu đồng)</p>

      <TableKienNghiXuLy
        data={ListKienNghiXuLy}
        onRenderAction={renderAction}
        headerData={headerData}
        onRenderTotal={renderTotal}
      />

      <ModalKienNghiXuLyVPHC
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
        isNotAction={isNotAction}
      />
    </div>
  );
};

export default FormResult;
