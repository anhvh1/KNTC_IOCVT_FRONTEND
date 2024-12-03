import React, { useState } from "react";
import dayjs from "dayjs";
import { apiUrl } from "../config";
import { useGetApi } from "../../../../CustomHook/useGetApi";
const FormGeneralInspectionInfo = ({ dataFields, title }) => {
  const listFields = useGetApi(apiUrl.listfield);

  return (
    <>
      <p className="title">{title}</p>
      <div className="wrapper-inspection-info">
        <div className="inspection-info">
          <div className="item">
            <label>
              Phân loại <span className="required">*</span>
            </label>
            <div className="list-item">{dataFields?.HinhThuc}</div>
          </div>
          <div className="item">
            <label>
              Lĩnh vực chính <span className="required">*</span>
            </label>
            <div className="list-item">{dataFields?.LinhVuc}</div>
          </div>
          <div className="item">
            <label>
              Lĩnh vực thanh tra <span className="required">*</span>
            </label>
            <div className="list-item">
              {" "}
              {dataFields.LinhVucPhuIDs
                ? dataFields.LinhVucPhuIDs.split(",").map((id) => {
                    const data = listFields.find(
                      (item) => item.PhanLoaiThanhTraID === Number(id)
                    );
                    return data ? <p>{data.TenPhanLoaiThanhTra}</p> : null;
                  })
                : null}
            </div>
          </div>
          <div className="item">
            <label>
              Đối tượng <span className="required">*</span>
            </label>
            <div className="list-item">
              {dataFields?.DanhSachDoiTuongThanhTra
                ? dataFields?.DanhSachDoiTuongThanhTra.map((item) => (
                    <p>{item.TenCoQuan}</p>
                  ))
                : ""}
            </div>
          </div>

          <div className="item">
            <label>
              Nội dung <span className="required">*</span>
            </label>
            <p>{dataFields?.NoiDung}</p>
          </div>

          <div className="item">
            <label>Thời gian thanh tra</label>
            <p>{dataFields?.ThoiGianTienHanh}</p>
          </div>

          <div className="item">
            <label>Đơn vị phối hợp</label>
            <p>{dataFields?.DonViPhoiHop}</p>
          </div>

          <div className="item">
            <label>Thời hạn thanh tra (ngày)</label>
            <p>{dataFields?.ThoiHanThanhTra}</p>
          </div>

          <div className="item">
            <label>Đơn vị chủ trì</label>
            <p>{dataFields?.DonViChuTri}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormGeneralInspectionInfo;
