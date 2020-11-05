import React from "react";
import { Select } from "antd";
const { Option } = Select;

const TypeSelect = ({
  Types,
  disabled = false,
  onTypeSelect = () => {},
  ...restProps
}) => {
  return (
    <Select
      {...restProps}
      disabled={disabled}
      style={{ fontWeight: "normal" }}
      showSearch
      placeholder="Select a type"
      onChange={onTypeSelect}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {Types.map((type) => (
        <Option value={type.Id} key={type.Id}>
          {type.Name}
        </Option>
      ))}
    </Select>
  );
};

export default TypeSelect;
