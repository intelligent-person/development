import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";

export const useFetchPosts = (pageSize, page, sort, include, searchValue) => {
  return useQuery(["posts"], async () => {
    const { data } = await postsAPI.getPosts(
      pageSize,
      page,
      sort,
      include,
      searchValue
    );
    return { posts: data[0], postsCount: data[1] };
  });
};
