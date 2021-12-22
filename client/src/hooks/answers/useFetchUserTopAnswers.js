import { useQuery } from "react-query";
import { answersAPI } from "../../api/api";

export const useFetchUserTopAnswers = (userId, page) => {
  return useQuery(
    ["users", `userId: ${userId}`, "topAnswers", `Page: ${page}`],
    async () => {
      const { data } = await answersAPI.getUserTopAnswers(userId, page);
      return data;
    },
    { keepPreviousData: true }
  );
};
