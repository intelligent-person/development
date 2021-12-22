import React, { useEffect } from "react";
import * as hooks from "../hooks/users";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader/Loader";

const Authorization = () => {
  const { user } = useAuth0();
  const { data, status, error } = hooks.useFetchMainUser(user.sub);
  const addUser = hooks.useAddUser();
  const updateUser = hooks.useUpdateUser();
  useEffect(async () => {
    if (status !== "loading") {
      const date = new Date();
      if (!data.sub) {
        const newUser = {
          name: user.name,
          picture: user.picture,
          email: user.email,
          sub: user.sub,
          isOnline: date,
          status: "Новый пользователь",
        };
        await addUser.mutateAsync(newUser);
      } else {
        await updateUser.mutateAsync({ sub: user.sub, isOnline: date });
      }
    }
  }, [data]);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <></>
  );
};

export default Authorization;
