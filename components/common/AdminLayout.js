import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import styles from "@/styles/components/common/UserLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Button, Layout as AntdLayout, Menu, Spin } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AuthContext, UserMenuContext } from "@/context/AuthContext";

const { Content, Sider } = AntdLayout;

function AdminLayout({ title, keywords, description, childern, token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuNumber, setMenuNumber] = useContext(UserMenuContext);

  useEffect(() => {
    if (menuNumber === "1") {
      router.push("/admin/complaints");
    }
    if (menuNumber === "2") {
      router.push("/admin/users");
    }
  }, [menuNumber]);

  const onOptionClick = (e) => {
    setMenuNumber(e.key);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header loggedIn={true} />

      <div className={styles.removedMarginContainer}>
        <AntdLayout>
          <Sider
            style={{ backgroundColor: "#fff" }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="light" mode="inline" defaultSelectedKeys={menuNumber}>
              <Menu.Item
                key="1"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Manage Complaints
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Manage Users
              </Menu.Item>
            </Menu>
          </Sider>
          <AntdLayout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className={styles.mainContainer}>{childern}</div>
            </Content>
          </AntdLayout>
        </AntdLayout>
      </div>
    </div>
  );
}

AdminLayout.defaultProps = {
  title: "Udhaar Khata | Pakistan's No 1 Udhaar App",
  keywords: "udhaar debt money pakistan khata",
  description:
    "Udhaar Khata is your digital Khatabook, Cashbook, SalaryBook, Invoice Maker, and Inventory (Stock) manager. Udhaar Khata is the only app you need to run and grow your business.",
};
export default AdminLayout;
