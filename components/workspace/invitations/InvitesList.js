import { useContext } from "react";
import { Avatar, Skeleton, List, Button } from "antd";
import axios from "axios";
import setAuthToken from "@/helpers/useAuthToken";
import { openNotificationWithIcon } from "@/helpers/notifications";
import { AuthContext } from "@/context/AuthContext";

function InviteList({ invites, fetchData, token }) {
  // first party is me
  const { user } = useContext(AuthContext);
  const acceptRequest = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.put(
      `${"http://localhost:5001"}/friendship/accept/request?status=ACCEPTED&friendshipId=${id}`
    );
    console.log("yes", res);
    if (res) {
      openNotificationWithIcon("success", "Request accepted");
      fetchData();
    }
  };
  const rejectRequest = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.put(
      `${"http://localhost:5001"}/friendship/accept/request?status=REJECTED&friendshipId=${id}`
    );
    console.log("yes", res);
    if (res) {
      openNotificationWithIcon("success", "Request rejected");
      fetchData();
    }
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={invites}
      renderItem={(item) => (
        <List.Item
          style={{ backgroundColor: "#fff", padding: "10px" }}
          actions={
            item.firstParty?.id === user?.id
              ? []
              : [
                  item.status === "PENDING" ? (
                    <>
                      {" "}
                      <Button
                        type="link"
                        key="list-loadmore-edit"
                        onClick={() => acceptRequest(item.id)}
                      >
                        Accept
                      </Button>
                      ,
                      <Button
                        type="link"
                        key="list-loadmore-edit"
                        onClick={() => rejectRequest(item.id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    ""
                  ),
                ]
          }
        >
          {/* <Skeleton avatar title={false} loading={item.loading} active> */}
          <List.Item.Meta
            avatar={<Avatar src="https://placeimg.com/640/480/people" />}
            title={
              item.firstParty?.id === user?.id ? (
                <a href="https://ant.design">
                  Invite Request to {item.secondParty?.email}
                </a>
              ) : (
                <a href="https://ant.design">
                  Invite Request From {item.firstParty?.email}
                </a>
              )
            }
            description={
              item.firstParty?.id === user?.id
                ? "Invitation request has been sent"
                : "You can accept or reject the request, once accepted the users can create a udhaar contract between themselves"
            }
          />
          <div>{item.status}</div>
          {/* </Skeleton> */}
        </List.Item>
      )}
    />
  );
}

export default InviteList;
