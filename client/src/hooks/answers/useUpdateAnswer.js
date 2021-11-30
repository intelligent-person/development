import { useMutation } from "react-query";
import { answersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useUpdateAnswer = () => {
  return useMutation({
    mutationFn: async (answer) => {
      await answersAPI.updateAnswer(answer);
    },
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
        params[2].postId,
        "answers",
      ]);
      const newData = currentData.map((answer) => {
        if (answer._id === params[2]._id) return params[2];
        else return answer;
      });
      queryClient.setQueryData(["posts", params[2].postId, "answers"], newData);
    },
    retry: 2,
  });
};
