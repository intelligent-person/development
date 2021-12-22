import { useQuery } from "react-query";
import { answersAPI } from "../../api/api";

export const useFetchAnswerById = (postId, userId) => {
  return useQuery(
    ["posts", `PostId: ${postId}`, "answer", userId],
    async () => {
      const { data } = await answersAPI.getAnswer(postId, userId);
      return data;
    },
    { keepPreviousData: true }
  );
};
