import React, { useState, useEffect } from "react";
import { Form, Select, Input } from "antd";

const { Option } = Select;

const NameAndAttributes = ({ types }) => {
  const [selectedType, setSelectedType] = useState();

  const onTypeSelect = (typeId) => {
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      if (type.Id === typeId) {
        setSelectedType(type);
        return;
      }
    }
  };

  return (
    <>
      <Form.Item
        label="Memorial Name"
        rules={[{ required: true, message: "Enter a memorial name" }]}
      >
        <Input />
      </Form.Item>
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
