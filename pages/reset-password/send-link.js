import Layout from "@/components/common/Layout";
import styles from "@/styles/pages/ResetPassword.module.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Layout
      childern={
        <div className={styles.container}>
          <h1>Reset Your Password</h1>
          <p>
            Please enter your email address and we will send you an link to
            reset your password.
          </p>
          <Form
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email address!",
                },
                {
                  type: "email",
                  message: "Please enter correct email address!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
              >
                Send Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      }
    />
  );
}
