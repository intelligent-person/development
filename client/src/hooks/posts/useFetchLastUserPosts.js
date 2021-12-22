import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";

export const useFetchLastUserPosts = (userId) => {
  return useQuery(["posts", `userId: ${userId}`], async () => {
    const { data } = await postsAPI.getLastUserPosts(userId);
    return data;
  });
};
