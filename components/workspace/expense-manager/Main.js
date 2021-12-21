import React, { useState, useEffect } from "react";
import { DatePicker, Button, Space, Table } from "antd";
import CreateExpense from "./CreateExpense";
import moment from "moment";
import axios from "axios";
import { openNotificationWithIcon } from "@/helpers/notifications";
import ReloadButton from "@/components/common/ReloadButton";

function Main({ token }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState("");
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    fetchData(today.getFullYear(), today.getMonth() + 1);
  }, []);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value) => {
        return <span>Rs. {value}</span>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (value) => {
        return moment(value).format("DD/MM/YYYY");
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="danger" onClick={() => deleteExpense(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  function onChange(date, dateString) {
    console.log(date, dateString);
    const year = dateString.split("-")[0];
    const month = dateString.split("-")[1];
    fetchData(year, month);
  }
  async function onCreateExpense(data) {
    console.log(data);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/expense`,
        data
      );
      console.log("damn", res);
      if (res) {
        openNotificationWithIcon("success", "Expense added successfully");
        fetchData();
      }
    } catch (err) {
      console.log("err", err);
      openNotificationWithIcon("error", "Unable to add expense");
    }
  }

  async function fetchData(year, month) {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/expense?year=${year}&month=${month}`
      );
      if (res) {
        setAllExpenses(res.data.expenses);
      }
      console.log("damn", res);
    } catch (err) {
      console.log("err", err);
      openNotificationWithIcon("error", "Unable to add expense");
    }
  }

  async function deleteExpense(id) {
    // console.log(data);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/expense/${id}`
      );
      console.log("damn", res);
      if (res) {
        openNotificationWithIcon("success", "Expense deleted successfully");
        fetchData();
      }
    } catch (err) {
      console.log("err", err);
      openNotificationWithIcon("error", "Unable to added expense");
    }
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
            defaultValue={moment(today)}
            picker="month"
            style={{ width: "200px" }}
          />
        </div>
        <Button
          style={{ float: "left", marginTop: "-34px", marginLeft: "250px" }}
          type="primary"
          onClick={() => setShowCreateExpenseModal(true)}
        >
          Create Expense
        </Button>
      </div>
      {/* <ReloadButton
        onClick={() => fetchData(today.getFullYear(), today.getMonth() + 1)}
      /> */}
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
