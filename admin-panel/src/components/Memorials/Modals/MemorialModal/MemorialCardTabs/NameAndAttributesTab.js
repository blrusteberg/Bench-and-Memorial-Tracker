import React, { useState } from "react";
import { Form, Select } from "antd";

const [selectedType, setSelectedType] = useState();

const { Option } = Select;

const onTypeSelect = (typeId) => {
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (type.Id === typeId) {
      setSelectedType(type);
      return;
    }
  }
};

const NameAndAttributes = ({ types }) => {
  return (
    <>
      <Form.Item label="Type">
        <Select
          showSearch
          placeholder="Select a type"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={onTypeSelect}
        >
          {types.map((type) => (
            <Option value={type.Id} key={type.Id}>
              {type.Name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {selectedType &&
        selectedType.Attributes.map((attribute) => (
          <Form.Item key={attribute.Id} label={attribute.Name}>
            <Input />
          </Form.Item>
        ))}
    </>
  );
};

export default NameAndAttributes;
