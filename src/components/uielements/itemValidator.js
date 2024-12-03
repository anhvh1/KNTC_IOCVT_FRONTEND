import { Form } from "antd";
const { Item } = Form;
import { checkFieldsValidator } from "../../helpers/utility";
import { MAXLENGTH } from "../../settings/constants";
const customizeItemValidator = (props) => {
  const defaultRules = props.rules ? props.rules : [];

  const { maxLength } = props;
  return (
    <Item
      {...props}
      rules={[
        ...defaultRules,
        !props.isNoCheckRule
          ? {
              validator: (rule, value, callback) =>
                checkFieldsValidator(
                  rule,
                  value,
                  callback,
                  maxLength ? maxLength : MAXLENGTH,
                  props?.name,
                  props?.label,
                  props.isNotCheckAcent
                ),
            }
          : {},
      ]}
    />
  );
};

export { customizeItemValidator };
