import { useQuery } from "react-query";
import { answersAPI } from "../../api/api";

export const useFetchAnswerById = (answerId, postId) => {
  return useQuery(
    ["posts", `PostId: ${postId}`, "answer", answerId],
    async () => {
      const { data } = await answersAPI.getAnswer(answerId);
      return data;
    },
    { keepPreviousData: true }
  );
};
