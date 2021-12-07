import React from "react";
import styles from "./styles/users.module.css";
import User from "./User";

const Users = ({ users }) => {
  return (
    <div className={styles.usersWrapper}>
      {users.length !== 0 ? (
        users.map((user) => <User user={user} />)
      ) : (
        <h2>Users not found</h2>
      )}
    </div>
  );
};

export default Users;
