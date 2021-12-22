import React from "react";
import styles from "./styles/users.module.css";
import { NavLink } from "react-router-dom";
import UserTags from "./UserTags";

const User = ({ user }) => {
  return (
    <div key={user._id} className={styles.user}>
      <NavLink to={`user/${user.name.split(" ").join("-")}/${user.sub}`}>
        <img src={user.picture} alt="" />
      </NavLink>{" "}
      <div>
        <NavLink to={`user/${user.name.split(" ").join("-")}/${user.sub}`}>
          <b>{user.name}</b>
        </NavLink>{" "}
        <br />
        <b>{user.reputation}</b> <br />
        <UserTags id={user.sub} />
      </div>
    </div>
  );
};

export default User;
