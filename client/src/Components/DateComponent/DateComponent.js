import React from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

const DateComponent = ({ postDate }) => {
  const { i18n } = useTranslation();
  return DateTime.fromISO(postDate, { locale: i18n.language }).toRelative();
};

export default React.memo(DateComponent);
