import React, { useState, useEffect } from "react";
import UserLayout from "@/components/common/UserLayout";
import InviteList from "@/components/workspace/invitations/InvitesList";
import parseCookies from "@/helpers/cookieParser";
import axios from "axios";
export default function Index({ token }) {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship/get/requests`
    );
    setInvites(res.data);
    setLoading(false);
    console.log("hello", res, res.data);
  };

  return (
    <>
      <UserLayout
        token={token}
        childern={
          <InviteList
            invites={invites}
            fetchData={fetchData}
            token={token}
            loading={loading}
          />
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
