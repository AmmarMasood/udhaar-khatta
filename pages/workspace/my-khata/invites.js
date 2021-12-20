import React, { useState, useEffect } from "react";
import UserLayout from "@/components/common/UserLayout";
import InviteList from "@/components/workspace/invitations/InvitesList";
import parseCookies from "@/helpers/cookieParser";
import axios from "axios";
export default function Index({ token }) {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.get(
      `${"http://localhost:5001"}/friendship/get/requests`
    );
    setInvites(res.data);
    console.log("hello", res, res.data);
  };

  return (
    <>
      <UserLayout
        token={token}
        childern={
          <InviteList invites={invites} fetchData={fetchData} token={token} />
        }
      />
    </>
  );
}
export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  //   this is only available on server and not cliet!!!!
  // how good is that fam?
  console.log(token);
  return {
    props: {
      token: token,
    },
  };
}
