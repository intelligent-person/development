import { useMutation } from "react-query";
import { tagsApi } from "../../api/api";

export const useAddTags = () => {
  return useMutation(
    async (tags) => await tagsApi.addTags(tags.tags, tags.userId),
    {
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
      onSettled(...params) {
        console.log("3. onSettled", params);
        console.log("⤬ todo was not deleted");
      },
      retry: 2,
    }
  );
};
