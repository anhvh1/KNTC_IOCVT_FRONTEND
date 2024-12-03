import React, { useState, useEffect } from "react";
import { Modal, Table, Tooltip, message } from "antd";
import FormGeneralInspectionInfo from "./FormGeneralInspectionInfo";
import { FormWrapper } from "./form.style";
import FormImport from "./FormImport";
import FormMember from "./FormMember";
import FormInspect from "./FormInspect";
import FormDocumentCollect from "./FormDocumentCollect";
import FormHistory from "./FormHistory";
import FormReportResult from "./FormReportResult";
import FormReport from "./FormReport";
import FormSuspendExtendDate from "./FormSuspendExtendDate";
import FormNotice from "./FormNotice";
import FormResult from "./FormResult";
import FormAnnounceConclusion from "./QuanLyKienNghiXuLyVPHC";
import api from "../config";
const ContentComponent = ({
  activeMenu,
  form,
  menuItems,
  CuocThanhTraID,
  dataFields,
  ListDoiTuong,
}) => {
  const formRef = form;
  const title = menuItems.find((item) => item.key === activeMenu)?.label;
  const passingProps = {
    form: formRef,
    title,
    CuocThanhTraID,
    dataFields,
    ListDoiTuong,
  };
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const renderContent = () => {
    switch (activeMenu) {
      case "1":
        return <FormGeneralInspectionInfo CuocThanhTraID={CuocThanhTraID} />;
      case "2":
        return <FormHistory CuocThanhTraID={CuocThanhTraID} />;
      case "3":
        return <FormImport CuocThanhTraID={CuocThanhTraID} {...passingProps} />;
      case "4":
        return <FormMember CuocThanhTraID={CuocThanhTraID} {...passingProps} />;
      case "5":
        return (
          <FormInspect CuocThanhTraID={CuocThanhTraID} {...passingProps} />
        );
      case "6":
        return (
          <FormDocumentCollect
            CuocThanhTraID={CuocThanhTraID}
            {...passingProps}
          />
        );
      case "7":
        return <FormReport CuocThanhTraID={CuocThanhTraID} {...passingProps} />;
      case "8":
        return (
          <FormReportResult CuocThanhTraID={CuocThanhTraID} {...passingProps} />
        );
      case "9":
        return (
          <FormSuspendExtendDate
            CuocThanhTraID={CuocThanhTraID}
            {...passingProps}
          />
        );
      case "10":
        return <FormNotice {...passingProps} />;
      case "11":
        return <FormAnnounceConclusion {...passingProps} />;
      case "17":
        return <FormResult {...passingProps} />;
      default:
        return null;
    }
  };

  return <FormWrapper>{renderContent()}</FormWrapper>;
};

export default ContentComponent;
