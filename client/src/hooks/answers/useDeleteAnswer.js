import { useMutation } from "react-query";
import { answersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useDeleteAnswer = () => {
  return useMutation(async (params) => await answersAPI.deleteAnswer(params), {
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
      const currentData = queryClient.getQueryData([
        "posts",
        `PostId: ${params[2].postId}`,
        "answers",
        `Page: ${params[2].page}`,
      ]);
      const newData = currentData.filter(
        (answer) => answer._id !== params[2].id
      );
      queryClient.setQueryData(
        [
          "posts",
          `PostId: ${params[2].postId}`,
          "answers",
          `Page: ${params[2].page}`,
        ],
        newData
      );
    },
    retry: 2,
  });
};
