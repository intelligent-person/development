import { useMutation } from "react-query";
import { messagesApi } from "../../api/api";

export const useUpdateMessages = () => {
  return useMutation(
    async (message) => {
      await messagesApi.updateMessage(message);
    },
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
      onSettled(...params) {},
      retry: 2,
    }
  );
};
