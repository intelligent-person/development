import React from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import DateComponent from "../../../DateComponent/DateComponent";
import PostTag from "./PostTag";
import { useTranslation } from "react-i18next";
import * as userHooks from "../../../../hooks/users";
import Loader from "../../../Loader/Loader";

const PostShortContent = ({ post }) => {
  const { t } = useTranslation();
  const { data, status, error } = userHooks.useUserById(post.userId);
  const params = new URL(window.location.href).searchParams;
  const searchWords = params.get("search") && params.get("search").split(" ");
  const wordsSearchCount = params.get("search") && searchWords.length;
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
      .slice(0, 270)
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

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div key={post._id} className={"post"}>
      <div className={"postInfo"}>
        <div className={"views"}>
          <div className={"count"}>{post.views}</div>
          <div>{t("PostInfoComponent.Views")}</div>
        </div>
        <div className={"answers"}>
          <div className={"count"}>{post.answersCount}</div>
          <div>{t("PostInfoComponent.Answers")}</div>
        </div>
      </div>
      <div className={"postBody"}>
        <NavLink to={`/questions/id/${post._id}`}>
          <div style={{ width: "100%" }}>
            <h2 style={{ color: "inherit" }}>{post.title}</h2>
          </div>
        </NavLink>
        <div style={{ marginBottom: 20 }}>
          <ReactMarkdown children={markdownChildren} />
        </div>
        <div>
          {post.tags.map((tag) => (
            <PostTag tag={tag} />
          ))}
        </div>
      </div>

      <div className={"user"}>
        <div className={"userWrapper"}>
          <div>
            <NavLink to={`user/${data.name.split(" ").join("-")}/${data.sub}`}>
              <img src={`${data.picture}`} alt={"Avatar"} />
            </NavLink>
          </div>
          <div style={{ marginLeft: 10 }}>
            <h4>
              <NavLink
                to={`user/${data.name.split(" ").join("-")}/${data.sub}`}
              >
                {data.name}
              </NavLink>
            </h4>
            <div style={{ display: "inline-flex" }}>
              <div style={{ marginRight: 5 }}>{data.status}</div>
              <div>{data.reputation}</div>
            </div>
            <div style={{ fontSize: 12 }}>
              <DateComponent postDate={post.date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShortContent;
