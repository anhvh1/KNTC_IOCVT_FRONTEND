import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { FORM, FORMCOL } from "../../../../../settings/constants";
import FormDynamic from "../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
import { handleRenderFileDinhKem } from "./common";
import dayjs from "dayjs";
const FormImport = ({
  form,
  title,
  dataFields,
  ListTruongPhong,
  ListThanhVien,
}) => {
  return (
    <>
      <>
        <p className="title">{title}</p>
        <div className="wrapper-info">
          <div className="item">
            <label>Số văn bản</label>
            <div className="list-item">{dataFields?.SoVanBan}</div>
          </div>

          <div className="item">
            <label>Ngày ban hành</label>
            <p>
              {dataFields?.NgayBanHanh
                ? dayjs(dataFields.NgayBanHanh).format("DD/MM/YYYY")
                : null}
            </p>
          </div>

          <div className="item-full">
            <label>Đơn vị, cơ quan ban hành</label>
            <p>{dataFields?.CoQuanBanHanh}</p>
          </div>

          <div className="item-full">
            <label>Trích yếu</label>
            <p>{dataFields?.TrichYeu}</p>
          </div>

          <div className="item">
            <label>Người ký</label>
            <p>{dataFields?.NguoiKy}</p>
          </div>

          <div className="item">
            <label>Chức vụ người ký</label>
            <p>{dataFields?.ChucVuNguoiKy}</p>
          </div>

          <div className="item">
            <label>Trưởng đoàn</label>
            <p>{dataFields?.TruongDoanStr}</p>
          </div>
          <div className="item">
            <label>Phó đoàn</label>
            <p>{dataFields?.PhoDoanStr}</p>
          </div>
          <div className="item">
            <label>Thành viên</label>
            <p>{dataFields?.ThanhVienStr}</p>
          </div>
          <div className="item">
            <label>Người giám sát</label>
            <p>{dataFields?.NguoiGiamSatStr}</p>
          </div>
          <div className="item">
            <label>Thời gian thanh tra trực tiếp</label>
            <p>
              {dataFields?.ThoiGianTTStart
                ? dayjs(dataFields?.ThoiGianTTStart).format("DD/MM/YYYY")
                : null}
              {dataFields?.ThoiGianTTEnd
                ? ` - ${dayjs(dataFields?.ThoiGianTTEnd).format("DD/MM/YYYY")}`
                : null}
            </p>
          </div>
          <div className="item-file">
            <label>File đính kèm</label>
            <div className="fileWrapper">
              {handleRenderFileDinhKem(
                dataFields?.ListFile ? dataFields.ListFile : []
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default FormImport;
