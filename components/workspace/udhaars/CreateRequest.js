import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Radio, Select, DatePicker } from "antd";
import { openNotificationWithIcon } from "@/helpers/notifications";
import axios from "axios";
const { Option } = Select;

function CreateRequest({ visible, setVisible, token, user }) {
  const [invites, setInvites] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship`
    );
    setInvites(res.data);
    console.log("hello", res, res.data);
  };

  const onFinish = async (values) => {
    console.log("yes", values);
    if (Object.keys(selectedPerson).length > 0 && values.amount) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/transaction/initiate`,
          { ...selectedPerson, amount: values.amount }
        );
        if (res) {
          openNotificationWithIcon("success", "Request Initiated Successfully");
        }
      } catch (e) {
        openNotificationWithIcon(
          "error",
          "Unable to create request, please try later"
        );
        console.log(e);
      }
    } else {
      openNotificationWithIcon("error", "Please enter both values");
    }
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
      <Form onFinish={onFinish} layout={"vertical"}>
        <Form.Item label="Select Your Friend" name="person">
          <Select
            style={{ width: "100%" }}
            onChange={(e) => {
              user?.id === JSON.parse(e).secondParty?.id
                ? setSelectedPerson({
                    friendshipId: JSON.parse(e).id,
                    requestedUserId: JSON.parse(e).firstParty?.id,
                  })
                : setSelectedPerson({
                    friendshipId: JSON.parse(e).id,
                    requestedUserId: JSON.parse(e).secondParty?.id,
                  });
            }}
          >
            {invites.map((v, i) => (
              <Option key={i} value={JSON.stringify(v)}>
                {user?.id === v.secondParty?.id
                  ? `${v.firstParty?.firstName} ${v.firstParty?.lastName}`
                  : `${v.secondParty?.firstName} ${v.secondParty?.lastName}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input addonBefore="Rs." type="number" placeholder="Enter Amount" />
        </Form.Item>

        {/* <Form.Item label="Interest Rate" name="interestRate">
          <Input
            type="number"
            placeholder="Enter Intrest Rate"
            addonAfter="%"
          />
        </Form.Item> */}

        {/* <Form.Item label="Paid By" name="paidBy">
          <DatePicker onChange={(e) => console.log(e)} />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateRequest;
