import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import axios from "axios";
import { openNotificationWithIcon } from "@/helpers/notifications";
import setAuthToken from "@/helpers/useAuthToken";
import InviteRequestUserCard from "./InviteRequestUserCard";

function InviteRequest({ visible, setVisible }) {
  const [foundPerson, setFoundPerson] = useState(null);

  const onFinish = async (values) => {
    setAuthToken(localStorage.getItem("jwt"));
    if (values.email) {
      const res = await axios.get(
        `${process.env.BACKEND_API}/friendship/find/user?email=${values.email}`
      );
      if (res.data && res.data.email) {
        setFoundPerson(res.data);
      } else {
        setFoundPerson("Not Found");
      }
      console.log("hello", res);
    } else {
      openNotificationWithIcon("error", "Please enter ");
    }
  };

  return (
    <Modal
      title="Send An Invite"
      footer={false}
      visible={visible}
      setVisible={setVisible}
      onCancel={() => setVisible(false)}
    >
      <Form
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
      </Form>
      {foundPerson && typeof foundPerson === "object" ? (
        <InviteRequestUserCard
          id={foundPerson?.id}
          email={foundPerson?.email}
        />
      ) : typeof foundPerson === "string" ? (
        <p>No person found with given email</p>
      ) : (
        ""
      )}
    </Modal>
  );
}

export default InviteRequest;
