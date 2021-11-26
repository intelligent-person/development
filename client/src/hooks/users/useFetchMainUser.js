import { useQuery } from "react-query";
import { usersAPI } from "../../api/api";

export const useFetchMainUser = (id) => {
  return useQuery(["Main User"], async () => {
    const { data } = await usersAPI.getUser(id);
    return data;
  });
};
