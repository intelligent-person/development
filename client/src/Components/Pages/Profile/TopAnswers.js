import React from "react";
import * as hooks from "../../../hooks/answers";
import Loader from "../../Loader/Loader";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { HeartOutlined } from "@ant-design/icons";
const TopAnswers = ({ userId }) => {
  const { data, status, error } = hooks.useFetchUserTopAnswers(userId, 1);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div>
      <h2>Top answers</h2>
      <div className={styles.topTags}>
        {data.length > 0 ? (
          data.map((answer) => (
            <div className={styles.answerField}>
              <div className={styles.answersCount}>
                {answer.votesCount} <HeartOutlined style={{ fontSize: 14 }} />
              </div>{" "}
              <NavLink to={`/questions/id/${answer.postId}?userId=${userId}`}>
                {answer.title.slice(0, 80)}{" "}
              </NavLink>
              <strong>{new Date(answer.date).toLocaleDateString()}</strong>
            </div>
          ))
        ) : (
          <h2 className={styles.notData}>This user has no answers yet</h2>
        )}
      </div>
    </div>
  );
};

export default TopAnswers;
