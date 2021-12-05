import React from "react";
import Tag from "../../../Tag/Tag";
import { Button, Popover } from "antd";
import qs from "query-string";
import { useHistory } from "react-router-dom";

const PostTag = ({ tag }) => {
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);
  const onTag = () => {
    const newQueries = {
      ...queryParams,
      unanswered: false,
      tags: tag,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };

  return (
    <Popover
      /*content={'content'}*/ title={<Tag tag={tag} />}
      trigger="hover"
      mouseEnterDelay={0.7}
    >
      <Button onClick={onTag} size={"small"} className={"tag"}>
        {tag}
      </Button>
    </Popover>
  );
};

export default PostTag;
