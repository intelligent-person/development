import React from "react";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import * as hooks from "../../../hooks/users";

const ProfileContainer = () => {
  const { id } = useParams();
  const { status, data, error } = hooks.useUserById(id);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <>
      {data._id === id ? (
        <div>
          <img src={data.picture} alt={data.name} />
          <h1>{data.name}</h1>
          <h2>{data.email}</h2>
          <h2>{data.reputation}</h2>
          <h2>{data.status}</h2>
          <h2>{data.answers}</h2>
          <h2>{data.questions}</h2>
          <h2>{data.date}</h2>
          <h2>{data.isOnline}</h2>
          <a href={data.links[0].telegram}>Telegram</a>
          {data.topAnswers.map((item) => (
            <div key={item._id}>
              <div>{item.votes}</div>
              <NavLink to={`/questions/id/${item._id}`}>
                <div>{item.title}</div>
              </NavLink>
              <div>{item.date}</div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfileContainer;
