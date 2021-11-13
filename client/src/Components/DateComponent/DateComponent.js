import React from "react";
import { DateTime } from "luxon";

const DateComponent = ({ postDate }) => {
  return DateTime.fromISO(postDate).toRelative();
};

export default React.memo(DateComponent);
