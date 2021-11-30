import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";

export const useFetchPostById = (postId) => {
  return useQuery(["posts", `PostId: ${postId}`], async () => {
    const { data } = await postsAPI.getPost(postId);
    await postsAPI.setPostView(postId);
    return data;
  });
};
