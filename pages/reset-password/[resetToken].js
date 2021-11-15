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
          <h1>Create A New Password</h1>
          <p>Please create a new password for your account.</p>
          <Form
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "500px", margin: "0 auto" }}
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
                { min: 8, message: "Password must be minimum 8 characters." },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
              >
                Complete
              </Button>
            </Form.Item>
          </Form>
        </div>
      }
    />
  );
}
