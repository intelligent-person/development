import { useMutation } from "react-query";
import { usersAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useDeleteUsers = () => {
  return useMutation(async (id) => await usersAPI.deleteUser(id), {
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
      const currentData = queryClient.getQueryData(["users"]);
      const newData = currentData.filter(
        (user) => user.sub !== params[0].data.sub
      );
      queryClient.setQueryData(["users"], newData);
    },
    retry: 2,
  });
};
