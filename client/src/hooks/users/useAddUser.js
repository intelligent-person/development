import { useMutation } from "react-query";
import { usersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useAddUser = () => {
  return useMutation(async (newUser) => await usersAPI.addUser(newUser), {
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
      console.log(params);
      queryClient.setQueryData(["Main User"], params[0].data);
    },
    retry: 2,
  });
};
