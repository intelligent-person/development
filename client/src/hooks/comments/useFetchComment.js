import { useQuery } from "react-query";
import { commentsAPI } from "../../api/api";

export const useFetchComments = (answerId) => {
  return useQuery(["posts", `Answer Id: ${answerId}`, "comments"], async () => {
    const { data } = await commentsAPI.getComments(answerId);
    return data;
  });
};
