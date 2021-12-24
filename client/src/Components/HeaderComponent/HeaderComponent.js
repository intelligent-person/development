import React, { useEffect, useState } from "react";
import { Col, Menu, Row } from "antd";
import ProfileIcon from "./ProfileIcon";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Settings from "./Settings";
import Messages from "./Messages/Messages";
import { queryClient } from "../../hooks/queryClient";
import FetchMessages from "./Messages/FetchMessages";

const HeaderComponent = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth0();
  const [selectedKeys, setSelectedKeys] = useState(window.location.pathname);

  return (
    <Header
      className="header"
      style={{ position: "fixed", zIndex: 2, width: "100%" }}
    >
      <div className="logo" />
      <Row justify="space-between">
        <Col span={20}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            selectedKeys={[selectedKeys]}
          >
            <Menu.Item key="/" onClick={(item) => setSelectedKeys(item.key)}>
              <NavLink to={"/"}>{t("HeaderComponent.Home")}</NavLink>
            </Menu.Item>
            <Menu.Item
              key="/questions"
              onClick={(item) => setSelectedKeys(item.key)}
            >
              <NavLink to={"/questions?page=1&pageSize=10"}>
                {t("HeaderComponent.Questions")}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/users"
              onClick={(item) => setSelectedKeys(item.key)}
            >
              <NavLink to={"/users?page=1"}>
                {t("HeaderComponent.Users")}
              </NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <div style={{ display: "flex" }}>
            {isAuthenticated && <FetchMessages />}
            {isAuthenticated ? <ProfileIcon /> : <LoginButton />}
            <Settings />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
