import { useEffect, useContext, useState } from "react";
import parseCookies from "@/helpers/cookieParser";
import Layout from "@/components/common/Layout";
import styles from "@/styles/pages/Join.module.scss";
import { Form, Input, Button, Cascader, Select, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { AuthContext } from "@/context/AuthContext";
import AvatarUploader from "@/components/common/AvatarUploader";

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

export default function CompleteProfile({ token }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { completeProfile, error } = useContext(AuthContext);
  const [myAvatar, setMyAvatar] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    completeProfile(values, token, setLoading);
  };

  return (
    <Layout
      childern={
        <Form
          layout="vertical"
          form={form}
          name="complete-profile"
          onFinish={onFinish}
          scrollToFirstError
        >
          {console.log("token", token)}
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <h1>Complete Profile</h1>
              <span style={{ marginBottom: "10px" }}>Avatar</span>
              <AvatarUploader avatar={myAvatar} setMyAvatar={setMyAvatar} />
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

            <div className={styles.rightContainer}>
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.button}
                  >
                    Submit
                    <ArrowRightOutlined />
                  </Button>
                )}
              </Form.Item>
            </div>
          </div>
        </Form>
      }
    />
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  //   this is only available on server and not cliet!!!!
  // how good is that fam?
  console.log(token);
  return {
    props: {
      token: token,
    },
  };
}
