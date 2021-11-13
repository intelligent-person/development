import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/user-reducer";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.users.user);
  console.log(user);
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);
  return (
    <div>
      {user && user._id === id ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <h2>{user.reputation}</h2>
          <h2>{user.status}</h2>
          <h2>{user.answers}</h2>
          <h2>{user.questions}</h2>
          <h2>{user.date}</h2>
          <h2>{user.isOnline}</h2>
          <a href={user.links[0].telegram}>Telegram</a>
          {user.topAnswers.map((item) => (
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
    </div>
  );
};

export default ProfileContainer;
