import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";

export const useFetchPosts = (page, pageSize, sort, search, unanswered) => {
  return useQuery(
    ["posts"],
    async () => {
      const { data } = await postsAPI.getPosts(
        page,
        pageSize,
        sort,
        search,
        unanswered
      );
      return { posts: data[0], postsCount: data[1] };
    },
    {
      keepPreviousData: true,
    }
  );
};
