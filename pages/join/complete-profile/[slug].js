import Layout from "@/components/common/Layout";
import styles from "@/styles/pages/Join.module.scss";
import { Form, Input, Button, Cascader, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";

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

export default function CompleteProfile({ slug }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          {console.log(slug)}
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <h1>Complete Profile</h1>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input value={slug} />
              </Form.Item>

              <Form.Item
                name="firstname"
                label="Firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input />
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

              <Form.Item name="intro" label="Intro">
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
            </div>

            <div className={styles.rightContainer}>
              <Form.Item
                name="phone"
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
                name="lastname"
                label="Lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="residence"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Submit
                  <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      }
    />
  );
}

export async function getServerSideProps({ query: { slug } }) {
  console.log("ammar", slug);

  return {
    props: {
      slug: slug,
    },
  };
}
