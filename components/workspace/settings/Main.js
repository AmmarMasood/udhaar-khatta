import React, { useEffect, useState, useContext } from "react";
import { Form, Input, Button, Spin, Select, Cascader } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import AvatarUploader from "@/components/common/AvatarUploader";
import { AuthContext } from "../../../context/AuthContext";

function Main({ token }) {
  const [form] = Form.useForm();
  const { user, checkUserLoggedIn, updateProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [myAvatar, setMyAvatar] = useState("");

  useEffect(() => {
    console.log("user", user);
    checkUserLoggedIn();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      intro: user?.intro,
      phoneNumber: user?.phoneNumber,
      gender: user?.gender,
      habitualResidence: user?.habitualResidence,
    });
    setMyAvatar(user?.profileUrl);
  }, [user]);

  function onFinish(values) {
    console.log("values", values, myAvatar);
    updateProfile({ ...values, profileUrl: myAvatar }, token, setLoading);
  }
  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Settings</h1>
      <AvatarUploader avatar={myAvatar} setMyAvatar={setMyAvatar} />
      <Form
        layout="vertical"
        form={form}
        name="complete-profile"
        onFinish={onFinish}
        scrollToFirstError
      >
        {console.log("token", token)}
        <div
          style={{
            paddingLeft: "10px",
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ flexGrow: "0.5" }}>
            <Form.Item name="email" label="Email">
              <Input disabled="true" />
            </Form.Item>
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

          <div style={{ flexGrow: "0.5", marginLeft: "10px" }}>
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
                  required: true,
                  message: "Please select your residence!",
                },
              ]}
            >
              <Select placeholder="select your residence">
                <Select.Option value="karachi">Karachi</Select.Option>
                <Select.Option value="lahore">Lahore</Select.Option>
                <Select.Option value="islamabad">Islamabad</Select.Option>
              </Select>
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

            {/* <Button
              type="danger"
              style={{ float: "right", marginTop: "100px" }}
              onClick={() => deleteMyAcount()}
            >
              Delete Account
            </Button> */}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Main;
