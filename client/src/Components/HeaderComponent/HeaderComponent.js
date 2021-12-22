import React, { useState } from "react";
import { Col, Menu, Row } from "antd";
import ProfileIcon from "./ProfileIcon";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import Settings from "./Settings";

const HeaderComponent = () => {
  const { isAuthenticated } = useAuth0();
  const [selectedKeys, setSelectedKeys] = useState(window.location.pathname);
  const { t } = useTranslation();
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
            {isAuthenticated ? <ProfileIcon /> : <LoginButton />}
            <Settings />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
