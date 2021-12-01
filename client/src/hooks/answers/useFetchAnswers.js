import { useQuery } from "react-query";
import { answersAPI } from "../../api/api";

export const useFetchAnswers = (postId, page) => {
  return useQuery(["posts", `PostId: ${postId}`, "answers"], async () => {
    const { data } = await answersAPI.getAnswers(postId, page);
    return data;
  });
};
