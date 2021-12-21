import { useContext } from "react";
import { Button } from "antd";

import axios from "axios";
import { openNotificationWithIcon } from "@/helpers/notifications";
import { AuthContext } from "@/context/AuthContext";
import DisplayTable from "@/components/common/DisplayTable";
import ReloadButton from "@/components/common/ReloadButton";

function InviteList({ invites, fetchData, token, loading }) {
  // first party is me
  const { user } = useContext(AuthContext);
  const acceptRequest = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship/accept/request?status=ACCEPTED&friendshipId=${id}`
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
      `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship/accept/request?status=REJECTED&friendshipId=${id}`
    );
    console.log("yes", res);
    if (res) {
      openNotificationWithIcon("success", "Request rejected");
      fetchData();
    }
  };
  const columns = [
    {
      title: "Requests",
      dataIndex: "firstParty",
      render: (text, item) => {
        return item.firstParty?.id === user?.id ? (
          <span>Outgoing invite request to {item.secondParty?.email}</span>
        ) : (
          <span>Incoming invite Request from {item.firstParty?.email}</span>
        );
      },
      width: "60%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, item) => {
        return item.firstParty?.id === user?.id
          ? []
          : [
              item.status === "PENDING" ? (
                <div style={{ display: "flex" }}>
                  {" "}
                  <Button
                    style={{ marginRight: "10px" }}
                    type="primary"
                    key="list-loadmore-edit"
                    onClick={() => acceptRequest(item.id)}
                  >
                    Accept Invite
                  </Button>
                  <Button
                    type="danger"
                    key="list-loadmore-edit"
                    onClick={() => rejectRequest(item.id)}
                  >
                    Reject Invite
                  </Button>
                </div>
              ) : (
                ""
              ),
            ];
      },
    },
  ];

  return (
    <>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
        All Invitations
      </h1>
      <ReloadButton onClick={() => fetchData()} loading={loading} />
      <DisplayTable columns={columns} tableTable={invites} user={user} />
    </>
    // <List
    //   itemLayout="horizontal"
    //   dataSource={invites}
    //   renderItem={(item) => (
    //     <List.Item
    //       style={{ backgroundColor: "#fff", padding: "10px" }}
    //       actions={
    //         item.firstParty?.id === user?.id
    //           ? []
    //           : [
    //               item.status === "PENDING" ? (
    //                 <>
    //                   {" "}
    //                   <Button
    //                     type="link"
    //                     key="list-loadmore-edit"
    //                     onClick={() => acceptRequest(item.id)}
    //                   >
    //                     Accept
    //                   </Button>
    //                   ,
    //                   <Button
    //                     type="link"
    //                     key="list-loadmore-edit"
    //                     onClick={() => rejectRequest(item.id)}
    //                   >
    //                     Reject
    //                   </Button>
    //                 </>
    //               ) : (
    //                 ""
    //               ),
    //             ]
    //       }
    //     >
    //       {/* <Skeleton avatar title={false} loading={item.loading} active> */}
    //       <List.Item.Meta
    //         avatar={<Avatar src="https://placeimg.com/640/480/people" />}
    //         title={
    //           item.firstParty?.id === user?.id ? (
    //             <a href="https://ant.design">
    //               Invite Request to {item.secondParty?.email}
    //             </a>
    //           ) : (
    //             <a href="https://ant.design">
    //               Invite Request From {item.firstParty?.email}
    //             </a>
    //           )
    //         }
    //         description={
    //           item.firstParty?.id === user?.id
    //             ? "Invitation request has been sent"
    //             : "You can accept or reject the request, once accepted the users can create a udhaar contract between themselves"
    //         }
    //       />
    //       <div>{item.status}</div>
    //       {/* </Skeleton> */}
    //     </List.Item>
    //   )}
    // />
  );
}

export default InviteList;
