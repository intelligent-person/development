import React from "react";
import * as hooks from "../../../hooks/posts";
import Loader from "../../Loader/Loader";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { MessageOutlined } from "@ant-design/icons";

const LastPosts = ({ userId }) => {
  const { data, status, error } = hooks.useFetchLastUserPosts(userId);
  const mobile = window.innerWidth < 450 && true;
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div>
      <h2>Last questions</h2>
      <div className={styles.topTags}>
        {data.length > 0 ? (
          data.map((post) => (
            <div className={styles.answerField}>
              <div className={styles.answersCount}>
                {post.answersCount} <MessageOutlined style={{ fontSize: 14 }} />
              </div>
              <NavLink to={`/questions/id/${post._id}`}>
                {post.title.slice(
                  0,
                  mobile ? (window.innerWidth < 375 ? 18 : 27) : 80
                )}
                {mobile
                  ? post.title.length > 30 && "..."
                  : post.title.length > 80 && "..."}
              </NavLink>
              <strong>{new Date(post.date).toLocaleDateString()}</strong>
            </div>
          ))
        ) : (
          <h2 className={styles.notData}>This user has no questions yet</h2>
        )}
      </div>
    </div>
  );
};

export default LastPosts;
