import React, { useState } from "react";
import { Button, Drawer } from "antd";

function CreateRequest({ visible, setVisible }) {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title="New Udhaar Request"
      placement="right"
      size={"large"}
      onClose={onClose}
      width="70vw"
      visible={visible}
    >
      {/* <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ display: "flex" }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email address!",
            },
            {
              type: "email",
              message: "Please enter correct email address!",
            },
          ]}
        >
          <Input
            placeholder="Enter email"
            style={{ width: "380px", marginRight: "10px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form> */}
    </Drawer>
  );
}

export default CreateRequest;
