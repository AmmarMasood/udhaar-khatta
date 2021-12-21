import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/workspace/udhaarbook/UdhaarBookCard.module.scss";
import moment from "moment";
import { Button, Avatar } from "antd";
import { openNotificationWithIcon } from "@/helpers/notifications";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import ReloadButton from "@/components/common/ReloadButton";
import ReportIssueModal from "./ReportIssueModal";

function UdhaarBookCard({ connectionId, user, token }) {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/transaction?friendshipId=${connectionId}`
      );
      res.data &&
        setTransactions(
          res.data.transactions.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
      console.log("yoooooo", res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleUdhaarRequest = async (type, id) => {
    setLoading(true);
    try {
      if (type === "CANCELLED") {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/transaction/cancel?transactionId=${id}`
        );
        if (res) {
          openNotificationWithIcon(
            "success",
            `Successfully ${type} the request`
          );
          fetchData();
        }
        console.log(res);
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/transaction?transactionId=${id}&transactionStatus=${type}`
        );
        if (res) {
          openNotificationWithIcon(
            "success",
            `Successfully ${type} the request`
          );
          fetchData();
        }
        console.log(res);
      }
    } catch (err) {
      openNotificationWithIcon("error", `Error while ${type} the request`);
    }

    setLoading(false);
  };

  function onCompleteReport(values) {
    console.log(values);
  }

  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
        <LeftOutlined
          onClick={() => router.back()}
          style={{ marginRight: "10px", color: "#e87040", cursor: "pointer" }}
        />
      </h1>
      <div className={styles.udhaarCardTopContainer}>
        <ReloadButton loading={loading} onClick={() => fetchData()} />
        {transactions.length > 0 ? (
          <div className={styles.transactionHistoryContainer}>
            {transactions.map((t, i) => (
              <div
                key={i}
                className={
                  user?.id === t.initiatedBy.id
                    ? styles.myTransactionCard
                    : styles.otherTransactionCard
                }
              >
                <div>
                  <Avatar
                    size={64}
                    src={t.initiatedBy.profileUrl}
                    icon={<UserOutlined />}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    {t.initiatedBy.firstName + " " + t.initiatedBy.lastName}
                  </span>
                </div>
                <div style={{ marginLeft: "75px", lineHeight: "10px" }}>
                  <p style={{ marginBottom: "30px" }}>
                    Request ID:
                    <span>Rs. {t?.id}.</span>
                  </p>
                  <p>
                    I want to get Udhaar of{" "}
                    <span style={{ fontWeight: "600" }}>Rs. {t?.amount}.</span>
                  </p>

                  <p>
                    {moment(t?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                  <p style={{ marginTop: "20px" }}>
                    {user?.id === t.initiatedBy.id
                      ? t.transactionStatus === "PENDING"
                        ? "Waiting for the conection to respond to this request."
                        : t.transactionStatus === "ACCEPTED"
                        ? "Request accpted by connection"
                        : t.transactionStatus === "CANCELLED"
                        ? "Request cancelled."
                        : t.transactionStatus === "REJECTED"
                        ? "Request rejected by connection"
                        : ""
                      : t.transactionStatus === "PENDING"
                      ? "This request is pending for your response"
                      : t.transactionStatus === "ACCEPTED"
                      ? "You have accepted this request"
                      : t.transactionStatus === "CANCELLED"
                      ? "Request cancelled by conection"
                      : t.transactionStatus === "REJECTED"
                      ? "You have rejected the request"
                      : ""}
                  </p>
                </div>
                <div
                  style={{
                    float: "right",
                    marginRight: "20px",
                    marginTop: "20px",
                  }}
                >
                  {t.transactionStatus === "PENDING" ? (
                    user?.id === t.initiatedBy.id ? (
                      <Button
                        onClick={() => handleUdhaarRequest("CANCELLED", t.id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <div>
                        <Button
                          onClick={() => handleUdhaarRequest("REJECTED", t.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleUdhaarRequest("ACCEPTED", t.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Accept
                        </Button>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  type="link"
                  onClick={() => {
                    setSelectedTransaction(t);
                    setShowReportIssueModal(true);
                  }}
                >
                  Report Issue?
                </Button>
              </div>
            ))}
          </div>
        ) : loading ? (
          ""
        ) : (
          <h2 style={{ fontSize: "30px", textAlign: "center" }}>
            No Transactions Found 😔{" "}
          </h2>
        )}{" "}
      </div>
      <ReportIssueModal
        show={showReportIssueModal}
        selectedTransaction={selectedTransaction}
        onShow={setShowReportIssueModal}
        onCompleteReport={onCompleteReport}
      />
    </div>
  );
}

export default UdhaarBookCard;
