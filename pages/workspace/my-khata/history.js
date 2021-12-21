import React, { useState, useEffect } from "react";
import UserLayout from "@/components/common/UserLayout";
import parseCookies from "@/helpers/cookieParser";
import axios from "axios";
export default function Index({ token }) {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/transaction/self`
      );
      // setConnections(res.data);
      console.log("hello jello", res, res.data);
    } catch (err) {
      console.log(Er);
    }
  }
  return (
    <>
      <UserLayout token={token} childern={<h1>History</h1>} />
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
