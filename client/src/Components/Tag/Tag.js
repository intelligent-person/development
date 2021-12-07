import React from "react";

const Tag = ({ tag, data }) => {
  return (
    <div>
      {tag} - {data} вопросов
    </div>
  );
};

export default React.memo(Tag);
