import React from "react";
import Tag from "../../../Tag/Tag";
import { Button, Popover } from "antd";

const PostTag = ({ tag, setInclude }) => {
  return (
    <Popover
      /*content={'content'}*/ title={<Tag tag={tag} />}
      trigger="hover"
      mouseEnterDelay={0.7}
    >
      <Button
        onClick={() => setInclude({ unanswered: false, tags: `${tag}` })}
        size={"small"}
        className={"tag"}
      >
        {tag}
      </Button>
    </Popover>
  );
};

export default PostTag;
