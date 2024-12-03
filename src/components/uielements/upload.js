import { Upload as AntUpload } from "antd";
import { getLocalKey } from "../../helpers/utility";

const Upload = (props) => {
  const data_config = getLocalKey("data_config");
  console.log(
    props.accept
      ? props.accept
      : data_config?.AcceptFileUpload
      ? data_config?.AcceptFileUpload
      : "pdf",
    "props.accept"
  );
  return (
    <AntUpload
      {...props}
      accept={
        props.accept
          ? props.accept
          : data_config?.AcceptFileUpload
          ? data_config?.AcceptFileUpload
          : ".pdf"
      }
    >
      {props.children}
    </AntUpload>
  );
};

export default Upload;
