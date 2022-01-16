import React from "react";
import styles from "./styles/users.module.css";
import User from "./User";
import { useTranslation } from "react-i18next";

const Users = ({ users }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.usersWrapper}>
      {users.length !== 0 ? (
        users.map((user) => <User user={user} />)
      ) : (
        <h2>{t("users.usersNotFound")}</h2>
      )}
    </div>
  );
};

export default Users;
