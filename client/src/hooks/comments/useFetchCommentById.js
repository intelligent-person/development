import { useQuery } from "react-query";
import { commentsAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useFetchCommentById = (commentId) => {
  return useQuery(["comments", commentId], async () => {
    const { data } = await commentsAPI.getComment(commentId);
    return data;
  });
};
