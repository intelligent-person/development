import { useMutation } from "react-query";
import { answersAPI } from "../../api/api";

export const useVotesAnswer = () => {
  return useMutation(async (params) => await answersAPI.votesAnswer(params), {
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
    onSettled(...params) {},
    retry: 2,
  });
};
