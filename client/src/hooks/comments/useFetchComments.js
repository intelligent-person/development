import { useQuery } from "react-query";
import { commentsAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useFetchComments = (answerId, page) => {
  return useQuery(["posts", `Answer Id: ${answerId}`, "comments"], async () => {
    const prevData = queryClient.getQueryData([
      "posts",
      `Answer Id: ${answerId}`,
      "comments",
    ]);
    const { data } = await commentsAPI.getComments(answerId, page);
    return page !== 1
      ? {
          commentsCount: data.commentsCount,
          answerComments: [...prevData.answerComments, ...data.answerComments],
        }
      : data;
  });
};
