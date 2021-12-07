import React from "react";
import styles from "./styles/users.module.css";
import { NavLink } from "react-router-dom";
import * as hooks from "../../../hooks/tags";
import Loader from "../../Loader/Loader";

const User = ({ user }) => {
  const params = new URL(window.location.href).searchParams;
  const { data, status, error } = hooks.useFetchUserTags(user.sub);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div key={user._id} className={styles.user}>
      <NavLink to={`user/${user.name.split(" ").join("-")}/${user.sub}`}>
        <img src={`${user.picture}`} alt="" />
      </NavLink>{" "}
      <div>
        <NavLink to={`user/${user.name.split(" ").join("-")}/${user.sub}`}>
          <b>{user.name}</b>
        </NavLink>{" "}
        <br />
        <b>{user.status} </b>
        <b>{user.reputation}</b> <br />
        <div>
          {data.map((tag) => (
            <span>{tag.tagName} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
