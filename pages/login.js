import Layout from "@/components/common/Layout";
import styles from "@/styles/pages/Login.module.scss";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Layout
      childern={
        <div className={styles.container}>
          <div className={styles.loginForm}>
            <h1>Login</h1>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
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
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link
                  className={styles.forgot}
                  href="/reset-password/send-link"
                >
                  Forgot Password
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Log in
                </Button>
                Or <Link href="/join/create-account">register now!</Link>
              </Form.Item>
            </Form>
          </div>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={"/images/undraw_online_payments_re_y8f2.svg"}
              height={500}
              width={400}
            />
          </div>
        </div>
      }
    />
  );
}
