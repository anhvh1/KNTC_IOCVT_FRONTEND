import React, { useEffect, useState, useRef } from "react";
import {
  CapHanhChinh,
  DATACONFIG,
  ITEM_LAYOUT,
  NGUONDONDEN,
  REQUIRED,
} from "../../../../../settings/constants";
import {
  Form,
  Radio,
  Row,
  Col,
  Tooltip,
  Modal as ModalAnt,
  Popover,
  message,
  Tabs,
  Input as InputAnt,
  InputNumber,
  Checkbox,
  Spin,
  // Collapse,
} from "antd";
import {
  DatePicker,
  Collapse,
} from "../../../../../components/uielements/exportComponent";
import { LoaiFileDinhKem } from "../../../../../settings/constants";
import {
  Button,
  Modal,
  Input,
  Select,
  // Radio,
  Option,
  Textarea,
} from "../../../../../components/uielements/exportComponent";
import {
  formatDate,
  getConfigLocal,
  getLocalKey,
  getValueConfigLocalByKey,
  renderContentDownload,
} from "../../../../../helpers/utility";
import { InputFormatSpecific } from "../../../../../components/uielements/exportComponent";
import api from "../config";
import Wrapper from "./ModalStyle/ModalTiepDanCacBanNganh.styled";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileAddFilled,
  PlusOutlined,
  PrinterOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ModalAddEditHoSoTaiLieu from "../../Shared/Modal/ModalAddEditFileTaiLieu";
import { _debounce } from "../../../../../helpers/utility";
import dayjs from "dayjs";
import moment from "moment";
import { debounce } from "lodash";
import ModalKiemTraTrung from "./modalKiemTraTrung";
import { handleChangeTinhHuyenXaDoiTuongKhieuNai } from "../../SoTiepDan/until";
import { CapID } from "../../../../../settings/constants";
const { Item, useForm } = Form;

