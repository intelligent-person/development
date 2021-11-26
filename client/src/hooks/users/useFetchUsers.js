import { useQuery } from "react-query";
import { usersAPI } from "../../api/api";

export const useFetchUsers = () => {
  return useQuery(["users"], async () => {
    const { data } = await usersAPI.getUsers();
    return data;
  });
};
