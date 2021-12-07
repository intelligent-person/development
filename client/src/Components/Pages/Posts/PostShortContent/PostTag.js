import React from "react";
import Tag from "../../../Tag/Tag";
import { Button, Popover } from "antd";
import qs from "query-string";
import { useHistory } from "react-router-dom";
import * as hooks from "../../../../hooks/tags";

const PostTag = ({ tag }) => {
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);
  const { status, error, data } = hooks.useFetchTagCount(tag);
  const onTag = () => {
    const newQueries = {
      ...queryParams,
      unanswered: false,
      tags: tag.replaceAll("+", "%2B"),
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };

  return status === "loading" ? (
    <></>
  ) : status === "error" ? (
    error.message
  ) : (
    <Popover
      /*content={'content'}*/ title={<Tag tag={tag} data={data} />}
      trigger="hover"
      mouseEnterDelay={0.4}
    >
      <Button onClick={onTag} size={"small"} className={"tag"}>
        {tag}
      </Button>
    </Popover>
  );
};

export default PostTag;
