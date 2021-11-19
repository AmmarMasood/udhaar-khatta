import { Avatar, Skeleton, List, Button } from "antd";
import axios from "axios";
import setAuthToken from "@/helpers/useAuthToken";
import { openNotificationWithIcon } from "@/helpers/notifications";

function InviteList({ invites, fetchData }) {
  const acceptRequest = async (id) => {
    setAuthToken(localStorage.getItem("jwt"));
    const res = await axios.put(
      `${process.env.BACKEND_API}/friendship/accept/request?status=ACCEPTED&friendshipId=${id}`
    );
    console.log("yes", res);
    if (res) {
      openNotificationWithIcon("success", "Request accepted");
      fetchData();
    }
  };
  const rejectRequest = async (id) => {
    setAuthToken(localStorage.getItem("jwt"));
    const res = await axios.put(
      `${process.env.BACKEND_API}/friendship/accept/request?status=REJECTED&friendshipId=${id}`
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
          actions={[
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
          ]}
        >
          {/* <Skeleton avatar title={false} loading={item.loading} active> */}
          <List.Item.Meta
            avatar={<Avatar src="https://placeimg.com/640/480/people" />}
            title={
              <a href="https://ant.design">
                Invite Request From {item.firstParty?.email}
              </a>
            }
            description="You can accept or reject the request, once accepted the users can create a udhaar contract between themselves"
          />
          <div>{item.status}</div>
          {/* </Skeleton> */}
        </List.Item>
      )}
    />
  );
}

export default InviteList;
