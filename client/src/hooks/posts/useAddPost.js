import { useMutation } from "react-query";
import { postsAPI } from "../../api/api";

export const useAddPost = () => {
  return useMutation(async (post) => await postsAPI.addPost(post), {
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
      console.log("3. onSettled");
    },
    retry: 2,
  });
};
