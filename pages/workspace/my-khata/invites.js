import React, { useState, useEffect } from "react";
import UserLayout from "@/components/common/UserLayout";
import InviteList from "@/components/workspace/invitations/InvitesList";
import setAuthToken from "@/helpers/useAuthToken";
import axios from "axios";
export default function Index() {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setAuthToken(localStorage.getItem("jwt"));
    const res = await axios.get(
      `${process.env.BACKEND_API}/friendship/get/requests`
    );
    setInvites(res.data);
    console.log("hello", res.data);
  };

  return (
    <>
      {console.log("invites", invites)}
      <UserLayout
        childern={<InviteList invites={invites} fetchData={fetchData} />}
      />
    </>
  );
}
// export async function getStaticProps() {
//   setAuthToken(localStorage.getItem("jwt"));
//   const res = await fetch(`http://103.86.38.255:5001/friendship/get/requests`);
//   const invites = await res.json();
//   console.log("jere");
//   return {
//     props: {
//       invites: res,
//     },
//   };
// }
