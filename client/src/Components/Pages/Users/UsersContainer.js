import React from "react";
import Users from "./Users";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

const UsersContainer = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: "/users",
      breadcrumbName: t("UsersBreadcrumb.Breadcrumb1"),
    },
  ];
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <NavLink to={paths.join("/")}>{route.breadcrumbName}</NavLink>
    );
  }
  return (
    <>
      <Breadcrumb
        itemRender={itemRender}
        style={{ margin: "8px 0" }}
        routes={routes}
      />
      <Content
        className="site-layout-background"
        style={{ padding: 24, margin: 0, minHeight: 280 }}
      >
        <Users />
      </Content>
    </>
  );
};

export default UsersContainer;
