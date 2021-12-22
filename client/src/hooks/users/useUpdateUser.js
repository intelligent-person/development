import { useMutation } from "react-query";
import { usersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useUpdateUser = () => {
  return useMutation(
    async (user) => {
      await usersAPI.updateUser(user);
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