export default (props) => {
  const {
    dataEdit,
    loading,
    DanhSachLoaiKhieuTo,
    DanhSachQuocTich,
    DanhSachDanToc,
    DanhSachTinh,
    loadingSave,
  } = props;
  const [form] = useForm();
  const TinhTrienKhai = getConfigLocal("tinhTrienKhai");
  const user = getValueConfigLocalByKey("user");
  const TenHuyenDefault =
    user?.CapHanhChinh === CapHanhChinh.CapUBNDHuyen ||
    user.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen ||
    user?.CapHanhChinh === CapHanhChinh.CapUBNDXa ||
    CapHanhChinh.CapPhongThuocXa
      ? user?.TenHuyen
        ? user?.TenHuyen
        : null
      : null;
  const TenXaDefault =
    user?.CapID === CapID.CapUBNDXa ? (user?.TenXa ? user?.TenXa : null) : null;
  const HuyenIDDefault =
    user?.CapHanhChinh === CapHanhChinh.CapUBNDHuyen ||
    user.CapHanhChinh === CapHanhChinh.CapPhongThuocHuyen ||
    user?.CapHanhChinh === CapHanhChinh.CapUBNDXa ||
    CapHanhChinh.CapPhongThuocXa
      ? user?.HuyenID
        ? user?.HuyenID
        : null
      : null;
  const XaIDDefault =
    user?.CapHanhChinh === CapHanhChinh.CapUBNDXa ||
    user.CapHanhChinh === CapHanhChinh.CapPhongThuocXa
      ? user?.XaID
        ? user?.XaID
        : null
      : null;
  const DanToc = getConfigLocal("DanToc")
    ? Number(getConfigLocal("DanToc"))
    : null;
  const QuocTich = getConfigLocal("QuocTich")
    ? Number(getConfigLocal("QuocTich"))
    : null;
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  const [DataModalHoSoTaiLieu, setDataModalHoSoTaiLieu] = useState({});
  const [DanhSachHoSoTaiLieu, setDanhSachHoSoTaiLieu] = useState([]);
  const [keyModalHoSoTaiLieu, setKeyModalHoSoTaiLieu] = useState(0);

  const [DanhSachHoSoTaiLieuCQGiaiQuyet, setDanhSachHoSoTaiLieuCQGiaiQuyet] =
    useState([]);
  const [DanhSachHoSoTaiLieuKQTIep, setDanhSachHoSoTaiLieuKQTIep] = useState(
    []
  );
  const [DanhSachHoSoTaiLieuKQGiaiQuyet, setDanhSachHoSoTaiLieuKQGiaiQuyet] =
    useState([]);
  const [DanhSachChiTietKhieuTo, setDanhSachChiTietKhieuTo] = useState([]);
  const [DanhSachHuyenKhieuNai, setDanhSachHuyenKhieuNai] = useState([]);
  const [DanhSachXaKhieuNai, setDanhSachXaKhieuNai] = useState([]);
  const [DanhSachChiTietKhieuTo2, setDanhSachChiTietKhieuTo2] = useState([]);
  const [DanhSachChiTietKhieuTo3, setDanhSachChiTietKhieuTo3] = useState([]);
  const [DanhSachHuyenDonThu, setDanhSachHuyenDonThu] = useState([]);
  const [DanhSachXaDonThu, setDanhSachXaDonThu] = useState([]);
  const [DanhSachHuyenKhieuNai2, setDanhSachHuyenKhieuNai2] = useState([]);
  const [DanhSachXaKhieuNai2, setDanhSachXaKhieuNai2] = useState([]);
  const [visibleModalHoSoTaiLieu, setVisibleModalHoSoTaiLieu] = useState(false);
  const [dataModalKiemTraTrung, setdataModalKiemTraTrung] = useState({});
  const [visibleModalKiemTraTrung, setVisibleModalKiemTraTrung] =
    useState(false);
  const [keyModalKiemTraTrung, setKeyModalKiemTraTrung] = useState(0);
  const [DanhSachSoNguoiDaiDien, setDanhSachSoNguoiDaiDien] = useState([]);
  const [NguonDonDen, setNguonDonDen] = useState([]);
  const [NhomKN, setNhomKN] = useState({
    LoaiDoiTuongKNID: 1,
  });
  const [DanhSachDoiTuongKN, setDanhSachDoiTuongKN] = useState([{}]);
  const infoDefaultDoiTuongBiKN = {
    LoaiDoiTuongBiKNID: dataEdit.DoiTuongBiKN?.LoaiDoiTuongBiKNID
      ? dataEdit.DoiTuongBiKN?.LoaiDoiTuongBiKNID
      : 1,
    TinhID: Number(TinhTrienKhai),
    TenTinh: DanhSachTinh?.find(
      (item) => item?.TinhID === Number(TinhTrienKhai)
    )?.TenTinh,
    TenHuyen: TenHuyenDefault,
    TenXa: TenXaDefault,
    HuyenID: HuyenIDDefault,
    XaID: XaIDDefault,
  };
  const [DoiTuongBiKN, setDoiTuongBiKN] = useState({
    DanhSachDoiTuongBiKN: [],
  });
  const [currentKey, setCurrentKey] = useState(["1", "2", "3", "4", "5", "6"]);

  const [ThanhPhanThamGia, setThanhPhanThamGia] = useState([]);

  const TenTinh = DanhSachTinh?.find(
    (item) => item.TinhID === Number(TinhTrienKhai)
  )?.TenTinh;

  const isCapXa = getLocalKey("user")?.CapID === 3;

  useEffect(() => {
    if (
      (dataEdit && dataEdit.TiepDanKhongDonID) ||
      (dataEdit && dataEdit.XuLyDonID)
    ) {
      handleSetFieldsData(dataEdit);
    } else {
      handleSetDefaultFields(1);
    }
    if (dataEdit?.isReload) {
      handleChangeTinh(Number(TinhTrienKhai), 3, 1);
      handleChangeTinh(Number(TinhTrienKhai), 2, 1);
    }
  }, [dataEdit]);

  // useEffect(() => {
  //   handleSetDefaultFields(1);
  // }, [dataEdit]);

  const handleSetFieldsData = (dataEdit) => {
    const newData = {};
    const { NhomKN } = dataEdit;
    const DanhSachDoiTuongKN = NhomKN?.DanhSachDoiTuongKN
      ? [...NhomKN?.DanhSachDoiTuongKN]
      : [];
    if (DanhSachDoiTuongKN && !dataEdit?.isNotReload) {
      const newDanhSachDoiTuongKhieuNai = DanhSachDoiTuongKN?.map(
        (item, index) => {
          for (const key in item) {
            if (key === "NgayCap") {
              newData[`${key}${index}`] = item[key] ? dayjs(item[key]) : null;
            } else {
              newData[`${key}${index}`] = item[key];
            }
          }
          if (item.TinhID) {
            api.GetAllHuyen({ TinhID: item.TinhID }).then((res) => {
              if (res.data.Status > 0) {
                newDanhSachDoiTuongKhieuNai[index].DanhSachHuyen =
                  res.data.Data;
                return {
                  ...item,
                  DanhSachHuyen: res.data.Data,
                };
              }
            });
          }
          if (item.HuyenID) {
            let DanhSachXa;
            api.GetAllXa({ HuyenID: item.HuyenID }).then((res) => {
              if (res.data.Status > 0) {
                DanhSachXa = res.data.Data;
                newDanhSachDoiTuongKhieuNai[index].DanhSachXa = res.data.Data;
                return {
                  ...item,
                  DanhSachXa,
                };
              }
            });
          }
          return {
            ...item,
          };
        }
      );
      setDanhSachDoiTuongKN(
        newDanhSachDoiTuongKhieuNai ? newDanhSachDoiTuongKhieuNai : [{}]
      );
    }
    const DanhSachDoiTuongBiKN = dataEdit?.DanhSachDoiTuongBiKN
      ? [...dataEdit?.DanhSachDoiTuongBiKN]
      : [];
    setDoiTuongBiKN({
      ...DoiTuongBiKN,
      DanhSachDoiTuongBiKN: DanhSachDoiTuongBiKN,
    });
    // if (DanhSachDoiTuongBiKN && !dataEdit?.isNotReload) {
    //   const newDanhSachDoiTuongBiKN = DanhSachDoiTuongBiKN?.map(
    //     (item, index) => {
    //       for (const key in item) {
    //         if (key === 'NgayCap') {
    //           newData[`${key}${index}`] = item[key] ? dayjs(item[key]) : null;
    //         } else {
    //           newData[`${key}${index}`] = item[key];
    //         }
    //       }
    //       if (item.TinhID) {
    //         api.GetAllHuyen({ TinhID: item.TinhID }).then((res) => {
    //           if (res.data.Status > 0) {
    //             newDanhSachDoiTuongBiKN[index].DanhSachHuyen = res.data.Data;
    //             return {
    //               ...item,
    //               DanhSachHuyen: res.data.Data,
    //             };
    //           }
    //         });
    //       }

    //       if (item.HuyenID) {
    //         let DanhSachXa;
    //         api.GetAllXa({ HuyenID: item.HuyenID }).then((res) => {

    //           if (res.data.Status > 0) {
    //             DanhSachXa = res.data.Data;
    //             newDanhSachDoiTuongBiKN[index].DanhSachXa = res.data.Data;
    //             return {
    //               ...item,
    //               DanhSachXa,
    //             };
    //           }
    //         });
    //       }
    //       return {
    //         ...item,
    //       };
    //     },
    //   );

    //   setDoiTuongBiKN({
    //     ...DoiTuongBiKN,
    //     IsNhapThongTin: true,
    //     DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKN,
    //   });
    // }
    if (dataEdit?.TinhID) {
      handleChangeTinh(dataEdit?.TinhID, 2, 1);
    }
    if (dataEdit?.HuyenID) {
      handleChangeTinh(dataEdit?.HuyenID, 2, 2);
    }
    if (dataEdit?.DoiTuongBiKN?.TinhID) {
      handleChangeTinh(dataEdit?.DoiTuongBiKN?.TinhID, 3, 1);
    }
    if (dataEdit?.DoiTuongBiKN?.HuyenID) {
      handleChangeTinh(dataEdit?.DoiTuongBiKN?.HuyenID, 3, 2);
    }
    if (dataEdit?.LoaiKhieuTo1ID) {
      handleChiTietLoaiKhieuTo(dataEdit?.LoaiKhieuTo1ID, 1);
    }
    if (dataEdit?.LoaiKhieuTo2ID) {
      handleChiTietLoaiKhieuTo(dataEdit?.LoaiKhieuTo1ID, 2);
    }
    if (dataEdit?.LoaiKhieuTo3ID) {
      handleChiTietLoaiKhieuTo(dataEdit?.LoaiKhieuTo2ID, 3);
    }
    // if (dataEdit?.DoiTuongBiKN?.TenDoiTuongBiKN) {
    //   setDoiTuongBiKN({...dataEdit?.DoiTuongBiKN, IsNhapThongTin: true});
    // }
    if (dataEdit.NhomKN?.SoLuong) {
      CheckSoNguoiDaiDien(dataEdit.NhomKN?.SoLuong);
    }
    setThanhPhanThamGia(
      dataEdit?.ThanhPhanThamGia ? dataEdit?.ThanhPhanThamGia : []
    );
    const mappingDanhSachFileDinhKemID = (data) => {
      if (data) {
        const newData = [...data];
        return newData.map((item) => {
          const DanhSachFileDinhKemID = [];
          if (item.FileDinhKem) {
            item.FileDinhKem.forEach((file) =>
              DanhSachFileDinhKemID.push(file.FileID)
            );
          }
          return { ...item, DanhSachFileDinhKemID: DanhSachFileDinhKemID };
        });
      }
    };

    const dataDanhSachHoSoTaiLieu = dataEdit.DanhSachHoSoTaiLieu
      ? mappingDanhSachFileDinhKemID(dataEdit.DanhSachHoSoTaiLieu)
      : [];
    const dataDanhSachHoSoTaiLieuCQGQ = dataEdit.FileCQGiaiQuyet
      ? mappingDanhSachFileDinhKemID(dataEdit.FileCQGiaiQuyet)
      : [];
    const dataDanhSachHoSoTaiLieuKQGQ = dataEdit.FileKQGiaiQuyet
      ? mappingDanhSachFileDinhKemID(dataEdit.FileKQGiaiQuyet)
      : [];
    const dataDanhSachHoSoTaiLieuKQT = dataEdit.FileKQTiep
      ? mappingDanhSachFileDinhKemID(dataEdit.FileKQTiep)
      : [];
    setDanhSachHoSoTaiLieu(
      dataDanhSachHoSoTaiLieu ? dataDanhSachHoSoTaiLieu : []
    );
    setDanhSachHoSoTaiLieuCQGiaiQuyet(
      dataDanhSachHoSoTaiLieuCQGQ ? dataDanhSachHoSoTaiLieuCQGQ : []
    );
    setDanhSachHoSoTaiLieuKQGiaiQuyet(
      dataDanhSachHoSoTaiLieuKQGQ ? dataDanhSachHoSoTaiLieuKQGQ : []
    );
    setDanhSachHoSoTaiLieuKQTIep(
      dataDanhSachHoSoTaiLieuKQT ? dataDanhSachHoSoTaiLieuKQT : []
    );

    setNhomKN(dataEdit?.NhomKN);
    form &&
      form.setFieldsValue({
        ...newData,
        ...dataEdit,
        ...dataEdit?.NhomKN,
        ...dataEdit?.DoiTuongBiKN,
        TinhID: dataEdit?.TinhID,
        HuyenID: dataEdit?.HuyenID,
        SoNguoiDaiDien: dataEdit.NhomKN?.DanhSachDoiTuongKN?.length,
        XaID: dataEdit?.XaID,
        DiaChiCTDoiTuongBiKN: dataEdit?.DoiTuongBiKN?.DiaChiCT,
        LoaiDoiTuongKNID: dataEdit?.NhomKN?.LoaiDoiTuongKNID,
        NgayVietDon: dataEdit?.NgayVietDon
          ? dayjs(dataEdit?.NgayVietDon)
          : null,
        TrangThai: dataEdit?.TrangThai ? 1 : 0,
        // TinhIDDoiTuongBiKN: dataEdit?.DoiTuongBiKN?.TinhID
        //   ? dataEdit?.DoiTuongBiKN?.TinhID
        //   : null,
        // HuyenIDDoiTuongBiKN: dataEdit?.DoiTuongBiKN?.HuyenID
        //   ? dataEdit?.DoiTuongBiKN?.HuyenID
        //   : null,
        // XaIDDoiTuongBiKN: dataEdit?.DoiTuongBiKN?.XaID
        //   ? dataEdit?.DoiTuongBiKN?.XaID
        //   : null,
        NgayTiep: dataEdit?.NgayTiep ? dayjs(dataEdit?.NgayTiep) : null,
        NgayNhapDon: dataEdit?.NgayNhapDon
          ? dayjs(dataEdit?.NgayNhapDon)
          : null,
        NgayBanHanhQuyetDinhGiaiQuyet: dataEdit?.NgayBanHanhQuyetDinhGiaiQuyet
          ? dayjs(dataEdit?.NgayBanHanhQuyetDinhGiaiQuyet)
          : null,
        NgayBanHanhQuyetDinhDaGiaiQuyet:
          dataEdit?.NgayBanHanhQuyetDinhDaGiaiQuyet
            ? dayjs(dataEdit?.NgayBanHanhQuyetDinhDaGiaiQuyet)
            : null,
      });
  };

  const handleRenderDefaultLocation = (TenTinh, TenHuyen, TenXa, SoNha) => {
    let location = "";
    const order = ["SoNha", "TenXa", "TenHuyen", "TenTinh"];

    let count = 0;

    order.forEach((param) => {
      if (
        (param === "SoNha" && SoNha) ||
        (param === "TenXa" && TenXa) ||
        (param === "TenHuyen" && TenHuyen) ||
        (param === "TenTinh" && TenTinh)
      ) {
        if (count >= 1) {
          location += ", ";
        }

        if (param === "SoNha") {
          location += `${SoNha} `;
        } else if (param === "TenXa") {
          location += `${TenXa} `;
        } else if (param === "TenHuyen") {
          location += `${TenHuyen} `;
        } else if (param === "TenTinh") {
          location += `${TenTinh}`;
        }

        count++;
      }
    });

    return location;
  };

  useEffect(() => {
    const checkDanhSachDoiTuongKN = DanhSachDoiTuongKN.every(
      (item, index) => item?.TinhID && item?.DanTocID && item?.QuocTichID
    );
    const newDanhSachDoiTuongKN = [...DanhSachDoiTuongKN];
    if (!dataEdit?.NhomKN?.DanhSachDoiTuongKN) {
      if (!checkDanhSachDoiTuongKN) {
        const newData = {};
        const Promise_API = [];
        const newDanhSachDoiTuongKhieuNai = [...newDanhSachDoiTuongKN].map(
          (item, index) => {
            let DanhSachHuyen = [];
            let DanhSachXa = [];

            Promise_API.push(
              api.GetAllHuyen({ TinhID: Number(TinhTrienKhai) }).then((res) => {
                if (res.data.Status > 0) {
                  newDanhSachDoiTuongKhieuNai[index].DanhSachHuyen =
                    res.data.Data;
                  DanhSachHuyen = res.data.Data;
                }
              })
            );
            if (HuyenIDDefault) {
              Promise_API.push(
                api
                  .GetAllXa({ HuyenID: Number(HuyenIDDefault) })
                  .then((res) => {
                    if (res.data.Status > 0) {
                      newDanhSachDoiTuongKhieuNai[index].DanhSachXa =
                        res.data.Data;
                      DanhSachXa = res.data.Data;
                    }
                  })
              );
            }
            const TenTinh = DanhSachTinh?.find(
              (item) => item.TinhID === Number(TinhTrienKhai)
            )?.TenTinh;

            const newDiaChiCT = handleRenderDefaultLocation(
              TenTinh,
              TenHuyenDefault,
              TenXaDefault
            );

            return {
              ...item,
              // DanhSachHuyen: [],
              [`TinhID`]: item.TinhID ? item.TinhID : Number(TinhTrienKhai),
              [`HuyenID`]: item.HuyenID ? item.HuyenID : HuyenIDDefault,
              [`XaID`]: item.XaID ? item.XaID : XaIDDefault,
              [`DanTocID`]: item.DanTocID ? item.DanTocID : Number(DanToc),
              [`QuocTichID`]: item.QuocTichID
                ? item.QuocTichID
                : Number(QuocTich),
              [`TenTinh`]: TenTinh,
              [`TenHuyen`]: item.TenHuyen ? item.TenHuyen : TenHuyenDefault,
              [`TenXa`]: item.TenXa ? item.TenHuyen : TenXaDefault,
              [`DiaChiCT`]:
                item?.DiaChiCT && item?.DiaChiCT !== ""
                  ? item?.DiaChiCT
                  : newDiaChiCT,
            };
          }
        );
        Promise.all(Promise_API).then((list) => {
          newDanhSachDoiTuongKhieuNai.forEach((item, index) => {
            for (const key in item) {
              if (key === "NgayCap") {
                newData[`${key}${index}`] = item[key] ? dayjs(item[key]) : null;
              } else {
                newData[`${key}${index}`] = item[key];
              }
            }
          });
          setDanhSachDoiTuongKN(
            newDanhSachDoiTuongKhieuNai ? newDanhSachDoiTuongKhieuNai : [{}]
          );
          form && form.setFieldsValue({ ...newData });
        });
      }
    }
  }, [DanhSachDoiTuongKN]);

  useEffect(() => {
    const newDanhSachDoiTuongBiKN = [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
    const checkDoiTuongBiKN = newDanhSachDoiTuongBiKN.every(
      (item, index) => item?.DanhSachHuyen
    );
    const dataMapping = [];
    // if (!dataEdit?.DanhSachDoiTuongBiKN) {
    if (!checkDoiTuongBiKN) {
      const newData = {};
      const Promise_API = [];
      const newDanhSachDoiTuongBiKhieuNai = [...newDanhSachDoiTuongBiKN].map(
        (item, index) => {
          let DanhSachXa = [];
          Promise_API.push(
            api
              .GetAllHuyen({
                TinhID: item.TinhID ? item.TinhID : Number(TinhTrienKhai),
              })
              .then((res) => {
                if (res.data.Status > 0) {
                  newDanhSachDoiTuongBiKhieuNai[index].DanhSachHuyen =
                    res.data.Data;
                }
              })
          );
          if (HuyenIDDefault || item.HuyenID) {
            Promise_API.push(
              api
                .GetAllXa({
                  HuyenID: item.HuyenID ? item.HuyenID : Number(HuyenIDDefault),
                })
                .then((res) => {
                  if (res.data.Status > 0) {
                    newDanhSachDoiTuongBiKhieuNai[index].DanhSachXa =
                      res.data.Data;
                  }
                })
            );
          }
          const TenTinh = DanhSachTinh?.find(
            (item) => item.TinhID === Number(TinhTrienKhai)
          )?.TenTinh;
          const TenHuyen = item.TenHuyen ? item.TenHuyen : TenHuyenDefault;
          const TenXa = item.TenXa ? item.TenXa : TenXaDefault;
          const SoNha = item.SoNhaDoiTuongBiKN;
          const newDiaChiCT = handleRenderDefaultLocation(
            TenTinh,
            TenHuyen,
            TenXa,
            SoNha
          );
          dataMapping.push({
            TenDoiTuongBiKN: item.TenDoiTuongBiKN,
            TenCoQuanToChucDoiTuongBiKhieuNai:
              item.TenCoQuanToChucDoiTuongBiKhieuNai,
            NoiCongTacDoiTuongBiKN: item.NoiCongTacDoiTuongBiKN,
            TenChucVu: item.TenChucVu,
            GioiTinhDoiTuongBiKN: item.GioiTinhDoiTuongBiKN,
            TenNgheNghiep: item.TenNgheNghiep,
            SoNhaDoiTuongBiKN: item.SoNhaDoiTuongBiKN,
            TinhIDDoiTuongBiKN: item.TinhID
              ? item.TinhID
              : Number(TinhTrienKhai),
            HuyenIDDoiTuongBiKN: item.HuyenID ? item.HuyenID : HuyenIDDefault,
            XaIDDoiTuongBiKN: item.XaID ? item.XaID : XaIDDefault,
            DanTocDoiTuongBiKNID: item.DanTocID
              ? item.DanTocID
              : Number(DanToc),
            QuocTichDoiTuongBiKNID: item.QuocTichID
              ? item.QuocTichID
              : Number(QuocTich),
            TenTinh: TenTinh,
            TenHuyen: TenHuyen,
            TenXa: TenXa,
            DiaChiCTDoiTuongBiKN:
              item?.DiaChiCT && item?.DiaChiCT !== ""
                ? item?.DiaChiCT
                : newDiaChiCT,
          });
          return {
            ...item,
            [`TinhIDDoiTuongBiKN`]: item.TinhID
              ? item.TinhID
              : Number(TinhTrienKhai),
            [`HuyenIDDoiTuongBiKN`]: item.HuyenID
              ? item.HuyenID
              : HuyenIDDefault,
            [`XaIDDoiTuongBiKN`]: item.XaID ? item.XaID : XaIDDefault,
            [`DanTocDoiTuongBiKNID`]: item.DanTocID
              ? item.DanTocID
              : Number(DanToc),
            [`QuocTichDoiTuongBiKNID`]: item.QuocTichID
              ? item.QuocTichID
              : Number(QuocTich),
            [`TenTinh`]: TenTinh,
            [`TenHuyen`]: TenHuyen,
            [`TenXa`]: TenXa,
            [`DiaChiCTDoiTuongBiKN`]:
              item?.DiaChiCT && item?.DiaChiCT !== ""
                ? item?.DiaChiCT
                : newDiaChiCT,
          };
        }
      );
      Promise.all(Promise_API).then((list) => {
        dataMapping.forEach((item, index) => {
          for (const key in item) {
            if (key === "NgayCap") {
              newData[`${key}${index}`] = item[key] ? dayjs(item[key]) : null;
            } else {
              newData[`${key}${index}`] = item[key];
            }
          }
        });
        setDoiTuongBiKN({
          ...DoiTuongBiKN,
          IsNhapThongTin: newDanhSachDoiTuongBiKN ? true : false,
          DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKhieuNai,
        });
        form && form.setFieldsValue({ ...newData });
      });
    }
    // }
    // if(!dataEdit?.DanhSachDoiTuongBiKN && !newDanhSachDoiTuongBiKN.length){
    //   setDoiTuongBiKN({
    //     ...DoiTuongBiKN,
    //     IsNhapThongTin: dataEdit.DanhSachDoiTuongBiKN?.length ? true : false,
    //     DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKhieuNai,
    //   });
    // }
  }, [DoiTuongBiKN]);

  const handleChangedThongTinDoiTuongBiKN = _debounce((key, value, index) => {
    const newDanhSachDoiTuongBiKhieuNai = [
      ...DoiTuongBiKN.DanhSachDoiTuongBiKN,
    ];
    newDanhSachDoiTuongBiKhieuNai[index][key] = value;

    setDoiTuongBiKN({
      ...DoiTuongBiKN,
      DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKhieuNai,
    });
  });

  const onOk = async (e, isPrint) => {
    e.preventDefault();

    form
      .validateFields()
      .then((value) => {
        const newValue = { ...dataEdit, ...value };
        let AllDanhSachHoSoTaiLieu = [];
        if (DanhSachHoSoTaiLieu) {
          AllDanhSachHoSoTaiLieu = [
            ...DanhSachHoSoTaiLieu.map((item) => ({
              ...item,
              FileType: LoaiFileDinhKem.FileHoSo,
            })),
          ];
        }
        if (DanhSachHoSoTaiLieuCQGiaiQuyet) {
          AllDanhSachHoSoTaiLieu = [
            ...AllDanhSachHoSoTaiLieu,
            ...DanhSachHoSoTaiLieuCQGiaiQuyet.map((item) => ({
              ...item,
              FileType: LoaiFileDinhKem.FileCQGiaiQuyet,
            })),
          ];
        }
        if (DanhSachHoSoTaiLieuKQGiaiQuyet) {
          AllDanhSachHoSoTaiLieu = [
            ...AllDanhSachHoSoTaiLieu,
            ...DanhSachHoSoTaiLieuKQGiaiQuyet.map((item) => ({
              ...item,
              FileType: LoaiFileDinhKem.FileKQGiaiQuyet,
            })),
          ];
        }
        if (DanhSachHoSoTaiLieuKQTIep) {
          AllDanhSachHoSoTaiLieu = [
            ...AllDanhSachHoSoTaiLieu,
            ...DanhSachHoSoTaiLieuKQTIep.map((item) => ({
              ...item,
              FileType: LoaiFileDinhKem.FileKQTiep,
            })),
          ];
        }

        newValue.NgayTiep = formatDate(value?.NgayTiep);
        newValue.NgayVietDon = formatDate(value?.NgayVietDon);
        newValue.DanhSachHoSoTaiLieu = AllDanhSachHoSoTaiLieu;
        newValue.NhomKN = NhomKN;
        newValue.NhomKN.DanhSachDoiTuongKN = DanhSachDoiTuongKN;
        newValue.ThanhPhanThamGia = ThanhPhanThamGia;
        DoiTuongBiKN.LoaiDoiTuongBiKNID = newValue.LoaiDoiTuongBiKNID;

        if (DoiTuongBiKN?.TenDoiTuongBiKN) {
          newValue.DoiTuongBiKN = DoiTuongBiKN;
        }
        newValue.TinhID = newValue.TinhID ? newValue.TinhID : 0;
        newValue.HuyenID = newValue.HuyenID ? newValue.HuyenID : 0;
        newValue.XaID = newValue.XaID ? newValue.XaID : 0;
        newValue.KQQuaTiepDan = newValue.KQQuaTiepDan
          ? newValue.KQQuaTiepDan
          : 0;
        newValue.LanGQ = newValue.LanGQ ? newValue.LanGQ : 0;
        newValue.NhomThamQuyenGiaiQuyetID = newValue.NhomThamQuyenGiaiQuyetID
          ? newValue.NhomThamQuyenGiaiQuyetID
          : 0;
        newValue.QuocTichDoiTuongBiKNID = newValue.QuocTichDoiTuongBiKNID
          ? newValue.QuocTichDoiTuongBiKNID
          : 0;
        newValue.DanTocDoiTuongBiKNID = newValue.DanTocDoiTuongBiKNID
          ? newValue.DanTocDoiTuongBiKNID
          : 0;
        !newValue.NgayBanHanhQuyetDinhGiaiQuyet
          ? delete newValue.NgayBanHanhQuyetDinhGiaiQuyet
          : null;
        // newValue.SoDon = newValue.SoDon?.toString();
        newValue.SoDonThu = newValue.SoDonThu?.toString();
        newValue.TiepDanCoDon = 1;
        newValue.DonThuTrung = dataModalKiemTraTrung.DonThuTrung;
        newValue.DonThuKNLan2 = dataModalKiemTraTrung.DonThuKNLan2;
        for (const key in newValue) {
          if (!newValue[key]) {
            delete newValue[key];
          }
        }
        if (newValue.DoiTuongBiKN) {
          newValue.DoiTuongBiKN.DiaChiCTDoiTuongBiKN =
            value.DiaChiCTDoiTuongBiKN;
        }
        newValue.isPrint = isPrint;
        newValue.DanhSachDoiTuongBiKN = DoiTuongBiKN.DanhSachDoiTuongBiKN
          ? [...DoiTuongBiKN.DanhSachDoiTuongBiKN]?.filter(
              (item) => item?.TenDoiTuongBiKN
            )
          : [];
        props.onCreate(newValue);
      })
      .catch((err, err1) => {
        const listKeyErr = [];
        if (err.errorFields) {
          err.errorFields?.forEach((item) => {
            if (item.name) {
              const name = item.name[0];
              const value = document.querySelector(`.${name}`)?.textContent;
              listKeyErr.push(value);
            }
          });
        }
        const errChange = listKeyErr.filter((item) => {
          return !currentKey.includes(item);
        });
        if (errChange && errChange.length) {
          setCurrentKey((prevCurrent) => [...prevCurrent, ...errChange]);
        }
      });
  };
  const handleChangedFields = async (changedValues, allValues) => {
    // const {TenQuocTich,MaQuocTich}
    const value = await form.getFieldsValue();
    const { MaDanToc, TenDanToc } = value;
    if (MaDanToc && TenDanToc) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  const showModalHoSoTaiLieu = (index, type) => {
    if (index || index === 0) {
      let value = DanhSachHoSoTaiLieu[index];
      if (type === 1) {
        value = DanhSachHoSoTaiLieu[index];
      } else if (type === 2) {
        value = DanhSachHoSoTaiLieuCQGiaiQuyet[index];
      } else if (type === 3) {
        value = DanhSachHoSoTaiLieuKQTIep[index];
      } else if (type === 4) {
        value = DanhSachHoSoTaiLieuKQGiaiQuyet[index];
      }
      setKeyModalHoSoTaiLieu((prevKey) => prevKey + 1);
      setDataModalHoSoTaiLieu({ ...value, index, type });
      setVisibleModalHoSoTaiLieu(true);
    } else {
      setVisibleModalHoSoTaiLieu(true);
      setDataModalHoSoTaiLieu({ type });
      setKeyModalHoSoTaiLieu((prevKey) => prevKey + 1);
    }
  };

  const submitModalHoSoTaiLieu = (data) => {
    const { index, type } = data;
    if (index || index === 0) {
      if (type === 1) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
        newDanhSachHoSoTaiLieu.splice(index, 1, {
          ...newDanhSachHoSoTaiLieu[index],
          ...data,
        });
        setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      } else if (type === 2) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuCQGiaiQuyet];
        newDanhSachHoSoTaiLieu.splice(index, 1, {
          ...newDanhSachHoSoTaiLieu[index],
          ...data,
        });
        setDanhSachHoSoTaiLieuCQGiaiQuyet(newDanhSachHoSoTaiLieu);
      } else if (type === 3) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQTIep];
        newDanhSachHoSoTaiLieu.splice(index, 1, {
          ...newDanhSachHoSoTaiLieu[index],
          ...data,
        });
        setDanhSachHoSoTaiLieuKQTIep(newDanhSachHoSoTaiLieu);
      } else if (type === 4) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQGiaiQuyet];
        newDanhSachHoSoTaiLieu.splice(index, 1, {
          ...newDanhSachHoSoTaiLieu[index],
          ...data,
        });
        setDanhSachHoSoTaiLieuKQGiaiQuyet(newDanhSachHoSoTaiLieu);
      }
      message.destroy();
      message.success("Sửa hồ sơ, tài liệu thành công");
      hideModalHoSoTaiLieu();
    } else {
      if (type === 1) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
        newDanhSachHoSoTaiLieu.push(data);
        setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      } else if (type === 2) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuCQGiaiQuyet];
        newDanhSachHoSoTaiLieu.push(data);
        setDanhSachHoSoTaiLieuCQGiaiQuyet(newDanhSachHoSoTaiLieu);
      } else if (type === 3) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQTIep];
        newDanhSachHoSoTaiLieu.push(data);
        setDanhSachHoSoTaiLieuKQTIep(newDanhSachHoSoTaiLieu);
      } else if (type === 4) {
        const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQGiaiQuyet];
        newDanhSachHoSoTaiLieu.push(data);
        setDanhSachHoSoTaiLieuKQGiaiQuyet(newDanhSachHoSoTaiLieu);
      }
      message.destroy();
      message.success("Thêm mới hồ sơ, tài liệu thành công");
      hideModalHoSoTaiLieu();
    }
  };

  const hideModalHoSoTaiLieu = () => {
    setDataModalHoSoTaiLieu({});
    setVisibleModalHoSoTaiLieu(false);
  };

  const deleteHoSoTaiLieu = (index, type) => {
    ModalAnt.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa hồ sơ, tài liệu này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        let newDanhSachHoSoTaiLieu;
        if (type === 1) {
          newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
        } else if (type === 2) {
          newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuCQGiaiQuyet];
        } else if (type === 3) {
          newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQTIep];
        } else if (type === 4) {
          newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieuKQGiaiQuyet];
        }
        if (newDanhSachHoSoTaiLieu[index]) {
          const FileDinhKem = newDanhSachHoSoTaiLieu[index]["FileDinhKem"];
          const FileDinhKemDelete = [];
          if (FileDinhKem) {
            FileDinhKem.forEach((file) => {
              if (file.FileID) {
                FileDinhKemDelete.push(file);
              }
            });
          }
          newDanhSachHoSoTaiLieu[index].hidden = true;
          newDanhSachHoSoTaiLieu[index].FileDinhKemDelete = FileDinhKemDelete;
          if (type === 1) {
            setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
          } else if (type === 2) {
            setDanhSachHoSoTaiLieuCQGiaiQuyet(newDanhSachHoSoTaiLieu);
          } else if (type === 3) {
            setDanhSachHoSoTaiLieuKQTIep(newDanhSachHoSoTaiLieu);
          } else if (type === 4) {
            setDanhSachHoSoTaiLieuKQGiaiQuyet(newDanhSachHoSoTaiLieu);
          }
        }
        // const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
        // newDanhSachHoSoTaiLieu.splice(index, 1);
        // setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      },
    });
  };

  const handleChiTietLoaiKhieuTo = (LoaiKhieuToID, type) => {
    if (LoaiKhieuToID) {
      api
        .GetAllDanhMucLoaiKhieuTo({ LoaiKhieuToID })
        .then((res) => {
          if (res.data.Status > 0) {
            if (type === 1) {
              setDanhSachChiTietKhieuTo(res.data.Data);
            } else if (type === 2) {
              setDanhSachChiTietKhieuTo2(res.data.Data);
            } else if (type === 3) {
              setDanhSachChiTietKhieuTo3(res.data.Data);
            }
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    } else {
      if (type === 1) {
        setDanhSachChiTietKhieuTo([]);
      } else if (type === 2) {
        setDanhSachChiTietKhieuTo2([]);
      } else if (type === 3) {
        setDanhSachChiTietKhieuTo3([]);
      }
    }
  };

  const handleCallApiXa = (HuyenID, key) => {
    api
      .GetAllXa({ HuyenID })
      .then((res) => {
        if (res.data.Status > 0) {
          if (key === 1) {
            setDanhSachXaKhieuNai(res.data.Data);
          } else if (key === 2) {
            setDanhSachXaDonThu(res.data.Data);
          } else if (key === 3) {
            setDanhSachXaKhieuNai2(res.data.Data);
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleCallApiHuyen = (TinhID, key) => {
    api
      .GetAllHuyen({ TinhID })
      .then((res) => {
        if (res.data.Status > 0) {
          if (key === 1) {
            setDanhSachHuyenKhieuNai(res.data.Data);
          } else if (key === 2) {
            setDanhSachHuyenDonThu(res.data.Data);
          } else if (key === 3) {
            setDanhSachHuyenKhieuNai2(res.data.Data);
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleChangeNgayTiep = (value, valueStr) => {
    const yearOfCurrentSelect = value ? dayjs(value).format("YYYY") : null;
    api.GetSTTHoSo({ NamTiepNhan: yearOfCurrentSelect }).then((res) => {
      if (res.data.Status > 0) {
        console.log(res.data.Data);
        const SoDonThu = res.data.Data ? res.data.Data : null;
        const newSoDonThu = SoDonThu ? SoDonThu.toString() : null;
        if (newSoDonThu && yearOfCurrentSelect) {
          // const typeSoDon = TiepNhanDon ? 'SoDonThu' : 'SoDon';
          const typeSoDon = "SoDonThu";
          form.setFieldsValue({
            [typeSoDon]: `${newSoDonThu}/${yearOfCurrentSelect}`,
          });
        }
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };

  const handleCallApiHuyenDoiTuongKN = (TinhID, index, type = 1) => {
    const newData =
      type === 1
        ? [...DanhSachDoiTuongKN]
        : [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
    api
      .GetAllHuyen({ TinhID })
      .then((res) => {
        if (res.data.Status > 0) {
          newData[index].DanhSachHuyen = res.data.Data;
          if (type === 1) {
            setDanhSachDoiTuongKN(newData);
          } else {
            setDoiTuongBiKN({ ...DoiTuongBiKN, DanhSachDoiTuongBiKN: newData });
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleCallApiXaDoiTuongKN = (HuyenID, index, type = 1) => {
    const newData =
      type === 1
        ? [...DanhSachDoiTuongKN]
        : [DoiTuongBiKN.DanhSachDoiTuongBiKN];
    api
      .GetAllXa({ HuyenID })
      .then((res) => {
        if (res.data.Status > 0) {
          newData[index].DanhSachXa = res.data.Data;
          if (type === 1) {
            setDanhSachDoiTuongKN(newData);
          } else {
            setDoiTuongBiKN({ ...DoiTuongBiKN, DanhSachDoiTuongBiKN: newData });
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleChangeTinh = (value, key, type) => {
    switch (type) {
      case 1:
        handleCallApiHuyen(value, key);
        break;
      case 2:
        handleCallApiXa(value, key);
        break;
      default:
        break;
    }
  };

  const handleChangeLoaiDoiTuongKN = (value, index) => {
    const newDanhSachDoiTuongBiKN = [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
    const newDoiTuongBiKN = newDanhSachDoiTuongBiKN[index];
    for (const key in newDoiTuongBiKN) {
      if (Object.hasOwnProperty.call(newDoiTuongBiKN, key)) {
        newDoiTuongBiKN[key] = null;
      }
    }

    if (HuyenIDDefault) {
      handleChangeTinh(HuyenIDDefault, 3, 2);
    }
    newDoiTuongBiKN.TinhIDDoiTuongBiKN = TinhTrienKhai
      ? Number(TinhTrienKhai)
      : null;
    newDoiTuongBiKN.HuyenIDDoiTuongBiKN = HuyenIDDefault
      ? Number(HuyenIDDefault)
      : null;
    newDoiTuongBiKN.XaIDDoiTuongBiKN = XaIDDefault ? Number(XaIDDefault) : null;
    newDoiTuongBiKN.LoaiDoiTuongBiKNID = value;
    newDoiTuongBiKN.IsNhapThongTin = true;
    newDoiTuongBiKN.TenDoiTuongBiKN = null;
    newDoiTuongBiKN.TenHuyen = TenHuyenDefault;
    newDoiTuongBiKN.TenXa = TenXaDefault;
    const TenTinh = DanhSachTinh?.find(
      (item) => item.TinhID === Number(TinhTrienKhai)
    )?.TenTinh;
    newDoiTuongBiKN.DiaChiCTDoiTuongBiKN = handleRenderDefaultLocation(
      TenTinh,
      TenHuyenDefault,
      TenXaDefault
    );
    setDanhSachXaKhieuNai2([]);
    // form && form.setFieldsValue({...newDoiTuongBiKhieuNai});
    setDoiTuongBiKN({
      ...DoiTuongBiKN,
      DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKN,
    });
  };

  const handleChangeTinhHuyenXaDoiTuongBiKN = _debounce(
    async (key, value, options2, index) => {
      const newDanhSachDoiTuongBiKN = [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
      const newThongTinDoiTuongBiKhieuNai = newDanhSachDoiTuongBiKN[index];
      newThongTinDoiTuongBiKhieuNai[key] = value;
      newThongTinDoiTuongBiKhieuNai[options2.key] = options2.value;

      const callApi = async () => {
        if (options2?.key === "TenTinh") {
          return await api.GetAllHuyen({ TinhID: value }).then((res) => {
            if (res.data.Status > 0) {
              newDanhSachDoiTuongBiKN[index].DanhSachHuyen = res.data.Data;
            } else {
              message.destroy();
              message.warning(res.data.Message);
            }
          });
        }
        if (options2?.key === "TenHuyen") {
          return await api.GetAllXa({ HuyenID: value }).then((res) => {
            if (res.data.Status > 0) {
              newDanhSachDoiTuongBiKN[index].DanhSachXa = res.data.Data;
            } else {
              message.destroy();
              message.warning(res.data.Message);
            }
          });
        }
      };
      await callApi();
      if (options2?.key === "TenTinh") {
        newThongTinDoiTuongBiKhieuNai["TenHuyen"] = "";
        newThongTinDoiTuongBiKhieuNai["TenXa"] = "";
        form.setFieldsValue({ [`XaIDDoiTuongBiKN${index}`]: null });
        form.setFieldsValue({ [`HuyenIDDoiTuongBiKN${index}`]: null });
      }
      if (options2?.key === "TenHuyen") {
        newThongTinDoiTuongBiKhieuNai["TenXa"] = "";
        form.setFieldsValue({ [`XaIDDoiTuongBiKN${index}`]: null });
      }
      const SoNha = newThongTinDoiTuongBiKhieuNai?.SoNhaDoiTuongBiKN;
      const TenXa = newThongTinDoiTuongBiKhieuNai?.TenXa;
      const TenHuyen = newThongTinDoiTuongBiKhieuNai?.TenHuyen;
      const TenTinh = newThongTinDoiTuongBiKhieuNai?.TenTinh;
      newThongTinDoiTuongBiKhieuNai[`DiaChiCT`] = handleRenderDefaultLocation(
        TenTinh,
        TenHuyen,
        TenXa,
        SoNha
      );
      form.setFieldsValue({
        [`DiaChiCTDoiTuongBiKN${index}`]: handleRenderDefaultLocation(
          TenTinh,
          TenHuyen,
          TenXa,
          SoNha
        ),
      });
      setDoiTuongBiKN({
        ...DoiTuongBiKN,
        DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKN,
      });
    },
    300
  );

  const handleChangeDoiTuongKhieuNai = _debounce((index, value, key) => {
    const newDanhSachDoiTuongKhieuNai = [...DanhSachDoiTuongKN];
    newDanhSachDoiTuongKhieuNai[index][key] = value;
    setDanhSachDoiTuongKN(newDanhSachDoiTuongKhieuNai);
  }, 200);

  const CheckSoNguoiDaiDien = (value) => {
    let nums;
    if (value < 5) nums = 1;
    else if (value < 10) nums = 2;
    else if (value >= 10) nums = 5;
    const DanhSachSoNguoiDaiDien = [];
    for (let i = 1; i <= nums; i++) {
      DanhSachSoNguoiDaiDien.push({ value: i, key: i });
    }
    setDanhSachSoNguoiDaiDien(DanhSachSoNguoiDaiDien);
  };

  const TrungDon = (DonThuID, XuLyDonID) => {
    api
      .ChiTietDonThu2({ DonThuID, XuLyDonID })
      .then((res) => {
        if (res.data.Status > 0) {
          const DoiTuongKN = res.data.Data.DoiTuongKN;
          const DoiTuongBiKN = res.data.Data.DoiTuongBiKN;
          const NhomKN = res.data.Data.NhomKN;
          const DanhSachHoSoTaiLieu = res.data.Data.DanhSachHoSoTaiLieu;
          const DonThu = {
            ...res.data.Data.DonThu,
            DoiTuongBiKN,
            DoiTuongKN,
            NhomKN,
            DanhSachHoSoTaiLieu,
            NgayTiep: dayjs(),
            NgayNhapDon: dayjs(),
          };
          handleSetFieldsData(DonThu);
          setVisibleModalKiemTraTrung(false);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const hideModalKiemTraTrung = () => {
    setVisibleModalKiemTraTrung(false);
  };

  const handleShowModalKiemTraTrung = (index, data, type) => {
    const DoiTuong = DanhSachDoiTuongKN[index];
    const FormValue = form.getFieldsValue();
    const value = {
      hoTen: DoiTuong?.HoTen,
      cmnd: DoiTuong?.CMND,
      diaChi: DoiTuong?.DiaChiCT,
      noiDung: FormValue?.NoiDungDon,
    };
    if (type === 1) {
      api
        .KiemTraTrung(!data ? value : data)
        .then((res) => {
          if (res.data.Status > 0) {
            setdataModalKiemTraTrung({
              ...value,
              ...data,
              type,
              DanhSachDonThu: res.data.Data,
              DonThuTrung: 1,
              DonThuKNLan2: null,
            });
            setKeyModalKiemTraTrung((prevKey) => prevKey + 1);
            setVisibleModalKiemTraTrung(true);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    } else if (type === 2) {
      api
        .KhieuToTan2(value)
        .then((res) => {
          if (res.data.Status > 0) {
            setdataModalKiemTraTrung({
              ...value,
              ...data,
              type,
              DanhSachDonThu: res.data.Data,
              DonThuTrung: null,
              DonThuKNLan2: 1,
            });
            setKeyModalKiemTraTrung((prevKey) => prevKey + 1);
            setVisibleModalKiemTraTrung(true);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    }
  };

  const handleRenderDanhSachHoSoTaiLieu = (
    DanhSachHoSoTaiLieu,
    type,
    title
  ) => {
    return (
      // file-wrapper wrapper-item
      <div className="file-wrapper" style={{ margin: "10px 0" }}>
        <div className="file-wrapper__top">
          <p>{title}:</p>
          <Button
            type="primary"
            onClick={() => showModalHoSoTaiLieu(null, type)}
          >
            {" "}
            <PlusOutlined /> Thêm tài liệu
          </Button>
        </div>
        <div className="file-wrapper__content">
          <table>
            <thead>
              <th style={{ width: "5%" }}>STT</th>
              <th style={{ width: "15%" }}>Tên hồ sơ/tài liệu</th>
              <th style={{ width: "15%" }}>Ngày cập nhật</th>
              <th style={{ width: "15%" }}>Người cập nhật</th>
              <th style={{ width: "15%" }}>File đính kèm</th>
              <th style={{ width: "10%" }}>Thao tác</th>
            </thead>
            <tbody>
              {DanhSachHoSoTaiLieu
                ? DanhSachHoSoTaiLieu.map((item, index) =>
                    !item.hidden ? (
                      <tr>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td>{item?.TenFile}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.NgayCapNhat
                            ? moment(item.NgayCapNhat).format("DD/MM/YYYY")
                            : moment().format("DD/MM/YYYY")}
                        </td>
                        <td>{item?.TenNguoiCapNhat || user?.TenCanBo}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.FileDinhKem.length > 0 ? (
                            <Popover
                              content={renderContentDownload(item.FileDinhKem)}
                            >
                              <DownloadOutlined
                                style={{ fontSize: 15, color: "blue" }}
                              />
                            </Popover>
                          ) : (
                            ""
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="btn-action">
                            <EditOutlined
                              onClick={() => showModalHoSoTaiLieu(index, type)}
                            />
                            <DeleteOutlined
                              onClick={() => deleteHoSoTaiLieu(index, type)}
                            />
                          </div>
                        </td>
                      </tr>
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleAddDoiTuongKN = () => {
    const newDanhSachDoiTuongBiKN = [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
    newDanhSachDoiTuongBiKN.push(infoDefaultDoiTuongBiKN);
    setDoiTuongBiKN({
      ...DoiTuongBiKN,
      DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKN,
    });
  };

  const handleDeleteDoiTuongBiKN = (index) => {
    ModalAnt.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa đối tượng này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        const newDanhSachDoiTuongBiKN = [...DoiTuongBiKN.DanhSachDoiTuongBiKN];
        newDanhSachDoiTuongBiKN.splice(index, 1);
        setDoiTuongBiKN({
          ...DoiTuongBiKN,
          DanhSachDoiTuongBiKN: newDanhSachDoiTuongBiKN,
        });
      },
    });
  };

  const handleRenderContentTabs = (tab) => {
    if (tab === 1) {
      return (
        <div className="breadCum-content__tiepdan wrapper-item">
          <div className="breadCum-content__top">
            <Item
              label="Lãnh đạo tiếp"
              name={"TenLanhDaoTiep"}
              // {...ITEM_LAYOUT}
              rules={[REQUIRED]}
              className="ant-form-title__left"
            >
              <Input />
            </Item>
            <Item
              label="Chức vụ"
              name={"ChucVu"}
              // {...ITEM_LAYOUT}
              // rules={[REQUIRED]}
              className="ant-form-title__left"
            >
              <Input />
            </Item>
            <Item
              label="Được ủy quyền"
              valuePropName="checked"
              name={"UyQuyenTiep"}
            >
              <Checkbox />
            </Item>
          </div>
          <div className="group-title">
            {/* <p className="title-content__breadCum">
              Thành phần tham gia tiếp công dân
            </p> */}

            {/* <Button type="primary" onClick={AddNewCanBo}>
              <FileAddFilled /> Thêm
            </Button> */}
          </div>
          <Item
            label="Thành phần tham gia tiếp công dân"
            name={"ThanhPhanThamGiaTiep"}
            className="ant-form-title__left"
          >
            <InputAnt.TextArea />
          </Item>
        </div>
      );
    } else if (tab === 2) {
      return (
        <div className="breadCum-content__khieunai wrapper-item">
          <div className="breadCum-content__top">
            <Item
              label="Đối tượng khiếu nại, tố cáo, PAKN là:"
              name={"LoaiDoiTuongKNID"}
              rules={[REQUIRED]}
            >
              <Radio.Group
                onChange={(e) => {
                  handleChangedDoiTuongKhieuNai(e.target.value);
                  if (e.target.value === 3) {
                    setDanhSachDoiTuongKN([]);
                  }
                }}
              >
                <Radio value={1}>Cá nhân</Radio>
                <Radio value={2}>Cơ quan tổ chức</Radio>
                <Radio value={3}>Tập thể </Radio>
              </Radio.Group>
            </Item>
          </div>
          {NhomKN && NhomKN.LoaiDoiTuongKNID === 2 ? (
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Item
                  label="Tên cơ quan, tổ chức"
                  name={`TenCQ`}
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <Input
                    onChange={(e) =>
                      setNhomKN({ ...NhomKN, TenCQ: e.target.value })
                    }
                  />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Địa chỉ cơ quan, tổ chức"
                  name={`DiaChiCQ`}
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <Input
                    onChange={(e) =>
                      setNhomKN({ ...NhomKN, DiaChiCQ: e.target.value })
                    }
                  />
                </Item>
              </Col>
            </Row>
          ) : null}
          {NhomKN && NhomKN.LoaiDoiTuongKNID === 3 ? (
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Item
                  label="Số người"
                  name={`SoLuong`}
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                  // initialValue={10}
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setNhomKN({ ...NhomKN, SoLuong: value });
                      CheckSoNguoiDaiDien(value);
                    }}
                  />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Số người đại diện"
                  name={`SoNguoiDaiDien`}
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <Select
                    onChange={(value) => {
                      setNhomKN({ ...NhomKN, SoNguoiDaiDien: value });
                      const arr = [];
                      const newData = {};
                      if (value <= DanhSachDoiTuongKN.length) {
                        for (let i = 0; i < DanhSachDoiTuongKN.length; i++) {
                          if (DanhSachDoiTuongKN[i]) {
                            if (i < value) {
                              arr.push({ ...DanhSachDoiTuongKN[i] });
                            } else {
                              const item = DanhSachDoiTuongKN[i];
                              for (const key in item) {
                                if (key === "NgayCap") {
                                  newData[`${key}${i}`] = null;
                                } else {
                                  newData[`${key}${i}`] = null;
                                }
                              }
                              // arr.push({});
                            }
                          }
                        }
                      } else {
                        for (let i = 0; i < value; i++) {
                          if (DanhSachDoiTuongKN[i]) {
                            arr.push({ ...DanhSachDoiTuongKN[i] });
                          } else {
                            arr.push({});
                          }
                        }
                      }
                      setDanhSachDoiTuongKN(arr);
                      form.setFieldsValue({ ...newData });
                    }}
                  >
                    {DanhSachSoNguoiDaiDien &&
                      DanhSachSoNguoiDaiDien.map((item) => (
                        <Option value={item.value}>{item.value}</Option>
                      ))}
                  </Select>
                </Item>
              </Col>
            </Row>
          ) : null}
          {DanhSachDoiTuongKN && DanhSachDoiTuongKN.length > 0
            ? DanhSachDoiTuongKN.map((item, index) => {
                return (
                  <>
                    {/* {item.HoTen} */}
                    {DanhSachDoiTuongKN && DanhSachDoiTuongKN.length > 1 ? (
                      <p className="title-user__claims">
                        Thông tin người đại diện {index + 1}:
                      </p>
                    ) : null}
                    <Row gutter={[10, 10]}>
                      <Col xxl={7} xl={7} span={12}>
                        <Item
                          label="Họ và tên"
                          name={`HoTen${index}`}
                          rules={[REQUIRED]}
                          initialValue={item?.HoTen}
                          className="ant-form-title__left"
                        >
                          <Input
                            style={{ textTransform: "capitalize" }}
                            defaultValue={item?.HoTen}
                            onChange={(e) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                e.target.value,
                                "HoTen"
                              )
                            }
                          />
                        </Item>
                        <div
                          style={{ visibility: "hidden", height: 0 }}
                          class={`HoTen${index}`}
                        >
                          2
                        </div>
                        {/* <p
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: 5,
                            color: 'red',
                          }}
                        >
                          Tìm thấy 05 đơn thư có thể trùng
                        </p> */}
                      </Col>
                      <Col xxl={4} xl={5} span={12}>
                        <div className="group-check">
                          <Button
                            style={{ background: "#FF6F00", color: "#fff" }}
                            onClick={() =>
                              handleShowModalKiemTraTrung(index, null, 1)
                            }
                          >
                            Kiểm tra trùng
                          </Button>
                          {!isCapXa ? (
                            <Button
                              type="primary"
                              onClick={() =>
                                handleShowModalKiemTraTrung(index, null, 2)
                              }
                            >
                              Khiếu tố lần 2
                            </Button>
                          ) : null}
                        </div>
                      </Col>
                      <Col xxl={4} xl={6} span={12}>
                        <Item
                          label="Số CCCD/CMND"
                          name={"CMND" + index}
                          initialValue={item?.CMND}
                          className="ant-form-title__left"
                        >
                          <Input
                            onChange={(e) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                e.target.value,
                                "CMND"
                              )
                            }
                          />
                        </Item>
                      </Col>
                      <Col xxl={4} xl={6} span={12}>
                        <Item
                          initialValue={
                            item?.NgayCap ? dayjs(item.NgayCap) : null
                          }
                          label="Ngày cấp"
                          name={"NgayCap" + index}
                          className="ant-form-title__left"
                        >
                          <DatePicker
                            placeholder=""
                            style={{ width: "100%" }}
                            format={"DD/MM/YYYY"}
                            onChange={(value) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                value,
                                // ? dayjs(value).format('YYYY/MM/DD HH:mm:ss')
                                // : null,
                                "NgayCap"
                              )
                            }
                          />
                        </Item>
                      </Col>
                      <Col xxl={5} xl={6} span={12}>
                        <Item
                          initialValue={item?.NoiCap}
                          label="Nơi cấp"
                          name={"NoiCap" + index}
                          className="ant-form-title__left"
                        >
                          <Input
                            onChange={(e) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                e.target.value,
                                "NoiCap"
                              )
                            }
                          />
                        </Item>
                      </Col>

                      <Col xxl={5} xl={6} span={12}>
                        <Item
                          label="Giới tính "
                          initialValue={item?.GioiTinh}
                          name={"GioiTinh" + index}
                          className="ant-form-title__left"
                        >
                          <Select
                            onChange={(value) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                value,
                                "GioiTinh"
                              )
                            }
                          >
                            <Option value={1}>Nam</Option>
                            <Option value={2}>Nữ</Option>
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={6} xl={6} span={12}>
                        <Item
                          initialValue={item?.SoDienThoai}
                          label="Điện thoại"
                          name={"SoDienThoai" + index}
                          className="ant-form-title__left"
                        >
                          <InputNumber
                            min={0}
                            maxLength={12}
                            style={{ width: "100%" }}
                            onChange={(value) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                String(value),
                                "SoDienThoai"
                              )
                            }
                          />
                        </Item>
                      </Col>
                      <Col xxl={4} xl={6} span={12}>
                        <Item
                          label="Dân tộc"
                          initialValue={item?.DanTocID}
                          name={"DanTocID" + index}
                          className="ant-form-title__left"
                        >
                          <Select
                            onChange={(value) => {
                              handleChangeDoiTuongKhieuNai(
                                index,
                                value,
                                "DanTocID"
                              );
                            }}
                          >
                            {DanhSachDanToc
                              ? DanhSachDanToc.map((item) => (
                                  <Option value={item.DanTocID}>
                                    {item.TenDanToc}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={4} xl={6} span={12}>
                        <Item
                          label="Quốc tịch"
                          initialValue={item?.QuocTichID}
                          name={"QuocTichID" + index}
                          className="ant-form-title__left"
                        >
                          <Select
                            onChange={(value) => {
                              handleChangeDoiTuongKhieuNai(
                                index,
                                value,
                                "QuocTichID"
                              );
                            }}
                          >
                            {DanhSachQuocTich
                              ? DanhSachQuocTich.map((item) => (
                                  <Option value={item.QuocTichID}>
                                    {item.TenQuocTich}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={5} xl={6} span={12}>
                        <Item
                          initialValue={item?.NgheNghiep}
                          label="Nghề nghiệp"
                          name={"NgheNghiep" + index}
                          className="ant-form-title__left"
                        >
                          <Input
                            onChange={(e) =>
                              handleChangeDoiTuongKhieuNai(
                                index,
                                e.target.value,
                                "NgheNghiep"
                              )
                            }
                          />
                        </Item>
                      </Col>
                      <Col xxl={5} xl={6} span={12}>
                        <Item
                          label={
                            <p>
                              Địa chỉ
                              <span style={{ color: "red", paddingLeft: 2 }}>
                                (Chọn tỉnh, huyện, xã)
                              </span>
                            </p>
                          }
                          name={"TinhID" + index}
                          // rules={[REQUIRED]}
                          className="ant-form-title__left"
                          // initialValue={null}
                        >
                          <Select
                            allowClear
                            initialValue={item?.TinhID}
                            onChange={(value, options) => {
                              handleCallApiHuyenDoiTuongKN(value, index);
                              const options2 = {
                                index,
                                value: options?.children
                                  ? options?.children
                                  : "",
                                key: "TenTinh",
                              };
                              handleChangeTinhHuyenXaDoiTuongKhieuNai(
                                index,
                                value,
                                "TinhID",
                                options2,
                                form,
                                setDanhSachDoiTuongKN,
                                DanhSachDoiTuongKN,
                                handleRenderDefaultLocation
                              );
                            }}
                          >
                            {DanhSachTinh
                              ? DanhSachTinh.map((item) => (
                                  <Option value={item.TinhID}>
                                    {item.TenTinh}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={6} xl={6} span={12}>
                        <Item
                          label=""
                          name={"HuyenID" + index}
                          className="ant-form-title__left"
                          initialValue={item?.HuyenID}
                          style={{
                            display: "flex",
                            width: " 100%",
                            alignItems: "flex-end",
                            height: "100%",
                          }}
                        >
                          <Select
                            onChange={(value, options) => {
                              handleCallApiXaDoiTuongKN(value, index);
                              const options2 = {
                                index,
                                value: options?.children,
                                key: "TenHuyen",
                              };
                              handleChangeTinhHuyenXaDoiTuongKhieuNai(
                                index,
                                value,
                                "HuyenID",
                                options2,
                                form,
                                setDanhSachDoiTuongKN,
                                DanhSachDoiTuongKN,
                                handleRenderDefaultLocation
                              );
                            }}
                          >
                            {item?.DanhSachHuyen?.map((item) => (
                              <Option value={item.HuyenID}>
                                {item.TenHuyen}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={4} xl={6} span={12}>
                        <Item
                          label=""
                          name={"XaID" + index}
                          className="ant-form-title__left"
                          style={{
                            display: "flex",
                            width: " 100%",
                            alignItems: "flex-end",
                            height: "100%",
                          }}
                          initialValue={item?.XaID}
                        >
                          <Select
                            onChange={(value, options) => {
                              const options2 = {
                                index,
                                value: options?.children,
                                key: "TenXa",
                              };
                              handleChangeTinhHuyenXaDoiTuongKhieuNai(
                                index,
                                value,
                                "XaID",
                                options2,
                                form,
                                setDanhSachDoiTuongKN,
                                DanhSachDoiTuongKN,
                                handleRenderDefaultLocation
                              );
                            }}
                          >
                            {item?.DanhSachXa
                              ? item?.DanhSachXa?.map((item) => (
                                  <Option value={item.XaID}>
                                    {item.TenXa}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        </Item>
                      </Col>
                      <Col xxl={9} xl={6} span={12}>
                        <Item
                          initialValue={item?.SoNha}
                          label="Nhập số nhà, tổ, thôn xóm, khu phố...."
                          name={"SoNha" + index}
                          className="ant-form-title__left"
                        >
                          <Input
                            initialValue={item?.SoNha}
                            onChange={(e) => {
                              const options2 = {
                                index,
                                value: e.target.value,
                                key: "SoNha",
                              };
                              handleChangeTinhHuyenXaDoiTuongKhieuNai(
                                index,
                                e.target.value,
                                "SoNha",
                                options2,
                                form,
                                setDanhSachDoiTuongKN,
                                DanhSachDoiTuongKN,
                                handleRenderDefaultLocation
                              );
                              // handleChangeDoiTuongKhieuNai(
                              //   index,
                              //   e.target.value,
                              //   'SoNha',
                              // );
                            }}
                          />
                        </Item>
                      </Col>
                    </Row>
                    <Item
                      label="Chi tiết địa chỉ"
                      name={"DiaChiCT" + index}
                      className="ant-form-title__left"
                    >
                      <Input
                        disabled
                        initialValue={item?.DiaChiCT}
                        onChange={(e) => {
                          handleChangeDoiTuongKhieuNai(
                            index,
                            e.target.value,
                            "DiaChiCT"
                          );
                        }}
                      />
                    </Item>
                  </>
                );
              })
            : null}
        </div>
      );
    } else if (tab === 3) {
      return (
        <>
          <div className="info-wrapper wrapper-item">
            <p className="info-wrapper__title">Phân loại vụ việc </p>
            <Row gutter={[10, 10]}>
              <Col lg={8} span={12}>
                <Item
                  label="Loại đơn"
                  name={"LoaiKhieuTo1ID"}
                  className="ant-form-title__left "
                  rules={[REQUIRED]}
                >
                  <Select
                    className={"LoaiDonThu"}
                    onChange={(value) => {
                      handleChiTietLoaiKhieuTo(value, 2);
                      form && form.setFieldsValue({ LoaiKhieuTo2ID: null });
                      form && form.setFieldsValue({ LoaiKhieuTo3ID: null });
                    }}
                  >
                    {DanhSachLoaiKhieuTo
                      ? DanhSachLoaiKhieuTo.map((item) => (
                          <Option
                            className={`LoaiKhieuTo_${item.LoaiKhieuToID}`}
                            value={item.LoaiKhieuToID}
                          >
                            {item.TenLoaiKhieuTo}
                          </Option>
                        ))
                      : null}
                  </Select>
                </Item>
                <div
                  style={{ visibility: "hidden", height: 0 }}
                  class={`LoaiKhieuTo1ID`}
                >
                  3
                </div>
              </Col>
              <Col lg={8} span={12}>
                {/* <Item name={'LoaiKhieuTo1ID'} hidden></Item> */}
                <Item
                  label="Lĩnh vực chính"
                  name={"LoaiKhieuTo2ID"}
                  className="ant-form-title__left "
                  rules={[REQUIRED]}
                  // hidden
                >
                  <Select
                    className={"LoaiLinhVuc"}
                    onChange={(value) => {
                      handleChiTietLoaiKhieuTo(value, 3);
                      form && form.setFieldsValue({ LoaiKhieuTo3ID: null });
                    }}
                  >
                    {DanhSachChiTietKhieuTo2
                      ? DanhSachChiTietKhieuTo2.map((item) => (
                          <Option
                            className={`LoaiLinhVuc${item.LoaiKhieuToID}`}
                            value={item.LoaiKhieuToID}
                          >
                            {item.TenLoaiKhieuTo}
                          </Option>
                        ))
                      : null}
                  </Select>
                </Item>
                <div
                  style={{ visibility: "hidden", height: 0 }}
                  class={`LoaiKhieuTo2ID`}
                >
                  3
                </div>
              </Col>
              <Col lg={8} span={12}>
                <Item
                  label="Nội dung"
                  name={"LoaiKhieuTo3ID"}
                  // rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <Select>
                    {DanhSachChiTietKhieuTo3
                      ? DanhSachChiTietKhieuTo3.map((item) => (
                          <Option value={item.LoaiKhieuToID}>
                            {item.TenLoaiKhieuTo}
                          </Option>
                        ))
                      : null}
                  </Select>
                </Item>
                <div
                  style={{ visibility: "hidden", height: 0 }}
                  class={`LoaiKhieuTo3ID`}
                >
                  3
                </div>
              </Col>
            </Row>
            <div class="line" />
            <p className="info-wrapper__title">Nơi phát sinh vụ việc: </p>
            <Row gutter={[10, 10]}>
              <Col lg={6} span={12}>
                <Item
                  label="Chọn tỉnh"
                  name={"TinhID"}
                  className="ant-form-title__left"
                >
                  <Select
                    onChange={(value) => {
                      handleChangeTinh(value, 2, 1);
                      form.setFieldsValue({ HuyenID: null, XaID: null });
                    }}
                  >
                    {DanhSachTinh
                      ? DanhSachTinh.map((item) => (
                          <Option value={item.TinhID}>{item.TenTinh}</Option>
                        ))
                      : null}
                  </Select>
                </Item>
              </Col>
              <Col lg={6} span={12}>
                <Item
                  label="Chọn huyện"
                  name={"HuyenID"}
                  className="ant-form-title__left"
                >
                  <Select
                    onChange={(value) => {
                      handleChangeTinh(value, 2, 2);
                      form.setFieldsValue({ XaID: null });
                    }}
                  >
                    {DanhSachHuyenDonThu
                      ? DanhSachHuyenDonThu.map((item) => (
                          <Option value={item.HuyenID}>{item.TenHuyen}</Option>
                        ))
                      : null}
                  </Select>
                </Item>
              </Col>

              <Col lg={6} span={12}>
                <Item
                  label="Chọn xã"
                  name={"XaID"}
                  className="ant-form-title__left"
                >
                  <Select>
                    {DanhSachXaDonThu
                      ? DanhSachXaDonThu.map((item) => (
                          <Option value={item.XaID}>{item.TenXa}</Option>
                        ))
                      : null}
                  </Select>
                </Item>
              </Col>
              <Col lg={6} span={12}>
                <Item
                  label="Số nhà, tổ/thôn xóm/khu phố"
                  name={"DiaChiPhatSinh"}
                  className="ant-form-title__left"
                >
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Item
                  label="Nội dung đơn"
                  name={"NoiDungDon"}
                  className="ant-form-title__left"
                  rules={[REQUIRED]}
                >
                  <Textarea />
                </Item>
                <div
                  style={{ visibility: "hidden", height: 0 }}
                  class={`NoiDungDon`}
                >
                  3
                </div>
              </Col>
            </Row>
            <p className="info-wrapper__title">Thông tin đã giải quyết: </p>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Item
                  label="Đơn vị đã giải quyết"
                  name={"CQDaGiaiQuyetID"}
                  className="ant-form-title__left"
                >
                  <InputAnt.TextArea />
                </Item>
                {handleRenderDanhSachHoSoTaiLieu(
                  DanhSachHoSoTaiLieuCQGiaiQuyet,
                  2,
                  "Thông tin tài liệu đơn vị đã giải quyết"
                )}
              </Col>
              <Col span={24}>
                <Item
                  label="Kết quả tiếp"
                  name={"KetQuaTiep"}
                  className="ant-form-title__left"
                >
                  <InputAnt.TextArea />
                </Item>
                {handleRenderDanhSachHoSoTaiLieu(
                  DanhSachHoSoTaiLieuKQTIep,
                  3,
                  "Thông tin tài liệu kết quả tiếp"
                )}
              </Col>
              <Col span={24}>
                <Item
                  label="Kết quả giải quyết"
                  name={"KetQuaGiaiQuyet"}
                  className="ant-form-title__left"
                >
                  <InputAnt.TextArea />
                </Item>
                {handleRenderDanhSachHoSoTaiLieu(
                  DanhSachHoSoTaiLieuKQGiaiQuyet,
                  4,
                  "Thông tin tài liệu kết quả giải quyết"
                )}
              </Col>
            </Row>
          </div>
          {/* <div className="line-break" />
          <div className="content-mail__checkbox">
            <Checkbox>Đơn thư không đủ điều kiện xử lý</Checkbox>
          </div> */}
        </>
      );
    } else if (tab === 4) {
      return (
        <div className="user-report wrapper-item">
          <div className="user-report_info_top">
            <Checkbox
              checked={DoiTuongBiKN?.IsNhapThongTin}
              onChange={(e) => {
                const checked = e.target.checked;
                const newThongTinDoiTuongBiKhieuNai = { ...DoiTuongBiKN };
                const newDanhSachDoiTuongBiKhieuNai = [
                  ...newThongTinDoiTuongBiKhieuNai.DanhSachDoiTuongBiKN,
                ];
                if (checked && !DoiTuongBiKN.DanhSachDoiTuongBiKN.length) {
                  newThongTinDoiTuongBiKhieuNai.DanhSachDoiTuongBiKN = [
                    infoDefaultDoiTuongBiKN,
                  ];
                } else {
                  newThongTinDoiTuongBiKhieuNai.DanhSachDoiTuongBiKN = [];
                }
                newThongTinDoiTuongBiKhieuNai["IsNhapThongTin"] = checked;
                setDoiTuongBiKN(newThongTinDoiTuongBiKhieuNai);
              }}
            >
              Nhập thông tin đối tượng bị khiếu nại, tố cáo, PAKN
            </Checkbox>
            {DoiTuongBiKN?.IsNhapThongTin ? (
              <Button type="primary" onClick={handleAddDoiTuongKN}>
                Thêm
              </Button>
            ) : null}
          </div>
          {DoiTuongBiKN?.IsNhapThongTin
            ? DoiTuongBiKN.DanhSachDoiTuongBiKN
              ? DoiTuongBiKN.DanhSachDoiTuongBiKN.map((item, index) => {
                  return (
                    <div className="user-report__top">
                      {DoiTuongBiKN.DanhSachDoiTuongBiKN.length > 1 ? (
                        <div className="report-top__info">
                          <p className="title-user__claims">
                            Thông tin đối tượng khiếu nại {index + 1}
                          </p>
                          {/* <Popover content="Xóa đối tượng khiếu nại"> */}
                          <DeleteOutlined
                            onClick={() => handleDeleteDoiTuongBiKN(index)}
                          />
                          {/* </Popover> */}
                        </div>
                      ) : null}

                      <Item
                        label="Đối tượng bị khiếu nại, tố cáo, PAKN là"
                        // name={`LoaiDoiTuongBiKNID${index}`}
                      >
                        <Radio.Group
                          value={item.LoaiDoiTuongBiKNID}
                          onChange={(e) => {
                            handleChangeLoaiDoiTuongKN(e.target.value, index);
                          }}
                        >
                          <Radio value={1}>Cá nhân</Radio>
                          <Radio value={2}>Cơ quan, tổ chức</Radio>
                        </Radio.Group>
                      </Item>

                      <Row gutter={[10, 10]}>
                        {item.LoaiDoiTuongBiKNID === 1 ? (
                          <Col lg={8} span={12}>
                            <Item
                              label="Họ và tên"
                              name={`TenDoiTuongBiKN${index}`}
                              className="ant-form-title__left"
                              rules={[REQUIRED]}
                            >
                              <Input
                                value={item.TenDoiTuongBiKN}
                                style={{ textTransform: "capitalize" }}
                                onChange={(e) =>
                                  handleChangedThongTinDoiTuongBiKN(
                                    "TenDoiTuongBiKN",
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                            </Item>
                            <div
                              style={{ visibility: "hidden", height: 0 }}
                              class={`TenDoiTuongBiKN`}
                            >
                              4
                            </div>
                          </Col>
                        ) : (
                          <Col span={24}>
                            <Item
                              label="Tên cơ quan, tổ chức"
                              name={"TenCoQuanToChucDoiTuongBiKhieuNai"}
                              className="ant-form-title__left"
                            >
                              <Input
                                onChange={(e) =>
                                  handleChangedThongTinDoiTuongBiKN(
                                    "TenCoQuanToChucDoiTuongBiKhieuNai",
                                    e.target.value,
                                    index
                                  )
                                }
                              />
                            </Item>
                          </Col>
                        )}
                        {item.LoaiDoiTuongBiKNID === 1 ? (
                          <>
                            <Col lg={8} span={12}>
                              <Item
                                label="Nơi công tác"
                                name={`NoiCongTacDoiTuongBiKN${index}`}
                                className="ant-form-title__left"
                                rules={[REQUIRED]}
                              >
                                <Input
                                  value={item.NoiCongTacDoiTuongBiKN}
                                  onChange={(e) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "NoiCongTacDoiTuongBiKN",
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                              </Item>
                              <div
                                style={{ visibility: "hidden", height: 0 }}
                                class={`NoiCongTacDoiTuongBiKN`}
                              >
                                4
                              </div>
                            </Col>
                            <Col lg={8} span={12}>
                              <Item
                                label="Chức vụ"
                                name={`TenChucVu${index}`}
                                className="ant-form-title__left"
                              >
                                <Input
                                  value={item.TenChucVu}
                                  onChange={(e) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "TenChucVu",
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                              </Item>
                            </Col>
                            <Col lg={8} span={12}>
                              <Item
                                label="Giới tính"
                                name={`GioiTinhDoiTuongBiKN${index}`}
                                className="ant-form-title__left"
                              >
                                <Select
                                  value={item.GioiTinhDoiTuongBiKN}
                                  onChange={(value) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "GioiTinhDoiTuongBiKN",
                                      value,
                                      index
                                    )
                                  }
                                >
                                  <Option value={1}>Nam</Option>
                                  <Option value={2}>Nữ</Option>
                                </Select>
                              </Item>
                            </Col>
                            <Col lg={8} span={12}>
                              <Item
                                label="Nghề nghiệp"
                                name={`TenNgheNghiep${index}`}
                                className="ant-form-title__left"
                              >
                                <Input
                                  value={item.TenNgheNghiep}
                                  onChange={(e) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "TenNgheNghiep",
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                              </Item>
                            </Col>
                            <Col xl={4} lg={8} span={12}>
                              <Item
                                label="Quốc tịch"
                                name={`QuocTichDoiTuongBiKNID${index}`}
                                className="ant-form-title__left"
                              >
                                <Select
                                  value={item.QuocTichDoiTuongBiKNID}
                                  onChange={(value) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "QuocTichDoiTuongBiKNID",
                                      value,
                                      index
                                    )
                                  }
                                >
                                  {DanhSachQuocTich
                                    ? DanhSachQuocTich.map((item) => (
                                        <Option value={item.QuocTichID}>
                                          {item.TenQuocTich}
                                        </Option>
                                      ))
                                    : null}
                                </Select>
                              </Item>
                            </Col>
                            <Col xl={4} lg={8} span={12}>
                              <Item
                                label="Dân tộc"
                                name={`DanTocDoiTuongBiKNID${index}`}
                                className="ant-form-title__left"
                              >
                                <Select
                                  value={item.DanTocDoiTuongBiKNID}
                                  onChange={(value) =>
                                    handleChangedThongTinDoiTuongBiKN(
                                      "DanTocDoiTuongBiKNID",
                                      value,
                                      index
                                    )
                                  }
                                >
                                  {DanhSachDanToc
                                    ? DanhSachDanToc.map((item) => (
                                        <Option value={item.DanTocID}>
                                          {item.TenDanToc}
                                        </Option>
                                      ))
                                    : null}
                                </Select>
                              </Item>
                            </Col>
                          </>
                        ) : null}
                        <Col xl={4} lg={8} span={12}>
                          <Item
                            label={
                              <p>
                                Địa chỉ{" "}
                                <span style={{ paddingLeft: 2, color: "red" }}>
                                  (Chọn tỉnh, huyện, xã)
                                </span>
                              </p>
                            }
                            name={`TinhIDDoiTuongBiKN${index}`}
                            className="ant-form-title__left"
                          >
                            <Select
                              value={item.TinhIDDoiTuongBiKN}
                              onChange={(value, options) => {
                                // handleCallApiHuyenDoiTuongKN(value, index, 2);
                                const options2 = {
                                  key: "TenTinh",
                                  value: options?.children
                                    ? options?.children
                                    : null,
                                };
                                handleChangeTinhHuyenXaDoiTuongBiKN(
                                  "TinhID",
                                  value,
                                  options2,
                                  index
                                );
                              }}
                            >
                              {DanhSachTinh
                                ? DanhSachTinh.map((item) => (
                                    <Option value={item.TinhID}>
                                      {item.TenTinh}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </Item>
                        </Col>
                        <Col xl={4} lg={8} span={12}>
                          <Item
                            label="Chọn huyện"
                            name={`HuyenIDDoiTuongBiKN${index}`}
                            className="ant-form-title__left"
                          >
                            <Select
                              value={item.HuyenIDDoiTuongBiKN}
                              onChange={(value, options) => {
                                // handleCallApiXaDoiTuongKN(value, index, 2);
                                const options2 = {
                                  key: "TenHuyen",
                                  value: options?.children
                                    ? options?.children
                                    : null,
                                };
                                handleChangeTinhHuyenXaDoiTuongBiKN(
                                  "HuyenID",
                                  value,
                                  options2,
                                  index
                                );
                              }}
                            >
                              {item.DanhSachHuyen
                                ? item.DanhSachHuyen.map((item) => (
                                    <Option value={item.HuyenID}>
                                      {item.TenHuyen}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </Item>
                        </Col>
                        <Col xl={4} lg={8} span={12}>
                          <Item
                            label="Chọn xã"
                            name={`XaIDDoiTuongBiKN${index}`}
                            className="ant-form-title__left"
                          >
                            <Select
                              value={item.XaIDDoiTuongBiKN}
                              onChange={(value, options) => {
                                const options2 = {
                                  key: "TenXa",
                                  value: options?.children
                                    ? options?.children
                                    : null,
                                };
                                handleChangeTinhHuyenXaDoiTuongBiKN(
                                  "XaID",
                                  value,
                                  options2,
                                  index
                                );
                              }}
                            >
                              {item.DanhSachXa
                                ? item.DanhSachXa.map((item) => (
                                    <Option value={item.XaID}>
                                      {item.TenXa}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </Item>
                        </Col>
                        <Col xl={4} lg={8} span={12}>
                          <Item
                            label="Nhập số nhà, tổ, thôn xóm, khu phố"
                            name={`SoNhaDoiTuongBiKN${index}`}
                            className="ant-form-title__left"
                          >
                            <Input
                              value={item.SoNhaDoiTuongBiKN}
                              onChange={(e) => {
                                const options2 = {
                                  key: "SoNhaDoiTuongBiKN",
                                  value: e.target.value,
                                };
                                handleChangeTinhHuyenXaDoiTuongBiKN(
                                  "SoNhaDoiTuongBiKN",
                                  e.target.value,
                                  options2,
                                  index
                                );
                              }}
                            />
                          </Item>
                        </Col>
                        <Col lg={8} span={12}>
                          <Item
                            label="Chi tiết địa chỉ"
                            name={`DiaChiCTDoiTuongBiKN${index}`}
                            className="ant-form-title__left"
                          >
                            <Input
                              value={item.DiaChiCTDoiTuongBiKN}
                              disabled
                              onChange={(e) =>
                                handleChangedThongTinDoiTuongBiKN(
                                  "DiaChiCT",
                                  e.target.value
                                )
                              }
                            />
                          </Item>
                        </Col>
                      </Row>
                    </div>
                  );
                })
              : null
            : null}
        </div>
      );
    } else if (tab === 5) {
      return (
        <div className="file-wrapper wrapper-item">
          {handleRenderDanhSachHoSoTaiLieu(
            DanhSachHoSoTaiLieu,
            1,
            "Thông tin, tài liệu, bằng chứng có liên quan"
          )}
          {/* <div className="file-wrapper__content">
            <table>
              <thead>
                <th style={{width: '5%'}}>STT</th>
                <th style={{width: '15%'}}>Tên hồ sơ/tài liệu</th>
                <th style={{width: '15%'}}>Ngày cập nhật</th>
                <th style={{width: '15%'}}>Người cập nhật</th>
                <th style={{width: '15%'}}>File đính kèm</th>
                <th style={{width: '10%'}}>Thao tác</th>
              </thead>
              <tbody>
                {DanhSachHoSoTaiLieu
                  ? DanhSachHoSoTaiLieu.map((item, index) => (
                      <tr>
                        <td style={{textAlign: 'center'}}>{index + 1}</td>
                        <td>{item?.TenFile}</td>
                        <td style={{textAlign: 'center'}}>
                          {item.NgayCapNhat
                            ? moment(item.NgayCapNhat).format('DD/MM/YYYY')
                            : ''}
                        </td>
                        <td>{item?.TenNguoiCapNhat}</td>
                        <td style={{textAlign: 'center'}}>
                          {item.FileDinhKem.length > 0 ? (
                            <Popover
                              content={renderContentDownload(item.FileDinhKem)}
                            >
                              <DownloadOutlined
                                style={{fontSize: 15, color: 'blue'}}
                              />
                            </Popover>
                          ) : (
                            ''
                          )}
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <div className="btn-action">
                            <EditOutlined
                              onClick={() => showModalHoSoTaiLieu(index)}
                            />
                            <DeleteOutlined
                              onClick={() => deleteHoSoTaiLieu(index)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div> */}
        </div>
      );
    } else if (tab === 6) {
      return (
        <div className="user-report wrapper-item">
          <div className="user-report__top">
            <Item
              label="Nội dung phản ánh khiếu nại"
              name={"NoiDungPhanAnhKhieuNai"}
              className="ant-form-title__left title_bold"
              rules={[REQUIRED]}
              // {...ITEM_LAYOUT}
            >
              <Textarea />
            </Item>
            <p className="title-noidungtiep">Thông tin đã giải quyết</p>
            <Row gutter={[10, 10]}>
              <Col lg={8} span={12}>
                <Item
                  label="Đơn vị đã giải quyết"
                  name={"DonViDaGiaiQuyetID"}
                  className="ant-form-title__left"
                >
                  <Input />
                </Item>
              </Col>
              <Col lg={8} span={12}>
                <Item
                  label="Ngày ban hành quyết định đã giải quyết"
                  name={"NgayBanHanhQuyetDinhDaGiaiQuyet"}
                  className="ant-form-title__left"
                >
                  <DatePicker format={"DD/MM/YYYY"} placeholder="" />
                </Item>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    if (tab === 7) {
      return (
        <div className="wrapper-item wrapper-tab__item">
          <div>
            <Row gutter={[10, 10]}>
              <Col lg={6} span={12}>
                <Item
                  label="Nguồn đơn đến"
                  name={"NguonDonDen"}
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <Select onChange={(value) => setNguonDonDen(value)}>
                    <Option value={NGUONDONDEN.BuuChinh}>Bưu chính</Option>
                    <Option value={NGUONDONDEN.CoQuanKhac}>
                      Từ cơ quan khác chuyển tới
                    </Option>
                  </Select>
                </Item>
                <div
                  style={{ visibility: "hidden", height: 0 }}
                  class={`NguonDonDen`}
                >
                  1
                </div>
              </Col>

              {NguonDonDen === 22 ? (
                <>
                  <Col lg={6} span={12}>
                    <Item
                      label="Tên cơ quan"
                      name={"CQNgoaiHeThong"}
                      className="ant-form-title__left"
                    >
                      <Input />
                    </Item>
                  </Col>
                </>
              ) : null}
            </Row>
          </div>
        </div>
      );
    }
  };

  const handleSetDefaultFields = async (TiepDanCoDon) => {
    const LoaiKhieuTo1ID = dataEdit?.LoaiKhieuTo1ID;
    if (HuyenIDDefault) {
      handleChangeTinh(HuyenIDDefault, 2, 2);
      handleChangeTinh(HuyenIDDefault, 3, 2);
    }
    const newDiaChiCT = handleRenderDefaultLocation(
      TenTinh,
      TenHuyenDefault,
      TenXaDefault
    );

    const currentYearDefault = dayjs().format("YYYY");
    if (form) {
      form.setFieldsValue({
        TiepDanCoDon: TiepDanCoDon,
        NgayTiep: dayjs(),
        NgayNhapDon: dayjs(),
        NgayVietDon: dayjs(),
        DoiTuongKhieuNaiID: 1,
        DoiTuongBiKhieuNai: 1,
        // SoDon: `${dataEdit?.SoDon}/${currentYearDefault}`,
        SoDonThu: `${dataEdit?.SoDonThu}/${currentYearDefault}`,
        LoaiDoiTuongKNID: 1,
        // LoaiDoiTuongBiKNID: 1,
        TinhIDDoiTuongBiKN: Number(TinhTrienKhai),
        QuocTichDoiTuongBiKNID: QuocTich,
        DanTocDoiTuongBiKNID: DanToc,
        HuyenIDDoiTuongBiKN: HuyenIDDefault,
        XaIDDoiTuongBiKN: XaIDDefault,
        DiaChiCTDoiTuongBiKN: newDiaChiCT,
        TinhID: Number(TinhTrienKhai),
        HuyenID: HuyenIDDefault,
        XaID: XaIDDefault,
        LoaiKhieuTo1ID,
        TenHuyen: TenHuyenDefault,
        TenXa: TenXaDefault,
      });
      // if (dataEdit?.isReload) {
      //   handleChangeTinh(Number(TinhTrienKhai), 3, 1);
      //   handleChangeTinh(Number(TinhTrienKhai), 2, 1);
      // }
      handleChiTietLoaiKhieuTo(LoaiKhieuTo1ID, 1);
    }
  };

  const handleChangedDoiTuongKhieuNai = (LoaiDoiTuongKNID) => {
    const newData = {};
    const newDanhSachDoiTuongKN = DanhSachDoiTuongKN
      ? [...DanhSachDoiTuongKN]
      : [];
    if (newDanhSachDoiTuongKN) {
      newDanhSachDoiTuongKN.forEach((item, index) => {
        for (const key in item) {
          if (key === "NgayCap") {
            newData[`${key}${index}`] = null;
          } else {
            newData[`${key}${index}`] = null;
          }
        }
        return {
          ...item,
        };
      });
    }
    form &&
      form.setFieldsValue({
        ...newData,
        TenCQ: null,
        DiaChiCQ: null,
        SoLuong: null,
      });
    setNhomKN({ ...NhomKN, LoaiDoiTuongKNID: LoaiDoiTuongKNID });
    setDanhSachDoiTuongKN([{}]);
  };

  const { tableLoading, showThanhPhanTiepDan, TiepNhanDon } = props;

  return (
    <Wrapper>
      <Form form={form} name={"FormTiepDan"} onChange={handleChangedFields}>
        {loading ? (
          <div className="Loading">
            <Spin></Spin>
          </div>
        ) : null}
        <div className="top-item__wrapper custom-center">
          {TiepNhanDon ? (
            <Item
              label="Số đơn thư"
              name={"SoDonThu"}
              rules={[{ ...REQUIRED }]}
            >
              <Input />
            </Item>
          ) : (
            // <Item label="Số đơn thư" name={'SoDon'} rules={[{...REQUIRED}]}>
            //   <Input disabled />
            // </Item>
            <Item
              label="Số đơn thư"
              name={"SoDonThu"}
              rules={[{ ...REQUIRED }]}
            >
              <Input disabled />
            </Item>
          )}

          {TiepNhanDon ? (
            <Item label="Ngày tiếp nhận" name={"NgayTiep"} rules={[REQUIRED]}>
              <DatePicker
                onChange={handleChangeNgayTiep}
                placeholder=""
                format={"DD/MM/YYYY"}
              />
            </Item>
          ) : (
            <Item label="Ngày tiếp" name={"NgayTiep"} rules={[REQUIRED]}>
              <DatePicker
                onChange={handleChangeNgayTiep}
                placeholder=""
                format={"DD/MM/YYYY"}
              />
            </Item>
          )}
          <Item label="Ngày ghi đơn" name={"NgayVietDon"}>
            <DatePicker placeholder="" format={"DD/MM/YYYY"} />
          </Item>
        </div>
        <div className="breadCum-content">
          <Collapse
            activeKey={currentKey}
            onChange={(key) => setCurrentKey(key)}
            expandIconPosition="end"
            bordered={false}
          >
            {TiepNhanDon ? (
              <Collapse.Panel header={"Nhập nguồn đơn đến"} key={6} forceRender>
                {handleRenderContentTabs(7)}
              </Collapse.Panel>
            ) : null}
            {showThanhPhanTiepDan ? (
              <Collapse.Panel
                header={"Nhập thành phần tiếp dân"}
                key={5}
                forceRender
              >
                {handleRenderContentTabs(1)}
              </Collapse.Panel>
            ) : null}
            <Collapse.Panel
              header={"Thông tin đối tượng khiếu nại, tố cáo, PAKN"}
              key={1}
              forceRender
            >
              {handleRenderContentTabs(2)}
            </Collapse.Panel>
            <Collapse.Panel header={"Thông tin đơn thư"} key={2} forceRender>
              {handleRenderContentTabs(3)}
            </Collapse.Panel>
            <Collapse.Panel
              header={"Thông tin đối tượng bị khiếu nại, tố cáo, PAKN"}
              key={3}
              forceRender
            >
              {handleRenderContentTabs(4)}
            </Collapse.Panel>
            <Collapse.Panel
              header={"Thông tin tài liệu, bằng chứng"}
              key={4}
              forceRender
            >
              {handleRenderContentTabs(5)}
            </Collapse.Panel>
            {/* <Collapse.Panel
              header={'Thông tin đối tượng bị khiếu nại, tố cáo, PAKN'}
              key={5}
              forceRender
            >
              {IsTiepDanCoDon === 2 ? handleRenderContentTabs(6) : null}
            </Collapse.Panel> */}
          </Collapse>
        </div>
        <Item name={"DonThuID"} hidden>
          <Input />
        </Item>
        <div className="wrapper-btns" style={{ marginTop: "10px" }}>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            form="FormTiepDan"
            loading={loadingSave}
            onClick={onOk}
            icon={<SaveOutlined />}
            className="submit_btn"
          >
            Lưu
          </Button>

          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            form="FormTiepDan"
            loading={loadingSave}
            onClick={(e) => onOk(e, true)}
            icon={<PrinterOutlined />}
          >
            Lưu và in
          </Button>

          <Button
            className="btn-danger"
            key="back"
            loading={loadingSave}
            onClick={props.onCancel}
          >
            Hủy và nhập mới
          </Button>
        </div>
      </Form>
      <ModalAddEditHoSoTaiLieu
        visible={visibleModalHoSoTaiLieu}
        dataEdit={DataModalHoSoTaiLieu}
        key={keyModalHoSoTaiLieu}
        onCreate={submitModalHoSoTaiLieu}
        onCancel={hideModalHoSoTaiLieu}
      />
      <ModalKiemTraTrung
        visible={visibleModalKiemTraTrung}
        dataEdit={dataModalKiemTraTrung}
        key={keyModalKiemTraTrung}
        onCreate={TrungDon}
        onCancel={hideModalKiemTraTrung}
        onCheckTrung={handleShowModalKiemTraTrung}
      />
    </Wrapper>
    // </Modal>
  );
};
