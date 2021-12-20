import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/workspace/udhaarbook/UdhaarBookCard.module.scss";
import moment from "moment";
import { Button } from "antd";

function UdhaarBookCard({ connection, user, token }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("connection", connection);
    if (connection) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(
          `${"http://localhost:5001"}/transaction?friendshipId=${connection.id}`
        );
        res.data && setTransactions(res.data.transactions.reverse());
        console.log("yoooooo", res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUdhaarRequest = async (type) => {
    if (type === "CANCEL") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `${"http://localhost:5001"}/transaction?transactionId=<transactionId>&transactionStatus=${type}`
      );
    }
    if (type === "ACCEPT") {
    }
    if (type === "REJECT") {
    }
  };

  return (
    <div>
      {console.log(connection, transactions)}
      <h1>Connection ID: {connection?.id}</h1>
      <p>
        Connection Name:{" "}
        {connection.firstParty?.id === user?.id
          ? connection.secondParty?.firstName +
            " " +
            connection.secondParty?.lastName
          : connection.firstParty?.firstName +
            " " +
            connection.firstParty?.lastName}
      </p>
      <p>
        Connection Email:{" "}
        {connection.firstParty?.id === user?.id
          ? connection.secondParty?.email
          : connection.firstParty?.email}
      </p>
      <p>
        Connection Residence:{" "}
        {connection.firstParty?.id === user?.id
          ? connection.secondParty?.habitualResidence
          : connection.firstParty?.habitualResidence}
      </p>
      <div className={styles.transactionHistoryContainer}>
        {transactions.map((t, i) => (
          <div
            key={i}
            className={
              user?.id === t.initiatedBy
                ? styles.myTransactionCard
                : styles.otherTransactionCard
            }
          >
            <p>Amount: {t?.amount}</p>
            <p>Created On: {moment(t?.createdAt).format("DD/MM/YYYY")}</p>
            {user?.id === t.initiatedBy ? (
              <Button onClick={() => handleUdhaarRequest("CANCEL")}>
                Cancel
              </Button>
            ) : (
              <div>
                <Button onClick={() => handleUdhaarRequest("ACCEPT")}>
                  Accept
                </Button>
                <Button onClick={() => handleUdhaarRequest("REJECT")}>
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UdhaarBookCard;
