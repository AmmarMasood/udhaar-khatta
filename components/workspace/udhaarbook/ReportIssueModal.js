import React from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import moment from "moment";

function ReportIssueModal({
  show,
  onShow,
  selectedTransaction,
  onCompleteReport,
}) {
  const onFinish = (values) => {
    onCompleteReport({
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
      <h2 style={{ marginBottom: "20px" }}>Report Issue</h2>

      <h3>Overview:</h3>
      <div style={{ marginBottom: "20px", lineHeight: "15px" }}>
        <p>Transaction Id: {selectedTransaction?.id}</p>
        <p>Status: {selectedTransaction?.transactionStatus}</p>
        <p>Initiated By: {selectedTransaction?.initiatedBy.email}</p>
        <p>Received By: {selectedTransaction?.receiveBy.email}</p>
      </div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Complain Title"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Complain Description"
          name="description"
          rules={[{ required: true, message: "Please explain the isue!" }]}
        >
          <Input />
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

export default ReportIssueModal;
