import React, { useState, useEffect, useContext } from "react";
import UserLayout from "@/components/common/UserLayout";
import parseCookies from "@/helpers/cookieParser";
import UdhaarBookCard from "@/components/workspace/udhaarbook/UdhaarBookCard";
import axios from "axios";
import { Collapse } from "antd";
import { AuthContext } from "@/context/AuthContext";
import { DoubleRightOutlined } from "@ant-design/icons";
import styles from "@/styles/pages/Workspace.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

function Index({ token }) {
  const router = useRouter();
  const [connections, setConnections] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_BACKEND_API}/friendship`
      );
      setConnections(res.data);
      console.log("hello jello", res, res.data);
    } catch (err) {
      console.log(Er);
    }
  };

  return (
    <>
      <UserLayout
        token={token}
        // token="asdasdasdsadasdasdasdasdasdasd"
        childern={
          <div>
            <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
              Udhaar Book
            </h1>
            <h3 style={{ marginBottom: "10px" }}>All Connections</h3>

            {connections.map((c, i) => (
              <Link key={c.id} href={`/workspace/my-khata/user/${c.id}`}>
                <div className={styles.myKhattaIndexCard}>
                  <span>
                    {c.firstParty?.id === user?.id
                      ? c.secondParty?.firstName + " " + c.secondParty?.lastName
                      : c.firstParty?.firstName + " " + c.firstParty?.lastName}
                  </span>
                  <span>Total Incoming Amount: {0}</span>
                  <span>Total Outgoing Amount: {0}</span>
                  <span>
                    <DoubleRightOutlined />
                  </span>
                  {/* // <UdhaarBookCard connection={c} user={user} token={token} /> */}
                </div>
              </Link>
            ))}
          </div>
        }
      />
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
