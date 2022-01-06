import React from "react";
import styles from "../posts.module.css";
import { NavLink } from "react-router-dom";
import DateComponent from "../../../DateComponent/DateComponent";
import { useTranslation } from "react-i18next";

const ShortPostInfo = ({ post }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.postInfo}>
      <div className={styles.views}>
        <div className={styles.count}>
          {post.views > 1000 ? post.views / 1000 + "k" : post.views}
        </div>
        <div>{t("PostInfoComponent.Views")}</div>
      </div>
      <div className={styles.answers}>
        <div className={styles.count}>{post.answersCount}</div>
        <div>{t("PostInfoComponent.Answers")}</div>
      </div>
    </div>
  );
};

export default ShortPostInfo;
