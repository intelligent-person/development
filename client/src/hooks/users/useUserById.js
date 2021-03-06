import { useQuery } from "react-query";
import { usersAPI } from "../../api/api";

export const useUserById = (id) => {
  return useQuery(["user", id], async () => {
    const { data } = await usersAPI.getUser(id);
    return data;
  });
};
