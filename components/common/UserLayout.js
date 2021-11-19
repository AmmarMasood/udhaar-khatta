import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import styles from "@/styles/components/common/UserLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Button, Layout as AntdLayout, Menu, Spin } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AuthContext, UserMenuContext } from "@/context/AuthContext";
import InviteRequest from "../workspace/invitations/InviteRequest";
import CreateRequest from "../workspace/CreateRequest";

const { Content, Sider } = AntdLayout;

function UserLayout({ title, keywords, description, childern }) {
  const { profile, error, user, getUserProfile } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuNumber, setMenuNumber] = useContext(UserMenuContext);
  const [showNewInviteRequestModal, setShowNewInviteRequestModal] =
    useState(false);

  const [showNewRequestDrawer, setShowNewRequestDrawer] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("jwt")) {
    getUserProfile(setLoading);
    // } else {
    //   router.push("/");
    // }
  }, []);
  useEffect(() => {
    if (menuNumber === "1") {
      router.push("/workspace/my-khata");
    }
    if (menuNumber === "3") {
      router.push("/workspace/my-khata/invites");
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
        {/* creating requests */}
        <InviteRequest
          visible={showNewInviteRequestModal}
          setVisible={setShowNewInviteRequestModal}
        />
        <CreateRequest
          visible={showNewRequestDrawer}
          setVisible={setShowNewRequestDrawer}
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
                    <Avatar
                      src={"https://placeimg.com/640/480/person"}
                      size={100}
                    />
                    <p>{user?.email.split("@")[0]}</p>
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
                key="2"
                onClick={onOptionClick}
                icon={<UserOutlined />}
              >
                Udhaar Requests
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
