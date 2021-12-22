import { useQuery } from "react-query";
import { userTagsApi } from "../../api/api";

export const useFetchUserTags = (userId) => {
  return useQuery(["user", userId, "tags"], async () => {
    const { data } = await userTagsApi.getUserTags(userId);

    return data;
  });
};
