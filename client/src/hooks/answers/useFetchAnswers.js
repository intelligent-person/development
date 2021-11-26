import { useQuery } from "react-query";
import { answersAPI } from "../../api/api";

export const useFetchAnswers = (postId) => {
  return useQuery(["posts", postId, "answers"], async () => {
    const { data } = await answersAPI.getAnswers(postId);
    return data;
  });
};