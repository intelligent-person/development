import { useQuery } from "react-query";
import { tagsApi } from "../../api/api";

export const useFetchUserTags = (userId) => {
  return useQuery(["user", userId, "tags"], async () => {
    const { data } = await tagsApi.getUserTags(userId);
    return data;
  });
};
