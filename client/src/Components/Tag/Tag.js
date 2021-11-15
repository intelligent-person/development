import React from "react";

const Tag = ({ tag, tagCount }) => {
  return (
    <div>
      {tag} - {tagCount} вопросов
    </div>
  );
};

export default React.memo(Tag);
