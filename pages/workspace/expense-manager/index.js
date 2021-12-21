import React, { useState, useEffect, useContext } from "react";
import UserLayout from "@/components/common/UserLayout";
import parseCookies from "@/helpers/cookieParser";
import UdhaarBookCard from "@/components/workspace/udhaarbook/UdhaarBookCard";
import axios from "axios";
import { Collapse } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Main from "@/components/workspace/expense-manager/Main";

function Index({ token }) {
  const [connections, setConnections] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship`
    );
    setConnections(res.data);
    console.log("hello jello", res, res.data);
  };

  return (
    <>
      <UserLayout token={token} childern={<Main token={token} />} />
    </>
  );
}

export default Index;

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
