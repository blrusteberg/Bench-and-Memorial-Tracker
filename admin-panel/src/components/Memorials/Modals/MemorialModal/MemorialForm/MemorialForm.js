import React, { useState } from "react";
import { Form } from "antd";

const MemorialForm = (memorial = null) => {
  const [form] = Form.useForm();
  return (
    <Form>
      <Form.Item></Form.Item>
    </Form>
  );
};

export default MemorialForm;
