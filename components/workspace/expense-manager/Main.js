import React, { useState } from "react";
import { DatePicker, Button, Space, Table } from "antd";
import CreateExpense from "./CreateExpense";
import moment from "moment";

const columns = [
  {
    title: "Item Name",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (value) => {
      moment(value).format("DD/MM/YYYY");
    },
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function Main() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  function onCreateExpense(data) {
    console.log(data);
  }

  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
        Expense Manager
      </h1>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Filter By Month</span>
          <DatePicker
            onChange={onChange}
            picker="month"
            style={{ width: "200px" }}
          />
        </div>
        <Button
          style={{ float: "right", marginTop: "-40px" }}
          type="primary"
          onClick={() => setShowCreateExpenseModal(true)}
        >
          Create Expense
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={allExpenses}
        style={{ marginTop: "20px" }}
      />

      <CreateExpense
        show={showCreateExpenseModal}
        onShow={setShowCreateExpenseModal}
        onCreateExpense={onCreateExpense}
      />
    </div>
  );
}

export default Main;
