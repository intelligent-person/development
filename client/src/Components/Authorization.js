import React, { useEffect } from "react";
import * as hooks from "../hooks/users";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader/Loader";

const Authorization = () => {
  const { user } = useAuth0();
  const { data, status, error, refetch } = hooks.useFetchMainUser(user.sub);
  const addUser = hooks.useAddUser();
  useEffect(async () => {
    refetch();
    if (data) {
      if (data.sub !== user.sub) {
        const date = new Date();
        const newUser = {
          name: user.name,
          picture: user.picture,
          email: user.email,
          sub: user.sub,
          isOnline: date,
          status: "Новичек",
        };
        await addUser.mutateAsync(newUser);
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
