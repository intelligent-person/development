import React from "react";
import { Button, Popover } from "antd";
import { NavLink } from "react-router-dom";
import "./posts.css";
import DateComponent from "../../DateComponent/DateComponent";
import ReactMarkdown from "react-markdown";
import Tag from "../../Tag/Tag";
import { useTranslation } from "react-i18next";

const Posts = ({ posts, searchValue, setInclude }) => {
  const { t } = useTranslation();

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className={"post"}>
          <div className={"postInfo"}>
            <div className={"count"}>{post.views}</div>
            <div>{t("PostInfoComponent.Views")}</div>
            <div className={"count"}>{post.answersCount}</div>
            <div>{t("PostInfoComponent.Answers")}</div>
          </div>
          <div className={"postBody"}>
            <NavLink to={`/questions/id/${post._id}`}>
              <div style={{ width: "100%" }}>
                <h2 style={{ color: "inherit" }}>{post.title}</h2>
              </div>
            </NavLink>
            <div style={{ marginBottom: 20 }}>
              <ReactMarkdown
                children={
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
                    .map((item) => {
                      for (let i = 0; i < searchValue.split(" ").length; i++) {
                        if (item === searchValue.split(" ")[i] && item !== "")
                          item = `**${item}**`;
                        else item = `${item}`;
                      }
                      return item;
                    })
                    .join(" ") + "..."
                }
              />
            </div>
            <div>
              {post.tags.map((tag) => (
                <Popover
                  /*content={'content'}*/ title={<Tag tag={tag} />}
                  trigger="hover"
                  mouseEnterDelay={0.7}
                >
                  <Button
                    onClick={() =>
                      setInclude({ unanswered: false, tags: `${tag}` })
                    }
                    size={"small"}
                    className={"tag"}
                  >
                    {tag}
                  </Button>
                </Popover>
              ))}
            </div>
          </div>

          <div className={"user"}>
            <div className={"userWrapper"}>
              <div>
                <NavLink to={`user/${post.user._id}`}>
                  <img src={`${post.user.picture}`} alt={"Avatar"} />
                </NavLink>
              </div>
              <div style={{ marginLeft: 10 }}>
                <h4>
                  <NavLink to={`user/${post.user._id}`}>
                    {post.user.name}
                  </NavLink>
                </h4>
                <div style={{ display: "inline-flex" }}>
                  <div style={{ marginRight: 5 }}>{post.user.status}</div>
                  <div>{post.user.reputation}</div>
                </div>
              </div>
            </div>
            <div>
              <DateComponent postDate={post.date} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Posts);
