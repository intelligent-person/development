import { useMutation } from "react-query";
import { userTagsApi } from "../../api/api";

export const useAddUserTags = () => {
  return useMutation(
    async (tags) => await userTagsApi.addUserTags(tags.tags, tags.userId),
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
