import { Modal } from "../../../../components/uielements/exportComponent";
import { useForm } from "../../../../components/uielements/formValidator";
import { FORM } from "../../../../settings/constants";
import FormDynamic from "../Shared/Component/Form";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import { Button } from "../../../../components/uielements/exportComponent";
const ModalComplete = ({ onCancel, visible, loading }) => {
  const [form] = useForm();

  const onOk = () => {
    form.validateFields().then((values) => {
      if (values.FileDinhKem) {
        const { fileList } = values.FileDinhKem;
      }
    });
  };

  const listFields = [
    {
      name: "ListFiles",
      label: "",
      type: FORM.Upload,
    },
  ];

  return (
    <Modal
      visible={visible}
      title="Hoàn tất xử lý chồng chéo"
      onCancel={onCancel}
      width={900}
      footer={[
        <Button key="back" onClick={onCancel} type="danger">
          <CloseSquareFilled />
          Đóng
        </Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={loading}>
          <SaveFilled />
          Xác nhận
        </Button>,
      ]}
    >
      <FormDynamic form={form} listFields={listFields} />
    </Modal>
  );
};

export default ModalComplete;
