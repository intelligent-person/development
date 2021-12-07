import React, { useEffect } from "react";
import Users from "./Users";
import { Content } from "antd/es/layout/layout";
import UsersFilter from "./UsersFilter";
import styles from "./styles/users.module.css";
import { message, Pagination } from "antd";
import * as hooks from "../../../hooks/users";
import Loader from "../../Loader/Loader";

const UsersContainer = () => {
  const params = new URL(window.location.href).searchParams;
  const { status, data, error } = hooks.useFetchUsers(
    params.get("page"),
    params.get("search"),
    params.get("sort")
  );
  useEffect(() => {
    if (window.location.pathname === "/users") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [params.get("page")]);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <>
      <Content className={`site-layout-background ${styles.content}`}>
        <UsersFilter />
        <Users users={data.users} />
        {data.usersCount > 20 && (
          <Pagination
            defaultCurrent={1}
            total={data.usersCount}
            current={params.get("page")}
          />
        )}
      </Content>
    </>
  );
};

export default UsersContainer;
