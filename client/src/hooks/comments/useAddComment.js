import { useMutation } from "react-query";
import { commentsAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useAddComments = () => {
  return useMutation(async (comment) => await commentsAPI.addComment(comment), {
    onMutate(...params) {
      console.log("1. onMutate");
      console.log("🎬 delete todo mutation fired");
    },
    onSuccess(...params) {
      console.log("2. onSuccess", params);
      console.log("✅ todo was deleted");
    },
    onError(...params) {
      console.log("2. onError");
      console.log("⤬ todo was not deleted");
    },
    async onSettled(...params) {
      console.log(params);
      const prevAnswers = queryClient.getQueryData([
        "posts",
        `Answer Id: ${params[2].answerId}`,
        "comments",
      ]);
      queryClient.setQueryData(
        ["posts", `Answer Id: ${params[2].answerId}`, "comments"],
        {
          commentsCount: prevAnswers.commentsCount + 1,
          answerComments: [params[0].data, ...prevAnswers.answerComments],
        }
      );
    },
    retry: 2,
  });
};
