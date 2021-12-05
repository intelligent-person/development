import { useMutation } from "react-query";
import { answersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useAddAnswer = () => {
  return useMutation(async (answer) => await answersAPI.addAnswer(answer), {
    onMutate(...params) {
      console.log("1. onMutate");
      console.log("🎬 delete todo mutation fired");
    },
    onSuccess(...params) {
      console.log("2. onSuccess");
      console.log("✅ todo was deleted");
    },
    onError(...params) {
      console.log("2. onError");
      console.log("⤬ todo was not deleted");
    },
    onSettled(...params) {
      const prevAnswers = queryClient.getQueryData([
        "posts",
        `PostId: ${params[2].postId}`,
        "answers",
        `Page: 1`,
      ]);
      queryClient.setQueryData(
        ["posts", `PostId: ${params[2].postId}`, "answers", `Page: 1`],
        [...prevAnswers, params[0].data]
      );
    },
    retry: 2,
  });
};
