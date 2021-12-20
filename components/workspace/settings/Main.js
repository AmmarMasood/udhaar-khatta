import React, { useRef, useState } from "react";
import { Form, Input, Button, Spin, Select, Cascader } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const residences = [
  {
    value: "karachi",
    label: "Karachi",
  },
  {
    value: "lahore",
    label: "Lahore",
  },
  {
    value: "islamabad",
    label: "Islamabad",
  },
];
function Main({ token }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  function onFinish() {}
  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Settings</h1>

      <Form
        layout="vertical"
        form={form}
        name="complete-profile"
        onFinish={onFinish}
        scrollToFirstError
      >
        {console.log("token", token)}
        <div style={{ width: "75%", paddingLeft: "10px" }}>
          <div>
            <Form.Item
              name="firstName"
              label="Firstname"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Lastname"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="intro" label="Intro">
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input addonBefore={"+92"} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="habitualResidence"
              label="Habitual Residence"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Please select your residence!",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>

            <Form.Item>
              {loading ? (
                <Spin />
              ) : (
                <Button type="primary" htmlType="submit">
                  Update
                  <ArrowRightOutlined />
                </Button>
              )}
            </Form.Item>

            <Button type="danger" style={{ float: "right" }}>
              Delete Account
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Main;
