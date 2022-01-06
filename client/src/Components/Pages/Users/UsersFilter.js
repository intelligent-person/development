import React from "react";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../utils/i18n";
import qs from "query-string";
import styles from "./styles/users.module.css";

const UsersFilter = ({ setSearchUser }) => {
  const { t } = useTranslation();
  const mobile = window.innerWidth < 450 && true;
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);

  const onSearch = (value) => {
    const newQueries = {
      ...queryParams,
      search: value ? value : undefined,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };
  const onNewest = () => {
    const newQueries = {
      ...queryParams,
      sort: "newest",
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };
  const onReputation = () => {
    const newQueries = {
      ...queryParams,
      sort: "reputation",
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };

  return (
    <div>
      <div className={styles.filterWrapper}>
        <div className={styles.usersTitle}>
          <h1>Пользователи</h1>
        </div>
        <div>
          <Search
            className={styles.searchUsers}
            placeholder={t("FilterComponent.Search")}
            onSearch={onSearch}
            onChange={(e) => setSearchUser(e.target.value)}
            enterButton
          />
        </div>
        <div className={styles.sort}>
          <Button
            type={"default"}
            className={styles.sortButton}
            autoFocus
            onClick={onNewest}
          >
            {t("FilterComponent.Newest")}
          </Button>
          <Button
            type={"default"}
            className={styles.sortButton}
            onClick={onReputation}
          >
            Reputation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UsersFilter);
