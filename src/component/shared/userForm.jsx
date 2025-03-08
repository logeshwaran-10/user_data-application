import React, { useState } from "react";
import { Button, Flex, Form, Input, Space } from "antd";

const UserForm = ({ data, handleSubmit, handleCancel }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(data);

  const onChangeForm = (value, formValue) => {
    setFormData(formValue);
  };

  const fields = [
    { lable: "Name", name: "name", type: "text" },
    { lable: "Email", name: "email", type: "email" },
    { lable: "Phone", name: "phone", type: "tel" },
    { lable: "Website", name: "website", type: "text" },
  ];

  return (
    <Form
      layout={"vertical"}
      form={form}
      initialValues={formData}
      onValuesChange={onChangeForm}
      onFinish={handleSubmit}
    >
      {fields.map((field) => (
        <Form.Item
          label={field?.lable}
          name={field.name}
          rules={[
            {
              required: true,
              whitespace: true,
              message: `Please enter the ${field.name}`,
            },
          ]}
        >
          <Input placeholder={`Please enter the ${field.name}`} />
        </Form.Item>
      ))}

      <Form.Item>
        <Flex justify={"center"}>
          <Space>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
};
export default UserForm;
