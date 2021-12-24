import { useQuery } from "react-query";
import { messagesApi } from "../../api/api";

export const useFetchMessages = (userId) => {
  return useQuery(
    ["messages", `User Id: ${userId}`],
    async () => {
      const { data } = await messagesApi.getMessages(userId);
      return data;
    },
    {
      keepPreviousData: true,
      refetchInterval: 1000,
    }
  );
};
