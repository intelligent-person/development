import React from "react";
import styles from "../posts.module.css";
import { NavLink } from "react-router-dom";
import DateComponent from "../../../DateComponent/DateComponent";

const ShortPostUser = ({ post, data }) => {
  return (
    <div className={styles.user}>
      <div className={styles.userWrapper}>
        <div>
          <NavLink to={`user/${data.name.split(" ").join("-")}/${data.sub}`}>
            <img src={`${data.picture}`} alt={"Avatar"} />
          </NavLink>
        </div>
        <div style={{ marginLeft: 10 }}>
          <h4>
            <NavLink to={`user/${data.name.split(" ").join("-")}/${data.sub}`}>
              {data.name}
            </NavLink>
          </h4>
          <div style={{ display: "inline-flex" }}>
            <strong>
              <div>{data.reputation}</div>
            </strong>
          </div>
          <div style={{ fontSize: 12 }}>
            <DateComponent postDate={post.date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortPostUser;
