import React from "react";
import { InputNumber, Input, Form } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  customValidator,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            customValidator
              ? {
                  validator: (_, value) => {
                    const result = customValidator(value, record[dataIndex]);
                    return result.valid
                      ? Promise.resolve(result.message)
                      : Promise.reject(result.message);
                  },
                }
              : {},
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
