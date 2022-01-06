import React from "react";
import styles from "../posts.module.css";
import { NavLink } from "react-router-dom";
import DateComponent from "../../../DateComponent/DateComponent";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import PostTag from "./PostTag";

const ShortPostBody = ({ post }) => {
  const params = new URL(window.location.href).searchParams;
  const searchWords = params.get("search") && params.get("search").split(" ");
  const wordsSearchCount = params.get("search") && searchWords.length;
  const mobile = window.innerWidth < 450 && true;
  const markdownChildren =
    post.body
      .split("")
      .filter(
        (item) =>
          item !== "`" &&
          item !== "#" &&
          item !== ">" &&
          item !== "\n" &&
          item !== "*"
      )
      .slice(0, mobile ? 140 : 270)
      .join("")
      .split(" ")
      .map((word) => {
        if (params.get("search")) {
          let returnedWord = word;
          for (let i = 0; i < wordsSearchCount; i++) {
            if (word === searchWords[i]) returnedWord = `**${word}**`;
          }
          return returnedWord;
        } else return word;
      })
      .join(" ") + "...";
  return (
    <div className={styles.postBody}>
      <NavLink to={`/questions/id/${post._id}`}>
        <div style={{ width: "100%" }}>
          <h2 style={{ color: "inherit" }}>{post.title}</h2>
        </div>
      </NavLink>
      <div className={styles.bodyText}>
        <ReactMarkdown children={markdownChildren} />
      </div>
      <div>
        {post.tags.map((tag) => (
          <PostTag tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default ShortPostBody;
