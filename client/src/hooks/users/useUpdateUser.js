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
        console.log("2. onSuccess");
        console.log("✅ todo was deleted");
      },
      onError(...params) {
        console.log("2. onError");
        console.log("⤬ todo was not deleted");
      },
      onSettled(...params) {
        console.log(params[2].tags);
        const currentData = queryClient.getQueryData(["user", params[2].sub]);
        const mainUserData = queryClient.getQueryData(["Main User"]);
        const newData = {
          ...currentData,
          reputation: params[2].reputation,
        };
        if (params[2].sub === mainUserData.sub) {
          console.log(params[2].tags);
          queryClient.setQueryData(["Main User"], {
            ...mainUserData,
            reputation: params[2].reputation,
            tags: params[2].tags ? params[2].tags : mainUserData.tags,
          });
          queryClient.setQueryData(["user", params[2].sub], {
            ...newData,
            tags: params[2].tags,
          });
        } else {
          queryClient.setQueryData(["user", params[2].sub], newData);
        }
      },
      retry: 2,
    }
  );
};
