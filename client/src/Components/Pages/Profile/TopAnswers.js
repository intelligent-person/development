import React from "react";
import * as hooks from "../../../hooks/answers";
import Loader from "../../Loader/Loader";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { HeartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
const TopAnswers = ({ userId }) => {
  const { t } = useTranslation();
  const { data, status, error } = hooks.useFetchUserTopAnswers(userId, 1);
  const mobile = window.innerWidth < 450 && true;
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div>
      <h2>{t("profile.topAnswers")}</h2>
      <div className={styles.topTags}>
        {data.length > 0 ? (
          data.map((answer) => (
            <div className={styles.answerField}>
              <div className={styles.answersCount}>
                {answer.votesCount} <HeartOutlined style={{ fontSize: 14 }} />
              </div>{" "}
              <NavLink
                to={`/questions/id/${answer.postId}?scrollTo=${answer._id}&type=answer`}
              >
                {answer.title.slice(
                  0,
                  mobile ? (window.innerWidth < 375 ? 18 : 27) : 80
                )}
                {mobile
                  ? answer.title.length > 30 && "..."
                  : answer.title.length > 80 && "..."}
              </NavLink>
              <strong>{new Date(answer.date).toLocaleDateString()}</strong>
            </div>
          ))
        ) : (
          <h2 className={styles.notData}>{t("profile.notDataAnswers")}</h2>
        )}
      </div>
    </div>
  );
};

export default TopAnswers;
