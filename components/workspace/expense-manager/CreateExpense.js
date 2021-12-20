import React from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";

function CreateExpense({ show, onShow, onCreateExpense }) {
  const onFinish = (values) => {
    onCreateExpense(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal visible={show} onCancel={() => onShow(false)} footer={false}>
      <h2 style={{ marginBottom: "20px" }}>Create Expense</h2>

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Item Name"
          name="itemName"
          rules={[{ required: true, message: "Please input item name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input expense amount!" }]}
        >
          <Input type="number" addonBefore="Rs." />
        </Form.Item>

        <Form.Item
          label="Date"
          name="expenseDate"
          rules={[{ required: true, message: "Please input expense date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateExpense;
