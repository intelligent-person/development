import React from "react";
import * as hooks from "../../../hooks/userTags";
import Loader from "../../Loader/Loader";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import styles from "./profile.module.css";
import { useTranslation } from "react-i18next";

const TopTags = ({ userId }) => {
  const { t } = useTranslation();
  const { data, status, error } = hooks.useFetchUserTags(userId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div>
      <h2>{t("profile.topTags")}</h2>
      <div className={styles.topTags}>
        {data.tags ? (
          data.tags.map((tag) => (
            <div className={styles.tagField}>
              <NavLink
                to={`/questions?page=1&pageSize=10&tags=${tag.tagName.replaceAll(
                  "+",
                  "%252B"
                )}`}
              >
                <Button type={"link"} className={styles.tag}>
                  {tag.tagName}
                </Button>
              </NavLink>
              <div className={styles.tagStat}>
                <div>
                  <strong>{tag.tagCount}</strong> {t("profile.posts")}
                </div>
                <div>
                  <strong>
                    {Math.round((tag.tagCount / data.userTagsCount) * 100)}
                  </strong>{" "}
                  {t("profile.posts")} %
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className={styles.notData}>{t("profile.notDataTags")}</h2>
        )}
      </div>
    </div>
  );
};

export default TopTags;
