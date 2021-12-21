import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import styles from "@/styles/components/common/UserLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Button, Layout as AntdLayout, Menu, Spin } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AuthContext, UserMenuContext } from "@/context/AuthContext";
import InviteRequest from "../workspace/invitations/InviteRequest";
import CreateRequest from "../workspace/udhaars/CreateRequest";

const { Content, Sider } = AntdLayout;

function UserLayout({ title, keywords, description, childern, token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuNumber, setMenuNumber] = useContext(UserMenuContext);
  const [showNewInviteRequestModal, setShowNewInviteRequestModal] =
    useState(false);

  const [showNewRequestDrawer, setShowNewRequestDrawer] = useState(false);

  function handleRouteChange(menuNumber) {
    if (menuNumber === "1") {
      router.push("/workspace/my-khata");
    }
    if (menuNumber === "3") {
      router.push("/workspace/my-khata/invites");
    }
    if (menuNumber === "4") {
      router.push("/workspace/my-khata/history");
    }

    if (menuNumber === "5") {
      router.push("/workspace/expense-manager");
    }
    if (menuNumber === "6") {
      router.push("/workspace/settings");
    }
  }

  const onOptionClick = (e) => {
    setMenuNumber(e.key);
    handleRouteChange(e.key);
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
        {/* creating requests */}
        <InviteRequest
          token={token}
          visible={showNewInviteRequestModal}
          setVisible={setShowNewInviteRequestModal}
        />
        <CreateRequest
          visible={showNewRequestDrawer}
          setVisible={setShowNewRequestDrawer}
          token={token}
          user={user}
        />
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
              <div className={styles.userInfoContainer}>
                {!loading ? (
                  <>
                    <Avatar src={user?.profileUrl} size={100} />
                    <p>{user?.firstName}</p>
                  </>
                ) : (
                  <Spin size="large" />
                )}
              </div>

              <Button
                className={styles.floatingButton}
                onClick={() => setShowNewRequestDrawer(true)}
              >
                Create A New Request
              </Button>
              <Button
                type="primary"
                className={styles.newInviteButton}
                onClick={() => setShowNewInviteRequestModal(true)}
              >
                Invite A New Connection
              </Button>
              <Menu.Item
                key="1"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Udhaar Book
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Invitation Requests
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Udhaar History
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Expense Manager
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={onOptionClick}
                icon={<VideoCameraOutlined />}
              >
                Settings
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

UserLayout.defaultProps = {
  title: "Udhaar Khata | Pakistan's No 1 Udhaar App",
  keywords: "udhaar debt money pakistan khata",
  description:
    "Udhaar Khata is your digital Khatabook, Cashbook, SalaryBook, Invoice Maker, and Inventory (Stock) manager. Udhaar Khata is the only app you need to run and grow your business.",
};
export default UserLayout;
