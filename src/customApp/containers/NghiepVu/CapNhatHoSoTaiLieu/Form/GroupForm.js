import React from "react";
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
import FormAnnounceConclusion from "./FormAnnounceConclusion";
import FormMemberMinitor from "./FormMemberMinitor";
import FormExtendDate from "./FormExtendDate";
const ContentComponent = (props) => {
  const {
    activeMenu,
    form,
    menuItems,
    onOk,
    onRemove,
    dataFields,
    showModal,
    hideModal,
    stateModal,
    onChangeForm,
  } = props;
  const formRef = form;
  const title = menuItems.find((item) => item.key === activeMenu)?.label;
  const passingProps = {
    form: formRef,
    title,
    activeMenu,
    onRemove,
    dataFields,
    onOk,
    showModal,
    hideModal,
    stateModal,
    onChangeForm,
    ...props,
  };
  const renderContent = () => {
    switch (activeMenu) {
      case "1":
        return <FormGeneralInspectionInfo {...passingProps} />;
      case "2":
        return <FormImport {...passingProps} />;
      case "3":
        return <FormInspect {...passingProps} />;
      case "4":
        return <FormDocumentCollect {...passingProps} />;
      case "5":
        return <FormMember {...passingProps} />;
      case "6":
        return <FormMemberMinitor {...passingProps} />;
      case "7":
        return <FormHistory {...passingProps} />;
      case "8":
        return <FormReport {...passingProps} />;
      case "9":
        return <FormReportResult {...passingProps} />;
      case "10":
        return <FormExtendDate {...passingProps} />;
      case "11":
        return <FormSuspendExtendDate {...passingProps} />;
      case "12":
        return <FormNotice {...passingProps} />;
      case "13":
        return <FormResult {...passingProps} />;
      case "14":
        return <FormAnnounceConclusion {...passingProps} />;
      default:
        return null;
    }
  };

  return <FormWrapper>{renderContent()}</FormWrapper>;
};

export default ContentComponent;
