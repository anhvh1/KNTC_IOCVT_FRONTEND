import {Form} from 'antd';
import {handleChangedFields} from '../../helpers/utility';
const customizeFormValidator = (props) => {
  return (
    <Form
      onForm={Form.useForm}
      {...props}
      onFieldsChange={() => {
        handleChangedFields(
          props.form || props.ref,
          props.onChangeStatusButton,
          props.name,
        );
      }}
    />
  );
};

const {useForm} = Form;

export {customizeFormValidator, useForm};
