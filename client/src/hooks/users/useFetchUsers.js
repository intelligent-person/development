import { useQuery } from "react-query";
import { usersAPI } from "../../api/api";

export const useFetchUsers = (page, search, sort) => {
  return useQuery(
    ["users", `Page: ${page}`, `Search: ${search}`, `Sort: ${sort}`],
    async () => {
      const { data } = await usersAPI.getUsers(page, search, sort);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};
