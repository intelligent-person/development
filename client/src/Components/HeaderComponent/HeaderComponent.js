import React, { useState } from "react";
import { Col, Menu, Row } from "antd";
import LogoutButton from "../LoginLogout/LogoutButton";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import LoginButton from "../LoginLogout/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import "../../utils/i18n";
import { useTranslation } from "react-i18next";

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
              <NavLink to={"/questions"}>
                {t("HeaderComponent.Questions")}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/users"
              onClick={(item) => setSelectedKeys(item.key)}
            >
              <NavLink to={"/users"}>{t("HeaderComponent.Users")}</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Col>
      </Row>
    </Header>
  );
};

export default React.memo(HeaderComponent);
