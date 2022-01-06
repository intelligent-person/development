import React, { useCallback, useEffect, useState } from "react";
import { Col, Menu, Row } from "antd";
import ProfileIcon from "./ProfileIcon";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Settings from "./Settings";
import FetchMessages from "./Messages/FetchMessages";
import styles from "./header.module.css";
import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const HeaderComponent = () => {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth0();
  const [selectedKeys, setSelectedKeys] = useState(window.location.pathname);
  const mobile = window.innerWidth < 450 && true;

  return (
    <Header className={`header ${styles.header}`}>
      <div className="logo" />
      <Row className={styles.headerMenu}>
        <Col>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            selectedKeys={[selectedKeys]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item
              key="/"
              onClick={(item) => setSelectedKeys(item.key)}
              style={mobile && { padding: "0 15px" }}
            >
              <NavLink to={"/"}>
                {mobile ? (
                  <HomeOutlined
                    style={{
                      color: "white",
                      fontSize: 25,
                      height: 10,
                    }}
                  />
                ) : (
                  t("HeaderComponent.Home")
                )}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/questions"
              onClick={(item) => setSelectedKeys(item.key)}
              style={mobile && { padding: "0 15px" }}
            >
              <NavLink to={"/questions?page=1&pageSize=10"}>
                {mobile ? (
                  <AppstoreOutlined style={{ color: "white", fontSize: 25 }} />
                ) : (
                  t("HeaderComponent.Questions")
                )}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/users"
              onClick={(item) => setSelectedKeys(item.key)}
              style={mobile && { padding: "0 15px" }}
            >
              <NavLink to={"/users?page=1"}>
                {mobile ? (
                  <ContactsOutlined style={{ color: "white", fontSize: 25 }} />
                ) : (
                  t("HeaderComponent.Users")
                )}
              </NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <div style={{ display: "flex", marginTop: -3 }}>
            {isAuthenticated && <FetchMessages />}
            {isLoading ? (
              <LoginButton />
            ) : isAuthenticated ? (
              <ProfileIcon />
            ) : (
              <LoginButton />
            )}
            <Settings />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
