import { useMutation } from "react-query";
import { usersAPI } from "../../api/api";

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      await usersAPI.addUser(newUser);
    },
    onMutate(...params) {
      console.log("1. onMutate", params);
      console.log("🎬 delete todo mutation fired");
    },
    onSuccess(...params) {
      console.log("2. onSuccess", params);
      console.log("✅ todo was deleted");
    },
    onError(...params) {
      console.log("2. onError", params);
      console.log("⤬ todo was not deleted");
    },
    onSettled(...params) {
      console.log("3. onSettled", params);
      console.log("🏁 delete todo operation completed");
    },
    retry: 2,
  });
};
