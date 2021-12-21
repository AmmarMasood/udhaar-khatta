import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import moment from "moment";

function CreateExpense({ show, onShow, onCreateExpense }) {
  const onFinish = (values) => {
    onCreateExpense({
      ...values,
      dateCreated: moment(values.dateCreated).format("YYYY-MM-DD"),
    });
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
          name="name"
          rules={[{ required: true, message: "Please input item name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Item Description" name="description">
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
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="select your category">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="grocery">Grocery</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="dateCreated"
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
