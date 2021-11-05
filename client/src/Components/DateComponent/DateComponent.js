import React from "react";
import { DateTime } from "luxon";

const DateComponent = ({ postDate }) => {
  const data = new Date().toLocaleDateString().split(".");
  const time = new Date().toLocaleTimeString().split(":");
  const postData = postDate
    .slice(0, postDate.indexOf("T"))
    .split("-")
    .filter((item) => item !== "-")
    .reverse();
  const postTime = postDate.split("").slice(11, 19).join("").split(":");
  console.log(postDate);
  let date = null;
  const newMonth = Number(data[1]) + 11;
  const newDay = Number(data[0]) + 30;
  if (
    data[2] !== postData[2] &&
    data[1] - postData[1] >= 0 &&
    data[0] - postData[0] >= 0
  )
    date = DateTime.local()
      .minus({ years: data[2] - postData[2] })
      .toRelative();
  else if (data[2] !== postData[2]) {
    if (newMonth - postData[1] >= 1)
      date = DateTime.local()
        .minus({ months: newMonth - postData[1] })
        .toRelative();
    else if (newDay - postData[0] >= 1)
      date = DateTime.local()
        .minus({ days: newDay - postData[0] })
        .toRelative();
  } else if (data[1] - postData[1] >= 1 && data[0] - postData[0] >= 1)
    date = DateTime.local()
      .minus({ months: data[1] - postData[1] })
      .toRelative();
  else if (data[1] - postData[1] > 1 && data[0] - postData[0] < 1)
    date = DateTime.local()
      .minus({ months: data[1] - postData[1] - 1 })
      .toRelative();
  else if (data[1] !== postData[1])
    date = DateTime.local()
      .minus({ day: newDay - postData[0] })
      .toRelative();
  else if (data[0] !== postData[0])
    date = DateTime.local()
      .minus({ day: data[0] - postData[0] })
      .toRelative();
  else if (data[0] === postData[0])
    if (time[0] - postTime[0] >= 1 && time[1] - postTime[1] >= 0)
      date = DateTime.local()
        .minus({ hours: time[0] - postTime[0] })
        .toRelative();
    else if (time[0] - postTime[0] > 1 && time[1] - postTime[1] < 0)
      date = DateTime.local()
        .minus({ hours: time[0] - postTime[0] - 1 })
        .toRelative();
    else if (time[0] - postTime[0] === 1 && time[1] - postTime[1] < 0)
      date = DateTime.local()
        .minus({ minutes: 60 + Number(time[1]) - Number(postTime[1]) })
        .toRelative();
    else if (time[1] - postTime[1] >= 1 && time[2] - postTime[2] >= 0)
      date = DateTime.local()
        .minus({ minutes: time[1] - postTime[1] })
        .toRelative();
    else if (time[1] - postTime[1] > 1 && time[2] - postTime[2] < 0)
      date = DateTime.local()
        .minus({ minutes: Number(postTime[1]) - 1 })
        .toRelative();
    else if (time[1] - postTime[1] === 1 && time[2] - postTime[2] < 0)
      date = DateTime.local()
        .minus({ seconds: 60 + Number(time[2]) - Number(postTime[2]) })
        .toRelative();
    else date = DateTime.local().minus({ seconds: postTime[2] }).toRelative();
  console.log(date);
  return <div>{date}</div>;
};

export default React.memo(DateComponent);
