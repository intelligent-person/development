import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import * as hooks from "../../../hooks/userTags";
import Loader from "../../Loader/Loader";

const UserTags = ({ id }) => {
  const { data, status, error } = hooks.useFetchUserTags(id);
  console.log(data);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <>
      {data.tags?.map((tag, index) => {
        return index !== data.tags.length - 1 ? (
          <NavLink
            to={`/questions?page=1&pageSize=10&tags=${tag.tagName.replaceAll(
              "+",
              "%252B"
            )}`}
          >
            <Button type={"link"}>
              <span>{tag.tagName}, </span>
            </Button>
          </NavLink>
        ) : (
          <NavLink
            to={`/questions?page=1&pageSize=10&tags=${tag.tagName.replaceAll(
              "+",
              "%252B"
            )}`}
          >
            <Button type={"link"}>
              <span>{tag.tagName}</span>
            </Button>
          </NavLink>
        );
      })}
    </>
  );
};

export default UserTags;
