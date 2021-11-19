import React from "react";
import styles from "@/styles/components/workspace/invitations/InviteRequestUserCard.module.scss";
import { Button, Card } from "antd";
import setAuthToken from "@/helpers/useAuthToken";
import axios from "axios";
import { openNotificationWithIcon } from "@/helpers/notifications";

function InviteRequestUserCard({ id, email }) {
  const sendInvite = async () => {
    setAuthToken(localStorage.getItem("jwt"));

    const res = await axios.post(
      `${process.env.BACKEND_API}/friendship/send/request?friendId=${id}`
    );
    if (res) {
      openNotificationWithIcon(
        "success",
        "Invite sent to the user, we will inform you when user accept your invite "
      );
    }
  };

  return (
    <Card
      title="Found A Person With Given Email"
      extra={<Button onClick={sendInvite}>Send An Invite</Button>}
      style={{ width: "100%" }}
    >
      <div className={styles.container}>
        <p>
          <span>ID:</span> {id}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
      </div>
    </Card>
  );
}

export default InviteRequestUserCard;
