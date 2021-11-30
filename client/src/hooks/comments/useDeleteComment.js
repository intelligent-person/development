import { useMutation } from "react-query";
import { queryClient } from "../queryClient";
import { commentsAPI } from "../../api/api";

export const useDeleteComment = () => {
  return useMutation(
    async (params) => await commentsAPI.deleteComment(params.commentId),
    {
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
          `Answer Id: ${params[2].answerId}`,
          "comments",
        ]);
        const newData = currentData.filter(
          (comment) => comment._id !== params[2].commentId
        );
        queryClient.setQueryData(
          ["posts", `Answer Id: ${params[2].answerId}`, "comments"],
          newData
        );
      },
      retry: 2,
    }
  );
};
