import { useMutation } from "react-query";
import { postsAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useUpdatePost = () => {
  return useMutation(
    async (post) => {
      await postsAPI.update(post);
    },
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
        console.log(params);
        queryClient.setQueryData(
          ["posts", `PostId: ${params[2]._id}`],
          params[2]
        );
      },
      retry: 2,
    }
  );
};
